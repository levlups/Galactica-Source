export function waterside2(noa,options,id){
	
	
	
	var bustex = new BABYLON.Texture(mod+"textures/block/water_flow.png", scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);//
//32
						var busmat = noa.rendering.makeStandardMaterial('chest')
						
						//var busmat = new WaterMaterial('ud', scene, new BABYLON.Vector2(512, 512))//new BABYLON.WaterMaterial("water_material", scene);
						busmat.diffuseTexture=bustex;
						//busmat.backFaceCulling = false;
						//busmat.specularColor = BABYLON.Color3.Black()
						//busmat.emissiveColor = new BABYLON.Color4(0.1, 0.1, 0.2,0.5);
						busmat.diffuseColor = BABYLON.Color3.White()
						busmat.ambientColor = new BABYLON.Color4(0.6, 0.6, 1,0.5);
						//bustex.hasAlpha=true;
					   // busmat.diffuseTexture.hasAlpha=true;
						//busmat.useAlphaFromDiffuseTexture = true
							busmat.backFaceCulling=false
						busmat.diffuseTexture.vScale = 0.0625;
						busmat.diffuseTexture.uScale = 2;
					
						//busmat.diffuseTexture.uScale = 1/3;
				//busmat.diffuseTexture.uScale = 1;
						//busmat.diffuseTexture.alpha=0.5
			var mesh=null
			
						setInterval(function(){ 
     bustex.vOffset += 1/16;
     }, 500);
			
			
			
			
			
			
			
			
			
			
			
			BABYLON.SceneLoader.ImportMesh("", "", mod+"models/cube/waterside2.babylon", scene, function (meshes) { 
						

						for (var i=0;i<meshes.length;i++){
							
						
							  meshes[i].material=busmat;
							  
							  
							    var offset = BABYLON.Matrix.Translation(0, 0.5, 0)
	        meshes[0].bakeTransformIntoVertices(offset)
			
			
			
			

			
			
			

							  
							  
							  
							  mesh=meshes[0]
							  
							  			

							  
							  var finOpts = options
							
							  
							   finOpts.onUnset= function ( x, y, z) {
								  
								  var c=noa.getBlock(x,y-1,z);
				
				
				                    if(c==blockIDs['waterflow']){
										 noa.setBlock(0,[x,y-1,z])
										
									}
					

                			}
							  
							  finOpts.onCustomMeshCreate= function (mesh, x, y, z) {
								  
								  	setTimeout(function(){ 
						
					if(noa.getBlock(x,y-1,z)==0){
						 noa.setBlock(blockIDs['waterflow'],[x,y-1,z])
					 }
					  }, 500);
								  
				
				 var rot=0;
				 
				 if(noa.getBlock(x,y,z-1)==blockIDs['waterside1']){
					 
					 mesh.rotation.y=Math.PI
					 
					 
					 /*var c=noa.getBlock(x,y-1,z)
					
					
							if(blocks[c]!==undefined){
								  if(blocks[c].type==1 ){
									  noa.setBlock(blockIDs['waterflow'],[x,y-1,z])
								  }
							}*/
				 }
				 if(noa.getBlock(x,y,z+1)==blockIDs['waterside1']){
					
					 mesh.rotation.y=0
					
					 
					 
				 }
				 if(noa.getBlock(x+1,y,z)==blockIDs['waterside1']){
					 
					 mesh.rotation.y=Math.PI/2
					
					
					
					
							
					 
				 }
				 if(noa.getBlock(x-1,y,z)==blockIDs['waterside1']  ){
					 
					 mesh.rotation.y=-Math.PI/2
					 
					
					 
					
					
						
				 }
				 
				 	if(boptions[0]==undefined){
					
					return;
				}
				// console.log(boptions)
				 if(boptions.length>0){//
					// console.log('booya')
					 for (var i=0;i<boptions[0].length;i++){
						// console.log(boptions[0][i].pos)
						 var c=boptions[0][i].pos
						  if(JSON.stringify(c)==JSON.stringify([x,y,z])){
							  
							  rot= boptions[0][i].angle
							  twist(mesh,rot)//////
							  break;
					
						  }
					 }
				 }
				
				 
				 
		  
		
			}
	
						
			            finOpts.blockMesh = mesh
						
						
						
						//noa.rendering.addMeshToScene(mesh, false)
							  
							noa.registry.registerBlock(id, finOpts)
								
						}
						 });
	
	
	
};
