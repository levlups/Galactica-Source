var models = {}

var noa
var meshbody=null
var scene=null
var modelname='firework'
export function defineModelCompFirework(noa2) {


 meshbody= projectiles['fireworks']//mainplayer;
 
 
}

export function wath(){
	
	return meshbody;
}

export  function applyModelFirework(eid, model, texture, offset, nametag, name, hitbox,randomizer,rando,entityList,uuid,socket,PF,noa,pos) {
var builded=meshbody.clone(name)
		 var cid = noa.entities.addent( [pos[0],pos[1]+0.5,pos[2]], 0.5, 0.5, builded, [0.2,0.5/2,0.2], true, false,false,null )
		//noa.ents.getState(eid, 'model').nametag=addNametag(builded, 'horse', 1.5)
 noa.entities.addComponent(cid, noa.entities.names.propulsion,{
	 mesh:builded
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