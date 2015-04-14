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
//scene.add(oo1);

	var closedSpline = new THREE.ClosedSplineCurve3( [
	new THREE.Vector3( -60, -100,  60 ),
	new THREE.Vector3( -60,   20,  60 ),
	new THREE.Vector3( -60,  120,  60 ),
	new THREE.Vector3(  60,   20, -60 ),
	new THREE.Vector3(  60, -100, -60 )
				] );

	var extrudeSettings = {
			steps			: 100,
			bevelEnabled	: false,
			extrudePath		: closedSpline
		};


	var pts = [], count = 3;

	for ( var i = 0; i < count; i ++ ) {

		var l = 20;

		var a = 2 * i / count * Math.PI;

		pts.push( new THREE.Vector2 ( Math.cos( a ) * l, Math.sin( a ) * l ) );

	}

	var shape = new THREE.Shape( pts );

	var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );

	var material = new THREE.MeshLambertMaterial( { color: 0xb00000, wireframe: false } );

	var mesh = new THREE.Mesh( geometry, material );

	scene.add( mesh );
	
	
		var randomPoints = [];


		randomPoints.push( new THREE.Vector3( 150, 150 , 50 ) );
		randomPoints.push( new THREE.Vector3( 200, 150 , -50 ) );


		var randomSpline =  new THREE.SplineCurve3( randomPoints );

		//

		var extrudeSettings = {
				steps			: 1,
				bevelEnabled	: false,
				extrudePath		: randomSpline
				};


		var pts = [], numPts = 5;

		for ( var i = 0; i < numPts * 2; i ++ ) {

			var l = i % 2 == 1 ? 10 : 20;

			var a = i / numPts * Math.PI;

			pts.push( new THREE.Vector2 ( Math.cos( a ) * l, Math.sin( a ) * l ) );

		}

		var shape = new THREE.Shape( pts );

		var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );

		var material2 = new THREE.MeshLambertMaterial( { color: 0xff8000, wireframe: false } );

		var mesh = new THREE.Mesh( geometry, material2 );

		scene.add( mesh );