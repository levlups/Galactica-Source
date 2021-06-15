const io = require('socket.io-client')
const cruncher = require('voxel-crunch')
const ndarray = require('ndarray')
var vec3 = require('gl-vec3')
var PF = require('pathfinding');
const EventEmiter = require('events')
import { fudu} from './mesher'
import Engine from 'noa-engine'
import { isMobile } from 'mobile-device-detect'
import * as BABYLON from '@babylonjs/core/Legacy/legacy'
import 'babylonjs-loaders'
import { registerBlocks, registerItems } from './registry'
import { setupGuis } from './gui/setup'
import { updateInventory,updateChest } from './gui/inventory'
import { setTab } from './gui/tab'
import { setChunk } from './world'
import { setupPlayer, setupControls, prepitems,flatcubic,cubic ,gethand} from './player'
import { addToChat, parseText } from './gui/chat'
import { playSound } from './sound'
import { setupSpawner } from './spawner'
import { applyModel, defineModelComp} from './model'
import { applyModelCow,defineModelCompCow } from './ents/cow'
import { applyModelFirework,defineModelCompFirework } from './ents/firework'
import { applyModelHorse,defineModelCompHorse} from './ents/horse'
import { applyModelBoat,defineModelCompBoat } from './ents/boat'
import { applyModelSubmarine,defineModelCompSubmarine } from './ents/submarine'
import { applyModelRocket,defineModelCompRocket } from './ents/rocket'
import { applyModelBombot,defineModelCompBombot } from './ents/bombot'
import { applyModelCanon,defineModelCompCanon } from './ents/canon'
import { applyModelDog,defineModelCompDog } from './ents/dog'
import { applyModelDoge,defineModelCompDoge } from './ents/doge'
import { applyModelChest,defineModelCompChest } from './ents/chest'
import { applyModelSign,defineModelCompSign } from './ents/sign'
import { applyModelSpawn,defineModelCompSpawn } from './ents/spawn'
import { applyModelRobot,defineModelCompRobot } from './ents/robot'
import { applyModelHover,defineModelCompHover } from './ents/hover'
import { applyModelWall,defineModelCompWall } from './ents/wall'
import { applyModelBokkusu,defineModelCompBokkusu } from './ents/bokkusu'
import { applyModelMinecart,defineModelCompMinecart } from './ents/minecart'
import { applyModelMadbot,defineModelCompMadbot } from './ents/madbot'
import { applyModelBirdbot,defineModelCompBirdbot } from './ents/birdbot'
import { letsrock,poof,chew,blocklook} from './player'
import { updateinv} from './canvas'
import { postgame,getuui,getphpitems} from './xml'



import { makeparticle } from './particle'

import clientconfig from './data/playerskin.json'////


global.teamcoords={1:[44,42,-6],2:[47,41,27],3:[20,40,-49],4:[-2,40,-46]}

var versionmod=localStorage.getItem('modname')
if(versionmod==undefined){
	versionmod='v1';
}
versionmod='v1';
const pack='./mod/'+versionmod+'/'
global.mod=pack

global.orbsound='random/orb.ogg'

global.flagbearer=false

var state='waiting'


global.socket=null

global.loottable={
	"villager":{"bed":"ladder","chance":0.5},
	"madbot":{"item":"ladder","chance":0.5},
	"birdbot":{"item":"ladder","chance":0.5},
	"horse":{"item":"ladder","chance":1},
	"boat":{"item":"boat","chance":1},
	"hover":{"item":"hover","chance":1},
	"bokkusu":{"item":"hover","chance":1},
	"human":{"item":"snowball","chance":1},
	"doge":{"item":"snowball","chance":1},
	"dog":{"item":"snowball","chance":1}
	
}

/*setTimeout(function(){
var c=window.location.search
var d=c.split("=")
console.log(d[1])
var nick = localStorage.getItem('nickname')
var l=d[1].toString()
console.log(l)
 startGame(nick, l, null)
 
  }, 3000);*/
/*let d = new Date();
let ye = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(d);
let se = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(d);
let te = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
if(ye==3&& se==25 && te==2021){
	alert('happy birth day its'+ye+se+te)
}*/
var discreason
postgame('love','cool');

getuui('sing')

getphpitems('sing')

global.numplayers=0;
	
	Engine.prototype.soundy=function (sound,volume) {
		if(volume==undefined){
			volume=0.5
		}
		 playSound(sound, volume, null, noa)
		
	}
	
	Engine.prototype.loot=function (name,x,y,z,socket) {
		console.log('im on a '+name)
		
		//flatcubic(x,y,z,name,true)
		if(Math.random()<loottable[name].chance){
			console.log('bingo');
	//	flatcubic(x,y,z,loottable[name].item,socket,0.8)
		
		socket.emit('threw-item',{name:loottable[name].item,position:[x,y,z],angle:[0,0,0],force:0.8});
		}
		//flatcubicsimple(x,y,z,name)
		 //flatcubic(-114,42,299,name,id)
		
	}
	
	Engine.prototype.setParticle=function(name,scene,mesh){
		
		
		makeparticle(name,mesh,scene,5)
		
	}
	
	Engine.prototype.despawn=function(name,id,socket){
		
			var pos=noa.ents.getState(entityList[id], 'position').position
			
			if(Math.random()<loottable[name].chance){
			
		flatcubic(pos[0],pos[1],pos[2],loottable[name].item,socket,0.8)
		}
		socket.emit('despawn', id)
		
	}
	
	Engine.prototype.playerdown=function(socket){
		
		console.log('poor player')
		var pos=noa.ents.getState(noa.playerEntity, 'position').position
		  var sel=noa.ents.getState(noa.playerEntity, 'inventory').selected
		  for (var i=1;i<8;i++){
	
		
		if(noa.ents.getState(noa.playerEntity, 'inventory').main[i]!==undefined){
		var item=noa.ents.getState(noa.playerEntity, 'inventory').main[i].id
		var matrix=noa.camera.getDirection()
		pos=[pos[0]+Math.random(),pos[1]+Math.random()+2,pos[2]+Math.random()]
		socket.emit('threw-item',{name:item,position:pos,angle:matrix});
		}
		}
		
		
	}




var mainplayerdat=null;
var mainppicked=false
global.engineParams = {
	debug: true,
	showFPS: true,
	inverseY: false,
	inverseX: false,
	sensitivityX: parseInt( localStorage.getItem('mouse') ),
	sensitivityY: parseInt( localStorage.getItem('mouse') ),
	chunkSize: 24, // Don't touch this
	chunkAddDistance: 7.5, // Make it changeable?
	chunkRemoveDistance: 8.0, // ^
	blockTestDistance: 8, // Per Gamemode?
	tickRate: ( isMobile ? 65 : 55 ), // Maybe make it lower was 65:55
	texturePath: '',
	playerStart: [0, 100, 0],
	playerHeight: 1.85,
	playerWidth: 0.5,
	playerAutoStep: (localStorage.getItem('autostep') == 'true'),
	clearColor: [0.8, 0.9, 1,0],
	ambientColor: [1, 1, 1],
	lightDiffuse: [1, 1, 1],
	lightSpecular: [1, 1, 1],
	groundLightColor: [0.5, 0.5, 0.5],
	useAO: true,
	AOmultipliers: [0.93, 0.8, 0.5],
	reverseAOmultiplier: 1.0,
	preserveDrawingBuffer: true,
	gravity: [0, -14, 0],
	bindings: {
		"action": ["Q"],
		"forward": ["W"],
		"left": ["A"],
		"backward": ["S"],
		"right": ["D"],
		"fire": "<mouse 1>",
		"mid-fire": ["<mouse 2>"],
		"alt-fire": ["<mouse 3>"],
		"jump": "<space>",
		"sprint": "<shift>",
		"fly": ["F"],
		"inventory": ["E"],
		"muteMusic": ["O"],
		"thirdprsn": ["M"],
		"social": ["L"],
		"chatenter": ["<enter>"],
		"chat": ["T"],
		"tab": ["<tab>"],
		"menu": ["<escape>"],
		"screenshot": ["P"]

	}
}


global.entityList=null
global.animate=true

global.lol=false
export function getlistplayers(){
	
	return entityList;
}

export function startGame(username, server, world) {
	/* if(window.localStorage.getItem('allowed')!=='pass'){
		 return;
	 }*/
	
console.log('lol'+server)
	if (typeof server == 'string') {

		 socket = new io('ws://' + server, {
			reconnection: false
		})
		
		

	} else {
		const fromServer = new EventEmiter()
		fromServer.emit2 = fromServer.emit

		server.onmessage = function (m) { 
			fromServer.emit2(m.data[0], m.data[1])
		}

		function emitToServer(type, packet) {
			server.postMessage([type, packet])
		}

		fromServer.emit = emitToServer

		var socket = fromServer

		fromServer.on('get-world', () => {
			emitToServer('select-world', world)
		})
	}

	console.log('Username: ' + username, 'Server: ' + server)
	

	socket.on('login-request', function(dataLogin) {
		socket.emit('login', {
			username: username,
			protocol: 1,
			mobile: isMobile,
			texture: clientconfig["skin"]
		
		})

		socket.on('kick', function(data) {
			console.log('You has been kicked from server \nReason: ' + data)
			discreason = data
			return
		})

		global.entityIgnore = 0
		  entityList = {}
		
		

		socket.on('entity-ignore', function(data) {
			console.log('Ignoring player-entity: ' + data)
			if(!mainppicked){
			mainplayerdat=data
			mainppicked=true
			//numplayer++
			}
			entityIgnore = data
			if (entityList[data] != undefined) noa.ents.deleteEntity(entityList[data]); delete entityList[data]
		})

		socket.on('login-success', function(dataPlayer) {
			
			document.body.innerHTML = ""

			if (dataPlayer.pos != undefined) engineParams.playerStart = dataPlayer.pos
			var noa = new Engine(engineParams)
			
			
			var moveState = noa.inputs.state
			var lastPos = {}
			var lastRot = 0
			var chunkList = []
            //console.log(dataPlayer)
			registerBlocks(noa, dataPlayer.blocks, dataPlayer.blockIDs,socket)
			registerItems(noa, dataPlayer.items)
			
			setupPlayer(noa, dataPlayer.inv,dataPlayer.tex,socket,dataPlayer.armor)
			
		
			defineModelComp(noa)
			defineModelCompCow(noa)
			defineModelCompHorse(noa)
			defineModelCompBoat(noa)
			defineModelCompHover(noa)
			defineModelCompWall(noa)
			defineModelCompBokkusu(noa)
			defineModelCompSubmarine(noa)
			defineModelCompRocket(noa)
			defineModelCompBombot(noa)
			defineModelCompCanon(noa)
			defineModelCompMinecart(noa)
						setTimeout(function(){ 
defineModelCompFirework(noa)

	}, 3000);
			
			
			
			defineModelCompMadbot(noa)
			defineModelCompBirdbot(noa)
			defineModelCompDog(noa)
			defineModelCompDoge(noa)
			defineModelCompChest(noa)
			defineModelCompSign(noa)
			defineModelCompSpawn(noa)
			defineModelCompRobot(noa)
		

			setupControls(noa, socket)
			setupSpawner(noa,socket)
           
			setupGuis(noa, server, socket, dataPlayer, dataLogin)
			
				prepitems(noa,dataPlayer.items,dataPlayer.blocks)
				
	       socket.on('pickteam', function(data) {
						var c=	noa.ents.getState(noa.playerEntity, 'stats').team
						numplayers=data;
						console.log(data)
						if(c==0){
							
							if(data>4){
								data-=4
							}
							else if(data>8){
								data-=8
							}
							else if(data>12){
								data-=12
							}
							else if(data>16){
								data-=16
							}
							noa.ents.getState(noa.playerEntity, 'stats').team=data
							
						}
						console.log('yo man :'+data);
			})
			
			socket.on('chunkdata', function(data) {
				var chunkdata = cruncher.decode(Object.values(data.chunk), new Uint16Array(24 * 120 * 24))
				var array = new ndarray(chunkdata, [24, 120, 24])
				
				chunkList.push([data.id, array])
			})
			
			socket.on('block-optionsstart', function(data) {
				
				boptions=[]
				if(data!==null){
				boptions.push(data[0])
				seed=data[1]
				console.log('king nabil seed:'+data[1]);
				}
			
				
			
				
				
			})
			
			socket.on('block-options', function(data) {
				console.log('im lost')
				boptions=[]
				boptions.push(data)
			
			})

			socket.on('block-update', function(data) {
			
				var sel = noa.ents.getState(noa.playerEntity, 'inventory').selected
			
			var inv=noa.ents.getState(noa.playerEntity, 'inventory').main 
			
			if(inv[sel].count==0){
				console.log('remove')
			}
				
				
				var c=noa.getBlock(data.pos[0],data.pos[1],data.pos[2])
				if(c==blockIDs['door']){
					animate=false
				}
				if(c==blockIDs['doorbarrier']){
					animate=false
				}
				
				
				
						if(c>0 /*&& animate*/){
							
							if(c==blockIDs['water']){
								noa.setBlock(data.id, data.pos)
								return;
							}
							
							if(blocks[c].type!==0){
								
								if(!animate){
									noa.setBlock(data.id, data.pos)
									return;
								}
								flatcubic(data.pos[0],data.pos[1],data.pos[2],items[blocks[c].name].name,socket,data.rando)
								noa.setBlock(data.id, data.pos)
								return;
							}
							else{
						
							
							cubic(data.pos[0],data.pos[1],data.pos[2],blocks[c].texture[0],socket,c,data.rando)
								}
							
						}
				
				
				
				if(blocks[data.id]!==undefined){
				if(blocks[data.id].type!==0){
					lol=true
				}else{
					lol=false
				}
				}
				
				
				
				noa.setBlock(data.id, data.pos)
				
			
				
				
			})
			
			
			

			socket.on('inventory-update', function(data) {
				
				
				noa.ents.getState(noa.playerEntity, 'inventory').main = data.main
				noa.ents.getState(noa.playerEntity, 'inventory').tempslot = data.tempslot

				updateInventory(noa)
					updateinv(noa)
				//updateinv(noa,1)
				//updateChest(noa)

			})
			


			socket.on('chat', function(data) { 
				addToChat(data)
				console.log('Chat: ' + data)
			})

			socket.on('tab-update', function(data) {
				setTab(data)
			})

			socket.on('teleport', function(data) {
				
				console.log(data)
				noa.ents.setPosition(noa.playerEntity, [data[0],data[1],data[2]])
				console.log('Teleport: ', data)
			})
			
			
			socket.on('teleportspawn', function(data) {
				if(data.id==mainplayerdat ){
				console.log(data)
				noa.ents.setPosition(noa.playerEntity, [data.pos[0],data.pos[1],data.pos[2]])
				console.log('Teleport: ', data)
				
				}
			})
			
		          
					
			socket.on('echo-newmobskin', function(data) {
				
				
				console.log(data.texture)
			var mesh=	noa.ents.getState(entityList[data.id], 'entmesh').mesh
			
			var bustex = new BABYLON.Texture(mod+"models/"+data.texture+".png", scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);

var busmat = new BABYLON.StandardMaterial("face0", scene);
busmat.diffuseTexture=bustex
busmat.specularColor = BABYLON.Color3.Black()
busmat.emissiveColor = BABYLON.Color3.White()
bustex.hasAlpha=true;

	mesh.material=busmat
mesh._children[0].material=busmat
mesh._children[1].material=busmat
mesh._children[2].material=busmat
mesh._children[3].material=busmat
				
			})
			
			socket.on('ishit', function(data) {
				
				console.log(data.id)
				
				console.log('cook'+mainplayerdat)
				var c=noa.ents.getState(noa.playerEntity, 'stats').team
					if(data.id==mainplayerdat){
						
						console.log('wathsuppppppp')
						
							var body=noa.ents.getPhysicsBody(noa.playerEntity)
							body.applyImpulse([0,4,0]);
							noa.ents.getState(noa.playerEntity, 'stats').health-=1
							var k=noa.ents.getState(noa.playerEntity, 'stats').health
							var l=noa.ents.getState(noa.playerEntity, 'mesh').mesh
							l._children[0].material.emissiveColor=BABYLON.Color3.Red()
							setTimeout(function(){l._children[0].material.emissiveColor=BABYLON.Color3.White() }, 300);
							if(k<0){
					socket.emit('diespawn', {pos:teamcoords[c],id:mainplayerdat}) 
					noa.ents.getState(noa.playerEntity, 'stats').health=5
							}
					
					
							return;
					}
				
				var body=noa.ents.getPhysicsBody(entityList[data.id])
				body.applyImpulse([data.strength[0],data.strength[1],data.strength[2]])
				noa.ents.getState(entityList[data.id], 'stats').health-=1
				var l=noa.ents.getState(entityList[data.id], 'entmesh').mesh
							l._children[0].material.emissiveColor=BABYLON.Color3.Purple()
							
							setTimeout(function(){l._children[0].material.emissiveColor=BABYLON.Color3.White() }, 300);
				var c=noa.ents.getState(entityList[data.id], 'stats').health
				console.log(c)
				if(c<0){
				
				 
				  
													  
													  
													  var c=noa.ents.getState(entityList[data.id], noa.entities.names.position).position
			                                         var name=noa.ents.getState(entityList[data.id], 'stats').name
		
		                                      noa.loot(name,c[0],c[1],c[2],socket)
			
													  socket.emit('despawn', data.id) 
				}
				
			})
			
		

			socket.on('movement-change', function(data) {
				var move = noa.ents.getMovement(noa.playerEntity)
				move = data
			})

			socket.on('skybox-colors', function(data) {
				
			})

			socket.on('entity-spawn', async function(data) {
				
				
				if (entityIgnore != data.id) {
					
					
					numplayers++
				setTimeout(function() {
			entityList[data.id] = noa.ents.add(Object.values(data.data.position), 1, 2, null, null, false, true)

					applyModel(entityList[data.id], data.data.model, data.data.texture, data.data.offset, data.data.nametag, data.data.name, data.data.hitbox,data.id,data.data.rotation,data.data.armor)
			}, 1000)
					
									
				}
			})
			
			socket.on('gamehud', async function(data) {
				
				var ghud=document.getElementById('game_title')
				ghud.innerHTML=data
			
			})
			
			socket.on('entity-spawn-mob', async function(data) {
				
				//console.log(data)
				var pos = noa.ents.getState(noa.playerEntity, 'position').position
					
					var c=null;
					var d= noa.camera.getDirection()
						var rxpos=(Math.random()*6-3)+pos[0]
								var rzpos=pos[2]+(d[2]*25)
							for (var i=160;i>0;i--){
								
								 c=noa.getBlock(rxpos,i,rzpos)
								 
								
								if(c==blockIDs.grass){
									//if(c!==0){
									
									if(data.data.type=='birdbot'){
					
					//entityList[data.id] = noa.ents.add([rxpos,i+1,rzpos], 1, 2,null, null, false, true)
				entityList[data.id] = noa.ents.addent([rxpos,i+1,rzpos], 1, 2,null, [0,2,0], false, true)
                  
					//	applyModelZombie(entityList[data.id], data.data.model, data.data.texture, data.data.offset, data.data.nametag, data.data.name, data.data.hitbox,entityList,data.id,socket)
						
					applyModelBirdbot(entityList[data.id], data.data.model, data.data.texture, [0,2,0], data.data.nametag, data.data.name, data.data.hitbox,entityList,data.id,socket)
					//applyModelRobot(entityList[data.id], data.data.model, data.data.texture, [0,2,0], data.data.nametag, data.data.name, data.data.hitbox,entityList,data.id,socket)
					return;
					
					}
									
								}
							}
							
							
							/////////////////////
				
				
				if (entityIgnore != data.id) {
					
					
					
					setTimeout(function() {
					if(data.data.type=='minecart'){
					
					entityList[data.id] = noa.ents.add(Object.values(data.data.position), 1, 2, null, null, false, true)
				
                  
					applyModelMinecart(entityList[data.id], data.data.model, data.data.texture, data.data.offset, data.data.nametag, data.data.name, data.data.hitbox,998989,99999,entityList,data.id,socket,PF)
					
					
					
					}
					
					
					if(data.data.type=='boat'){
					
					entityList[data.id] = noa.ents.add(Object.values(data.data.position),2, 0.5, null, null, false,false)
				
                  
					applyModelBoat(entityList[data.id], data.data.model, data.data.texture, data.data.offset, data.data.nametag, data.data.name, data.data.hitbox,998989,99999,entityList,data.id,socket,PF)
					
					
					
					}
					if(data.data.type=='hover'){
					
					entityList[data.id] = noa.ents.add(Object.values(data.data.position),2, 0.5, null, null, false,false)
				
                  
					applyModelHover(entityList[data.id], data.data.model, data.data.texture, data.data.offset, data.data.nametag, data.data.name, data.data.hitbox,998989,99999,entityList,data.id,socket,PF)
					
					
					
					}
					if(data.data.type=='wall'){
					
					entityList[data.id] = noa.ents.add(Object.values(data.data.position),2, 0.5, null, null, false,false)
				
                  
					applyModelWall(entityList[data.id], data.data.model, data.data.texture, data.data.offset, data.data.nametag, data.data.name, data.data.hitbox,998989,99999,entityList,data.id,socket,PF)
					
					
					
					}
					if(data.data.type=='bokkusu'){
					
					entityList[data.id] = noa.ents.add(Object.values(data.data.position),2, 0.5, null, null, false,false)
				
                  
					applyModelBokkusu(entityList[data.id], data.data.model, data.data.texture, data.data.offset, data.data.nametag, data.data.name, data.data.hitbox,998989,99999,entityList,data.id,socket,PF)
					
					
					
					}
					
					if(data.data.type=='submarine'){
					
					entityList[data.id] = noa.ents.add(Object.values(data.data.position),2, 0.5, null, null, false,false)
				
                  
					applyModelSubmarine(entityList[data.id], data.data.model, data.data.texture, data.data.offset, data.data.nametag, data.data.name, data.data.hitbox,998989,99999,entityList,data.id,socket,PF)
					
					
					
					}
					if(data.data.type=='rocket'){
					
					entityList[data.id] = noa.ents.add(Object.values(data.data.position),3, 0.5, null, null, false,false)
				
                  
					applyModelRocket(entityList[data.id], data.data.model, data.data.texture, data.data.offset, data.data.nametag, data.data.type, data.data.hitbox,998989,99999,entityList,data.id,socket,PF)
					
					
					
					}
					if(data.data.type=='bombot'){
					
					entityList[data.id] = noa.ents.add(Object.values(data.data.position),3, 0.5, null, null, false,false)
				
                  
					applyModelBombot(entityList[data.id], data.data.model, data.data.texture, data.data.offset, data.data.nametag, data.data.type, data.data.hitbox,998989,99999,entityList,data.id,socket,PF)
					
					
					
					}
					
					if(data.data.type=='canon'){
					
					entityList[data.id] = noa.ents.add(Object.values(data.data.position),2, 0.5, null, null, false,false)
				
                  
					applyModelCanon(entityList[data.id], data.data.model, data.data.texture, data.data.offset, data.data.nametag, data.data.type, data.data.hitbox,998989,99999,entityList,data.id,socket,PF)
					
					
					
					}
					
					
					
					if(data.data.type=='cow'){
					
					entityList[data.id] = noa.ents.add([rxpos,i+1,rzpos], 1, 2, null, null, false, true)
				
                  
					applyModelCow(entityList[data.id], data.data.model, data.data.texture, data.data.offset, data.data.nametag, data.data.name, data.data.hitbox,998989,99999,entityList,data.id,socket,PF)
					
					
					
					}
					
					if(data.data.type=='firework'){
					
					entityList[data.id] = noa.ents.add(Object.values(data.data.position), 1, 2, null, null, false, true)
				
                  
					applyModelFirework(entityList[data.id], data.data.model, data.data.texture, data.data.offset, data.data.nametag, data.data.name, data.data.hitbox,998989,99999,entityList,data.id,socket,PF,noa,data.data.position)
					
					
					
					}
					
				/*	if(data.data.type=='madbot'){
						
						entityList[data.id] = noa.ents.add(Object.values(data.data.position), 1, 2, null, null, false, true)

					applyModelMadbot(entityList[data.id], data.data.model, data.data.texture, data.data.offset, data.data.nametag, data.data.name, data.data.hitbox,entityList,data.id,socket)
						
					}*/
					//console.log(data.data.type)
					if(data.data.type=='dog'){
						
						entityList[data.id] = noa.ents.add(Object.values(data.data.position), 1, 2, null, null, false, true)

					applyModelDog(entityList[data.id], data.data.model, data.data.texture, data.data.offset, data.data.nametag, data.data.name, data.data.hitbox,entityList,data.id,socket,data.data.chest,data.data.age)
						
					}
					
							if(data.data.type=='doge'){
						
						entityList[data.id] = noa.ents.add(Object.values(data.data.position), 1, 2, null, null, false, true)

					applyModelDoge(entityList[data.id], data.data.model, data.data.texture, data.data.offset, data.data.nametag, data.data.name, data.data.hitbox,entityList,data.id,socket,data.data.chest,data.data.age)
						
					}
					
					if(data.data.type=='chest'){
						
						entityList[data.id] = noa.ents.add(Object.values(data.data.position), 1, 2, null, null, false, true)

					applyModelChest(entityList[data.id], data.data.model, data.data.texture, data.data.offset, data.data.nametag, data.data.name, data.data.hitbox,entityList,data.id,socket,data.data.chest)
						
					}
					
					if(data.data.type=='sign'){
						
						entityList[data.id] = noa.ents.add(Object.values(data.data.position), 1, 2, null, null, false, true)

					applyModelSign(entityList[data.id], data.data.model, data.data.texture, data.data.offset, data.data.nametag, data.data.name, data.data.hitbox,entityList,data.id,socket,data.data.chest,data.data.rotation)
						
					}
					if(data.data.type=='spawn'){
						
						entityList[data.id] = noa.ents.add(Object.values(data.data.position), 1, 2, null, null, false, true)

					applyModelSpawn(entityList[data.id], data.data.model, data.data.texture, data.data.offset, data.data.nametag, data.data.name, data.data.hitbox,entityList,data.id,socket,data.data.chest,data.data.rotation)
						
					}
					
					
					if(data.data.type=='horse'){
					
						entityList[data.id] = noa.ents.add(Object.values(data.data.position), 1, 2, null, null, false, true)

					applyModelHorse(entityList[data.id], data.data.model, data.data.texture, data.data.offset, data.data.nametag, data.data.name, data.data.hitbox,998989,99999,entityList,data.id,socket,PF,data.data.age)
						
					}

                    }, 1000)
					
					
					
				
									
				}
			})
			
		

			socket.on('entity-despawn', function(data) {
				
				if (entityList[data] != undefined) noa.ents.deleteEntity(entityList[data]); delete entityList[data]

			})
			
			socket.on('entity-click', function(data) {
				//if (entityList[data] != undefined) noa.ents.deleteEntity(entityList[data]); delete entityList[data]
				//console.log(data)

			})
			
			socket.on('flagbearer', function(data) {
				
				//console.log('flagbearer ='+data.flag)
				//if (entityList[data] != undefined) noa.ents.deleteEntity(entityList[data]); delete entityList[data]
				flagbearer=data.flag

			})
			
			
			
		

			socket.on('entity-move', function(data) {
				
				
				
				if (entityList[data.id] != undefined) {
					var pos = Object.values(data.data.pos)
					if(data.data.hrot !==undefined){
						
						//noa.ents.getState(entityList[data.id], noa.entities.names.entmesh).mesh.rotation={x:data.data.brot._x,y:data.data.brot._y,z:data.data.brot._z};
				
					noa.ents.getState(entityList[data.id], noa.entities.names.entmesh).mesh._children[0].rotation={x:data.data.hrot._x,y:data.data.hrot._y,z:data.data.hrot._z};
					
					noa.ents.getState(entityList[data.id], noa.entities.names.entmesh).mesh._children[1].rotation={x:data.data.arm._x,y:data.data.arm._y,z:data.data.arm._z};
					noa.ents.getState(entityList[data.id], noa.entities.names.entmesh).mesh._children[2].rotation={x:data.data.arm2._x,y:data.data.arm2._y,z:data.data.arm2._z};
					noa.ents.getState(entityList[data.id], noa.entities.names.entmesh).mesh._children[3].rotation={x:data.data.leg._x,y:data.data.leg._y,z:data.data.leg._z};
					noa.ents.getState(entityList[data.id], noa.entities.names.entmesh).mesh._children[4].rotation={x:data.data.leg2._x,y:data.data.leg2._y,z:data.data.leg2._z};
				
					}
					
					
				
					/*if(data.data.itemheld!==null){
						
						
						console.log(data.data)
						var c=noa.ents.getState(entityList[data.id], noa.entities.names.entmesh).mesh
						gethand(noa,data.data.itemheld,c)
						
						
					}*/
					noa.ents.getState(entityList[data.id], 'position').newPosition = data.data.pos
					noa.ents.getState(entityList[data.id], 'position').rotation = data.data.rot * 2
				
						
				}
			})
            
			socket.on('sound-play', function(data) { playSound(data.sound, data.volume, data.position, noa) } )
			
			socket.on('entity-move-mob', function(data) {
				
				if(flagbearer==false){
				
				if (entityList[data.id] != undefined) {
					var pos = Object.values(data.data.pos)
					var rot = Object.values(data.data.rot)
					var head = Object.values(data.data.header)
				    var walk = data.data.walker
			
					noa.entities.setPosition(entityList[data.id],pos[0],pos[1],pos[2]);
					noa.ents.getState(entityList[data.id], noa.entities.names.entmesh).mesh.rotation.y=rot[2]
					
					noa.ents.getState(entityList[data.id], noa.entities.names.entmesh).mesh.rotation.x=rot[1]
					noa.ents.getState(entityList[data.id], noa.entities.names.entmesh).mesh._children[0].rotation.y=head[2]
					//noa.ents.getState(entityList[data.id], 'position').position = pos//data.data.pos
					noa.ents.getState(entityList[data.id], noa.entities.names.stats).walking=walk
					
					//noa.ents.getState(entityList[data.id], noa.entities.names.entmesh).mesh.rotation.y=rot[1]
					//noa.ents.getState(entityList[data.id], noa.entities.names.entmesh).mesh.rotation.x=rot[2]
				
						
				}
				
				}
			})
			 setInterval(async function() {
				  if(flagbearer==true){
				  for (const key in entityList) {
							 
							 
							 var c=noa.ents.getState(entityList[key], noa.entities.names.entmesh).mob
							 
							 	if(c==true){
					
						var posy= noa.ents.getState(entityList[key], 'position').position
						
						
						socket.emit('newmobpos', {id:key,pos:posy})
										
									}
						 }
						 
				  }
				 
				 	}, 10000)
             
				 setInterval(async function() {
					 if(flagbearer==true){
						 
						 
					
						 
						   for (const key in entityList) {
							   
									   if(noa.ents.getState(entityList[key], noa.entities.names.entmesh)==undefined){
									   break;
									   }
    
								
									
									var c=noa.ents.getState(entityList[key], noa.entities.names.entmesh).mob
								
									
									if(c==true){
						var rot=noa.ents.getState(entityList[key],noa.entities.names.entmesh).mesh.rotation
						var rothead=noa.ents.getState(entityList[key],noa.entities.names.entmesh).mesh._children[0].rotation
						var pos= noa.ents.getState(entityList[key], 'position').position
						var walk=noa.ents.getState(entityList[key], 'stats').walking
						
						socket.emit('move-mob', {hid:key,hpos: pos,hrot:rot,walking:walk,header:rothead})
										
									}
								
								
					  }
					  
					
					 }
				}, 10)
            
			//socket.emit('move', {pos: noa.ents.getState(noa.playerEntity, 'position').position, rot: noa.camera.heading})
			 
			
			
			
				
				

			setTimeout(function() {
				setInterval(async function() {
					
					
						
					
					if (chunkList.length != 0) {
						setChunk(chunkList[0][0], chunkList[0][1], noa,socket)
						chunkList.shift()
					}
					
				}, 50)
			}, 500)
              var timerPos = 0
			noa.on('tick', function() {
				timerPos = timerPos + 1
				if (timerPos == 1) {
					timerPos = 0
					var pos = noa.ents.getState(noa.playerEntity, 'position').position
					var rot = noa.camera.heading
					
					var headrot=noa.ents.getState(noa.playerEntity, noa.entities.names.mesh).mesh._children[0]._rotation
					var bodyrot=noa.ents.getState(noa.playerEntity, noa.entities.names.mesh).mesh._rotation
					var rotarm=noa.ents.getState(noa.playerEntity, noa.entities.names.mesh).mesh._children[1]._rotation
					var rotarm2=noa.ents.getState(noa.playerEntity, noa.entities.names.mesh).mesh._children[2]._rotation
					var rotleg=noa.ents.getState(noa.playerEntity, noa.entities.names.mesh).mesh._children[3]._rotation
					var rotleg2=noa.ents.getState(noa.playerEntity, noa.entities.names.mesh).mesh._children[4]._rotation
				    var pfired=noa.ents.getState(noa.playerEntity, 'mesh').fired
				
				
					
					if (JSON.stringify(lastPos) != JSON.stringify(pos) || JSON.stringify(lastRot) != JSON.stringify(rot)  ) {
						lastPos = [...pos]
						lastRot = JSON.parse( JSON.stringify(rot) )
                     
						socket.emit('move', {pos: pos, rot: rot,brot:bodyrot,hrot:headrot,arm:rotarm,arm2:rotarm2,leg:rotleg,leg2:rotleg2,fire:pfired})
					}
				}

			})
			
			
			noa.on('beforeRender', async function() {
				Object.values(entityList).forEach(async function (id) {
					
					if(noa.ents.getState(id, noa.entities.names.entmesh)==undefined){
						return;
					}
					
					
					var pos = noa.ents.getState(id, 'position').position
					var newPos = noa.ents.getState(id, 'position').newPosition
					if (noa.ents.getState(id, noa.entities.names.entmesh) != undefined && newPos != undefined && pos != undefined) {
						var move = vec3.create()	
						vec3.lerp(move, pos, newPos, 0.1)			
						var rot = noa.ents.getState(id, 'position').rotation
						noa.ents.setPosition(id, move)

						var oldRot = noa.ents.getState(id, noa.entities.names.entmesh).mesh.rotation.y

						if (rot/2 - oldRot > 5) {
							noa.ents.getState(id, noa.entities.names.entmesh).mesh.rotation.y = rot/2;
						//noa.ents.getState(id, noa.entities.names.entmesh).moving=true;
						}
						else {
							noa.ents.getState(id, noa.entities.names.entmesh).mesh.rotation.y = (rot/2 + oldRot)/2;
						//noa.ents.getState(id, noa.entities.names.entmesh).moving=false;
						}
						
						//var handrot= noa.ents.getState(id, noa.entities.names.entmesh).mesh._children[1].rotation.x
						//noa.ents.getState(id, 'movement').moving=true

						/*if (noa.ents.getState(id, 'model').nametag != undefined) {
							noa.ents.getState(id, 'model').nametag.rotation.y = noa.camera.heading - noa.ents.getState(id, noa.entities.names.entmesh).mesh.rotation.y
							noa.ents.getState(id, 'model').nametag.rotation.x = noa.camera.pitch

						}*/
					}
				})
			})

		})
	
	})
    
	socket.once('disconnect', function() {
		
		stopgame()
		
	})
	
	


}

function stopgame(){
	
	
	
	document.body.innerHTML = '' 
		var div = document.createElement('div')
		var style = 'position:fixed; bottom:50%; left:50%; z-index:2;'
		style += 'color:white; height:auto; width:auto; text-shadow: 1px 1px #000000;'
		style += 'font-size:20px; padding:3px; text-aling:center;'
		style += 'min-width:2em; transform: translate(-50%, 50%);'

		div.style = style
		
		var h3 = document.createElement('h3')
		h3.innerText = "Disconnected!"

		var reason = document.createElement('div')

		if (discreason != undefined) reason.innerHTML = parseText(discreason)
		else reason.innerHTML = 'Connection has been closed'

		div.appendChild(h3)
		div.appendChild(reason)

		document.body.appendChild(div)
}


			
			
			
			
