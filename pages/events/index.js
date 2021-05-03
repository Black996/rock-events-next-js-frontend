import axios from "axios";
import Layout from '@/components/Layout';
import EventItem from "@/components/EventItem";
import Pagination from "@/components/Pagination";
import { API_URL, PER_PAGE } from "@/config/index";

export default function EventsPage({ resEvents, total, page }) {

  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {resEvents.length === 0 && <h3>No events to show</h3>}

      {resEvents.map(event => (
        <EventItem key={event.id} resEvent={event}>{event.name}</EventItem>
      ))}
      <Pagination page={page} total={total} />
    </Layout>
  )
}

export async function getServerSideProps({ query: { page = 1 } }) {
  // Calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  // get total/count

  const resTotal = await axios.get(`${API_URL}/events/count`)
  const total = resTotal.data;

  // get events
  const resE = await axios.get(`${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`)
  const resEvents = resE.data;

  return {
    props: { resEvents, page: +page, total }
  }
}