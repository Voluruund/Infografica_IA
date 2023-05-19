let scene, camera, renderer;

// window.onload = function(){
//   main();
// }

function main(){
    document.getElementById("btn-76").classList.add("hidden")
  //setup del canvas
  const canvas = document.querySelector('#main-canvas');
  scene = new THREE.Scene()
  let fov = 55;
  if(window.innerWidth <= 500){
    fov = 85;
  }
  camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1 , 100);
  camera.position.z = 2;
  scene.add(camera);
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.autoClear = false;
  renderer.setClearColor(new THREE.Color(0x000000, 0.0));
  
  //sfera
  const terra = new THREE.SphereGeometry(0.6, 32, 32);
  const texture = new THREE.TextureLoader().load('./img/terra.jpg');
  const bump = new THREE.TextureLoader().load('./img/earthbump.jpg');
  const materiale = new THREE.MeshStandardMaterial({
     map: texture,
     bumpMap: bump,
     bumpScale: 0.25,
     metalness: 0,
     roughness: 1
  });
  const mesh = new THREE.Mesh(terra, materiale);
  scene.add(mesh);

  //luce ambientale
  const luce = new THREE.AmbientLight(0xffffff, 0.1);
  scene.add(luce);
  let ombra = 0.9;
  if(window.innerWidth <= 500){
    ombra = 0.7;
  }
  const puntatoreLuce = new THREE.PointLight(0xffffff, ombra);
  puntatoreLuce.position.set(5,3,5);
  scene.add(puntatoreLuce);

  //nuvole
  const nuvole = new THREE.SphereGeometry(0.61, 32, 32); 
  const textureNuvole = new THREE.TextureLoader().load('./img/earthcloud.png');
  const materialeNuvole = new THREE.MeshStandardMaterial({
     map: textureNuvole,
     bumpScale: 0.02,
     transparent: true,
  });
  const meshNuvole = new THREE.Mesh(nuvole, materialeNuvole);
  scene.add(meshNuvole);

  //animazione
  const animate = () => {
    requestAnimationFrame(animate);
    mesh.rotation.y -= 0.0004;
    mesh.rotation.x += 0.000002;
    meshNuvole.rotation.y -= 0.0004;
    meshNuvole.rotation.x += 0.0002;
    render();
  }

  const render = () =>{
    renderer.render(scene, camera);
  }

  animate();
};
