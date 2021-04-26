import Link from "next/link";
import styles from "@/styles/Footer.module.css";

export default function Fotter() {
    return (
        <div className={styles.footer}>
            <p>Copyright &copy; Rock Events 2021</p>
            <p>
                <Link href="/about">About This Project</Link>
            </p>
        </div>
    )
}
