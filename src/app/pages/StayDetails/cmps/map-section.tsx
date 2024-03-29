import { HTMLAttributes } from 'react'

import GoogleMapReact from 'google-map-react'
import { ILocation } from '../../../interfaces/stay'

interface MarkerProps {
    lat: number
    lng: number
}

function MapMarker(props: MarkerProps) {
    return <div className='map-marker'>📍</div>
}
// Map setup and data
const apiKey = process.env.REACT_APP_GOOGLE_MAP_API

export function MapSection({ stayLoc, staySummary }: { stayLoc: ILocation; staySummary: string }) {
    let center = { lat: 0, lng: 0 }
    if (stayLoc.lat && stayLoc.lng) {
        center = { lat: stayLoc.lat, lng: stayLoc.lng }
    }

    const mapOptions = {
        center: center,
        zoom: 2,
        styles: mapStyles,
    }
    return (
        <section className='map-section'>
            <h1>Where you’ll be</h1>
            <div style={{ height: '400px', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: apiKey }}
                    defaultCenter={mapOptions.center}
                    defaultZoom={2}
                    options={mapOptions}
                >
                    <MapMarker lat={stayLoc.lat} lng={stayLoc.lng} />
                </GoogleMapReact>
            </div>
            <div className='address font-medium'>{stayLoc.address}</div>
            <div className='summary'>{staySummary}</div>
        </section>
    )
}

const mapStyles = [
    {
        featureType: 'administrative.land_parcel',
        elementType: 'labels',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [
            {
                lightness: 45,
            },
        ],
    },
    {
        featureType: 'poi',
        elementType: 'labels.text',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'poi.attraction',
        stylers: [
            {
                visibility: 'simplified',
            },
        ],
    },
    {
        featureType: 'poi.business',
        stylers: [
            {
                visibility: 'simplified',
            },
        ],
    },
    {
        featureType: 'poi.medical',
        stylers: [
            {
                visibility: 'simplified',
            },
        ],
    },
    {
        featureType: 'poi.park',
        elementType: 'labels.text',
        stylers: [
            {
                color: '#bae3c5',
            },
        ],
    },
    {
        featureType: 'poi.place_of_worship',
        stylers: [
            {
                visibility: 'simplified',
            },
        ],
    },
    {
        featureType: 'road',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#ffffff',
            },
        ],
    },
    {
        featureType: 'road',
        elementType: 'labels.icon',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'road.arterial',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'road.highway',
        elementType: 'labels',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'road.highway.controlled_access',
        elementType: 'geometry',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'road.local',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'road.local',
        elementType: 'labels',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'transit',
        stylers: [
            {
                color: '#ffffff',
            },
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'transit.station.airport',
        stylers: [
            {
                visibility: 'simplified',
            },
        ],
    },
    {
        featureType: 'transit.station.bus',
        stylers: [
            {
                visibility: 'simplified',
            },
        ],
    },
    {
        featureType: 'transit.station.rail',
        stylers: [
            {
                visibility: 'simplified',
            },
        ],
    },
    {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [
            {
                color: '#b3e6f4',
            },
            {
                lightness: 5,
            },
            {
                visibility: 'on',
            },
        ],
    },
]
