import React from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, OrthographicCamera, useHelper, Center } from '@react-three/drei';

const Lights = ({ position, debug }) => {
  const light = React.useRef();
  useHelper(light, THREE.SpotLightHelper, 'yellow');

  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight ref={debug ? light : null} position={position} penumbra={1} angle={Math.PI / 7} />
      <pointLight position={[-10, -10, -10]} />
      {/* <ambientLight intensity={0.8} />
      <spotLight
        ref={debug ? light : null}
        // castShadow
        intensity={1}
        position={position}
        angle={Math.PI / 7}
        penumbra={1}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      /> */}
    </>
  );
};

export function StoryStage({
  children,
  cameraPosition = new THREE.Vector3(-5, 5, 5),
  zoom = 10,
  controls = true,
  lights = true,
  lightPosition = [-10, -35, 5],
  center = false,
  debugLights = false,
  ...restProps
}) {
  return (
    <div style={{ height: '100vh' }}>
      <Canvas shadows dpr={window.devicePixelRatio} {...restProps}>
        <color attach="background" args={['#fff']} />
        <OrthographicCamera makeDefault position={cameraPosition} zoom={zoom} />
        {center ? <Center>{children}</Center> : children}
        {lights && <Lights debug={debugLights} position={lightPosition} />}
        {controls && <OrbitControls />}
      </Canvas>
    </div>
  );
}
