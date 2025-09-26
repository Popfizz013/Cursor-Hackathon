import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Globe3D = ({ deviceType }) => {
  const meshRef = useRef();
  
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

  // Smooth rotation animation
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += deviceType === 'mobile' ? 0.002 : 0.005;
    }
  });

  return (
    <group>
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
