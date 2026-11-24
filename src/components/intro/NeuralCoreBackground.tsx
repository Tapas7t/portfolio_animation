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
    camera.position.z = 23;

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
      gradient.addColorStop(0.2, 'rgba(255, 220, 140, 0.95)');
      gradient.addColorStop(0.48, 'rgba(255, 160, 30, 0.55)');
      gradient.addColorStop(0.78, 'rgba(255, 110, 0, 0.15)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 128, 128);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    const particleTexture = createParticleTexture();

    // 3. Generate Neural Ring Geometry (Hollow Center Framing Around Text)
    // Major radii create an expansive elliptical ring framing the central text box
    const NODE_COUNT = 340;
    const majorRadiusX = 11.2;
    const majorRadiusY = 8.2;
    const tubeRadius = 2.2;

    // Strict Central Exclusion Zone (Elliptical boundary where ZERO nodes or lines can cross)
    const EXCLUSION_X = 7.5;
    const EXCLUSION_Y = 4.4;

    const nodePositions: THREE.Vector3[] = [];
    const baseNodePositions: THREE.Vector3[] = [];
    const nodeVelocities: THREE.Vector3[] = [];
    const nodeColors = new Float32Array(NODE_COUNT * 3);
    const nodeSizes = new Float32Array(NODE_COUNT);

    // Colors: Solar Gold (#FFAE19), Blazing Core (#FF6A00), White Flare, and Ice Blue (#89AACC)
    const colorGold = new THREE.Color(0xffb326);
    const colorOrange = new THREE.Color(0xff6a00);
    const colorWhite = new THREE.Color(0xfffaed);
    const colorCyan = new THREE.Color(0x89aacc);

    for (let i = 0; i < NODE_COUNT; i++) {
      const u = Math.random() * Math.PI * 2;
      const v = Math.random() * Math.PI * 2;

      const r = tubeRadius * (0.6 + Math.random() * 0.7);

      // Elliptical distribution matching widescreen viewports
      let x = (majorRadiusX + r * Math.cos(v)) * Math.cos(u);
      let y = (majorRadiusY + r * Math.cos(v)) * Math.sin(u);
      const z = r * Math.sin(v) * (0.8 + Math.random() * 0.5);

      // Enforce strict exclusion zone: if point falls inside center text box, push it outwards
      const distRatio = Math.sqrt((x / EXCLUSION_X) ** 2 + (y / EXCLUSION_Y) ** 2);
      if (distRatio < 1.05) {
        const boost = 1.12 / Math.max(0.01, distRatio);
        x *= boost;
        y *= boost;
      }

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

      // Color assignment
      const rnd = Math.random();
      const vertexColor = new THREE.Color();
      if (rnd < 0.22) {
        vertexColor.copy(colorWhite);
        nodeSizes[i] = 1.6 + Math.random() * 1.3;
      } else if (rnd < 0.78) {
        vertexColor.lerpColors(colorGold, colorOrange, Math.random());
        nodeSizes[i] = 1.1 + Math.random() * 0.9;
      } else {
        vertexColor.copy(colorCyan);
        nodeSizes[i] = 0.9 + Math.random() * 0.7;
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
      size: 1.25,
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
    // Crucial rule: NO lines may cross the center exclusion zone!
    const MAX_DISTANCE = 2.6;
    const lineIndices: number[] = [];

    for (let i = 0; i < NODE_COUNT; i++) {
      let connections = 0;
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const d = nodePositions[i].distanceTo(nodePositions[j]);
        if (d < MAX_DISTANCE) {
          // Check line midpoint to guarantee it doesn't cut through the center text
          const midX = (nodePositions[i].x + nodePositions[j].x) * 0.5;
          const midY = (nodePositions[i].y + nodePositions[j].y) * 0.5;
          const midDistRatio = Math.sqrt((midX / (EXCLUSION_X * 0.95)) ** 2 + (midY / (EXCLUSION_Y * 0.95)) ** 2);

          if (midDistRatio >= 1.0) {
            lineIndices.push(i, j);
            connections++;
            if (connections > 4) break;
          }
        }
      }
    }

    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute('position', nodesGeometry.getAttribute('position'));
    linesGeometry.setIndex(lineIndices);

    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0xffaa2b,
      transparent: true,
      opacity: 0.26,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    coreGroup.add(linesMesh);

    // 5. High-Energy Synaptic Spark Hotspots (Radiant Flares)
    // 16 designated neural hubs along the outer perimeter that pulse
    const HUB_COUNT = 16;
    const hubIndices: number[] = [];
    for (let i = 0; i < HUB_COUNT; i++) {
      hubIndices.push(Math.floor((i * NODE_COUNT) / HUB_COUNT));
    }

    const hubsGeometry = new THREE.BufferGeometry();
    const hubPositionsArray = new Float32Array(HUB_COUNT * 3);
    hubsGeometry.setAttribute('position', new THREE.BufferAttribute(hubPositionsArray, 3));

    const hubsMaterial = new THREE.PointsMaterial({
      size: 3.2,
      color: 0xffe073,
      map: particleTexture || undefined,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const hubsMesh = new THREE.Points(hubsGeometry, hubsMaterial);
    coreGroup.add(hubsMesh);

    // 6. Concentric Orbital Guide Rings Framing the Outer Perimeter
    const createOrbitalRing = (radiusX: number, radiusY: number, tiltX: number, tiltY: number, colorHex: number, opacity: number) => {
      const ringPoints: THREE.Vector3[] = [];
      const segments = 120;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        ringPoints.push(new THREE.Vector3(Math.cos(theta) * radiusX, Math.sin(theta) * radiusY, 0));
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

    const orbitRing1 = createOrbitalRing(13.5, 9.8, 0.12, 0.22, 0xffbe3b, 0.16);
    const orbitRing2 = createOrbitalRing(15.2, 11.2, -0.18, 0.15, 0x89aacc, 0.11);
    const orbitRing3 = createOrbitalRing(16.8, 12.5, 0.28, -0.12, 0xff7700, 0.08);

    coreGroup.add(orbitRing1);
    coreGroup.add(orbitRing2);
    coreGroup.add(orbitRing3);

    // 7. Ambient Floating Cosmic Bokeh Particles (Only Outside the Text Zone)
    const BOKEH_COUNT = 60;
    const bokehGeometry = new THREE.BufferGeometry();
    const bokehPositions = new Float32Array(BOKEH_COUNT * 3);
    const bokehColors = new Float32Array(BOKEH_COUNT * 3);

    for (let i = 0; i < BOKEH_COUNT; i++) {
      let bx = (Math.random() - 0.5) * 44;
      let by = (Math.random() - 0.5) * 32;
      const bz = (Math.random() - 0.5) * 16 - 2;

      // Keep center clear of bokeh dots
      if (Math.abs(bx) < EXCLUSION_X && Math.abs(by) < EXCLUSION_Y) {
        bx += bx >= 0 ? EXCLUSION_X * 0.9 : -EXCLUSION_X * 0.9;
      }

      bokehPositions[i * 3] = bx;
      bokehPositions[i * 3 + 1] = by;
      bokehPositions[i * 3 + 2] = bz;

      const rnd = Math.random();
      const col = rnd < 0.65 ? colorGold : colorCyan;
      bokehColors[i * 3] = col.r;
      bokehColors[i * 3 + 1] = col.g;
      bokehColors[i * 3 + 2] = col.b;
    }

    bokehGeometry.setAttribute('position', new THREE.BufferAttribute(bokehPositions, 3));
    bokehGeometry.setAttribute('color', new THREE.BufferAttribute(bokehColors, 3));

    const bokehMaterial = new THREE.PointsMaterial({
      size: 1.6,
      vertexColors: true,
      map: particleTexture || undefined,
      transparent: true,
      opacity: 0.38,
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
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const progress = progressRef.current || 0;

      // Smooth mouse lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // Base rotation speed accelerates as user scrolls towards 100%
      const speedMultiplier = 1.0 + progress * 2.5;
      const baseRotY = elapsedTime * 0.14 * speedMultiplier;
      const baseRotX = Math.sin(elapsedTime * 0.3) * 0.1;
      const baseRotZ = elapsedTime * 0.06 * speedMultiplier;

      // Core rotation with 3D mouse tilt
      coreGroup.rotation.y = baseRotY + currentMouseX * 0.38;
      coreGroup.rotation.x = baseRotX + currentMouseY * 0.32;
      coreGroup.rotation.z = baseRotZ;

      // Orbital rings rotate at distinct speeds
      orbitRing1.rotation.z += 0.0018 * speedMultiplier;
      orbitRing2.rotation.z -= 0.0014 * speedMultiplier;
      orbitRing3.rotation.z += 0.001 * speedMultiplier;

      // Scroll-Driven Scale & Warp Transition
      if (progress < 0.8) {
        // Subtle expansion as progress counts 000% -> 100%
        const scale = 1.0 + progress * 0.2;
        coreGroup.scale.set(scale, scale, scale);
        coreGroup.position.z = progress * 1.5;
        linesMaterial.opacity = 0.26 + progress * 0.16;
        nodesMaterial.opacity = 0.95;
      } else {
        // 80% to 100%: Curtain lifts, dimensional warp zoom into Hero section
        const warp = (progress - 0.8) / 0.2; // 0 to 1
        const scale = 1.2 + warp * 2.4;
        coreGroup.scale.set(scale, scale, scale);
        coreGroup.position.z = 1.5 + warp * 7.0;
        linesMaterial.opacity = Math.max(0, 0.42 * (1 - warp * 1.2));
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
        const wave = Math.sin(elapsedTime * 2.0 + base.x * 0.5 + base.y * 0.5) * 0.16;
        posArr[i * 3] = base.x + vel.x * Math.sin(elapsedTime) * 10 + (base.x / majorRadiusX) * wave;
        posArr[i * 3 + 1] = base.y + vel.y * Math.cos(elapsedTime) * 10 + (base.y / majorRadiusY) * wave;
        posArr[i * 3 + 2] = base.z + vel.z * Math.sin(elapsedTime * 1.4) * 6 + wave * 0.4;
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
      const pulse = Math.sin(elapsedTime * 4.0 + progress * 5.5) * 0.4 + 0.6;
      hubsMaterial.size = (3.0 + pulse * 1.6) * (1.0 + progress * 0.45);

      // Bokeh particles drifting
      const bokehAttr = bokehGeometry.getAttribute('position') as THREE.BufferAttribute;
      const bokehArr = bokehAttr.array as Float32Array;
      for (let b = 0; b < BOKEH_COUNT; b++) {
        bokehArr[b * 3 + 1] += 0.005;
        if (bokehArr[b * 3 + 1] > 16) {
          bokehArr[b * 3 + 1] = -16;
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
