import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Globe3D = ({ deviceType }) => {
  const meshRef = useRef();
  const groupRef = useRef();
  const [scrollRotation, setScrollRotation] = useState(0);
  
  // Load the GLB model - handle both development and production paths
  const modelPath = process.env.NODE_ENV === 'development' 
    ? '/Cursor-Hackathon/models/earth_cartoon.glb'
    : '/models/earth_cartoon.glb';
  const { scene } = useGLTF(modelPath);
  
  // Clone the scene to avoid modifying the original
  const clonedScene = useMemo(() => {
    return scene.clone();
  }, [scene]);

  // Scale the model based on device type for performance optimization
  const modelScale = useMemo(() => {
    return deviceType === 'mobile' ? 0.8 : deviceType === 'tablet' ? 0.9 : 1.0;
  }, [deviceType]);

  // Scroll-to-rotate behavior (horizontal around Y axis)
  useEffect(() => {
    const handleWheel = (event) => {
      const rotationSpeed = 0.003;
      setScrollRotation((prev) => {
        const next = prev + event.deltaY * rotationSpeed;
        // Clamp to avoid runaway spins (± 4 full rotations)
        const max = Math.PI * 4;
        return Math.max(-max, Math.min(max, next));
      });
    };
    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  // Apply scroll-based rotation each frame
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x = scrollRotation;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Main Earth GLB Model */}
      <primitive
        ref={meshRef}
        object={clonedScene} // eslint-disable-line react/no-unknown-property
        scale={modelScale}
        position={[0, 0, 0]} // eslint-disable-line react/no-unknown-property
      />
      
      {/* Atmospheric glow effect */}
      <mesh>
        {/* eslint-disable-next-line react/no-unknown-property */}
        <sphereGeometry args={[1.1 * modelScale, 32, 32]} />
        <meshBasicMaterial
          color="#87ceeb"
          transparent={true} // eslint-disable-line react/no-unknown-property
          opacity={0.1}
          side={THREE.BackSide} // eslint-disable-line react/no-unknown-property
        />
      </mesh>
      
      {/* Additional atmospheric layers for desktop */}
      {deviceType === 'desktop' && (
        <mesh>
          {/* eslint-disable-next-line react/no-unknown-property */}
          <sphereGeometry args={[1.05 * modelScale, 32, 32]} />
          <meshBasicMaterial
            color="#add8e6"
            transparent={true} // eslint-disable-line react/no-unknown-property
            opacity={0.05}
            side={THREE.BackSide} // eslint-disable-line react/no-unknown-property
          />
        </mesh>
      )}
    </group>
  );
};

export default Globe3D;
