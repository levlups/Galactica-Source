export function dooropen(noa,options,id,texture,name){
	
		
	
			var supermesh=BABYLON.Mesh.CreatePlane(name,1, scene)
			
		
			

			if(name=='dooropen'){
				
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
				
			}
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
				
				mesh2.position.x=x+0.5
				mesh2.position.y=y
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
				mesh2.position.y=y
				mesh2.position.z=z+0.5
				noa.rendering.addMeshToScene(mesh2, false)
				offmeshes.push([[x+0.5,y,z+0.5],mesh2])
				
				noa.setBlock(0,[x,y+1,z])
				var c=blocklook(noa)
				
				mesh2.rotation.x=c[0]
				mesh2.rotation.y=c[1]+Math.PI/2
				mesh2.rotation.z=c[2]
				
				
				mesh2.position.x+=c[3][0]
				mesh2.position.y+=c[3][1]
				mesh2.position.z+=c[3][2]
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
		
			
		
				
			noa.registry.registerBlock(id, finOpts)
		
}

function blocklook(noa){
	var up=false
	var playerp=noa.ents.getState(noa.playerEntity, noa.entities.names.position).position
	
	
	var viewdirection=null
	 var rad=BABYLON.Tools.ToDegrees(noa.camera.heading)//	// 

		 
		 if(rad>320  || rad <50){
	viewdirection=[0,Math.PI,0,[0.4,0,0]]
	
	//'north'
	
}
if(rad>130 && rad<230){
	viewdirection=[0,0,0,[-0.4,0,0]]
	//'south'

}
if(rad>50 && rad<130){
	viewdirection=[0,-Math.PI/2,0,[0,0,0.4]]
	//'left'
	
	
}

if(rad>230 && rad<320){
	viewdirection=[0,Math.PI/2,0,[0,0,-0.4]]
	//'right'
	
}
return viewdirection;

 }
