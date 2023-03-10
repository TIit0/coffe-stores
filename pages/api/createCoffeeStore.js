
const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_KEY);


const table = base('coffe-stores');



export default async function createCoffeStore(req, res) {

    if (req.method === "POST") {

        /* find a store */

        const {id, name, address, locality, voting, imgUrl} = req.body;

        try {

            const findCoffeeStoreRecords = await table.select({
                filterByFormula: `id=${id}`
            }).firstPage();


            if (findCoffeeStoreRecords.length !== 0) {

                const records = findCoffeeStoreRecords.map(record => {
                    return { ...record.fields }
                });

                res.json(records);
            } else {
                /* create/add a store */

                const createCoffeeStoreRecord = await table.create([
                    {
                        fields: {
                            id,
                            name,
                            address,
                            locality,
                            voting,
                            imgUrl,
                        },
                    },
                ]);

                const records = createCoffeeStoreRecord.map(record => {
                    return { ...record.fields }
                });

                res.json({ records })
            }

        } catch (err) {
            console.log(err)
            res.status(500)
            res.json({ message: `Something went wrong: ${err}` })
        }
    }

}