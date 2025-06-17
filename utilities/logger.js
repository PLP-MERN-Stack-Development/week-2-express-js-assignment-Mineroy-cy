// utils/logger.js
require('colors');

const log = {
  info: (msg) => console.log(`ℹ️  ${msg}`.blue),
  success: (msg) => console.log(`✅ ${msg}`.green),
  warn: (msg) => console.warn(`⚠️  ${msg}`.yellow),
  error: (msg) => console.error(`❌ ${msg}`.red.bold),
  db: (msg) => console.log(`📦 [DB] ${msg}`.cyan.underline),
  server: (msg) => console.log(`🚀 [Server] ${msg}`.magenta)
};

module.exports = log;
