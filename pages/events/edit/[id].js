import { useState } from "react";
import moment from "moment";
import { FaImage } from "react-icons/fa"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";
import { API_URL } from "@/config/index";
import { parseCookies } from "@/helpers/index"
import styles from "@/styles/Form.module.css";
import axios from "axios";

export default function EditEventPage({ resEvent, token }) {
    const [values, setValues] = useState({
        name: resEvent.name,
        performers: resEvent.performers,
        venue: resEvent.venue,
        address: resEvent.address,
        date: resEvent.date,
        time: resEvent.time,
        description: resEvent.description
    })
    const [imagePreview, setImagePreview] = useState(resEvent.image ? resEvent.image.formats.thumbnail.url : null)
    const [showModal, setShowModal] = useState(false);

    const router = useRouter();


    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate
        const hasEmptyFields = Object.values(values).some(element => element === "");
        if (hasEmptyFields) {
            toast.error("Please fill all fields");
        }
        const res = await fetch(`${API_URL}/events/${resEvent.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(values),
        })

        if (!res.ok) {
            if (res.status === 403 || res.status === 401) {
                toast.error('No token included')
                return
            }
            toast.error('Something Went Wrong')
        } else {
            const resEvent = await res.json()
            router.push(`/events/${resEvent.slug}`)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value })
    }

    const imageUploaded = async (e) => {
        const res = await axios.get(`${API_URL}/events/${resEvent.id}`);
        const data = res.data;
        setImagePreview(data.image.formats.thumbnail.url);
        setShowModal(false);
    }

    return (
        <Layout title="Add New Event">
            <Link href="/events">Go Back</Link>
            <h1>Edit Event</h1>
            <ToastContainer />
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.grid}>
                    <div>
                        <label htmlFor="name">Event Name</label>
                        <input type="text" name="name" id="name" value={values.name} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor='performers'>Performers</label>
                        <input
                            type='text'
                            name='performers'
                            id='performers'
                            value={values.performers}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='venue'>Venue</label>
                        <input
                            type='text'
                            name='venue'
                            id='venue'
                            value={values.venue}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='address'>Address</label>
                        <input
                            type='text'
                            name='address'
                            id='address'
                            value={values.address}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='date'>Date</label>
                        <input
                            type='date'
                            name='date'
                            id='date'
                            value={moment(values.date).format("yyyy-MM-DD")}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='time'>Time</label>
                        <input
                            type='text'
                            name='time'
                            id='time'
                            value={values.time}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor='description'>Event Description</label>
                    <textarea
                        type='text'
                        name='description'
                        id='description'
                        value={values.description}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
                <input type="submit" value="Update Event" className="btn" />
            </form>
            <h2>Event Image</h2>
            {imagePreview ? (<Image src={imagePreview} height={100} width={170} />)
                :
                (<div>
                    <p>No Image Uploaded</p>
                </div>)}
            <div>
                <button className="btn-secondary" onClick={() => setShowModal(true)}>
                    <FaImage /> Set Image
                </button>
            </div>

            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <ImageUpload eventId={resEvent.id} imageUploaded={imageUploaded} token={token} />
            </Modal>
        </Layout>
    )
}

export async function getServerSideProps({ params: { id }, req }) {
    const { token } = parseCookies(req);

    const res = await fetch(`${API_URL}/events/${id}`)
    const resEvent = await res.json()
    console.log(req.headers.cookie);
    return {
        props: {
            resEvent, token
        }
    }
}