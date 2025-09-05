'use client';

import React, { useRef, useEffect, memo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

interface EulerVisualizationProps {
  theta: number;
  zoom: number;
  rotation: { x: number; y: number };
  setRotation: (rotation: { x: number; y: number }) => void;
}

const EulerVisualization: React.FC<EulerVisualizationProps> = ({ theta, zoom, rotation }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const labelRendererRef = useRef<CSS2DRenderer>();
  const composerRef = useRef<EffectComposer>();
  const controlsRef = useRef<OrbitControls>();

  const vectorRef = useRef<THREE.Line>();
  const pointRef = useRef<THREE.Mesh>();
  const cosLineRef = useRef<THREE.Line>();
  const sinLineRef = useRef<THREE.Line>();

  useEffect(() => {
    const mountNode = mountRef.current;
    if (!mountNode) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, mountNode.clientWidth / mountNode.clientHeight, 0.1, 1000);
    camera.position.set(1.5, 1.5, 3);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountNode.clientWidth, mountNode.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountNode.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(mountNode.clientWidth, mountNode.clientHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    labelRenderer.domElement.style.pointerEvents = 'none';
    mountNode.appendChild(labelRenderer.domElement);
    labelRendererRef.current = labelRenderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 2;
    controls.maxDistance = 15;
    controls.target.set(0, 0, 0);
    controlsRef.current = controls;

    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(mountNode.clientWidth, mountNode.clientHeight), 1.0, 0.2, 0.1);
    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);
    composerRef.current = composer;

    const primaryColor = new THREE.Color(0x6F00FF);
    const accentColor = new THREE.Color(0x00FFFF);
    const gridColor = new THREE.Color(0x444444);
    
    const grid = new THREE.GridHelper(4, 10, gridColor, gridColor);
    grid.rotation.x = Math.PI / 2;
    scene.add(grid);
    
    const axesHelper = new THREE.AxesHelper(2.5);
    (axesHelper.material as THREE.Material).transparent = true;
    (axesHelper.material as THREE.Material).opacity = 0.5;
    scene.add(axesHelper);

    const createLabel = (text: string, x: number, y: number, z: number, className: string = '') => {
        const div = document.createElement('div');
        div.className = `text-sm font-headline px-1 py-0.5 rounded-md ${className}`;
        div.textContent = text;
        const label = new CSS2DObject(div);
        label.position.set(x, y, z);
        return label;
    };
    scene.add(createLabel('Re', 2.6, 0, 0, 'text-red-400'));
    scene.add(createLabel('Im', 0, 2.6, 0, 'text-green-400'));
    
    const circleGeometry = new THREE.BufferGeometry().setFromPoints(
        new THREE.Path().arc(0, 0, 1, 0, 2 * Math.PI, false).getPoints(100)
    );
    const circleMaterial = new THREE.LineBasicMaterial({ color: accentColor });
    const unitCircle = new THREE.Line(circleGeometry, circleMaterial);
    scene.add(unitCircle);

    const vectorMaterial = new THREE.LineBasicMaterial({ color: primaryColor, linewidth: 3 });
    const vectorGeom = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(1, 0, 0)]);
    const vector = new THREE.Line(vectorGeom, vectorMaterial);
    scene.add(vector);
    vectorRef.current = vector;
    
    const pointGeometry = new THREE.SphereGeometry(0.04, 16, 16);
    const pointMaterial = new THREE.MeshBasicMaterial({ color: primaryColor });
    const point = new THREE.Mesh(pointGeometry, pointMaterial);
    scene.add(point);
    pointRef.current = point;

    const lineMaterial = new THREE.LineDashedMaterial({ color: 0xffffff, dashSize: 0.05, gapSize: 0.05, transparent: true, opacity: 0.5 });
    const cosLineGeom = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(1, 0, 0), new THREE.Vector3(1, 0, 0)]);
    const cosLine = new THREE.Line(cosLineGeom, lineMaterial);
    scene.add(cosLine);
    cosLineRef.current = cosLine;
    
    const sinLineGeom = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 1, 0)]);
    const sinLine = new THREE.Line(sinLineGeom, lineMaterial);
    scene.add(sinLine);
    sinLineRef.current = sinLine;

    const keyPoints = [
      { text: '1', pos: new THREE.Vector3(1, 0, 0) },
      { text: 'i', pos: new THREE.Vector3(0, 1, 0) },
      { text: '-1', pos: new THREE.Vector3(-1, 0, 0) },
      { text: '-i', pos: new THREE.Vector3(0, -1, 0) },
    ];
    keyPoints.forEach(p => {
        const div = document.createElement('div');
        div.className = 'text-accent font-headline text-lg';
        div.textContent = p.text;
        const label = new CSS2DObject(div);
        label.position.copy(p.pos).multiplyScalar(1.15);
        scene.add(label);
    });

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      composer.render();
      labelRenderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (mountNode) {
        camera.aspect = mountNode.clientWidth / mountNode.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mountNode.clientWidth, mountNode.clientHeight);
        composer.setSize(mountNode.clientWidth, mountNode.clientHeight);
        labelRenderer.setSize(mountNode.clientWidth, mountNode.clientHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountNode) {
        mountNode.removeChild(renderer.domElement);
        mountNode.removeChild(labelRenderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    if (cameraRef.current && controlsRef.current) {
      const dir = new THREE.Vector3();
      cameraRef.current.getWorldDirection(dir);
      cameraRef.current.position.copy(controlsRef.current.target).addScaledVector(dir, -zoom);
    }
  }, [zoom]);

  useEffect(() => {
    const x = Math.cos(theta);
    const y = Math.sin(theta);
    
    if (vectorRef.current) {
      const positions = vectorRef.current.geometry.attributes.position as THREE.BufferAttribute;
      positions.setXYZ(1, x, y, 0);
      positions.needsUpdate = true;
    }
    
    if (pointRef.current) {
      pointRef.current.position.set(x, y, 0);
    }
    
    if (cosLineRef.current) {
      const positions = cosLineRef.current.geometry.attributes.position as THREE.BufferAttribute;
      positions.setXYZ(0, x, y, 0);
      positions.setXYZ(1, x, 0, 0);
      positions.needsUpdate = true;
      cosLineRef.current.computeLineDistances();
    }

    if (sinLineRef.current) {
      const positions = sinLineRef.current.geometry.attributes.position as THREE.BufferAttribute;
      positions.setXYZ(0, x, y, 0);
      positions.setXYZ(1, 0, y, 0);
      positions.needsUpdate = true;
      sinLineRef.current.computeLineDistances();
    }

  }, [theta]);
  
  return <div ref={mountRef} className="w-full h-full rounded-lg overflow-hidden border" />;
};

export default memo(EulerVisualization);
