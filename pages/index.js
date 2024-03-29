import Head from 'next/head'
import Banner from '@/src/components/Banner/Banner'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Card from '@/src/components/Card/Card'

import { FetchCoffeeStores } from '@/lib/coffe-stores'
import useTrackLocation from '@/hooks/useTrackLocation'
import { useContext, useEffect, useState } from 'react'
import { StoreContext } from '@/hooks/store-context'
import { ACTIONS } from '@/hooks/reducer'


export async function getStaticProps(context) {

  /*
  do NOT call internal api here or stuff silently explodes. 
  aka: getCoffeStoresByLocation 
  Internal apis are not ready on buildtime
  */

  const coffeeStores = await FetchCoffeeStores();

  return {
    props: {
      coffeeStores,
    },
  }
}

/* start of component */

export default function Home({ coffeeStores }) {

  /* aquire user location and return coordinates  */
  const {
    handleTrackLocation, locationErrorMsg, isFindingLocation
  } = useTrackLocation();
  

  //const [userCoffeeStores, setUserCoffeeStores] = useState([]);
  const [userCoffeeStoresError, setUserCoffeeStoresError] = useState(null);

const { dispatch, state} = useContext(StoreContext);
const {latLong} = state;




  useEffect(() => {
    /* Aquire a list of sotres and images based on users location */
    async function setCoffeStoresByLocation() {

      if (latLong) {
        try {

          /* internal apis are now ready on client side AFTER build time */
          const response = await fetch(
            `/api/getCoffeeStoresByLocation?latLong=${latLong}&limit=12`
            );
            const fetchedCoffeeeStores = await response.json()
          
          dispatch({
            type: ACTIONS.SET_COFFEE_STORES,
            payload: {
              coffeeStores: fetchedCoffeeeStores,
            }
          });

          setUserCoffeeStoresError("");
        }
        catch (error) {
          setUserCoffeeStoresError(error.message)
        }
      }

    }

    setCoffeStoresByLocation();

  }, [latLong])



  function handleOnBannerBtnClick() {
    handleTrackLocation();
    
  }

  /* Start of JSX */

  return (
    <div className={styles.sectionWrapper}>

      <Head>
        <title>Coffe Connoisseur</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main className={styles.main}>

        {/* Hero start */}

        <Banner
          buttonText={
            isFindingLocation ? "Locating..." : "View Stores Nearby"
          }
          handleOnBannerBtnClick={handleOnBannerBtnClick}
        />

            {/* Error feedback start */}

        {
          locationErrorMsg ?
            <p className={styles.errorMsg}
            >Something went wrong: {locationErrorMsg}</p>
            : null
        }

        {
          userCoffeeStoresError ?
            <p className={styles.errorMsg}
            >Something went wrong: {userCoffeeStoresError}</p>
            : null
        }

            {/* Error feedback end */}

        <div className={styles.heroImage}>
          <Image
            alt="coffe conoseiur banner"
            src="/images/hero-image.png"
            width={700} height={400}
          />
        </div>

        {/* Hero end */}

        {/* User aquired coffe stores start */}

        {state.coffeeStores.length > 0
          ?
          <>
            <h2 className={styles.heading2}>Stores Near You</h2>
            <div className={styles.cardLayout}>
              {
                state.coffeeStores.map(store => (
                  <Card
                    key={store.id}
                    name={store.name}
                    imgUrl={store.imgUrl}
                    href={`/coffee-store/${store.id}`} />
                ))
              }
            </div>
          </>
          :
          null}

        {/* User aquired coffe stores end */}

        {/* Default coffe stores start */}

        {coffeeStores.length > 0
          ?
          <>
            <h2 className={styles.heading2}>San Diego Stores</h2>
            <div className={styles.cardLayout}>
              {
                coffeeStores.map(store => (
                  <Card
                    key={store.id}
                    name={store.name}
                    imgUrl={store.imgUrl}
                    href={`/coffee-store/${store.id}`} />
                ))
              }
            </div>
          </>
          :
          null}

        {/* Default coffe stores end */}

      </main>

    </div>
  )  /* end of JSX */
}

/* end of component */