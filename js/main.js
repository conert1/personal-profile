
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});  

renderer.setPixelRatio(window.devicePixelRatio );
renderer.setSize(window.innerWidth, window.innerHeight); 
camera.position.setZ(30);

renderer.render(scene, camera);

 const geometry = new THREE.TorusGeometry(7, 2, 12, 80);
 const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
// const torus = new THREE.Mesh(geometry, material);

// scene.add(torus);
const PointLight = new THREE.PointLight(0xffffff);
PointLight.position.set(-20,10,0);

const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.position.set(150,150,150)
scene.add(PointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(PointLight);
scene.add(lightHelper);

for(var i=0; i< 50; i++){
  var x = Math.floor(Math.random() * (-50 - 50)+50);
  var y = Math.floor(Math.random() * (-50 - 50)+50);
  var z = Math.floor(Math.random() * (-80 - 80)+80);
  // var x = 9;
    const ge = new THREE.SphereGeometry(0.3,0.3,0.3);
const mat = new THREE.MeshBasicMaterial({color: 0xffffff});
const cube = new THREE.Mesh(ge, mat);

cube.position.set(x, y, z);

scene.add(cube);
}

const controls = new THREE.OrbitControls(camera, renderer.domElement);

// const rockGeometry = new THREE.IcosahedronGeometry(1,7);
// rockGeometry.vertices.forEach(vertex => {
//   const noise = 0.1;
//   vertex.x += Math.random()*noise-noise*0.2;
//   vertex.y += Math.random()*noise-noise*0.5;
//   vertex.z += Math.random()*noise-noise*0.1;
// });

// const rockMaterial = new THREE.MeshPhongMaterial({color: 0x808080});
// const rockMesh = new THREE.Mesh(rockGeometry, rockMaterial);
// scene.add(rockMesh);


const spaceTexture = new THREE.TextureLoader().load('pics/images.jpeg');
const dayTexture = new THREE.TextureLoader().load('pics/pi.jpeg');
const rock = new THREE.TextureLoader().load('./pics/rock.jpeg');
const moon = new THREE.TextureLoader().load("./pics/moon.jpeg");
const pic = new THREE.TextureLoader().load("pics/picc.png");
scene.background = spaceTexture;

const roundmoon =new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  
  new THREE.MeshBasicMaterial({map:moon})

);
const theRock =new THREE.Mesh(
  // new THREE.SphereGeometry(3,32,32),
  new THREE.SphereGeometry(10,6,32, 56),
  // new THREE.bo
  
  new THREE.MeshBasicMaterial({map:rock})

);

const picture = new THREE.Mesh(
  new THREE.BoxGeometry(7,7,7),
  new THREE.MeshBasicMaterial({map:pic})
)


// scene.add(roundmoon);
scene.add(picture)


// roundmoon.position.z = 30;
roundmoon.position.setX(-10);
theRock.position.setX(-15);


picture.position.setX(20);

function moveCamera(){
  // scene.add(roundmoon);
  const t = document.body.getBoundingClientRect().top;
  // requestAnimationFrame( animate);
  roundmoon.rotation.x += 0.1;
  theRock.rotation.x += 0.1;
  theRock.rotation.y += 0.2;
  picture.rotation.x += 0.2;
  picture.rotation.y += 0.2;
  picture.rotation.z += 0.2;
  // console.log("weeeee")
  // console.log(jj.rotation.x)
  // camera.position.z = t * -0.01; // Adjust the camera position based on scroll
  camera.fov = 0 + t * 0.1;
  // if (jj.rotation.x > 100){
  //   scene.background =moon;
  // }
  // jj.rotation.y += 0.075;
  // jj.rotation.z += 0.05;  
    // requestAnimationFrame( animate);
  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;
  
  controls.update();
  renderer.render(scene, camera);
  console.log(t);

  if(t<= -1600){
      scene.remove(roundmoon);
      scene.background = dayTexture; 
      scene.add(theRock);
      // moon = rock;
      
  }else{
    scene.remove(theRock);
    scene.background = spaceTexture;
    scene.add(roundmoon);
  }
  camera.updateProjectionMatrix();  
}

document.body.onscroll = moveCamera;

function animate(){
  // requestAnimationFrame( animate);
  // // torus.rotation.x += 0.01;
  // // torus.rotation.y += 0.005;
  // // torus.rotation.z += 0.01;
  
  // controls.update();
  // renderer.render(scene, camera);
}

animate()


