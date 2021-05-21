
var torchjson=null

export function torch(noa,options,id,texture,name,e){
	torchjson=e
	var imageheight=16
	        var imagewidth=16
	        var pixely=1/imageheight;
	        var pixelx=1/imagewidth;
	         var num=1;
			 
			 
			  var faceUV = new Array(6);
	 
	 
	
	
	var n=[new BABYLON.Vector4(pixelx*7,-pixely*(15+num),pixelx*(8+num),-pixely*(5)),//face
	new BABYLON.Vector4(pixelx*7,-pixely*(15+num),pixelx*(8+num),-pixely*(5)),//back 
	new BABYLON.Vector4(pixelx*7,-pixely*(15+num),pixelx*(8+num),-pixely*(5)),//new BABYLON.Vector4(0.0625,0.125,0.125,0.375),//right
	new BABYLON.Vector4(pixelx*7,-pixely*(15+num),pixelx*(8+num),-pixely*(5)),//new BABYLON.Vector4(0,0.125,0.046,0.375),//left
	new BABYLON.Vector4(pixelx*7,-pixely*(6+num),pixelx*(8+num),-pixely*(5)),//top head
	new BABYLON.Vector4(pixelx*7,-pixely*(15+num),pixelx*(8+num),-pixely*(14))];//bottom
	
	
	
		
	  // Head
	  //column 8 row 1
  var  uvoptions = {
        height: 0.8,
		depth:0.15,
		width:0.15,
		faceUV: n,
		wrap: true,
        updatable: true
    };	
	
	
	
			 
			 
			 
			var scene=noa.rendering.getScene()
			
			var supermesh =BABYLON.MeshBuilder.CreateBox(name, uvoptions, noa.rendering.getScene())
			var mat = new BABYLON.StandardMaterial(name, scene);
			
					
	var bustex = new BABYLON.Texture(mod+"textures/block/torch.png", scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);
supermesh.material=mat
//var busmat = new BABYLON.StandardMaterial("face0", scene);
mat.diffuseTexture=bustex;
//mat.specularColor = BABYLON.Color3.Black()
mat.emissiveColor = BABYLON.Color3.White()
			
			var offset = BABYLON.Matrix.Translation(0, 0, 0)
	        
			var finOpts = options
			
			supermesh.bakeTransformIntoVertices(offset)
			
			var supermesh2=supermesh.clone('lever')
			//supermesh2.parent=supermesh
			//supermesh2.scaling.y=2
			//supermesh.isVisble=false
			
			
			
			
			
			
		    
		
			
			finOpts.onLoad= function ( x, y, z) {
				
			
				var mesh2=supermesh2.clone('kelp')
			
					var c=blocklook(noa)
				var detail="positionClose"//
			var j="positionClose"
			
			
			if(boptions[0]==undefined){
				return;
			}
		// if(boptions.length>0){////
				// console.log(boptions[0])
				
				
				
					 for (var i=0;i<boptions[0].length;i++){
						
						 var d=boptions[0][i].pos//
						
						  if(JSON.stringify(d)==JSON.stringify([x,y,z])){//
						
							 
							  detail=boptions[0][i].info//"positionOpen"//
							  c=boptions[0][i].angle
							  j=detail
							  
						
							
					
						  }
					 }
			// }
			
				mesh2.position.x=x+torchjson[c][j][0]//0.5
				mesh2.position.y=y+torchjson[c][j][1]
				mesh2.position.z=z+torchjson[c][j][2]//0.5//
				if(j=="positionOpen"){
					
					mesh2.rotation.x=torchjson[c]['open'][0]
				mesh2.rotation.y=torchjson[c]['open'][1]
				mesh2.rotation.z=torchjson[c]['open'][2]//
				}else{
				mesh2.rotation.x=torchjson[c]['rotation'][0]
				mesh2.rotation.y=torchjson[c]['rotation'][1]
				mesh2.rotation.z=torchjson[c]['rotation'][2]//////
				}
				noa.rendering.addMeshToScene(mesh2, false)
				offmeshes.push([[x,y,z],mesh2])
				
			}
			
			finOpts.onSet= function ( x, y, z) {
				
				var c=blocklook(noa)
				var mesh2=supermesh2.clone('kelp')
				
				var d=makeinfparticle(mod+'textures/particle/flame.png',mesh2)
				
				d.start()
					offparticles.push([[x,y,z],d])
					var detail="positionClose"//
			var j="positionClose"
			
			
			if(boptions[0]==undefined){
				return;
			}
		// if(boptions.length>0){////
				// console.log(boptions[0])
				
				
				
					 for (var i=0;i<boptions[0].length;i++){
						
						 var d=boptions[0][i].pos//
						
						  if(JSON.stringify(d)==JSON.stringify([x,y,z])){//
						
							 
							  detail=boptions[0][i].info//"positionOpen"//
							  c=boptions[0][i].angle
							  j=detail
							  
						
							
					
						  }
					 }
			// }
			
				
				mesh2.position.x=x+torchjson[c][j][0]//0.5
				mesh2.position.y=y+torchjson[c][j][1]
				mesh2.position.z=z+torchjson[c][j][2]//0.5//
				if(j=="positionOpen"){
					
					mesh2.rotation.x=torchjson[c]['open'][0]
				mesh2.rotation.y=torchjson[c]['open'][1]
				mesh2.rotation.z=torchjson[c]['open'][2]//
				}else{
				mesh2.rotation.x=torchjson[c]['rotation'][0]
				mesh2.rotation.y=torchjson[c]['rotation'][1]
				mesh2.rotation.z=torchjson[c]['rotation'][2]//////
				}
				noa.rendering.addMeshToScene(mesh2, false)
				//noa.rendering.addMeshToScene(mesh2._children[0], false)
				offmeshes.push([[x,y,z],mesh2])
			
				
				
				
			}
			
			finOpts.onUnload= function ( x, y, z) {
				
				
				
				for (var i=0;i<offmeshes.length;i++){
					
					if(JSON.stringify(offmeshes[i][0])==JSON.stringify([x,y,z])){
						
						var c=offmeshes[i][1]
						
						
						noa.rendering.removeMeshFromScene(c, false)
						//noa.rendering.removeMeshFromScene(c._children[0], false)
						//c._children[1].dispose()
					}
				}
			}
			finOpts.onUnset= function ( x, y, z) {
				
				
				
				for (var i=0;i<offmeshes.length;i++){
					
					if(JSON.stringify(offmeshes[i][0])==JSON.stringify([x,y,z])){
						
						var c=offmeshes[i][1]
						
						var k=finalparticle(mod+'textures/particle/big_smoke.png',c,1)
						var k1=finalparticle(mod+'textures/particle/big_smoke1.png',c,2)
						var k2=finalparticle(mod+'textures/particle/big_smoke2.png',c,3)
						
					
						noa.rendering.removeMeshFromScene(c, false)
						//finalparticle(mod+'textures/particle/big_smoke.png',c)
						//noa.rendering.removeMeshFromScene(c._children[0], false)
						//c._children[1].dispose()
						//console.log(c._children[1])
					}
					
				
				}
				
				for (var i=0;i<offparticles.length;i++){
					
					
					
					if(JSON.stringify(offparticles[i][0])==JSON.stringify([x,y,z])){
						
						var c=offparticles[i][1]
						c.dispose()
						
						
					}
				}
			}
		
			 
			 
			//  finOpts.blockMesh = supermesh//
			noa.registry.registerBlock(id, finOpts)
	
}



function blocklook(noa){
	
	
	
	var viewdirection=null
	 var rad=BABYLON.Tools.ToDegrees(noa.camera.heading)//	// 

		 
		 if(rad>320  || rad <50){
			 viewdirection='north'
	//viewdirection=[0,Math.PI,0,[0,0,-0.40]]
	
	//'north'
	
}
if(rad>130 && rad<230){
	viewdirection='south'
	//viewdirection=[0,0,0,[0,0,0.40]]
	//'south'
	
}
if(rad>50 && rad<130){
	viewdirection='east'
	//viewdirection=[0,-Math.PI/2,0,[-0.4,0,0]]
	//'left'
	
	
}

if(rad>230 && rad<320){
	viewdirection='west'
	//viewdirection=[0,Math.PI/2,0,[0.4,0,0]]
	//'right'
	
}
return viewdirection;

 }
 
 
  function makeinfparticle(name,item){
	  
	  
						  var particleSystem = new BABYLON.ParticleSystem("particles", 200, scene);
						particleSystem.particleTexture= new BABYLON.Texture(name, scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);
					particleSystem.color1 = new BABYLON.Color4(1,1,1, 1.0);
					particleSystem.color2 = new BABYLON.Color4(1,1,1, 1.0);
					particleSystem.colorDead = new BABYLON.Color4(1,1,1, 1.0);

						// Position where the particles are emiited from
						var box=item
						

							   particleSystem.emitter =box
							  
							   particleSystem.minSize =0.1
							   particleSystem.maxSize =0.25
							   particleSystem.blendMode =BABYLON.ParticleSystem.BLENDMODE_STANDARD;
							  var matrixangle=noa.camera.getDirection()
							   particleSystem.direction1 = new BABYLON.Vector3(0,0,0);
							   particleSystem.direction2 = new BABYLON.Vector3(0,0,0);
							   particleSystem.minEmitPower = 1;
								particleSystem.maxEmitPower = 2;
								particleSystem.updateSpeed = 0.020
							particleSystem.minEmitBox = new BABYLON.Vector3(-0.1, 0.1, 0.1); // Starting all from
  particleSystem.maxEmitBox = new BABYLON.Vector3(0.1, -0.1, -0.1); // To...
								//particleSystem.manualEmitCount = 3;
								 particleSystem.gravity = new BABYLON.Vector3(0,0, 0);
								//state.music = new BABYLON.Sound("Music", "/sound/tap.wav", scene)
								
								
								 setInterval(function() {
									// if(!onrocket)
	//	particleSystem.dispose()
		
			}, 500);
			particleSystem.worldOffset.y=0.5
								//  console.log(particleSystem)
						return particleSystem;
			  }




  function finalparticle(name,item,/*time:*/timer){
	  
	
						  var particleSystem = new BABYLON.ParticleSystem("particles", 20, scene);
						particleSystem.particleTexture= new BABYLON.Texture(name, scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);
					particleSystem.color1 = new BABYLON.Color4(0.5,0.5,0.5, 1.0);
					particleSystem.color2 = new BABYLON.Color4(0.7,0.7,0.7, 1.0);
					particleSystem.colorDead = new BABYLON.Color4(1,1,1, 1.0);

						// Position where the particles are emiited from
						var box=item
						

							   particleSystem.emitter =box
							  
							   particleSystem.minSize =0.5
							   particleSystem.maxSize =1
							   particleSystem.blendMode =BABYLON.ParticleSystem.BLENDMODE_STANDARD;
							  var matrixangle=noa.camera.getDirection()
							   particleSystem.direction1 = new BABYLON.Vector3(0,0.1,0);
							   particleSystem.direction2 = new BABYLON.Vector3(0,0.2,0);
							   particleSystem.minEmitPower = 1;
								particleSystem.maxEmitPower = 1;
								particleSystem.updateSpeed = 0.020
							particleSystem.minEmitBox = new BABYLON.Vector3(-0.5, 0.3, 0.5); // Starting all from
  particleSystem.maxEmitBox = new BABYLON.Vector3(0.5, -0.1, -0.5); // To...
								particleSystem.manualEmitCount = timer;
								 particleSystem.gravity = new BABYLON.Vector3(0,2, 0);
								//state.music = new BABYLON.Sound("Music", "/sound/tap.wav", scene)
								
								
								 setTimeout(function() {
									// if(!onrocket)
									
		particleSystem.start()
			}, 1000*timer);
			
			
			 setTimeout(function() {
									// if(!onrocket)
									
		particleSystem.dispose()
			}, 3000);
			particleSystem.worldOffset.y=0.2
								  
						return particleSystem;
			  }