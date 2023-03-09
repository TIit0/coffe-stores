import { FetchCoffeeStores } from "@/lib/coffe-stores";


export default async function getCoffeeStoresByLocation(req, res) {

    try {

        const { latLong, limit } = req.query;
        const response = await FetchCoffeeStores(latLong, limit);

        res.status(200);
        res.json(response);

    } catch (e) {
        console.log("there was an error", err)
        res.status(500);
        res.json({message: `OH MY GOD IT ALL EXPLODED: ${e}`})
    }


}