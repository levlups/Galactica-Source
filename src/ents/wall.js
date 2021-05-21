var models = {}

var noa
var meshbody=null
var scene=null
var modelname='cow'
export function defineModelCompWall(noa2) {
	noa = noa2
scene=noa.rendering.getScene()
	
	
		
		var bustex = new BABYLON.Texture(mod+"models/wall/wall.png", scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);

var busmat = new BABYLON.StandardMaterial("face0", scene);
busmat.diffuseTexture=bustex;
busmat.backFaceCulling = false;
busmat.specularColor = BABYLON.Color3.Black()
busmat.emissiveColor = BABYLON.Color3.White()
bustex.hasAlpha=true;

BABYLON.SceneLoader.ImportMesh("", "", mod+"models/wall/wall.babylon", scene, function (meshes) { 
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



export  function applyModelWall(eid, model, texture, offset, nametag, name, hitbox,randomizer,rando,entityList,uuid,socket,PF) {

		var builded = meshbody.clone('boat')//
builded._children[0].name="hitbox:door:"+uuid
builded._children[1].name="hitbox:door:"+uuid
builded._children[2].name="hitbox:door:"+uuid
builded._children[3].name="hitbox:door:"+uuid
		noa.ents.addComponent(eid, 'model', builded)
	

		
		noa.entities.addComponent(eid, noa.entities.names.entmesh, {
			mesh: builded,
			offset: offset,
			health: 5,
			npcList:entityList,
			mob:true,
			thisSocket:socket
		})
		
	
		 noa.entities.addComponent(eid, noa.entities.names.stats,{
				mesh: builded,
				mob:true,
				walking:'boat',
				name: 'boat',
				health:5
			})
	
		
		

}


