
import {fudu,yo} from '../mesher'
import {wath} from '../model'
import { letsrock,poof} from '../player'
import { makeparticle } from '../particle'

var done=false;
var itemheld=null;
var cycle=0;
var superhand=null;
var hand=null; 
var handMaterial=null;

var matdone=false

var itemname=null
export function setupHand(noa) {
	return;
	makehand()
	function makehand(){
	var scene = noa.rendering.getScene()
	var eid = noa.playerEntity
	/* hand = BABYLON.MeshBuilder.CreateBox("hand", {size:0.08, wrap: true}, scene)
	 handMaterial = new BABYLON.StandardMaterial("hand", scene)
	hand.material = handMaterial
	hand.parent = noa.rendering.getScene().activeCamera
	hand.rotation.y = -Math.PI/8
	
	hand.rotation.x = -Math.PI/8
	
	
	
	
	
	noa.rendering.addMeshToScene(hand, false)
	hand.position = new BABYLON.Vector3(0.08, -0.08, 2)*/
	
	/*var animationBox = new BABYLON.Animation("movement", "position.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
		BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE)

	var keys = [];
	keys.push({
		frame: 0,
		value: 0.08
	});

	keys.push({
		frame: 20,
		value: 0.085
	})

	keys.push({
		frame: 40,
		value: 0.08
	})

	keys.push({
		frame: 60,
		value: 0.075
	})

	keys.push({
		frame: 80,
		value: 0.08
	})

	animationBox.setKeys(keys)

	hand.animations.push(animationBox)
	scene.beginAnimation(hand, 0, 100, true)*/
	}

	noa.on('tick', function() { //Updates Player's hand
	return;
	if(noa.camera.zoomDistance>0){
		if(itemheld!==null){
				itemheld.dispose()
			}
			if(superhand!==null){
				superhand.dispose()
			}
			if(hand!==null){
				hand.dispose()
				hand=null
			}
	}
	
	if(noa.camera.zoomDistance==0){
		
		if(hand==null){
			makehand()
			console.log('super hand')
		}
		var inventory = noa.ents.getState(1, 'inventory')
		var inv =  inventory.main
		var sel = inventory.selected
		var url = new Array(3)
		var preUrl = new Array(3)
		
		 if (items[inv[sel].id]==undefined){
			 
			 return;
		 }
//console.log(items[inv[sel].id].type)
         if (items[inv[sel].id].type == 'block-flat') {
			 
			 //if (items[inv[sel].id].type == 'item') {
				 //console.log(items[inv[sel].id].name)
			 if(itemname!==items[inv[sel].id].name){
				itemname=items[inv[sel].id].name
				console.log('yes go')
				matdone=false
			}
			 
			if(!matdone){
				if(hand!==null){
				hand.dispose()
				}
				hand=projectiles[items[inv[sel].id].name].clone(itemname)
				noa.rendering.addMeshToScene(hand._children[0], false)
				noa.rendering.addMeshToScene(hand._children[1], false)
				console.log(hand)
				/*hand=projectiles[items[inv[sel].id].name]//fudu(scene,items[inv[sel].id])//makeBigMesh(noa, scene, blocks[blockIDs[inv[sel].id]].texture, 'stooge')//*/
				hand.parent = noa.rendering.getScene().activeCamera
				hand.rotation.y = -Math.PI/8
	
	hand.rotation.x = -Math.PI/8
	
	
	
	
	
	noa.rendering.addMeshToScene(hand, false)
	hand.position = new BABYLON.Vector3(0.08, -0.08, 4)
	console.log(items[inv[sel].id])
	makeparticle(items[inv[sel].id].texture,hand,scene,10)
	matdone=true
			}
				
		
			 
			 
		
			//cool(inv,sel)
			/*if(!done){
				
				var gethand=noa.ents.getState(noa.playerEntity, noa.entities.names.mesh).mesh._children[1]
				 superhand=gethand.clone('hand')
				noa.rendering.addMeshToScene(superhand, false)
				superhand.parent=noa.rendering.getScene().activeCamera
	 superhand.position = new BABYLON.Vector3(0.40, -0.8, 1)
	 superhand.rotation.x=Math.PI-Math.PI/10
	 //superhand.rotation.z=-Math.PI/8
	 console.log(superhand.rotation.x)
	 console.log(superhand.rotation.y)
	 console.log(superhand.rotation.z)
	 console.log('booya')
	//superhand.rotation.x = (-Math.PI/2)/2
	//superhand.rotation.y=Math.PI
	 done=true;
				
			}*/
			if(hand!==null){
			
			movehand(hand)
			}
			
			
			
			
			
			
			

		 }	
	 
		if (items[inv[sel].id].type == 'block') {
			
			
			if(itemname!==blocks[blockIDs[inv[sel].id]].name){
				itemname=blocks[blockIDs[inv[sel].id]].name
				console.log('yes go')
				matdone=false
			}
			if(!matdone){
			console.log(blocks[blockIDs[inv[sel].id]].texture)
			if(hand!==null){
				hand.dispose()
				}
				hand=makeBigMesh(noa, scene, blocks[blockIDs[inv[sel].id]].texture, 'stooge')//
				hand.parent = noa.rendering.getScene().activeCamera
				hand.rotation.y = -Math.PI/8
	
	hand.rotation.x = -Math.PI/8
	
	
	
	
	
	noa.rendering.addMeshToScene(hand, false)
	hand.position = new BABYLON.Vector3(0.08, -0.08, 4)
				//hand.material=c
				matdone=true
				
			}
		
			
			if(itemheld!==null){
				itemheld.dispose()
				
			}
			if(superhand!==null){
				superhand.dispose()
			}
			
			done=false;
			//console.log(hand.position)
			//poof(hand.position._x,hand.position._y,hand.position._z,'particle/big_smoke_1',false);
			var block = blockIDs[inv[sel].id]
			try {
			
				var txt = blocks[block].texture
				preUrl[0] = txt[txt.length - 1]
				preUrl[1] = txt[txt.length - 1]
				preUrl[2] = txt[0]
			}
			catch { 
				preUrl[0] = 'error'
				preUrl[1] = 'error' 
				preUrl[2] = 'error'
			}
	
			for(var x = 0; x < 3; x++) {
				if ((preUrl[x].startsWith('http://') || preUrl[x].startsWith('https://')  ) && game.allowCustom == true ) url[x] = preUrl[x]
				else url[x] = 'textures/' + preUrl[x] + '.png'
			}

		} else {
			try { var txtRight = items[inv[sel].id].texture}
			catch { var txtRight = 'error' }
		}
		//var mat = new BABYLON.Texture( url[1], scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
		//handMaterial.ambientTexture = mat
		//poof(hand.position._x,hand.position._y,hand.position._z,'particle/big_smoke_1',false);
	}
	
	
	})
}

function movehand(itemhand,x,y){
	
	
	 if(noa.ents.getState(noa.playerEntity, noa.entities.names.mesh).fired){
			cycle++
			
			itemhand.rotation.x=0.5* Math.cos((0.32  * cycle))+Math.PI/2 ;//swing side
													
		   itemhand.rotation.z=0.5* Math.cos((0.32 * cycle))+Math.PI/2 ; // swing front
		}else if(!noa.ents.getState(noa.playerEntity, noa.entities.names.mesh).fired){
		if(itemhand!==null){
			 itemhand.rotation.x=Math.PI-Math.PI/10
			 itemhand.rotation.z=0
		}
		}
	
	
}

 function cool(inv,sel){
			 if(!done){
			 var txt = items[inv[sel].id].name
			 console.log(txt)
			 //txt="item/apple"
var beet=projectiles[name]//fudu(scene,txt)
 done=true;
 setTimeout(function() {
	 itemheld=beet
	 itemheld.parent=noa.rendering.getScene().activeCamera
	 itemheld.position = new BABYLON.Vector3(0.40, -0.24, 1)
	 itemheld.rotation.y = Math.PI/4
	
	 
	 	}, 1000);
		
		
		
			 }
			 if(noa.ents.getState(noa.playerEntity, noa.entities.names.mesh).fired){
			cycle++
			//console.log(cycle)
			itemheld.rotation.x=0.5* Math.cos((0.32  * cycle)) ;//swing side
													
		   itemheld.rotation.z=0.5* Math.cos((0.32 * cycle))+Math.PI/2 ; // swing front
		}else if(!noa.ents.getState(noa.playerEntity, noa.entities.names.mesh).fired){
			if(itemheld!==null){
				itemheld.rotation.x=0;
				itemheld.rotation.z=0;
			}
		}
			 }
			 
			 
			 
			 
			 
			  function makeBigMesh(noa, scene, url, name) {
	var mesh = {}
	var mat = {}
	for (var x = 0; x < 6; x++) {
		var matname = name + '-' + x || 'sprite-mat'
		mesh[x] = BABYLON.Mesh.CreatePlane('sprite-' + matname, 1, scene)
		mat[x] = noa.rendering.makeStandardMaterial(matname + x)
		mat[x].backFaceCulling = false
		
		
		if(url.length==3){
		if(x<4){
			mat[x].diffuseTexture = new BABYLON.Texture('textures/'+ url[2]+'.png', scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
		}else{
			
			if(x==4){
				mat[4].diffuseTexture = new BABYLON.Texture( 'textures/'+url[0]+'.png', scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
			}
			if(x==5){
			mat[5].diffuseTexture = new BABYLON.Texture( 'textures/'+url[1]+'.png', scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
			}
			
		}
		}
		
		else if(url.length==2){
		if(x<4){
			mat[x].diffuseTexture = new BABYLON.Texture('textures/'+ url[1]+'.png', scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
		}else{
			
			if(x==4){
				mat[4].diffuseTexture = new BABYLON.Texture( 'textures/'+url[0]+'.png', scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
			}
			if(x==5){
			mat[5].diffuseTexture = new BABYLON.Texture( 'textures/'+url[0]+'.png', scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
			}
			
		}
		}
		else{
			mat[x].diffuseTexture = new BABYLON.Texture('textures/'+ url[0]+'.png', scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
		}
		/*if ( ( ( (x < 4) ? url[1] : url[0]).startsWith('http://') || ( (x < 4) ? url[1] : url[0]).startsWith('https://') ) && game.allowCustom == true) mat[x].diffuseTexture = new BABYLON.Texture( ((x < 4) ? url[1] : url[0]), scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
		else  mat[x].diffuseTexture = new BABYLON.Texture('textures/' + ((x < 4) ? url[1] : url[0]) + '.png', scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)*/
		
		mat[x].diffuseTexture.hasAlpha = true
		mesh[x].material = mat[x]
		var offset
		if (x == 0) {offset = BABYLON.Matrix.Translation(0, 0.5, 0.5); mesh[x].rotation.y = 1.57}
		else if (x == 1) {offset = BABYLON.Matrix.Translation(0, 0.5, -0.5); mesh[x].rotation.y = 1.57}
		else if (x == 2) {offset = BABYLON.Matrix.Translation(0, 0.5, 0.5);}
		else if (x == 3) {offset = BABYLON.Matrix.Translation(0, 0.5, -0.5);}
		else if (x == 4) {offset = BABYLON.Matrix.Translation(0, 0, -1); mesh[x].rotation.x = 1.57}
		else if (x == 5) {offset = BABYLON.Matrix.Translation(0, 0, 0); mesh[x].rotation.x = 1.57}

		mesh[x].bakeTransformIntoVertices(offset)
	}
	
	var newmesh = BABYLON.Mesh.MergeMeshes(Object.values(mesh), true, true, undefined, false, true)

	return newmesh

}