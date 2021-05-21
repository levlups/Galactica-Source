

var models = {}

var noa
var meshbody=null
var scene=null

global.busmat=null

var name='birdbot';
export function defineModelCompBirdbot(noa2) {
	console.log('wow')
	noa = noa2
scene=noa.rendering.getScene()
	/*noa.ents.createComponent({
		name: 'model',
		state: {models:{}}
	})*/

	
		var bustexi = new BABYLON.Texture(mod+"models/"+name+"/"+name+".png", scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);

var busmati = new BABYLON.StandardMaterial("face0", scene);
busmati.diffuseTexture=bustexi;
busmati.backFaceCulling = false;
busmati.specularColor = BABYLON.Color3.Black()
busmati.emissiveColor = BABYLON.Color3.White()
bustexi.hasAlpha=true;

BABYLON.SceneLoader.ImportMesh("", "", mod+"models/"+name+"/"+name+".babylon", scene, function (meshes) { 

 var rootzom= new BABYLON.Mesh("dummy", scene);//

for (var i=0;i<meshes.length;i++){
	
	console.log(meshes[i].name)
	  meshes[i].material=busmati;
	  meshes[i].parent=rootzom;
	 
	
	 
	 
 }
 meshbody= rootzom;

 // makepet()
 });
 //meshbody= mainplayer;
  //meshbody=  makepet()
}



export  function applyModelBirdbot(eid, model, texture, offseta, nametag, name, hitbox,entityList,uuid,socket) {
	

             var builded=  meshbody.clone(name)
		
				

			noa.ents.addComponent(eid, 'model', builded)
			
			
	

			var hitboxMesh = new BABYLON.MeshBuilder.CreateBox('hitbox:'+name+':'+uuid, {
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
				offset: [0,0,0],//offset,
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
							
							body.onStep=function bodyOnStep(impulse){
	  
	  body.applyImpulse([0,6,0])//
  }
  
  
							/*noa.ents.addComponent(eid,noa.entities.names.aggressive,{
								npcList:entityList,
								thisSocket:socket,
								name:'madbot'
							})*/
							
							/*noa.ents.addComponent(eid,noa.entities.names.archer,{
								npcList:entityList,
								thisSocket:socket,
								name:'zombie',
								bow:c
							})*/
							
							/*noa.ents.addComponent(eid,noa.entities.names.flee,{
								npcList:entityList,
								thisSocket:socket,
								name:'zombie'
							})*/
							
							
							noa.entities.addComponent(eid, noa.entities.names.entAI,{
								mesh:builded,
								npcList:entityList,
								name:'birdbot'
								//path:PF
								
							})	
							
								}
			noa.entities.addComponent(eid, noa.entities.names.stats,{
				tag:uuid,
				mesh: builded,
				mob:true,
				walking:'birdbot',
				name:'birdbot',
				thisSocket:socket
			})
			
noa.entities.addComponent(eid, noa.entities.names.collideEntities, {
    callback: ouch
  })
    
	function ouch(ownID){
	
	
	if(body.resting[1]==-1){
		 	var  body2 = noa.ents.getPhysicsBody(ownID)
		
		//body.applyImpulse([-body.velocity[0],1,-body.velocity[2]])
		var playerp=noa.ents.getState(noa.playerEntity, noa.entities.names.position).position
		var cp=noa.ents.getState(eid, noa.entities.names.position).position
	
		body.applyImpulse([(cp[0]-playerp[0])*1.4,0.3,(cp[2]-playerp[2])*1.4])//
	}
		
		//}
	}
		
		var invData={"0":{id:"stone",count:200,data:{}},
            "1":{id:"snow",count:24,data:{}}};
			
			noa.ents.addComponent(eid, 'inventory', {main: invData})
			//
	/*if (invData !== undefined) {
		
		
	noa.ents.addComponent(eid, 'inventory').main=invData
	}/*else {
		var invspace = {}
		for (var x = 0; x < 36; x++) {
			invspace[x] = {}
		}
		
		
		
		noa.ents.addComponent(eid, 'inventory', {main: invspace})

	}*/
	

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