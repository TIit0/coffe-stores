
const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_KEY);

export const table = base('coffe-stores');

function getSingleMinifiedRecord(record) {
    return { ...record.fields }
}

export function getMinifiedRecords(records) {
    return records.map(record =>  getSingleMinifiedRecord(record));
}


