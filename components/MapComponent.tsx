"use client"

import { useState, useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/marker-icon-2x.png",
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
})

interface Transmitter {
  id: string
  name: string
  latitude: number
  longitude: number
  status: string
}

interface WeatherData {
  maxTemp: number
  minTemp: number
  avgTemp: number
  precipitation: number
  solarRadiation: number
  avgWindSpeed: number
}

const MapComponent = () => {
  const [transmitters, setTransmitters] = useState<Transmitter[]>([])
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    fetch("/api/transmitters")
      .then((response) => response.json())
      .then((data) => setTransmitters(data))
  }, [])

  const filteredTransmitters = transmitters.filter((t) => filter === "all" || t.status === filter)

  return (
    <div className="w-full h-[600px]">
      <div className="mb-4">
        <label htmlFor="filter" className="mr-2">
          Filter by status:
        </label>
        <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)} className="p-2 border rounded">
          <option value="all">All</option>
          <option value="operational">Operational</option>
          <option value="non-operational">Non-operational</option>
        </select>
      </div>
      <MapContainer center={[36.7783, -119.4179]} zoom={6} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {filteredTransmitters.map((transmitter) => (
          <Marker key={transmitter.id} position={[transmitter.latitude, transmitter.longitude]}>
            <Popup>
              <h3>{transmitter.name}</h3>
              <p>Status: {transmitter.status}</p>
              <WeatherInfo transmitterId={transmitter.id} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

const WeatherInfo = ({ transmitterId }: { transmitterId: string }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)

  useEffect(() => {
    fetch(`/api/weather/${transmitterId}`)
      .then((response) => response.json())
      .then((data) => setWeatherData(data))
  }, [transmitterId])

  if (!weatherData) return <p>Loading weather data...</p>

  return (
    <div>
      <h4 className="font-bold mt-2">Weather Data</h4>
      <p>Max Temp: {weatherData.maxTemp}°F</p>
      <p>Min Temp: {weatherData.minTemp}°F</p>
      <p>Avg Temp: {weatherData.avgTemp}°F</p>
      <p>Precipitation: {weatherData.precipitation} inches</p>
      <p>Solar Radiation: {weatherData.solarRadiation} Ly/day</p>
      <p>Avg Wind Speed: {weatherData.avgWindSpeed} mph</p>
    </div>
  )
}

export default MapComponent

