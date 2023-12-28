const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, 300);
document.querySelector('.threejs-section').appendChild(renderer.domElement);

const pic = new THREE.TextureLoader().load('images.jpeg');
scene.background = pic;


const PointLight = new THREE.PointLight(0xffffff);
PointLight.position.set(-8,4,2);
// scene.add(PointLight)

const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.position.set(15,15,15)
scene.add(PointLight);

const lightHelper = new THREE.PointLightHelper(PointLight);
scene.add(lightHelper);

// const ageometry = new THREE.SphereGeometry(0.05, 12, 12);

const ageometry = new THREE.TetrahedronGeometry(0.05, 0)
const amaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const asphere = new THREE.Mesh(ageometry, amaterial);
// scene.add(asphere);
const tetrahedrons = [];

//uncomment
for(var i = -20; i<20; i++){
    const ranX = Math.random() * 21 - 10;
    const ranY = Math.random() * 21 - 10;

    const ageometry = new THREE.TetrahedronGeometry(0.05, 0)
    const amaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const asphere = new THREE.Mesh(ageometry, amaterial);
    asphere.position.setX(ranX)
    asphere.position.setY(ranY)
    scene.add(asphere);
    tetrahedrons.push(asphere)
}

const geometry = new THREE.CylinderGeometry( 0.04, 0.04, 8, 20 ); 
const material = new THREE.MeshStandardMaterial( {color: 0xffff00} ); 
const cylinder = new THREE.Mesh( geometry, material );
cylinder.rotation.z = Math.PI / 2;
scene.add( cylinder );

const geometry2 = new THREE.CylinderGeometry( 0.02, 0.02, 1, 18 ); 
const material2 = new THREE.MeshStandardMaterial( {color: 0xffff00} ); 
const cylinder2 = new THREE.Mesh( geometry2, material2 );
cylinder2.rotation.y = Math.PI / 2;
// scene.add( cylinder2 );

const headGeometry = new THREE.SphereGeometry( 0.4, 12, 6 ); 
const headMaterial = new THREE.MeshStandardMaterial( { color: 0xffff00 } ); 
const headSphere = new THREE.Mesh( headGeometry, headMaterial ); 
// scene.add( headSphere );

const bodyGeometry = new THREE.CylinderGeometry( 0.1, 0.1, 2, 15 ); 
const bodyMaterial = new THREE.MeshStandardMaterial( { color: 0xffff00 } ); 
const bodySphere = new THREE.Mesh( bodyGeometry, bodyMaterial ); 
// scene.add( bodySphere );

const rHandGeometry = new THREE.CylinderGeometry( 0.1, 0.1, 1, 15 ); 
const rHandMaterial = new THREE.MeshStandardMaterial( { color: 0xffff00 } ); 
const rHandSphere = new THREE.Mesh( rHandGeometry, rHandMaterial ); 
rHandSphere.rotation.z = 2.5;
// scene.add( rHandSphere );

const lHandGeometry = new THREE.CylinderGeometry( 0.1, 0.1, 1, 15 ); 
const lHandMaterial = new THREE.MeshStandardMaterial( { color: 0xffff00 } ); 
const lHandSphere = new THREE.Mesh( lHandGeometry, lHandMaterial ); 
lHandSphere.rotation.z = -2.5;
// scene.add( lHandSphere );

const flHandGeometry = new THREE.CylinderGeometry( 0.1, 0.1, 1, 15 ); 
const flHandMaterial = new THREE.MeshStandardMaterial( { color: 0xffff00 } ); 
const flHandSphere = new THREE.Mesh( flHandGeometry, flHandMaterial ); 
flHandSphere.rotation.z = 2.5;
// scene.add( flHandSphere );

const frHandGeometry = new THREE.CylinderGeometry( 0.1, 0.1, 1, 15 ); 
const frHandMaterial = new THREE.MeshStandardMaterial( { color: 0xffff00 } ); 
const frHandSphere = new THREE.Mesh( frHandGeometry, frHandMaterial ); 
frHandSphere.rotation.z = -2.5;
// scene.add( frHandSphere );

cylinder.position.setY(3);
cylinder2.position.setY(2.5);
headSphere.position.setY(1.8);
bodySphere.position.setY(0.4);
rHandSphere.position.setY(0.6);
rHandSphere.position.setX(-0.3);
lHandSphere.position.setY(0.6);
lHandSphere.position.setX(0.3);
flHandSphere.position.setY(-1);
flHandSphere.position.setX(-0.3);
frHandSphere.position.setY(-1);
frHandSphere.position.setX(0.3);

console.log(cylinder.position.y);
console.log(cylinder.position.x);
console.log(cylinder.position.z);



const controls = new THREE.OrbitControls(camera, renderer.domElement);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
//   cylinder.rotation.x += 0.01;
//   cylinder.rotation.y += 0.01;
// asphere.position.x = Math.sin(Date.now() * 0.001) * 5;
// asphere.position.y = Math.cos(Date.now() * 0.001) * 5;
asphere.rotation.x += 0.05;
asphere.rotation.y+= 0.05;
asphere.position.z = Math.sin(Date.now() * 0.001) * 5;

for (let i = 0; i < tetrahedrons.length; i++) {
    tetrahedrons[i].rotation.x += 0.05;
    tetrahedrons[i].rotation.y += 0.05;
    tetrahedrons[i].position.z = Math.sin(Date.now() * 0.001 + i) * 5;
}
    renderer.render(scene, camera);
    
}
animate();

var numberOfTurns = 6;
var inputLetter ="";
var displayWord = blank();
var blankStart = blank();
var count = 0;
var word = blankStart;
var difficultyLevel;
var GuessWord;

function getName(){

  location.href = "play.html";
    // Storing the selected value in localStorage
const radioButtons = document.querySelectorAll('input[name="difficulty"]');
let selectedValue = null;

radioButtons.forEach((radio) => {
    if (radio.checked) {
        selectedValue = radio.value;
    }
});

localStorage.setItem('selectedDifficulty', selectedValue);

    load();
}

function load(){
    numberOfTurns = 8;
    unhideAllButtons()
    scene.remove(cylinder2);
    scene.remove(headSphere);
    scene.remove(bodySphere);
    scene.remove(rHandSphere);
    scene.remove(lHandSphere);
    scene.remove(flHandSphere);
    scene.remove(frHandSphere);
    var number;
    number = Math.floor(Math.random() * (10));
  
    let p = document.querySelector(".word");
    // Retrieving the stored value from localStorage
    const selectedDifficulty = localStorage.getItem('selectedDifficulty');

    difficultyLevel = selectedDifficulty;
  
    switch(difficultyLevel){
        case 'easy':
            GuessWord = easy[number];
            break;
        case 'medium':
            GuessWord = medium[number];
            break;
        case 'hard':
            GuessWord = hard[number];
            break;
        default:
            GuessWord = easy[number];
            break;
    }
    
    word = blank()
    processing(' ');
}


function blank(){
    var startPlace = [];
    for(var i=0; i<GuessWord.split('').length; i++){
        startPlace[i] = "-";
    }
    console.log(startPlace);
    return startPlace;
}


function processing(alphabet){ 
    var count;
    count = numberOfTurns;
    blankStart = blank()
    inputLetter = alphabet;

    let letters = GuessWord.split('');

    for(var i=0; i<letters.length; i++){
        if(inputLetter == letters[i]){
            word[i] = inputLetter
            correct()
            numberOfTurns++
        }
    }
    if(numberOfTurns < 8 && count == numberOfTurns){
        incorrect()
    }
    numberOfTurns--;

    if(numberOfTurns == 6){
        scene.add( cylinder2 );
    }
    if(numberOfTurns == 5){
        scene.add( headSphere );
    }
    if(numberOfTurns == 4){
        scene.add( bodySphere );
    }
    if(numberOfTurns == 3){
        scene.add( rHandSphere );
        
    }
    if(numberOfTurns == 2){
        scene.add(lHandSphere);
    }
    if(numberOfTurns == 1){
        scene.add( frHandSphere );
    }
    if(numberOfTurns == 0){
        scene.add(flHandSphere);
        lose();
    }

   if(word.join('') == GuessWord){
    win()
    load()
   }
   let p = document.querySelector('.word');
   p.innerHTML = word.join('');

   const button = document.getElementById(alphabet);
   // Hied the button 
   button.style.opacity = 0;
}


function win(){
    // create an AudioListener and add it to the camera
    const listener = new THREE.AudioListener();
    camera.add( listener );
// create a global audio source
    const sound = new THREE.Audio( listener );
// load a sound and set it as the Audio object's buffer
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load( './sounds/win-2016.wav', function( buffer ) {
    sound.setBuffer( buffer );
    sound.setLoop( true );
    sound.setVolume( 8 );
    sound.play();

    setTimeout(function() {
        sound.stop();
        }, 5000);
    });

    setTimeout(function() {
        alert("YOU WIN!!!!!!!!!!");
      }, 5010); 

}
function lose(){
    const listener = new THREE.AudioListener();
    camera.add( listener );
    const sound = new THREE.Audio( listener );
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load( './sounds/retro-game-over-213.wav', function( buffer ) {
    sound.setBuffer( buffer );
    sound.setLoop( true );
    sound.setVolume( 8 );
    sound.play();

    setTimeout(function() {
        sound.stop();
        }, 1700);
    }); 

      setTimeout(function() {
        alert("You are out of turns!");
      }, 1800); 
}

function correct(){
     const listener = new THREE.AudioListener();
     camera.add( listener );
     const sound = new THREE.Audio( listener );
     const audioLoader = new THREE.AudioLoader();
     audioLoader.load( './sounds/correct-answer-tone-2870.wav', function( buffer ) {
     sound.setBuffer( buffer );
     sound.setLoop( true );
     sound.setVolume( 8 );
     sound.play();
 
     setTimeout(function() {
         sound.stop();
         }, 1100);
     }); 
}

function incorrect(){
    const listener = new THREE.AudioListener();
    camera.add( listener );
    const sound = new THREE.Audio( listener );
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load( './sounds/losing-bleeps-2026.wav', function( buffer ) {
    sound.setBuffer( buffer );
    sound.setLoop( true );
    sound.setVolume( 8 );
    sound.play();

    setTimeout(function() {
        sound.stop();
        }, 1100);
    });
}

function unhideAllButtons() {
    // Get all the buttons (assuming they have a common class name)
    const buttons = document.querySelectorAll('.alphabet-button button');
  
    // Loop through each button and restore its original opacity
    buttons.forEach(button => {
      button.style.opacity = 1;
    });
  }