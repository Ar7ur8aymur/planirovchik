// MAIN

// standard global variables
var container, scene, camera, renderer, controls;

// custom global variables
var cube, obj1, obj2, obj3;
var materials,materialFront,materialSide,materialBack,materialSwp;
var my_obj = new THREE.Object3D();
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

	var starShape = new THREE.Shape();
	starShape.moveTo(0, 0);
	starShape.lineTo(150, 0);
	starShape.lineTo(150, 200);
	starShape.lineTo(100, 200);
	starShape.lineTo(100, 100);
	starShape.lineTo(0, 100);
	//
	var holePath = new THREE.Path();
	holePath.moveTo(15, 15);
	holePath.lineTo(15, 85);
	holePath.lineTo(115, 85);
	holePath.lineTo(115, 185);
	holePath.lineTo(135, 185);
	holePath.lineTo(135, 15);
	//
	starShape.holes.push( holePath );
	//
	var extrusionSettings = {
		amount: 200, steps: 4, curveSegments: 1, bevelEnabled: false,
		material: 0, extrudeMaterial: 1
	};
	
	var materialFront = new THREE.MeshBasicMaterial( { color: 0xffff00,  side: 2} );
	var materialSide = new THREE.MeshBasicMaterial( { color: 0xff8800, side: 2 } );
	var materialArray = [ materialFront, materialSide ];
	var starMaterial = new THREE.MeshFaceMaterial(materialArray);
	
	var starGeometry = new THREE.ExtrudeGeometry( starShape, extrusionSettings );
	var star = new THREE.Mesh( starGeometry, starMaterial );
	my_obj.add(star);
	var wireframeTexture = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true, transparent: true } ); 
	var star = new THREE.Mesh( starGeometry, wireframeTexture );
	//star.position.set(0,50,0);
	
	my_obj.add(star);
	//scene.add(star);
	// add a wireframe to model
	
	
// прямоугольник с отверстием
var geometry = new THREE.Geometry(); 
//задаем вершины парами
geometry.vertices.push( new THREE.Vector3(0,0,0) ); //0/0
geometry.vertices.push( new THREE.Vector3(25,0,25) ); //1/1
//
geometry.vertices.push( new THREE.Vector3(100,0,0) );//0'/2
geometry.vertices.push( new THREE.Vector3(75,0,25) );//1'/3
//
geometry.vertices.push( new THREE.Vector3(100,0,100) );//0''/4
geometry.vertices.push( new THREE.Vector3(75,0,75) );//1''/5
//
geometry.vertices.push( new THREE.Vector3(0,0,100) );//0'''/6
geometry.vertices.push( new THREE.Vector3(25,0,75) );//1'''/7

//образуем грани из заданных ранее вершин
for (var i=0; i<8; i++) {
}
/*
geometry.faces.push( new THREE.Face3( 0, 6, 1 ) );
geometry.faces.push( new THREE.Face3( 6, 4, 7 ) );

geometry.faces.push( new THREE.Face3( 4, 2, 5 ) );
geometry.faces.push( new THREE.Face3( 2, 0, 3 ) );

geometry.faces.push( new THREE.Face3( 1, 6, 7 ) );
geometry.faces.push( new THREE.Face3( 7, 4, 5 ) );

geometry.faces.push( new THREE.Face3( 5, 2, 3 ) );
geometry.faces.push( new THREE.Face3( 3, 0, 1 ) );
*/

geometry.faces.push( new THREE.Face3( 0, 6, 1 ) );
geometry.faces.push( new THREE.Face3( 2, 0, 3 ) );

geometry.faces.push( new THREE.Face3( 4, 2, 5 ) );
geometry.faces.push( new THREE.Face3( 6, 4, 7 ) );

geometry.faces.push( new THREE.Face3( 1, 3, 0 ) );
geometry.faces.push( new THREE.Face3( 3, 5, 2 ) );

geometry.faces.push( new THREE.Face3( 5, 7, 4 ) );
geometry.faces.push( new THREE.Face3( 7, 1, 6 ) );
//наложение текстурных координат
geometry.faceVertexUvs[0].push( [new THREE.Vector2(0,0), new THREE.Vector2(0,1), new THREE.Vector2(0.25,0.25)] );
geometry.faceVertexUvs[0].push( [new THREE.Vector2(1,0), new THREE.Vector2(0,0), new THREE.Vector2(0.75,0.25)] );
geometry.faceVertexUvs[0].push( [new THREE.Vector2(1,1), new THREE.Vector2(1,0), new THREE.Vector2(0.75,0.75)] );
geometry.faceVertexUvs[0].push( [new THREE.Vector2(0,1), new THREE.Vector2(1,1), new THREE.Vector2(0.25,0.75)] );
//
geometry.faceVertexUvs[0].push( [new THREE.Vector2(0.75,0.25), new THREE.Vector2(0.25,0.25), new THREE.Vector2(0,0)] );
geometry.faceVertexUvs[0].push( [new THREE.Vector2(0.75,0.25), new THREE.Vector2(0.75,0.75), new THREE.Vector2(1,0)] );
geometry.faceVertexUvs[0].push( [new THREE.Vector2(0.75,0.75), new THREE.Vector2(0.25,0.75), new THREE.Vector2(1,1)] );
geometry.faceVertexUvs[0].push( [new THREE.Vector2(0.25,0.75), new THREE.Vector2(0.25,0.25), new THREE.Vector2(0,1)] );
//*/
//geometry.computeFaceNormals();
var gg1 = geometry.clone();

var texture = new THREE.ImageUtils.loadTexture( 'images/brick_25.jpg' );
texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
texture.repeat.set( 1, 1 );
//*/
var material = new THREE.MeshBasicMaterial({color: 0x9fAA77, map: texture});
var object = new THREE.Mesh( geometry, material );
var oo1 = new THREE.Mesh( gg1, material );
object.position.x -= 100;
//object.rotation.x += Math.PI/2;
oo1.position.x -= 100;
oo1.position.y +=100;
scene.add(object);
scene.add(oo1);

//===============================================
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

windowHole1 = new THREE.Path();
windowHole1.moveTo(325,50);
windowHole1.lineTo(425,50);
windowHole1.lineTo(425,150);
windowHole1.lineTo(325,150);
//windowHole1.lineTo(325,50);
shape.holes.push(windowHole1); 

var extrusionSettings = {
		amount: 11, steps: 1, curveSegments: 0, bevelEnabled: false,
		material: 0, extrudeMaterial: 1
	};
//текстура обоев
var WallPaperTexture1 = new THREE.ImageUtils.loadTexture( 'images/wall_paper_1.jpg' );
	WallPaperTexture1.wrapS = WallPaperTexture1.wrapT = THREE.RepeatWrapping; 
	WallPaperTexture1.repeat.set( 0.01, 0.01);
    WallPaperTexture1.anisotropy = 16;
	//WallPaperTexture1.offset.set(0.1,0.5);
	
var WallPaperTexture = new THREE.ImageUtils.loadTexture( 'images/wall_paper.jpg' );
	WallPaperTexture.wrapS = WallPaperTexture.wrapT = THREE.RepeatWrapping; 
	WallPaperTexture.repeat.set( 0.01, 0.01);
	WallPaperTexture.anisotropy = 16;
	WallPaperTexture.offset.set(0.17,0);
	
//текстура кирпича	
var BrickTexture = new THREE.ImageUtils.loadTexture( 'images/brick_25.jpg' );
	BrickTexture.wrapS = BrickTexture.wrapT = THREE.RepeatWrapping;
	BrickTexture.repeat.set( 0.01, 0.01 );
	

//материалы	
 materialFront = new THREE.MeshBasicMaterial( {map: WallPaperTexture} );
 materialSide = new THREE.MeshBasicMaterial( {map: BrickTexture} );
 materialBack = new THREE.MeshBasicMaterial( {map: BrickTexture} );
 materialSwp = new THREE.MeshBasicMaterial( {map: WallPaperTexture1} );
//массив материалов
 materials = [materialFront, materialSide, materialBack];

var geometry = new THREE.ExtrudeGeometry( shape, extrusionSettings );
var material = new THREE.MeshFaceMaterial(materials);

obj1 = new THREE.Mesh( geometry, material );

for ( var face in obj1.geometry.faces ) {
if (obj1.geometry.faces[ face ].normal.z == 1)
	obj1.geometry.faces[ face ].materialIndex = 2;
}

obj2 = obj1.clone();
//obj2.material = obj1.material.clone();
obj2.position.z += -500;
obj2.position.x += 500;
obj2.rotation.y = Math.PI;

obj1.position.x += 11;
obj2.position.z += 11;
	
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
if (obj4.geometry.faces[ face ].normal.z == 1)
	obj4.geometry.faces[ face ].materialIndex = 2;
}

obj4.position.z -= 500;
obj4.rotation.y = -Math.PI / 2;

obj4.position.z+=11;
obj4.position.x+=11;

scene.add(obj4);

scene.add(my_obj);
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
