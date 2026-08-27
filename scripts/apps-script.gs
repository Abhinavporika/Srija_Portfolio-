/**
 * ─────────────────────────────────────────────────────────────
 *  SRIJA — Enquiry form → Google Sheets
 *
 *  HOW TO USE (5 minutes):
 *  1. Create a new Google Sheet (this will store the enquiries).
 *  2. In the sheet: Extensions → Apps Script.
 *  3. Delete the default code and paste this entire file.
 *  4. Deploy → New deployment → select type "Web app":
 *       • Description:   Srija enquiries
 *       • Execute as:    Me
 *       • Who has access: Anyone
 *  5. Authorize when prompted, then copy the Web app URL
 *     (ends with /exec) into your .env file:
 *       VITE_SHEETS_WEBAPP_URL=https://script.google.com/macros/s/XXXX/exec
 *
 *  The script never stores credentials anywhere — it runs as YOUR
 *  account inside Google. Nothing secret ever touches the website.
 * ─────────────────────────────────────────────────────────────
 */

var SHEET_NAME = 'Enquiries';
var HEADERS = [
  'Timestamp',
  'Name',
  'Phone',
  'Email',
  'Project',
  'Message',
  'Preferred Contact',
  'Submitted At (client)'
];

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    var p = (e && e.parameter) || {};

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      new Date(),
      String(p.name || '').substring(0, 200),
      String(p.phone || '').substring(0, 60),
      String(p.email || '').substring(0, 200),
      String(p.project || '').substring(0, 500),
      String(p.message || '').substring(0, 5000),
      String(p.preferredContact || '').substring(0, 40),
      String(p.submittedAt || '')
    ]);

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    try { lock.releaseLock(); } catch (_) {}
  }
}

/** Health check: open the web-app URL in a browser and it should show {"ok":true} */
function doGet() {
  return json_({ ok: true, service: 'srija-enquiries' });
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
