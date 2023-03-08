

export const ACTIONS = {
    SET_LAT_LONG: "UPDATE_LAT_LONG",
    SET_COFFEE_STORES: "UPDATE_STORES"
}

export function reducer(state, action) {

    switch(action.stype) {
        case ACTIONS.SET_LAT_LONG:
            return {...state, latLong: action.payload.latLong};
        case ACTIONS.SET_COFFEE_STORES:
            return {...state, coffeeStores: action.payload.coffeeStores};

            default:
                throw new Error(
                    `Oh no! something went wrong: ${action.type}`
                    )
    }
}