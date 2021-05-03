import Image from "next/image";
import { useState, useEffect } from "react";
import ReactMapGl, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Geocode from "react-geocode";

export default function EventMap({ evt }) {
    const [lat, setLat] = useState(40.712);
    const [lng, setLng] = useState(-73.935242);
    const [loading, setLoading] = useState(false);
    const [viewport, setViewport] = useState({
        latitude: 40.712,
        longitude: -73.935242,
        width: "100%",
        height: "500px",
        zoom: 12
    });

    useEffect(async () => {
        try {
            const response = await Geocode.fromAddress(evt.address);
            const { lat, lng } = response.results[0].geometry.location;
            setLat(lat);
            setLng(lng);
            setViewport({ ...viewport, latitude: lat, longitude: lng })
            setLoading(false);
            console.log(lat, lng);
        } catch (err) {
            console.log(err);
        }

    })

    Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);
    if (loading) return false;
    return (
        <ReactMapGl {...viewport} mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN} onViewportChange={(vp) => setViewport(vp)}>
            <Marker key={evt.id} latitude={lat} longitude={lng}>
                <Image src="/images/pin.svg" width={30} height={30} />
            </Marker>
        </ReactMapGl>
    )
}
