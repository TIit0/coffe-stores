import styles from "./Banner.module.css"


export default function Banner({ buttonText, handleOnBannerBtnClick }) {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                <span className={styles.title_span1}>Coffe</span>
                <span className={styles.title_span2}>Connoisseur</span>
            </h1>
            <p className={styles.subtitle}>
                Discover your local coffee shops!
            </p>
            <div className={styles.buttonWrapper}>
                <button
                    className={styles.button}
                    onClick={handleOnBannerBtnClick}
                >{buttonText}
                </button>
            </div>
        </div>
    );
}   