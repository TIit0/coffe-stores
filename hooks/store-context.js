import { createContext, useReducer } from 'react';
import { ACTIONS, reducer } from '@/hooks/reducer'

export const StoreContext = createContext();

export default function StoreProvider({ children }) {

    const initialState = {
        latLong: "",
        coffeeStores: [],
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {children}
        </StoreContext.Provider>
    )
}