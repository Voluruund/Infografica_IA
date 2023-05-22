const ASCII_OF_A = "A".charCodeAt();        //return ascii code of A 65
const NO_OF_ALPHABETS = 26;
let scene, camera, renderer;

function initFullpage(){
    animateElements();      //function init (second slide only)
    new fullpage('#fullpage', {
        autoScrolling:true,
        scrollHorizontally: true,
        navigation: true,
        navigationPosition: 'right',
        credits: { enabled: false, label: 'Made with fullPage.js', position: 'right'},
        licenseKey: 'gplv3-license',
    });
    threeRender()
}

function threeRender(){
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

    //bot
    const bot = new THREE.SphereGeometry(0.25, 32, 32);
    const botTexture = new THREE.TextureLoader().load('./img/Section-1-AI.png');
    const botMaterial = new THREE.MeshStandardMaterial({
        map: botTexture,
        bumpScale: 0.02,
        transparent: true,
    });
    const botMesh = new THREE.Mesh(bot, botMaterial);
    scene.add(botMesh);

    //middle
    const mid = new THREE.SphereGeometry(0.4, 32, 32); 
    const midTexture = new THREE.TextureLoader().load('./img/Section-1-AI-r.png');
    const midMaterial = new THREE.MeshStandardMaterial({
        map: midTexture,
        bumpScale: 0.02,
        transparent: true,
    });
    const midMesh = new THREE.Mesh(mid, midMaterial);
    scene.add(midMesh);

    //top
    const top = new THREE.SphereGeometry(0.56, 32, 32); 
    const topTexture = new THREE.TextureLoader().load('./img/Section-1-AI-b.png');
    const topMaterial = new THREE.MeshStandardMaterial({
        map: topTexture,
        bumpScale: 0.02,
        transparent: true,
    });
    const topMesh = new THREE.Mesh(top, topMaterial);
    scene.add(topMesh);

    //luce ambientale
    const luce = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(luce);
    let ombra = 0.9;
    if(window.innerWidth <= 500){
    ombra = 0.7;
    }
    const puntatoreLuce = new THREE.PointLight(0xffffff, ombra);
    puntatoreLuce.position.set(5,3,5);
    scene.add(puntatoreLuce);


    //animazione
    const animate = () => {
    requestAnimationFrame(animate);
    botMesh.rotation.y -= 0.004;
    midMesh.rotation.x += 0.002;
    topMesh.rotation.y -= 0.0009;
    topMesh.rotation.x += 0.0009;
    render();
    }

    const render = () =>{
    renderer.render(scene, camera);
}

animate();
};

function animateElement(element, originalText, options) {
    let iteration = 0;
    if (options.interval) return;
    options.interval = setInterval(() => {
        const newWord = originalText
            .split("")
            .map((_, idx) => {
                if (idx < iteration) {
                    return originalText[idx];
                }
                return String.fromCharCode(
                    Math.trunc(Math.random() * NO_OF_ALPHABETS) + ASCII_OF_A
                );
            })
            .join("");
        element.innerText = newWord;
        iteration++;
        if (iteration > originalText.length) {
            clearInterval(options.interval);
            options.interval = null;
        }
    }, 30);
    setTimeout(function(){
        animateElement(element, originalText, options)
    }, 4800);
}

function animateElements() {
    const elements = document.getElementsByClassName("animate");
    for (const element of elements) {
        const originalText = element.innerText;
        const options = {
            interval: null
        };
        animateElement(element, originalText, options);
        element.addEventListener("mouseover", (event) => {
            animateElement(event.target, originalText, options);
        });
    }
}
