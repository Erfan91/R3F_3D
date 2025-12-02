import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import './App.css'

const Cube = ({position, size, color}) => {
  return (
     <mesh position={position}>
          <boxGeometry args={size}/>
          <meshStandardMaterial color={color} />
        </mesh>
  )
}

function App() {

  return (
    <>
      <Canvas>
      {/*Add some lights to make mesh visible */}
      <directionalLight position={[0,0,2]}/>
      <ambientLight intensity={0.5}/>  
      {/*We can create a group, by adding group tag which is like dev tag we change the position and other properties direcly from group tag*/}

    <group position={[0,-1, 0]}>
        <Cube position={[1, 0, 0]} size={[1,1,1]} color={"red"}/>
        <Cube position={[-1, 0, 0]} size={[1,1,1]} color={"green"}/>
        <Cube position={[1, 2, 0]} size={[1,1,1]} color={"blue"}/>
        <Cube position={[-1, 2, 0]} size={[1,1,1]} color={"yellow"}/>
    </group>

      </Canvas>
    </>
  )
}

export default App
