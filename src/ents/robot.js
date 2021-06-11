

var models = {}

var noa
var meshbody=null
var scene=null

global.busmat=null
export function defineModelCompRobot(noa2) {
	noa = noa2

 scene=noa.rendering.getScene()
	/*noa.ents.createComponent({
		name: 'model',
		state: {models:{}}
	})*/
	
	
		var bustex = new BABYLON.Texture(mod+"models/robot/robot.png", scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);

busmat = new BABYLON.StandardMaterial("face0", scene);
busmat.diffuseTexture=bustex;
busmat.backFaceCulling = false;
busmat.specularColor = BABYLON.Color3.Black()
busmat.emissiveColor = BABYLON.Color3.White()
bustex.hasAlpha=true;

BABYLON.SceneLoader.ImportMesh("", "", mod+"models/robot/robot.babylon", scene, function (meshes) { 

 var robotroot= new BABYLON.Mesh("dummy", scene);//
 

for (var i=0;i<meshes.length;i++){
	
	//console.log(meshes[i].name)
	  meshes[i].material=busmat;
	  meshes[i].parent=robotroot;
	 
	
	 
	 
 }
 meshbody= robotroot;
 robotroot.rotation.y=Math.PI/2
 //console.log(meshbody)
 // makepet()
 });
 //meshbody= mainplayer;
  //meshbody=  makepet()
}


export  function applyModelRobot(eid, model, texture, offseta, nametag, name, hitbox,entityList,uuid,socket) {
	
	
             var builded=  meshbody.clone('human')
			
			builded.position.y+=1
				

			noa.ents.addComponent(eid, 'model', builded)

			var hitboxMesh = new BABYLON.MeshBuilder.CreateBox('hitbox:robot:'+uuid, {
				height: hitbox[1],
				width: hitbox[0],
				depth: hitbox[2],
			}, scene)


			hitboxMesh.setParent(builded)
			hitboxMesh.setPositionWithLocalVector(new BABYLON.Vector3(0, hitbox[1] / 2, 0) )
			hitboxMesh.material = noa.rendering.makeStandardMaterial()
			hitboxMesh.material.wireframe = true
            hitboxMesh.isVisible=false;

			noa.rendering.addMeshToScene(hitboxMesh, false)

			noa.entities.addComponent(eid, noa.entities.names.entmesh, {
				mesh: builded,
				offset: [0,0.5,0],//offset,
				health: 5,
				npcList:entityList,
				mob:true,
				thisSocket:socket
			})
			
		
			var body=null

				
								if(flagbearer==true){
									
									 noa.entities.addComponent(eid, noa.entities.names.physics)
							
							 body = noa.ents.getPhysicsBody(eid)
							body.autoStep=true;	
							/*noa.ents.addComponent(eid,noa.entities.names.aggressive,{
								npcList:entityList,
								thisSocket:socket,
								name:'zombie'
							})
							*/
							/*noa.ents.addComponent(eid,noa.entities.names.flee,{
								npcList:entityList,
								thisSocket:socket,
								name:'zombie'
							})*/
							
							
							noa.entities.addComponent(eid, noa.entities.names.entAI,{
								mesh:builded,
								npcList:entityList,
								name:'robot',
								stopaction:'robotstop'//
								//path:PF
								
							})	
							
								}
			noa.entities.addComponent(eid, noa.entities.names.stats,{
				tag:uuid,
				mesh: builded,
				mob:true,
				walking:'robot',
				name:'robot',
				thisSocket:socket
			})
			
noa.entities.addComponent(eid, noa.entities.names.collideEntities, {
    callback: ouch
  })
    
	function ouch(ownID){
	
	
		//if(body.resting[1]==-1){
			//console.log('wow fool')
			var  body2 = noa.ents.getPhysicsBody(ownID)
		//body.applyImpulse([-body.velocity[0],1,-body.velocity[2]])
		
		body.applyImpulse([body2.velocity[0]/2,0.1,body2.velocity[2]/2])
		/*body.velocity[0]=body2.velocity[0]*3
		body.velocity[1]=1
		body.velocity[2]=body2.velocity[2]*3*/
		
		
		//}
	}
		
		
			//
	
	

}







function addNametag(mainMesh, name, height) {
	var scene = noa.rendering.getScene()

	var font_size = 96
	var font = "bold " + font_size + "px 'lato'"
	
	//Set height for plane
    var planeHeight = 0.3
    
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

	plane.setPositionWithLocalVector(new BABYLON.Vector3(0, height + 0.2, 0))
	plane.opaque = false

	plane.setParent(mainMesh)
	noa.rendering.addMeshToScene(plane)

	return plane
}