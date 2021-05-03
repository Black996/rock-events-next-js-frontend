import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/EventItem.module.css";

export default function EventItem({resEvent}) {
    return (
        <div className={styles.event}>
            <div className={styles.img}>
                <Image 
                src={resEvent.image ? resEvent.image.formats.thumbnail.url: "/images/event-default.png"} 
                width={170} 
                height={100}/>
            </div>
            <div className={styles.info }>
                <span>
                    {new Date(resEvent.date).toLocaleDateString("en-US")} at {resEvent.time}
                </span>
                <h3>{resEvent.name}</h3>
            </div>
            <div className={styles.link}>
                <Link href={`/events/${resEvent.slug}`}>
                    <a className="btn">Details</a>
                </Link>
            </div>
        </div>
    )
}
