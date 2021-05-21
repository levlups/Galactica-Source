export function watersource(noa,options,id){
	
	var bustex =new BABYLON.Texture(mod+"textures/block/water_still.png", scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);////waterytexture(noa)// new BABYLON.Texture("./textures/block/lava_still.png", scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);//

						var busmat = noa.rendering.makeStandardMaterial('chest')
						
						
						busmat.diffuseColor = BABYLON.Color3.White()
						busmat.ambientColor = new BABYLON.Color4(0.6, 0.6, 1,0.5);
						//bustex.hasAlpha=true;
						//busmat.diffuseTexture.hasAlpha=true;
						busmat.diffuseTexture=bustex;
						//busmat.useAlphaFromDiffuseTexture = true
						
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
			 mesh.position.y+=1
							  var finOpts = options
							  mesh.material=busmat
							  mesh.bakeCurrentTransformIntoVertices();
							  finOpts.blockMesh=mesh
							  //finOpts.blockMesh.rotation.x=Math.PI/2
							   finOpts.onUnset= function ( x, y, z) {
								  
								  var c=noa.getBlock(x,y,z+1),
				n=noa.getBlock(x,y,z-1),
				a=noa.getBlock(x+1,y,z),
				o=noa.getBlock(x-1,y,z);
				
				
					
							if(c==blockIDs['waterside']){
								  //if(blocks[c].type==1){
									  noa.setBlock(0,[x,y,z+1])
								  //}
							}
							
							if(n==blockIDs['waterside']){
								 // if(blocks[n].type==1){
									  noa.setBlock(0,[x,y,z-1])
								  //}
							}
							
							if(a==blockIDs['waterside']){
								  //if(blocks[a].type==1){
									  noa.setBlock(0,[x+1,y,z])
								  //}
							}
							if(o==blockIDs['waterside']){
								//  if(blocks[o].type==1){
									  noa.setBlock(0,[x-1,y,z])
								  //}
							}
				
				
				
				 
				 
		  
		
			}
							
							  
							  
							  
							  finOpts.onSet= function ( x, y, z) {
								  
								  setTimeout(function(){
								  
								  var c=noa.getBlock(x,y,z+1),
				n=noa.getBlock(x,y,z-1),
				a=noa.getBlock(x+1,y,z),
				o=noa.getBlock(x-1,y,z);
				
				
					
							if(blocks[c]!==undefined){
								  if(blocks[c].type==1){
									  noa.setBlock(blockIDs['waterside'],[x,y,z+1])
								  }
							}
							
							if(blocks[n]!==undefined){
								  if(blocks[n].type==1){
									  noa.setBlock(blockIDs['waterside'],[x,y,z-1])
								  }
							}
							
							if(blocks[a]!==undefined){
								  if(blocks[a].type==1){
									  noa.setBlock(blockIDs['waterside'],[x+1,y,z])
								  }
							}
							if(blocks[o]!==undefined){
								  if(blocks[o].type==1){
									  noa.setBlock(blockIDs['waterside'],[x-1,y,z])
								  }
							}
							
							if(noa.getBlock(x,y,z+1)==0){
								noa.setBlock(blockIDs['waterside'],[x,y,z+1])
							}
							if(noa.getBlock(x,y,z-1)==0){
								noa.setBlock(blockIDs['waterside'],[x,y,z-1])
							}
							if(noa.getBlock(x+1,y,z)==0){
								noa.setBlock(blockIDs['waterside'],[x+1,y,z])
							}
							if(noa.getBlock(x-1,y,z)==0){
								noa.setBlock(blockIDs['waterside'],[x-1,y,z])
								
							}
				
				  }, 500);
				 
				 
		  
		
			}
			
			  finOpts.onLoad= function ( x, y, z) {
				  
				  
				  
				  			setTimeout(function(){  
				
				 
				var c=noa.getBlock(x,y,z+1),
				n=noa.getBlock(x,y,z-1),
				a=noa.getBlock(x+1,y,z),
				o=noa.getBlock(x-1,y,z);
				
				
					
							if(blocks[c]!==undefined){
								  if(blocks[c].type==1){
									  noa.setBlock(blockIDs['waterside'],[x,y,z+1])
								  }
							}
							
							if(blocks[n]!==undefined){
								  if(blocks[n].type==1){
									  noa.setBlock(blockIDs['waterside'],[x,y,z-1])
								  }
							}
							
							if(blocks[a]!==undefined){
								  if(blocks[a].type==1){
									  noa.setBlock(blockIDs['waterside'],[x+1,y,z])
								  }
							}
							if(blocks[o]!==undefined){
								  if(blocks[o].type==1){
									  noa.setBlock(blockIDs['waterside'],[x-1,y,z])
								  }
							}
							
							
							
							
				if(noa.getBlock(x,y,z+1)==0){
					noa.setBlock(blockIDs['waterside'],[x,y,z+1])
				}
				if(noa.getBlock(x,y,z-1)==0){
					noa.setBlock(blockIDs['waterside'],[x,y,z-1])
				}
				if(noa.getBlock(x+1,y,z)==0){
					noa.setBlock(blockIDs['waterside'],[x+1,y,z])
				}
				if(noa.getBlock(x-1,y,z)==0){
					noa.setBlock(blockIDs['waterside'],[x-1,y,z])
					
				}
				 
				 
		      }, 500);
		
			}
	
						
			            finOpts.blockMesh = mesh
						
						
						
						//noa.rendering.addMeshToScene(mesh, false)
							  
							noa.registry.registerBlock(id, finOpts)
								
					
	
	
};

