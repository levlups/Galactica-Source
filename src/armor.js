module.exports.addhat=function(name ,mainp){
	
name='coolhat'
	if(name=='none'){
		if(hat!==null){
			hat.dispose()
			hat=null;
			
			hat2.dispose()
			hat2=null;
		
			return;
		}
	 return;
	}
	
	
	var bustex = new BABYLON.Texture(mod+"models/"+name+"/"+name+".png", scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);

var busmat = new BABYLON.StandardMaterial("face0", scene);
busmat.diffuseTexture=bustex;
busmat.backFaceCulling = false;
busmat.specularColor = BABYLON.Color3.Black()
busmat.emissiveColor = BABYLON.Color3.White()
bustex.hasAlpha=true;

//mainplayer=assemblebody(scene,'girl');
  BABYLON.SceneLoader.ImportMesh(null,mod+"models/"+name+"/", name+".babylon", scene, function (meshes) {
            
			for (var i=0;i<meshes.length;i++){
	
	hat= meshes[0]
	 hat.material=busmat;
	  hat.parent=mainp._children[0];
	  
	  noa.rendering.addMeshToScene(hat, false)
	 
	 hat2=hat.clone('hat')
	 hat2.parent=screenclone._children[0];
	 hat2.layerMask=screenclone._children[0].layerMask;
	 noa.rendering.addMeshToScene(hat2, false)
 }
 
		hat.position.y+=0.4
		hat.scaling.x=1.1
		hat.scaling.z=1.1
		
		
		hat2.position.y+=0.4
		hat2.scaling.x=1.1
		hat2.scaling.z=1.1
	
	})
	
	
}

module.exports.addbackpack=function(name ,mainp){
	
name='backpack'
	if(name=='none'){
		if(hat!==null){
			hat.dispose()
			hat=null;
			
			hat2.dispose()
			hat2=null;
		
			return;
		}
	 return;
	}
	
	
	var bustex = new BABYLON.Texture(mod+"models/"+name+"/"+name+".png", scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);

var busmat = new BABYLON.StandardMaterial("face0", scene);
busmat.diffuseTexture=bustex;
busmat.backFaceCulling = false;
busmat.specularColor = BABYLON.Color3.Black()
busmat.emissiveColor = BABYLON.Color3.White()
bustex.hasAlpha=true;

//mainplayer=assemblebody(scene,'girl');
  BABYLON.SceneLoader.ImportMesh(null,mod+"models/"+name+"/", name+".babylon", scene, function (meshes) {
            
			for (var i=0;i<meshes.length;i++){
	
	hat= meshes[0]
	 hat.material=busmat;
	  hat.parent=mainp._children[5];
	  
	  noa.rendering.addMeshToScene(hat, false)
	 
	 hat2=hat.clone('hat')
	 hat2.parent=screenclone._children[5];
	 hat2.layerMask=screenclone._children[0].layerMask;
	 noa.rendering.addMeshToScene(hat2, false)
 }
 
		hat.position.y-=0.5
		hat.position.z-=0.1
		hat.scaling.x=1.1
		hat.scaling.y=1.1
		hat.scaling.z=1.1
	
	})
	
	
}

module.exports.addshield=function(name ,mainp){
	
name='shield'
	if(name=='none'){
		if(hat!==null){
			hat.dispose()
			hat=null;
			
			hat2.dispose()
			hat2=null;
		
			return;
		}
	 return;
	}
	
	
	var bustex = new BABYLON.Texture(mod+"models/"+name+"/"+name+".png", scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);

var busmat = new BABYLON.StandardMaterial("face0", scene);
busmat.diffuseTexture=bustex;
busmat.backFaceCulling = false;
busmat.specularColor = BABYLON.Color3.Black()
busmat.emissiveColor = BABYLON.Color3.White()
bustex.hasAlpha=true;

//mainplayer=assemblebody(scene,'girl');
  BABYLON.SceneLoader.ImportMesh(null,mod+"models/"+name+"/", name+".babylon", scene, function (meshes) {
            
			for (var i=0;i<meshes.length;i++){
	
	hat= meshes[0]
	 hat.material=busmat;
	  hat.parent=mainp._children[5];
	  
	  noa.rendering.addMeshToScene(hat, false)
	 
	 hat2=hat.clone('hat')
	 hat2.parent=screenclone._children[5];
	 hat2.layerMask=screenclone._children[0].layerMask;
	 noa.rendering.addMeshToScene(hat2, false)
 }
 
		hat.position.y-=1
		hat.position.z-=0.2
		
	
	})
	
	
}

module.exports.addcape=function(name,mainp){
		
			
	if(name=='none'){
	
		
		
		cape.dispose()
		cape=null;
	
		return;
	
	}
		
		console.log('add cape dude')
		cape = BABYLON.MeshBuilder.CreatePlane('cape', {width: 0.6, height: 1, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
				cape.parent=mainp
				
				var capemat = new BABYLON.StandardMaterial("face0", scene);
					var pop = new BABYLON.Texture(mod+"textures/block/pumpkin_side.png", scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);
					capemat.backFaceCulling=false
capemat.diffuseTexture=pop;
capemat.emissiveColor = BABYLON.Color3.White()
capemat.specularColor = BABYLON.Color3.Black()
cape.material=capemat

noa.rendering.addMeshToScene(cape, false,mainp.position)
					  cape.rotation.x=Math.PI/18
					 
					  cape.position.z-=0.2
					 cape.position.y+=1
					 
					 
		
	}
	
	
	
module.exports.addboots=function(name, mainp){
		
		if(boot!==null){
			boot.dispose()
			boot=null
			return;
		}
		
		boot = BABYLON.MeshBuilder.CreateBox('cape', {width: 0.3, height: 0.5,depth:0.3}, scene);
		
				
				var capemat = new BABYLON.StandardMaterial("face0", scene);
					var pop = new BABYLON.Texture(mod+"textures/block/pumpkin_side.png", scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);
					capemat.backFaceCulling=false
capemat.diffuseTexture=pop;
capemat.emissiveColor = BABYLON.Color3.White()
capemat.specularColor = BABYLON.Color3.Black()
boot.material=capemat

let boot2=boot.clone('boot')
				boot.parent=mainplayer._children[3]
				boot2.parent=mainplayer._children[4]
				
				boot.position.y-=0.5
				boot2.position.y-=0.5

noa.rendering.addMeshToScene(boot, false,mainplayer.position)
					  noa.rendering.addMeshToScene(boot2, false,mainplayer.position)
		
	}
