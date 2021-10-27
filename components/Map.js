import 'leaflet/dist/leaflet.css'
import React from 'react'
import { icon } from 'leaflet'
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet'
import socket from '../services/ws.service'
import randomColor from 'randomcolor'
import Loading from './Loading'

const ICON = icon({
  iconUrl: '/marker.png',
  iconSize: [10, 12],
})

const Map = () => {
  const [trucksPositions, setTrucksPositions] = React.useState({})

  React.useEffect(() => {
    socket.on('POSITION', (message) => {
      const { code, position } = message
      if (trucksPositions[code]) {
        trucksPositions[code] = {
          ...trucksPositions[code],
          latLng: [...trucksPositions[code]?.latLng, position],
        }
      } else {
        trucksPositions[code] = { color: randomColor(), latLng: [position] }
      }

      setTrucksPositions({
        ...trucksPositions,
      })
    })
  }, [])

  return Object.values(trucksPositions)[0] ? (
    <MapContainer
      center={Object.values(trucksPositions)[0].latLng[0]}
      zoom={11}
      scrollWheelZoom={false}
      style={{ minHeight: 450, width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {Object.values(trucksPositions).map((pos, index) => (
        <div key={index}>
          <Polyline positions={pos.latLng} pathOptions={{ color: pos.color }} />
          <Marker position={pos.latLng.slice(-1)[0]} icon={ICON} />
        </div>
      ))}
    </MapContainer>
  ) : (
    <Loading />
  )
}

export default Map
