import { MaxBlock } from "babylonjs"
import { fudu} from './mesher'

import { makeairjelly} from './blockdef/airjelly'
import { makeflowerpot} from './blockdef/flowerpot'
import { makebed} from './blockdef/bed'
import { watertop} from './blockdef/watertop'
import { watersource} from './blockdef/watersource'
import { waterflow} from './blockdef/waterflow'
import { waterside} from './blockdef/waterside'
import { waterside1} from './blockdef/waterside1'
import { waterside2} from './blockdef/waterside2'
import { stairs} from './blockdef/stairs'
import { pilon} from './blockdef/pilon'
import { wire} from './blockdef/wire'
import { slab} from './blockdef/slab'
import { ground} from './blockdef/ground'
import { kelp} from './blockdef/kelp'
import { door} from './blockdef/door'
import { dooropen} from './blockdef/dooropen'
import { trap} from './blockdef/trap'
import { fence} from './blockdef/fence'
import { fenceside} from './blockdef/fenceside'
import { fire} from './blockdef/fire'
import { portal} from './blockdef/portal'
import { ladder} from './blockdef/ladder'
import { furnace} from './blockdef/furnace'
import { makechest} from './blockdef/chest'
import { makesign} from './blockdef/sign'
/// piston
import { buttonmesh} from './blockdef/buttonmesh'
import { makeframe} from './blockdef/frame'
import { plate} from './blockdef/plate'
import { lever} from './blockdef/lever'
import { torch} from './blockdef/torch'
import { cake} from './blockdef/cake'
import { rail} from './blockdef/rail'
import { railside} from './blockdef/railside'
import { blocklook} from './blocklook'


global.jsoninfo={}
var reqContext = require.context('./json/', false, /\.json$/)
    reqContext.keys().forEach(name => {
        // convert name ('./foo.js') to bare name ('foo')
      var bareName = /\.\/(.*)\.json/.exec(name)[1]
		
		jsoninfo[bareName]=reqContext(name)
		
		
      
    })


			

global.blockIDs = {}
global.blocks = {}
global.items = {}
global.boptions=[]
global.seed=null

global.offmeshes=[]
global.offparticles=[]

export function getBlocks() { return blocks}
export function getItems() { return items}
export function getBlockIDs() { return blockIDs}




export function registerBlocks(noa, blockList, idList,socket) {
	var scene = noa.rendering.getScene()
	
	

	blockIDs = idList
	blocks = blockList

	// Temponary
	
	
	var c=noa.registry.registerMaterial('water', [0.6, 0.6, 1, 0.7], null, true)
	//var j=noa.registry.getMaterialTexture(c)
	
		//c.diffuseTexture.vScale = 0.0625;
	
	setInterval(function(){ 
//noa.registry.setMaterialColor(c,[Math.random(),Math.random(),Math.random()])
	}, 3000);
	//j=[Math.random(),Math.random(),Math.random()]
	
	
	//noa.registry.registerMaterial('lava', [0.8, 0.5, 0.5, 0.99], null, true)
	noa.registry.registerMaterial('barrier', [0.0, 0.0, 0.0, 0.0], null, true)

	//console.log('Blocks: ', blockIDs)
	var entries = Object.entries(blockList)

	entries.forEach(function(item) {
		createBlock(item[0], item[1].name, item[1].type, item[1].texture, item[1].options, item[1].data)
	})

var color=[1,1,1]
	function createBlock(id, name, type, texture, options, data) {
		
	/*if(name=='stone'){
					
					 color=[1,0,0,1]
				}else{
					color=[1,1,1]
				}*/
		color=[1,1,1]
		
		if (type == 0) {
			var mat = []
			if (options.opaque == false) var txtTransparent = true
			else txtTransparent = false
			if (texture.length == 1 && options.material == undefined) {
				
				if ( (texture[0].startsWith('http://') || texture[0].startsWith('https://')  ) && game.allowCustom == true) noa.registry.registerMaterial(name, color, texture[0], txtTransparent)
					
				else noa.registry.registerMaterial(name, color,mod+ 'textures/' + texture[0] + '.png', txtTransparent)
				mat = name
			} else if (options.material == undefined){
				for (var x = 0; x < texture.length; x++) {
					if ( (texture[x].startsWith('http://') || texture[x].startsWith('https://') ) && game.allowCustom == true) noa.registry.registerMaterial(name + x, color, texture[x], txtTransparent)
					else noa.registry.registerMaterial(name  + x, color, mod+'textures/' + texture[x] + '.png', txtTransparent)
					mat.push(name + x)
				}
			} else { mat = options.material}
			var finOpts = options
			
			if(name=='bed'){
				finOpts.onSet= function ( x, y, z) {
				
				noa.setBlock(blockIDs['bedtop'],[x,y,z+1])
				
			}
				
			}
			
			/*if(name=='grass'){
				
				
				
				finOpts.onSet= function ( x, y, z) {
				
				noa.registry.setMaterialColor(3,[0,0,0])
				
				
			}
			
			finOpts.onLoad= function ( x, y, z) {
				
				noa.registry.setMaterialColor(3,[0,0,0])
				
				
			}
				
			}*/
			
			
		
			finOpts.material = mat
			
			
			noa.registry.registerBlock(id, finOpts)
			

		} if (type == 1000) {
			var mat = []
			if (options.opaque == false) var txtTransparent = true
			else txtTransparent = false
			if (texture.length == 1 && options.material == undefined) {
				
				if ( (texture[0].startsWith('http://') || texture[0].startsWith('https://')  ) && game.allowCustom == true) noa.registry.registerMaterial(name, color, texture[0], txtTransparent)
					
				else noa.registry.registerMaterial(name, color,mod+ 'textures/' + texture[0] + '.png', txtTransparent)
				mat = name
			} else if (options.material == undefined){
				for (var x = 0; x < texture.length; x++) {
					if ( (texture[x].startsWith('http://') || texture[x].startsWith('https://') ) && game.allowCustom == true) noa.registry.registerMaterial(name + x, color, texture[x], txtTransparent)
					else noa.registry.registerMaterial(name  + x, color, mod+'textures/' + texture[x] + '.png', txtTransparent)
					mat.push(name + x)
				}
			} else { mat = options.material}
			var finOpts = options
			
			
		
			finOpts.material = mat
			
			
			noa.registry.registerBlock(id, finOpts)
			

		} else if (type == 1) {
			
			
			
			var mesh =makePlantSpriteMesh(noa, scene,texture, name)
			var mesh2 = makeCactusMesh(noa, scene, [texture[0], texture[0]], name)
			var finOpts = options
			/*finOpts.onSet= function ( x, y, z) {
			//if(noa.getBlock(x,y+2,z)!==0){
					mesh.rotation.x=cool.variants['facing=north'].y
					//mesh.material.ambientColor = new BABYLON.Color4(0, 0, 0,0.5);
				//}
			}*/
			finOpts.blockMesh = mesh
			finOpts.onCustomMeshCreate= function (mesh, x, y, z) {//
				var c=blocklook(noa)
				
				//mesh.rotation.x=cool.variants[c].y//*( Math.random()*10)
			}
			
			noa.registry.registerBlock(id, finOpts)
		} else if (type == 2) {
			var mesh = makeCactusMesh(noa, scene, [texture[0], texture[1]], name)
			var finOpts = options
			finOpts.blockMesh = mesh
			noa.registry.registerBlock(id, finOpts)
		} else if (type == 4) {
			var mat = noa.rendering.makeStandardMaterial(name)

			if ( (texture[0].startsWith('http://') || texture[0].startsWith('https://') ) && game.allowCustom == true) var tex = new BABYLON.Texture(texture[0], scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
			else var tex = new BABYLON.Texture(mod+'textures/' + texture[0] + '.png', scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
			
			mat.diffuseTexture = tex
			mat.opacityTexture = mat.diffuseTexture
			mat.backFaceCulling = true
			
			

			var mesh = BABYLON.MeshBuilder.CreateBox(name, {size: 1}, noa.rendering.getScene())
			mesh.material = mat
			mesh.bakeTransformIntoVertices( ( new BABYLON.Matrix.Scaling(1, 1, 1) ).setTranslation ( new BABYLON.Vector3(0, 0.5, 0) ) )
			mesh.opaque = false
			mesh.material.needDepthPrePass = true

			var finOpts = options
			finOpts.blockMesh = mesh
			noa.registry.registerBlock(id, finOpts)
		}
		 else if (type == 5) {
			 //// stairs //////
			 stairs(noa,options,id,texture,jsoninfo[name])
		}
		 else if (type == 6) {
			 
			 ///slab/////
			  slab(noa,options,id,texture)
			 
		}else if (type == 7) {
                
			 
			 //door//
			 if(name=='door'){
			  door(noa,options,id,texture,name,jsoninfo[name])
			 }
			 
			 if(name=='ladder'){
			  ladder(noa,options,id,texture,name,jsoninfo[name])
			 }
			 
			/* if(name=='dooropen'){
			  dooropen(noa,options,id,texture,name)
			 }*/
			
		
			
		}else if(type==8){
			var imageheight=512
	         var imagewidth=16
	         var pixely=1/imageheight;
	         var pixelx=1/imagewidth;
	         var num=1;
			 
			 
			  var faceUV = new Array(6);
	 
	 
	
	
	var n=[new BABYLON.Vector4(pixelx*0,-pixely*(15+num),pixelx*(15+num),-pixely*(0)),//face
	new BABYLON.Vector4(pixelx*0,-pixely*(15+num),pixelx*(15+num),-pixely*(0)),//back 
	new BABYLON.Vector4(pixelx*0,-pixely*(15+num),pixelx*(15+num),-pixely*(0)),//new BABYLON.Vector4(0.0625,0.125,0.125,0.375),//right
	new BABYLON.Vector4(pixelx*0,-pixely*(15+num),pixelx*(15+num),-pixely*(0)),//new BABYLON.Vector4(0,0.125,0.046,0.375),//left
	new BABYLON.Vector4(pixelx*0,-pixely*(15+num),pixelx*(15+num),-pixely*(0)),//top head
	new BABYLON.Vector4(pixelx*0,-pixely*(15+num),pixelx*(15+num),-pixely*(0))];//bottom*/
	
	
  var  uvoptions = {
        height: 0.9,
		depth:1,
		width:1,
		faceUV: n,
		wrap: true,
        updatable: true
    };	
			 
			

  
			 
			 
			//var mesh =BABYLON.MeshBuilder.CreateBox(name, options, noa.rendering.getScene())
			var mesh =BABYLON.MeshBuilder.CreateBox(name, uvoptions, noa.rendering.getScene())
			
	
			var mat = noa.rendering.makeStandardMaterial('cool')
			var tex = new BABYLON.Texture(mod+'textures/' +texture+ '.png', scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
			mat.diffuseTexture = tex//waterytexture(noa)//tex
			tex.hasAlpha=true
			tex.alpha=0.5
			//mat.diffuseTexture.uOffset = 1/32;
			mesh.material=mat
			mat.diffuseTexture.hasAlpha=true
			var offset = BABYLON.Matrix.Translation(0, 0.35, 0)
	        mesh.bakeTransformIntoVertices(offset)
			var finOpts = options
			finOpts.blockMesh = mesh
			setInterval(function(){ 
     tex.vOffset -= 1/32;
     }, 100);
	 
	 
	  /*  blockIDs.waterObject = noa.registry.registerBlock(_id++, {
        blockMesh: mesh,
        opaque: false,
        material: 'water',
        fluid: true,
    })*/
			
			
			
			noa.registry.registerBlock(id, finOpts)
		}else if(type==9){
			//kelp
			kelp(noa,options,id,texture)
			
		}else if(type==10){
			
			makebed(noa,options,id,name,jsoninfo[name])
			
			
										
		}else if(type==11){
			//water
			
			watersource(noa,options,id)
			
			
		}
		
	    else if(type==12){
			
			//water
		waterside(noa,options,id)
		
		
			
		}
		else if(type==13){
		//water
		waterflow(noa,options,id)
		}
		else if(type==14){
			//water
			waterside1(noa,options,id)
			
			
		}
		
		else if(type==15){
			//water
			waterside2(noa,options,id)
			
			
		}else if(type==16){
			//trap
			
			
			trap(noa,options,id,name,jsoninfo[name])
			
			
		}else if(type==17){
			//fence
			console.log(name)
			if(name=='oakfence'){
			fence(noa,options,id,name,jsoninfo[name])
			
		  }if(name=='oakfenceside'){
			fenceside(noa,options,id,name,jsoninfo['oakfence'])
		}
			
			
		}else if(type==18){
			
			fire(noa,options,id,texture)
			
		}else if(type==19){
			
			portal(noa,options,id,texture)
		}else if(type==20){
			
			furnace(noa,options,id,texture,name)
		}else if(type==21){
			//button//
			buttonmesh(noa,options,id,texture,name,jsoninfo[name])
		}else if(type==22){
			//plate//
			plate(noa,options,id,texture,name,socket)
		}else if(type==23){
			//lever//
			lever(noa,options,id,texture,name,socket)
		}else if(type==24){
			//torch
			torch(noa,options,id,texture,name,jsoninfo[name])
		}else if(type==25){
			//rail
			if(name=='rail'){
			rail(noa,options,id,name,jsoninfo[name])
			}
			if(name=='railside'){
			railside(noa,options,id,name,jsoninfo['rail'])
			}
			//rail(noa,options,id,texture,name,socket)
		}else if(type==26){
			
			makeframe(noa,options,id,texture,'frame',jsoninfo[name])
		
		}else if(type==27){
			
			watertop(noa,options,id)
			
		}
		else if(type==28){
			
			ground(noa,options,id,texture)
			
		}
		else if(type==29){
			
			wire(noa,options,id,texture,name,socket)
			
		}else if (type == 30) {
			 
			 ///cake/////
			  cake(noa,options,id,texture)
			 
		}else if(type==31){
			makeairjelly(noa,options,id,name,jsoninfo[name])
		}
		
		else if(name=="flowerpot"){
			makeflowerpot(noa,options,id,name,jsoninfo['chair'])
		}
		
		else if(name=="chest"){
			makechest(noa,options,id,name,jsoninfo[name])
		}
		
		else if(name=="sign"){
			makesign(noa,options,id,name,jsoninfo[name])
		}
		else if(name=="pilon"){
			pilon(noa,options,id,name,jsoninfo[name])
		}
		
		
		
		
		
	}
    
}


export function registerItems(noa, itemList) {
	items = itemList
	//console.log('Items: ', Object.keys(itemList))
	
	
	
}


function makePlantSpriteMesh(noa, scene, url, name) {

	
	

	var matname = name || 'sprite-mat'
	/*if ( (url.startsWith('http://') || url.startsWith('https://') ) && game.allowCustom == true)*/ 
	/*var tex = new BABYLON.Texture(url, scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
	else*/ var tex = new BABYLON.Texture(mod+'textures/'+url[0]+'.png', scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
	tex.hasAlpha = true
	
	var mesh = BABYLON.Mesh.CreatePlane('sprite-' + matname, 1, scene)
	var mat = noa.rendering.makeStandardMaterial(matname)
	mat.backFaceCulling = false
	mat.diffuseTexture = tex
	mat.diffuseTexture.vOffset = 0.99	
	
	
	
	
	mesh.material =mat
	mesh.rotation.y += 0.81

	var offset = BABYLON.Matrix.Translation(0, 0.5, 0)
	mesh.bakeTransformIntoVertices(offset)
	var clone = mesh.clone()
	clone.rotation.y += 1.62
	
    //var newmesh=BABYLON.Mesh.MergeMeshes([mesh, clone], true, true, undefined, false, false)
	return BABYLON.Mesh.MergeMeshes([mesh, clone], true, true, undefined, false, false)//newmesh*/
}




function makeCactusMesh(noa, scene, url, name) {
	var mesh = {}
	var mat = {}
	for (var x = 0; x < 6; x++) {
		var matname = name + '-' + x || 'sprite-mat'
		mesh[x] = BABYLON.Mesh.CreatePlane('sprite-' + matname, 1, scene)
		mat[x] = noa.rendering.makeStandardMaterial(matname + x)
		mat[x].backFaceCulling = false
		if ( ( ( (x < 4) ? url[1] : url[0]).startsWith('http://') || ( (x < 4) ? url[1] : url[0]).startsWith('https://') ) && game.allowCustom == true) mat[x].diffuseTexture = new BABYLON.Texture( ((x < 4) ? url[1] : url[0]), scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
		else  mat[x].diffuseTexture = new BABYLON.Texture(mod+'textures/' + ((x < 4) ? url[1] : url[0]) + '.png', scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
		
		mat[x].diffuseTexture.hasAlpha = true
		mesh[x].material = mat[x]
		var offset
		if (x == 0) {offset = BABYLON.Matrix.Translation(0, 0.5, 0.435); mesh[x].rotation.y = 1.57}
		else if (x == 1) {offset = BABYLON.Matrix.Translation(0, 0.5, -0.435); mesh[x].rotation.y = 1.57}
		else if (x == 2) {offset = BABYLON.Matrix.Translation(0, 0.5, 0.435);}
		else if (x == 3) {offset = BABYLON.Matrix.Translation(0, 0.5, -0.435);}
		else if (x == 4) {offset = BABYLON.Matrix.Translation(0, 0, -1); mesh[x].rotation.x = 1.57}
		else if (x == 5) {offset = BABYLON.Matrix.Translation(0, 0, 0); mesh[x].rotation.x = 1.57}

		mesh[x].bakeTransformIntoVertices(offset)
	}
	
	var newmesh = BABYLON.Mesh.MergeMeshes(Object.values(mesh), true, true, undefined, false, false)

	return newmesh

}


function waterytexture(noa){
	
	
	
	            var t = new Float32Array(256),
                i = new Float32Array(256),
                n = new Float32Array(256),
                r = new Float32Array(256),
                o = new Uint8ClampedArray(1024),
                a = new BABYLON.DynamicTexture("waterTexture", {
                    width: 16,
                    height: 16
                }, noa.rendering._scene);
            a.hasAlpha = 1, a.anisotropicFilteringLevel = 1, a.updateSamplingMode(BABYLON.Texture.NEAREST_SAMPLINGMODE), a.wrapU = 1, a.wrapV = 1,a.alpha=0.6;
            var s = a.getContext(),
                c = new ImageData(o, 16, 16),
                u = 0;
            noa.on("tick", function(e) {
                ++u % 2 != 0 && l.redraw()
            });
            var l = {
                texture: a,
                tick: function() {},
                redraw: function() {
                    l.update(), s.clearRect(0, 0, 16, 16), s.putImageData(c, 0, 0), a.update()
                },
                update: function() {
                    for (var e = 0; e < 16; e++)
                        for (var a = 0; a < 16; a++) {
                            for (var s = 0, c = e - 1; c <= e + 1; c++) {
                                var u = 15 & c,
                                    l = 15 & a;
                                s += t[u + 16 * l]
                            }
                            i[e + 16 * a] = s / 3.3 + .8 * n[e + 16 * a]
                        }
                    for (var e = 0; e < 16; e++)
                        for (var a = 0; a < 16; a++) n[e + 16 * a] += .05 * r[e + 16 * a], n[e + 16 * a] < 0 && (n[e + 16 * a] = 0), r[e + 16 * a] -= .1, Math.random() < .05 && (r[e + 16 * a] = .5);
                    var h = i;
                    i = t, t = h;
                    for (var f = 0; f < 256; f++) {
                        var s = t[f];
                        s > 1 && (s = 1), s < 0 && (s = 0);
                        var d = s * s,
                            p = 32 + 32 * d,
                            m = 50 + 64 * d,
                            g = 196 + 50 * d;
                        o[4 * f + 0] = p, o[4 * f + 1] = m, o[4 * f + 2] = 255, o[4 * f + 3] = g
                    }
                }
            };
			return a;
	
	
	
	
}

function lerp(start, end, amt){
				return (1-amt)*start+amt*end
			}
