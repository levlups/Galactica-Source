var trapjson=null
global.trapist=null
export function trap(noa,options,id,name,e){
	
	trapjson=e
	
	
	
	
	                    var bustex = new BABYLON.Texture(mod+"textures/block/oak_trapdoor.png", scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);

						var busmat = noa.rendering.makeStandardMaterial('chest')
						busmat.diffuseTexture=bustex;
						busmat.backFaceCulling = false;
						busmat.specularColor = BABYLON.Color3.Black()
						busmat.emissiveColor = BABYLON.Color3.White()
						bustex.hasAlpha=true;
                      
						
						
							var imageheight=16
	         var imagewidth=16
	         var pixely=1/imageheight;
	         var pixelx=1/imagewidth;
	         var num=1;
			 
			 
			  var faceUV = new Array(6);
				
				
				var n=[new BABYLON.Vector4(pixelx*0,-pixely*(15+num),pixelx*(15+num),-pixely*(0)),//face//top
	new BABYLON.Vector4(pixelx*0,-pixely*(15+num),pixelx*(15+num),-pixely*(0)),//back //under
	new BABYLON.Vector4(pixelx*0,-pixely*(4+num),pixelx*(4+num),-pixely*(0)),////right
	new BABYLON.Vector4(pixelx*0,-pixely*(4+num),pixelx*(4+num),-pixely*(0)),////left
	new BABYLON.Vector4(pixelx*0,-pixely*(4+num),pixelx*(4+num),-pixely*(0)),//top 
	new BABYLON.Vector4(pixelx*0,-pixely*(0+num),pixelx*(0+num),-pixely*(0))];//bottom*/
	
	
  var  uvoptions = {
        height: 1,
		depth:0.2,
		width:1,
		faceUV: n,
		wrap: true,
        updatable: true
    };	
			 
	
			var mesh =BABYLON.MeshBuilder.CreateBox(name, uvoptions, noa.rendering.getScene())
						mesh.material=busmat;
							var finOpts = options
					
						
							
							
							
							
							
							
							finOpts.onSet= function ( x, y, z) {
				
				
				var mesh2=mesh.clone('kelp')
				trapist=mesh2
				console.log(mesh2)
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
						
							 
							  detail=boptions[0][i].data['info']//"positionOpen"//
							  c=boptions[0][i].angle
							  j=detail
							  
						
							
					
						  }
					 }
			// }
			
				mesh2.position.x=x+trapjson[c][j][0]//0.5
				mesh2.position.y=y+trapjson[c][j][1]
				mesh2.position.z=z+trapjson[c][j][2]//0.5//
				
				mesh2.rotation.x=trapjson[c][j+'rotation'][0]
				mesh2.rotation.y=trapjson[c][j+'rotation'][1]
				mesh2.rotation.z=trapjson[c][j+'rotation'][2]
			
				
				mesh2.name='hitbox:trap:'+c+':'+JSON.stringify([x,y,z])
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
				mesh2.position.y=y+trapjson[c][j][1]
				mesh2.position.z=z+trapjson[c][j][2]//0.5//
				
				mesh2.rotation.x=trapjson[c][j+'rotation'][0]
				mesh2.rotation.y=trapjson[c][j+'rotation'][1]
				mesh2.rotation.z=trapjson[c][j+'rotation'][2]
			
				mesh2.name='hitbox:trap:'+c+':'+JSON.stringify([x,y,z])
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