import { blocklook } from '../look'


var stairjson=null

var namer='pilon'

export function pilon(noa,options,id,texture,e){
	stairjson=e
	
	
	namer=e.name
	          
			  
			  var mat = noa.rendering.makeStandardMaterial('cool')
		//	/chair/chair
			
			var tex = new BABYLON.Texture(mod+ stairjson.texture, scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
			
			
			mat.diffuseTexture = tex
			
			var mesh=null
			
			BABYLON.SceneLoader.ImportMesh("", "",mod+ "models/"+namer+"/"+namer+".babylon", scene, function (meshes) { 
						 

								for (var i=0;i<meshes.length;i++){
							
							
							  meshes[i].material=busmat;
							  
							  
							//    var offset = BABYLON.Matrix.Translation(0, 0.5, 0)
	   //     meshes[0].bakeTransformIntoVertices(offset)

							  
							  
							  
							  mesh=meshes[0]
							 mesh.material=mat
							  
							  
						}
			
			
		    var finOpts = options
	
			
			finOpts.onLoad= function ( x, y, z) {
				
			var mesh2=mesh.clone('kelp')
				
				//cubes['door']=mesh2
				var c=blocklook(noa)
				var detail="Close"//
			var j="Close"
			
			
			if(boptions[0]==undefined){
				return;
			}
		
				
				
				
					 for (var i=0;i<boptions[0].length;i++){
						
						 var d=boptions[0][i].pos//
						
						  if(JSON.stringify(d)==JSON.stringify([x,y,z])){//
						
							 
							  detail=boptions[0][i].data['info']//"positionOpen"//
							  c=boptions[0][i].angle
							  j=detail
							  
						
							
					
						  }
					 }
			// }
			 //c='Close'
			 j='Close'
				mesh2.position.x=x+stairjson[c][j][0]//0.5
				mesh2.position.y=y+stairjson[c][j][1]
				mesh2.position.z=z+stairjson[c][j][2]//0.5//
				
				mesh2.rotation.x=stairjson[c][j+'rotation'][0]
				mesh2.rotation.y=stairjson[c][j+'rotation'][1]
				mesh2.rotation.z=stairjson[c][j+'rotation'][2]
				
				mesh2.name='hitbox:stairs:'+c+':'+JSON.stringify([x,y,z])
				
				noa.rendering.addMeshToScene(mesh2, false)
				offmeshes.push([[x,y,z],mesh2])
				
			}
			
			finOpts.onSet= function ( x, y, z) {
				
			
			var mesh2=mesh.clone('kelp')
				
				//cubes['door']=mesh2
				var c=blocklook(noa)
				var detail="Close"//
			var j="Close"
			
			
			if(boptions[0]==undefined){
				return;
			}
		
				
				
				
					 for (var i=0;i<boptions[0].length;i++){
						
						 var d=boptions[0][i].pos//
						
						  if(JSON.stringify(d)==JSON.stringify([x,y,z])){//
						
							 
							  detail=boptions[0][i].data['info']//"positionOpen"//
							  c=boptions[0][i].angle
							  j=detail
							  
						
							
					
						  }
					 }
			// }
			 //c='Close'
			 j='Close'
				mesh2.position.x=x+stairjson[c][j][0]//0.5
				mesh2.position.y=y+stairjson[c][j][1]
				mesh2.position.z=z+stairjson[c][j][2]//0.5//
				
				mesh2.rotation.x=stairjson[c][j+'rotation'][0]
				mesh2.rotation.y=stairjson[c][j+'rotation'][1]
				mesh2.rotation.z=stairjson[c][j+'rotation'][2]
				
				mesh2.name='hitbox:stairs:'+c+':'+JSON.stringify([x,y,z])
				
				noa.rendering.addMeshToScene(mesh2, false)
				offmeshes.push([[x,y,z],mesh2])
			}
			
			finOpts.onUnload= function ( x, y, z)  { removemesh(x,y,z)}
			finOpts.onUnset= function ( x, y, z) { removemesh(x,y,z)}
				
			
		
			 function removemesh(x,y,z){
				 for (var i=0;i<offmeshes.length;i++){
					
					if(JSON.stringify(offmeshes[i][0])==JSON.stringify([x,y,z])){
						
						var c=offmeshes[i][1]
						c.name='lol'
						noa.rendering.removeMeshFromScene(c, false)
					}
				}
				 
			 }
			 
			
			noa.registry.registerBlock(id, finOpts)
			
			 });
	
}
