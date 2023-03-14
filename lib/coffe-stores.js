
import { createApi } from 'unsplash-js';


const unsplash = createApi({
    accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,

});

export function getUrlForCoffeStores(latLong, query, limit) {

    return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}&radius=5000`
}

async function getListOfCoffeeStorePhotos() {

    const photos = await unsplash.search.getPhotos({
        query: 'coffee shop',
        page: 1,
        perPage: 40,
    });

    const unsplashResultUrls = photos.response.results.map(
        result => result.urls.small
    );

    return unsplashResultUrls
}

export async function FetchCoffeeStores(
    latLong = "32.715122769281855,-117.16008191690891",
    limit = 6
    ) {

    const photos = await getListOfCoffeeStorePhotos();
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
        }
    };

    const response = await fetch(
        getUrlForCoffeStores(
            latLong,
            "coffee",
            limit),
        options)
    const storesData = await response.json()

    return storesData.results.map((result, index) => {
        return {
            id: result.fsq_id,
            locality: result.location.locality,
            address: result.location.address,
            name: result.name,
            imgUrl: photos.length > 0 ? photos[index] : 
            "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
        }
    })
}