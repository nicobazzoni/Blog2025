import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls } from "@react-three/drei";

function Model(props) {
  const { scene} = useGLTF("ecorche_-_anatomy_study.glb");
  const modelRef = useRef();

  // Rotate the model continuously
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.0050; // Adjust rotation speed as needed
    }
  });

  // Enable shadows on the model
  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return <primitive ref={modelRef} object={scene} scale={0.01} {...props} />;
}

function Eye() {
  return (
    <Canvas
      castShadow={true}
      dpr={[1, 2]}
      camera={{ fov: 45, position: [0, 1, 3] }} // Adjust position for better view
      style={{ position: "absolute", width: "100%", height: "100%" }}
    >
      <color attach="background" args={["#e0e0e0"]} /> {/* Light background */}
      
      {/* Control and Lighting */}
      <PresentationControls speed={1.5} global zoom={0.5} polar={[-0.1, Math.PI / 4]}>
        <Stage environment={null} intensity={0.5} shadows="accumulative">
          <Model />
        </Stage>
      </PresentationControls>

      {/* Lights with shadow adjustments */}
      <ambientLight intensity={0.2} /> {/* Soft ambient light */}
      <directionalLight
        intensity={0.8}
        position={[5, 5, 5]}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <spotLight
        position={[-5, 5, 5]}
        angle={0.3}
        penumbra={1}
        intensity={0.6}
        castShadow
      />
    </Canvas>
  );
}

export default Eye;