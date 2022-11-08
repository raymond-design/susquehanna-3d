import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, Stats } from "@react-three/drei";
import "./styles.css";
import Helpers from "./utils/Helpers";
import Effects from "./Effects";
import Terrain from "./components/ScatterHexagonMesh";
import { PCFSoftShadowMap, sRGBEncoding } from "three";
import Lights from "./components/Lights";
import GUI from "./components/GUI";
import appState from "./state/appState";
import Trees from "./components/Trees";
import Grass from "./components/Grass";
import Clouds from "./components/Clouds";
import useHexagonScatter from "./hooks/useHexagonScatter";

export default function App() {
  const points = useHexagonScatter(25);
  const general = appState((s) => s.general);

  return (
    <>
      {/* <GUI /> */}
      <Canvas
        shadows
        gl={{
          antialias: true,
          toneMappingExposure: 0.5,
          shadowMap: {
            enabled: true,
            type: PCFSoftShadowMap
          },
          outputEncoding: sRGBEncoding
        }}
        camera={{
          position: [5, 6, 5]
        }}
      >
        <Suspense fallback={null}>
          <group rotation-x={-Math.PI / 2}>
            {general.Trees && <Trees points={points} />}
            {general.Grass && <Grass points={points} />}
            {general.Clouds && <Clouds />}
            <Terrain points={points} />
          </group>
          <Environment preset="sunset" />
          <OrbitControls autoRotate autoRotateSpeed={0.4} enablePan={false} />
          {/* <Helpers /> */}
          <Effects />
          {/* <Stats /> */}
        </Suspense>
        <Lights />
      </Canvas> 
    </>
  );
}
