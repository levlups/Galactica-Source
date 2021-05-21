export function plate(noa,options,id,texture,name,socket){
	
	var imageheight=16
	        var imagewidth=16
	        var pixely=1/imageheight;
	        var pixelx=1/imagewidth;
	         var num=1;
			 
			 
			  var faceUV = new Array(6);
	 
	 
	
	
	var n=[new BABYLON.Vector4(pixelx*0,-pixely*(8+num),pixelx*(15+num),-pixely*(0)),//face
	new BABYLON.Vector4(pixelx*0,-pixely*(8+num),pixelx*(15+num),-pixely*(0)),//back 
	new BABYLON.Vector4(pixelx*0,-pixely*(8+num),pixelx*(15+num),-pixely*(0)),//new BABYLON.Vector4(0.0625,0.125,0.125,0.375),//right
	new BABYLON.Vector4(pixelx*0,-pixely*(8+num),pixelx*(15+num),-pixely*(0)),//new BABYLON.Vector4(0,0.125,0.046,0.375),//left
	new BABYLON.Vector4(pixelx*0,-pixely*(15+num),pixelx*(15+num),-pixely*(0)),//top head
	new BABYLON.Vector4(pixelx*0,-pixely*(15+num),pixelx*(15+num),-pixely*(0))];//bottom
	
	var n2=[new BABYLON.Vector4(pixelx*0,-pixely*(8+num),pixelx*(15+num),-pixely*(0)),//face
	new BABYLON.Vector4(pixelx*0,-pixely*(8+num),pixelx*(15+num),-pixely*(0)),//back 
	new BABYLON.Vector4(pixelx*0,-pixely*(8+num),pixelx*(15+num),-pixely*(0)),//new BABYLON.Vector4(0.0625,0.125,0.125,0.375),//right
	new BABYLON.Vector4(pixelx*0,-pixely*(8+num),pixelx*(15+num),-pixely*(0)),//new BABYLON.Vector4(0,0.125,0.046,0.375),//left
	new BABYLON.Vector4(pixelx*0,-pixely*(8+num),pixelx*(15+num),-pixely*(0)),//top head
	new BABYLON.Vector4(pixelx*0,-pixely*(8+num),pixelx*(15+num),-pixely*(0))];//bottom
	
		
	  // Head
	  //column 8 row 1
  var  uvoptions = {
        height: 0.5,
		depth:1,
		width:1,
		faceUV: n,
		wrap: true,
        updatable: true
    };	
	
	
	var  uvoptions2 = {
        height: 0.5,
		depth:0.5,
		width:1,
		faceUV: n2,
		wrap: true,
        updatable: true
    };	
			 
			 
			 
			var scene=noa.rendering.getScene()
			
			var supermesh =makeBigMesh(noa, scene, texture, 'lol')//BABYLON.MeshBuilder.CreateBox(name, uvoptions, noa.rendering.getScene())
			
			var offset = BABYLON.Matrix.Translation(0, 0, 0)
	        
			var finOpts = options
			
			supermesh.bakeTransformIntoVertices(offset)
			
			
			
			
			finOpts.onLoad= function ( x, y, z) {
				
			console.log('plate loading')
			
				var mesh2=supermesh.clone('kelp')
				
				mesh2.position.x=x+0.5
				if(name=='plate'){
				mesh2.position.y=y
				}
				if(name=='platedown'){
				mesh2.position.y=y-0.2
				}
				mesh2.position.z=z+0.5
				noa.rendering.addMeshToScene(mesh2, false)
				offmeshes.push([[x+0.5,y,z+0.5],mesh2])
				
				
				var rot=0;
				
				 if(boptions.length>0){//
				
					 for (var i=0;i<boptions[0].length;i++){
						
						 var c=boptions[0][i].pos
						  if(JSON.stringify(c)==JSON.stringify([x,y,z])){
							  
							  rot= boptions[0][i].angle
							  twist()//////
							  break;
					
						  }
					 }
				 }
				 
				 function twist(){
					mesh2.rotation.y=rot[1]
					mesh2.rotation.z=rot[2]
					mesh2.position.y+=rot[3][1]
					return;
				
					
				 }
				
			}
			
			finOpts.onSet= function ( x, y, z) {
				
		
				var mesh2=supermesh.clone('kelp')
				
				mesh2.position.x=x+0.5
				if(name=='plate'){
				mesh2.position.y=y
				}
				if(name=='platedown'){
				mesh2.position.y=y-0.1
				
				setTimeout(function(){ 
                  socket.emit('block-place', {position: [x,y,z],angle:'none',id:blockIDs['plate']})
				}, 1000);
				
				}
				mesh2.position.z=z+0.5
				noa.rendering.addMeshToScene(mesh2, false)
				offmeshes.push([[x+0.5,y,z+0.5],mesh2])
				var c=blocklook(noa)
				
				mesh2.rotation.x=c[0]
				mesh2.rotation.y=c[1]
				mesh2.rotation.z=c[2]
				
			}
			
			finOpts.onUnload= function ( x, y, z) {
				
				
				
				for (var i=0;i<offmeshes.length;i++){
					
					if(JSON.stringify(offmeshes[i][0])==JSON.stringify([x+0.5,y,z+0.5])){
						
						var c=offmeshes[i][1]
						
						
						noa.rendering.removeMeshFromScene(c, false)
					}
				}
			}
			finOpts.onUnset= function ( x, y, z) {
				
				
				
				for (var i=0;i<offmeshes.length;i++){
					
					if(JSON.stringify(offmeshes[i][0])==JSON.stringify([x+0.5,y,z+0.5])){
						
						var c=offmeshes[i][1]
						
						noa.rendering.removeMeshFromScene(c, false)
					}
				}
			}
		
			 
			 
			//  finOpts.blockMesh = supermesh//
			noa.registry.registerBlock(id, finOpts)
	
}

function makeBigMesh(noa, scene, url, name) {

	var mesh = {}
	var mat = {}
	for (var x = 0; x < 6; x++) {
		var matname = name + '-' + x || 'sprite-mat'
		mesh[x] = BABYLON.Mesh.CreatePlane('sprite-' + matname, 1, scene)
		mat[x] = noa.rendering.makeStandardMaterial(matname + x)
		mat[x].backFaceCulling = false
		if(x==0){
			//right
		mat[x].diffuseTexture = new BABYLON.Texture(mod+'textures/'+ url[5]+'.png', scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE) //
		}
		if(x==1){
			//left
		mat[x].diffuseTexture = new BABYLON.Texture(mod+'textures/'+ url[4]+'.png', scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
		}
		if(x==2){
			//front
		mat[x].diffuseTexture = new BABYLON.Texture(mod+'textures/'+ url[0]+'.png', scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
		}
		if(x==3){
			//back
		mat[x].diffuseTexture = new BABYLON.Texture(mod+'textures/'+ url[3]+'.png', scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
		}
		if(x==4){
			//top
		mat[x].diffuseTexture = new BABYLON.Texture(mod+'textures/'+ url[1]+'.png', scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
		}
		if(x==5){
			//bottom
		mat[x].diffuseTexture = new BABYLON.Texture(mod+'textures/'+ url[2]+'.png', scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
		}
		
	
		
		mat[x].diffuseTexture.hasAlpha = true
		mesh[x].material = mat[x]
		var offset
		if (x == 0) {offset = BABYLON.Matrix.Translation(0, 0.5, 0.5); mesh[x].rotation.y = 1.57}
		else if (x == 1) {offset = BABYLON.Matrix.Translation(0, 0.5, -0.5); mesh[x].rotation.y = 1.57}
		else if (x == 2) {offset = BABYLON.Matrix.Translation(0, 0.5, 0.5);}
		else if (x == 3) {offset = BABYLON.Matrix.Translation(0, 0.5, -0.5);}
		else if (x == 4) {offset = BABYLON.Matrix.Translation(0, 0, -1); mesh[x].rotation.x = 1.57}
		else if (x == 5) {offset = BABYLON.Matrix.Translation(0, 0, 0); mesh[x].rotation.x = 1.57}

		mesh[x].bakeTransformIntoVertices(offset)
	}
	
	var newmesh = BABYLON.Mesh.MergeMeshes(Object.values(mesh), true, true, undefined, false, true)
	
	//newmesh.scaling.x=0.25
	newmesh.scaling.y=0.25
	//newmesh.scaling.z=0.25

	return newmesh

}

 function blocklook(noa){
	var up=false
	var playerp=noa.ents.getState(noa.playerEntity, noa.entities.names.position).position
	
	
	var viewdirection=null
	 var rad=BABYLON.Tools.ToDegrees(noa.camera.heading)//	// 

		 
		 if(rad>320  || rad <50){
	viewdirection=[0,Math.PI,0,[0,0,0]]
	if(up){
		viewdirection= [0,Math.PI,Math.PI,[0,1,0]]
	}
	//'north'
	
}
if(rad>130 && rad<230){
	viewdirection=[0,0,0,[0,0,0]]
	//'south'
	if(up){
		viewdirection= [0,0,Math.PI,[0,1,0]]
	}
}
if(rad>50 && rad<130){
	viewdirection=[0,-Math.PI/2,0,[0,0,0]]
	//'left'
	if(up){
		viewdirection=  [0,-Math.PI/2,Math.PI,[0,1,0]]
	}
	
}

if(rad>230 && rad<320){
	viewdirection=[0,Math.PI/2,0,[0,0,0]]
	//'right'
	if(up){
		viewdirection=   [0,Math.PI/2,Math.PI,[0,1,0]]
	}
}
return viewdirection;

 }