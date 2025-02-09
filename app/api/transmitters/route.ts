import { NextResponse } from "next/server"

// This is a mock data source. In a real application, you would fetch this data from a database or external API.
const transmitters = [
  { id: "1", name: "San Francisco", latitude: 37.7749, longitude: -122.4194, status: "operational" },
  { id: "2", name: "Los Angeles", latitude: 34.0522, longitude: -118.2437, status: "operational" },
  { id: "3", name: "Sacramento", latitude: 38.5816, longitude: -121.4944, status: "non-operational" },
  // Add more transmitters as needed
]

export async function GET() {
  return NextResponse.json(transmitters)
}

