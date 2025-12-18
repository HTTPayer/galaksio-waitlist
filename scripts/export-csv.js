#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const WAITLIST_FILE = path.join(__dirname, '..', 'data', 'waitlist.json');
const CSV_FILE = path.join(__dirname, '..', 'data', 'waitlist.csv');

async function exportToCSV() {
  try {
    // Read waitlist data
    const data = fs.readFileSync(WAITLIST_FILE, 'utf-8');
    const entries = JSON.parse(data);

    // Create CSV header
    const csvHeader = 'Email,Timestamp,User Agent\n';

    // Create CSV rows
    const csvRows = entries
      .map((entry) => {
        const email = entry.email;
        const timestamp = entry.timestamp;
        const userAgent = entry.userAgent || '';
        return `${email},${timestamp},"${userAgent}"`;
      })
      .join('\n');

    // Write to CSV file
    const csvContent = csvHeader + csvRows;
    fs.writeFileSync(CSV_FILE, csvContent);

    console.log(`✅ Successfully exported ${entries.length} entries to ${CSV_FILE}`);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('⚠️  No waitlist data found. The waitlist is empty.');
    } else {
      console.error('❌ Error exporting to CSV:', error);
    }
  }
}

exportToCSV();
