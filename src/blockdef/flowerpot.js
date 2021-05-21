
import { spawnEnt } from '../spawner'
	var bedjsony=null
export function makeflowerpot(noa,options,id,name,e){
	
	bedjsony=e
	
		var bustex = new BABYLON.Texture(mod+"models/flowerpot/flowerpot.png", scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);
var busmat = new BABYLON.StandardMaterial("face0", scene);
						busmat.diffuseTexture=bustex;
busmat.backFaceCulling = false;
busmat.specularColor = BABYLON.Color3.Black()
busmat.emissiveColor = BABYLON.Color3.White()
bustex.hasAlpha=true;
                      
					
						var mesh=null
							var finOpts = options
					
						BABYLON.SceneLoader.ImportMesh("", "",mod+ "models/flowerpot/flowerpot.babylon", scene, function (meshes) { 
						 

								for (var i=0;i<meshes.length;i++){
							
							
							  meshes[i].material=busmat;
							  
							  
							   // var offset = BABYLON.Matrix.Translation(0, 0, 0)
	      //  meshes[0].bakeTransformIntoVertices(offset)

							  
							  
							  
							  mesh=meshes[0]
							  
						}
					
			
		
			
			finOpts.onSet= function ( x, y, z) {
				
				var mesh2=mesh.clone('airjelly')
				mesh2.position.x=x+0.5
				mesh2.position.y=y+0.01
				mesh2.position.z=z+0.5
			
				noa.rendering.addMeshToScene(mesh2, false)
				
				mesh2.name='hitbox:bed:north:'+JSON.stringify([x,y,z])
				offmeshes.push([[x,y,z],mesh2])
				
				
			}
			
			finOpts.onLoad= function ( x, y, z) {
				
			var mesh2=mesh.clone('airjelly')
			
			mesh2.position.x=x+0.5
				mesh2.position.y=y+0.01
				mesh2.position.z=z+0.5
			
				noa.rendering.addMeshToScene(mesh2, false)
				
				mesh2.name='hitbox:bed:north:'+JSON.stringify([x,y,z])
				offmeshes.push([[x,y,z],mesh2])
						var k=makeparticle(mod+'textures/particle/bubble.png',mesh2)
						k.start()
				
				
			}
			finOpts.UnLoad= function ( x, y, z) {
				
				for (var i=0;i<offmeshes.length;i++){
					
					if(JSON.stringify(offmeshes[i][0])==JSON.stringify([x,y,z])){
						
						var c=offmeshes[i][1]
						
						
						noa.rendering.removeMeshFromScene(c, false)
					}
				}
				
						
				
				
			}
			
				finOpts.onUnset= function ( x, y, z) {
					for (var i=0;i<offmeshes.length;i++){
					
					if(JSON.stringify(offmeshes[i][0])==JSON.stringify([x,y,z])){
						
						var c=offmeshes[i][1]
						
						
						noa.rendering.removeMeshFromScene(c, false)
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
function blocklook(noa){
	var up=false
	var playerp=noa.ents.getState(noa.playerEntity, noa.entities.names.position).position
	
	
	var viewdirection=null
	 var rad=BABYLON.Tools.ToDegrees(noa.camera.heading)//	// 

		 
		 if(rad>320  || rad <50){
	//viewdirection=[Math.PI/2,Math.PI,0,[0,0,-0.40]]
	
	viewdirection='north'//[Math.PI/2,Math.PI,0,[0,0,0.5]]///
	
	//'north'
	
}
if(rad>130 && rad<230){
	//viewdirection=[Math.PI/2,0,0,[0,0,0.40]]
	viewdirection='south'//[Math.PI/2,0,0,[0,0,-0.5]]
	//'south'
	
}
if(rad>50 && rad<130){
	//viewdirection=[Math.PI/2,-Math.PI/2,0,[-0.4,0,0]]///
	viewdirection='east'//[Math.PI/2,-Math.PI/2,0,[0.5,0,0]]///
	//'left'
	
	
}

if(rad>230 && rad<320){
	//viewdirection=[Math.PI/2,Math.PI/2,0,[0.4,0,0]]
	viewdirection='west'//[Math.PI/2,Math.PI/2,0,[-0.5,0,0]]
	//'right'
	
}
return viewdirection;

 }