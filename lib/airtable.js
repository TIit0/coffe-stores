
const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_KEY);

export const table = base('coffe-stores');

function getSingleMinifiedRecord(record) {
    
    return {
        recordId: record.id,
        ...record.fields
    }
}

export function getMinifiedRecords(records) {
    return records.map(record => getSingleMinifiedRecord(record));
}


export async function findRecordByFilter(id) {

    const findCoffeeStoreRecords = await table.select({
        filterByFormula: `id="${id}"`
    }).firstPage();


    return getMinifiedRecords(findCoffeeStoreRecords);
}

