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
const torus = new THREE.Mesh(geometry, material);

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

const spaceTexture = new THREE.TextureLoader().load('pics/images.jpeg');
const moon = new THREE.TextureLoader().load("./pics/moon.jpeg");
// console.log("PICTURES HERE")
const pic = new THREE.TextureLoader().load("pics/picc.png");
scene.background = spaceTexture;

const jj =new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  
  new THREE.MeshBasicMaterial({map:moon})

);

const picture = new THREE.Mesh(
  new THREE.BoxGeometry(7,7,7),
  new THREE.MeshBasicMaterial({map:pic})
)


scene.add(jj);
scene.add(picture)


jj.position.z = 30;
jj.position.setX(-10);

picture.position.setX(20);

function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  // requestAnimationFrame( animate);
  jj.rotation.x += 0.75;
  picture.rotation.x += 0.4;
  picture.rotation.y += 0.4;
  picture.rotation.z += 0.4;
  // console.log("weeeee")
  // console.log(jj.rotation.x)
  // camera.position.z = t * -0.01; // Adjust the camera position based on scroll
  camera.fov = 0 + t * 0.1;
  // if (jj.rotation.x > 100){
  //   scene.background =moon;
  // }
  // jj.rotation.y += 0.075;
  // jj.rotation.z += 0.05;  
  console.log(t);
  camera.updateProjectionMatrix();
  
}

document.body.onscroll = moveCamera;

function animate(){
  requestAnimationFrame( animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  
  controls.update();
  renderer.render(scene, camera);
}

animate()