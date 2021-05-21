var models = {}

var noa
var meshbody=null
var scene=null
var modelname='cow'
export function defineModelCompCanon(noa2) {
	noa = noa2
scene=noa.rendering.getScene()
	
	
		
		var bustex = new BABYLON.Texture(mod+"models/canon/canon.png", scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);

var busmat = new BABYLON.StandardMaterial("face0", scene);
busmat.diffuseTexture=bustex;
busmat.backFaceCulling = false;
busmat.specularColor = BABYLON.Color3.Black()
busmat.emissiveColor = BABYLON.Color3.White()
bustex.hasAlpha=true;

BABYLON.SceneLoader.ImportMesh("", "", mod+"models/canon/canon.babylon", scene, function (meshes) { 
 var mainplayer= new BABYLON.Mesh("dummy", scene);//

for (var i=0;i<meshes.length;i++){
	
	
	  meshes[i].material=busmat;
	  meshes[i].parent=mainplayer;
	 
	  noa.rendering.addMeshToScene(mainplayer, false, [0,0,0])
				 noa.rendering.addMeshToScene(mainplayer, false, [0,0,0])
	
	 
	 
 }

 meshbody= mainplayer;
 
 
 
 
 });
}

export function wath(){
	
	return meshbody;
}

export  function applyModelCanon(eid, model, texture, offset, nametag, name, hitbox,randomizer,rando,entityList,uuid,socket,PF) {

		var builded = meshbody.clone(name)//
	
		// noa.rendering.removeMeshToScene(builded, false)
		

		noa.ents.addComponent(eid, 'model', builded)
		
		var hitboxMesh = new BABYLON.MeshBuilder.CreateBox('hitbox:'+name+':'+uuid, {
				height: 0.5,
				width: 0.5,
				depth: 1.5,
			}, scene)


			hitboxMesh.setParent(builded)
			hitboxMesh.setPositionWithLocalVector(new BABYLON.Vector3(0, 1 / 2, 0) )
			hitboxMesh.material = noa.rendering.makeStandardMaterial()
			hitboxMesh.material.wireframe = true
            hitboxMesh.isVisible=true;
			
			
             noa.rendering.addMeshToScene(hitboxMesh, false)

		
		
			
		
		
		
		
		
	/*noa.entities.addComponent(eid, noa.entities.names.boatmesh, {
			mesh: builded,
			offset: offset,
			health: 5,
			npcList:entityList,
			mob:true,
			thisSocket:socket
		})*/
		
		noa.entities.addComponent(eid, noa.entities.names.entmesh, {
			mesh: builded,
			offset: offset,
			health: 5,
			npcList:entityList,
			mob:true,
			thisSocket:socket
		})
		
		
		/*var c=addNametag(builded, 'cowy',2)
		console.log(c)
		console.log(c.material.diffuseTexture)
		var font_size = 96
	var font = "bold " + font_size + "px 'lato'";
	c.material.diffuseTexture.clear()
	c.material.diffuseTexture.drawText('fudu', null, null, font, "#eeeeee", "#00000066", true)
	
	 var img = new Image();
	img.src = 'textures/block/sand.png';
	c.material.diffuseTexture.clear()
	img.onload = function() {
	c.material.diffuseTexture._context.drawImage(img,0,0,64,64)
	c.material.diffuseTexture.drawText('  fudu', null, null, font, "#eeeeee", "#00000066", true)
	c.material.diffuseTexture.update()
	}*/
	
		 noa.entities.addComponent(eid, noa.entities.names.stats,{
				mesh: builded,
				mob:true,
				walking:'boat',
				name: 'boat',
				health:5
			})
		
		
		

}





function addNametag(mainMesh, name, height) {
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
    var dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", {width:DTWidth, height:DTHeight}, scene, false)
    var mat = noa.rendering.makeStandardMaterial('nametag')
	mat.diffuseTexture = dynamicTexture
	mat.emissiveTexture = mat.diffuseTexture
	mat.diffuseTexture.hasAlpha = true
	mat.opacityTexture = mat.diffuseTexture
    dynamicTexture.drawText(name, null, null, font, "#eeeeee", "#00000066", true)
    
    //Create plane and set dynamic texture as material
    var plane = BABYLON.MeshBuilder.CreatePlane("plane", {width:planeWidth, height:planeHeight}, scene)
    plane.material = mat

	//plane.setPositionWithLocalVector(new BABYLON.Vector3(height + 0.2, 0, 0))
	plane.position.x=mainMesh.position.x
	plane.position.y=mainMesh.position.y+3
	plane.position.z=mainMesh.position.z
	plane.opaque = false
	

	plane.setParent(mainMesh)

	noa.rendering.addMeshToScene(plane)
	plane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL

	return plane
}