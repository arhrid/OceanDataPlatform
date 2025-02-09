import dynamic from "next/dynamic"

const MapComponent = dynamic(() => import("../components/MapComponent"), {
  ssr: false,
})

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">California Weather Map</h1>
      <MapComponent />
    </main>
  )
}

