import { findRecordByFilter } from "@/lib/airtable";

export default async function getCoffeeStoreById(req, res) {
    const { id } = req.query;

    try {

        if (id) {
            /* find a store */
            const records = await findRecordByFilter(id);

            if (records.length !== 0) {
                res.json(records);
            } else {
                res.json({ message: `id could not be found` })
            }
        } else {
            res.status(400);
            res.json({ message: "Id is missing" });
        }
    } catch (error) {
        res.status(500);
        res.json({ message: `something went wrong `, error })
    }

}