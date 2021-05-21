module.exports.make =function(name){
	var mesharrays=[];
	var colors;
	var objectContext = window.document.createElement('canvas').getContext('2d');
	var Scale=0.065//0.05;
    var smallimg=16;
	var medimg=32;//
	//var J=null;
	//var scene=noa.rendering.getScene();
		var box =  BABYLON.Mesh.CreateBox("box", 0.065, scene);
		//var box= BABYLON.MeshBuilder.CreatePlane("plane", {size:0.05}, scene);
		scene.removeMesh(box);
		
				var mat = new BABYLON.StandardMaterial("mat", scene,false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);
				objectContext.drawImage(document.getElementById(name),0,0,16,16);
			//	console.log(name)
			     /*  if(name==='item_apple'){
						
					
					objectContext.drawImage(document.getElementById(name),0,0,16,16);
					
					
					
					}
					if(name==='block_fence'){
						
					
					objectContext.drawImage(document.getElementById(name),0,0,16,16);
					
					
					
					}
					if(name==='block_trap'){
						
					
					objectContext.drawImage(document.getElementById(name),0,0,16,16);
					
					
					
					}
					if(name==='item_lasersling'){
						
						
					
						
					objectContext.drawImage(document.getElementById(name),0,0,16,16);
					
					
					}
					if(name==='torch'){
						//console.log('torch');
					
					objectContext.drawImage(document.getElementById('idEntityAtlas'), 8*smallimg, 0*smallimg,16,16,0,0,16,16);
					
					}
                   
					if(name==='block_door'){
						
							objectContext.drawImage(document.getElementById(name),0,0,16,16);
					}
					if(name==='block_dirt'){
						
							objectContext.drawImage(document.getElementById(name),0,0,16,16);
					}
					if(name==='block_flower'){
						
							objectContext.drawImage(document.getElementById(name),0,0,16,16);
					}
					if(name==='item_arrow'){
						
							objectContext.drawImage(document.getElementById(name),0,0,16,16);
					}
					if(name==='sign'){
						
							objectContext.drawImage(document.getElementById('idEntityAtlas'), 5*smallimg, 1*smallimg,16,16,0,0,16,16);
					}
					if(name==='block_ladder'){
						
							objectContext.drawImage(document.getElementById(name),0,0,16,16);
					}
					if(name==='coin'){
						
							objectContext.drawImage(document.getElementById('idEntityAtlas'), 0*smallimg, 2*smallimg,16,16,0,0,16,16);
					}
					if(name==='item_shovel'){
						
					//objectContext.drawImage(document.getElementById('idEntityAtlas'), 48, 0,16,16,0,0,16,16);
					objectContext.drawImage(document.getElementById(name),0,0,16,16);
					
					}
					if(name==='item_sword'){
						objectContext.drawImage(document.getElementById(name),0,0,16,16);
						
					}*/
				
			
			{
				var bits=16; // 16 pixels
				for (var intFor1 = 0; intFor1 < bits; intFor1 += 1) {
					for (var intFor2 = 0; intFor2 < bits; intFor2 += 1) {
						
						var intColor = objectContext.getImageData(intFor1, intFor2,1, 1).data
						
						
						
						if (intColor[3] === 0) {
							continue;
						}
						  var mesh=box.clone('box1');
						  //mesh.name=name;
						  box.geometry.copy(BABYLON.Geometry.RandomId()).applyToMesh(mesh);
						
						/*	if(name==='item_apple'){
								
								noa.setBlock(1,[intFor1,(-intFor2)+16,0]);
							}*/
						var x=	mesh.position.x += Scale * (8- intFor1);
							var y=		 mesh.position.y += Scale * (8- intFor2);
							var z=		 mesh.position.z += 0.0;
							//console.log(intColor[0]/255);
									 	   colorVertices(mesh, new BABYLON.Color3(intColor[0], intColor[1],intColor[2] )) 
									//console.log(mesh.name);	   
									if(mesh.name!==undefined){
	              mesharrays.push(mesh);
									}
                      	
									// mesharrays.push(mesh);
						  }
					

				}
			}
			
		
	function colorVertices(mesh, color) {
	
		var positions = mesh.getVerticesData(BABYLON.VertexBuffer.PositionKind);

	    colors = [];

	 for (var i = 0; i<positions.length/3; i ++) {
		 
		 colors.push(color.r/255, color.g/255, color.b/255, 1);
	      
	    }

	    mesh.setVerticesData(BABYLON.VertexBuffer.ColorKind, colors,false, false);
			
	};
 
 // var supermesh = BABYLON.Mesh.MergeMeshes(mesharrays,true);
  //supermesh.name=name;
  //var supermesh = BABYLON.Mesh.MergeMeshes(mesharrays,false);
  
  var supermesh = BABYLON.Mesh.MergeMeshes(mesharrays, true, false, undefined, false, true);
  
  //var supermesh = BABYLON.Mesh.MergeMeshes(mesharrays,true);
//supermesh.name=name+Math.random();
/*if(!supermesh.hasOwnProperty‎('name')){
	supermesh.name=name+Math.random();
}*/

 
 
  	supermesh.material = new BABYLON.StandardMaterial('mat', scene);
	
	// supermesh.material.disableLighting = false;
  supermesh.material.backFaceCulling = true;
 // supermesh.material.wireframe = true;
    //var noiseTexture = new BABYLON.NoiseProceduralTexture("perlin", 512, scene);
  // supermesh.material.ambientTexture = noiseTexture;
	
	//	supermesh.material.specularColor = BABYLON.Color3.Black()
		//supermesh.name=name+Math.random();
		if(name=='item_fish'){
			supermesh.rotation.y=Math.PI/2
		}

	return supermesh;
	
}


