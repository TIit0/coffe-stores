import { findRecordByFilter, table, getMinifiedRecords } from "@/lib/airtable";

export default async function upVoteCoffeeStoreById(req, res) {

    if (req.method === "PUT") {

        try {
            const { id } = req.body;
            if (id) {
                const records = await findRecordByFilter(id);

                if (records.length !== 0) {
                    const record = records[0];
                    const calculateVoting = parseInt(record.voting) + parseInt(1);
                    console.log({ calculateVoting, id: record.id });

                    const updateRecord = await table.update([
                        {
                            "id": record.recordId,
                            "fields": {
                                "voting": calculateVoting
                            }
                        }
                    ]);
                    if (updateRecord) {
                        const minifiedRecord = getMinifiedRecords(updateRecord)
                        res.json(minifiedRecord);
                    }

                } else {
                    res.json({ message: `CoffeeStore id "${id}" does not exist`, id })
                }
            } else {
                res.status(400);
                res.json({ message: "Id is missing" });
            }

        } catch (error) {
            res.status(500)
            res.json({ message: `Error, Upvoting store failed`, error })
        }

    }
}