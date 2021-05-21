export function waterside1(noa,options,id){
	
	
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
					    //busmat.diffuseTexture.hasAlpha=true;
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
			
			
			
			
			
			
			
			
			
			
			
			
			BABYLON.SceneLoader.ImportMesh("", "", mod+"models/cube/waterside1.babylon", scene, function (meshes) { 
						

						for (var i=0;i<meshes.length;i++){
							
						
							  meshes[i].material=busmat;
							  
							  
							    var offset = BABYLON.Matrix.Translation(0, 0.5, 0)
	        meshes[0].bakeTransformIntoVertices(offset)
			
			
			
			

			
			
			

							  
							  
							  
							  mesh=meshes[0]
							  
							  			
	
							  
							  var finOpts = options
							  
							  
							  finOpts.onUnset= function ( x, y, z) {
								  
								   var t=noa.getBlock(x,y-1,z);
				
				
				                    if(t==blockIDs['waterflow']){
										 noa.setBlock(0,[x,y-1,z])
										
									}
								  
								  
								  
								  
								  var c=noa.getBlock(x,y,z+1),
				n=noa.getBlock(x,y,z-1),
				a=noa.getBlock(x+1,y,z),
				o=noa.getBlock(x-1,y,z);
				
				
					
							if(c==blockIDs['waterside2']){
								  //if(blocks[c].type==1){
									  noa.setBlock(0,[x,y,z+1])
								  //}
							}
							
							if(n==blockIDs['waterside2']){
								 // if(blocks[n].type==1){
									  noa.setBlock(0,[x,y,z-1])
								  //}
							}
							
							if(a==blockIDs['waterside2']){
								  //if(blocks[a].type==1){
									  noa.setBlock(0,[x+1,y,z])
								  //}
							}
							if(o==blockIDs['waterside2']){
								//  if(blocks[o].type==1){
									  noa.setBlock(0,[x-1,y,z])
								  //}
							}
				

			}
							
							  
							  
							  finOpts.onSet=function (x,y,z){
								  
								   	setTimeout(function(){ 

                  if(noa.getBlock(x,y,z-1)==0){
					   noa.setBlock(blockIDs['waterside2'],[x,y,z-1])
				  }
				  
				  if(noa.getBlock(x,y,z+1)==0){
					 noa.setBlock(blockIDs['waterside2'],[x,y,z+1])
				  }
				  
				  if(noa.getBlock(x+1,y,z)==0){
					  noa.setBlock(blockIDs['waterside2'],[x+1,y,z])
				  }
				  
				  if(noa.getBlock(x-1,y,z)==0){
					 noa.setBlock(blockIDs['waterside2'],[x-1,y,z])
				  }					
					
			
				 }, 500);
								  
							  }
							  finOpts.onCustomMeshCreate= function (mesh, x, y, z) {
								  
				
				 var rot=0;
				 
				 if(noa.getBlock(x,y,z-1)==blockIDs['waterside']){
					 
					 mesh.rotation.y=Math.PI
					 
					 if(noa.getBlock(x,y-1,z)==0){
						 noa.setBlock(blockIDs['waterflow'],[x,y-1,z])
					 }
					 /*var c=noa.getBlock(x,y-1,z)
					
					
							if(blocks[c]!==undefined){
								  if(blocks[c].type==1 ){
									  noa.setBlock(blockIDs['waterflow'],[x,y-1,z])
								  }
							}*/
				 }
				 if(noa.getBlock(x,y,z+1)==blockIDs['waterside']){
					
					 mesh.rotation.y=0
					  if(noa.getBlock(x,y-1,z)==0){
						 noa.setBlock(blockIDs['waterflow'],[x,y-1,z])
					 }
				
					 
					 
				 }
				 if(noa.getBlock(x+1,y,z)==blockIDs['waterside']){
					 
					 mesh.rotation.y=Math.PI/2
					   if(noa.getBlock(x,y-1,z)==0){
						 noa.setBlock(blockIDs['waterflow'],[x,y-1,z])
					 }
					
					
					
							
					 
				 }
				 if(noa.getBlock(x-1,y,z)==blockIDs['waterside']  ){
					 
					 mesh.rotation.y=-Math.PI/2
					 
					 if(noa.getBlock(x,y-1,z)==0){
						 noa.setBlock(blockIDs['waterflow'],[x,y-1,z])
					 }
					 
					
					
						
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
