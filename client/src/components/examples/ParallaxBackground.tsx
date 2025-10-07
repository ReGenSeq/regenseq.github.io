import { ParallaxBackground } from '../ParallaxBackground'

export default function ParallaxBackgroundExample() {
  return (
    <div className="h-screen overflow-y-scroll">
      <ParallaxBackground />
      <div className="relative z-10 p-8">
        <h1 className="text-4xl font-bold mb-4">Parallax Background</h1>
        <p className="text-muted-foreground">Scroll to see the parallax effect</p>
        <div className="h-[300vh]" />
      </div>
    </div>
  )
}
