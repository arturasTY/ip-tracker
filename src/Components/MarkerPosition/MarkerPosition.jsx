import React, {useEffect} from 'react'
import {Icon} from 'leaflet'
import locationIcon from '../../assets/location_icon.png'
import {Marker, Popup, useMap} from 'react-leaflet'

const location = new Icon({
  iconUrl: locationIcon,
  iconSize: [42, 42],
})

const MarkerPosition = ({data}) => {
  const map = useMap()
  const position = [data?.location.lat, data?.location.lng]

  useEffect(() => {
    map.flyTo(position, 14, {
      animate: true,
      duration: 3
    })
  }, [map, position])
    
  return (
    <div>
        <Marker position={position} icon={location}>
            <Popup>
            {data?.location.region} <br /> {data?.ip}
            </Popup>
        </Marker>
    </div>
  )
}

export default MarkerPosition