import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import './App.css'
import { MeshWobbleMaterial, OrbitControls, useHelper } from '@react-three/drei'
import { DirectionalLightHelper } from 'three';

const Cube = ({ position, size, color }) => {
  const ref = useRef();

  useFrame((state, delta) => {
    // delta rpresents the time difference between frames
    // state represents the current state of the canvas
    ref.current.rotation.x += delta;
    ref.current.rotation.y += delta;
    ref.current.position.z = Math.sin(state.clock.elapsedTime) * 2;
    console.log(state.clock.elapsedTime);
  });


  return (
    <mesh position={position} ref={ref}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
};

const Sphere = ({ position, size, color }) => {
  const ref = useRef();

  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);


  useFrame((state, delta) => {
    const speed = isHovered ? 1 : 0.2;
    ref.current.rotation.y += delta * speed;
  })

  return (
    <mesh
      position={position}
      ref={ref}
      onPointerEnter={(e) => { e.stopPropagation(), setIsHovered(true) }}
      onPointerLeave={() => setIsHovered(false)}
      onClick={() => setIsClicked(!isClicked)}
      scale={isClicked ? 1.5 : 2}
    >
      <sphereGeometry args={size} />
      <meshStandardMaterial color={isHovered ? "skyblue" : "orange"} wireframe />
    </mesh>
  )
}
// </code>
const Torus = ({ position, size, color }) => {
  const ref = useRef();
  useFrame((state, delta) => {
    ref.current.rotation.x += delta;
    ref.current.rotation.y += delta;
    ref.current.position.z = Math.sin(state.clock.elapsedTime) * 2;

  })
  return (
    <mesh position={position} ref={ref}>
      <torusGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

const TorusKnot = ({ position, size, color }) => {
  const ref = useRef();


  // useFrame((state, delta) => {
  //   ref.current.rotation.x += delta;
  //   ref.current.rotation.y += delta;
  //   ref.current.position.z = Math.sin(state.clock.elapsedTime) *2;

  // })

  return (
    <mesh position={position} ref={ref}>
      <torusKnotGeometry args={size} />
      {/* <meshStandardMaterial color={color} /> */}
      <MeshWobbleMaterial factor={5} speed={2} />
    </mesh>
  )
}

const Scene = () => {

  const directionalLightRef = useRef();
  useHelper(directionalLightRef, DirectionalLightHelper, .5, "blue")

  return (
    <>
      {/*Add some lights to make mesh visible */}
      <directionalLight position={[0, 0, 2]} ref={directionalLightRef}/>
      <ambientLight intensity={0.5} />
      {/*We can create a group, by adding group tag which is like dev tag we change the position and other properties direcly from group tag*/}

      {/* <group position={[0,-1, 0]}>
        <Cube position={[1, 0, 0]} size={[1,1,1]} color={"red"}/>
        <Cube position={[-1, 0, 0]} size={[1,1,1]} color={"green"}/>
        <Cube position={[1, 2, 0]} size={[1,1,1]} color={"blue"}/>
        <Cube position={[-1, 2, 0]} size={[1,1,1]} color={"yellow"}/>
    </group> */}
      {/* <Cube position={[0, 0, 0]} size={[1,1,1]} color={"orange"}/> */}
      {/* <Sphere position={[0,0,0]} size={[1,32,32]} color={'orange'}/> */}
      {/* <Torus position={[2.2, 0, 0]} size={[.7, 0.3, 16, 100]} color={"pink"} /> */}
      <TorusKnot position={[0, 0, 0]} size={[1, .1, 1000, 50]} color={"violet"} />
      <OrbitControls />
    </>
  )
}

function App() {

  return (
    <>
      <Canvas>
        <Scene/>
      </Canvas>
    </>
  )
}

export default App
