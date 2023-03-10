import { getMinifiedRecords, table } from "@/lib/airtable";



export default async function createCoffeStore(req, res) {
    if (req.method === "POST") {

        const { id, name, address, locality, voting, imgUrl } = req.body;

        try {
            if (id) {
                /* find a store */

                const findCoffeeStoreRecords = await table.select({
                    filterByFormula: `id=${id}`
                }).firstPage();

                if (findCoffeeStoreRecords.length !== 0) {

                    const records = getMinifiedRecords(findCoffeeStoreRecords);

                    res.json(records);
                } else {
                    /* create/add a store if it contans name & id*/

                    if (name) {
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
                        const records = getMinifiedRecords(createCoffeeStoreRecord);

                        res.json({ records })
                    } else {
                        res.status(400);
                        res.json({ message: "name is missing" });
                    }
                }

            } else {
                res.status(400);
                res.json({ message: "Id is missing" });
            }

        } catch (err) {
            console.log("Error creating or finding a store", err)
            res.status(500)
            res.json({ message: `Something went wrong: ${err}` })
        }
    }

}