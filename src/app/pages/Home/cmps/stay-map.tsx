import { IStayPreview } from '../../../interfaces/stay'
import GoogleMapReact from 'google-map-react'
import { forwardRef, HTMLAttributes, MutableRefObject, useMemo, useRef, useState } from 'react'
import { StayPreview } from './stay.preview'

interface Props {
    stays: IStayPreview[]
    onAddToWishlist: () => void
    onStayClick: (stayId: string) => void
}

enum Visibility {
    Visible = 'visible',
    Hidden = 'hidden',
}
type ContainerStyles = {
    [key in keyof React.CSSProperties]?: React.CSSProperties[key]
} & {
    left: number
    visibility: string
}

interface IStayContainerProps extends HTMLAttributes<HTMLDivElement> {
    lat: number
    lng: number
    children: JSX.Element
    containerStyles: ContainerStyles
    innerRef?: MutableRefObject<HTMLDivElement | null> | ((el: HTMLDivElement | null) => void)
}

interface MarkerProps extends HTMLAttributes<HTMLDivElement> {
    lat: number
    lng: number
    idx: number
    children: JSX.Element
    className?: string
    innerRef?: (el: HTMLDivElement | null) => void
    handleClick: (event: React.MouseEvent<HTMLDivElement>, idx: number) => void
}

export function StayMap({ stays, onAddToWishlist, onStayClick }: Props) {
    const markers = useMemo(() => {
        return stays.map((stay, idx) => ({
            lat: stay.loc.lat,
            lng: stay.loc.lng,
            price: currencySign + stay.price.toLocaleString(),
            _id: stay._id,
            idx,
        }))
    }, [stays])
    // Preview stay states and data
    const [stayToPreview, setStayToPreview] = useState<IStayPreview | null>(null)
    const [elSelectedMarker, setElCurrentMarker] = useState<HTMLDivElement | null>(null)
    const elPreviewContainer = useRef<HTMLDivElement>(null)
    // Preview methods

    function onMarkerClick(event: React.MouseEvent<HTMLDivElement>, idx: number) {
        event.stopPropagation()
        event.preventDefault()
        const stay = stays[idx]
        if (stayToPreview?._id === stay._id) {
            // Clicked on the same marker twice, close the preview
            setStayToPreview(null)
        } else {
            // Clicked on a different marker, show the preview
            setStayToPreview(stay)
            setElCurrentMarker(event.currentTarget) // Update the current marker
        }
    }

    function previewContainerStyles() {
        console.log('asdasd:')
        if (!elSelectedMarker) return { left: 0, visibility: Visibility.Hidden }

        const { left, width } = elSelectedMarker.getBoundingClientRect()
        if (isNaN(left) || isNaN(width)) return { left: 0, visibility: Visibility.Hidden }

        return {
            left: left + width / 2,
            visibility: stayToPreview ? Visibility.Visible : Visibility.Hidden,
        }
    }

    const StayPreviewContainer = forwardRef<HTMLDivElement, IStayContainerProps>(
        ({ containerStyles, children, ...rest }, ref) => (
            <div
                {...rest}
                style={{
                    position: 'absolute',
                    zIndex: 1,
                    top: 0,
                    left: `${containerStyles.left}px`, // Use template literal to set left property
                    visibility: containerStyles.visibility, // Use the provided visibility property
                }}
                ref={ref}
                className='map-stay-preview'
            >
                {children}
            </div>
        )
    )

    const Marker = ({ children, className, idx, handleClick }: MarkerProps) => (
        <div className={`marker-container ${className}`}>
            <div onClick={event => handleClick(event, idx)} className={`marker ${className}`}>
                {children}
            </div>
        </div>
    )

    return (
        <div className='index-map full'>
            <GoogleMapReact
                bootstrapURLKeys={{ key: apiKey }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                options={{
                    styles: mapStyles,
                    center: defaultProps.center,
                    zoom: defaultProps.zoom,
                }}
            >
                {markers.map((marker, idx) => (
                    <Marker
                        handleClick={onMarkerClick}
                        idx={idx}
                        key={marker._id}
                        lat={marker.lat}
                        lng={marker.lng}
                        className={stayToPreview?._id === marker._id ? 'active' : ''}
                    >
                        <span>{marker.price}</span>
                    </Marker>
                ))}
                {stayToPreview && elSelectedMarker ? (
                    <StayPreviewContainer
                        lat={stayToPreview?.loc.lat || 0}
                        lng={stayToPreview?.loc.lng || 0}
                        ref={elPreviewContainer}
                        containerStyles={previewContainerStyles()}
                    >
                        <div>
                            <StayPreview
                                onAddToWishlist={onAddToWishlist}
                                stay={stayToPreview}
                                isMapView={true}
                                onStayClick={onStayClick}
                            />
                        </div>
                    </StayPreviewContainer>
                ) : null}
            </GoogleMapReact>
        </div>
    )
}
// Map setup and data
const apiKey = 'AIzaSyAQdtY3afjXx7DgdmDjBYzKoLAVDUFdztw'
const defaultProps = {
    center: {
        lat: 37.7749,
        lng: -122.4194,
    },
    zoom: 2,
}
const currencySign = '$'

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
