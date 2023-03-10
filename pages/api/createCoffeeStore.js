
const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_KEY);


const table = base('coffe-stores');

console.log({ table })

export default async function createCoffeStore(req, res) {
    console.log({ req })


    try {

        if (req.method === "POST") {

            /* find a store */
            const findCoffeeStoreRecords = await table.select({
                filterByFormula: `id="0"`
            }).firstPage();


            if (findCoffeeStoreRecords.length !== 0) {

                const records = findCoffeeStoreRecords.map(record => {
                    return { ...record.fields }
                });

                res.json(records);
            } else {
                /* create/add a store */
                res.json({ message: "create a store" })
            }
        }

    } catch (err) {
        console.log(err)
        res.status(500)
        res.json({message: `Something went wrong: ${err}`})
    }


}