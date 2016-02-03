/// <reference path="_reference.ts"/>

// MAIN GAME FILE

// THREEJS Aliases
import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import Camera = THREE.Camera;
import PerspectiveCamera = THREE.PerspectiveCamera;
import OrthographicCamera = THREE.OrthographicCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import Geometry = THREE.Geometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import Material = THREE.Material;
import Mesh = THREE.Mesh;
import Object3D = THREE.Object3D;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import AmbientLight = THREE.AmbientLight;
import DirectionalLight = THREE.DirectionalLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;
import Face3 = THREE.Face3;
import Point = objects.Point;

//Custom Game Objects
import gameObject = objects.gameObject;

var scene: Scene;
var renderer: Renderer;
var camera: Camera;
var axes: AxisHelper;
var cube: Mesh;
var plane: Mesh;
var sphere: Mesh;
var ambientLight: AmbientLight;
var ambientColour:string;
var spotLight: SpotLight;
var directionalLight: DirectionalLight;
var pointColour:string;
var pointLight: PointLight;
var control: Control;
var gui: GUI;
var stats: Stats;
var step: number = 0;
var invert: number = 1;
var phase: number = 0;
var planeMaterial: LambertMaterial;
var planeGeometry: PlaneGeometry;
var cubeMaterial: LambertMaterial;
var cubeGeometry: CubeGeometry;
var sphereMaterial: LambertMaterial;
var sphereGeometry: SphereGeometry;
var sphereLight: SphereGeometry;
var sphereLightMaterial: MeshBasicMaterial;
var sphereLightMesh: Mesh;

function init() {
    // Instantiate a new Scene object
    scene = new Scene();

    setupRenderer(); // setup the default renderer
	
    setupCamera(); // setup the camera
	
    // add an axis helper to the scene
    axes = new AxisHelper(20);
    scene.add(axes);
    console.log("Added Axis Helper to scene...");
    
    //Add a Plane to the Scene
    planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
    planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    plane = new gameObject(planeGeometry, planeMaterial, 15, 0, 0);
    plane.rotation.x = -0.5 * Math.PI;
    scene.add(plane);
    console.log("Added Plane Primitive to scene...");

    // Add a Cube to the Scene
    cubeMaterial = new LambertMaterial({ color: 0xff7777 });
    cubeGeometry = new CubeGeometry(4, 4, 4);
    cube = new gameObject(cubeGeometry, cubeMaterial, -4, 3, 0);
    scene.add(cube);
    console.log("Added Cube Primitive to the Scene");
    
    // Add a Sphere to the Scene
    sphereGeometry = new SphereGeometry(4, 20, 20);
    sphereMaterial = new LambertMaterial({color: 0x7777ff});
    sphere = new gameObject(sphereGeometry, sphereMaterial, 20, 0, 2);
    scene.add(sphere);
    console.log("Add a Sphere Primitive");
    
    // Add an AmbientLight to the scene
    ambientColour = "#0c0c0c";
    ambientLight = new AmbientLight(ambientColour);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
	
    // Add a SpotLight to the scene
    spotLight = new SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);
    console.log("Added a Spot Light to Scene");
    
    // Add a PointLight to the scene
    pointColour = "#ccffcc";
    pointLight = new PointLight(pointColour);
    scene.add(pointLight);
    console.log("Added a Point Light to Scene");
    
    // Add a small sphere simulating the pointLight
    sphereLight = new SphereGeometry(0.2);
    sphereLightMaterial = new MeshBasicMaterial({color: 0xac6c25});
    sphereLightMesh = new Mesh(sphereLight, sphereLightMaterial);
    sphereLightMesh.castShadow = true;
    sphereLightMesh.position = new Vector3(3, 5, 5);
    scene.add(sphereLightMesh);
    console.log("Added a Sphere Light to Scene");
    
    // add controls
    gui = new GUI();
    control = new Control(0.02, 0.03, ambientColour, pointColour, 1, 100);
    addControl(control);

    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");

    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    
    window.addEventListener('resize', onResize, false);
}

// Change the Camera Aspect Ratio according to Screen Size changes
function onResize(): void {
    if(camera instanceof PerspectiveCamera) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function addControl(controlObject: Control): void {
   gui.addColor(controlObject, 'ambientColour').onChange((color) =>{
       ambientLight.color = new Color(color);
   });
   
   gui.addColor(controlObject, 'pointColour').onChange((color) =>{
       pointLight.color = new Color(color);
   });
   
   gui.add(controlObject, 'intensity', 0, 3).onChange((color) =>{
      pointLight.intensity = color; 
   });
   
   gui.add(controlObject, 'distance', 0, 100).onChange((distance) =>{
      pointLight.distance = distance; 
   });
}

// Add Stats Object to the Scene
function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}

// Setup main game loop
function gameLoop(): void {
    stats.update();

    //rotate the cube around its axes
    cube.rotation.x += control.rotationSpeed;
    cube.rotation.y += control.rotationSpeed;
    cube.rotation.z += control.rotationSpeed;
    
    //bounce the sphere up and down
    step += control.bouncingSpeed;
    sphere.position.x = 20 + (10 * (Math.cos(step)));
    sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)));

    // move the light simulation
    if (phase > 2 * Math.PI) {
        invert = invert * -1;
        phase -= 2 * Math.PI;
    } else {
        phase += control.rotationSpeed;
    }
    
    sphereLightMesh.position.z = +(7 * (Math.sin(phase)));
    sphereLightMesh.position.x = +(14 * (Math.cos(phase)));
    
    if(invert < 0) {
        var pivot:number = 14;
        sphereLightMesh.position.x = (invert * 
        (sphereLightMesh.position.x - pivot)) + pivot;
    }
    
    //move pointLight along with SphereLightMesh
    pointLight.position.set(
        sphereLightMesh.position.x, 
        1, 
        sphereLightMesh.position.z);
    
    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
	
    // render the scene
    renderer.render(scene, camera);
}

// Setup default renderer
function setupRenderer(): void {
    renderer = new Renderer();
    renderer.setClearColor(0xEEEEEE, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...");
}

// Setup main camera for the scene
function setupCamera(): void {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = -25;
    camera.position.y = 30;
    camera.position.z = 25;
    camera.lookAt(new Vector3(10, 0, 0));
    console.log("Finished setting up Initial Camera...");
}
