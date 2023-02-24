import styles from "./Card.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Card({ href, name, imgUrl }) {
    return (
        <Link href={href} className={styles.cardLink}>
            <div className={`glass ${styles.container}`}>
                <div className={styles.cardHeaderWrapper}>
                    <h2 className={styles.cardHeader}>{name}</h2>
                </div>
                <div className={styles.cardImageWrapper}>
                    <Image
                        className={styles.cardImage}
                        src={imgUrl} width={260} height={160}
                        alt={name}
                    />
                </div>
            </div>
        </Link>
    );
}