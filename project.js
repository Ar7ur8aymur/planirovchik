// MAIN

// standard global variables
var container, scene, camera, renderer, controls;

// custom global variables
var cube, obj1, obj2, obj3;
var materials,materialFront,materialSide,materialBack,materialSwp;

init();
animate();

// FUNCTIONS 		
function init() 
{
	// SCENE
	scene = new THREE.Scene();
	// CAMERA
	var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	scene.add(camera);
	camera.position.set(0,150,400);
	camera.lookAt(scene.position);	
	
	// RENDERER
	if ( Detector.webgl )
		renderer = new THREE.WebGLRenderer( {antialias:true} );
	else
		renderer = new THREE.CanvasRenderer(); 
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	container = document.getElementById( 'ThreeJS' );
	container.appendChild( renderer.domElement );
	
	// EVENTS
	THREEx.WindowResize(renderer, camera);
	THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
	// CONTROLS
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	// STATS
	
	// LIGHT
	var light = new THREE.PointLight(0xffffff);
	light.position.set(150,150,100);
	scene.add(light);
	var light = new THREE.PointLight(0xffffff);
	light.position.set(0,450,-100);
	scene.add(light);
	
	// FLOOR
	var floorTexture = new THREE.ImageUtils.loadTexture( 'images/checkerboard.jpg' );
	floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
	floorTexture.repeat.set( 10, 10 );
	var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
	var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.position.y = -0.5;
	floor.rotation.x = Math.PI * 0.5;
	scene.add(floor);
	
	// SKYBOX/FOG
	var skyBoxGeometry = new THREE.BoxGeometry( 10000, 10000, 10000 );
	var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
	var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
	scene.add(skyBox);
	
	scene.fog = new THREE.FogExp2( 0x9999ff, 0.00025 );
	
	////////////
	// CUSTOM //
	////////////




var shape = new THREE.Shape();
shape.moveTo(0, 0);
shape.lineTo(500, 0);
shape.lineTo(500, 200);
shape.lineTo(0, 200);
shape.lineTo(0, 0);

var windowHole = new THREE.Path(); 
windowHole.moveTo(75,50);
windowHole.lineTo(175,50);
windowHole.lineTo(175,150);
windowHole.lineTo(75,150);
windowHole.lineTo(75,50);
shape.holes.push(windowHole);

windowHole1 = new THREE.Path();
windowHole1.moveTo(325,50);
windowHole1.lineTo(425,50);
windowHole1.lineTo(425,150);
windowHole1.lineTo(325,150);
windowHole1.lineTo(325,50);
shape.holes.push(windowHole1); 

var extrusionSettings = {
		amount: 11, curveSegments: 1, bevelEnabled: false,
		material: 0, extrudeMaterial: 1
	};
//текстура обоев
var WallPaperTexture1 = new THREE.ImageUtils.loadTexture( 'images/wall_paper_1.jpg' );
	WallPaperTexture1.wrapS = WallPaperTexture1.wrapT = THREE.RepeatWrapping; 
	WallPaperTexture1.repeat.set( 0.01, 0.01);
    WallPaperTexture1.anisotropy = 5;
	
var WallPaperTexture = new THREE.ImageUtils.loadTexture( 'images/wall_paper.jpg' );
	WallPaperTexture.wrapS = WallPaperTexture.wrapT = THREE.RepeatWrapping; 
	WallPaperTexture.repeat.set( 0.01, 0.01);
	WallPaperTexture.anisotropy = 5;
	
//текстура кирпича	
var BrickTexture = new THREE.ImageUtils.loadTexture( 'images/brick_25.jpg' );
	BrickTexture.wrapS = BrickTexture.wrapT = THREE.RepeatWrapping; 
	BrickTexture.repeat.set( 0.01, 0.01 );	
//материалы	
 materialFront = new THREE.MeshBasicMaterial( {map: WallPaperTexture, side: 2} );
 materialSide = new THREE.MeshBasicMaterial( {map: BrickTexture, side: 2} );
 materialBack = new THREE.MeshBasicMaterial( {map: BrickTexture, side: 2} );
 materialSwp = new THREE.MeshBasicMaterial( {map: WallPaperTexture1, side: 2} );
//массив материалов
 materials = [materialFront, materialSide, materialBack];

var geometry = new THREE.ExtrudeGeometry( shape, extrusionSettings );
var material = new THREE.MeshFaceMaterial(materials);

obj1 = new THREE.Mesh( geometry, material );

for ( var face in obj1.geometry.faces ) {
if (obj1.geometry.faces[ face ].normal.z == 1) obj1.geometry.faces[ face ].materialIndex = 2;
}

obj2 = obj1.clone();
//obj2.material = obj1.material.clone();
obj2.position.z += -500;
obj2.position.x += 500;
obj2.rotation.y = Math.PI;
	
scene.add(obj1);
scene.add(obj2);
// стена без окон
var shape = new THREE.Shape();
shape.moveTo(0, 0);
shape.lineTo(500, 0);
shape.lineTo(500, 200);
shape.lineTo(0, 200);
shape.lineTo(0, 0);

var geometry = new THREE.ExtrudeGeometry( shape, extrusionSettings );
var material = new THREE.MeshFaceMaterial(materials);
obj3 = new THREE.Mesh( geometry, material );

for ( var face in obj3.geometry.faces ) {
if (obj3.geometry.faces[ face ].normal.z == 1) obj3.geometry.faces[ face ].materialIndex = 2;
}

//obj3.position.z += 500;
obj3.position.x += 500;
obj3.rotation.y = Math.PI / 2;

scene.add(obj3);

//стена с дверью и окном
var shape = new THREE.Shape();
shape.moveTo(0, 0);
shape.lineTo(500, 0);
shape.lineTo(500, 200);
shape.lineTo(0, 200);
shape.lineTo(0, 0);

var windowHole = new THREE.Path(); 
windowHole.moveTo(75,50);
windowHole.lineTo(175,50);
windowHole.lineTo(175,150);
windowHole.lineTo(75,150);
windowHole.lineTo(75,50);
shape.holes.push(windowHole);

var doorHole = new THREE.Path(); 
doorHole.moveTo(325,0);
doorHole.lineTo(425,0);
doorHole.lineTo(425,150);
doorHole.lineTo(325,150);
doorHole.lineTo(325,0);
shape.holes.push(doorHole);

var geometry = new THREE.ExtrudeGeometry( shape, extrusionSettings );
var material = new THREE.MeshFaceMaterial(materials);
obj4 = new THREE.Mesh( geometry, material );

for ( var face in obj4.geometry.faces ) {
if (obj4.geometry.faces[ face ].normal.z == 1) obj4.geometry.faces[ face ].materialIndex = 2;
}

obj4.position.z -= 500;
obj4.rotation.y = -Math.PI / 2;
scene.add(obj4);

}

var FizzyText = function() {
  //this.message = 'dat.gui';
  //this.speed = 0.8;
  //this.displayOutline = false;
  this.wallpaper = function() {
					// меняем обои
					obj1.material.materials[0] = materialSwp;
					//obj2.material.materials[0] = materialSwp;
					//obj3.material.materials[0] = materialSwp; 
				};

};

window.onload = function() {
  var text = new FizzyText();
  var gui = new dat.GUI();
  //gui.add(text, 'message');
  //gui.add(text, 'speed', -5, 5);
  //gui.add(text, 'displayOutline');
  gui.add(text, 'wallpaper');
};

function animate() 
{
    requestAnimationFrame( animate );
	render();		
	update();
}

function update()
{
	
	
	controls.update();
	//stats.update();
}

function render() 
{
	renderer.render( scene, camera );
}
