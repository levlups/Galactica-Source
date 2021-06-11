var trapjson=null

export function rail(noa,options,id,name,e){
	
	trapjson=e
	//console.log(e)
	var scene=noa.rendering.getScene()
			
			var mesh = BABYLON.Mesh.CreatePlane('sprite-' + name, 1, scene)//makeBigMesh(noa, scene, texture, 'lol')//BABYLON.MeshBuilder.CreateBox(name, uvoptions, noa.rendering.getScene())
			var mat= noa.rendering.makeStandardMaterial(name)
			
			mat.diffuseTexture = new BABYLON.Texture(mod+'textures/block/rail.png', scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
			mesh.material=mat
			var offset = BABYLON.Matrix.Translation(0, 0, 0); mesh.rotation.x = 1.57;

		mesh.bakeTransformIntoVertices(offset)
		
		mat.backFaceCulling=false
		mat.diffuseTexture.hasAlpha=true
	        
			var finOpts = options
					
						
							
							
							
							
							
							
							finOpts.onSet= function ( x, y, z) {
				
				
				var mesh2=mesh.clone('kelp')
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
						
							 
							  
							  detail=boptions[0][i].data['info']
							  
							  
							  j=detail
							  c=boptions[0][i].angle
							  
						
							
					
						  }
					 }
			// }
			
				mesh2.position.x=x+trapjson[c][j][0]//0.5
				mesh2.position.y=y+trapjson[c][j][1]+0.1
				mesh2.position.z=z+trapjson[c][j][2]//0.5//
				
				mesh2.rotation.x=trapjson[c][j+'rotation'][0]
				mesh2.rotation.y=trapjson[c][j+'rotation'][1]
				mesh2.rotation.z=trapjson[c][j+'rotation'][2]//////
				
				
				if(noa.getBlock(x,y+1,z-1)==id  ){
					 console.log('cool man')
						  mesh2.rotation.x=0
					    mesh2.rotation.x=Math.PI/4
						mesh2.scaling.y=Math.hypot(1,1);
						mesh2.position.y+=0.5;
						 
						 
				 }
				  else if(noa.getBlock(x,y+1,z+1)==id  ){
					   console.log('cool mano')
					  mesh2.rotation.x=0
					
						 mesh2.rotation.x=-Math.PI/4
						 mesh2.scaling.y=Math.hypot(1,1);
						 mesh2.position.y+=0.5;
						   
				 }
				 
				   else if(noa.getBlock(x-1,y+1,z)==id  ){
					 console.log('cool man')
						  mesh2.rotation.x=0
					    mesh2.rotation.x=-Math.PI/4
						mesh2.scaling.y=Math.hypot(1,1);
						mesh2.position.y+=0.5;
						 
						 
				 }
				    else if(noa.getBlock(x+1,y+1,z)==id  ){
					   console.log('cool mano')
					  mesh2.rotation.x=0
					
						 mesh2.rotation.x=-Math.PI/4
						 mesh2.scaling.y=Math.hypot(1,1);
						mesh2.position.y+=0.5;
						   
				 }
				 
				 
				 setTimeout(function(){  
				
			     if(noa.getBlock(x,y,z+1)==id && noa.getBlock(x-1,y,z)==id ){
					noa.setBlock(blockIDs.railside,[x,y,z])
				}	
				
				if(noa.getBlock(x,y,z-1)==id && noa.getBlock(x+1,y,z)==id ){
					noa.setBlock(blockIDs.railside,[x,y,z])
				}
				
				if(noa.getBlock(x,y,z+1)==id && noa.getBlock(x+1,y,z)==id ){
					noa.setBlock(blockIDs.railside,[x,y,z])
				}
				if(noa.getBlock(x,y,z-1)==id && noa.getBlock(x-1,y,z)==id ){
					noa.setBlock(blockIDs.railside,[x,y,z])
				}
				
				}, 1000);
				noa.rendering.addMeshToScene(mesh2, false)
				offmeshes.push([[x,y,z],mesh2])
				
			
				
			}
			finOpts.onLoad= function ( x, y, z) {
				
			
			
				var mesh2=mesh.clone('kelp')
			var c=null
			
			var detail="positionClose"//
			var j="positionClose"
	           
				//return;
				if(boptions[0]==undefined){
				return;
			}
				
					 for (var i=0;i<boptions[0].length;i++){
						
						 var d=boptions[0][i].pos//
						
						  if(JSON.stringify(d)==JSON.stringify([x,y,z])){//
						
							 
							  
							  detail=boptions[0][i].data['info']
							  
							  
							  j=detail
							  c=boptions[0][i].angle
						
							
					
						  }
					 }
			// }
			
				mesh2.position.x=x+trapjson[c][j][0]//0.5
				mesh2.position.y=y+trapjson[c][j][1]+0.1
				mesh2.position.z=z+trapjson[c][j][2]//0.5//
				
				mesh2.rotation.x=trapjson[c][j+'rotation'][0]
				mesh2.rotation.y=trapjson[c][j+'rotation'][1]
				mesh2.rotation.z=trapjson[c][j+'rotation'][2]//////
				
				setTimeout(function(){ 
					if(noa.getBlock(x,y+1,z-1)==id  ){
					 console.log('cool man')
						  mesh2.rotation.x=0
					    mesh2.rotation.x=Math.PI/4
						mesh2.scaling.y=Math.hypot(1,1);
						mesh2.position.y+=0.5;
						 
						 
				 }
				  else if(noa.getBlock(x,y+1,z+1)==id  ){
					   console.log('cool mano')
					  mesh2.rotation.x=0
					
						 mesh2.rotation.x=-Math.PI/4
						 mesh2.scaling.y=Math.hypot(1,1);
						 mesh2.position.y+=0.5;
						   
				 }
				 
				else if(noa.getBlock(x-1,y+1,z)==id  ){
					 console.log('cool man')
						  mesh2.rotation.x=0
					    mesh2.rotation.x=-Math.PI/4
						mesh2.scaling.y=Math.hypot(1,1);
						mesh2.position.y+=0.5;
						 
						 
				 }
				 else if(noa.getBlock(x+1,y+1,z)==id  ){
					   console.log('cool mano')
					  mesh2.rotation.x=0
					
						 mesh2.rotation.x=-Math.PI/4
						 mesh2.scaling.y=Math.hypot(1,1);
						 mesh2.position.y+=0.5;
						   
				 }
				 
				 
				 	setTimeout(function(){  
				
			     if(noa.getBlock(x,y,z+1)==id && noa.getBlock(x-1,y,z)==id ){
					noa.setBlock(blockIDs.railside,[x,y,z])
				}	
				
				if(noa.getBlock(x,y,z-1)==id && noa.getBlock(x+1,y,z)==id ){
					noa.setBlock(blockIDs.railside,[x,y,z])
				}
				
				if(noa.getBlock(x,y,z+1)==id && noa.getBlock(x+1,y,z)==id ){
					noa.setBlock(blockIDs.railside,[x,y,z])
				}
				if(noa.getBlock(x,y,z-1)==id && noa.getBlock(x-1,y,z)==id ){
					noa.setBlock(blockIDs.railside,[x,y,z])
				}
				
				}, 1000);
			
				noa.rendering.addMeshToScene(mesh2, false)
				offmeshes.push([[x,y,z],mesh2])
					}, 3000);
			
				
			}
			finOpts.onUnload= function ( x, y, z) {
				
				
				
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

function twist(meshy,rot){
					meshy.rotation.y=rot[1]
					meshy.rotation.z=rot[2]
					meshy.position.y+=rot[3][1]
					return;
				
					
				 }