// MAIN

// standard global variables
var container, scene, camera, renderer, controls;

// custom global variables
var materials, my_object;

init();
animate();


	$(document).ready(function()
	{
		$(".slider").each(function()
		{
			$(this).find("li").first().addClass("on");
		});
	});

	$("#menu").on("click", ".prevbtn", function()
	{
		var sl = $(this).closest(".slider");
		var ul = $(sl).find("ul");
		var li_array = $(ul).children("li");
		var size = li_array.size();
		var index = $(sl).find("li.on").index();
		
	    $(li_array).eq(index).removeClass("on");
		index--;
		if (index < 0) 
		{
			index += size;
		} 
		$(li_array).eq(index).addClass("on");
		
		$(ul).animate({marginLeft: "-"+$(li_array).eq(index).width()*index}, 500);
		
	});
	
	$("#menu").on("click", ".nextbtn", function()
	{
		var sl = $(this).closest(".slider");
		var ul = $(sl).find("ul");
		var li_array = $(ul).children("li");
		var size = li_array.size();
		var index = $(sl).find("li.on").index();
		
	    $(li_array).eq(index).removeClass("on");
		index++;
		if (index > (size-1)) 
		{
			index -= size;
		} 
		$(li_array).eq(index).addClass("on");
		
		$(ul).animate({marginLeft: "-"+$(li_array).eq(index).width()*index}, 500);
	});
	
	$("#menu").on("click", ".okbtn", function()
	{
		var sl = $(this).closest(".slider");
		var ul = $(sl).find("ul");
		var my_img = $(sl).find("li.on").children("img").attr("src");
		//
		var Texture = new THREE.ImageUtils.loadTexture( my_img );
	    Texture.wrapS = Texture.wrapT = THREE.RepeatWrapping; 
		Texture.repeat.set( 1, 1);
		var material = new THREE.MeshBasicMaterial( { map: Texture, color: 0xd2d2d2 } );
		var i = get_index_by_room($(ul).attr("id"));
		my_object.material.materials[i] = material;
		//
	});
	
	$("#menu").on("click", ".punct", function()
	{
		var li = $(this).closest("li");
		var sl_is_hidden = $(li).find(".slider").is(":hidden");
		$(".slider").each(function()
		{
			if (!$(this).is(":hidden")) 
			{
				$(this).slideUp("slow");
			}
		});
		if (sl_is_hidden) { $(li).find(".slider").slideDown("slow"); }
		
	});

function get_index_by_room(room) {
	//
	switch (room) {
		case "kitchen": return 8;
		case "bedroom-1": return 5;
		case "bedroom-2": return 6;
		case "living-room": return 3;
		case "hallway": return 2;
		default: return 0;
	}
	//
}

function GCD(a,b)
{   
    x = Math.abs(a);
	y = Math.abs(b);
    if (y > 0) {
		return GCD(y,x%y)
	} else {
		return x;
	} 
}
	$("#my-btn").on("click", function()
	{
		var sl = $(this).closest(".slider");
		var h_wall = parseInt($(sl).find('[name="h-wall"]').val());
		var w_wall = parseInt($(sl).find('[name="w-wall"]').val());
		var l_reel = parseInt($(sl).find('[name="l-reel"]').val());
		var w_reel = parseInt($(sl).find('[name="w-reel"]').val());
		if (w_wall > w_reel)
		{
			var n_bar = Math.ceil(w_wall/w_reel);
		} else {
			var n_bar = 1;
		}
		console.log(n_bar);
		$(sl).find('[name="n-reel"]').val(Math.ceil(n_bar*h_wall/l_reel));
	});


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
	//THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });
	// CONTROLS
	controls = new THREE.OrbitControls( camera, renderer.domElement );
	
	
	// FLOOR
	var floorTexture = new THREE.ImageUtils.loadTexture( 'images/grass.jpg' );
	floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
	floorTexture.repeat.set( 10, 10 );
	var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
	var floorGeometry = new THREE.PlaneGeometry(1250, 1250, 10, 10);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.position.y = -0.5;
	floor.rotation.x = Math.PI * 0.5;
	scene.add(floor);
	
	// SKYBOX/FOG
	var skyBoxGeometry = new THREE.BoxGeometry( 10000, 10000, 10000 );
	var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x7699ee, side: THREE.BackSide } );
	var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
	scene.add(skyBox);
	
	//scene.fog = new THREE.FogExp2( 0x9999ff, 0.00025 );
	
	////////////
	// CUSTOM //
	////////////

//===============================================\

var loader = new THREE.JSONLoader();

	loader.load( 

	'models/my_plane.json',

	function ( geometry, materials ) {
		var material = new THREE.MeshFaceMaterial(materials);
		var object = new THREE.Mesh( geometry, material );
		object.scale.set(100,100,100);
		object.position.set(0,-200,0);
		my_object = object;
		scene.add( object );
	},
	'images/');
	
	var loader1 = new THREE.JSONLoader();

	loader1.load( 

	'models/my_window.json',

	function ( geometry, materials ) {
		materials[1].opacity = 0.25;
		var material = new THREE.MeshFaceMaterial(materials);
		var object = new THREE.Mesh( geometry, material );
		object.scale.set(100,100,100);
		var obj1 = object.clone();
		var obj2 = object.clone();
		var obj3 = object.clone();
		var obj4 = object.clone();
		//
		object.position.set(0,-200,0);
		//
		obj1.position.set(0,-200,302);
		//
		obj2.rotation.y = Math.PI * 0.5;
		obj2.position.set(547,-200,-273);
		//
		obj3.position.set(950,-200,150);
		//
		obj4.rotation.y = Math.PI * 0.5;
		obj4.position.set(548,-200,-1042);
		//
		scene.add( object );
		scene.add( obj1 );
		scene.add( obj2 );
		scene.add( obj3 );
		scene.add( obj4 );
	},
	'images/');

	var loader2 = new THREE.JSONLoader()
	
	loader2.load( 

	'models/my_door1.json',

	function ( geometry, materials ) {
		var material = new THREE.MeshFaceMaterial(materials);
		var object = new THREE.Mesh( geometry, material );
		object.scale.set(100,100,100);
		//
		object.position.set(0,-200,0);
		//
		scene.add( object );
	},
	'images/');
	
	var loader3 = new THREE.JSONLoader()
	
	loader3.load( 

	'models/my_door2.json',

	function ( geometry, materials ) {
		var material = new THREE.MeshFaceMaterial(materials);
		var object = new THREE.Mesh( geometry, material );
		object.scale.set(100,100,100);
		var obj1 = object.clone();
		var obj2 = object.clone();
		//
		object.position.set(0,-202,0);
		obj1.position.set(0,-202,-130);
		//
		obj2.position.set(35,-202,-325);
		obj2.rotation.y = Math.PI * 0.5;
		//
		scene.add( object );
		scene.add( obj1 );
		scene.add( obj2 );
	},
	'images/');
} 

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
