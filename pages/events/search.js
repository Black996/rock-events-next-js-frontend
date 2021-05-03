import axios from "axios";
import qs from "qs"
import {useRouter} from "next/router";
import Link from "next/link";
import Layout from '@/components/Layout';
import {API_URL} from "@/config/index";
import EventItem from "@/components/EventItem";

export default function SearchPage({resEvents, err}) {
  const router = useRouter();
    
  return (
    <Layout title="Search Results">
      <Link href="/events">Go Back</Link>
      <h1>Search Results for {router.query.term}</h1>
      {resEvents.length === 0 && <h3>No events to show</h3>}

      {resEvents.map(event => (
        <EventItem key={event.id} resEvent={event}>{event.name}</EventItem>
      ))}
    </Layout>
  )
}

export async function getServerSideProps({query}) {
    const queryN = qs.stringify({
      _where :{
        _or: 
          [
            {name_contains: query.term},
            {performers_contains: query.term},
            {description_contains: query.term},
            {venue_contains: query.term}
          ]
      }
    })
    const res = await axios.get(`${API_URL}/events?${queryN}`)
    const resEvents = res.data;
    return {
      props: {resEvents}}
   }