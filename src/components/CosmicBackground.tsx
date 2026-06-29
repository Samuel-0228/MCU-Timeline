"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Deterministic pseudo-random number generator to maintain pure component render rules
function pseudoRandom(index: number): number {
  const x = Math.sin(index * 9999.9999) * 10000;
  return x - Math.floor(x);
}

function Starfield() {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate 2000 star particles deterministically in strict black, white, and neutral grays
  const [positions, colors] = useMemo(() => {
    const count = 2000;
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);

    // Strict black and white palettes with varying brightness/transparency shifts
    const palette = [
      new THREE.Color("#ffffff"),
      new THREE.Color("#a3a3a3"),
      new THREE.Color("#525252"),
      new THREE.Color("#262626"),
      new THREE.Color("#e5e5e5"),
    ];

    for (let i = 0; i < count; i++) {
      // Spread particles in a 3D sphere around the viewer using deterministic pseudo-random values
      pos[i * 3] = (pseudoRandom(i * 3) - 0.5) * 150;
      pos[i * 3 + 1] = (pseudoRandom(i * 3 + 1) - 0.5) * 150;
      pos[i * 3 + 2] = (pseudoRandom(i * 3 + 2) - 0.5) * 150;

      // Assign deterministic neutral color
      const colorIndex = Math.floor(pseudoRandom(i * 7) * palette.length);
      const color = palette[colorIndex];
      cols[i * 3] = color.r;
      cols[i * 3 + 1] = color.g;
      cols[i * 3 + 2] = color.b;
    }

    return [pos, cols];
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
      pointsRef.current.rotation.x += delta * 0.015;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={1.0}
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

export default function CosmicBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
      <Canvas camera={{ position: [0, 0, 40], fov: 60 }}>
        <fog attach="fog" args={["#000000", 25, 80]} />
        <Starfield />
      </Canvas>
    </div>
  );
}
