export function wire(noa,options,id,texture,name,offmeshes){
	

			 
			 
			 
			var scene=noa.rendering.getScene()
			
			var supermesh = BABYLON.Mesh.CreatePlane('sprite-' + name, 1, scene)//makeBigMesh(noa, scene, texture, 'lol')//BABYLON.MeshBuilder.CreateBox(name, uvoptions, noa.rendering.getScene())
			var mat= noa.rendering.makeStandardMaterial(name)
			
			mat.diffuseTexture = new BABYLON.Texture(mod+'textures/block/redstone_dust_line0.png', scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
			supermesh.material=mat
			var offset = BABYLON.Matrix.Translation(0, 0, 0); supermesh.rotation.x = 1.57;

		supermesh.bakeTransformIntoVertices(offset)
		
		mat.backFaceCulling=false
		mat.diffuseTexture.hasAlpha=true
	        
			var finOpts = options
			
			/*finOpts.blockMesh = supermesh
			finOpts.onCustomMeshCreate= function (supermesh, x, y, z) {
			var mesh2=supermesh.clone('kelp')
			  if(noa.getBlock(x,y+1,z-1)===id  ){
						  mesh2.rotation.x=0
					    mesh2.rotation.x=-Math.PI/4
						mesh2.scaling.y=Math.hypot(1,1);
						mesh2.position.y+=0.5;
						 
						 
				 }
				  if(noa.getBlock(x,y+1,z+1)===id  ){
					  mesh2.rotation.x=0
					
						 mesh2.rotation.x=Math.PI/4
						 mesh2.scaling.y=Math.hypot(1,1);
						 mesh2.position.y+=0.5;
						   
				 }
			}*/
			
			
			
			
		    
			 
			
			finOpts.onLoad= function ( x, y, z) {
				
			
				var mesh2=supermesh.clone('kelp')
				
				mesh2.position.x=x+0.5
				
				
				mesh2.position.y=y+0.1
			
			
				
				mesh2.position.z=z+0.5
				noa.rendering.addMeshToScene(mesh2, false)
				
				offmeshes.push([[x+0.5,y,z+0.5],mesh2])
				
				 if(noa.getBlock(x,y+1,z-1)==id  ){
					 console.log('cool man')
						  mesh2.rotation.x=0
					    mesh2.rotation.x=-Math.PI/4
						mesh2.scaling.y=Math.hypot(1,1);
						mesh2.position.y+=0.5;
						 
						 
				 }
				  if(noa.getBlock(x,y+1,z+1)==id  ){
					   console.log('cool mano')
					  mesh2.rotation.x=0
					
						 mesh2.rotation.x=Math.PI/4
						 mesh2.scaling.y=Math.hypot(1,1);
						 mesh2.position.y+=0.5;
						   
				 }
				
				
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
					mesh2.position.y=y+0.1
					
					mesh2.rotation.x = 1.57;
					
					
					
					return;
				
					
				 }
				 
				
				
			}
			
			finOpts.onSet= function ( x, y, z) {
				
			
				var mesh2=supermesh.clone('kelp')
				
				mesh2.position.x=x+0.5
				
					
				
				mesh2.position.y=y+0.1
			
				
				
				mesh2.position.z=z+0.5
				noa.rendering.addMeshToScene(mesh2, false)
			
				offmeshes.push([[x+0.5,y,z+0.5],mesh2])
				var c=blocklook(noa)
				
				mesh2.rotation.x = 1.57;
				//mesh2.rotation.x=c[0]
				mesh2.rotation.y=c[1]
				mesh2.rotation.z=c[2]
				
				if(noa.getBlock(x,y+1,z-1)==id  ){
					 console.log('cool man')
						  mesh2.rotation.x=0
					    mesh2.rotation.x=-Math.PI/4
						mesh2.scaling.y=Math.hypot(1,1);
						mesh2.position.y+=0.5;
						 
						 
				 }
				  if(noa.getBlock(x,y+1,z+1)==id  ){
					   console.log('cool mano')
					  mesh2.rotation.x=0
					
						 mesh2.rotation.x=Math.PI/4
						 mesh2.scaling.y=Math.hypot(1,1);
						 mesh2.position.y+=0.5;
						   
				 }
				
				//mesh2.position.y=y+0.1
				
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