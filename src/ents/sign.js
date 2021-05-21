
import { blocklook } from '../look'
var models = {}

var noa
var meshbody=null
var scene=null
var name='sign'

export function defineModelCompSign(noa2) {
		noa = noa2
scene=noa.rendering.getScene()
	/*noa.ents.createComponent({
		name: 'model',
		state: {models:{}}
	})*/
	
	
		//var bustex = new BABYLON.Texture("./models/"+modelname+"/"+modelname+".png", scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);
		var dogtex = new BABYLON.Texture(mod+"models/"+name+"/"+name+".png", scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);

var dogmat = new BABYLON.StandardMaterial("face0", scene);
dogmat.diffuseTexture=dogtex;
dogmat.backFaceCulling = false;
dogmat.specularColor = BABYLON.Color3.Black()
dogmat.emissiveColor = BABYLON.Color3.White()
dogtex.hasAlpha=true;

//BABYLON.SceneLoader.ImportMesh("", "", "./models/cow/cow.babylon", scene, function (meshes) { 
BABYLON.SceneLoader.ImportMesh("", "", mod+"models/"+name+"/"+name+".babylon", scene, function (meshes) { 
 

for (var i=0;i<meshes.length;i++){
	
	
	  meshes[i].material=dogmat;
	 // meshes[i].parent=mainplayer;
	 
	 
	
	 
	 
 }

 meshbody= meshes[0]
 
 });
}


export  function applyModelSign(eid, model, texture, offseta, nametag, name, hitbox,entityList,uuid,socket,chest,datrotation) {
	
	
             var builded=  meshbody.clone('human')
			
			//builded.position.y+=1
				

			noa.ents.addComponent(eid, 'model', builded)
            noa.ents.removeComponent(eid, 'shadow')
			var hitboxMesh = new BABYLON.MeshBuilder.CreateBox('hitbox:sign:'+uuid, {
				height: hitbox[1]/2,
				width: hitbox[0],
				depth: hitbox[2],
			}, scene)


			hitboxMesh.setParent(builded)
			hitboxMesh.setPositionWithLocalVector(new BABYLON.Vector3(0, hitbox[1] / 4, 0) )
			hitboxMesh.material = noa.rendering.makeStandardMaterial()
			hitboxMesh.material.wireframe = true
            hitboxMesh.isVisible=false;

			noa.rendering.addMeshToScene(hitboxMesh, false)

			noa.entities.addComponent(eid, noa.entities.names.entmesh, {
				mesh: builded,
				offset: [0,0,0],//offset,
				health: 5,
				npcList:entityList,
				mob:false,
				thisSocket:socket
				
			})
			 var cd=addNametag(builded, 'cowy',8,builded.position.x,builded.position.y,builded.position.z+0.025)
			 cd.material.backFaceCulling=false
		    
			
			   if(datrotation!==undefined){
				   
				   builded.rotation.y=datrotation
			   }else{
		
                var c=blocklook(noa)
				builded.rotation.y=jsoninfo['sign'][c]['Closerotation'][1]
				
			   }
				
				/*builded.position.x+=jsoninfo['sign'][c]['Closeposition'][0]
				builded.position.y+=jsoninfo['sign'][c]['Closeposition'][1]
				builded.position.z+=jsoninfo['sign'][c]['Closeposition'][2]*/
				
				
				noa.entities.addComponent(eid, noa.entities.names.sign, {
				signmesh: cd
				
			})
			
			builded.position._x+=0.5
				builded.position._y+=3
				builded.position._z+=0.5
			
		
		
								
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
	
     plane.rotation.y=Math.PI
	plane.setParent(mainMesh)

	noa.rendering.addMeshToScene(plane)
	//plane.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL

	return plane
}







