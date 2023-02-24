import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import coffeeStoreData from "../../data/coffee-stores.json"
import styles from "../../styles/coffee-store.module.css"
import Image from "next/image";
import { FetchCoffeeStores } from "@/lib/coffe-stores";


/* server side starts */
export async function getStaticProps(staticProps) {
    const params = staticProps.params;
    console.log("THIS IS PARAMS", params)

    const coffeeStores = await FetchCoffeeStores()

    return {
        props: {
            coffeeStore: coffeeStores.find(coffeStore => (
                coffeStore.id.toString() === params.id
            ))
        }
    }
}

export async function getStaticPaths() {
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
export default function CoffeStore({ coffeeStore }) {
    /* use router runs on client */
    const router = useRouter()
    const id = useRouter().query.id;

    if (router.isFallback) {
        return <div>Loading...</div>
    }



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
                        src={imgUrl}
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

