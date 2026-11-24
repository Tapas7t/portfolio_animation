import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface NeuralCoreBackgroundProps {
  progressRef: React.MutableRefObject<number>;
}

export const NeuralCoreBackground: React.FC<NeuralCoreBackgroundProps> = ({ progressRef }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.z = 21;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Master group holding the neural core
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 2. Procedural Circular Soft Glow Texture for Nodes
    const createParticleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.18, 'rgba(255, 220, 140, 0.95)');
      gradient.addColorStop(0.45, 'rgba(255, 160, 30, 0.55)');
      gradient.addColorStop(0.75, 'rgba(255, 120, 0, 0.15)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 128, 128);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    const particleTexture = createParticleTexture();

    // 3. Generate Neural Torus Geometry (Accretion Ring / Neural Plexus)
    const NODE_COUNT = 320;
    const majorRadius = 7.2;
    const minorRadius = 2.8;

    const nodePositions: THREE.Vector3[] = [];
    const baseNodePositions: THREE.Vector3[] = [];
    const nodeVelocities: THREE.Vector3[] = [];
    const nodeColors = new Float32Array(NODE_COUNT * 3);
    const nodeSizes = new Float32Array(NODE_COUNT);

    // Colors: Solar Gold (#FFAE19), Blazing Core (#FF5500), White Flare, and Ice Blue (#89AACC)
    const colorGold = new THREE.Color(0xffb326);
    const colorOrange = new THREE.Color(0xff6a00);
    const colorWhite = new THREE.Color(0xfffaed);
    const colorCyan = new THREE.Color(0x89aacc);

    for (let i = 0; i < NODE_COUNT; i++) {
      // Angles for toroidal distribution
      const u = Math.random() * Math.PI * 2;
      const v = Math.random() * Math.PI * 2;

      // Slight thickness randomness for organic neural cloud feel
      const r = minorRadius * (0.65 + Math.random() * 0.7);
      const R = majorRadius * (0.85 + Math.random() * 0.3);

      const x = (R + r * Math.cos(v)) * Math.cos(u);
      const y = (R + r * Math.cos(v)) * Math.sin(u);
      const z = r * Math.sin(v) * (0.8 + Math.random() * 0.4);

      const pos = new THREE.Vector3(x, y, z);
      nodePositions.push(pos.clone());
      baseNodePositions.push(pos.clone());

      // Slow organic drift velocity
      nodeVelocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.012,
          (Math.random() - 0.5) * 0.012,
          (Math.random() - 0.5) * 0.012
        )
      );

      // Color assignment: 65% Solar Golden sparks, 20% White flares, 15% Cyan accents
      const rnd = Math.random();
      const vertexColor = new THREE.Color();
      if (rnd < 0.2) {
        vertexColor.copy(colorWhite);
        nodeSizes[i] = 1.6 + Math.random() * 1.4;
      } else if (rnd < 0.75) {
        vertexColor.lerpColors(colorGold, colorOrange, Math.random());
        nodeSizes[i] = 1.1 + Math.random() * 1.0;
      } else {
        vertexColor.copy(colorCyan);
        nodeSizes[i] = 0.9 + Math.random() * 0.8;
      }

      nodeColors[i * 3] = vertexColor.r;
      nodeColors[i * 3 + 1] = vertexColor.g;
      nodeColors[i * 3 + 2] = vertexColor.b;
    }

    // Nodes Point Cloud
    const nodesGeometry = new THREE.BufferGeometry();
    const positionsArray = new Float32Array(NODE_COUNT * 3);
    for (let i = 0; i < NODE_COUNT; i++) {
      positionsArray[i * 3] = nodePositions[i].x;
      positionsArray[i * 3 + 1] = nodePositions[i].y;
      positionsArray[i * 3 + 2] = nodePositions[i].z;
    }
    nodesGeometry.setAttribute('position', new THREE.BufferAttribute(positionsArray, 3));
    nodesGeometry.setAttribute('color', new THREE.BufferAttribute(nodeColors, 3));
    nodesGeometry.setAttribute('size', new THREE.BufferAttribute(nodeSizes, 1));

    const nodesMaterial = new THREE.PointsMaterial({
      size: 1.3,
      vertexColors: true,
      map: particleTexture || undefined,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const nodesMesh = new THREE.Points(nodesGeometry, nodesMaterial);
    coreGroup.add(nodesMesh);

    // 4. Interconnecting Plexus Wireframe Struts (LineSegments)
    // Find nearby nodes and connect them
    const MAX_DISTANCE = 2.4;
    const lineIndices: number[] = [];

    for (let i = 0; i < NODE_COUNT; i++) {
      let connections = 0;
      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < MAX_DISTANCE) {
          lineIndices.push(i, j);
          connections++;
          if (connections > 4) break; // Limit per-node valence for clean geometry
        }
      }
    }

    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute('position', nodesGeometry.getAttribute('position'));
    linesGeometry.setIndex(lineIndices);

    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0xffaa2b,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    coreGroup.add(linesMesh);

    // 5. High-Energy Synaptic Spark Hotspots (Radiant Flares)
    // 16 designated neural hubs that pulse with fiery golden flares
    const HUB_COUNT = 16;
    const hubIndices: number[] = [];
    for (let i = 0; i < HUB_COUNT; i++) {
      hubIndices.push(Math.floor((i * NODE_COUNT) / HUB_COUNT));
    }

    const hubsGeometry = new THREE.BufferGeometry();
    const hubPositionsArray = new Float32Array(HUB_COUNT * 3);
    hubsGeometry.setAttribute('position', new THREE.BufferAttribute(hubPositionsArray, 3));

    const hubsMaterial = new THREE.PointsMaterial({
      size: 3.4,
      color: 0xffe073,
      map: particleTexture || undefined,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const hubsMesh = new THREE.Points(hubsGeometry, hubsMaterial);
    coreGroup.add(hubsMesh);

    // 6. Concentric Orbital Guide Rings (Scientific / Astronomical Rings)
    const createOrbitalRing = (radius: number, tiltX: number, tiltY: number, colorHex: number, opacity: number) => {
      const ringPoints: THREE.Vector3[] = [];
      const segments = 120;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        ringPoints.push(new THREE.Vector3(Math.cos(theta) * radius, Math.sin(theta) * radius, 0));
      }
      const ringGeom = new THREE.BufferGeometry().setFromPoints(ringPoints);
      const ringMat = new THREE.LineBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const ringMesh = new THREE.Line(ringGeom, ringMat);
      ringMesh.rotation.x = tiltX;
      ringMesh.rotation.y = tiltY;
      return ringMesh;
    };

    const orbitRing1 = createOrbitalRing(9.8, 0.15, 0.25, 0xffbe3b, 0.18);
    const orbitRing2 = createOrbitalRing(11.2, -0.22, 0.18, 0x89aacc, 0.12);
    const orbitRing3 = createOrbitalRing(12.6, 0.35, -0.15, 0xff7700, 0.08);

    coreGroup.add(orbitRing1);
    coreGroup.add(orbitRing2);
    coreGroup.add(orbitRing3);

    // 7. Ambient Floating Cosmic Bokeh Particles (Depth Layer)
    const BOKEH_COUNT = 75;
    const bokehGeometry = new THREE.BufferGeometry();
    const bokehPositions = new Float32Array(BOKEH_COUNT * 3);
    const bokehColors = new Float32Array(BOKEH_COUNT * 3);

    for (let i = 0; i < BOKEH_COUNT; i++) {
      bokehPositions[i * 3] = (Math.random() - 0.5) * 36;
      bokehPositions[i * 3 + 1] = (Math.random() - 0.5) * 28;
      bokehPositions[i * 3 + 2] = (Math.random() - 0.5) * 18 - 2;

      const rnd = Math.random();
      const col = rnd < 0.6 ? colorGold : colorCyan;
      bokehColors[i * 3] = col.r;
      bokehColors[i * 3 + 1] = col.g;
      bokehColors[i * 3 + 2] = col.b;
    }

    bokehGeometry.setAttribute('position', new THREE.BufferAttribute(bokehPositions, 3));
    bokehGeometry.setAttribute('color', new THREE.BufferAttribute(bokehColors, 3));

    const bokehMaterial = new THREE.PointsMaterial({
      size: 1.8,
      vertexColors: true,
      map: particleTexture || undefined,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const bokehMesh = new THREE.Points(bokehGeometry, bokehMaterial);
    scene.add(bokehMesh);

    // 8. Mouse Parallax & Smooth Lerp
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1; // -1 to 1
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1; // -1 to 1
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 9. Resize Handling
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // 10. Animation Loop (60 FPS Hardware-Accelerated)
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const progress = progressRef.current || 0;

      // Smooth mouse lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // Base rotation speed accelerates as user scrolls towards 100%
      const speedMultiplier = 1.0 + progress * 2.8;
      const baseRotY = elapsedTime * 0.16 * speedMultiplier;
      const baseRotX = Math.sin(elapsedTime * 0.35) * 0.12;
      const baseRotZ = elapsedTime * 0.08 * speedMultiplier;

      // Core rotation with 3D mouse tilt
      coreGroup.rotation.y = baseRotY + currentMouseX * 0.45;
      coreGroup.rotation.x = baseRotX + currentMouseY * 0.38;
      coreGroup.rotation.z = baseRotZ;

      // Orbital rings rotate at distinct speeds
      orbitRing1.rotation.z += 0.002 * speedMultiplier;
      orbitRing2.rotation.z -= 0.0016 * speedMultiplier;
      orbitRing3.rotation.z += 0.0012 * speedMultiplier;

      // Scroll-Driven Scale & Warp Transition
      if (progress < 0.8) {
        // Subtle expansion as progress counts 000% -> 100%
        const scale = 1.0 + progress * 0.22;
        coreGroup.scale.set(scale, scale, scale);
        coreGroup.position.z = progress * 1.5;
        linesMaterial.opacity = 0.28 + progress * 0.18;
        nodesMaterial.opacity = 0.95;
      } else {
        // 80% to 100%: Curtain lifts, dimensional warp zoom into Hero section
        const warp = (progress - 0.8) / 0.2; // 0 to 1
        const scale = 1.22 + warp * 2.2;
        coreGroup.scale.set(scale, scale, scale);
        coreGroup.position.z = 1.5 + warp * 7.0;
        linesMaterial.opacity = Math.max(0, 0.46 * (1 - warp * 1.2));
        nodesMaterial.opacity = Math.max(0, 0.95 * (1 - warp * 1.2));
        hubsMaterial.opacity = Math.max(0, 0.95 * (1 - warp * 1.2));
      }

      // Organic node pulsation & synaptic firing
      const posAttr = nodesGeometry.getAttribute('position') as THREE.BufferAttribute;
      const posArr = posAttr.array as Float32Array;

      for (let i = 0; i < NODE_COUNT; i++) {
        const base = baseNodePositions[i];
        const vel = nodeVelocities[i];

        // Breathing perturbation wave
        const wave = Math.sin(elapsedTime * 2.2 + base.x * 0.6 + base.y * 0.6) * 0.18;
        posArr[i * 3] = base.x + vel.x * Math.sin(elapsedTime) * 12 + (base.x / majorRadius) * wave;
        posArr[i * 3 + 1] = base.y + vel.y * Math.cos(elapsedTime) * 12 + (base.y / majorRadius) * wave;
        posArr[i * 3 + 2] = base.z + vel.z * Math.sin(elapsedTime * 1.5) * 8 + wave * 0.5;
      }
      posAttr.needsUpdate = true;

      // Update Hub positions and pulse sizes
      const hubPosAttr = hubsGeometry.getAttribute('position') as THREE.BufferAttribute;
      const hubPosArr = hubPosAttr.array as Float32Array;
      for (let h = 0; h < HUB_COUNT; h++) {
        const nodeIdx = hubIndices[h];
        hubPosArr[h * 3] = posArr[nodeIdx * 3];
        hubPosArr[h * 3 + 1] = posArr[nodeIdx * 3 + 1];
        hubPosArr[h * 3 + 2] = posArr[nodeIdx * 3 + 2];
      }
      hubPosAttr.needsUpdate = true;

      // Hotspots pulsing glow
      const pulse = Math.sin(elapsedTime * 4.5 + progress * 6.0) * 0.4 + 0.6;
      hubsMaterial.size = (3.2 + pulse * 1.8) * (1.0 + progress * 0.5);

      // Bokeh particles drifting
      const bokehAttr = bokehGeometry.getAttribute('position') as THREE.BufferAttribute;
      const bokehArr = bokehAttr.array as Float32Array;
      for (let b = 0; b < BOKEH_COUNT; b++) {
        bokehArr[b * 3 + 1] += 0.006;
        if (bokehArr[b * 3 + 1] > 14) {
          bokehArr[b * 3 + 1] = -14;
        }
      }
      bokehAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 11. Full Cleanup on Unmount (Prevent WebGL memory leaks)
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      nodesGeometry.dispose();
      nodesMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
      hubsGeometry.dispose();
      hubsMaterial.dispose();
      bokehGeometry.dispose();
      bokehMaterial.dispose();
      if (particleTexture) particleTexture.dispose();

      orbitRing1.geometry.dispose();
      (orbitRing1.material as THREE.Material).dispose();
      orbitRing2.geometry.dispose();
      (orbitRing2.material as THREE.Material).dispose();
      orbitRing3.geometry.dispose();
      (orbitRing3.material as THREE.Material).dispose();

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [progressRef]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
