// MAIN

// standard global variables
var container, scene, camera, renderer, controls;

// custom global variables
var cube, obj1, obj2, obj3;
var materials,materialFront,materialSide,materialBack,materialSwp;
var my_obj = new THREE.Object3D();
init();
animate();

function CrtWall() {
// создание и настройка текстуры
	var Texture = new THREE.ImageUtils.loadTexture( 'images/brick_25.jpg');
	Texture.wrapS = Texture.wrapT = THREE.RepeatWrapping;
	Texture.repeat.set( 2, 2);
	var materialArray = [];
	//materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/Dice-Blue-1.png' ) }));
	//materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/Dice-Blue-6.png' ) }));
	//materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/Dice-Blue-2.png' ) }));
	//materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/Dice-Blue-5.png' ) }));
	//materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/Dice-Blue-3.png' ) }));
	//materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'images/Dice-Blue-4.png' ) }));
	//var DiceBlueMaterial = new THREE.MeshFaceMaterial(materialArray);
	
    //Texture.offset.set(0.17,0);
//
    /* width — Width of the sides on the X axis.
	height — Height of the sides on the Y axis.
	depth — Depth of the sides on the Z axis. */
	var wall1 = new THREE.Object3D();
// создание box1	
	var geometry = new THREE.BoxGeometry( 150, 200, 10 );
	var material = new THREE.MeshBasicMaterial( { map: Texture, side: THREE.FrontSide } );
	var box1 = new THREE.Mesh( geometry, material );
	box1.position.set(0,100,0);
// создание box1
	var box2 = box1.clone();
	box2.position.set(250,100,0);
// создание box3
var Texture = new THREE.ImageUtils.loadTexture( 'images/brick_25.jpg' );
	Texture.wrapS = Texture.wrapT = THREE.RepeatWrapping;
	Texture.repeat.set( 1.5, 0.5);
//new THREE.MeshFaceMaterial( materials );
	var geometry = new THREE.BoxGeometry( 100, 50, 10 );
	var material = new THREE.MeshBasicMaterial( { map: Texture, side: THREE.FrontSide } );
	var box3 = new THREE.Mesh( geometry, material );
	box3.position.set(125,75+100,0);
// создание box4
	var box4 = box3.clone();
	box4.position.set(125,25,0);
// добавление объектов на сцену
	scene.add(box1);
	scene.add(box2);
	scene.add(box3);
	scene.add(box4);
}

// FUNCTIONS 		
function init() {
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
	light.position.set(500,500,-500);
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

//===============================================\

//текстура обоев
var WallPaperTexture1 = new THREE.ImageUtils.loadTexture( 'images/wall_paper_1.jpg' );
	WallPaperTexture1.wrapS = WallPaperTexture1.wrapT = THREE.RepeatWrapping; 
	WallPaperTexture1.repeat.set( 0.01, 0.01);
    //WallPaperTexture1.anisotropy = 16;
	//WallPaperTexture1.offset.set(0.1,0.5);
	
var WallPaperTexture = new THREE.ImageUtils.loadTexture( 'images/wall_paper.jpg' );
	WallPaperTexture.wrapS = WallPaperTexture.wrapT = THREE.RepeatWrapping; 
	WallPaperTexture.repeat.set( 0.01, 0.01);
	//WallPaperTexture.anisotropy = 16;
	//WallPaperTexture.offset.set(0.17,0);
	
//текстура кирпича	
var BrickTexture = new THREE.ImageUtils.loadTexture( 'images/brick_25.jpg' );
	BrickTexture.wrapS = BrickTexture.wrapT = THREE.RepeatWrapping;
	BrickTexture.repeat.set( 0.01, 0.01 );
	

//материалы	
 materialFront = new THREE.MeshBasicMaterial( {map: WallPaperTexture, side: THREE.DoubleSide} );
 materialSide = new THREE.MeshBasicMaterial( {map: BrickTexture,side: THREE.DoubleSide} );
 materialBack = new THREE.MeshBasicMaterial( {map: BrickTexture,side: THREE.DoubleSide} );
 materialSwp = new THREE.MeshBasicMaterial( {map: WallPaperTexture1,side: THREE.DoubleSide} );
//массив материалов
 materials = [materialFront, materialSide, materialBack];

/*===============================================
var shape = new THREE.Shape();
	shape.moveTo(0, 0);
	shape.lineTo(0, 200);
	shape.lineTo(500, 200);
	shape.lineTo(500, 0);
	
	

var windowHole = new THREE.Path(); 
	windowHole.moveTo(75,50);
	windowHole.lineTo(175,50);
	windowHole.lineTo(175,150);
	windowHole.lineTo(75,150);
	shape.holes.push(windowHole);

	windowHole1 = new THREE.Path();
	windowHole1.moveTo(325,50);
	windowHole1.lineTo(425,50);
	windowHole1.lineTo(425,150);
	windowHole1.lineTo(325,150);
	shape.holes.push(windowHole1); 
/*	
var extrusionSettings = {
			amount:  11,
			steps			: 1,
			bevelEnabled	: false,
			material: 0, extrudeMaterial: 1
	};


var geometry = new THREE.ShapeGeometry( shape );
var material = new THREE.MeshFaceMaterial( materials );

obj1 = new THREE.Mesh( geometry, material );

for ( var face in obj1.geometry.faces ) {
if (obj1.geometry.faces[ face ].normal.z == 1) obj1.geometry.faces[ face ].materialIndex = 2;
	var f = obj1.geometry.faces[ face ];
	var arrow = new THREE.ArrowHelper( f.normal, obj1.geometry.vertices[f.a], 10);
	obj1.add(arrow);
}


obj2 = obj1.clone();
//obj2.material = obj1.material.clone();
obj2.position.z += -500;
obj2.position.x += 500;
obj2.rotation.y = Math.PI;

//obj1.position.x += 11;
//obj2.position.z += 11;

scene.add(obj1);
scene.add(obj2);
/*
// стена без окон
var shape = new THREE.Shape();
shape.moveTo(0, 0);
shape.lineTo(500, 0);
shape.lineTo(500, 200);
shape.lineTo(0, 200);

var geometry = new THREE.ExtrudeGeometry( shape, extrusionSettings );
var material = new THREE.MeshFaceMaterial(materials);
obj3 = new THREE.Mesh( geometry, material );
/*

for ( var face in obj3.geometry.faces ) {
if (obj3.geometry.faces[ face ].normal.z == 1)
	obj3.geometry.faces[ face ].materialIndex = 2;
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
//shape.lineTo(0, 0);

var windowHole = new THREE.Path(); 
windowHole.moveTo(75,50);
windowHole.lineTo(175,50);
windowHole.lineTo(175,150);
windowHole.lineTo(75,150);
//windowHole.lineTo(75,50);
shape.holes.push(windowHole);

var doorHole = new THREE.Path(); 
doorHole.moveTo(325,0);
doorHole.lineTo(425,0);
doorHole.lineTo(425,150);
doorHole.lineTo(325,150);
//doorHole.lineTo(325,0);
shape.holes.push(doorHole);

var geometry = new THREE.ExtrudeGeometry( shape, extrusionSettings );
var material = new THREE.MeshFaceMaterial(materials);
obj4 = new THREE.Mesh( geometry, material );

for ( var face in obj4.geometry.faces ) {
if (obj4.geometry.faces[ face ].normal.z == 1)
	obj4.geometry.faces[ face ].materialIndex = 2;
}

obj4.position.z -= 500;
obj4.rotation.y = -Math.PI / 2;

obj4.position.z+=11;
obj4.position.x+=11;

scene.add(obj4);
*/
scene.add(my_obj);
/*
	var loader = new THREE.ColladaLoader();
	loader.options.convertUpAxis = true;
	loader.load(
	// resource URL
	'untitled.dae',
	// Function when resource is loaded
	function ( collada ) {
		var dae = collada.scene;
		
		
		var setMaterial =  function ( node, material )  { 
			node.material = material ; 
			if  ( node.children )  { 
				for  ( var i = 0; i < node.children.length; i++)  { 
					setMaterial ( node.children[i], material ); 
				} 
			} 
		}
		setMaterial( dae, new THREE.MeshBasicMaterial({color: 0xff0000}) )
		dae.position.set(0,50,0)
		dae.scale.set(50,50,50);
		dae.updateMatrix();
		scene.add( dae );
	},
	// Function called when download progresses
	function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	}
);
*/
var loader = new THREE.JSONLoader();

	loader.load( 

	'my_plane.json',

	function ( geometry, materials ) {
		var material = new THREE.MeshFaceMaterial(materials);
		var object = new THREE.Mesh( geometry, material );
		object.scale.set(100,100,100);
		object.position.set(0,-200,0);
		scene.add( object );
	},
	'images/');
	//var material2 = new THREE.MeshLambertMaterial( { color: 0xff8000, wireframe: false } );

	//var mesh = new THREE.Mesh( geometry, material2 );

	//scene.add( mesh );
	
	//CrtWall();
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
