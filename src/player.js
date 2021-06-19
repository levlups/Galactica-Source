

import {addhat,addcape,addboots,addbackpack,addshield} from './armor'
import {makestarfield,makemoon} from './weather'
import {makecanvas,updateinv} from './canvas'
import {makefishrod} from './fishing'
import {make3Ditem} from './make3Ditem'
import {cartforce} from './cartaction'

const { makeNoise2D, makeNoise3D } = require('open-simplex-noise')

import { makeparticle,makeparticlearrow,makedebris,makedebrispos,makeslash} from './particle'
import { playSound } from './sound'
import { setupGamepad } from "./gamepad"
import { sendFromInput } from "./gui/chat"
import { isMobile } from 'mobile-device-detect'
import { setupMovement } from './movement'
import { mesher} from './mesher'
//import { make3d} from './bigmesher'
import { updateInventory,addheart } from './gui/inventory'
import { getlistplayers } from './game'
import { wave } from './wateranim'

import { fireaction } from './mouse/fireaction'
import { altfireaction,removerenderitem } from './mouse/altfireaction'//////
var noa

const screenshot = require("canvas-screenshot")
var blockinterv=null
global.mainplayer=null
global.screenclone=null
global.cartdirection=null
global.currentUI=null;
global.rt2=null
var breakanim=null
var pp=[]
var initialpp=[]

var projectile=null
var mesh=null
var ppready=true;
var snowballmesh=null
var firstmesh=null
var coolnum=1;
var camera=null;
var villageon=false;
var flyingup=false
var flyingdown=false

global.onrail=false
global.oncanon=false
global.onrocket=false

var goingN=false
var goingS=false

var goingR=false
var goingL=false
var velo=0

global.pickedID=0;

var gliding=false

global.cape=null
global.boot=null
global.hat=null
global.hat2=null

global.numhits=0;
var checkingdoors=false


global.projectiles = {}
global.cubes = {}


var mouseX=null
var mouseY=null
global.partmesh=null
global.sweet=null

var sleeping=false
global.swimming=false
var move= false // airjumps , player jump info

global.hand=null;
global.cooling=false;

document.addEventListener('mousemove', logKey);

function logKey(e) {
	
	if(currentUI!==uis.inventory){
		return;
	}
	if(screenclone==null){
		return;
	}
	
	if(document.pointerLockElement!==null){
		screenclone._children[0].rotation.x=-Math.PI/2
		screenclone._children[0].rotation.y=0
		return;
	}

	
	var c=window.innerWidth/2
	var d=window.innerHeight/2
	   var bottom, left, right, tap, wych_x, wych_y, xoff, yoff;
	xoff=e.screenX - window.innerWidth / 2 + c//112;
	yoff=e.screenY - window.innerHeight / 2 + d//170;
	
	 left = xoff / (window.innerWidth / 2 +c) //112);
            right = xoff / (window.innerWidth / 2 -c)// 112);
            tap = yoff / (window.innerHeight / 2 - d)//170);
            bottom = yoff / (window.innerHeight / 2 +d)// 170);
            /*wych_x = Math.PI / 3;
            wych_y = Math.PI / 4;*/
			
			   wych_x = Math.PI/0.9 ;
            wych_y = Math.PI/4
			
			
			if (xoff > 0) {
			screenclone.rotation.y=-(e.screenX-(window.innerWidth / 2))/900
			}else{
				
					screenclone.rotation.y=0
			}
			
			
		
           if (yoff > 0) {
               screenclone._children[0].rotation.x =
                    (wych_y * bottom)-Math.PI/2;
					
					screenclone._children[0].rotation.y =
                    -(wych_x * left)+Math.PI/2;
            } else {
                screenclone._children[0].rotation.x =
                    (wych_y * tap)-Math.PI/2;
					
					screenclone._children[0].rotation.y =
                    -(wych_x *right)+Math.PI/2;
            }
			
	
 
}
var schema1=null

var schema2=null

var housedata=[]

var heightNoise=null
 
 
 

 
function getBiome(x, z/*, temperature, biomerng*/) {
		
		var temperature=heightNoise(x/100, z/100)*20
		var biomerng=heightNoise(x/20, z/20)*30
		if (0.2 < temperature && biomerng < 0.3) return 'desert'
		else if ( 1 < temperature < -0.2 && biomerng < 0.1) return 'iceland'
		else if ( 0.3 < temperature < 0.3 && biomerng < 0.2) return 'plants'
		else return 'plants'
	}
//var num=0

export function prepitems(noa,data,blockdata){
	var scene=noa.rendering.getScene()

			var denom=Object.keys(blockdata).length
			
			
			Object.entries(blockdata).map(blockitem => {
				
								//num++
								//console.log("loading items"+Math.round(((num/denom))*100)+"%")
								
								
								if(blockitem[1].type==0){
									
									
								makeBigMesh(noa, scene, blockitem[1].texture, blockitem[1].name)
								}
})
			
			
			Object.entries(data).map(item => {
				
				

  
  if (item[1].type == "block-flat") {
					
					
					mesher(scene,item[1])
					
				}
				
				if (item[1].type == "block-flat3d") {
					
					
					make3Ditem(scene,item[1].name)
					
				}
				
				
				
})
			    
	
}



export function setupControls(noa, socket) {
	
  setInterval(function(){ 
noa.check(socket)
 }, 10000);
	makecanvas(noa,socket)
	
	window.addEventListener("keydown", function(evt) {
  // Press Z
  if (evt.keyCode === 90) {//Z
   var div = document.getElementById('game_version')
  if(div.style.display=='none'){
   
	div.style.display='block'
  }else{
	  div.style.display='none'
  }
	
	
  }
});



	
	
	/*var border= new BABYLON.MeshBuilder.CreateBox("box", {height:200,width:1000,depth:1000}, scene);
	
	var mat = noa.rendering.makeStandardMaterial('sike')

	border.material=mat
	border.material.backFaceCulling=false
		var tex= new BABYLON.Texture(mod+"entity/border.png", scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
		mat.diffuseTexture=tex
		
		noa.rendering.addMeshToScene(border,false)
		
		
	    border.position.x=0
		border.position.y=100
		border.position.z=0
		
		
			mat.diffuseTexture.vScale = 0.5;
			
			setInterval(function(){ 
     tex.vOffset -= 0.5;
	 
     }, 500);*/
	setTimeout(function(){
	mac()
	}, 5000);
	function mac(){
	
	
	pickedID = noa.ents.getState(eid, 'inventory').selected
		
			
			//console.log(pickedID)
				///// added this ////////
				
				if(pickedID!==-1){
				var item=noa.ents.getState(noa.playerEntity, 'inventory').main[pickedID].id
				var c=noa.ents.getState(noa.playerEntity, 'inventory').selected
				var inv=noa.ents.getState(noa.playerEntity, 'inventory').main
			
				if (items[item]==undefined) {
								if (pickedID >= game.hotbarsize) pickedID = 0
						else if (pickedID < 0) pickedID = 8
						socket.emit('inventory-click', {slot: pickedID, type: 'select'} )
						noa.ents.getState(noa.playerEntity, 'inventory').selected = pickedID
						
		
						
						gethand(noa,'hand',mainplayer)
		                gethand(noa,'hand',screenclone)
						return;
				}
				
				
					if (items[item].type == 'block-flat') {
				  gethand(noa,item,mainplayer)
		          gethand(noa,item,screenclone)
		  
		  //getthirdperson(noa,mainplayer)
					}
				
				else{
					
					if(cubes[blockIDs[item]]==undefined){
						cubes[blockIDs[item]]=makeBigMesh(noa, scene, blocks[blockIDs[item]].texture, blocks[blockIDs[item]].name)
					}
					//makeBigMesh(noa, scene, blocks[id].texture, blocks[id].name)
				
					cubehand(noa,blockIDs[item],mainplayer,item)
					cubehand(noa,blockIDs[item],screenclone,item)
					
				}
				}
				if (items[item]!==undefined) {
								if (items[item].name== 'bow'){
							noa.ents.getState(noa.playerEntity, 'mesh').bow=true
						}else{
							noa.ents.getState(noa.playerEntity, 'mesh').bow=false
						}					
				}
	}

	

	
	
	
	
	

	


	

	
	

	//makesky(scene)
	scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
//scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
//scene.fogDensity = 0.1; //was 0.01
scene.fogDensity = 0.002; //was 0.01 //water = 0.08 // lava=0.2
scene.fogStart = 1999;
scene.fogEnd = 2000;

//scene.fogStart = 1;
//scene.fogEnd = 20;
scene.fogColor = new BABYLON.Color3(0, 0,0)

//scene.fogColor = new BABYLON.Color4(0, 0, 0,0.6);
scene.fogEnabled=false;

scene.lights[0].diffuse.r=1/10;
	 scene.lights[0].diffuse.g=1/10;
	 scene.lights[0].diffuse.b=1/10;
	 scene.lights[0].groundColor=new BABYLON.Color3(0.1, 0.1, 0.1);


	firstmesh = BABYLON.Mesh.CreatePlane('cool', 1, scene)
	 var mat = noa.rendering.makeStandardMaterial('sike')
	
	for (var i=0;i<8;i++){
		
		
	
	
	  
	  mesh=firstmesh.clone('cool')
	  coolnum=1;
	 coolnum=Math.random()*0.5;
		
		mesh.scaling= new BABYLON.Vector3(coolnum, coolnum, coolnum);
	
mesh.material=mat
mat.backFaceCulling=false
mesh.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL
	noa.rendering.addMeshToScene(mesh, false)
	initialpp.push(mesh)
	
	}
	
	
	
	//setupMovement(noa)
	
	//camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 0, -10), scene);
	  // console.log(camera);
	 //scene.activeCamera = camera;
	/*var camera2 = new BABYLON.ArcRotateCamera("Camera", 0, 0,100, new BABYLON.Vector3(0, 0, 0), scene);
	   rt2 = new BABYLON.RenderTargetTexture("depth",720, scene, false, false,BABYLON.Texture.NEAREST_SAMPLINGMODE);
			var mon2mat = new BABYLON.StandardMaterial("texturePlane", scene);
    mon2mat.diffuseColor = new BABYLON.Color3(1,1,1);
	 mon2mat.ambientColor = new BABYLON.Color3(1,1,1);
    mon2mat.diffuseTexture = rt2;
	//var taco2=noa.ents.getState(noa.playerEntity, noa.entities.names.mesh).mesh
	rt2.renderList = scene.meshes;
	 scene.customRenderTargets.push(rt2);
	rt2.activeCamera = camera2;
	
	var mon2 = BABYLON.Mesh.CreatePlane("plane", 512/10, scene);
	noa.rendering.addMeshToScene(mon2, false)
	mon2.material=mon2mat
	mon2mat.diffuseTexture=rt2;
	mon2.position.y=40;*/


					
	 
	

	
	
	var eid = noa.playerEntity
var body=noa.ents.getPhysicsBody(eid)



var pos = noa.ents.getState(eid, 'position').position

	noa.blockTargetIdCheck = function(id) {
		if (blocks[id] != undefined) {
			
			if(items[blocks[id].name] == undefined){
			

				return false
			}
			if(items[blocks[id].name].name == 'fire'){
			

				return true
			}
			if(items[blocks[id].name].name == 'barrier'){
			
                  console.log('barrier')
				return true
			}
			if(items[blocks[id].name].type == 'block-flat'){
			

				return false
			}
			if(items[blocks[id].name].type == 'block-water'){
			

				return false
			}
			
			//if (blocks[id].options.fluid == true) return false
			return true
			
			
			
		}
		else return false
	}

	noa.inputs.preventDefaults = true
	
	
	noa.inputs.up.on('fly', function () {
	     
			 noa.ents.getState(noa.playerEntity, 'movement').isFlying =! noa.ents.getState(noa.playerEntity, 'movement').isFlying
		if(noa.ents.getState(noa.playerEntity, 'movement').isFlying==true){
			
			mainplayer.rotation.x=0
		}
	
		
	})
	
	noa.inputs.down.on('jump', function () {
		
	
		if(body.resting[1]==0){
			
		//gliding=true
		}
		
		if(sleeping){
					mainplayer.rotation.x=0
					sleeping=false
				}
	     
			
			if( noa.ents.getState(noa.playerEntity, 'movement').isFlying){
				
				flyingup=true
	
			}
		
		
	})
	
	
	noa.inputs.up.on('jump', function () {
		
	
		flyingup=false
		
	})
	



setInterval(function(){ 

//socket.emit('wantent',{position:[0,30,0],type:'bokkusu'});
 }, 15000);


	noa.inputs.down.on('action', function () { // Q
	     
			var pos=noa.ents.getPosition(noa.playerEntity)
		var matrixangle=noa.camera.getDirection()
			
			
			var inv=noa.ents.getState(noa.playerEntity, 'inventory').main 
		  var sel=noa.ents.getState(noa.playerEntity, 'inventory').selected
		var item=noa.ents.getState(noa.playerEntity, 'inventory').main[sel].id
		
		
		if(items[item]==undefined){
			return;
		}
		
		
	if (items[item].type == 'block-flat') {
					socket.emit('threw-item',{name:item,position:pos,angle:matrixangle,force:3});
		
		noa.soundy('/random/bow.ogg', 0.5, null, noa)
		if(inv[sel].count==1){
		removerenderitem(noa,mainplayer)
		removerenderitem(noa,screenclone)
		}
					
				}else{
					
					socket.emit('threw-item',{name:item,position:pos,angle:matrixangle,force:6});
					
				}
		
		
		
		
	})
	
	noa.inputs.down.on('backward', function () {
		
		checkingdoors=false
		
			var body = noa.entities.getPhysicsBody(noa.playerEntity)
                body.mass=1
		cartdirection=null
	   
		
		
	})
	
	noa.inputs.up.on('forward', function () {
		
		//checkingdoors=false
		
	})
	
	noa.inputs.down.on('forward', function () {
		checkingdoors=true
		
		if(rideview(noa)=='north'){
		cartdirection='north'
		}
		if(rideview(noa)=='south'){
		cartdirection='south'
		 }
		
		if(rideview(noa)=='east'){
		cartdirection='west'
		 }
		
		if(rideview(noa)=='west'){
		cartdirection='east'
		 }
		
	     if(noa.ents.getState(noa.playerEntity, 'movement').isBoating){
			
		 }
	
		
	})
	
	
	
	noa.inputs.down.on('left', function () {
		checkingdoors=true
		
	     
			if(noa.ents.getState(noa.playerEntity, 'movement').isBoating){
			noa.ents.getState(noa.playerEntity, 'movement').boatrotation-=0.1
		 }
	
		
	})
	
	noa.inputs.down.on('right', function () {
		checkingdoors=true
		
		
		if(noa.ents.getState(noa.playerEntity, 'movement').isBoating){
			noa.ents.getState(noa.playerEntity, 'movement').boatrotation+=0.1
		 }
	     
			/*if(onrail==true){
				
				
			goingN=false		
		goingS=false
		goingR=true
		goingL=false
			}*/
		
		
		
	})
	
	noa.inputs.down.on('sprint', function () {
		cooling=true
		
	
			if( noa.ents.getState(noa.playerEntity, 'movement').isFlying){
		flyingdown=true
			}
	})
	
	noa.inputs.up.on('sprint', function () {
		cooling=false
		///kneeling
		/*mainplayer._children[5].rotation.x=Math.PI/8
		mainplayer._children[5].position.z+=0.25
		mainplayer._children[0].position.z+=0.25
		mainplayer._children[1].position.z+=0.25
		mainplayer._children[2].position.z+=0.25
		
		mainplayer._children[5].position.y-=0.2
		mainplayer._children[0].position.y-=0.2
		mainplayer._children[1].position.y-=0.2
		mainplayer._children[2].position.y-=0.2
		
		mainplayer._children[3].position.y-=0.2
		mainplayer._children[4].position.y-=0.2*/
		
		//addbackpack('backpack' ,mainplayer)
		//addshield('backpack' ,mainplayer)
		body.mass=1
		body.gravityMultiplier=1
		
		mainplayer._children[1].rotation.x= -Math.PI/2//left leg 
		mainplayer._children[1].rotation.y=0//
		mainplayer._children[1].rotation.z=0
		
		
	
		mainplayer._children[2].rotation.x= -Math.PI/2// right leg
		mainplayer._children[2].rotation.y= 0
		mainplayer._children[2].rotation.z=0
	
		mainplayer._children[3].rotation.x= -Math.PI/2//right arm
		mainplayer._children[3].rotation.y= 0
		mainplayer._children[3].rotation.z=0
		
		mainplayer._children[4].rotation.x= -Math.PI/2// left arm
		mainplayer._children[4].rotation.y= 0
		mainplayer._children[4].rotation.z=0
		//body.restitution=0
		if(noa.ents.getState(noa.playerEntity, 'receivesInputs')==undefined){
				 noa.entities.addComponent(noa.playerEntity, noa.ents.names.receivesInputs);

				}
				
			
		noa.ents.getState(noa.playerEntity, 'movement').isBoating=false
			 noa.ents.getState(noa.playerEntity, 'mesh').isRiding=false
			  noa.ents.getState(noa.playerEntity, 'mesh').hover=false
			    noa.ents.getState(noa.playerEntity, 'mesh').sitting=false
			  
			    noa.ents.getState(noa.playerEntity, 'mesh').sleeping=false
			
			 	onrail=false
				oncanon=false
				
				if(onrocket){
				onrocket=false
	
				}
				 var c=noa.ents.getState(noa.playerEntity, 'mesh').wichrideable
				if(c!==null){
			noa.ents.removeComponent(entityList[c], 'followsEntity')
		  var pos=noa.ents.getState(noa.playerEntity, 'position').position
				 
					noa.entities.setPosition(entityList[c],pos)
				
			 }
		
		
			 
			 
			 
			 
	
			if( noa.ents.getState(noa.playerEntity, 'movement').isFlying){
		flyingdown=false
			}
	})
	
	
	
      socket.on('changingallarmor',async function(data){
		  console.log('hand :'+JSON.stringify(data))//
		  
		  if(entityIgnore!==data.id){
							var mesh=noa.ents.getState(entityList[data.id], 'entmesh').mesh
						if(data.helmet!=='none'){
					    addhat(data.helmet,mesh)
							}
						if(data.cape!=='none'){
						addcape(data.cape,mesh)
						}
						if(data.hand!=='none'){
						gethand(noa,data.hand,mesh)
						}										
			
		  }
		  
	   })
	  
	  
	 
	 socket.on('echo-threw-item', async function(data) {
		
		
		 drop(noa,data.name,data.position,data.angle,socket,data.force)
		  
		  //gethand(noa,data.name,mainplayer)
		  //gethand(noa,data.name,screenclone)
	 })
	 
	 
	// on left mouse, set targeted block to be air
	noa.inputs.down.on('fire', function () {
		
		noa.ents.getState(noa.playerEntity, 'mesh').fired = true
		//       fireaction
		fireaction(noa,socket)
		if(noa.targetedBlock==null){
			return;
		}
		
		var c=noa.getBlock(noa.targetedBlock.position[0],noa.targetedBlock.position[1]+1,noa.targetedBlock.position[2])
		if(blocks[c]!==undefined){
		
		
		
		
		
		
		}
		
		
		
		if (noa.targetedBlock.adjacent) {
			
			var t=noa.getBlock(noa.targetedBlock)
			
		
		
	
			if(blocks[noa.targetedBlock.blockID].name=='fire'){
				
			
				 coolparticle(noa,noa.targetedBlock.position,'big_smoke_0',0.8,1)
				 socket.emit('block-break', noa.targetedBlock.position)
				 animate=false
				
			}
			
			
			
		}
		

		
		blockinterv=setInterval(function(){ 
		if (noa.targetedBlock) {
			
			var c=noa.getBlock(noa.targetedBlock.position[0],noa.targetedBlock.position[1],noa.targetedBlock.position[2])
								if(blocks[c]==undefined){
									
									return;
								}
			
		
			
			
		
		var p=noa.getBlock(noa.targetedBlock.position[0],noa.targetedBlock.position[1]+1,noa.targetedBlock.position[2])
		

								
								var c=noa.getBlock(noa.targetedBlock.position[0],noa.targetedBlock.position[1],noa.targetedBlock.position[2])
								if(blocks[c]!==undefined){
		
	
		
		wave(noa.targetedBlock.position[0],noa.targetedBlock.position[1],noa.targetedBlock.position[2],socket)
								}
		
		
		//makedebris('item/'+blocks[p].id,mainplayer,scene,2,0.5)
		/*var tex = new BABYLON.Texture(mod+"textures/particle/"+numhits+".png", scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
		tex.hasAlpha=true
		//console.log(noa.rendering._highlightMesh.material)
		noa.rendering._highlightMesh.material.alpha=1
		noa.rendering._highlightMesh.material.diffuseTexture=tex*/
		numhits++
		
		var k=noa.getBlock(noa.targetedBlock.position[0],noa.targetedBlock.position[1],noa.targetedBlock.position[2])
			//makedebris('block/dirt',noa.rendering._highlightMesh,scene,2,0.5)
			
			var c=noa.rendering._highlightMesh
				if(blocks[k]!==undefined){
				//jsoninfo[blocks[k].name].particle
			//makedebris(jsoninfo[blocks[k].name].particle,c,scene,1,0.2)
			makeslash('particle/slash',c,scene,1,1)
			makeslash('particle/slash1',c,scene,1,1)
			makeslash('particle/slash2',c,scene,1,1)
			//makeslash('particle/slash1',c,scene,4,0.2)
			//makeslash('particle/slash2',c,scene,4,0.2)
			
				}
		if(numhits>10){
			numhits=0
		}
		if(numhits<10){
			return;
		}
		if(blocks[p]!==undefined){
			
			if(items[blocks[p].name].type == 'block-flat'){
				socket.emit('block-break', [noa.targetedBlock.position[0],noa.targetedBlock.position[1]+1,noa.targetedBlock.position[2]])
				animate=true
				numhits=0
				return;
			}
			
		}
			//numhits++
			
			//console.log(breakanim.position)
			/*breakanim.position._x=0//noa.targetedBlock.position[0]
			breakanim.position._y=50//noa.targetedBlock.position[1]+1
			breakanim.position._z=0//noa.targetedBlock.position[2]*/
			/*if(numhits>3){
            socket.emit('block-break', noa.targetedBlock.position)
			numhits=0
			}*/
			
			
			 socket.emit('block-break', noa.targetedBlock.position)
			 numhits=0
			if(villageon==false){
			  village(noa.targetedBlock.position[0],noa.targetedBlock.position[1],noa.targetedBlock.position[2],noa,socket)
			  villageon=true;
			}
			
	
		
			
		}
		}, 250);
		socket.emit('click-left', true)
		const entClick = castRay();
		if (!!entClick){
		//	console.log(entClick)
			//socketSend('ActionClickEntity', { type: 'left', uuid: entClick[0], distance: entClick[1] });
			//console.log(entClick[1])
			if(entClick[1]<noa.camera.zoomDistance+4){
				
				if(entClick[2]=='boat'){
					socket.emit('despawn',entClick[0]);
					
						if(Math.random()<loottable['boat'].chance){
								
								var pos=noa.ents.getState(entityList[entClick[0]], 'position').position
							flatcubic(pos[0],pos[1],pos[2],loottable['boat'].item,socket,0.8)
							noa.ents.getState(noa.playerEntity,'mesh').isRiding=false
							noa.ents.getState(noa.playerEntity,'movement').isBoating=false
							// socket.emit('block-stepped', {ids:'boat'})
							}
				}else{
					
					  var body = noa.entities.getPhysicsBody(noa.playerEntity)
	  
	   socket.emit('hitentity',{id:entClick[0],strength:[Math.floor(body.velocity[1]+1),Math.floor(body.velocity[1]+1),Math.floor(body.velocity[2]+1)]});
			//socket.emit('hitentity',{id:entClick[0]});
				}
				
			
			
			
			
	
			}
			
			//console.log('tap'+entClick[0])
			var superentityList =getlistplayers()
			//console.log(superentityList)
			if (superentityList[entClick[0]] != undefined) {
				//noa.ents.getState(superentityList[entClick[0]], noa.entities.names.entmesh).mesh.material.diffuseColor= BABYLON.Color3.Red()
			}
			
			
			
			
			
			
			
		}
			// socketSend('ActionClickEntity', { type: 'left', uuid: entClick[0], distance: entClick[1] });
	})






	noa.inputs.up.on('fire', function () {
		/*if (noa.targetedBlock){
		superray(noa.targetedBlock.position)
		}*/
		var pos=noa.ents.getPosition(noa.playerEntity)
		//console.log(pos)
		
		
		if (blockinterv != null) {
			
			
			clearInterval(blockinterv)
			
			
			
		}
		//stopBreakingBlock()
		noa.ents.getState(noa.playerEntity, 'mesh').fired = false
	})


	// place block on alt-fire (RMB/E)
	noa.inputs.down.on('alt-fire', function () {
		noa.ents.getState(noa.playerEntity, 'mesh').fired = true
			altfireaction(noa,socket,blockinterv,blocklook)	
		blockinterv=setInterval(function(){ 
		altfireaction(noa,socket,blockinterv,blocklook)
	
			}, 500);
	
	})
	
	function superray(pos){
		var pickResult = scene.pick(window.innerWidth/2, window.innerHeight/2);
		
		console.log(pickResult)
		
	}
	
	noa.inputs.up.on('alt-fire', function () {
		if (blockinterv != null) {
			
			
			clearInterval(blockinterv)
			
			
			
		}
		noa.ents.getState(noa.playerEntity, 'mesh').fired = false
		
		
	})


	// pick block on middle fire (MMB/Q)
	noa.inputs.down.on('mid-fire', function () {
		if (noa.targetedBlock && noa.targetedBlock.blockID != 0) {
			var item = blocks[noa.targetedBlock.blockID].name
			var slot = inventoryHasItem(noa.playerEntity, item, 1)
			var sel = noa.ents.getState(eid, 'inventory').selected
			if (slot != -1 && slot < 9) {
				socket.emit('inventory-click', { type: 'select', slot: slot })
				noa.ents.getState(eid, 'inventory').selected = slot
			}
			else if (slot != -1) socket.emit('inventory-click', { type: 'switch', slot: slot, slot2: sel })
		}
	})


noa.inputs.down.on('social', function () {
	noa.ents.getState(noa.playerEntity,'mesh').thirdp= ! noa.ents.getState(noa.playerEntity,'mesh').thirdp
		})
	// 3rd person view
	noa.inputs.down.on('thirdprsn', function () {
		
		
		getthirdperson(noa,mainplayer,false)
		 /*var sel=noa.ents.getState(noa.playerEntity, 'inventory').selected
		var item=noa.ents.getState(noa.playerEntity, 'inventory').main[sel].id//
		
		if (items[item].type == 'block-flat') {
				
		  
		  getthirdperson(noa,mainplayer,false)
					}else{
						 getthirdperson(noa,mainplayer,true)
					}*/
				
		
		
		if (document.pointerLockElement == noa.container.canvas) {

		if (noa.camera.zoomDistance == 10){ noa.camera.zoomDistance = 0;
		
		if(hat!==null){
		hat.visibility=false
		}
		/*if(mainplayer._children[0].getChildren()>0){
			console.log('loluuuu')
				hat.visibility=false
			}*/
		noa.ents.getState(noa.playerEntity, 'mesh').mesh._children[0].visibility=false
		noa.ents.getState(noa.playerEntity, 'mesh').mesh._children[1].visibility=false
		noa.ents.getState(noa.playerEntity, 'mesh').mesh._children[2].visibility=false
		noa.ents.getState(noa.playerEntity, 'mesh').mesh._children[3].visibility=false
		noa.ents.getState(noa.playerEntity, 'mesh').mesh._children[4].visibility=false
		noa.ents.getState(noa.playerEntity, 'mesh').mesh._children[5].visibility=false
		}//._children[0].visibility =false;
		else if (noa.camera.zoomDistance == 0) {
			
			noa.camera.zoomDistance = 10
			if(hat!==null){
			hat.visibility=true
			}
			
			noa.ents.getState(noa.playerEntity, 'mesh').mesh._children[0].visibility=true
		noa.ents.getState(noa.playerEntity, 'mesh').mesh._children[1].visibility=true
		noa.ents.getState(noa.playerEntity, 'mesh').mesh._children[2].visibility=true
		noa.ents.getState(noa.playerEntity, 'mesh').mesh._children[3].visibility=true
		noa.ents.getState(noa.playerEntity, 'mesh').mesh._children[4].visibility=true
		noa.ents.getState(noa.playerEntity, 'mesh').mesh._children[5].visibility=true
		}
	
		}
		//noa.ents.getState(noa.playerEntity, 'mesh').thirdp = !noa.ents.getState(noa.playerEntity, 'mesh').thirdp
	//}
	})

	// Inventory
	noa.inputs.down.on('inventory', function () {	
	
	if(currentUI==uis.chest){
		var chest=noa.ents.getState(noa.playerEntity, 'mesh').chest
				noa.ents.getState(chest, 'mobinventory').opened=false
	}
	tooltip=''
	heldItem=null
	heldItemType=null
	heldItemCount=0
	//updateInventory(noa)
//cooleffect(noa)
//return;
// var sel=noa.ents.getState(noa.playerEntity, 'inventory').selected
	 // socket.emit('block-stepped', {ids:0})
	//socket.emit('inventory-click', {slot: sel, type: 'select'} )
	
	if(currentUI==uis.hotbar){
	currentUI=uis.inventory
	document.exitPointerLock()
	updateinv(noa)
	}else{
		currentUI=uis.hotbar
		noa.container.canvas.requestPointerLock()
			tooltip=''
	heldItem=null
	heldItemType=null
	heldItemCount=0
	}
	//document.exitPointerLock()
	//noa.container.canvas.requestPointerLock()
	return;
		var inv = document.getElementById('game_inventory_screen')
		var input = document.getElementById('game_chatinput')

		if (input.style.display != 'none') {}
		else if (inv.style.display == 'none') {
			document.exitPointerLock()
			inv.style.display = 'initial'
		}
		else {
			noa.container.canvas.requestPointerLock()
			inv.style.display = 'none'
		}
		updateInventory(noa)
	
	
	})
	
	
	/*noa.inputs.down.on('inventory', function () {	
	

	  socket.emit('block-stepped', {ids:0})
	//socket.emit('inventory-click', {slot: 1, type: 'select'} )
		var inv = document.getElementById('game_chest_screen')
		var input = document.getElementById('game_chatinput')

		if (input.style.display != 'none') {}
		else if (inv.style.display == 'none') {
			document.exitPointerLock()
			inv.style.display = 'initial'
		}
		else {
			noa.container.canvas.requestPointerLock()
			inv.style.display = 'none'
		}
	})*/

	noa.inputs.down.on('chat', function() {
		var input = document.getElementById('game_chatinput')
		if (input.style.display == 'none') {
			document.exitPointerLock()
			noa.inputs.preventDefaults = false
			input.style.display = 'initial'
			input.focus()
			setInterval( function() {
				if (document.activeElement.id != 'game_chatinput') {
					input.style.display = 'none'
					noa.inputs.preventDefaults = true
					return
				} 
			}, 500)
		}	
	})

	var pause = false
	noa.inputs.down.on('menu', (e) => {
		

		var inv = document.getElementById('game_inventory_screen')
			var chest = document.getElementById('game_chest_screen')
		var input = document.getElementById('game_chatinput')
		var menu = document.getElementById('menu_pause')


		if (input.style.display != 'none') {
			noa.container.canvas.requestPointerLock()
			input.style.display = 'none'
			return
		} else if (inv.style.display != 'none') {
			noa.container.canvas.requestPointerLock()
			inv.style.display = 'none'
			chest.style.display = 'none'
			return
		} else if (menu.style.display != 'none') {
			noa.container.canvas.requestPointerLock()
			menu.style.display = 'none'
			return
		} else{
			menu.style.display = 'initial'
		
			return
		}
	})

	document.addEventListener('pointerlockchange', function() {
		if (document.pointerLockElement == noa.container.canvas) {
			var menu = document.getElementById('menu_pause')
			menu.style.display = 'none'
		}
	}, false)


	noa.inputs.down.on('chatenter', function() {
		var input = document.getElementById('game_chatinput')
		if (input.style.display != 'none') { 
		
		if(input.value=='schema1'){
			if(schema1==null){
				var pos=noa.ents.getPosition(noa.playerEntity)
				schema1=[Math.floor(pos[0]),Math.floor(pos[1]),Math.floor(pos[2])]
				//alert(schema1)
			}
			
			return;
		}
		if(input.value=='schema2'){
			
			if(schema2==null){
				var pos=noa.ents.getPosition(noa.playerEntity)
				schema2=[Math.floor(pos[0]),Math.floor(pos[1]),Math.floor(pos[2])]
				buildschema(schema1,schema2)
				schema1=null
				schema2=null
				//alert(schema2)
			}
			return;
		}
		if(input.value=='build'){
			
			if(housedata.length>0){
				schemarun(socket)
			}
			return;
		}
		if(input.value=='make'){
			
			make('apple',socket)
			return;
		}
			sendFromInput(socket)
			noa.container.canvas.requestPointerLock()
			input.style.display = 'none'
			noa.setPaused(false)
		}
	})

	noa.inputs.down.on('tab', function () {
		document.getElementById('game_tab').style.display = 'initial'
	})

	noa.inputs.up.on('tab', function () {
		document.getElementById('game_tab').style.display = 'none'
	})

	noa.inputs.up.on('screenshot', function () {
		if (document.pointerLockElement == noa.container.canvas) {
			screenshot(noa.container.canvas, {filename: 'Galactica' + Date.now() + '.png'})
		}
	})
	if(noa.inputs.state.forward==true && body.inFluid && noa.ents.getState(noa.playerEntity, 'movement').isBoating){
				
			}
	

	// each tick, consume any scroll events and use them to zoom camera
	
	var inwater=false
	var playerpos=null
	noa.on('tick', async function () {
		
		
		if(cooling){
			if(!noa.targetedBlock){
				cooling=false
			}
		}
		
		
		if(checkingdoors){
		
		var entClicker=null
		entClicker = castRay();
		
		
					if (entClicker!==null){
					
						if(entClicker[2]=='door' ){
							if(noa.camera.zoomDistance==0){
									if(entClicker[1]<1){
								
									body.mass=0
									return;
									}
							}
							
							if(noa.camera.zoomDistance==10){
									if(entClicker[1]<10.5){
									
								
									body.mass=0
									return;
									}
							}
						}
						
						
					}

		}
		body.mass=1
		playerpos=noa.ents.getPosition(noa.playerEntity)
		if(onrocket & playerpos[1]<100){
			body.velocity[1]=6
		}
		if(playerpos[1]>100 & onrocket){
			body.velocity[0]=6
			
			
		}
		if(onrail){
			if(noa.getBlock(pos[0],pos[1],pos[2])!==blockIDs['rail']){
				body.friction=1000
			}
		}
		
		/*if (mainplayer.intersectsMesh(border, false)) {
 
} else{
	console.log('come back fool')
		noa.ents.setPosition(noa.playerEntity, [0,100,0])
}*/
		
		/*border.position.x=mainplayer.position.x
		border.position.y=mainplayer.position.y
		border.position.z=mainplayer.position.z*/
		if(body.inFluid){
			/*air-=0.01
			
			if(air<0){
				
				if(health>0){
				health-=0.01
				}
			}*/
			
		if( noa.ents.getState(noa.playerEntity, 'mesh').isRiding){
				var c=noa.ents.getState(noa.playerEntity, 'mesh').wichrideable
				
				if( noa.ents.getState(entityList[c], 'stats').name!=='boat'){
				noa.ents.removeComponent(entityList[c], 'followsEntity')
					//var pos=noa.ents.getState(noa.playerEntity, 'position').position
					noa.entities.setPosition(entityList[c],pos)
					noa.ents.getState(noa.playerEntity, 'mesh').isRiding=false
					noa.ents.addComponent(entityList[c], 'cowai')
				}
				
				
			}
				
		if( noa.ents.getState(noa.playerEntity, 'mesh').hover){
			noa.ents.getState(noa.playerEntity, 'mesh').hover=false
				var c=noa.ents.getState(noa.playerEntity, 'mesh').wichrideable
				noa.ents.removeComponent(entityList[c], 'followsEntity')
					var pos2=noa.ents.getState(noa.playerEntity, 'position').position
					noa.entities.setPosition(entityList[c],pos2)
				
				
				
			}
		}
					
		
		
		if(!body.inFluid){
			//air=10
			swimming=false
			
			if( inwater){
				inwater=false
				noa.soundy('liquid/splash1.ogg');
				 //coolparticle(noa,pos)
			}
		}
	
		if(body.resting[1]!==0){
			if(gliding){
				body.mass=1
				mainplayer.rotation.x=0
			gliding=false
			 noa.ents.getState(noa.playerEntity, 'movement').isFlying=false
			}
		}
		if(body.inFluid){
			
			if( !inwater){
				inwater=true
				noa.soundy('liquid/splash.ogg');
				 coolparticle(noa,pos,'bubble',3,0.3)
			}
			if(noa.ents.getState(noa.playerEntity, 'movement').isBoating==false){
				
				
			mainplayer.rotation.x=Math.PI/2
			}
			scene.fogColor = new BABYLON.Color3(.1, .1, .4)
			
			//body.ratioInFluid=0.1
		
			if(gliding){
				body.airDrag=-1
body.gravityMultiplier=1
				mainplayer.rotation.x=0
			gliding=false
			}
			
			
			
		}else{
			scene.fogColor = new BABYLON.Color3(1, 1, 1)
		}
		if(gliding){
			//move.jumpForce = 0
	//move.jumpImpulse = 0
			var matrixangle=noa.camera.getDirection()
			body.mass=0.1
			body.velocity[2]=matrixangle[2]*20
			body.velocity[0]=matrixangle[0]*20
			body.velocity[1]=matrixangle[1]*10
			mainplayer.rotation.x=Math.PI/2
		}
		
		/*if(noa.ents.getState(noa.playerEntity, 'mesh').isBoating==true){
			
				mainplayer._children[3].rotation.x=Math.PI/2
						mainplayer._children[4].rotation.x=Math.PI/2
			
	}*/
		if(flyingup){
			body.velocity[1]=4
		}
		
		if(flyingdown){
			body.velocity[1]=-4
			
		}
		
		
		
		if(noa.inputs.state.forward==true && body.inFluid ){
					
						
					
						//mainplayer.rotation.x=Math.PI/2
					
					if(noa.ents.getState(noa.playerEntity, 'movement').isBoating==false){	
					
						
						swimming=true
					
						move.airJumps = 9999
					var matrixangle=noa.camera.getDirection()
		
			body.velocity[2]=matrixangle[2]*7
			body.velocity[0]=matrixangle[0]*7
			body.velocity[1]=matrixangle[1]*10
					}
					
			}	
			
		
		
		
			
		if(noa.inputs.state.forward==false && body.inFluid){
				//mainplayer._children[0].rotation.x=0
				swimming=false
				
				move.airJumps = 0
			}	
			
		
		//camera.rotation._x=mousey/100
		//camera.rotation._y=mousex/100
		var scroll = noa.inputs.state.scrolly
		if (scroll !== 0) {
			// pickedID = noa.ents.getState(eid, 'inventory').selected
		
			var change = (scroll > 0) ? 1 : -1
			pickedID = pickedID + change
			
			
			
						/*if( hand!==null){
		                  hand.dispose()
	                          }*/
							  
						
				///// added this ////////
				
				if(pickedID!==-1 && pickedID!==9){
					
					
				var item=noa.ents.getState(noa.playerEntity, 'inventory').main[pickedID].id
				var c=noa.ents.getState(noa.playerEntity, 'inventory').selected
				var inv=noa.ents.getState(noa.playerEntity, 'inventory').main
			
				if (items[item]==undefined) {
								if (pickedID >= game.hotbarsize) pickedID = 0
						else if (pickedID < 0) pickedID = 8
						socket.emit('inventory-click', {slot: pickedID, type: 'select'} )
						noa.ents.getState(noa.playerEntity, 'inventory').selected = pickedID
						
						
						gethand(noa,'hand',mainplayer)
		                gethand(noa,'hand',screenclone)
						
						return;
				}
				
				
					if (items[item].type == 'block-flat') {
				
		              gethand(noa,item,mainplayer)
		  gethand(noa,item,screenclone)///
		  getthirdperson(noa,mainplayer)
		  
		  
		   if(noa.camera.zoomDistance==0){
			  
		  getthirdperson(noa,mainplayer)
		  }
		  socket.emit('changearmor', {hand:item})
					}
					
					else if (items[item].type == 'block-flat3d') {
				
				 gethand(noa,item,mainplayer)
		  gethand(noa,item,screenclone)///
		  getthirdperson(noa,mainplayer)
		  if(noa.camera.zoomDistance==0){
			  	
		  getthirdperson(noa,mainplayer)
		  }
					}
				
				else{
				
					if(cubes[blockIDs[item]]==undefined){
						cubes[blockIDs[item]]=makeBigMesh(noa, scene, blocks[blockIDs[item]].texture, blocks[blockIDs[item]].name)
					}
				
					cubehand(noa,blockIDs[item],mainplayer,item)
					cubehand(noa,blockIDs[item],screenclone,item)
					   if(noa.camera.zoomDistance==0){
			  	
		               getthirdperson(noa,mainplayer)
		                    }
					
				}
				}
				if (items[item]!==undefined) {
								if (items[item].name== 'bow'){
							noa.ents.getState(noa.playerEntity, 'mesh').bow=true
						}else{
							noa.ents.getState(noa.playerEntity, 'mesh').bow=false
						}					
				}
				
					
					
					//// added this //////
			
			
			if (pickedID >= game.hotbarsize) pickedID = 0
			
			else if(pickedID==9) pickedID=0
			else if (pickedID < 0) pickedID = 8
			
			socket.emit('inventory-click', {slot: pickedID, type: 'select'} )
			noa.ents.getState(noa.playerEntity, 'inventory').selected = pickedID
			console.log(pickedID)
			
		}
			
			
			
			
			
			
			var boom=noa.getBlock(Math.floor(pos[0]),Math.floor(pos[1]),Math.floor(pos[2]))
			
			//console.log(blocks[boom])
			if(blocks[boom]==undefined){
			//noa.ents.getState(noa.playerEntity, 'movement').onrail=false
				//onrail=false
				return;
			}
			
				if(blocks[boom].name=='plate'){
					
				socket.emit('block-place', {position: [Math.floor(pos[0]),Math.floor(pos[1]),Math.floor(pos[2])],angle:'none',id:blockIDs['platedown']})
				
				 noa.soundy('/random/click.ogg', 0.5, null, noa)
			}
			
			if(blocks[boom].name=='rail'){
			
				
	         cartforce(noa,body)
				
	

				
			}
			
			
			if(blocks[boom].name=='railside'){
			
				
	         cartforce(noa,body)
				
	

				
			}
			
			
			if(blocks[boom].name=='airjelly'){
			
				
	         air-=0.01
			
			if(air<0){
				
				if(health>0){
				health-=0.01
				}
			}
	

				
			}
			
			
			if(blocks[boom].data.web !== undefined){
				
				body.velocity[0]=0;
				body.velocity[1]=0;
				body.velocity[2]=0;
				
			}
			if(blocks[boom].data.climb !== undefined /*|| blocks[boom].name=='waterflow' */){
			
		//if(noa.getBlock(Math.floor(pos[0]),Math.floor(pos[1]),Math.floor(pos[2])) ==65  /*&& (body.resting[0]!==0 || body.resting[2]!==0)*/  ){
			//console.log(body.resting)
			
			
			if(noa.inputs.state.forward==true && (body.resting[0]!==0 || body.resting[2]!==0)){
				
				//body.applyImpulse([0,7,0])
				
				body.velocity[0]=0;
				body.velocity[1]=3;
				body.velocity[2]=0;
			}
			else if(noa.inputs.state.sprint==true){
				
				
				//body.velocity[0]=0;
				body.velocity[1]=-3;
				//body.velocity[2]=0;
			}else{
				//body.velocity[0]=0;
				body.velocity[1]=0;
				//body.velocity[2]=0;
			}
			noa.ents.getState(noa.playerEntity, 'movement').onLadder=true
		}if(blocks[boom].data.climb !== undefined /*|| blocks[boom].name!=='waterflow' || blocks[boom]==undefined */){
			noa.ents.getState(noa.playerEntity, 'movement').onLadder=false
		}

	})

	noa.inputs.bind('numberkey', '1', '2', '3', '4', '5', '6', '7', '8', '9')
	noa.inputs.down.on('numberkey', (e) => {
		if (document.pointerLockElement == noa.container.canvas) {
			var num = parseInt(e.key)
			var pickedID = noa.ents.getState(eid, 'inventory').selected
			pickedID = num - 1 
			socket.emit('inventory-click', {slot: pickedID, type: 'select'} )
			noa.ents.getState(noa.playerEntity, 'inventory').selected = pickedID
		}
	})

	// Tempfix
	
	noa.on('beforeRender', async () => {
		if (document.pointerLockElement != noa.container.canvas && !isMobile) {
			noa.inputs.state.left = false
			noa.inputs.state.right = false
			noa.inputs.state.forward = false
			noa.inputs.state.backward = false
			noa.inputs.state.jump = false
		}
	})




	if (localStorage.getItem('gamepad') == 'true') setupGamepad(noa)

}


export function setupPlayer(noa2, invData,tex,socket,armor) {
	noa = noa2

	var eid = noa.playerEntity
	var dat = noa.entities.getPositionData(eid)
	
	var w = dat.width
	var h = dat.height

	var eyeOffset = 0.9 * noa.ents.getPositionData(noa.playerEntity).height

	//var offset = [0, h / 2, 0]
	var offset2 = [0, 0, 0]
 var scene=noa.rendering.getScene()
 

	noa.rendering.getScene().cameras[0].fov = 1
	
	// Gamemode and players settings

	 move = noa.entities.getMovement(eid)

	move.jumpForce = 6
	move.jumpImpulse = 8.5
	move.maxSpeed = 7.5


	// Create inventory, move it to global entities js in future
	noa.ents.createComponent({
		name: 'inventory',
		state: {main: {}, selected: 0, tempslot:{}}
	})
	if (invData != undefined) {
		
		
	noa.ents.addComponent(eid, 'inventory', invData)
	}else {
		var invspace = {}
		for (var x = 0; x < 36; x++) {
			invspace[x] = {}
		}
		
		
		
		noa.ents.addComponent(eid, 'inventory', {main: invspace})

	}
	
	
	/*var k= noa.ents.getState(noa.playerEntity, 'inventory').main
var cool={}


for (var i=0;i<9;i++){
cool[i]=k[i]
}

for (var t=10;t<36;t++){
	cool[t]=k[12]
}

//{"0":{id:"stone",count:200,data:{}},
//"1":{id:"snow",count:24,data:{}}}



 noa.ents.getState(noa.playerEntity, 'inventory').chest=cool*/
	// Gamemode settings
game.mode=0

	if (game.mode == 0) {
		move.airJumps = 0

	}
	console.log(tex+".png")
	
	

		var bustex = new BABYLON.Texture(mod+"/models/boy/boy.png", scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);
		
//var bustex = new BABYLON.Texture(mod+"entity/boy.png", scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);

var busmat = new BABYLON.StandardMaterial("face0", scene);
busmat.diffuseTexture=bustex;
busmat.backFaceCulling = false;
busmat.specularColor = BABYLON.Color3.Black()
busmat.emissiveColor = BABYLON.Color3.White()
bustex.hasAlpha=true;

	setTimeout(function(){ 
	
	console.log('numplayers :'+numplayers)
	if(numplayers==1){
		var couptex = new BABYLON.Texture(mod+"/models/boy/green.png", scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);
	console.log('waths up')
	busmat.diffuseTexture=couptex;

	}
	if(numplayers==2){
		var couptex = new BABYLON.Texture(mod+"/models/boy/red.png", scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);
	console.log('waths up')
	busmat.diffuseTexture=couptex;

	}
	
	}, 10000);

//mainplayer=assemblebody(scene,'girl');
  BABYLON.SceneLoader.ImportMesh(null,mod+"/models/boy/", "boy.babylon", scene, function (meshes) {
            mainplayer= new BABYLON.Mesh("dummy", scene);
			for (var i=0;i<meshes.length;i++){
	
	
	 meshes[i].material=busmat;
	  meshes[i].parent=mainplayer;
	  
	  
	 
	 
 }
 
			 noa.entities.addComponent(eid, noa.entities.names.mesh, {
		mesh: mainplayer,
		offset: offset2,
		thisSocket: socket,
		Onrail:onrail,
		rotangle:0
		
        });
		
		
			
				mainplayer._children[0].isPickable=false
				
				
	})
			
			
	
		
		
		
		setTimeout(function() {
			
			if(armor[0]!=='none'){
		addhat(armor[0],mainplayer)
			}
			if(armor[1]!=='none'){
		addcape(armor[1],mainplayer)
			}
			var hitboxMesh = new BABYLON.MeshBuilder.CreateBox('hitbox', {
				height: 2,
				width: 0.5,
				depth: 0.5,
			}, scene)


			hitboxMesh.setParent(mainplayer)
			hitboxMesh.setPositionWithLocalVector(new BABYLON.Vector3(0, 2 / 2, 0) )
			hitboxMesh.material = noa.rendering.makeStandardMaterial()
			hitboxMesh.material.wireframe = true
            hitboxMesh.isVisible=false;
			
			hitboxMesh.checkCollisions=true
		noa.rendering.addMeshToScene(hitboxMesh, false)
	
			noa.ents.getState(noa.playerEntity, 'mesh').hitbox=hitboxMesh
			//mainplayer.scaling.y=0.8
			
			
						noa.entities.addComponent(eid, noa.entities.names.stats,{
			mob:false,
			mesh:mainplayer,
			health:18
		})
	
		
		
		
		                                              
															 screenclone=mainplayer.clone('clone')
															  var bob= new BABYLON.Mesh("dummy", scene);
												 	 screenclone.parent=bob
                                                    bob.position.y=-1000
													
													
													for (var i=0;i<screenclone.getChildren().length;i++){
													screenclone._children[i].layerMask = 0x10000000;
												
													
													noa.rendering.addMeshToScene(screenclone._children[i],false)
													
													}
													
													
													var coolcam = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 0, 0), scene);
																		coolcam.viewport = new BABYLON.Viewport(0.8, 0.6, 0.3, 0.3);	
                                                                       //  coolcam.viewport = new BABYLON.Viewport(0.15, 0.4, 0.5, 0.5);																			
																		//coolcam.viewport = new BABYLON.Viewport(0.5, 0.5, 0.5, 0.5);	 
																	
																		
																
												 scene.cameras[0].viewport= new BABYLON.Viewport(0, 0, 1, 1);
												 coolcam.layerMask=screenclone._children[0].layerMask
												 scene.cameras.push(coolcam);
												 scene.activeCameras.push(scene.cameras[0])
												 scene.activeCameras.push(coolcam);
												
												 noa.rendering.addMeshToScene(bob,false)
												 bob.layerMask=coolcam.layerMask
											
												 
												 setTimeout(function(){
                                               
												//var c=	 noa.ents.getState(noa.playerEntity, 'mesh').mesh
												 coolcam.parent=bob
												//coolcam.position.y=-1000
												 
												//screenclone.parent=bob
												 //coolcam.setTarget(screenclone)
												 //coolcam.position.y+=1
												  coolcam.position.z=6
												 coolcam.rotation.y=Math.PI
                                            
 var k=makestarfield(noa)
 k.start()
												 }, 3000);		


                                            /*  setInterval(function(){
                                               
												
                                            coolparticle(noa, [coolcam.position.x,coolcam.position.y,coolcam.position.z-2])

												 }, 3000);			*/									 
													
													
													
													
													
													
													
													var c=0
													
													noa.on("tick", function(dt) {
													
														//screenclone.rotation.y+=0.1
														//coolcam.rotation.x+=0.1
														// day night 
													/*	c+=0.01
														
														scene.ambientColor.r=0.01//Math.sin(c)+1.01
	scene.ambientColor.g=0.01//Math.sin(c)+1.01
	scene.ambientColor.b=0.01//Math.sin(c)+1.01*/
														if(mooner!=null){
															mooner.rotation.x+=0.01
															mooner.position.x=mainplayer.position.x
															mooner.position.z=mainplayer.position.z
														}
															//mousex=e.screenX
	                                                     //mousey=e.screenY
														 
														 //screenclone._children[0].rotation.x=clamp( mousey/180*Math.PI,4,5.5)
													//console.log( mousex/180*Math.PI)
													//screenclone._children[0].rotation.y= clamp( mousex/180*Math.PI,13,12)
                                                    
													
													if(document.pointerLockElement!==null){
	
	
                                                   screenclone.rotation=mainplayer.rotation
													
													
													screenclone._children[0].rotation=mainplayer._children[0].rotation
													screenclone._children[1].rotation=mainplayer._children[1].rotation
													screenclone._children[2].rotation=mainplayer._children[2].rotation
													screenclone._children[3].rotation=mainplayer._children[3].rotation
													screenclone._children[4].rotation=mainplayer._children[4].rotation
													screenclone._children[5].rotation=mainplayer._children[5].rotation
													
													}

													});
													
													/*var light = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(0, 0, 0), scene);
													light.parent=mainplayer._children[0]
													light.range = 5;*/
 var moon=makemoon()
   var mooner= new BABYLON.Mesh("dummy", scene);
 moon.parent=mooner
 //mooner.parent=mainplayer._children[0]
 noa.rendering.addMeshToScene(moon, false)
 moon.rotation.x=Math.PI/2
 moon.position.y-=100
		
		
		//shaderfun(noa)
		
		setTimeout(function(){ 
    // makemap(noa,mainplayer)
	 
		if(localStorage.getItem('item')=='hat'){
			
			
	//addhat('bearhat')
		}
     }, 5000);
	
	
	
	
		// noa.ents.getState(noa.playerEntity, noa.entities.names.mesh).mesh
							 }, 3000);
							 
							 function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}
							


	
}








function inventoryHasItem(eid, item, count) {
	var inventory = noa.ents.getState(eid, 'inventory')
	var items = Object.entries(inventory.main)

	for (var [slot, data] of items) {
		if (data.id == item && data.count >= count) return parseInt(slot)
	}
	return -1
}


function makepainting(noa,mainp){
	console.log('ooopppaaaa')
		var scene=noa.rendering.getScene();
	var paint=BABYLON.Mesh.CreatePlane('sprite-lol', 10, scene)
	//paint.parent=mainp._children[0]
	paint.position.x=mainp._children[0].position.x
	paint.position.y=mainp._children[0].position.y
	paint.position.z=mainp._children[0].position.z
	
	var mat = noa.rendering.makeStandardMaterial('cask')
	
	var tex= new BABYLON.Texture("./textures/entity/armor.png", scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
	mat.diffuseTexture=tex
	paint.material=mat
	mat.backFaceCulling=false
	mat.diffuseTexture.hasAlpha=true
	console.log(paint)
	noa.rendering.addMeshToScene(paint, false)
}


function shield(noa,mainp){
	
	if(mainp._children[1].getChildren().length>0){
		mainp._children[1]._children[0].dispose()
	}
	console.log('looo')
	var shield=makeshield(noa)
	console.log(shield)
	
	shield.parent=mainp._children[2]
	
	shield.position.x=mainp._children[2].position._x+0.3//x
			shield.position.y=mainp._children[2].position._y-1.7//z
			shield.position.z=mainp._children[2].position._z-1.4//y ???
	noa.rendering.addMeshToScene(shield, false)
	shield.layerMask = mainp._children[0].layerMask;
	
		shield.rotation.y=Math.PI/2
			shield.rotation.x=-Math.PI/10
			shield.rotation.z=Math.PI/2
	
}

function headgear(noa,mainp){
	
	
	if(mainp._children[0].getChildren().length>0){
		mainp._children[0]._children[0].dispose()
	}
	
	var scene=noa.rendering.getScene();
	
	
		var imageheight=32
	         var imagewidth=64
	         var pixely=1/imageheight;
	         var pixelx=1/imagewidth;
	         var num=1;
			 
			 
			  var faceUV = new Array(6);
				
				
				var n=[new BABYLON.Vector4(pixelx*8,-pixely*(15+num),pixelx*(15+num),-pixely*(8)),//face
	new BABYLON.Vector4(pixelx*24,-pixely*(15+num),pixelx*(31+num),-pixely*(8)),//back 
	new BABYLON.Vector4(pixelx*0,-pixely*(15+num),pixelx*(7+num),-pixely*(8)),////right
	new BABYLON.Vector4(pixelx*16,-pixely*(15+num),pixelx*(23+num),-pixely*(8)),////left
	new BABYLON.Vector4(pixelx*8,-pixely*(7+num),pixelx*(15+num),-pixely*(0)),//top 
	new BABYLON.Vector4(pixelx*16,-pixely*(7+num),pixelx*(23+num),-pixely*(0))];//bottom*/
	
	var options={
		height:0.5,
		width:0.6,
		depth:0.6,
		faceUV: n,
		wrap: true,
        updatable: true
	}
	var cask= new BABYLON.MeshBuilder.CreateBox("box", options, scene);
		cask.parent=mainp._children[0]
	cask.position.x=mainp._children[0].position.x//x
	cask.position.y=mainp._children[0].position.y-1.5//z
	cask.position.z=mainp._children[0].position.z+0.3//y
	
	
	
	var mat = noa.rendering.makeStandardMaterial('cask')
	
	var tex= new BABYLON.Texture("./textures/entity/armor.png", scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
	mat.diffuseTexture=tex
	//noa.rendering.addMeshToScene(cask,false)
	
	cask.layerMask = mainp._children[0].layerMask;
	
	mat.diffuseTexture.hasAlpha=true
			mat.backFaceCulling=false
			cask.material=mat
	console.log('lola')
     cask.rotation.x=Math.PI/2
	noa.rendering.addMeshToScene(cask,false)
}

function chestgear(noa,mainp){
	
	
	if(mainp._children[5].getChildren().length>0){
		mainp._children[5]._children[0].dispose()
	}
	
	var scene=noa.rendering.getScene();
	
	
		var imageheight=32
	         var imagewidth=64
	         var pixely=1/imageheight;
	         var pixelx=1/imagewidth;
	         var num=1;
			 
			 
			  var faceUV = new Array(6);
				
				
				var n=[new BABYLON.Vector4(pixelx*21,-pixely*(31+num),pixelx*(26+num),-pixely*(20)),//face
	new BABYLON.Vector4(pixelx*33,-pixely*(31+num),pixelx*(39+num),-pixely*(20)),//back 
	new BABYLON.Vector4(pixelx*16,-pixely*(32+num),pixelx*(20+num),-pixely*(20)),////right
	new BABYLON.Vector4(pixelx*28,-pixely*(32+num),pixelx*(32+num),-pixely*(20)),////left
	new BABYLON.Vector4(pixelx*20,-pixely*(19+num),pixelx*(27+num),-pixely*(16)),//top 
	new BABYLON.Vector4(pixelx*26,-pixely*(19+num),pixelx*(26+num),-pixely*(19))];//bottom*/
	
	var options={
		height:1,
		width:0.6,
		depth:0.3,
		faceUV: n,
		wrap: true,
        updatable: true
	}
	var cask= new BABYLON.MeshBuilder.CreateBox("box", options, scene);
		cask.parent=mainp._children[5]
	cask.position.x=mainp._children[5].position.x//x
	cask.position.y=mainp._children[5].position.y//z
	cask.position.z=mainp._children[5].position.z+1//y
	
	
	
	var mat = noa.rendering.makeStandardMaterial('cask')
	
	var tex= new BABYLON.Texture("./textures/entity/armor.png", scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
	mat.diffuseTexture=tex
	//noa.rendering.addMeshToScene(cask,false)
	
	cask.layerMask = mainp._children[0].layerMask;
	
	mat.diffuseTexture.hasAlpha=true
			mat.backFaceCulling=false
			cask.material=mat
	console.log('lola')
     cask.rotation.x=Math.PI/2
	noa.rendering.addMeshToScene(cask,false)
}

function makeshield(noa){
	 
	
		
	
		
			
	
				var imageheight=16
	         var imagewidth=16
	         var pixely=1/imageheight;
	         var pixelx=1/imagewidth;
	         var num=1;
			 
			 
			  var faceUV = new Array(6);
				
				
				var n=[new BABYLON.Vector4(pixelx*4,-pixely*(15+num),pixelx*(12+num),-pixely*(0)),//face
	new BABYLON.Vector4(pixelx*4,-pixely*(15+num),pixelx*(12+num),-pixely*(0)),//back 
	new BABYLON.Vector4(pixelx*4,-pixely*(15+num),pixelx*(4+num),-pixely*(0)),////right
	new BABYLON.Vector4(pixelx*4,-pixely*(15+num),pixelx*(4+num),-pixely*(0)),////left
	new BABYLON.Vector4(pixelx*4,-pixely*(0+num),pixelx*(12+num),-pixely*(0)),//top 
	new BABYLON.Vector4(pixelx*4,-pixely*(0+num),pixelx*(12+num),-pixely*(0))];//bottom*/
	
	
  var  uvoptions = {
        height: 1.5,
		depth:0.1,
		width:1,
		faceUV: n,
		wrap: true,
        updatable: true
    };	
			 
	
			var supermesh =BABYLON.MeshBuilder.CreateBox(name, uvoptions, noa.rendering.getScene())
				
			
			var offset = BABYLON.Matrix.Translation(0, 1, 0)
			var mat = noa.rendering.makeStandardMaterial(name)
	        supermesh.bakeTransformIntoVertices(offset)
			supermesh.material=mat
			console.log(blockIDs['door'])
			//console.log(blocks[].name
			
			var tex = new BABYLON.Texture('textures/'+blocks[blockIDs['door']].texture+'.png', scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
			mat.diffuseTexture = tex
			mat.diffuseTexture.hasAlpha=true
			mat.backFaceCulling=false
			return supermesh;
			
}
function cubehand(noa,id,mainp,name){
	
	if(mainp._children[1].getChildren().length>0){
		mainp._children[1]._children[0].dispose()
	}
	var scene=noa.rendering.getScene();
	
	
	if(cubes[blocks[id].name]!==undefined){
		
		
		
		var coon=cubes[blocks[id].name].clone('cube')
		
		you(noa,coon,mainp)
		
	}else{
	
		var coon=makeBigMesh(noa, scene, blocks[id].texture, blocks[id].name)
		setTimeout(function(){ 
		you(noa,coon,mainp)
		
		}, 2000);
		
	}
	
	
}
function you(noa,cube,mainp){

if(cube==undefined){
	return;
}
	cube.parent=mainp._children[1]
	
	
	
	cube.position.x=mainp._children[1].position._x+jsoninfo['blockbase']['held']["hand"]["x"]
			cube.position.y=mainp._children[1].position._y+jsoninfo['blockbase']['held']["hand"]["y"]
			cube.position.z=mainp._children[1].position._z+jsoninfo['blockbase']['held']["hand"]["z"]
			
			
			cube.rotation.x=jsoninfo['blockbase']['held']["hand"]["rotation"][0]
			cube.rotation.y=jsoninfo['blockbase']['held']["hand"]["rotation"][1]
			cube.rotation.z=jsoninfo['blockbase']['held']["hand"]["rotation"][2]
			cube.layerMask = mainp._children[0].layerMask;
				noa.rendering.addMeshToScene(cube, false)
				
	}

function makeBigMesh(noa, scene, url, name) {
	//return;
	 if(cubes[name]!==undefined){
		 return;
	 }
	var mesh = {}
	var mat = {}
	for (var x = 0; x < 6; x++) {
		var matname = name + '-' + x || 'sprite-mat'
		mesh[x] = BABYLON.Mesh.CreatePlane('sprite-' + matname, 1, scene)
		mat[x] = noa.rendering.makeStandardMaterial(matname + x)
		mat[x].backFaceCulling = false
		
		
		if(url.length>2){
		if(x<4){
			mat[x].diffuseTexture = new BABYLON.Texture(mod+'textures/'+ url[2]+'.png', scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
		}else{
			
			if(x==4){
				mat[4].diffuseTexture = new BABYLON.Texture( mod+'textures/'+url[0]+'.png', scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
			}
			if(x==5){
			mat[5].diffuseTexture = new BABYLON.Texture( mod+'textures/'+url[1]+'.png', scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
			}
			
		}
		}
		else{
			mat[x].diffuseTexture = new BABYLON.Texture(mod+'textures/'+ url[0]+'.png', scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
		}
		
		if(url.length>4){
			
					if(x==0){
					//right
				mat[x].diffuseTexture = new BABYLON.Texture(mod+'textures/'+ url[5]+'.png', scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE) //
				}
				if(x==1){
					//left
				mat[x].diffuseTexture = new BABYLON.Texture(mod+'textures/'+ url[4]+'.png', scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
				}
				if(x==2){
					//front
				mat[x].diffuseTexture = new BABYLON.Texture(mod+'textures/'+ url[0]+'.png', scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
				}
				if(x==3){
					//back
				mat[x].diffuseTexture = new BABYLON.Texture(mod+'textures/'+ url[3]+'.png', scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
				}
				if(x==4){
					//top
				mat[x].diffuseTexture = new BABYLON.Texture(mod+'textures/'+ url[1]+'.png', scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
				}
				if(x==5){
					//bottom
				mat[x].diffuseTexture = new BABYLON.Texture(mod+'textures/'+ url[2]+'.png', scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
				}
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
	
	 newmesh.scaling.y=0.5
  newmesh.scaling.x=0.5
  newmesh.scaling.z=0.5
	
	
	
  if(cubes[name]==undefined){
cubes[name]=newmesh;
  }

	//return newmesh

}

export function gethand(noa,name,mainp){
	
	
console.log(name)
	if(mainp._children[1].getChildren().length>0){
		mainp._children[1]._children[0].dispose()
		
	}
	
	if(name=='bubblegum'){
		var coon=projectiles[name].clone('fud')
	
	coon.parent=mainp._children[1]
	coon.layerMask = mainp._children[0].layerMask;
	coon._children[0].layerMask = mainp._children[0].layerMask;

	noa.rendering.addMeshToScene(coon, false)
	noa.rendering.addMeshToScene(coon._children[0], false)


	         coon.position.x=mainp._children[1].position._x+(jsoninfo[name]['held']["hand"]["x"])
			coon.position.y=mainp._children[1].position._y+(jsoninfo[name]['held']["hand"]["y"])
			coon.position.z=mainp._children[1].position._z+(jsoninfo[name]['held']["hand"]["z"])
	
			
			
			
		/*	coon.rotation.x=mainp._children[1].rotation.x+jsoninfo[name]['held']["hand"]["rotation"][0]
			coon.rotation.y=mainp._children[1].rotation.y+jsoninfo[name]['held']["hand"]["rotation"][1]
			coon.rotation.z=mainp._children[1].rotation.z+jsoninfo[name]['held']["hand"]["rotation"][2]*/
			
			coon.rotationQuaternion = new BABYLON.Quaternion(jsoninfo[name]['held']["hand"]["rotation"][0],jsoninfo[name]['held']["hand"]["rotation"][1],jsoninfo[name]['held']["hand"]["rotation"][2]).normalize();
			
			coon.scaling=new BABYLON.Vector3(jsoninfo[name]['held']["hand"]["scale"][0],jsoninfo[name]['held']["hand"]["scale"][1],jsoninfo[name]['held']["hand"]["scale"][2])
			
			noa.ents.getState(noa.playerEntity, 'mesh').bow=true
			return;
		
	}
	
	if(name=='hand'){
			return;
		}
		
		if(name==undefined){
			return;
		}
		
		
	var coon=projectiles[name].clone('fud')
	//console.log(name)
	coon.parent=mainp._children[1]
	coon.layerMask = mainp._children[0].layerMask;
	coon._children[0].layerMask = mainp._children[0].layerMask;
	coon._children[1].layerMask = mainp._children[0].layerMask;
	noa.rendering.addMeshToScene(coon, false)
	noa.rendering.addMeshToScene(coon._children[0], false)
	noa.rendering.addMeshToScene(coon._children[1], false)
	
	
		if(jsoninfo[name]['parent']!==undefined){
		var c=jsoninfo[name]['parent']
		    coon.position.x=mainp._children[1].position._x+(jsoninfo[c]['held']["hand"]["x"])
			coon.position.y=mainp._children[1].position._y+(jsoninfo[c]['held']["hand"]["y"])
			coon.position.z=mainp._children[1].position._z+(jsoninfo[c]['held']["hand"]["z"])
			
			coon.scaling=new BABYLON.Vector3(jsoninfo[c]['held']["hand"]["scale"][0],jsoninfo[c]['held']["hand"]["scale"][1],jsoninfo[c]['held']["hand"]["scale"][2])
			
					coon.rotation.x=mainp._children[1].rotation.x+jsoninfo[c]['held']["hand"]["rotation"][0]
			coon.rotation.y=mainp._children[1].rotation.y+jsoninfo[c]['held']["hand"]["rotation"][1]
			coon.rotation.z=mainp._children[1].rotation.z+jsoninfo[c]['held']["hand"]["rotation"][2]
	}else{
	          coon.position.x=mainp._children[1].position._x+(jsoninfo[name]['held']["hand"]["x"])
			coon.position.y=mainp._children[1].position._y+(jsoninfo[name]['held']["hand"]["y"])
			coon.position.z=mainp._children[1].position._z+(jsoninfo[name]['held']["hand"]["z"])
			//c.parent=box._children[1]
			coon.scaling=new BABYLON.Vector3(jsoninfo[name]['held']["hand"]["scale"][0],jsoninfo[name]['held']["hand"]["scale"][1],jsoninfo[name]['held']["hand"]["scale"][2])
			
					coon.rotation.x=mainp._children[1].rotation.x+jsoninfo[name]['held']["hand"]["rotation"][0]
			coon.rotation.y=mainp._children[1].rotation.y+jsoninfo[name]['held']["hand"]["rotation"][1]
			coon.rotation.z=mainp._children[1].rotation.z+jsoninfo[name]['held']["hand"]["rotation"][2]
			
	}
	
}

function getthirdperson(noa,mainp,bool){
	console.log('yellow')
	
	if( hand!==null){
		 hand.dispose()
	}
	console.log(noa.camera.zoomDistance)
	
	if(noa.camera.zoomDistance==0){
		
		if(mainp._children[1].getChildren().length>0){
		mainp._children[1]._children[0].dispose()
	}
		
	var scene=noa.rendering.getScene();

	
	//var pickedID = noa.ents.getState(noa.playerEntity, 'inventory').selected
		
			
	var item=noa.ents.getState(noa.playerEntity, 'inventory').main[pickedID].id
	var name=item
	
	
	if(cubes[name]!==undefined){
						//cubes[blockIDs[name]]=makeBigMesh(noa, scene, blocks[blockIDs[name]].texture, blocks[blockIDs[name]].name)
						
							hand=cubes[name].clone('tots')
		
				noa.rendering.addMeshToScene(hand, false)
	//noa.rendering.addMeshToScene(hand._children[0], false)

		
			hand.position = new BABYLON.Vector3(jsoninfo['blockbase']['held']["third"]["x"], jsoninfo['blockbase']['held']["third"]["y"], jsoninfo['blockbase']['held']["third"]["z"])

			
				var bob= new BABYLON.Mesh("dummy", scene);
				bob.parent=scene.activeCameras[0]
			
				hand.parent = bob
	
		hand.renderingGroupId = 1;
		hand._children[0].renderingGroupId = 1;
	
		
	
		    hand.rotation._x=jsoninfo[name]['held']["third"]["rotation"][0]
		    hand.rotation._y=jsoninfo[name]['held']["third"]["rotation"][1]
			hand.rotation._z=jsoninfo[name]['held']["third"]["rotation"][2]
	
				return;
					}
	
	if(name=='bubblegum'){
	
		hand=projectiles[item].clone('fud')
		
				noa.rendering.addMeshToScene(hand, false)
	noa.rendering.addMeshToScene(hand._children[0], false)

		
			hand.position = new BABYLON.Vector3(jsoninfo[name]['held']["third"]["x"], jsoninfo[name]['held']["third"]["y"], jsoninfo[name]['held']["third"]["z"])

			
				var bob= new BABYLON.Mesh("dummy", scene);
				bob.parent=scene.activeCameras[0]
			
				hand.parent = bob
	
		hand.renderingGroupId = 1;
		hand._children[0].renderingGroupId = 1;
	
		
	
		    hand.rotation._x=jsoninfo[name]['held']["third"]["rotation"][0]
		    hand.rotation._y=jsoninfo[name]['held']["third"]["rotation"][1]
			hand.rotation._z=jsoninfo[name]['held']["third"]["rotation"][2]
	
				return;
		
	}
	if(!bool){
		console.log('lolaaa')
		hand=projectiles[item].clone('fud')
		
				noa.rendering.addMeshToScene(hand, false)
	noa.rendering.addMeshToScene(hand._children[0], false)
	noa.rendering.addMeshToScene(hand._children[1], false)
	if(jsoninfo[name]!==undefined){
		hand.position = new BABYLON.Vector3(jsoninfo[name]['held']["third"]["x"], jsoninfo[name]['held']["third"]["y"], jsoninfo[name]['held']["third"]["z"])
		
	}else{
		hand.position = new BABYLON.Vector3(0.4, -0.3, 1)
	}
		
				
				var bob= new BABYLON.Mesh("dummy", scene);
				bob.parent=scene.activeCameras[0]
			
				hand.parent = bob
	console.log(jsoninfo[name]['held'].third.rotation)
		hand.rotationQuaternion = new BABYLON.Quaternion(jsoninfo[name]['held']["third"]["rotation"][0],jsoninfo[name]['held']["third"]["rotation"][1],jsoninfo[name]['held']["third"]["rotation"][2]).normalize();
		
		
		//hand.scaling=new BABYLON.Vector3(0.3,0.3,0.3)
		 //hand.rotation._x =0//jsoninfo[name]['held']["third"]["rotation"][1]
		    //hand.rotation._y=1.57//jsoninfo[name]['held']["third"]["rotation"][0]
			//hand.rotation._z=0//jsoninfo[name]['held']["third"]["rotation"][2]
			
			
			 
			
			/*hand.renderingGroupId = 1;
		hand._children[0].renderingGroupId = 1;
		hand._children[1].renderingGroupId = 1;*/
		return;
		
		
	}else{
		
		hand=cubes[item].clone('fud')
		
				noa.rendering.addMeshToScene(hand, false)
	
		hand.parent = scene.activeCameras[0]
		hand.position = new BABYLON.Vector3(0.4, -0.6, 1)
		hand.rotation.y=Math.PI/2
		hand.renderingGroupId = 1;
		
	}
	
		
	
	}
	

}

export function drop(noa,name,pos,matrix,socket,strength){
	var coon=null;
	
	noa.ents.getState(noa.playerEntity, 'mesh').fired = true
	
	setTimeout(function(){  
	noa.ents.getState(noa.playerEntity, 'mesh').fired = false
  }, 300);
	//return;//
	
	//console.log(blocks[blockIDs[name]].name)
	
	if(blocks[blockIDs[name]]==undefined){
    coon=projectiles[name].clone(name)
	noa.rendering.addMeshToScene(coon, false)
	noa.rendering.addMeshToScene(coon._children[0], false)
	noa.rendering.addMeshToScene(coon._children[1], false)
	}else{
		  coon=cubes[name].clone(name)
	}
		//var coon=cubes[name].clone('fud')
	//var coon=noa.registry._blockMeshLookup[blockIDs['chest']].clone('tot')//makemesh.clone('lol')
	//coon.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL
	
	var sweet=makeparticlearrow('particle/chain',coon,scene,10,0.2)
	sweet.start()
	console.log(jsoninfo[name])
	if(jsoninfo[name]['thrown']==undefined ){
		
	coon.rotation.x=jsoninfo['itembase']['thrown'].rotation[0]
	coon.rotation.y=jsoninfo['itembase']['thrown'].rotation[1]
	coon.rotation.z=jsoninfo['itembase']['thrown'].rotation[2]
	}else{
	coon.rotation.x=jsoninfo[name]['thrown'].rotation[0]
	coon.rotation.y=jsoninfo[name]['thrown'].rotation[1]+mainplayer.rotation.y
	coon.rotation.z=jsoninfo[name]['thrown'].rotation[2]-noa.camera.pitch
	}
	
//	var pos=noa.ents.getState(noa.playerEntity, noa.entities.names.mesh).mesh.position
	 var cid = noa.entities.addent( pos, 0.5, 0.5, coon, [0.2,1/2,0.2], true, false,true,null )
	 coon.billboardMode=true
	  //var cid = noa.entities.addproj( pos, 0.5, 0.5, coon, [0.2,1/2,0.2], true, false,true,null )
	 
	 
	 noa.entities.addComponent(cid, noa.entities.names.stats,{
				tag:cid,
				name:'arrow',
				health:99999
				
			})
	 
	 	var body=noa.ents.getPhysicsBody(cid)
		
	body.mass=0.5
	   body.gravityMultiplier=0.3;

	  
	  var vec = matrix

			 vec3.normalize(vec, vec)//
			 vec3.scale(vec, vec, strength)//strength was 40
			  
			  var body = noa.entities.getPhysicsBody(cid)
			  body.applyImpulse(vec);
			   var otherId;
			   
			   
			   
			  	  
			  /* setTimeout(function(){ 
			   var c=noa.ents.getState(cid, 'position').position
			   makefishrod(c[0],c[1],c[2],coon)
			   }, 3000);*/
			  var onCollideEnto = function(ownID, otherID) {
				  otherID=cid
    collideEntityo(noa, ownID, otherID)
  }
  
  //setTimeout(function(){  
	 noa.entities.addComponent(cid, noa.entities.names.collideEntities, {
    callback: onCollideEnto
  })
  	
 // }, 2000);
  
  noa.entities.addComponent(cid, noa.entities.names.collideTerrain, {
    callback: collideter
  })
  
  function collideter(){
	 var c=noa.ents.getState(cid, 'position').position
	  
  }
  var num=0
  function collideEntityo(noa, ownID, otherID){
	  setTimeout(function(){  
	    if(ownID==noa.playerEntity){
			num++
			if(num>1){
	   noa.ents.deleteEntity(cid)
	
	  socket.emit('block-stepped', {ids:name})
	  num=0
			}
		}
		 }, 1000);
	  
	  if(ownID !==noa.playerEntity){
		 
	  var body = noa.entities.getPhysicsBody(cid)

	
		   var tag=noa.ents.getState(ownID, 'stats').tag
		   
		   
		 
	   socket.emit('hitentity',{id:tag,strength:[Math.floor(body.velocity[1]/10),Math.floor(body.velocity[1]/10),Math.floor(body.velocity[2]/10)]});
	     noa.ents.deleteEntity(cid)
	
	  }
	
	  
  }
	
}


export function cubic(x,y,z,name,socket,id,rando){

	var cube=null
	if(cubes[name]!==undefined){
		
		cube=cubes[name].clone('cube')
	
				//var cid = noa.entities.addent( [x+0.5,y+0.5,z+0.5], 0.5, 0.5,cube, [0.5,0.5/2,0.5], true, false,true,null )			 
						
	}else if(rando==undefined){
		
		cube=makeBigMesh(noa, scene,loottable[name], name)
	}
	else if(rando!==undefined){
	
		cube=makeBigMesh(noa, scene,blocks[id].texture, name)
	}
			//noa.rendering.addMeshToScene(cube, false)
			if(cube==undefined){
				return;
			}
			
		var cid = noa.entities.addent( [x+0.5,y+0.5,z+0.5], 0.5, 0.5,cube, [0.5,0.5/2,0.5], true, false,true,null )
  noa.entities.addComponent(cid, noa.entities.names.rotation,{
	  mesh:cube
  })


 var body = noa.entities.getPhysicsBody(cid)
	   body.applyImpulse([0.8,10,0.8]);
	     var onCollideEnto = function(ownID, otherID) {
    collideEntityo(noa, ownID, otherID)
  }
	 noa.entities.addComponent(cid, noa.entities.names.collideEntities, {
    callback: onCollideEnto
  })
	    
		function collideEntityo(noa, ownID, otherID){
	  
	   //noa.ents.deleteEntity(cid)
	  
	  if(ownID==noa.playerEntity){
		 noa.ents.deleteEntity(cid)
		 // addheart()
		//console.log( blocks[id].name)
	  socket.emit('block-stepped', {ids:blocks[id].name})
		//addtoinvent(name);
		
	  }
	
	  
  }
						
						
								setTimeout(function() {
									  
								noa.ents.deleteEntity(cid)
								
							 
							 }, 10000);
							 
							
		
		
		
	
	
	
 	

		  
	                
	   

	
	}
	
	
	export function Bokkusu(x,y,z,name,socket,id,rando){

	var cube=null
	if(cubes[name]!==undefined){
		
		cube=cubes[name].clone('cube')
	
				//var cid = noa.entities.addent( [x+0.5,y+0.5,z+0.5], 0.5, 0.5,cube, [0.5,0.5/2,0.5], true, false,true,null )			 
						
	}else if(rando==undefined){
		
		cube=makeBigMesh(noa, scene,loottable[name], name)
	}
	else if(rando!==undefined){
	
		cube=makeBigMesh(noa, scene,blocks[id].texture, name)
	}
			//noa.rendering.addMeshToScene(cube, false)
			if(cube==undefined){
				return;
			}
			
		var cid = noa.entities.addent( [x+0.5,y+0.5,z+0.5], 0.5, 0.5,cube, [0.5,0.5/2,0.5], true, false,true,null )
  noa.entities.addComponent(cid, noa.entities.names.rotation,{
	  mesh:cube
  })


 var body = noa.entities.getPhysicsBody(cid)
	
	     var onCollideEnto = function(ownID, otherID) {
    collideEntityo(noa, ownID, otherID)
  }

	 noa.entities.addComponent(cid, noa.entities.names.collideEntities, {
    callback: onCollideEnto
  })
	    
		function collideEntityo(noa, ownID, otherID){
	  
	   //noa.ents.deleteEntity(cid)
	  
	  if(ownID==noa.playerEntity){
		noa.ents.deleteEntity(cid)
		 // addheart()
		//console.log( blocks[id].name)
	  socket.emit('block-stepped', {ids:name})
		//addtoinvent(name);
		
	  }
	
	  
  }
			  noa.entities.addComponent(cid,noa.entities.names.propulsion)			
						
								setTimeout(function() {
									  
								//noa.ents.deleteEntity(cid)
								
							
							 }, 10000);
							 
							
		
		
		
	
	
	
 	

		  
	                
	   

	
	}
	
	export function flatcubic(x,y,z,name,socket,rando){
		
	
		
		var cube=null;


		
		
		
		if(projectiles[ name]==undefined){
		
		
		mesher(scene,name)
		
		setTimeout(function() {
									  
								
								
							 
											
							
	 cube=projectiles[name]							 
							
 var cid = noa.entities.addent( [x+0.5,y+0.5,z+0.5], 0.5, 0.5,cube.clone(name), [0.2,0.5/2,0.2], true, false,true,null )
 


 var body = noa.entities.getPhysicsBody(cid)
	   body.applyImpulse([rando,4,rando]);
	   body.mass=0.5
	   body.gravityMultiplier=0.3;
	     var onCollideEnto = function(ownID, otherID) {
    collideEntityo(noa, ownID, otherID)
  }
	 noa.entities.addComponent(cid, noa.entities.names.collideEntities, {
    callback: onCollideEnto
  })
	    
		function collideEntityo(noa, ownID, otherID){
	  
	  if(ownID==noa.playerEntity){
		  
		
		  noa.ents.deleteEntity(cid)
		 
	  socket.emit('block-stepped', {ids:name})
		//addtoinvent(name);
	  }
	
	  
  }
						
						
								setTimeout(function() {
									  
								noa.ents.deleteEntity(cid)
								
							 
							 }, 10000);
							 
							 
							 
							 	 },2000);	
								 
								 return;
		//mesher(scene,items[inv[x].id])
		//return;
		}
	
	

			
		
									  
								
								
							 
											
							
	 cube=projectiles[name]							 
							
 var cid = noa.entities.addent ([x+0.5,y+0.5,z+0.5], 0.5, 0.5,cube.clone(name), [0.2,0.5/2,0.2], true, false,true,null )
 


 var body = noa.entities.getPhysicsBody(cid)
	   body.applyImpulse([rando,4,rando]);
	     var onCollideEnto = function(ownID, otherID) {
    collideEntityo(noa, ownID, otherID)
  }
	 noa.entities.addComponent(cid, noa.entities.names.collideEntities, {
    callback: onCollideEnto
  })
	    
		function collideEntityo(noa, ownID, otherID){
	  
	  if(ownID==noa.playerEntity){
		  noa.ents.deleteEntity(cid)
	  socket.emit('block-stepped', {ids:name})
		//addtoinvent(name);
	  }
	
	  
  }
						
						
								setTimeout(function() {
									  
								noa.ents.deleteEntity(cid)
								
							 
							 }, 10000);
							 
							 
							 
							 
	
		  
	                
	   

	
	}

function addtoinvent(name){
	
	console.log('booya :'+name)
	
	
}

export function letsrock(x,y,z,name,effect){
	return;
	if(!ppready){
		return;
	}
	ppready=false
	for (var i =0;i <initialpp.length;i++){
		






var tex = new BABYLON.Texture('textures/'+name+'.png', scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
if(effect){
tex.uScale = initialpp[i].scaling.y;   
tex.vScale = initialpp[i].scaling.y;  
}
tex.hasAlpha=true;
initialpp[i].material.diffuseTexture=tex
 var cid = noa.entities.addent( [x+0.5,y+0.5,z+0.5], 0.5, 0.5,initialpp[i].clone('tak'), [0.2,initialpp[i].scaling.y/2,0.2], true, false,true,null )
 pp.push(cid)


 var body = noa.entities.getPhysicsBody(cid)
	   body.applyImpulse([initialpp[i].scaling.y*8-4,initialpp[i].scaling.y*14,initialpp[i].scaling.y*8-4]);
	   
	    
						
						
								setTimeout(function() {
									  for (var i =0;i <pp.length;i++){
								noa.ents.deleteEntity(pp[i])
								ppready=true
							 }
							 }, 1500);
		  
		  
	                
	   

	}
	}
	
	export function poof(x,y,z,name,effect){
	if(!ppready){
		return;
	}
	ppready=false
	for (var i =0;i <initialpp.length;i++){
		






var tex = new BABYLON.Texture('textures/'+name+'.png', scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
if(effect){
tex.uScale = initialpp[i].scaling.y;   
tex.vScale = initialpp[i].scaling.y;  
}
tex.hasAlpha=true;
initialpp[i].material.diffuseTexture=tex
 var cid = noa.entities.addent( [x+0.5,y+0.5,z+0.5], 0.5, 0.5,initialpp[i].clone('tak'), [0.2,initialpp[i].scaling.y/2,0.2], true, false,true,null )
 pp.push(cid)


 var body = noa.entities.getPhysicsBody(cid)
 body.airDrag=2
 body.gravityMultiplier=0
	   body.applyImpulse([initialpp[i].scaling.y*8-4,6,initialpp[i].scaling.y*8-4]);
	   
	    
						
						
								setTimeout(function() {
									  for (var i =0;i <pp.length;i++){
								noa.ents.deleteEntity(pp[i])
								ppready=true
							 }
							 }, 1500);
		  
		  
	                
	   

	}
	}
	
	export function chew(x,y,z,name,effect){
	if(!ppready){
		return;
	}
	ppready=false
	for (var i =0;i <initialpp.length;i++){
		






var tex = new BABYLON.Texture('textures/'+name+'.png', scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
if(effect){
tex.uScale = initialpp[i].scaling.y;   
tex.vScale = initialpp[i].scaling.y;  
}
tex.hasAlpha=true;
initialpp[i].material.diffuseTexture=tex
 var cid = noa.entities.add( [x,y+1,z+0.5], 0.5, 0.5,initialpp[i].clone('tak'), [0.2,initialpp[i].scaling.y/2,0.2], true, false,true,null )
 pp.push(cid)


 var body = noa.entities.getPhysicsBody(cid)

	 
	     body.applyImpulse([initialpp[i].scaling.y*2-1,initialpp[i].scaling.y*14,initialpp[i].scaling.y*2-1]);
	    
						
						
								setTimeout(function() {
									  for (var i =0;i <pp.length;i++){
								noa.ents.deleteEntity(pp[i])
								ppready=true
							 }
							 }, 1500);
		  
		  
	                
	   

	}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	export function crater(x,y,z,noa,socket){

	
	var radius=6;
	var rad = Math.ceil(radius)
//	console.log('wasgggg');
	for (var i=-rad-1;i<=rad+1;i++){
		for (var k=-rad-1;k<=rad+1;k++){
		for (var j=-rad-1;j<=rad+1;j++){
			if (i*i + j*j+ k*k <= radius*radius) {
				var a=Math.floor(x)+i
				var b=Math.floor(y)+j
				var c=Math.floor(z)+k
			
				
									if(Math.floor(y)+j>-5){
											//noa.addBlock(0,[Math.floor(x)+i ,Math.floor(y)+j ,Math.floor(z)+k ]);
												//socket.emit('block-break', [Math.floor(x)+i ,Math.floor(y)+j ,Math.floor(z)+k ])
												
												 socket.emit('block-place', {position: [Math.floor(x)+i ,Math.floor(y)+j ,Math.floor(z)+k ],angle:'north',id:1,info:'positionClose'})
									}else{
										
										//socket.emit('block-break', [Math.floor(x)+i ,Math.floor(y)+j ,Math.floor(z)+k ])
										socket.emit('block-place', {position: [Math.floor(x)+i ,Math.floor(y)+j ,Math.floor(z)+k ],angle:'north',id:1,info:'positionClose'})
							//noa.addBlock(0,[Math.floor(x)+i ,Math.floor(y)+j ,Math.floor(z)+k ]);
									}
								
						}
					}
				}
			}
				  
		
	  }
	  
	  export function hollow(x,y,z,noa){
		  
		  
		  var rad=24;
for (var i=-rad-1;i<=rad+1;i++){
		for (var k=-rad-1;k<=rad+1;k++){
		for (var j=-rad-1;j<=rad+1;j++){
			noa.addBlock(0,[Math.floor(x)+i ,Math.floor(y)+j ,Math.floor(z)+k ]);
		}
		}
}


	  }
	  
	  export function village(x,y,z,noa,socket){
		  
		  return;
		  var rad=10;
for (var i=0;i<=rad;i++){
		for (var k=0;k<=rad;k++){
		for (var j=0;j<=rad;j++) {
			
				//if(i==1 && i== rad || k==1 && k==rad || j==1 && j==rad){
				//noa.addBlock(1,[Math.floor(x)+i ,Math.floor(y)+j ,Math.floor(z)+k]);
				if(i==0 || i== rad || k==0 || k==rad || j==0 || j==rad ){
				socket.emit('block-place', [Math.floor(x)+i ,Math.floor(y)+j ,Math.floor(z)+k])
				}
				//}
		 }
		}
   }
	  }
	  
 function isPlayerInside(pos, x, y,z){
	return pos.x > x && pos.y > y && pos.z > z;
}
	
	
	
	function clamp(min, max, val) {
    return Math.min(Math.max(min, +val), max);
}




 
 

var viewdirection=null;

export function blocklook(pos){
	var up=false
	var playerp=noa.ents.getState(noa.playerEntity, noa.entities.names.position).position
	
	
	if(pos[1]-Math.floor(playerp[1])>1){
		up=true
	}
	 var rad=BABYLON.Tools.ToDegrees(noa.camera.heading)	 

		 
		 if(rad>320  || rad <50){
	//viewdirection=[0,Math.PI,0,[0,0,0]]
	
	viewdirection=[0,Math.PI,0,[0,0,-0.40]]
	if(up){
		viewdirection= [0,Math.PI,Math.PI,[0,1,0]]
	}
	//'north'
	
}
if(rad>130 && rad<230){
	//viewdirection=[0,0,0,[0,0,0]]
	viewdirection=[0,0,0,[0,0,0.40]]
	//'south'
	if(up){
		viewdirection= [0,0,Math.PI,[0,1,0]]
	}
}
if(rad>50 && rad<130){
	//viewdirection=[0,-Math.PI/2,0,[0,0,0]]
	viewdirection=[0,-Math.PI/2,0,[-0.4,0,0]]
	//'left'
	if(up){
		viewdirection=  [0,-Math.PI/2,Math.PI,[0,1,0]]
	}
	
}

if(rad>230 && rad<320){
	//viewdirection=[0,Math.PI/2,0,[0,0,0]]
	viewdirection=[0,Math.PI/2,0,[0.4,0,0]]
	//'right'
	if(up){
		viewdirection=   [0,Math.PI/2,Math.PI,[0,1,0]]
	}
}
return viewdirection;

 }
 
 var viewangle=null
 
 
 export function rideview(noa){
	
	 var rad=BABYLON.Tools.ToDegrees(noa.camera.heading)	 

		 
		 if(rad>320  || rad <50){
	
	viewangle='north'
	
}
if(rad>130 && rad<230){
	
	viewangle='south'
	
}
if(rad>50 && rad<130){
	
	viewangle='east'
	
	
}

if(rad>230 && rad<320){
	
	viewangle='west'
	
}
return viewangle;

 }
 
 function buildschema(data1,data2){
	 console.log(data1)
	  console.log(data2)
	  //return;
	 if(data2[2]>data1[2] && data2[0]>data1[0]){
				for (var i=data1[0];i<data2[0];i++){
				for (var j=data1[1];j<data2[1];j++){
				for (var k=data1[2];k<data2[2];k++){


				var t=noa.getBlock(i,j,k)
						if(t>0){
							housedata.push([i-data1[0],j-data1[1],k-data1[2],t])
						}

				}
				}
				}										

	 }
	 
	 
	  if(data2[2]<data1[2] && data2[0]<data1[0]){
				for (var i=data2[0];i<data1[0];i++){
				for (var j=data2[1];j<data1[1];j++){
				for (var k=data2[2];k<data1[2];k++){


				var t=noa.getBlock(i,j,k)
						if(t>0){
							housedata.push([i-data1[0],j-data1[1],k-data1[2],t])
						}

				}
				}
				}										

	 }else{
		 console.log('schema failed')
	 }
	 
	 
 }
 
 
 function schemarun(socket){
	 console.log('hello')
	 
	 var pos=noa.ents.getPosition(noa.playerEntity)
	 console.log(pos)
	
	// var posy=[Math.floor(pos[0]),Math.floor(pos[1]),Math.floor(pos[2])]
	 for (var i =0;i<housedata.length;i++){
		 
		 //noa.setBlock(housedata[i][3],[housedata[i][0]+posy[0],housedata[i][1]+posy[1],housedata[i][2]+posy[2]])
		 var k=[housedata[i][0]+Math.floor(pos[0]),housedata[i][1]+Math.floor(pos[1]),housedata[i][2]+Math.floor(pos[2])]
		 //console.log(k)
		 //noa.setBlock(housedata[i][3],k)
		 var c='none'
		 socket.emit('block-place', {position:k,angle:c,id:housedata[i][3]})
	 }
	 
 }
		 
 

 

						
						
						
						/*Engine.prototype.flagToRemoveGrass=function (e, t, i) {
							var r =Math.random() *7;
							setTimeout(function () {
								//console.log(noa.getBlock(e, t, i)+'wow')
								if (noa.getBlock(e, t-1, i) == 6) {
								
									
								}
							}, r*1000);
			  }  */
			  
			  
			/*  Engine.prototype.checkUpForBlocker=function(e, t, i) {
								//console.log('you rock nabil');
									/*for (var r = 0, n = t;
								//(0 == r || r == flowerID || r == 3 ) && n < 64;) n += 1, r = noa.getBlock(e, n, i);
								(0 == r || r == blocks.dirt || r == 3 ) && n < 64;) n += 1, r = noa.getBlock(e, n, i);*/
								/*var stop=false;
								var r=0;
								for (var j=t;j<64;j++){
									if(!stop){
										
									r = noa.getBlock(e, t+j, i);
									if(r!==0){
									stop=true;
									}
									}
									
										
								}
						
							
								return r;
							
						};*/
		

function make(name,socket){//
	
	//console.log(blocks[blockIDs])
	//console.log(blocks)
	var pos=noa.ents.getPosition(noa.playerEntity)
	var img=new Image()
	img.src='textures/item/'+name+'.png';
	setTimeout(function () {
							
						
	
	var mesharrays=[];
	var colors;
	var objectContext = window.document.createElement('canvas').getContext('2d');
	var Scale=0.065//0.05;
    var smallimg=16;
	var medimg=32;//
	//var J=null;
	//var scene=noa.rendering.getScene();
		var box =  BABYLON.Mesh.CreateBox("box", 0.065, scene);
		//var box= BABYLON.MeshBuilder.CreatePlane("plane", {size:0.05}, scene);
		scene.removeMesh(box);
		
				var mat = new BABYLON.StandardMaterial("mat", scene,false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);
				//objectContext.drawImage(document.getElementById(name),0,0,16,16);
				objectContext.drawImage(img,0,0,16,16);
			
				
			
			{
				var bits=16; // 16 pixels
				for (var intFor1 = 0; intFor1 < bits; intFor1 += 1) {
					for (var intFor2 = 0; intFor2 < bits; intFor2 += 1) {
						
						var intColor = objectContext.getImageData(intFor1, intFor2,1, 1).data
						
						
						
						if (intColor[3] === 0) {
							continue;
						}
						  //var mesh=box.clone('box1');
						  //mesh.name=name;
						  //box.geometry.copy(BABYLON.Geometry.RandomId()).applyToMesh(mesh);
						  
						//  noa.setBlock(1,[intFor1,(-intFor2)+16+40,0]);
						  var c='none'
					    var x=Math.floor(pos[0])
						var y=Math.floor(pos[1])
						var z=Math.floor(pos[2])
						/*	if(name==='item_apple'){
								
								noa.setBlock(1,[intFor1,(-intFor2)+16,0]);
							}*/
						/*var x=	mesh.position.x += Scale * (8- intFor1);
							var y=		 mesh.position.y += Scale * (8- intFor2);
							var z=		 mesh.position.z += 0.0;*/
							//console.log( new BABYLON.Color3(intColor[0]/255, intColor[1]/255,intColor[2]/255))
							if((intColor[0]/255)>0.5){
								socket.emit('block-place', {position: [intFor1+x-8,(-intFor2)+16+y,0+z],angle:c,id:blockIDs['red_wool']})
							}else{
									socket.emit('block-place', {position: [intFor1+x-8,(-intFor2)+16+y,0+z],angle:c,id:1})
							}
									 	   //colorVertices(mesh, new BABYLON.Color3(intColor[0], intColor[1],intColor[2] )) 
								
						  }
					

				}
			}
			
		
	function colorVertices(mesh, color) {
	
		var positions = mesh.getVerticesData(BABYLON.VertexBuffer.PositionKind);

	    colors = [];

	 for (var i = 0; i<positions.length/3; i ++) {
		 
		 colors.push(color.r/255, color.g/255, color.b/255, 1);
	      
	    }

	    mesh.setVerticesData(BABYLON.VertexBuffer.ColorKind, colors,false, false);
			
	};
 
	}, 3000);

	//return supermesh;
	
}





	
	function pistonmesh(noa,x,y,z){
		var url=['block/piston_side','block/piston_inner','block/piston_top','block/piston_side','block/piston_side','block/piston_side']
	var mesh = {}
	var mat = {}
	for (var x = 0; x < 6; x++) {
		var matname = name + '-' + x || 'sprite-mat'
		
		if(x==0){
					//right
				mesh[x] = BABYLON.Mesh.CreatePlane('sprite-' + matname, 1, scene) //
				}
				if(x==1){
					//left
			mesh[x] = BABYLON.Mesh.CreatePlane('sprite-' + matname, 1, scene)
				}
				if(x==2){
					//front
				mesh[x] = BABYLON.Mesh.CreatePlane('sprite-' + matname, 1, scene)
				}
				if(x==3){
					//back
			mesh[x] = BABYLON.Mesh.CreatePlane('sprite-' + matname, 1, scene)
				}
				if(x==4){
					//top
				mesh[x] = BABYLON.Mesh.CreatePlane('sprite-' + matname, 1, scene)
				}
				if(x==5){
					//bottom
				mesh[x] = BABYLON.Mesh.CreatePlane('sprite-' + matname, 1, scene)
				}
		//mesh[x] = BABYLON.Mesh.CreatePlane('sprite-' + matname, 1, scene)
		mat[x] = noa.rendering.makeStandardMaterial(matname + x)
		mat[x].backFaceCulling = false
		
		
		
		if(url.length>4){
			
					if(x==0){
					//right
				mat[x].diffuseTexture = new BABYLON.Texture('textures/'+ url[5]+'.png', scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE) //
				}
				if(x==1){
					//left
				mat[x].diffuseTexture = new BABYLON.Texture('textures/'+ url[4]+'.png', scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
				}
				if(x==2){
					//front
				mat[x].diffuseTexture = new BABYLON.Texture('textures/'+ url[0]+'.png', scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
				}
				if(x==3){
					//back
				mat[x].diffuseTexture = new BABYLON.Texture('textures/'+ url[3]+'.png', scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
				}
				if(x==4){
					//top
				mat[x].diffuseTexture = new BABYLON.Texture('textures/'+ url[1]+'.png', scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
				}
				if(x==5){
					//bottom
				mat[x].diffuseTexture = new BABYLON.Texture('textures/'+ url[2]+'.png', scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
				}
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
	
newmesh.scaling.y=0.6

var newmesh2=newmesh.clone('top')
newmesh2.scaling.y=0.2
newmesh2.parent=newmesh


 var cid = noa.entities.add( [x,y+0.5,z], 0.5, 0.5,newmesh.clone('tak'), [0.2,1/2,0.2], false, false,false,null )
cube[name]=newmesh;
//return newmesh;			
		
		
	}
	

	
	
	
	function makesky(scene){
		var imageheight=615
	         var imagewidth=820
	         var pixely=1/imageheight;
	         var pixelx=1/imagewidth;
	         var num=1;
			 
			 
			  var faceUV = new Array(6);
		
		var n=[new BABYLON.Vector4(pixelx*0,-pixely*(409+num),pixelx*(205+num),-pixely*(205)),//face
	new BABYLON.Vector4(pixelx*614,-pixely*(409+num),pixelx*(819+num),-pixely*(205)),//back 
	new BABYLON.Vector4(pixelx*409,-pixely*(409+num),pixelx*(409+num),-pixely*(205)),//new BABYLON.Vector4(0.0625,0.125,0.125,0.375),//right
	new BABYLON.Vector4(pixelx*205,-pixely*(409+num),pixelx*(409+num),-pixely*(205)),//new BABYLON.Vector4(0,0.125,0.046,0.375),//left
	new BABYLON.Vector4(pixelx*205,-pixely*(205+num),pixelx*(409+num),-pixely*(0)),//top head
	new BABYLON.Vector4(pixelx*205,-pixely*(614+num),pixelx*(409+num),-pixely*(409))];//bottom*/
		
		var  uvoptions = {
        height: 1000,
		depth:1000,
		width:1000,
		//faceUV: n,
		wrap: true,
        updatable: true
    };	
			 
	var skybox = BABYLON.MeshBuilder.CreateBox("skyBox", uvoptions, scene);
 var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
skyboxMaterial.backFaceCulling = false;
skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(mod+"textures/skybox/space/skybox", scene);
//skyboxMaterial.ambientTexture = new BABYLON.Texture(mod+"textures/skybox/space/coolsky.jpg", scene);
//new BABYLON.CubeTexture("textures/daybox/thefog", scene);
skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
skyboxMaterial.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5);
skyboxMaterial.ambientColor = new BABYLON.Color3(0, 0,0);
skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
skybox.material = skyboxMaterial;

/*setInterval(function(){ 
     skyboxMaterial.reflectionTexture.vOffset -= 1/20;
     }, 100);*/

noa.rendering.addMeshToScene(skybox,false)
  return skybox;
	
}


function shaderfun(noa){
	
	var scene=noa.rendering.getScene();
	
	let box = BABYLON.Mesh.CreateBox("box", 10, scene); //scene is optional and 
	
	let box2 = BABYLON.Mesh.CreateBox("box", 10, scene); //scene is optional and 
	
	box.position.y=40
	box2.position.y=40
	box2.position.x+=10
	noa.rendering.addMeshToScene(box,false)
	noa.rendering.addMeshToScene(box2,false)
	
	
	var tex = new BABYLON.Texture('textures/block/endportal.png', scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
	
	
	
		   var shaderMaterial = new BABYLON.ShaderMaterial("shaderportal", scene, {
                    vertex: "end",
                    fragment: "end",
                },
                    {
                        attributes: ["position", "normal", "uv"],
                        uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
                    });




	shaderMaterial.backFaceCulling=false

	//box.rotation.y += 0.81
	
	 var refTexture = new BABYLON.Texture("textures/block/endportal.png", scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);
                refTexture.wrapU = BABYLON.Texture.CLAMP_ADDRESSMODE;
                refTexture.wrapV = BABYLON.Texture.CLAMP_ADDRESSMODE;
	 //shaderMaterial.setFloat("time", 0);
shaderMaterial.setTexture("textureSampler", tex);
shaderMaterial.setTexture("refSampler", refTexture);
shaderMaterial.diffuseTexture=tex
          shaderMaterial.setFloat("time", 0);
                //shaderMaterial.setVector3("cameraPosition", BABYLON.Vector3.Zero());
                shaderMaterial.backFaceCulling = false;


	box.material =shaderMaterial// mat
box2.material =shaderMaterial// mat
	var time = 0;
	
	setInterval(function(){ 
       var shaderMaterial = scene.getMaterialByName("shaderportal");
                shaderMaterial.setFloat("time", time);
                time += 0.02;
   refTexture.vOffset -= 1/18;
                shaderMaterial.setVector3("cameraPosition", scene.activeCamera.position);

                scene.render();
     }, 100);
	 
	 

	
}


function makemap(noa,mainp){
	
	var scene=noa.rendering.getScene();

	var supermesh = BABYLON.Mesh.CreatePlane('spritetest',0.7, scene)//makeBigMesh(noa, scene, texture, 'lol')//BABYLON.MeshBuilder.CreateBox(name, uvoptions, noa.rendering.getScene())
			var font_size = 96
			
			function setCanvasScalingFactor() {
   return window.devicePixelRatio || 1;
}
   var pixelRatio = setCanvasScalingFactor();
	var font = "bold " + font_size + "px 'lato'"
			var mat= noa.rendering.makeStandardMaterial('johnny')
			//  var tex = new BABYLON.RenderTargetTexture("depth", 512, scene, true, true);
	

			   var tex = new BABYLON.DynamicTexture("DynamicTexture", {width:Math.round(50 * pixelRatio), height:Math.round(50* pixelRatio)}, scene, false)
			   //tex.drawText('word up', null, null, font, "#eeeeee", "#00000066", true)
			   mat.diffuseTexture = tex
			 
			  /*  var img = new Image();
	img.src = 'textures/block/sand.png';
	mat.diffuseTexture.clear()
	img.onload = function() {
	mat.diffuseTexture._context.drawImage(img,0,0,64,64)
	mat.diffuseTexture.drawText('  mesher', null, null, font, "#eeeeee", "#00000066", true)
	mat.diffuseTexture.update()
	}*/
	
supermesh.parent=mainp._children[2]
	var dat = noa.entities.getPositionData(noa.playerEntity)
	setInterval(function(){  
	//console.log(pixelRatio)
	mat.diffuseTexture.clear()
	
		mat.diffuseTexture._context.imageSmoothingEnabled = false;
	//mat.diffuseTexture._context.canvas.outerHTML= "<canvas width="100" height="100"></canvas>"
	mat.diffuseTexture._context.lineWidth=pixelRatio
	mat.diffuseTexture._context.font="1px sans-serif"
	 mat.diffuseTexture._context.imageSmoothingEnabled = false;
	    mat.diffuseTexture._context.canvas.style.imageRendering="pixelated";
		  mat.diffuseTexture._context.canvas.style.imageRendering="crisp-edges";
		  
		  mat.diffuseTexture._context.canvas.style.imageRenderin="-webkit-crisp-edges";
		  mat.diffuseTexture._context.canvas.style.imageRendering="-moz-crisp-edges";

	var u=Math.round(dat.position[0])
	var ku=Math.round(dat.position[2])

	var c=0
	var d=0
	for (var i=(u-25);i<(u+25);i++){
		
		for (var t=(ku-25);t<(ku+25);t++){
		
		
			mat.diffuseTexture._context.imageSmoothingEnabled = false;
			//console.log(getHighestBlock(noa, i, t))
		if(getHighestBlock(noa, i, t)==blockIDs.watertop){
			//console.log('water')
			//console.log(i-u))
				//console.log(t-ku)
		mat.diffuseTexture._context.fillStyle = "#4fd4e3";
		mat.diffuseTexture._context.fillRect(i+25-u,t+25-ku, 1,1);
		//mat.diffuseTexture.update()
		}else if(getHighestBlock(noa, i, t)==blockIDs.sand){

		mat.diffuseTexture._context.fillStyle = "#eb4034";
		mat.diffuseTexture._context.fillRect(i+25-u,t+25-ku, 1,1);
		//mat.diffuseTexture.update()
		}else if(getHighestBlock(noa, i, t)==blockIDs.grass_snow){

		mat.diffuseTexture._context.fillStyle = "#ffffff";
		mat.diffuseTexture._context.fillRect(i+25-u,t+25-ku, 1,1);
		//mat.diffuseTexture.update()
		}else if(getHighestBlock(noa, i, t)==blockIDs.stone){
			//console.log('stone')
		mat.diffuseTexture._context.fillStyle = "#A99A9B";
		mat.diffuseTexture._context.fillRect(i+25-u,t+25-ku, 1,1);
		//mat.diffuseTexture.update()
		}else if(getHighestBlock(noa, i, t)==blockIDs.sand){
			//console.log('stone')
		mat.diffuseTexture._context.fillStyle = "#f0e88d";
		mat.diffuseTexture._context.fillRect(i+25-u,t+25-ku, 1,1);
		//mat.diffuseTexture.update()
		}else if(getHighestBlock(noa, i, t)==blockIDs.leaves){
			//console.log('stone')
		mat.diffuseTexture._context.fillStyle = "#97ed95";
		mat.diffuseTexture._context.fillRect(i+25-u,t+25-ku, 1,1);
		//mat.diffuseTexture.update()
		}else{
			mat.diffuseTexture._context.fillStyle = "#f09797";
		mat.diffuseTexture._context.fillRect(i+25-u,t+25-ku, 1,1);
		
		
		//mat.diffuseTexture.update()
		}
		
		
	}
	}
	mat.diffuseTexture._context.fillStyle = "#000000";
		mat.diffuseTexture._context.fillRect(25,25, 3,3);//
		mat.diffuseTexture.update()
		
		
		
		
	
	
		  
   // image-rendering: crisp-edges;
	

	
			   
		}, 1000);	   
			//  scene.customRenderTargets.push(tex);
	//tex.activeCamera = scene.activeCameras[1];
    //tex.renderList = scene.meshes;
			//var tex=new BABYLON.Texture('textures/environment/moon_phases.png', scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
			 mat.diffuseTexture._context.canvas.style.imageRenderin="-webkit-crisp-edges";
		  mat.diffuseTexture._context.canvas.style.imageRendering="-moz-crisp-edges";
			mat.diffuseTexture._context.canvas.style.imageRendering="pixelated";
		  mat.diffuseTexture._context.canvas.style.imageRendering="crisp-edges";
		 
		 
			
			supermesh.material=mat
			mat.backFaceCulling=false
			 //supermesh.rotation.x=//Math.PI/2
			
			  noa.rendering.addMeshToScene(supermesh,false)
			//supermesh.position = mainp._children[2].position//new BABYLON.Vector3(0.08, -0.5, 2)
			
		supermesh.position.x=mainp._children[2].position.x+0.5
			supermesh.position.y=mainp._children[2].position.y-1.8//z
			supermesh.position.z=mainp._children[2].position.z-0.9//y ???
			
	
	
	/*supermesh.position.x=mainplayer.position.x
	supermesh.position.y=mainplayer.position.y
	supermesh.position.z=mainplayer.position.z*/
	
	
	
}

function getPixelRatio(context) {
  dpr = window.devicePixelRatio || 1,
    bsr = context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio || 1;

  return dpr / bsr;
}


function getHighestBlock(noa, x, z) {
	for (var y = 110 - 1; y >= 0; y = y - 1) {
		var val = noa.getBlock(x, y, z)
		if (val != 0 && val != 9) return val//{level: y, block: val}
	}
	return null
}


function cooleffect(noa){
	
		shield(noa,mainplayer)
	shield(noa,screenclone)
	headgear(noa,mainplayer)
	headgear(noa,screenclone)
	chestgear(noa,mainplayer)
	chestgear(noa,screenclone)
	//sweet=makeparticle('/particle/big_smoke_0',mainplayer,scene,0.8)
	 noa.soundy('/random/click.ogg', 0.5, null, noa)
	 makepainting(noa,mainplayer)
	
	
	
	
	
}

export function coolparticle(noa,pos,name,timesec,size){
	
			     if(sweet!==null){
			 sweet=null
		 }
		 
		 
//	sweet=makeparticle('/particle/'+name,pos,scene,timesec,size)
	sweet=makeparticle('/particle/'+name,pos,scene,timesec,size)

	
	
	
	
}



function showUI(arg) {

	if (!arg) {
		uiElement.style.display = "none";
	} else {
		uiElement.style.display = "'initial'";
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
			
			
		return [str[2], hit.distance,str[1]];
		} else return null;
	}