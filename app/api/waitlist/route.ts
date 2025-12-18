import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

interface WaitlistEntry {
  email: string;
  timestamp: string;
  userAgent?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check if email already exists in KV
    const exists = await kv.sismember("waitlist:emails", email.toLowerCase());
    if (exists) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    // Add new entry to KV
    const newEntry: WaitlistEntry = {
      email: email.toLowerCase(),
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get("user-agent") || undefined,
    };

    // Store email in set (for quick duplicate checks)
    await kv.sadd("waitlist:emails", email.toLowerCase());
    
    // Store full entry details
    await kv.hset(`waitlist:entry:${email.toLowerCase()}`, newEntry);
    
    // Increment counter
    await kv.incr("waitlist:count");

    // Optional: Log to console for monitoring
    console.log(`New waitlist signup: ${email}`);

    return NextResponse.json(
      { success: true, message: "Successfully joined the waitlist" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Get all emails from the set
    const emails = await kv.smembers("waitlist:emails") as string[];
    const count = await kv.get("waitlist:count") || 0;
    
    // Get details for each email
    const entries = await Promise.all(
      emails.map(async (email) => {
        const entry = await kv.hgetall(`waitlist:entry:${email}`) as WaitlistEntry;
        return {
          email: entry.email,
          timestamp: entry.timestamp,
        };
      })
    );
    
    return NextResponse.json({
      total: count,
      entries: entries.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ),
    });
  } catch (error) {
    console.error("Error reading waitlist:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
