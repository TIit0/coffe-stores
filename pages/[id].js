import { useRouter } from "next/router";
import Head from "next/head";

export default function Dynamic() {
    const pageName = useRouter().query.id;

    return (
        <>
            <Head>
                <title>{pageName}</title>
            </Head>
            <p>This is the {pageName} page</p>
        </>
    );
}