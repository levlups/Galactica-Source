
module.exports.makesky=function(scene){
	/*var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:1000}, scene);
 var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
skyboxMaterial.backFaceCulling = false;
skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(mod+"textures/skybox/skybox", scene);
//new BABYLON.CubeTexture("textures/daybox/thefog", scene);
skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
skybox.material = skyboxMaterial;

/*setInterval(function(){ 
     skyboxMaterial.reflectionTexture.vOffset -= 1/20;
     }, 100);


  return skybox;*/
	
}



module.exports.makenight=function(scene){
	/*return;
	var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:1000}, scene);
var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
skyboxMaterial.backFaceCulling = true;
skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(mod+"textures/skybox/thefog", scene);
skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
skyboxMaterial.ambientColor = new BABYLON.Color3(0, 0, 0);
skybox.material = skyboxMaterial;
  return skybox;*/
	
}

/*module.exports.makemoon=function(scene){
	var moon=BABYLON.Mesh.CreatePlane("plane", 4, scene);
 moon.material = new BABYLON.StandardMaterial('mat', scene);
 moon.material.diffuseColor= new BABYLON.Color4(1, 0, 0)
 moon.material.backFaceCulling = false;
  scene.removeMesh(moon);
	return moon;
}*/


module.exports.makefog=function(scene){
	scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
   //  scene.fogMode =             BABYLON.Scene.FOGMODE_LINEAR;
  scene.fogColor = new BABYLON.Color3(0.9, 0.9, 0.85,0.1);
    scene.fogDensity = 0;
	 //Only if LINEAR
    scene.fogStart = 50.0;
    scene.fogEnd = 60.0;
}


module.exports.makestarfield=function(noa){
	
	  var scene=noa.rendering.getScene()
 


						  var particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
						particleSystem.particleTexture= new BABYLON.Texture(mod+'textures/particle/star.png', scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);
					particleSystem.color1 = new BABYLON.Color4(1,1,1, 1.0);
					particleSystem.color2 = new BABYLON.Color4(1,1,1, 1.0);
					particleSystem.colorDead = new BABYLON.Color4(1,1,1, 1.0);

						// Position where the particles are emiited from
						var box= mainplayer._children[0]	//partmesh.clone('tot')
	
							   particleSystem.emitter =box//new BABYLON.Vector3(0, 0, 0);//box
							   particleSystem.minSize =1
							   particleSystem.maxSize =3
							   
							   
							  particleSystem.minLifeTime = 6;
  particleSystem.maxLifeTime = 12;
							   
							    particleSystem.minEmitBox = new BABYLON.Vector3(-150, 150, 150); // Starting all from
  particleSystem.maxEmitBox = new BABYLON.Vector3(150, 150, -150);
							   particleSystem.blendMode =BABYLON.ParticleSystem.BLENDMODE_STANDARD;
							  var matrixangle=noa.camera.getDirection()
							   particleSystem.direction1 = new BABYLON.Vector3(-5, 10, 0);
							   particleSystem.direction2 =  new BABYLON.Vector3(0, -20, 5);
							   
							   particleSystem.minEmitPower = 1;
								particleSystem.maxEmitPower = 3;
								particleSystem.updateSpeed = 0.020
							
								//particleSystem.manualEmitCount = 3;
								 particleSystem.gravity = new BABYLON.Vector3(0,1, 0);
								//state.music = new BABYLON.Sound("Music", "/sound/tap.wav", scene)
								
								
								 setInterval(function() {
									// if(!onrocket)
		//particleSystem.dispose()
		
			}, 500);
								 
						return particleSystem;
	
	
}


 module.exports.makemoon=function(){
	 
	 	var imageheight=192
	         var imagewidth=384
	         var pixely=1/imageheight;
	         var pixelx=1/imagewidth;
	         var num=1;
			 
			 	  var faceUV = new Array(2);


var  n=[new BABYLON.Vector4(pixelx*1,-pixely*(86+num),pixelx*(83+num),-pixely*(0)),//face
	new BABYLON.Vector4(pixelx*1,-pixely*(86+num),pixelx*(83+num),-pixely*(0))];	
	 var scene=noa.rendering.getScene()
			var opt={
				witdth:40,
				height:40
                
			}
			var supermesh = BABYLON.Mesh.CreatePlane('sprite-' + name,20, scene)
			
	
			var mat= noa.rendering.makeStandardMaterial(name)
			var tex=new BABYLON.Texture(mod+'textures/environment/moon_phases.png', scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
			mat.diffuseTexture = tex
			supermesh.material=mat
			mat.backFaceCulling=false
			mat.diffuseTexture.hasAlpha=true
			
			
			
			mat.diffuseTexture.uScale = 0.25;
						mat.diffuseTexture.vScale = 0.5;
						
				
				 
				 			setInterval(function(){ 
								 	mat.diffuseTexture.uOffset -= 1/4;
								
                                    mat.diffuseTexture.vOffset -= 1/2;
	
                              }, 2000);
			
						
			return supermesh;
			
				
	 
 }

