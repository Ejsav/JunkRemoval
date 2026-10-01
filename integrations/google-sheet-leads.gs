/**
 * Quote requests → Google Sheet, with photo thumbnails.
 *
 * Setup (5 minutes, once per client):
 *  1. Create a Google Sheet. Extensions → Apps Script. Replace the code with this file.
 *  2. Set SECRET below to a long random string. Put the same value in Vercel as LEADS_SHEET_SECRET.
 *  3. Deploy → New deployment → Web app. Execute as: Me. Who has access: Anyone. Deploy, authorize.
 *  4. Copy the web app URL into Vercel as LEADS_SHEET_URL (Production and Preview). Redeploy the site.
 *  5. Submit a test quote with photos. A row appears in the "Leads" tab.
 */
const SECRET = "change-me"
const SHEET = "Leads"
const THUMBS = 4
const HEADER = ["Received", "Status", "Name", "Phone", "Email", "City / ZIP", "Job", "Reply by", "Details",
  "Photo 1", "Photo 2", "Photo 3", "Photo 4", "All photos", "Came from"]

function doPost(e) {
  const lead = JSON.parse(e.postData.contents)
  if (lead.secret !== SECRET) return json({ ok: false, error: "unauthorized" })

  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const sheet = ss.getSheetByName(SHEET) || ss.insertSheet(SHEET)
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADER)
    sheet.getRange(1, 1, 1, HEADER.length).setFontWeight("bold")
    sheet.setFrozenRows(1)
    sheet.setColumnWidths(10, THUMBS, 130)
  }

  const photos = (lead.photos || []).filter((u) => /^https:\/\//.test(u))
  const thumbs = Array.from({ length: THUMBS }, (_, i) => (photos[i] ? `=IMAGE("${photos[i]}")` : ""))
  const links = photos.map((u, i) => `Photo ${i + 1}: ${u}`).join("\n")

  sheet.appendRow([new Date(), "New", lead.name, "'" + lead.phone, lead.email, lead.location, lead.service,
    lead.preferred_contact, lead.details, ...thumbs, links, lead.source])
  const row = sheet.getLastRow()
  if (photos.length) sheet.setRowHeight(row, 110)
  sheet.getRange(row, 2).setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(["New", "Quoted", "Booked", "Done", "Lost"]).build())

  return json({ ok: true })
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON)
}
