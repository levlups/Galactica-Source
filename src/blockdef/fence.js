import { blocklook } from '../look'

var trapjson=null;
var namer='table'
	var mesh=null
			
			var mesh3=null
			var middlefence=null
			var fencecorner=null
export function fence(noa,options,id,texture,e){
	console.log(e)
	trapjson=e
    namer=e.name
			
				  var mat = noa.rendering.makeStandardMaterial('cool')
		//	/chair/chair
			
			var tex = new BABYLON.Texture(mod+ trapjson.texture, scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
			
			
			mat.diffuseTexture = tex
			
		
		
		BABYLON.SceneLoader.ImportMesh("", "",mod+ "models/oakfence/middlefence.babylon", scene, function (meshes) { 
						 

								for (var i=0;i<meshes.length;i++){
							
							
							  meshes[i].material=busmat;
							  
							  
							

							  
							  
							  
							  middlefence=meshes[0]
							 middlefence.material=mat
							  
							  
						}
						
						});
						
						BABYLON.SceneLoader.ImportMesh("", "",mod+ "models/oakfence/fencecorner.babylon", scene, function (meshes) { 
						 

								for (var i=0;i<meshes.length;i++){
							
							
							  meshes[i].material=busmat;
							  
							  
							

							  
							  
							  
							  fencecorner=meshes[0]
							 fencecorner.material=mat
							  
							  
						}
						
						});
			
			BABYLON.SceneLoader.ImportMesh("", "",mod+ "models/oakfence/oakfence.babylon", scene, function (meshes) { 
						 

								for (var i=0;i<meshes.length;i++){
							
							
							  meshes[i].material=busmat;
							  
							  
							

							  
							  
							  
							  mesh3=meshes[0]
							 mesh3.material=mat
							  
							  
						}
						
						});
			
			BABYLON.SceneLoader.ImportMesh("", "",mod+ "models/oakfence/fence.babylon", scene, function (meshes) { 
						 

								for (var i=0;i<meshes.length;i++){
							
							
							  meshes[i].material=busmat;
							  
							  
							

							  
							  
							  
							  mesh=meshes[0]
							 mesh.material=mat
							  
							  
						}
						
						 });
			
			var finOpts = options
			
				
		
			
			
			finOpts.onSet= function ( x, y, z) {
				
				
				
			var c=blocklook(noa)
			
			var detail="Close"//
			var j="Close"
			
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
			
			       var mesh2=middlefence.clone('kelp')
				
	           
			
			console.log(c)
				console.log(trapjson)
				mesh2.position.x=x+trapjson[c][j][0]//0.5
				mesh2.position.y=y+trapjson[c][j][1]
				mesh2.position.z=z+trapjson[c][j][2]//0.5//
				
				mesh2.rotation.x=trapjson[c][j+'rotation'][0]//-1.57
				mesh2.rotation.y=trapjson[c][j+'rotation'][1]
				mesh2.rotation.z=trapjson[c][j+'rotation'][2]
			
				noa.rendering.addMeshToScene(mesh2, false)
				offmeshes.push([[x,y,z],mesh2])
				
					setTimeout(function(){  
				
			     if(noa.getBlock(x,y,z+1)==id && noa.getBlock(x-1,y,z)==id ){
					noa.setBlock(blockIDs.oakfenceside,[x,y,z])
				}	
				
				if(noa.getBlock(x,y,z-1)==id && noa.getBlock(x+1,y,z)==id ){
					noa.setBlock(blockIDs.oakfenceside,[x,y,z])
				}
				
				if(noa.getBlock(x,y,z+1)==id && noa.getBlock(x+1,y,z)==id ){
					noa.setBlock(blockIDs.oakfenceside,[x,y,z])
				}
				if(noa.getBlock(x,y,z-1)==id && noa.getBlock(x-1,y,z)==id ){
					noa.setBlock(blockIDs.oakfenceside,[x,y,z])
				}
				
				}, 1000);
				
			
				
			}
			finOpts.onLoad= function ( x, y, z) {
				//setTimeout(function(){  
		
				
				
			var c=null
			
			var detail="Close"//
			var j="Close"
	           
			
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
					 
					 
				var mesh2=middlefence.clone('kelp')
				
			
			console.log(c)
				console.log(trapjson)
				mesh2.position.x=x+trapjson[c][j][0]//0.5
				mesh2.position.y=y+trapjson[c][j][1]
				mesh2.position.z=z+trapjson[c][j][2]//0.5//
				
				mesh2.rotation.x=trapjson[c][j+'rotation'][0]//-1.57
				mesh2.rotation.y=trapjson[c][j+'rotation'][1]
				mesh2.rotation.z=trapjson[c][j+'rotation'][2]
			
				noa.rendering.addMeshToScene(mesh2, false)
				offmeshes.push([[x,y,z],mesh2])
				setTimeout(function(){  
				
			     if(noa.getBlock(x,y,z+1)==id && noa.getBlock(x-1,y,z)==id ){
					noa.setBlock(blockIDs.oakfenceside,[x,y,z])
				}	
				
				if(noa.getBlock(x,y,z-1)==id && noa.getBlock(x+1,y,z)==id ){
					noa.setBlock(blockIDs.oakfenceside,[x,y,z])
				}
				
				if(noa.getBlock(x,y,z+1)==id && noa.getBlock(x+1,y,z)==id ){
					noa.setBlock(blockIDs.oakfenceside,[x,y,z])
				}
				if(noa.getBlock(x,y,z-1)==id && noa.getBlock(x-1,y,z)==id ){
					noa.setBlock(blockIDs.oakfenceside,[x,y,z])
				}
				
				}, 1000);
			
				
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



