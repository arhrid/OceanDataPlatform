import { NextResponse } from "next/server"

// This is a mock data source. In a real application, you would fetch this data from CIMIS or another weather API.
const weatherData = {
  "1": { maxTemp: 75, minTemp: 55, avgTemp: 65, precipitation: 0.1, solarRadiation: 400, avgWindSpeed: 8 },
  "2": { maxTemp: 85, minTemp: 65, avgTemp: 75, precipitation: 0, solarRadiation: 450, avgWindSpeed: 5 },
  "3": { maxTemp: 80, minTemp: 60, avgTemp: 70, precipitation: 0.2, solarRadiation: 425, avgWindSpeed: 7 },
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id
  if (id in weatherData) {
    return NextResponse.json(weatherData[id as keyof typeof weatherData])
  } else {
    return NextResponse.json({ error: "Weather data not found" }, { status: 404 })
  }
}

