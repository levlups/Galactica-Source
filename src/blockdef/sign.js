

import { blocklook } from '../look'
	var bedjsony=null
export function makesign(noa,options,id,name,e){
	
	bedjsony=e
	
		var bustex = new BABYLON.Texture(mod+"models/sign/sign.png", scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);
var busmat = new BABYLON.StandardMaterial("face0", scene);
						busmat.diffuseTexture=bustex;
busmat.backFaceCulling = false;
busmat.specularColor = BABYLON.Color3.Black()
busmat.emissiveColor = BABYLON.Color3.White()
bustex.hasAlpha=true;
                      
					
						var mesh=null
					
							var finOpts = options
					
						BABYLON.SceneLoader.ImportMesh("", "",mod+ "models/sign/sign.babylon", scene, function (meshes) { 
						    

								for (var i=0;i<meshes.length;i++){
							
							
							  meshes[i].material=busmat;
							  	
	                           
							   mesh=meshes[0]
							  // var offset = BABYLON.Matrix.Translation(0, 1, 0)
	                          //  mesh1.bakeTransformIntoVertices(offset)

							  
							  
							  
							 
							// mesh = BABYLON.Mesh.MergeMeshes(meshes);
							  
						}
				
			
		
			
			finOpts.onSet= function ( x, y, z) {
				
					var c=blocklook(noa)
			
			var detail="Close"//
			var j="Close"
				
				var mesh2=mesh.clone('airjelly')
				/*mesh2.position.x=x
				mesh2.position.y=y
				mesh2.position.z=z*/
				
				if(boptions[0]==undefined){
				return;
			}
				
					 for (var i=0;i<boptions[0].length;i++){
						
						 var d=boptions[0][i].pos//
						
						  if(JSON.stringify(d)==JSON.stringify([x,y,z])){//
						
							 console.log(boptions[0][i])
							  detail=boptions[0][i].data['info']
							  
							  //ccolor=boptions[0][i].data['color']
							 // console.log(ccolor)
							  
							  j=detail
							  c=boptions[0][i].angle
						
							
					
						  }
					 }
			
				noa.rendering.addMeshToScene(mesh2, false)
				
				
				mesh2.name='hitbox:sign:north:'+JSON.stringify([x,y,z])
				
				
				
				mesh2.position.x=x+bedjsony[c][j][0]//0.5
				mesh2.position.y=y+bedjsony[c][j][1]
				mesh2.position.z=z+bedjsony[c][j][2]//0.5//
				
					mesh2.rotation.x=bedjsony[c][j+'rotation'][0]
				mesh2.rotation.y=bedjsony[c][j+'rotation'][1]
				mesh2.rotation.z=bedjsony[c][j+'rotation'][2]//
				
				
				
				
				
				offmeshes.push([[x,y,z],mesh2])
				
				
			}
			
			finOpts.onLoad= function ( x, y, z) {
				
				
					var c=blocklook(noa)
			
			var detail="Close"//
			var j="Close"
				
			var mesh2=mesh.clone('airjelly')
			
			/*mesh2.position.x=x
				mesh2.position.y=y
				mesh2.position.z=z*/
				
				
				
					if(boptions[0]==undefined){
				return;
			}
				
					 for (var i=0;i<boptions[0].length;i++){
						
						 var d=boptions[0][i].pos//
						
						  if(JSON.stringify(d)==JSON.stringify([x,y,z])){//
						
							 console.log(boptions[0][i])
							  detail=boptions[0][i].data['info']
							  
							  //ccolor=boptions[0][i].data['color']
							 // console.log(ccolor)
							  
							  j=detail
							  c=boptions[0][i].angle
						
							
					
						  }
					 }
			
				noa.rendering.addMeshToScene(mesh2, false)
		
				
				mesh2.name='hitbox:sign:north:'+JSON.stringify([x,y,z])
				
				
			
	         
				
				
					mesh2.position.x=x+bedjsony[c][j][0]//0.5
				mesh2.position.y=y+bedjsony[c][j][1]
				mesh2.position.z=z+bedjsony[c][j][2]//0.5//
				
				
					 var cd=addNametag(mesh2, 'cowy',8,x+0.5,y,z+0.4)
		
		/*var font_size = 96
	var font = "bold " + font_size + "px 'lato'";
	cd.material.diffuseTexture.clear()
	cd.material.alpha = 1;
	   cd.material.diffuseTexture.hasAlpha = true;
	cd.material.opacityTexture.drawText('fudu', null, null, font, "white","transparent",true,true)*/
	
	//cd.material.diffuseTexture.drawText('fudu', null, null, font, "white","transparent")
	//cd.material.opacityTexture.hasAlpha=true
		//cd.material.opacityTexture = cd.material.diffuseTexture
	//cd.material.backFaceCulling=false
	
        	//	cd.material.diffuseTexture.update();
				
					mesh2.rotation.x=bedjsony[c][j+'rotation'][0]
				mesh2.rotation.y=bedjsony[c][j+'rotation'][1]
				mesh2.rotation.z=bedjsony[c][j+'rotation'][2]//
				
				
					
				
				
						//noa.rendering.addMeshToScene(cd, false)
				offmeshes.push([[x,y,z],mesh2])
					
				
				
			}
			finOpts.UnLoad= function ( x, y, z) {
				
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
							 
							
							 
							 
				
						 
						 
						 
						 	 
										 });
	
	
}
function makeparticle(name,mesh){
	  var particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
    particleSystem.particleTexture= new BABYLON.Texture(name, scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);
particleSystem.color1 = new BABYLON.Color4(1,1,1, 1.0);
particleSystem.color2 = new BABYLON.Color4(1,1,1, 1.0);
    // Position where the particles are emiited from
	var box=mesh
	

           particleSystem.emitter =box
	       particleSystem.minSize =0.1
           particleSystem.maxSize =0.3
		   particleSystem.blendMode =BABYLON.ParticleSystem.BLENDMODE_STANDARD;
		  var matrixangle=noa.camera.getDirection()
		   particleSystem.direction1 = new BABYLON.Vector3(-matrixangle[0],0.2,-matrixangle[2]);
		   particleSystem.direction2 = new BABYLON.Vector3(-matrixangle[0],0.3,-matrixangle[2]);
		   particleSystem.minEmitPower = 1;
            particleSystem.maxEmitPower = 2;
            particleSystem.updateSpeed = 0.020
			 particleSystem.gravity = new BABYLON.Vector3(0,1, 0);
			 
	return particleSystem;
	
}


function addNametag(mainMesh, name, height,x,y,z) {
	if(name.length>5){
		return;
	}
	var scene = noa.rendering.getScene()

	var font_size = 96
	var font = "bold " + font_size + "px 'lato'"
	
	//Set height for plane
    var planeHeight = 0.5//0.3
    
    //Set height for dynamic texture
    var DTHeight = 1.5 * font_size //or set as wished
    
    //Calcultae ratio
    var ratio = planeHeight/DTHeight
	
	//Use a temporay dynamic texture to calculate the length of the text on the dynamic texture canvas
    var temp = new BABYLON.DynamicTexture("DynamicTexture", 64, scene)
	var tmpctx = temp.getContext()
	tmpctx.font = font
    var DTWidth = tmpctx.measureText(name).width + 8
    
    //Calculate width the plane has to be 
    var planeWidth = DTWidth * ratio

    //Create dynamic texture and write the text
    var dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", {width:DTWidth, height:DTHeight}, scene, true)
    var mat = noa.rendering.makeStandardMaterial('nametag')
	mat.diffuseTexture = dynamicTexture
	mat.emissiveTexture = mat.diffuseTexture
	mat.diffuseTexture.hasAlpha = true
	mat.opacityTexture = mat.diffuseTexture
	 var textureContext = dynamicTexture.getContext(); 
   dynamicTexture.drawText(name, null, null, font, "black", "transparent", true)

    //Create plane and set dynamic texture as material
    var plane = BABYLON.MeshBuilder.CreatePlane("plane", {width:planeWidth, height:planeHeight}, scene)
    plane.material = mat

	//plane.setPositionWithLocalVector(new BABYLON.Vector3(height + 0.2, 0, 0))
	plane.position.x=x
	plane.position.y=y+0.5
	plane.position.z=z
	plane.opaque = false
	
     
	plane.setParent(mainMesh)

	noa.rendering.addMeshToScene(plane)
	//plane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL

	return plane
}