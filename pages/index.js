import axios from "axios";  
import Layout from '@/components/Layout';
import {API_URL} from "@/config/index";
import EventItem from "@/components/EventItem";
import Link from "next/link";

export default function HomePage({resEvents}) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {resEvents.length === 0 && <h3>No events to show</h3>}

      {resEvents.map(event => (
        <EventItem key={event.id} resEvent={event}>{event.name}</EventItem>
      ))}

{resEvents.length > 0 && (
          <Link href="/events">
              <a className="btn-secondary">View All Events</a>
          </Link>
      )}
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await axios.get(`${API_URL}/events?_sort=date:ASC&_limit=3`)
  const resEvents = res.data;
  return {
    props: {resEvents}, revalidate: 1
    }}