

var models = {}

var noa
var meshbody=null
var scene=null
var name='chest'

export function defineModelCompChest(noa2) {
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
 var mainplayer= new BABYLON.Mesh("dummy", scene);//

for (var i=0;i<meshes.length;i++){
	
	
	  meshes[i].material=dogmat;
	  meshes[i].parent=mainplayer;
	 
	 
	
	 
	 
 }

 meshbody= mainplayer;
 
 });
}


export  function applyModelChest(eid, model, texture, offseta, nametag, name, hitbox,entityList,uuid,socket,chest) {
	
	
             var builded=  meshbody.clone('human')
			
			//builded.position.y+=1
				

			noa.ents.addComponent(eid, 'model', builded)

			var hitboxMesh = new BABYLON.MeshBuilder.CreateBox('hitbox:chest:'+uuid, {
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
				mob:false,
				thisSocket:socket
			})
			
		console.log(JSON.stringify(chest))
			var body=null

				builded.rotation.y=-(noa.ents.getState(noa.playerEntity, 'mesh').mesh.rotation.y)
								/*if(flagbearer==true){
									
									 noa.entities.addComponent(eid, noa.entities.names.physics)
							
							 body = noa.ents.getPhysicsBody(eid)
							body.autoStep=true;	
							
							
							
							noa.entities.addComponent(eid, noa.entities.names.entAI,{
								mesh:builded,
								npcList:entityList,
								name:'dog'
								//path:PF
								
							})	
							
								}*/
								
								var invData={}
								if(JSON.stringify(chest)!=="{}"){
									console.log('bingoooooo')
									invData=chest
								}else{
									invData={
										       /*  "0":{},
                                                 "1":{},
												 "2":{},
												 "3":{},
												 "4":{},
												 "5":{},
												  "6":{},
												   "7":{},
												    "8":{},
													 "9":{id:"grass",count:24,data:{}},
													  "10":{id:"snow",count:24,data:{}},
													   "11":{id:"leash",count:24,data:{}},
													    "12":{},
														"13":{id:"sand",count:24,data:{}},
														"14":{id:"snow",count:24,data:{}},
									                     "15":{id:"snow",count:24,data:{}},
														  "16":{id:"snow",count:24,data:{}},
									                      "17":{id:"snow",count:24,data:{}}};*/
														  
														   "0":{},//
                                                 "1":{},
												 "2":{},
												 "3":{},
												 "4":{},
												 "5":{},
												  "6":{},
												   "7":{},
												    "8":{},
													 "9":{},
													  "10":{},
													   "11":{},
													    "12":{},
														"13":{},
														"14":{},
									                     "15":{},
														  "16":{},
								"17":{}};
														  
											 			  
														  
								}
														
												 
												 
												 
												
			
			noa.ents.addComponent(eid, 'mobinventory', {main: invData,chest:true})
								
								
								
								
								
	

}







