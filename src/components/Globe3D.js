import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';

const Globe3D = ({ deviceType }) => {
  const meshRef = useRef();
  const materialRef = useRef();

  // Optimize geometry based on device type
  const geometry = useMemo(() => {
    const segments = deviceType === 'mobile' ? 32 : deviceType === 'tablet' ? 48 : 64;
    return new THREE.SphereGeometry(1, segments, segments);
  }, [deviceType]);

  // Create earth-like material
  const earthMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#4a90e2',
      roughness: 0.8,
      metalness: 0.1,
      transparent: true,
      opacity: 0.9,
    });
  }, []);

  // Smooth rotation animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += deviceType === 'mobile' ? 0.002 : 0.005;
    }
  });

  return (
    <group>
      <Sphere
        ref={meshRef}
        args={[1, deviceType === 'mobile' ? 32 : deviceType === 'tablet' ? 48 : 64]}
        material={earthMaterial}
        position={[0, 0, 0]}
      />
      
      {/* Atmospheric glow effect */}
      <Sphere
        args={[1.1, 32, 32]}
        material={
          new THREE.MeshBasicMaterial({
            color: '#87ceeb',
            transparent: true,
            opacity: 0.1,
            side: THREE.BackSide,
          })
        }
      />
      
      {/* Additional atmospheric layers for desktop */}
      {deviceType === 'desktop' && (
        <>
          <Sphere
            args={[1.05, 32, 32]}
            material={
              new THREE.MeshBasicMaterial({
                color: '#add8e6',
                transparent: true,
                opacity: 0.05,
                side: THREE.BackSide,
              })
            }
          />
        </>
      )}
    </group>
  );
};

export default Globe3D;
