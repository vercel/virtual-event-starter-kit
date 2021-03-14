import {useRouter} from "next/router";
import styles from './ibov.module.css';

export default function IbovImage() {
    const { query } = useRouter();
    return (
        <div className={styles.background}>
            <div className={styles.page}>
                <h1> Oi iBov</h1>
                <h2>Teste</h2>
            </div>
        </div>

    );
}