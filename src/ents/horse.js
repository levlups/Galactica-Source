var models = {}

var noa
var meshbody=null
var scene=null
var modelname='horse'
export function defineModelCompHorse(noa2) {
	noa = noa2
scene=noa.rendering.getScene()
	/*noa.ents.createComponent({
		name: 'model',
		state: {models:{}}
	})*/
	
	
		//var bustex = new BABYLON.Texture("./models/"+modelname+"/"+modelname+".png", scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);
		var bustex = new BABYLON.Texture(mod+"models/horse/horse.png", scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);

var busmat = new BABYLON.StandardMaterial("face0", scene);
busmat.diffuseTexture=bustex;
busmat.backFaceCulling = false;
busmat.specularColor = BABYLON.Color3.Black()
busmat.emissiveColor = BABYLON.Color3.White()
bustex.hasAlpha=true;

//BABYLON.SceneLoader.ImportMesh("", "", "./models/cow/cow.babylon", scene, function (meshes) { 
BABYLON.SceneLoader.ImportMesh("", "", mod+"models/horse/horse.babylon", scene, function (meshes) { 
 var mainplayer= new BABYLON.Mesh("dummy", scene);//

for (var i=0;i<meshes.length;i++){
	
	
	  meshes[i].material=busmat;
	  meshes[i].parent=mainplayer;
	 
	 
	
	 
	 
 }

 meshbody= mainplayer;
 
 });
}

export function wath(){
	
	return meshbody;
}

export  function applyModelHorse(eid, model, texture, offset, nametag, name, hitbox,randomizer,rando,entityList,uuid,socket,PF,age) {

		var builded = meshbody.clone('human')//
	
	var bustex = new BABYLON.Texture(mod+"models/"+texture+".png", scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);

var busmat = new BABYLON.StandardMaterial("face0", scene);
busmat.diffuseTexture=bustex
busmat.specularColor = BABYLON.Color3.Black()
busmat.emissiveColor = BABYLON.Color3.White()
bustex.hasAlpha=true;

	builded.material=busmat
builded._children[0].material=busmat
builded._children[1].material=busmat
builded._children[2].material=busmat
builded._children[3].material=busmat
builded._children[4].material=busmat
builded._children[5].material=busmat

if(age=='baby'){
builded.scaling.y=0.5
builded.scaling.x=0.5
builded.scaling.z=0.5

builded._children[0].scaling.z=1.2
builded._children[0].scaling.y=1.2
builded._children[0].scaling.x=1.2
}

	// noa.rendering.removeMeshToScene(builded, false)
		noa.soundy('./random/breath.ogg')

		noa.ents.addComponent(eid, 'model', builded)
		
		var hitboxMesh = new BABYLON.MeshBuilder.CreateBox('hitbox:horse:'+uuid, {
				height: 1.5*0.5,
				width: 0.8*0.5,
				depth: 1*0.5,
			}, scene)


			hitboxMesh.setParent(builded)
			hitboxMesh.setPositionWithLocalVector(new BABYLON.Vector3(0, (1*0.5) / 2, 0) )
			hitboxMesh.material = noa.rendering.makeStandardMaterial()
			hitboxMesh.material.wireframe = true
            hitboxMesh.isVisible=true;
             noa.rendering.addMeshToScene(hitboxMesh, false)

		
		
			
		
		
		
		
		
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
	
	
	

	
	
	
		
			
		
		 if(flagbearer==true){
			 
									
								 noa.entities.addComponent(eid, noa.entities.names.physics)
							
							var body = noa.ents.getPhysicsBody(eid)
							
							body.autoStep=false;
							//body.friction = 0.;
							//body.gravityMultiplier = 1;
								 
								 
								 
							noa.entities.addComponent(eid, noa.entities.names.entAI,{
								mesh:builded,
								npcList:entityList,
								path:PF,
								name:'dog'
								
							})		
							
							
		
							
							  var onCollideEnto = function(ownID, otherID) {
								  
    collideEntityo(noa, ownID, otherID)
  }
	 noa.entities.addComponent(eid, noa.entities.names.collideEntities, {
    callback: onCollideEnto
  })
		function collideEntityo(noa, ownID, otherID){
	      if(ownID==noa.playerEntity){
		  socket.emit('hitentity', {id: mainplayerdat,strength:[0,3,0]}) 
		  health-=1
	//if(body.resting[1]==-1){
	 	//var  body2 = noa.ents.getPhysicsBody(ownID)
		
		//body.applyImpulse([-body.velocity[0],1,-body.velocity[2]])
		//var playerp=noa.ents.getState(noa.playerEntity, noa.entities.names.position).position
		//var cp=noa.ents.getState(eid, noa.entities.names.position).position
	
		//body.applyImpulse([(cp[0]-playerp[0])*1.4,0.3,(cp[2]-playerp[2])*1.4])//
		//body2.applyImpulse([0,1,0])
		//health-=0.05
    // }
	 //  body.applyImpulse([0,7,0]);
	   /*noa.ents.getState(ownID, 'entmesh').health-=2*/
	  }
		}
		
		 }
		 
		
	
							 noa.entities.addComponent(eid, noa.entities.names.stats,{
				mesh: builded,
				mob:true,
				walking:false,
				health:5,
				name:'dog',
				rideable:true
			})
	

		//noa.ents.getState(eid, 'model').nametag=addNametag(builded, 'horse', 1.5)

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