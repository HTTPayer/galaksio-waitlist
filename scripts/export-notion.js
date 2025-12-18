#!/usr/bin/env node

/**
 * Export waitlist emails to Notion Database
 * 
 * Setup:
 * 1. Create a Notion integration at https://www.notion.so/my-integrations
 * 2. Create a database in Notion with the following properties:
 *    - Email (Email type)
 *    - Timestamp (Date type)
 *    - User Agent (Text type)
 * 3. Share the database with your integration
 * 4. Set environment variables:
 *    - NOTION_API_KEY: Your Notion integration token
 *    - NOTION_DATABASE_ID: Your database ID (from the database URL)
 * 
 * Run:
 * NOTION_API_KEY=your_key NOTION_DATABASE_ID=your_db_id node scripts/export-notion.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const WAITLIST_FILE = path.join(__dirname, '..', 'data', 'waitlist.json');
const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
  console.error('❌ Missing environment variables:');
  console.error('   NOTION_API_KEY and NOTION_DATABASE_ID are required');
  console.error('\nUsage:');
  console.error('   NOTION_API_KEY=your_key NOTION_DATABASE_ID=your_db_id node scripts/export-notion.js');
  process.exit(1);
}

function makeNotionRequest(method, path, data) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.notion.com',
      port: 443,
      path: path,
      method: method,
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
    };

    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(responseData));
        } else {
          reject(new Error(`Notion API error: ${res.statusCode} - ${responseData}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

async function createNotionPage(entry) {
  const data = {
    parent: { database_id: NOTION_DATABASE_ID },
    properties: {
      Email: {
        email: entry.email,
      },
      Timestamp: {
        date: {
          start: entry.timestamp,
        },
      },
      'User Agent': {
        rich_text: [
          {
            text: {
              content: entry.userAgent || 'N/A',
            },
          },
        ],
      },
    },
  };

  return makeNotionRequest('POST', '/v1/pages', data);
}

async function exportToNotion() {
  try {
    console.log('📖 Reading waitlist data...');
    const data = fs.readFileSync(WAITLIST_FILE, 'utf-8');
    const entries = JSON.parse(data);

    console.log(`📊 Found ${entries.length} entries to export`);

    let successCount = 0;
    let errorCount = 0;

    for (const entry of entries) {
      try {
        await createNotionPage(entry);
        successCount++;
        console.log(`✅ Exported: ${entry.email}`);
      } catch (error) {
        errorCount++;
        console.error(`❌ Failed to export ${entry.email}:`, error.message);
      }
    }

    console.log('\n📈 Export Summary:');
    console.log(`   ✅ Success: ${successCount}`);
    console.log(`   ❌ Errors: ${errorCount}`);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('⚠️  No waitlist data found. The waitlist is empty.');
    } else {
      console.error('❌ Error exporting to Notion:', error);
    }
  }
}

exportToNotion();
