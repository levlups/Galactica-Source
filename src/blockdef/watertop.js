export function watertop(noa,options,id){
	
	var bustex =new BABYLON.Texture(mod+"textures/block/water_still.png", scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);////waterytexture(noa)// new BABYLON.Texture("./textures/block/lava_still.png", scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);//

						var busmat = noa.rendering.makeStandardMaterial('chest')
						
						
						busmat.diffuseColor = BABYLON.Color3.White()
						busmat.ambientColor = new BABYLON.Color4(0.6, 0.6, 1,0.5);
					 busmat.hasAlpha=true;
					    
						busmat.diffuseTexture=bustex;
						//busmat.alpha = 0.8;
						busmat.useAlphaFromDiffuseTexture = true
						//busmat.backFaceCulling=true
						/*busmat.diffuseTexture.uScale = 16;
						busmat.diffuseTexture.vScale = 1;
						bustex.wrapU = 1, bustex.wrapV = 1*/
						//bustex.vOffset -= 1/16;
						
							//busmat.diffuseTexture.uScale = 1;
						busmat.diffuseTexture.vScale = 0.0625;
						busmat.backFaceCulling=false
						
					setInterval(function(){ 
     bustex.vOffset -= 1/16;
     }, 500);
						//busmat.diffuseTexture.alpha=0.5
			var mesh=null
			
			
			
			
			
			
		

							  
							  
							  
							  mesh=BABYLON.Mesh.CreatePlane('sprite-',1, scene)//meshes[0]
							
							     // var offset = BABYLON.Matrix.Translation(0, 1, 0)
	       // mesh.bakeTransformIntoVertices(offset)
			 mesh.rotation.x=Math.PI/2
			 mesh.position.y+=0.3
							  var finOpts = options
							  mesh.material=busmat
							  mesh.bakeCurrentTransformIntoVertices();
							  finOpts.blockMesh=mesh
							  //finOpts.blockMesh.rotation.x=Math.PI/2
																																	
	
						
			            finOpts.blockMesh = mesh
						
						
						
						//noa.rendering.addMeshToScene(mesh, false)
							  
							noa.registry.registerBlock(id, finOpts)
								
					
	
	
};


