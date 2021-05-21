

import { blocklook } from '../look'
	var bedjsony=null
export function makechest(noa,options,id,name,e){
	
	bedjsony=e
	
		var bustex = new BABYLON.Texture(mod+"models/chest/chest.png", scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);
var busmat = new BABYLON.StandardMaterial("face0", scene);
						busmat.diffuseTexture=bustex;
busmat.backFaceCulling = false;
busmat.specularColor = BABYLON.Color3.Black()
busmat.emissiveColor = BABYLON.Color3.White()
bustex.hasAlpha=true;
                      
					
						var mesh=null
						var mesh1=null
							var finOpts = options
					
						BABYLON.SceneLoader.ImportMesh("", "",mod+ "models/chest/chest.babylon", scene, function (meshes) { 
						     mesh1= new BABYLON.Mesh("dummy", scene);

								for (var i=0;i<meshes.length;i++){
							
							
							  meshes[i].material=busmat;
							  	
	                            meshes[i].parent=mesh1;
							  
							  // var offset = BABYLON.Matrix.Translation(0, 1, 0)
	                          //  mesh1.bakeTransformIntoVertices(offset)

							  
							  
							  
							 
							// mesh = BABYLON.Mesh.MergeMeshes(meshes);
							  
						}
					 mesh=mesh1
			
		
			
			finOpts.onSet= function ( x, y, z) {
				
					var c=blocklook(noa)
			
			var detail="Close"//
			var j="Close"
				
				var mesh2=mesh.clone('airjelly')
				/*mesh2.position.x=x
				mesh2.position.y=y
				mesh2.position.z=z*/
				
				if(boptions[0]==undefined){
				return;
			}
				
					 for (var i=0;i<boptions[0].length;i++){
						
						 var d=boptions[0][i].pos//
						
						  if(JSON.stringify(d)==JSON.stringify([x,y,z])){//
						
							 console.log(boptions[0][i])
							  detail=boptions[0][i].data['info']
							  
							  //ccolor=boptions[0][i].data['color']
							 // console.log(ccolor)
							  
							  j=detail
							  c=boptions[0][i].angle
						
							
					
						  }
					 }
			
				noa.rendering.addMeshToScene(mesh2, false)
				noa.rendering.addMeshToScene(mesh2._children[0], false)
				noa.rendering.addMeshToScene(mesh2._children[1], false)
				
				mesh2._children[0].name='hitbox:chest:north:'+JSON.stringify([x,y,z])
				mesh2._children[1].name='hitbox:chest:north:'+JSON.stringify([x,y,z])
				
				
				mesh2.position.x=x+bedjsony[c][j][0]//0.5
				mesh2.position.y=y+bedjsony[c][j][1]
				mesh2.position.z=z+bedjsony[c][j][2]//0.5//
				
					mesh2.rotation.x=bedjsony[c][j+'rotation'][0]+1.57
				mesh2.rotation.y=bedjsony[c][j+'rotation'][1]
				mesh2.rotation.z=bedjsony[c][j+'rotation'][2]//
				
				
				if(j=='Open'){
					mesh2._children[1].rotation.x=-Math.PI/6
				}
				
				
				offmeshes.push([[x,y,z],mesh2])
				
				
			}
			
			finOpts.onLoad= function ( x, y, z) {
				
				
					var c=blocklook(noa)
			
			var detail="Close"//
			var j="Close"
				
			var mesh2=mesh.clone('airjelly')
			
			/*mesh2.position.x=x
				mesh2.position.y=y
				mesh2.position.z=z*/
				
				
				
					if(boptions[0]==undefined){
				return;
			}
				
					 for (var i=0;i<boptions[0].length;i++){
						
						 var d=boptions[0][i].pos//
						
						  if(JSON.stringify(d)==JSON.stringify([x,y,z])){//
						
							 console.log(boptions[0][i])
							  detail=boptions[0][i].data['info']
							  
							  //ccolor=boptions[0][i].data['color']
							 // console.log(ccolor)
							  
							  j=detail
							  c=boptions[0][i].angle
						
							
					
						  }
					 }
			
				noa.rendering.addMeshToScene(mesh2, false)
				noa.rendering.addMeshToScene(mesh2._children[0], false)
				noa.rendering.addMeshToScene(mesh2._children[1], false)
				
				mesh2._children[0].name='hitbox:chest:north:'+JSON.stringify([x,y,z])
				mesh2._children[1].name='hitbox:chest:north:'+JSON.stringify([x,y,z])
				
					mesh2.position.x=x+bedjsony[c][j][0]//0.5
				mesh2.position.y=y+bedjsony[c][j][1]
				mesh2.position.z=z+bedjsony[c][j][2]//0.5//
				
					mesh2.rotation.x=bedjsony[c][j+'rotation'][0]+1.57
				mesh2.rotation.y=bedjsony[c][j+'rotation'][1]
				mesh2.rotation.z=bedjsony[c][j+'rotation'][2]//
				
				if(j=='Open'){
					mesh2._children[1].rotation.x=-Math.PI/6
				}
				
				offmeshes.push([[x,y,z],mesh2])
						var k=makeparticle(mod+'textures/particle/bubble.png',mesh2)
						k.start()
				
				
			}
			finOpts.UnLoad= function ( x, y, z) {
				
				for (var i=0;i<offmeshes.length;i++){
					
					if(JSON.stringify(offmeshes[i][0])==JSON.stringify([x,y,z])){
						
						var c=offmeshes[i][1]
						c._children[0].name='lol'
						
						noa.rendering.removeMeshFromScene(c, false)
						noa.rendering.removeMeshFromScene(c._children[0], false)
						noa.rendering.removeMeshFromScene(c._children[1], false)
					}
				}
				
						
				
				
			}
			
				finOpts.onUnset= function ( x, y, z) {
					for (var i=0;i<offmeshes.length;i++){
					
					if(JSON.stringify(offmeshes[i][0])==JSON.stringify([x,y,z])){
						
						var c=offmeshes[i][1]
						c._children[0].name='lol'
						
						noa.rendering.removeMeshFromScene(c, false)
						noa.rendering.removeMeshFromScene(c._children[0], false)
						noa.rendering.removeMeshFromScene(c._children[1], false)
					}
				}
				
			}
						
						
						
						
						
						
						  noa.registry.registerBlock(id, finOpts)
							 
							
							 
							 
				
						 
						 
						 
						 	 
										 });
	
	
}
function makeparticle(name,mesh){
	  var particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
    particleSystem.particleTexture= new BABYLON.Texture(name, scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);
particleSystem.color1 = new BABYLON.Color4(1,1,1, 1.0);
particleSystem.color2 = new BABYLON.Color4(1,1,1, 1.0);
    // Position where the particles are emiited from
	var box=mesh
	

           particleSystem.emitter =box
	       particleSystem.minSize =0.1
           particleSystem.maxSize =0.3
		   particleSystem.blendMode =BABYLON.ParticleSystem.BLENDMODE_STANDARD;
		  var matrixangle=noa.camera.getDirection()
		   particleSystem.direction1 = new BABYLON.Vector3(-matrixangle[0],0.2,-matrixangle[2]);
		   particleSystem.direction2 = new BABYLON.Vector3(-matrixangle[0],0.3,-matrixangle[2]);
		   particleSystem.minEmitPower = 1;
            particleSystem.maxEmitPower = 2;
            particleSystem.updateSpeed = 0.020
			 particleSystem.gravity = new BABYLON.Vector3(0,1, 0);
			 
	return particleSystem;
	
}
