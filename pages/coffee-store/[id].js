import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import coffeeStoreData from "../../data/coffee-stores.json"
import styles from "../../styles/coffee-store.module.css"
import Image from "next/image";
import { FetchCoffeeStores } from "@/lib/coffe-stores";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "@/hooks/store-context";
import { isEmpty } from "@/utils";


/* server side starts */

export async function getStaticProps(staticProps) {

    const params = staticProps.params;

    console.log("THIS IS PARAMS", params)
    console.log("THIS IS Static props", staticProps)

    const coffeeStores = await FetchCoffeeStores();
    const findCoffeStoreById = coffeeStores.find(
        coffeStore => (
            coffeStore.id.toString() === params.id
        ));


    return {
        props: {
            initialProps: findCoffeStoreById ? findCoffeStoreById : {}
        }
    }
}

export async function getStaticPaths() {

    /* */
    const coffeeStores = await FetchCoffeeStores();

    const paths = coffeeStores.map(store => {
        return { params: { id: `${store.id}` } }
    })

    return {
        paths,
        fallback: true,
    }
}
/* server side ends*/

/* client side starts*/
export default function CoffeStore({ initialProps }) {
    console.log(initialProps)

    /* use router runs on client */
    const router = useRouter()
    const id = useRouter().query.id;

    if (router.isFallback) {
        return <div>Loading...</div>
    }

    const [coffeeStore, setCoffeeStore] = useState(initialProps)

    const {
        state: { coffeeStores },
    } = useContext(StoreContext);


    /* Aquire coffestore info  from context and add to db or get*/
    async function handleCreateCoffeStore(coffeeStore) {

        try {
            const { id, name, voting, imgUrl, locality, address } = coffeeStore

            const response = await fetch("/api/createCoffeeStore", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id,
                    name,
                    voting: 0,
                    imgUrl,
                    locality: locality || "",
                    address: address || ""
                }),
            });

            const dbCoffeeStore = await response.json();
            console.log(dbCoffeeStore);
        } catch (error) {
            console.error("Error creating coffee store", error)
        }

    }

    useEffect(() => {

        if (isEmpty(initialProps)) {
            if (coffeeStores.length > 0) {

                const coffeeStoreFromContext = coffeeStores.find(
                    coffeStore => (
                        coffeStore.id.toString() === id
                    ));

                if (coffeeStoreFromContext) {
                    setCoffeeStore(coffeeStoreFromContext);
                    handleCreateCoffeStore(coffeeStoreFromContext)
                }

            }
        }
    }, [id])


    const { name, address, locality, imgUrl } = coffeeStore;
    console.log(id)

    function handleUpvote() {
        console.log("HII")
    }



    return (
        <div className={styles.lay}>
            <Head>
                <title>{name}</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.col1}>
                    <div className={styles.backToHomeLink}>
                        <Link className="styles.link" href="/">← Return to home page</Link>
                    </div>
                    <div className={styles.nameWrapper}>
                        <h1 className={styles.name}>{name}</h1>
                    </div>
                    <Image
                        className={styles.storeImage}
                        src={imgUrl || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"}
                        width={600} height={360}
                        alt={`Interior of ${name}`} />

                </div>
                <div className={`glass ${styles.col2}`}>
                    {
                        address ?

                            <div className={styles.iconWrapper}>
                                <Image
                                    alt="location icon"
                                    src="/svg/places.svg"
                                    width={24} height={24} />
                                <p className={styles.text}>{address}</p>
                            </div>
                            : null
                    }
                    {
                        locality ?

                            <div className={styles.iconWrapper}>
                                <Image
                                    alt="location icon"
                                    src="/svg/nearMe.svg"
                                    width={24} height={24} />
                                <p className={styles.text}>{locality}</p>
                            </div>
                            : null
                    }
                    <div className={styles.iconWrapper}>
                        <Image
                            alt="star icon"
                            src="/svg/star.svg"
                            width={24} height={24} />
                        <p className={styles.text}>{1}</p>
                    </div>
                    <button
                        onClick={handleUpvote}
                        className={styles.upvoteButton}
                    >Up vote</button>
                </div>
            </div>
        </div>
    );
}

/*client side ends */

