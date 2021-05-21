
import {makefishrod} from '../fishing'
import { makeparticle,makeparticlearrow,makedebris,makeslash } from '../particle'
var raypos=null;

var hitnum=0
var hitid=null
var sweet=null
export function fireaction(noa,socket){
	
	
	if(currentUI!==uis.hotbar){
	return;
        }


	
	const entClick = castRay();
	
	if (!!entClick){
		console.log(entClick[2]+'nabil')
		
		if(jsoninfo[entClick[2]]!==undefined){
		var c=jsoninfo[entClick[2]].particle
		
		
		
		if(jsoninfo[entClick[2]].mob){
		//makedebris(c,raypos,scene,2,0.5)
		
		makeslash('particle/slash',raypos,scene,1,1)
			makeslash('particle/slash1',raypos,scene,1,1)
			makeslash('particle/slash2',raypos,scene,1,1)
		
		}
		
		}
		//makedebris('item/'+entClick[2],raypos,scene,2,0.5)
		/*if(entClick[2]=='sign'){
		
		var c=	noa.ents.getState( entityList[entClick[0]], 'entmesh').mesh
		sweet=makedebris('item/'+entClick[2],c,scene,2,0.5)
	//sweet.start()
//cat.material.diffuseTexture = new BABYLON.Texture(mod+"textures/particle/"+numhits+".png", scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);
numhits++

if(numhits>10){
	numhits=0
}
	//cat.material.diffuseTexture.hasAlpha=true		
			
			}*/
			
		
		
		if(entClick[2]=='sign'){
			
			if(hitid==null){
				hitid=entClick[0]
			}
			
			if(hitid!==entClick[0]){
				hitnum=0
				hitid=null
			}
			
			
			
			
			hitnum++
			
			
			
			
		//	alert(entClick[0])
			///var c=JSON.stringify(entClick[0])
			
			//console.log(entClick[0])
			var dogmat = new BABYLON.StandardMaterial("face0", scene);
			var tex = new BABYLON.Texture(mod+"textures/block/oak_planks.png", scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
		//	console.log(raypos)
			dogmat.ambientTexture=tex
			
			if(sweet!==null){
				sweet.dispose()
				sweet=null
			}
			
		var c=	noa.ents.getState( entityList[entClick[0]], 'entmesh').mesh
		
		sweet=makedebris('item/'+entClick[2],c,scene,2,0.2)
	//sweet.start()
		dogmat.backFaceCulling = false;
dogmat.specularColor = BABYLON.Color3.Black()
dogmat.emissiveColor = BABYLON.Color3.White()
tex.hasAlpha=true;
			c.material=dogmat
			if(hitnum>5){
			socket.emit('despawn', entClick[0]) 
			hitnum=0
			hitid=null
			}
		}
		
		
		if(entClick[2]=='dog'){
			
		//	alert(entClick[0])
			///var c=JSON.stringify(entClick[0])
			
			//console.log(entClick[0])
			socket.emit('despawn', entClick[0]) 
		}
		
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	    var sel=noa.ents.getState(noa.playerEntity, 'inventory').selected
		var item=noa.ents.getState(noa.playerEntity, 'inventory').main[sel].id
		
		if(oncanon){
			var matrixangle=noa.camera.getDirection()
			var pos=noa.ents.getState(noa.playerEntity, 'position').position
		socket.emit('threw-item',{name:'snowball',position:pos,angle:matrixangle,force:20});
	
		
		}
		
		if(item=='snowball'){
			var matrixangle=noa.camera.getDirection()
			var pos=noa.ents.getState(noa.playerEntity, 'position').position
		socket.emit('threw-item',{name:item,position:pos,angle:matrixangle});
	
		
		}
		if(item=='plate'){
			
			if(health<10){
			health++
			}
	
		
		}
		if(item=='stone_sword'){
			var matrixangle=noa.camera.getDirection()
			
		socket.emit('threw-item',{name:item,position:pos,angle:matrixangle});
					       	
		
		}
		if(item=='bow'){
			
			console.log('bow yo')
			var matrixangle=noa.camera.getDirection()
				var pos=noa.ents.getState(noa.playerEntity, 'position').position
				
				var inv=noa.ents.getState(noa.playerEntity, 'inventory').main
				
				for(var i=0;i<Object.entries(inv).length;i++){
				
					if(inv[i].id=='arrow'&& inv[i].count>0){
		socket.emit('threw-item',{name:'arrow',position:pos,angle:matrixangle,force:40});
					}
				}
					       	
		
		}
		
		
	
}




function castRay() {
	
		let ray = scene.createPickingRay(
			window.innerWidth / 2,
			window.innerHeight / 2,
			BABYLON.Matrix.Identity(),
			noa.rendering.getScene().activeCameras[0]
		);

		const hit = scene.pickWithRay(
			ray,
			(mesh) => {
				
				return mesh.name.startsWith('hitbox:');
			},
			true
		);

		if (hit.pickedMesh) {
			
			var str=hit.pickedMesh.name.split(':');
			
			raypos=hit.pickedMesh
			
			//console.log(hit.pickedMesh.name.substring(7))
			//return [hit.pickedMesh.name.substring(7), hit.distance];
			//console.log('lol')
			//console.log('yo   '+str[2])
		return [str[2], hit.distance,str[1]];
		} else return null;
	}