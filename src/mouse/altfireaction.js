import { getlistplayers } from '../game'
import { updateinv,updatemobinv } from '../canvas'
import { drop,crater,hollow } from '../player'
import { makefishrod } from '../fishing'
import { blocklook } from '../look'
import { makeinfparticle } from '../particle'

var raypos=null;

var soundjson={}
var reqContext = require.context('../sounds/', false, /\.json$/)
    reqContext.keys().forEach(name => {
        
      var bareName = /\.\/(.*)\.json/.exec(name)[1]
		
		soundjson[bareName]=reqContext(name)
		console.log(soundjson)
		
      
    })



export function altfireaction(noa,socket,blockinterv){//

if(currentUI!==uis.hotbar){
	return;
}

const entClick = castRay();
		if (!!entClick){
		//	console.log(entClick)
			//socketSend('ActionClickEntity', { type: 'left', uuid: entClick[0], distance: entClick[1] });
			//console.log(entClick[1])
			
			var sel=noa.ents.getState(noa.playerEntity, 'inventory').selected
		var item=noa.ents.getState(noa.playerEntity, 'inventory').main[sel].id
		     if(item=='trap'){
						if(entClick[1]<30){
							
								if(entClick[2]=='bokkusu'){
									
									/*var pos=noa.entities.getState(noa.playerEntity,'position').position
									var mesh=noa.entities.getState(entityList[entClick[0]],'entmesh').mesh
									makefishrod(pos[0],pos[1],pos[2],mesh)*/
									var pos=noa.entities.getState(entityList[entClick[0]],'position').position
									console.log(pos)
									console.log(entClick)
									
									noa.loot('horse',pos[0],pos[1],pos[2],socket)
								}
						 }
			 }
			if(entClick[1]<noa.camera.zoomDistance+4){
			if(entClick[2]=='boat'){
				
				if(noa.entities.getFollowsData(entityList[entClick[0]])==null){
					
					noa.ents.getState(noa.playerEntity, 'mesh').isRiding=true
					noa.ents.getState(noa.playerEntity, 'movement').isBoating=true
					
				
					var meshy=noa.ents.getState(entityList[entClick[0]], 'entmesh').mesh
					noa.ents.getState(noa.playerEntity, 'mesh').wichrideable=entClick[0]
					noa.ents.addComponent(entityList[entClick[0]], 'followsEntity',{
						entity:noa.playerEntity,
						name:"boat",
						mesh: meshy,
						offset:[0,0.3,0]
					})
				}
			}
			
			if(entClick[2]=='chest'){
			
			
			//var c=noa.ents.getState(entityList[entClick[0]], 'inventory').main
			
				
				updatemobinv(noa,entityList[entClick[0]])
				
				noa.ents.getState(entityList[entClick[0]], 'mobinventory').opened=true
				noa.ents.getState(noa.playerEntity, 'mesh').chest=entityList[entClick[0]]
				/*var c=raypos._parentNode
				c._childen[1].rotation.x=Math.PI/4*/
			
				//raypos._childen[0].rotation.x=Math.PI/4
				//noa.ents.getState(entityList[entClick[0]], 'entAI').leash=true
				//currentUI=uis.chest
				
				
			}
			
			if(entClick[2]=='sign'){
			var input = document.getElementById('game_chatinput')
			
			var c=noa.ents.getState(entityList[entClick[0]], 'sign').signmesh
			console.log(c)
			var font_size = 96
			
			var font = "bold " + font_size + "px 'lato'"
			 var DTHeight = 1.5 * font_size
			 
			  var temp = new BABYLON.DynamicTexture("DynamicTexture", 64, scene)
	var tmpctx = temp.getContext()
	tmpctx.font = font
    var DTWidth = tmpctx.measureText(input.value).width + 8
		 var dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", {width:DTWidth, height:DTHeight}, scene, true)
    /*var mat = noa.rendering.makeStandardMaterial('nametag')
	mat.diffuseTexture = dynamicTexture
	mat.emissiveTexture = mat.diffuseTexture
	mat.diffuseTexture.hasAlpha = true
	mat.opacityTexture = mat.diffuseTexture*/

//dynamicTexture.clear()

c.material.emissiveTexture = dynamicTexture
c.material.diffuseTexture.hasAlpha = true
	c.material.opacityTexture =dynamicTexture
   dynamicTexture.drawText(input.value, null, null, font, "black", "transparent", true)

			
			/*var input = document.getElementById('game_chatinput')
			console.log('supersign')
				chatbox.style.display='initial'
				input.style.display='initial'*/
				
			}
			
			/*if(entClick[2]=='chest'){
			
			
			
			
				
				console.log('chest')
			
				
				
			}*/
			
			if(entClick[2]=='door' || entClick[2]=='trap' || entClick[2]=='button'  ){
				//console.log(entClick)
			 var str=raypos.name.split(':');
			
			
			 var c=JSON.parse(str[3])
			 	var plac=[c[0],c[1],c[2]]
					
			
					
				     var cool=null
				
					 for (var i=0;i<boptions[0].length;i++){///////
						
						
							 var t=boptions[0][i].pos
							
							 
							   if(JSON.stringify(plac)==JSON.stringify([t[0],t[1],t[2]])){//
							   console.log(boptions[0][i].info)
							   var k=boptions[0][i].data['info']
							   
							   if(k=='Open'){
								  
								   cool='Close'
							  
							   }
							   if(k=='Close'){
								     
								   cool='Open'
								  // currentUI=uis.chest
							  
							   }
							   var rot= boptions[0][i].angle
							    socket.emit('block-break',plac)
								animate=false
								
								if(rot==undefined){
									rot='none'
								}
							
								  socket.emit('block-trick', {position:plac,angle:rot,id:blockIDs[entClick[2]],data:{info:cool,name:entClick[2]}})
							     
							  
							 
							   	
							   }
						 
						
						 
						
					 }
					 noa.soundy('random/click.ogg',1)
				/*if(soundjson[entClick[2]][cool]==undefined){
					noa.soundy('random/click.ogg',1)
					return;
				}
				noa.soundy(soundjson[entClick[2]][cool],1)//*/
				
				
				
				 //playSound('/random/click.ogg', 0.5, null, noa)
			}
			
			if(entClick[2]=='bokkusu'){
				
				
				noa.ents.deleteEntity(entityList[entClick[0]])
				noa.loot('horse',0,25,0,socket)
			}
			if(entClick[2]=='bed'){
				  
                   noa.ents.getState(noa.playerEntity, 'mesh').sleeping=true
				  
				   
				   var str=raypos.name.split(':');
				   
				
				    var c=JSON.parse(str[3])
				   noa.entities.setPosition(noa.playerEntity,[c[0]+0.5,c[1],c[2]+0.5])
				  
				   if(entClick[0]=='south'){
				   mainplayer.rotation.y=0
				   }else if(entClick[0]=='north'){
				   mainplayer.rotation.y=Math.PI
				   }else if(entClick[0]=='west'){
				   mainplayer.rotation.y=Math.PI/2
				   }else if(entClick[0]=='east'){
				   mainplayer.rotation.y=-Math.PI/2
				   }else{
					    mainplayer.rotation.y=0
				   }
				 console.log(entClick[0])
			}
			if(entClick[2]=='stairs'){
				  
                   noa.ents.getState(noa.playerEntity, 'mesh').sitting=true
				  
				   
				   var str=raypos.name.split(':');
				   
				
				    var c=JSON.parse(str[3])
				   noa.entities.setPosition(noa.playerEntity,[c[0]+0.5,c[1],c[2]+0.5])
				  
				   if(entClick[0]=='south'){
				   mainplayer.rotation.y=0
				   }else if(entClick[0]=='north'){
				   mainplayer.rotation.y=Math.PI
				   }else if(entClick[0]=='west'){
				   mainplayer.rotation.y=Math.PI/2
				   }else if(entClick[0]=='east'){
				   mainplayer.rotation.y=-Math.PI/2
				   }else{
					    mainplayer.rotation.y=0
				   }
				 console.log(entClick[0])
			}
			if(entClick[2]=='hover'){
				
				localStorage.setItem('item','hat')
				noa.ents.getState(noa.playerEntity, 'mesh').hover=! noa.ents.getState(noa.playerEntity, 'mesh').hover
				
				if(noa.ents.getState(noa.playerEntity, 'mesh').hover==true){
					
					var body1=noa.ents.getPhysicsBody(noa.playerEntity)
				noa.ents.getState(noa.playerEntity, 'mesh').wichrideable=entClick[0]
					var meshy=noa.ents.getState(entityList[entClick[0]], 'entmesh').mesh
					noa.ents.addComponent(entityList[entClick[0]], 'followsEntity',{
						entity:noa.playerEntity,
						name:"hover",
						mesh: meshy,
						offset:[0,0.3,0],
						body:body1
					})
					
				}
				if(noa.ents.getState(noa.playerEntity, 'mesh').hover==false){
					
					
					noa.ents.removeComponent(entityList[entClick[0]], 'followsEntity')
					
					
				}
			
			}
			if(entClick[2]=='zombie'){
				
				
				
				
				if(noa.ents.getState(entityList[entClick[0]], 'stats').fleeing==false){
					noa.ents.getState(entityList[entClick[0]], 'stats').fleeing=true
					
						noa.ents.addComponent(entityList[entClick[0]],noa.entities.names.flee,{
								npcList:entityList,
								thisSocket:socket,
								name:'zombie'
							})
				}else{
					
					console.log('loloooo')
					noa.ents.getState(entityList[entClick[0]], 'stats').fleeing=false
						noa.ents.removeComponent(entityList[entClick[0]], 'flee')
						noa.ents.getState(entityList[entClick[0]], 'stats').walking='none'
				}
			}
			if(entClick[2]=='horse'){
				
				
				socket.emit('newmobskin',{texture:'horse/silver',id:entClick[0]});
				
				
				
				/*if(noa.entities.getFollowsData(entityList[entClick[0]])==null){
					noa.ents.removeComponent(entityList[entClick[0]], 'entAI')
					var meshy=noa.ents.getState(entityList[entClick[0]], 'entmesh').mesh
					noa.ents.getState(noa.playerEntity, 'mesh').slabeffect=0.8;
					noa.ents.removeComponent(entityList[entClick[0]], 'shadow')
					noa.ents.getState(noa.playerEntity, 'mesh').wichrideable=entClick[0]
					noa.ents.addComponent(entityList[entClick[0]], 'followsEntity',{
						entity:noa.playerEntity,
						name:"horse",
						mesh: meshy,
						offset:[0,0,0],
						walking:"horse"
					})
					return;
				}else{
					noa.ents.addComponent(entityList[entClick[0]], 'entAI',{
						name:'horse'
					})
					
					
									
				}*/
			}
			if(entClick[2]=='submarine'){
				
				//console.log(noa.entities.getFollowsData(entityList[entClick[0]])==null+'sam')
				console.log('boo')
				
				if(noa.entities.getFollowsData(entityList[entClick[0]])==null){
					
					var meshy=noa.ents.getState(entityList[entClick[0]], 'entmesh').mesh
					//noa.ents.getState(noa.playerEntity, 'mesh').slabeffect=-0.1;
				
					noa.ents.getState(noa.playerEntity, 'mesh').wichrideable=entClick[0]
					noa.ents.addComponent(entityList[entClick[0]], 'followsEntity',{
						entity:noa.playerEntity,
						name:"horse",
						mesh: meshy,
						offset:[0,0,0],
						walking:"horse"
					})
					return;
				}
			}
			if(entClick[2]=='car'){
				
				//console.log(noa.entities.getFollowsData(entityList[entClick[0]])==null+'sam')
		
				//console.log(noa.entities.getFollowsData(entityList[entClick[0]])==null+'sam')
				
				
				if(noa.entities.getState(entityList[entClick[0]],'followsEntity')==undefined){
					
					if(noa.ents.getState(noa.playerEntity, 'receivesInputs')!==undefined){
				 //noa.entities.removeComponent(noa.playerEntity, noa.ents.names.receivesInputs);
				}
					onrail=true
				
					noa.ents.getState(noa.playerEntity, 'mesh').isRiding=true
					noa.ents.getState(noa.playerEntity, 'movement').isBoating=true
					var meshy=noa.ents.getState(entityList[entClick[0]], 'entmesh').mesh
					noa.ents.getState(noa.playerEntity, 'mesh').wichrideable=entClick[0]
					noa.ents.addComponent(entityList[entClick[0]], 'followsEntity',{
						entity:noa.playerEntity,
						name:"horse",
						mesh: meshy,
						offset:[0,0,0]
					})
				}
			}
			if(entClick[2]=='rocket'){
				
				//console.log(noa.entities.getFollowsData(entityList[entClick[0]])==null+'sam')
		
				//console.log(noa.entities.getFollowsData(entityList[entClick[0]])==null+'sam')
				
				var pos=noa.entities.getState(noa.playerEntity,'position').position
				if(noa.entities.getState(entityList[entClick[0]],'followsEntity')==undefined){
					
					onrocket=true
					// coolparticle(noa,mainplayer,'big_smoke_0',1000,3,true)
					 
					var d= makeinfparticle(mod+jsoninfo['rocket'].flyparticle)
					d.start()
					 noa.soundy(jsoninfo['rocket'].sound,0.8)
					 noa.ents.getState(noa.playerEntity, 'mesh').isRiding=true
					//noa.ents.getState(noa.playerEntity, 'movement').isBoating=true
					var meshy=noa.ents.getState(entityList[entClick[0]], 'entmesh').mesh
					noa.ents.getState(noa.playerEntity, 'mesh').wichrideable=entClick[0]
					noa.ents.addComponent(entityList[entClick[0]], 'followsEntity',{
						entity:noa.playerEntity,
						name:"horse",
						mesh: meshy,
						offset:[0,0,0]
					})
			
				}
			}
			
			}
			if(entClick[2]=='canon'){
				
				if(noa.ents.getState(noa.playerEntity, 'receivesInputs')!==undefined){
				 noa.entities.removeComponent(noa.playerEntity, noa.ents.names.receivesInputs);
				 noa.ents.getState(noa.playerEntity, 'mesh').isRiding=true
				 var pos=noa.ents.getState(entityList[entClick[0]], 'position').position
				 oncanon=true
					noa.entities.setPosition(noa.playerEntity,pos)
					noa.ents.getState(noa.playerEntity, 'mesh').wichrideable=entClick[0]
					noa.ents.addComponent(entityList[entClick[0]], 'canon')
					/*noa.ents.addComponent(entityList[entClick[0]], 'followsEntity',{
						entity:noa.playerEntity,
						name:"canon",
						mesh: meshy,
						offset:[0,0,0]
					})*/
					//noa.camera.zoomDistance = -0.5
					//hat.visibility=false
				// return;*/
				}
				
			
			}
			
			if(entClick[2]=='birdbot'){
				
				
				var c=noa.ents.getState(entityList[entClick[0]], 'inventory').main
				console.log(c)
				
				updatemobinv(noa,entityList[entClick[0]])
			
			}
			
			
			var superentityList =getlistplayers()
			
			if (superentityList[entClick[0]] != undefined) {
				//noa.ents.getState(superentityList[entClick[0]], noa.entities.names.entmesh).mesh.material.diffuseColor= BABYLON.Color3.Red()
			}
			
			
			
			return true;
			
			
			
		}






var sel=noa.ents.getState(noa.playerEntity, 'inventory').selected
		var item=noa.ents.getState(noa.playerEntity, 'inventory').main[sel].id
			socket.emit('wantent',{position:noa.targetedBlock.adjacent,type:item});	
		if(items[item] !==undefined){
				if (item=='horse' || item=='dog'  ) {
					
					var c=Math.floor(Math.random()*5)
	var k=jsoninfo['horse'].skin[c]
		        //socket.emit('wantent',{position:noa.targetedBlock.adjacent,type:item,texture:k,age:'baby'});
				
								if(noa.targetedBlock){
				socket.emit('wantent',{position:noa.targetedBlock.adjacent,type:item,texture:k,age:'baby'});	
								}			
                   }
		
		}

		
		if (noa.targetedBlock ) {
			
			var pos = noa.targetedBlock.adjacent
			
			var pos2 = noa.targetedBlock.position
			
			var sel = noa.ents.getState(noa.playerEntity, 'inventory').selected
			
			var inv=noa.ents.getState(noa.playerEntity, 'inventory').main 
			
			console.log(noa.targetedBlock)
		
			/*if(inv[sel].count<=0){
				inv[sel]={}
				return;
			}
			
			if(inv[sel].count==undefined){
				
				return;
			}*/
			
			/*if(blocks[blockIDs[inv[sel].id]].name=='bed'){
			
				 console.log('bed');
			}*/
			
			if(noa.getBlock([pos[0],pos[1],pos[2]])!==0){
				
				 socket.emit('block-break', pos)
				//return;
			}
			var c='none'
		      c=traplook(noa)
			if(blocks[blockIDs[inv[sel].id]]!==undefined){
					/*if(blocks[blockIDs[inv[sel].id]].data.rotation!==undefined){
					
						 c=traplook(noa)//blocklook(pos)///////
					}	*/
					
					if(blocks[blockIDs[inv[sel].id]].name=='button'){
					
						 c='north'
					}
			}
			//superray()
			
			var ids='none'//blockIDs[inv[sel].id]
			if(inv[sel].count>0){
				
				if(inv[sel].count==1){
					removerenderitem(noa,mainplayer)
					removerenderitem(noa,screenclone)
					
					inv[sel]={}
					itemBarItems[sel]=null
				}
				console.log(blocks[blockIDs[inv[sel].id]])
				if(item=='bed'){
						if( noa.getBlock(pos[0], pos[1], pos[2]+1)!==0 && c=='north'){
						
						return;
						
						}
						
						if(noa.getBlock(pos[0], pos[1], pos[2]-1)!==0 && c=='south'){
						
						return;
					
						}
						
						if(noa.getBlock(pos[0]-1, pos[1], pos[2])!==0 && c=='west'){
						
						return;
						
						}
						
						if( noa.getBlock(pos[0]+1, pos[1], pos[2])!==0 && c=='east'){
						
						return;
						
						}															
				}
				
				var coloritem='black'
				
				if(item.includes("bed_")){
					var str=item.split('_');
					
					 coloritem=str[1]
				   ids='bed'
				}
			
				
		if(noa.targetedBlock.normal[0]!==0 || noa.targetedBlock.normal[2]!==0){
				if (noa.ents.isTerrainBlocked(pos[0], pos[1], pos[2]) == false) socket.emit('block-place', {position: pos,angle:c,id:ids,data:{info:'Open',color:coloritem}})//
		}else{
			if (noa.ents.isTerrainBlocked(pos[0], pos[1], pos[2]) == false) socket.emit('block-place', {position: pos,angle:c,id:ids,data:{info:'Close',color:coloritem}})
				
			
		}
	updateinv(noa)
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
	
	
	function traplook(noa){
	var up=false
	var playerp=noa.ents.getState(noa.playerEntity, noa.entities.names.position).position
	
	
	var viewdirection=null
	 var rad=BABYLON.Tools.ToDegrees(noa.camera.heading)//	// 

		 
		 if(rad>320  || rad <50){
	//viewdirection=[Math.PI/2,Math.PI,0,[0,0,-0.40]]
	
	//viewdirection=[Math.PI/2,Math.PI,0,[0,0,0]]
	viewdirection='north'
	//'north'
	
}
if(rad>130 && rad<230){
	//viewdirection=[Math.PI/2,0,0,[0,0,0.40]]
	//viewdirection=[Math.PI/2,0,0,[0,0,0]]//
	viewdirection='south'//[Math.PI/2,0,0,[0,0,0]]//
	//'south'
	
}
if(rad>50 && rad<130){
	//viewdirection=[Math.PI/2,-Math.PI/2,0,[-0.4,0,0]]///
	//viewdirection=[Math.PI/2,-Math.PI/2,0,[0,0,0]]///
	viewdirection='east'//[Math.PI/2,-Math.PI/2,0,[0,0,0]]///
	//'left'
	
	
}

if(rad>230 && rad<320){
	//viewdirection=[Math.PI/2,Math.PI/2,0,[0.4,0,0]]
	//viewdirection=[Math.PI/2,Math.PI/2,0,[0,0,0]]
	viewdirection='west'//[Math.PI/2,Math.PI/2,0,[0,0,0]]
	//'right'
	
}
return viewdirection;

 }
 
 
 export function removerenderitem(noa,mainp){
	
	if(mainp._children[1].getChildren().length>0){
		mainp._children[1]._children[0].dispose()
		
	}
	
}

  