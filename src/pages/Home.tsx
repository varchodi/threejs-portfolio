import { Canvas } from "@react-three/fiber"
import { Suspense, useState } from "react"
import Loader from "../components/Loader"
import Island from "../models/Island"
import Sky from "../models/Sky"
import Bird from "../models/Bird"
import Plane from "../models/Plane"

const Home = () => {
  //?? rotation hook
  const [isRotating, setIsRotating] = useState(false);

    const ajustIslandForscreenSize = () => {
        let screenScale = null; const screenPosition = [0, -6.5, -43];
        const rotation = [0.1, 4.7, 0];

        if (window.innerWidth < 768) {
            screenScale = [0.9, 0.9, 0.9];
        } else {
            screenScale = [1,1,1];
        }

        return [screenScale,screenPosition,rotation]
  }
  
  const ajustPlaneForscreenSize = () => {
    let screenScale, screenPosition ;

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition=[0,-1.5,0]
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition];
}

  const [islandScale, islandPosition, islandRotation] = ajustIslandForscreenSize();
  const [planeScale, planePosition] = ajustPlaneForscreenSize();

  return (
    <section className='w-full h-screen relative'>
      {/* <div className="absolute top-28 left-0 right-0 z-0 flex items-center justify-center">
        popup
      </div> */}
      <Canvas 
        className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing':'cursor-grab'}`}
        camera={{near:0.1,far:1000}}
      >
        <Suspense fallback={<Loader/>}>
            {/* like sunlight  */}
            <directionalLight position={[1,1,1]} intensity={2}/>
            {/*uliminate all object without casting shadows */}
            <ambientLight intensity={0.5}/>
            {/* <pointLight/> */}
            {/* <spotLight /> */}
            <hemisphereLight skyColor={"#b1e1ff"} groundColor={"#000000"} intensity={1}/>
            <Bird/>
            <Sky/>
            <Island
                position={islandPosition}
                scale={islandScale}
            rotation={islandRotation} 
            // rotation ??
            isRotating={isRotating}
            setIsRotating={setIsRotating}
          />
          <Plane
            planeScale={planeScale}
            planePosition={planePosition}
            isRotating={isRotating}
            rotation={[0,20,0]}
          />
        </Suspense>
      </Canvas>
    </section>
  )
}

export default Home
