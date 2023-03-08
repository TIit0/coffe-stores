import '@/styles/globals.css'
import { createContext, useReducer } from 'react';
import { ACTIONS, reducer } from '@/hooks/reducer'

const StoreContext = createContext();

function StoreProvider({ children }) {

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

export default function App({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}
