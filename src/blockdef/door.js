
var doorjson=null
export function door(noa,options,id,texture,name,e){
	
		doorjson=e
	
			var supermesh=BABYLON.Mesh.CreatePlane(name,1, scene)
			
		
			

			
				
				var imageheight=16
	         var imagewidth=16
	         var pixely=1/imageheight;
	         var pixelx=1/imagewidth;
	         var num=1;
			 
			 
			  var faceUV = new Array(6);
				
				
				var n=[new BABYLON.Vector4(pixelx*4,-pixely*(15+num),pixelx*(12+num),-pixely*(0)),//face
	new BABYLON.Vector4(pixelx*4,-pixely*(15+num),pixelx*(12+num),-pixely*(0)),//back 
	new BABYLON.Vector4(pixelx*4,-pixely*(15+num),pixelx*(4+num),-pixely*(0)),////right
	new BABYLON.Vector4(pixelx*4,-pixely*(15+num),pixelx*(4+num),-pixely*(0)),////left
	new BABYLON.Vector4(pixelx*4,-pixely*(0+num),pixelx*(12+num),-pixely*(0)),//top 
	new BABYLON.Vector4(pixelx*4,-pixely*(0+num),pixelx*(12+num),-pixely*(0))];//bottom*/
	
	
  var  uvoptions = {
        height: 1.9,
		depth:0.1,
		width:1,
		faceUV: n,
		wrap: true,
        updatable: true
    };	
			 
	
			supermesh =BABYLON.MeshBuilder.CreateBox(name, uvoptions, noa.rendering.getScene())
				
			
			var offset = BABYLON.Matrix.Translation(0, 1, 0)
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
				var detail="Close"//
			var j="Close"
			
			
			if(boptions[0]==undefined){
				return;
			}
		// if(boptions.length>0){////
				// console.log(boptions[0])
				
				
				
					 for (var i=0;i<boptions[0].length;i++){
						
						 var d=boptions[0][i].pos//
						
						  if(JSON.stringify(d)==JSON.stringify([x,y,z])){//
						
							 
							  detail=boptions[0][i].data['info']
							  c=boptions[0][i].angle
							  j=detail
							  
						
							
					
						  }
					 }
			// }
			
				mesh2.position.x=x+doorjson[c][j][0]//0.5
				mesh2.position.y=y+doorjson[c][j][1]
				mesh2.position.z=z+doorjson[c][j][2]//0.5//
				
					mesh2.rotation.x=doorjson[c][j+'rotation'][0]
				mesh2.rotation.y=doorjson[c][j+'rotation'][1]
				mesh2.rotation.z=doorjson[c][j+'rotation'][2]//
			
				
			
				
				mesh2.name='hitbox:door:'+c+':'+JSON.stringify([x,y,z])
				noa.rendering.addMeshToScene(mesh2, false)
				offmeshes.push([[x,y,z],mesh2])
				
			}
			
			finOpts.onSet= function ( x, y, z) {
				
			var mesh2=supermesh.clone('kelp')
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
			
			
				mesh2.position.x=x+doorjson[c][j][0]//0.5
				mesh2.position.y=y+doorjson[c][j][1]
				mesh2.position.z=z+doorjson[c][j][2]//0.5//
				
				mesh2.rotation.x=doorjson[c][j+'rotation'][0]
				mesh2.rotation.y=doorjson[c][j+'rotation'][1]
				mesh2.rotation.z=doorjson[c][j+'rotation'][2]//
				
				
				
					mesh2.name='hitbox:door:'+c+':'+JSON.stringify([x,y,z])
				
				
				
			
				noa.rendering.addMeshToScene(mesh2, false)
				offmeshes.push([[x,y,z],mesh2])
			}
			
			finOpts.onUnload= function ( x, y, z) {
				
				
				
				for (var i=0;i<offmeshes.length;i++){
					
					if(JSON.stringify(offmeshes[i][0])==JSON.stringify([x,y,z])){
						
						var c=offmeshes[i][1]
						
						c.name='lol'
						noa.rendering.removeMeshFromScene(c, false)
					}
				}
			}
			finOpts.onUnset= function ( x, y, z) {
				
				
				
				for (var i=0;i<offmeshes.length;i++){
					
					if(JSON.stringify(offmeshes[i][0])==JSON.stringify([x,y,z])){
						
						var c=offmeshes[i][1]
						c.name='lol'
						noa.rendering.removeMeshFromScene(c, false)
					}
				}
			}
		
			
		
				
			noa.registry.registerBlock(id, finOpts)
		
}



function blocklook(noa){
	
	
var viewdirection=null
var rad=BABYLON.Tools.ToDegrees(noa.camera.heading)

		 
if(rad>320  || rad <50){
	 viewdirection='north'
	
	
}
if(rad>130 && rad<230){
	viewdirection='south'
	
	
}
if(rad>50 && rad<130){
	viewdirection='east'
	
	
	
}

if(rad>230 && rad<320){
	viewdirection='west'
	
	
}
return viewdirection;

 }
