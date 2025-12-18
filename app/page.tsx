"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Rocket, CheckCircle2 } from "lucide-react";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setIsSubmitted(true);
      setEmail("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to join waitlist");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section with Space Theme */}
      <section className="relative overflow-hidden border-b border-zinc-200">
        {/* Grid Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-32">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
            {/* Left Content */}
            <div className="lg:w-1/2">
              {/* Badge */}
              <Link
                href="#features"
                className="inline-flex items-center gap-2 rounded-full border border-blue-900/20 bg-blue-950/5 px-3 py-1 text-sm text-blue-950 transition-colors hover:bg-blue-950/10"
              >
                <span className="font-medium">Coming Soon</span>
                <span className="text-zinc-600">HTTPayer x402 Integration</span>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              {/* Main Heading */}
              <h1 className="mt-8 text-5xl font-bold tracking-tight text-zinc-900 sm:text-6xl lg:text-7xl">
                On-chain USDC
                <span className="block bg-gradient-to-r from-blue-950 via-blue-900 to-slate-800 bg-clip-text text-transparent">
                  Meets Cloud Compute
                </span>
              </h1>

              {/* Description */}
              <p className="mt-6 text-lg leading-8 text-zinc-700">
                Pay-as-you-go cloud infrastructure powered by HTTPayer. Execute scripts, run AI workloads, and store results—all paid with USDC, accessed through simple HTTP calls.
              </p>
              <p className="mt-3 text-base text-zinc-600">
                No wallets. No accounts. No gas calculations. Just instant compute on Akash, permanent storage on Arweave, and payments handled automatically via the x402 standard.
              </p>

              {/* Waitlist Form */}
              <div className="mt-10">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row sm:items-start">
                    <div className="flex-1">
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={isSubmitting}
                          className="h-12 pl-10 text-base"
                        />
                      </div>
                      {error && (
                        <p className="mt-2 text-sm text-red-600">{error}</p>
                      )}
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="h-12 bg-blue-950 px-8 text-base font-semibold text-stone-50 hover:bg-blue-900"
                    >
                      {isSubmitting ? (
                        "Joining..."
                      ) : (
                        <>
                          <Rocket className="h-5 w-5" />
                          Join Waitlist
                        </>
                      )}
                    </Button>
                  </form>
                ) : (
                  <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                      <div>
                        <p className="font-semibold text-green-900">You&apos;re on the list!</p>
                        <p className="text-sm text-green-700">We&apos;ll notify you when we launch.</p>
                      </div>
                    </div>
                  </div>
                )}
                <p className="mt-3 text-sm text-zinc-500">
                  Join builders waiting for early access to Galaksio.
                </p>
              </div>
            </div>

            {/* Right Screenshot Card */}
            <div className="mt-16 lg:mt-0 lg:w-1/2">
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-blue-950/10 via-blue-900/10 to-slate-800/10 opacity-75 blur-2xl"></div>
                
                {/* Main Card */}
                <div className="relative rounded-xl border border-zinc-200 bg-white shadow-2xl overflow-hidden">
                  {/* Browser Chrome */}
                  <div className="flex items-center gap-2 border-b border-zinc-200 px-3 py-2 sm:px-4 sm:py-3">
                    <div className="flex gap-1.5">
                      <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-red-400"></div>
                      <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-yellow-400"></div>
                      <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="ml-2 sm:ml-4 flex-1 rounded bg-zinc-100 px-2 sm:px-3 py-1 text-xs text-zinc-500 truncate">
                      galaksio.cloud
                    </div>
                  </div>

                  {/* Dashboard Content */}
                  <div className="flex flex-col sm:flex-row">
                    {/* Sidebar */}
                    <div className="w-full sm:w-48 border-b sm:border-b-0 sm:border-r border-zinc-200 bg-zinc-50 p-3 sm:p-4">
                      <div className="mb-4 sm:mb-6">
                        <div className="text-base sm:text-lg font-bold text-blue-950">Galaksio</div>
                      </div>
                      <nav className="space-y-1">
                        <div className="text-xs font-semibold text-zinc-500">Navigation</div>
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center gap-2 rounded px-2 py-1.5 text-xs sm:text-sm text-zinc-700">
                            <svg className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                            </svg>
                            <span className="truncate">Projects</span>
                          </div>
                          <div className="flex items-center gap-2 rounded bg-blue-950 px-2 py-1.5 text-xs sm:text-sm font-medium text-white">
                            <svg className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <span className="truncate">Deployments</span>
                          </div>
                          <div className="flex items-center gap-2 rounded px-2 py-1.5 text-xs sm:text-sm text-zinc-700">
                            <svg className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span className="truncate">Activity</span>
                          </div>
                        </div>
                        <div className="mt-4 text-xs font-semibold text-zinc-500">Your teams</div>
                        <div className="mt-2 space-y-1">
                          <div className="px-2 py-1 text-xs sm:text-sm text-zinc-600 truncate">Planetario</div>
                          <div className="px-2 py-1 text-xs sm:text-sm text-zinc-600 truncate">Protocol</div>
                        </div>
                      </nav>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 p-4 sm:p-6">
                      <div className="mb-3 sm:mb-4 flex items-center justify-between">
                        <h2 className="text-base sm:text-lg font-semibold text-zinc-900">Deployments</h2>
                      </div>
                      <div className="space-y-2 sm:space-y-3">
                        {/* Deployment Items */}
                        <div className="flex items-center justify-between rounded-lg border border-zinc-200 p-2.5 sm:p-3">
                          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                            <div className="flex h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0 items-center justify-center rounded bg-zinc-100 text-xs font-bold text-zinc-600">
                              P
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs sm:text-sm font-medium text-zinc-900 truncate">Planetario</div>
                              <div className="text-xs text-zinc-500 truncate">Deploy from GitHub</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-1.5 sm:px-2 py-0.5 text-xs font-medium text-green-700">
                              <div className="h-1.5 w-1.5 rounded-full bg-green-600"></div>
                              <span className="hidden sm:inline">Ready</span>
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between rounded-lg border border-zinc-200 p-2.5 sm:p-3">
                          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                            <div className="flex h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0 items-center justify-center rounded bg-zinc-100 text-xs font-bold text-zinc-600">
                              T
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs sm:text-sm font-medium text-zinc-900 truncate">Tailwind Labs</div>
                              <div className="text-xs text-zinc-500 truncate">Deploy from GitHub</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-1.5 sm:px-2 py-0.5 text-xs font-medium text-amber-700">
                              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-600"></div>
                              <span className="hidden sm:inline">Building</span>
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between rounded-lg border border-zinc-200 p-2.5 sm:p-3">
                          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                            <div className="flex h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0 items-center justify-center rounded bg-zinc-100 text-xs font-bold text-zinc-600">
                              P
                            </div>
                            <div className="min-w-0">
                              <div className="text-xs sm:text-sm font-medium text-zinc-900 truncate">Protocol</div>
                              <div className="text-xs text-zinc-500 truncate">Deploy from GitHub</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-1.5 sm:px-2 py-0.5 text-xs font-medium text-red-700">
                              <div className="h-1.5 w-1.5 rounded-full bg-red-600"></div>
                              <span className="hidden sm:inline">Failed</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

       {/* GLUSD Section */}
      <section className="border-b border-zinc-200 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <h2 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
                Introducing <span className="bg-gradient-to-r from-blue-950 via-blue-900 to-slate-800 bg-clip-text text-transparent">GLUSD</span>
              </h2>
              <p className="mt-6 text-xl leading-8 text-zinc-700">
                The first yield-bearing stablecoin backed by x402 payments.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-zinc-200 bg-white p-6 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <svg className="h-6 w-6 text-blue-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-zinc-900">Fully onchain</h3>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-white p-6 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-violet-100">
                  <svg className="h-6 w-6 text-violet-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="font-semibold text-zinc-900">Auditable by design</h3>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-white p-6 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                  <svg className="h-6 w-6 text-emerald-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-zinc-900">Powered by real utility</h3>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-white p-6 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100">
                  <svg className="h-6 w-6 text-amber-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-zinc-900">Not speculation</h3>
              </div>
            </div>

            <div className="mt-12 rounded-2xl border border-zinc-200 bg-gradient-to-br from-slate-50 to-blue-50 p-8 sm:p-12">
              <div className="mx-auto max-w-3xl">
                <p className="text-lg leading-relaxed text-zinc-700">
                  <span className="font-semibold text-zinc-900">GLUSD</span> is a non-rebasing yield-bearing stablecoin which can be minted with and redeemed for USDC. A portion of x402 revenues generated by Galaksio are automatically deposited into the GLUSD vault, meaning the value of 1 GLUSD will increase over time.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-zinc-700">
                  Think of <span className="font-semibold">sDAI</span>, but with yield coming from user requests for cloud compute or storage through Galaksio.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-b border-zinc-200 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              Web3 Resources via HTTP
            </h2>
            <p className="mt-4 text-lg text-zinc-600">
              Powered by HTTPayer and the x402 Payment Required standard
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              }
              title="Decentralized Sandboxes"
              description="Run scripts or AI jobs securely in Akash, E2B, or similar decentralized compute environments."
            />
            <FeatureCard
              icon={
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              }
              title="Permanent Storage"
              description="Store data and results on Arweave for permanence or IPFS/Filecoin for ephemeral caching."
            />
            <FeatureCard
              icon={
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
              title="Pay-as-You-Go USDC"
              description="Pay only for what you use via HTTPayer. No wallets for end users, just simple HTTP calls."
            />
            <FeatureCard
              icon={
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              }
              title="GitHub Integration"
              description="Connect your repositories and deploy automatically with seamless GitHub integration."
            />
            <FeatureCard
              icon={
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
              title="x402 Standard"
              description="Built on the emerging x402 Payment Required standard for Web3 resource access."
            />
            <FeatureCard
              icon={
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
              title="Real-time Analytics"
              description="Monitor your deployments with detailed insights, logs, and HTTPayer Response Groups."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="border-b border-zinc-200 bg-zinc-50 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-zinc-600">
              Unified pay-as-you-go flow powered by HTTPayer
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-3xl">
            <div className="space-y-6">
              <div className="flex gap-4 rounded-xl border border-zinc-200 bg-white p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900">
                    Service returns 402 Payment Required
                  </h3>
                  <p className="mt-2 text-zinc-600">
                    HTTPayer automatically handles the USDC payment on-chain
                  </p>
                </div>
              </div>
              <div className="flex gap-4 rounded-xl border border-zinc-200 bg-white p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-100 text-lg font-bold text-violet-600">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900">
                    Job runs in secure sandbox
                  </h3>
                  <p className="mt-2 text-zinc-600">
                    Your script or AI job executes on Akash, E2B, or similar decentralized compute
                  </p>
                </div>
              </div>
              <div className="flex gap-4 rounded-xl border border-zinc-200 bg-white p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-lg font-bold text-emerald-600">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900">
                    Output stored permanently
                  </h3>
                  <p className="mt-2 text-zinc-600">
                    Results saved to Arweave for permanence or IPFS/Filecoin for ephemeral storage
                  </p>
                </div>
              </div>
              <div className="flex gap-4 rounded-xl border border-zinc-200 bg-white p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-lg font-bold text-orange-600">
                  4
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900">
                    Logs and monitoring available
                  </h3>
                  <p className="mt-2 text-zinc-600">
                    Access detailed logs via HTTPayer Response Groups and real-time analytics
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
              Ready to get started?
            </h2>
            <p className="mt-4 text-lg text-zinc-600">
              Join the waitlist and be the first to know when we launch.
            </p>
            <div className="mt-10">
              <Button
                onClick={() => {
                  document.querySelector('input[type="email"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  (document.querySelector('input[type="email"]') as HTMLInputElement)?.focus();
                }}
                className="bg-blue-950 px-8 py-3 text-sm font-semibold text-stone-50 hover:bg-blue-900"
                size="lg"
              >
                Join the Waitlist
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-zinc-50 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-950">Galaksio</div>
            <p className="mt-2 text-sm text-zinc-600">
              On-chain USDC meets cloud compute
            </p>
            <p className="mt-4 text-xs text-zinc-500">
              © 2025 HTTPayer, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-200 p-6 transition-all hover:border-zinc-300 hover:shadow-lg">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-100 text-zinc-900">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-zinc-900">{title}</h3>
      <p className="mt-2 text-sm text-zinc-600">{description}</p>
    </div>
  );
}
