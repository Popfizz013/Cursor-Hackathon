/* eslint-disable react/no-unknown-property */
import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

const modelPath = process.env.NODE_ENV === 'development'
  ? '/Cursor-Hackathon/models/earth_cartoon.glb'
  : '/models/earth_cartoon.glb';

const DetailedGlobe = ({ modelScale, deviceType }) => {
  const { scene } = useGLTF(modelPath);

  const clonedScene = useMemo(() => {
    if (!scene) return null;

    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child.isMesh) {
        child.renderOrder = 1;
        if (child.material) {
          const material = child.material.clone ? child.material.clone() : child.material;
          material.depthWrite = true;
          material.depthTest = true;
          material.transparent = false;
          material.side = THREE.FrontSide;
          child.material = material;
        }
        if (child.geometry) {
          child.geometry.computeVertexNormals();
        }
      }
    });

    return clone;
  }, [scene]);

  const outlineMaterial = useMemo(() => {
    const material = new THREE.MeshBasicMaterial({
      color: '#0b1d3b',
      side: THREE.BackSide,
      transparent: true,
      opacity: 0.1,
      depthWrite: false
    });
    material.renderOrder = 0;
    return material;
  }, []);

  const glassMaterial = useMemo(() => (
    <MeshTransmissionMaterial
      thickness={0.18}
      transmission={0.92}
      anisotropy={0.18}
      chromaticAberration={0.04}
      roughness={0.12}
      clearcoat={0.9}
      clearcoatRoughness={0.12}
      backside={false}
    />
  ), []);

  return (
    <>
      {clonedScene && (
        <primitive
          // eslint-disable-next-line react/no-unknown-property
          object={clonedScene}
          // eslint-disable-next-line react/no-unknown-property
          scale={modelScale}
          // eslint-disable-next-line react/no-unknown-property
          position={[0, 0, 0]}
        />
      )}
      <mesh scale={modelScale * 1.08} renderOrder={2}>
        {/* eslint-disable-next-line react/no-unknown-property */}
        <sphereGeometry args={[1, 32, 32]} />
        {glassMaterial}
      </mesh>
      {deviceType === 'desktop' && (
        <mesh scale={modelScale * 1.02} renderOrder={0}>
          {/* eslint-disable-next-line react/no-unknown-property */}
          <sphereGeometry args={[1, 32, 32]} />
          {/* eslint-disable-next-line react/no-unknown-property */}
          <primitive object={outlineMaterial} attach="material" />
        </mesh>
      )}
    </>
  );
};

const Globe3D = ({ deviceType, activeChapter, info }) => {
  const meshRef = useRef();
  const groupRef = useRef();
  const [targetRotation, setTargetRotation] = useState(new THREE.Euler(0, 0, 0));
  const currentRotationRef = useRef(new THREE.Euler(0, 0, 0));
  
  // Scale the model based on device type for performance optimization
  const modelScale = useMemo(() => {
    return deviceType === 'mobile' ? 0.65 : deviceType === 'tablet' ? 0.85 : 1.0;
  }, [deviceType]);

  useEffect(() => {
    if (!info || !info.data) return;

    if (info.data.globeRotation) {
      const { x = 0, y = 0, z = 0 } = info.data.globeRotation;
      setTargetRotation(new THREE.Euler(x, y, z));
    } else {
      const fallbackRotation = new THREE.Euler(
        0.1 * (info.section || 0),
        Math.PI / 8 * (info.section || 0),
        0
      );
      setTargetRotation(fallbackRotation);
    }
  }, [info]);

  // Scroll-to-rotate behavior replaced with section-based easing
  useEffect(() => {
    if (!info || !info.data) return;

    const progress = info.progress ?? 0;
    const baseRotation = info.data.globeRotation || {
      x: 0.1 * (activeChapter || 0),
      y: Math.PI / 6 * (activeChapter || 0),
      z: 0
    };

    const computedRotation = new THREE.Euler(
      baseRotation.x + progress * 0.2,
      baseRotation.y + progress * 0.5,
      baseRotation.z + progress * 0.1
    );

    setTargetRotation(computedRotation);
  }, [info, activeChapter]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const currentRotation = currentRotationRef.current;

    currentRotation.x = THREE.MathUtils.damp(
      currentRotation.x,
      targetRotation.x,
      6,
      delta
    );
    currentRotation.y = THREE.MathUtils.damp(
      currentRotation.y,
      targetRotation.y,
      6,
      delta
    );
    currentRotation.z = THREE.MathUtils.damp(
      currentRotation.z,
      targetRotation.z,
      6,
      delta
    );

    groupRef.current.rotation.x = currentRotation.x;
    groupRef.current.rotation.y = currentRotation.y;
    groupRef.current.rotation.z = currentRotation.z;
  });

  if (deviceType === 'mobile') {
    return (
      <group ref={groupRef}>
        <mesh scale={modelScale * 0.95}>
          {/* eslint-disable-next-line react/no-unknown-property */}
          <icosahedronGeometry args={[1, 2]} />
          <meshStandardMaterial
            color="#4da1ff"
            metalness={0.25}
            roughness={0.4}
          />
        </mesh>
        <mesh scale={modelScale * 1.1}>
          {/* eslint-disable-next-line react/no-unknown-property */}
          <icosahedronGeometry args={[1, 3]} />
          <meshBasicMaterial
            color="#87ceeb"
            transparent
            opacity={0.1}
            side={THREE.BackSide}
          />
        </mesh>
      </group>
    );
  }

  return (
    <group ref={groupRef}>
      {deviceType === 'mobile' ? (
        <>
          <mesh scale={modelScale}>
            {/* eslint-disable-next-line react/no-unknown-property */}
            <icosahedronGeometry args={[1, 2]} />
            <meshStandardMaterial
              color="#4da1ff"
              metalness={0.2}
              roughness={0.45}
              emissive="#0b1d3b"
              emissiveIntensity={0.4}
            />
          </mesh>
          <mesh scale={modelScale * 1.1}>
            {/* eslint-disable-next-line react/no-unknown-property */}
            <icosahedronGeometry args={[1, 3]} />
            <meshBasicMaterial
              color="#87ceeb"
              transparent
              opacity={0.12}
              side={THREE.BackSide}
            />
          </mesh>
        </>
      ) : (
        <DetailedGlobe modelScale={modelScale} deviceType={deviceType} />
      )}
    </group>
  );
};

if (typeof window !== 'undefined') {
  useGLTF.preload(modelPath);
}

export default Globe3D;
/* eslint-enable react/no-unknown-property */
