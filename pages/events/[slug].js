// export {default} from "./event.page";
import { useRouter } from "next/router";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import Image from "next/image";
import { API_URL } from "@/config/index"
import Layout from "@/components/Layout";
import EventMap from "@/components/EventMap";
import styles from "@/styles/Event.module.css";


export default function EventPage({ resEvent }) {
    const router = useRouter();

    return (
        <Layout>
            <div className={styles.event}>

                <span>
                    {new Date(resEvent.date).toLocaleDateString("en-US")} at {resEvent.time}
                </span>
                <h1>{resEvent.name}</h1>
                <ToastContainer />
                {resEvent.image && (
                    <div className={styles.image}><Image src={resEvent.image.formats.medium.url} width={960} height={600} /></div>

                )}
                <h3>Performers:</h3>
                <p>{resEvent.performers}</p>
                <h3>Description:</h3>
                <p>{resEvent.description}</p>
                <h3>Venue: {resEvent.venue}</h3>
                <p>{resEvent.adderss}</p>

                <EventMap evt={resEvent} />

                <Link href="/events">
                    <a className={styles.back}>{">"} Go Back</a>
                </Link>
            </div>
        </Layout>
    )
};


export async function getStaticPaths() {
    const res = await axios.get(`${API_URL}/events`)
    const resEvents = res.data;

    const paths = resEvents.map(resEvent => ({
        params: { slug: resEvent.slug }
    }))
    return { paths, fallback: true }
}

export async function getStaticProps({ params }) {
    // console.log(params);
    const res = await axios(`${API_URL}/events?slug=${params.slug}`)
    const resEvents = res.data
    return {
        props: { resEvent: resEvents[0] },
        revalidate: 1
    }
}


// export async function getServerSideProps ({query}) {
//     console.log(query);
//     const res = await axios(`${API_URL}/api/events/${query.slug}`)
//     const resEvents = res.data
//     console.log(resEvents);
//     return {
//         props: {resEvent: resEvents[0]}
//     }
// }