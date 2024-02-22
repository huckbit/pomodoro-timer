import sqlite3 from 'sqlite3';

interface SettingsRow {
  key: string;
  value: string;
}

const db = new sqlite3.Database('../database/pomodoro.db');

// Create a settings table (if not exists)
db.run('CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT)');

/*  Retrieve a specific setting*/
export function getSetting(key: string): Promise<string | null> {
  return new Promise((resolve, reject) => {
    db.get('SELECT value FROM settings WHERE key = ?', [key], (err, row: SettingsRow) => {
      if (err) {
        reject(err);
      } else {
        resolve(row !== undefined ? row.value : null);
      }
    });
  });
}

// Function to update or insert a setting
export function updateSetting(key: string, value: string): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', [key, value], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
