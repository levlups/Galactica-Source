
var doorjson=null
export function ladder(noa,options,id,texture,name,e){
	
		doorjson=e
	
			var supermesh=BABYLON.Mesh.CreatePlane(name,1, scene)
			
		
			

			
				
		
			var offset = BABYLON.Matrix.Translation(0, 0.5, 0)
			var mat = noa.rendering.makeStandardMaterial(name)
	        supermesh.bakeTransformIntoVertices(offset)
			supermesh.material=mat
			
			var tex = new BABYLON.Texture(mod+'textures/' +texture+ '.png', scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
			mat.diffuseTexture = tex
			mat.diffuseTexture.hasAlpha=true
			mat.backFaceCulling=false
			
			var finOpts = options
			
			finOpts.onLoad= function ( x, y, z) {
				
			
				var mesh2=supermesh.clone('kelp')
				
				cubes['door']=mesh2
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
			
				mesh2.position.x=x+doorjson[c][j][0]//0.5
				mesh2.position.y=y+doorjson[c][j][1]
				mesh2.position.z=z+doorjson[c][j][2]//0.5//
				if(j=="positionOpen"){
					
					mesh2.rotation.x=doorjson[c]['open'][0]
				mesh2.rotation.y=doorjson[c]['open'][1]
				mesh2.rotation.z=doorjson[c]['open'][2]//
				}else{
				mesh2.rotation.x=doorjson[c]['rotation'][0]
				mesh2.rotation.y=doorjson[c]['rotation'][1]
				mesh2.rotation.z=doorjson[c]['rotation'][2]//////
				}
				noa.rendering.addMeshToScene(mesh2, false)
				offmeshes.push([[x,y,z],mesh2])
				
			}
			
			finOpts.onSet= function ( x, y, z) {
				
			var mesh2=supermesh.clone('kelp')
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
			
				mesh2.position.x=x+doorjson[c][j][0]//0.5
				mesh2.position.y=y+doorjson[c][j][1]
				mesh2.position.z=z+doorjson[c][j][2]//0.5//
				if(j=="positionOpen"){
					
					mesh2.rotation.x=doorjson[c]['open'][0]
				mesh2.rotation.y=doorjson[c]['open'][1]
				mesh2.rotation.z=doorjson[c]['open'][2]//
				}else{
				mesh2.rotation.x=doorjson[c]['rotation'][0]
				mesh2.rotation.y=doorjson[c]['rotation'][1]
				mesh2.rotation.z=doorjson[c]['rotation'][2]//////
				}
				noa.rendering.addMeshToScene(mesh2, false)
				offmeshes.push([[x,y,z],mesh2])
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

/*function blocklook(noa){
	
	//var playerp=noa.ents.getState(noa.playerEntity, noa.entities.names.position).position
	
	
	var viewdirection=null
	 var rad=BABYLON.Tools.ToDegrees(noa.camera.heading)//	// 

		 
		 if(rad>320  || rad <50){
	viewdirection='north'
	
	//'north'
	
}
if(rad>130 && rad<230){
	viewdirection='south'
	//'south'
	
}
if(rad>50 && rad<130){
	viewdirection='east'//[0,-Math.PI/2,0,[-0.4,0,0]]
	//'left'
	
	
}

if(rad>230 && rad<320){
	viewdirection='west'//[0,Math.PI/2,0,[0.4,0,0]]
	//'right'
	
}
return viewdirection;
	
	
}*/

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
