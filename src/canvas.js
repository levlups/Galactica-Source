import {addhat,addcape,addboots,addbackpack,addshield} from './armor'
//////////
var ctx=null;
var img=null
var shieldui=null
var uiElement =null;
var bubbles=null;

global.heldItem=null;
global.heldItemCount=0;
global.heldItemType=0;
var mouseX=0
var mouseY=0




var socket2=null;
document.addEventListener('mousemove', mouseinfo);


var p=-32
var c=-90
var t=50

global.bigsign='';
 var bigsigncount=0
global.tooltip=""




var recipes=[]

var dude=new Image()
dude.src='gui/tiny.png'


var tinu=new Image()
tinu.src='gui/tinu.png'//////
var gold='0$'

var reqContext = require.context('./recipes/', false, /\.json$/)
    reqContext.keys().forEach(name => {
        // convert name ('./foo.js') to bare name ('foo')
      var bareName = /\.\/(.*)\.json/.exec(name)[1]
		
		recipes.push(reqContext(name))
		
		
      
    })



global.uis = {
	inventory: [
		{type: "image", path:"./gui/inventory.png", x: 0, y: 0, width: 170 /window.innerWidth*window.innerWidth, height: 166/window.innerHeight*window.innerHeight},
		{type: "slot", x: c + (18 * 1), y: -p + (18 * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 0},
		{type: "slot", x: c + (18 * 2), y: -p + (18 * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 1},
		{type: "slot", x: c + (18 * 3), y: -p + (18 * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 2},
		{type: "slot", x: c + (18 * 4), y: -p + (18 * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 3},
		{type: "slot", x: c + (18 * 5), y: -p + (18 * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 4},
		{type: "slot", x: c + (18 * 6), y: -p + (18 * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 5},
		{type: "slot", x: c + (18 * 7), y: -p + (18 * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 6},
		{type: "slot", x: c + (18 * 8), y: -p + (18 * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 7},
		{type: "slot", x: c + (18 * 9), y: -p + (18 * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 8},
		
		{type: "slot", x: c + (18 * 1), y: -p + (7 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 9},
		{type: "slot", x: c + (18 * 2), y: -p + (7 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 10},
		{type: "slot", x: c + (18 * 3), y: -p + (7 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 11},
		{type: "slot", x: c + (18 * 4), y: -p + (7 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 12},
		{type: "slot", x: c + (18 * 5), y: -p + (7 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 13},
		{type: "slot", x: c + (18 * 6), y: -p + (7 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 14},
		{type: "slot", x: c + (18 * 7), y: -p + (7 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 15},
		{type: "slot", x: c + (18 * 8), y: -p + (7 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 16},
		{type: "slot", x: c + (18 * 9), y: -p + (7 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 17},
		
		{type: "slot", x: c + (18 * 1), y: -p + (-3 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 18},
		{type: "slot", x: c + (18 * 2), y: -p + (-3 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 19},
		{type: "slot", x: c + (18 * 3), y: -p + (-3 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 20},
		{type: "slot", x: c + (18 * 4), y: -p + (-3 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 21},
		{type: "slot", x: c + (18 * 5), y: -p + (-3 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 22},
		{type: "slot", x: c + (18 * 6), y: -p + (-3 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 23},
		{type: "slot", x: c + (18 * 7), y: -p + (-3 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 24},
		{type: "slot", x: c + (18 * 8), y: -p + (-3 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 25},
		{type: "slot", x: c + (18 * 9), y: -p + (-3 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 26},
		
			{type: "slot", x: c + (18 * 1), y: -p + (-12 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 27},
		{type: "slot", x: c + (18 * 2), y: -p + (-12* 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 28},
		{type: "slot", x: c + (18 * 3), y: -p + (-12 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 29},
		{type: "slot", x: c + (18 * 4), y: -p + (-12 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 30},
		{type: "slot", x: c + (18 * 5), y: -p + (-12 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 31},
		{type: "slot", x: c + (18 * 6), y: -p + (-12 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 32},
		{type: "slot", x: c + (18 * 7), y: -p + (-12 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 33},
		{type: "slot", x: c + (18 * 8), y: -p + (-12 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 34},
		{type: "slot", x: c + (18 * 9), y: -p + (-12 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 35},
		
		{type: "next", x: 54, y: -30, width: 16, height: 16,path:"./gui/next.png"},
		{type: "back", x: 70 ,y: -30, width: 16, height: 16,path:"./gui/back.png"},
		
		{type: "slot", xtype:'boots' ,x: c + (18 * 1), y: -p + (-2-21 * 2),  width: 16, height: 16, slotLoc: "inventory",slotNum: 36},
		{type: "slot", xtype:'leggings' ,x: c + (18 * 1), y: -p + (-2-30 * 2),  width: 16, height: 16, slotLoc: "inventory", slotNum: 37},
		{type: "slot", xtype:'cape' ,x: c + (18 * 1), y: -p + (-2-39 * 2),  width: 16, height: 16, slotLoc: "inventory", slotNum: 38},
		{type: "slot", xtype:'helmet' ,x: c + (18 * 1), y: -p + (-2-48 * 2),  width: 16, height: 16, slotLoc: "inventory", slotNum: 39},
		
		{type: "slot", xtype:'amulet' ,x: c + (18 * 2), y: -p + (-2-21 * 2),  width: 16, height: 16, slotLoc: "inventory",slotNum: 40},
		{type: "slot", xtype:'amulet' ,x: c + (18 * 2), y: -p + (-2-30 * 2),  width: 16, height: 16, slotLoc: "inventory", slotNum: 41},
		{type: "slot", xtype:'amulet' ,x: c + (18 * 2), y: -p + (-2-39 * 2),  width: 16, height: 16, slotLoc: "inventory", slotNum: 42},
		{type: "slot", xtype:'amulet' ,x: c + (18 * 2), y: -p + (-2-48 * 2),  width: 16, height: 16, slotLoc: "inventory", slotNum: 43},
		
		{type: "slot",x: c + (18 * 6), y: -p + (-10-30 * 2),  width: 16, height: 16, slotLoc: "inventory",slotNum: 44},
		{type: "slot", x: c + (18 * 7), y: -p + (-10-30 * 2),  width: 16, height: 16, slotLoc: "inventory", slotNum: 45},
		{type: "slot", x: c + (18 * 6), y: -p + (-10-39 * 2),  width: 16, height: 16, slotLoc: "inventory", slotNum: 46},
		{type: "slot",x: c + (18 * 7), y: -p + (-10-39 * 2),  width: 16, height: 16, slotLoc: "inventory", slotNum: 47},
		
		
		{type: "slot", xtype:'result' ,x: c + (18 * 6.5), y: -p + (-5-21 * 2),  width: 16, height: 16, slotLoc: "inventory", slotNum: 48}
		
	],
	inventory2: [
		{type: "image", path:"./gui/inventory.png", x: 0, y: 0, width: 170, height: 166},//200 was 89
		{type: "slot", x: c + (18 * 1), y: -p + (18 * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 0},
		{type: "slot", x: c + (18 * 2), y: -p + (18 * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 1},
		{type: "slot", x: c + (18 * 3), y: -p + (18 * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 2},
		{type: "slot", x: c + (18 * 4), y: -p + (18 * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 3},
		{type: "slot", x: c + (18 * 5), y: -p + (18 * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 4},
		{type: "slot", x: c + (18 * 6), y: -p + (18 * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 5},
		{type: "slot", x: c + (18 * 7), y: -p + (18 * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 6},
		{type: "slot", x: c + (18 * 8), y: -p + (18 * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 7},
		{type: "slot", x: c + (18 * 9), y: -p + (18 * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 8},
		
	
	
		
		{type: "slot", x: c + (18 * 1), y: -p + (7 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 45},
		{type: "slot", x: c + (18 * 2), y: -p + (7 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 46},
		{type: "slot", x: c + (18 * 3), y: -p + (7 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 47},
		{type: "slot", x: c + (18 * 4), y: -p + (7* 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 48},
		{type: "slot", x: c + (18 * 5), y: -p + (7 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 40},
		{type: "slot", x: c + (18 * 6), y: -p + (7 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 41},
		{type: "slot", x: c + (18 * 7), y: -p + (7 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 42},
		{type: "slot", x: c + (18 * 8), y: -p + (7 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 43},
		{type: "slot", x: c + (18 * 9), y: -p + (7 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 44},
		
		{type: "slot", x: c + (18 * 1), y: -p + (-3 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 45},
		{type: "slot", x: c + (18 * 2), y: -p + (-3 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 46},
		{type: "slot", x: c + (18 * 3), y: -p + (-3 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 47},
		{type: "slot", x: c + (18 * 4), y: -p + (-3 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 48},
		{type: "slot", x: c + (18 * 5), y: -p + (-3 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 49},
		{type: "slot", x: c + (18 * 6), y: -p + (-3 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 50},
		{type: "slot", x: c + (18 * 7), y: -p + (-3 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 51},
		{type: "slot", x: c + (18 * 8), y: -p + (-3 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 52},
		{type: "slot", x: c + (18 * 9), y: -p + (-3 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 53},
		
			{type: "slot", x: c + (18 * 1), y: -p + (-12 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 54},
		{type: "slot", x: c + (18 * 2), y: -p + (-12* 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 55},
		{type: "slot", x: c + (18 * 3), y: -p + (-12 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 56},
		{type: "slot", x: c + (18 * 4), y: -p + (-12 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 57},
		{type: "slot", x: c + (18 * 5), y: -p + (-12 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 58},
		{type: "slot", x: c + (18 * 6), y: -p + (-12 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 59},
		{type: "slot", x: c + (18 * 7), y: -p + (-12 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 60},
		{type: "slot", x: c + (18 * 8), y: -p + (-12 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 61},
		{type: "slot", x: c + (18 * 9), y: -p + (-12 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 63},
		
		{type: "next", x: 54, y: -30, width: 16, height: 16,path:"./gui/next.png"},
		{type: "back", x: 70 ,y: -30, width: 16, height: 16,path:"./gui/back.png"},
		{type: "slot", xtype:'boots' ,x: c + (18 * 1), y: -p + (-22 * 2),  width: 16, height: 16, slotLoc: "inventory",slotNum: 64},
		{type: "slot", xtype:'boots' ,x: c + (27 * 1), y: -p + (-32 * 2),  width: 16, height: 16, slotLoc: "inventory", slotNum: 65}
		//added this
		//{type: "slot", x: -54 + (18 *9), y: -8 + (18 * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 7}//button

		
		
		
	],
	
	inventory3: [
		{type: "image", path:"./gui/inventory.png", x: 0, y: 0, width: 170, height: 166},//200 was 89
		{type: "slot", x: c + (18 * 1), y: -p + (18 * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 0},
		{type: "slot", x: c + (18 * 2), y: -p + (18 * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 1},
		{type: "slot", x: c + (18 * 3), y: -p + (18 * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 2},
		{type: "slot", x: c + (18 * 4), y: -p + (18 * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 3},
		{type: "slot", x: c + (18 * 5), y: -p + (18 * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 4},
		{type: "slot", x: c + (18 * 6), y: -p + (18 * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 5},//added this
		{type: "slot", x: c + (18 * 7), y: -p + (18 * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 6},
		{type: "slot", x: c + (18 * 8), y: -p + (18 * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 7},
		{type: "slot", x: c + (18 * 9), y: -p + (18 * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 8},
		
	
	
		
		{type: "slot", x: c + (18 * 1), y: -p + (7 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 64},
		{type: "slot", x: c + (18 * 2), y: -p + (7 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 65},
		{type: "slot", x: c + (18 * 3), y: -p + (7 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 66},
		{type: "slot", x: c + (18 * 4), y: -p + (7* 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 67},
		{type: "slot", x: c + (18 * 5), y: -p + (7 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 68},
		{type: "slot", x: c + (18 * 6), y: -p + (7 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 69},
		{type: "slot", x: c + (18 * 7), y: -p + (7 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 70},
		{type: "slot", x: c + (18 * 8), y: -p + (7 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 71},
		{type: "slot", x: c + (18 * 9), y: -p + (7 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 72},
		
		
			{type: "slot", x: c + (18 * 1), y: -p + (-3 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum:73},
		{type: "slot", x: c + (18 * 2), y: -p + (-3 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 74},
		{type: "slot", x: c + (18 * 3), y: -p + (-3 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 75},
		{type: "slot", x: c + (18 * 4), y: -p + (-3 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 76},
		{type: "slot", x: c + (18 * 5), y: -p + (-3 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 77},
		{type: "slot", x: c + (18 * 6), y: -p + (-3 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 78},
		{type: "slot", x: c + (18 * 7), y: -p + (-3 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 79},
		{type: "slot", x: c + (18 * 8), y: -p + (-3 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 80},
		{type: "slot", x: c + (18 * 9), y: -p + (-3 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 81},
		
			{type: "slot", x: c + (18 * 1), y: -p + (-12 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 82},
		{type: "slot", x: c + (18 * 2), y: -p + (-12* 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 83},
		{type: "slot", x: c + (18 * 3), y: -p + (-12 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 84},
		{type: "slot", x: c + (18 * 4), y: -p + (-12 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 85},
		{type: "slot", x: c + (18 * 5), y: -p + (-12 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 86},
		{type: "slot", x: c + (18 * 6), y: -p + (-12 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 87},
		{type: "slot", x: c + (18 * 7), y: -p + (-12 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 88},
		{type: "slot", x: c + (18 * 8), y: -p + (-12 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 89},
		{type: "slot", x: c + (18 * 9), y: -p + (-12 * 2), width: 16, height: 16, slotLoc: "inventory", slotNum: 90},
	
		
		{type: "next", x: 54, y: -30, width: 16, height: 16,path:"./gui/next.png"},
		{type: "back", x: 70,y: -30, width: 16, height: 16,path:"./gui/back.png"},
		{type: "armor", x: c + (18 * 1), y: -p + (-21 * 2),  width: 16, height: 16, slotNum: 0}
		//added this
		//{type: "slot", x: -54 + (18 *9), y: -8 + (18 * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 7}//button

		
		
		
	],
	hotbar: [
		{type: "image", path: "gui/item_bar.png", x: 0, y: t+ (18 * 2), width: 168, height: 25},//200 was 89
		{type: "slot", x: c + (18 * 1), y: t + (18 * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 0},
		{type: "slot", x: c + (18 * 2), y: t + (18 * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 1},
		{type: "slot", x: c + (18 * 3), y: t + (18 * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 2},
		{type: "slot", x: c + (18 * 4), y: t + (18 * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 3},
		{type: "slot", x: c + (18 * 5), y: t + (18 * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 4},
		{type: "slot", x: c + (18 * 6), y: t + (18 * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 5},//added this
		{type: "slot", x: c + (18 * 7), y: t + (18 * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 6},
		{type: "slot", x: c + (18 * 8), y: t + (18 * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 7},
		{type: "slot", x: c + (18 * 9), y: t + (18 * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 8}//added this
		//{type: "slot", x: -54 + (18 *9), y: -8 + (18 * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 7}//button

		
		
		
	],
	
	chest:[
	
	{type: "image", path:"./gui/chest.png", x: 0, y: 0, width: 170, height: 87},//200 was 89
		{type: "slot", x: c + (18 * 1), y: -p + (-2 * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 0},
		{type: "slot", x: c + (18 * 2), y: -p + (-2  * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 1},
		{type: "slot", x: c + (18 * 3), y: -p + (-2  * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 2},
		{type: "slot", x: c + (18 * 4), y: -p + (-2  * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 3},
		{type: "slot", x: c + (18 * 5), y: -p + (-2  * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 4},
		{type: "slot", x: c + (18 * 6), y: -p + (-2  * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 5},//added this
		{type: "slot", x: c + (18 * 7), y: -p + (-2  * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 6},
		{type: "slot", x: c + (18 * 8), y: -p + (-2  * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 7},
		{type: "slot", x: c + (18 * 9), y: -p + (-2  * 2), width: 16, height: 16, slotLoc: "itemBar", slotNum: 8},
		
		{type: "slot", x: c + (18 * 1), y: -p + (-13 * 2), width: 16, height: 16, slotLoc: "chest", slotNum: 9},
		{type: "slot", x: c + (18 * 2), y: -p + (-13 * 2), width: 16, height: 16, slotLoc: "chest", slotNum: 10},
		{type: "slot", x: c + (18 * 3), y: -p + (-13 * 2), width: 16, height: 16, slotLoc: "chest", slotNum: 11},
		{type: "slot", x: c + (18 * 4), y: -p + (-13 * 2), width: 16, height: 16, slotLoc: "chest", slotNum: 12},
		{type: "slot", x: c + (18 * 5), y: -p + (-13 * 2), width: 16, height: 16, slotLoc: "chest", slotNum: 13},
		{type: "slot", x: c + (18 * 6), y: -p + (-13 * 2), width: 16, height: 16, slotLoc: "chest", slotNum: 14},
		{type: "slot", x: c + (18 * 7), y: -p + (-13 * 2), width: 16, height: 16, slotLoc: "chest", slotNum: 15},
		{type: "slot", x: c + (18 * 8), y: -p + (-13 * 2), width: 16, height: 16, slotLoc: "chest", slotNum: 16},
		{type: "slot", x: c + (18 * 9), y: -p + (-13 * 2), width: 16, height: 16, slotLoc: "chest", slotNum: 17}
		
		
	
	
     ]
}

var wichhud={0:uis.inventory,1:uis.inventory2,2:uis.inventory3};

var wichhudnum=0
global.itemBarItems=[

];

var itemBarItemsType=[

];

var itemBarItemsCount=[

];

var armorItems=[
null,
null,
null
];

var armorItemsType=[
null,
null,
null
];

var inventoryItems=[

];

var inventoryItemsType=[

];

var inventoryItemsCount=[

];


var chestItems=[

];

var chestItemsType=[

];

var chestItemsCount=[

];



function mouseinfo(e){
/*	numhits=0
	var tex = new BABYLON.Texture(mod+"textures/particle/"+numhits+".png", scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
		tex.hasAlpha=true
		//console.log(noa.rendering._highlightMesh.material)
		noa.rendering._highlightMesh.material.alpha=1
		noa.rendering._highlightMesh.material.diffuseTexture=tex*/
	
	
	mouseX=e.screenX
	mouseY=e.screenY
	
	if (currentUI !== null) {
		var mousePos = getMousePos(event);
		
		for (var i of currentUI) {
			var x = (uiElement.width / 2) - (i.width * 4 / 2) + i.x * 4;
			var y = (uiElement.height / 2) - (i.height * 4 / 2) + i.y * 4;
	
			switch (i.type) {
			
				
				
					case "slot":
					if (isInsideRect(mousePos, x, y, i.width, i.height)) {
						if (i.slotLoc === "itemBar") {
							if (heldItem === null) {
								
								
								if(itemBarItemsType[i.slotNum]==null){
									tooltip=''
								}else{
								tooltip=itemBarItemsType[i.slotNum].name;
								}
							
								
							} 
							if (heldItem !== null) {
								
							
								tooltip=''
							
								
							} 
						}
						if (i.slotLoc === "inventory") {
							if (heldItem === null) {
								
								if(inventoryItemsType[i.slotNum]==null){
								tooltip=''
								}else{
								tooltip=inventoryItemsType[i.slotNum].name;
								}
							
								
							} 
							if (heldItem !== null) {
								
								
								
								tooltip=''
							
								
							} 
							
						
						}
						if (i.slotLoc === "chest") {
							if (heldItem === null) {
								
								if(chestItemsType[i.slotNum]==null){
								tooltip=''
								}else{
								tooltip=chestItemsType[i.slotNum].name;
								}
							
								
							} 
							if (heldItem !== null) {
								
								
								
								tooltip=''
							
								
							} 
							
						
						}
						
						
					}
					
			}
		}
	}
	
	
}

global.selectedimage=new Image()
selectedimage.src="./gui/selected.png"
global.itemBarSelection=0


var invimage=new Image()
invimage.src="./gui/inventory.png"

export function updateinv(noa2){
	
	
	if(currentUI==uis.chest){
		return;
	}
	
	//alert(page)
itemBarItems=[]
itemBarItemsCount=[]
itemBarItemsType=[]


var k=Object.keys(items).length
for (var i=0;i<k;i++){
	
	var c=noa2.ents.getState(noa2.playerEntity, 'inventory').main[i].id
	var d=noa2.ents.getState(noa2.playerEntity, 'inventory').main[i].count
	
	
	
	

/*if(c==undefined){
	//if(items[c]==undefined){
	itemBarItems[i]=null
	itemBarItemsCount[i]=0
}
else{*/
	
	if(i<9){
		if(items[c]!==undefined){
	itemBarItems[i]=mod+"textures/"+items[c].texture+".png"
	itemBarItemsCount[i]=d
	itemBarItemsType[i]=items[c]
		}else{
	itemBarItems[i]=null
	itemBarItemsCount[i]=null
	itemBarItemsType[i]=null
		}
	}else{
	if(items[c]!==undefined){

	
	//console.log(mod+"textures/"+items[c].texture+".png")
	inventoryItems[i]=mod+"textures/"+items[c].texture+".png"
	inventoryItemsCount[i]=d
	inventoryItemsType[i]=items[c]
	}else{
		inventoryItems[i]=null
		inventoryItemsCount[i]=null
	inventoryItemsType[i]=null
	}
		
		
	}
}
}


var globalmob=null

export function updatemobinv(noa2,mobid){
	if(currentUI==uis.inventory){
		return;
	}
		/*if(currentUI!==uis.inventory){
			console.log('chest chest');
		return;
	}*/
	globalmob=mobid

chestItems=[]
chestItemsCount=[]
chestItemsType=[]



for (var i=0;i<18;i++){
	
	if(noa2.ents.getState(mobid, 'mobinventory').main[i]!=={}){//

				var l=noa2.ents.getState(mobid, 'mobinventory').main[i].id
				var d=noa2.ents.getState(mobid, 'mobinventory').main[i].count
					
					if(i>8){
				if(items[l]!==undefined){


				chestItems[i]=mod+"textures/"+items[l].texture+".png"
				chestItemsCount[i]=d
				chestItemsType[i]=items[l]
				}else{
					chestItems[i]=null
					chestItemsCount[i]=null
				chestItemsType[i]=null
				}
				
					}

	}


}

currentUI=uis.chest
}

var noa3=null
export function makecanvas(noa2,socket){
//	currentUI=uis.hotbar
	
socket2=socket;
noa3=noa2
updateinv(noa2)

var maxWidth=null
var lineHeight=null
var y=null
var x=null

setTimeout(function(){ 

bubbles=new Image()
bubbles.src=mod+"textures/particle/bubble.png";

//noa.soundy('ambient.ogg',1)

  img = new Image()

 img.src= './gui/heart.png'
 
 shieldui = new Image()
 
 shieldui.src="./gui/shield.png"
uiElement = document.getElementById('ui');
ctx = uiElement.getContext("2d");
ctx.imageSmoothingEnabled = false;
uiElement.style.pointerEvents="none"
uiElement.style.width=window.innerWidth/2
uiElement.style.height=window.innerHeight/2


      
 

}, 500);

global.health=10
global.air=10


var trick=11
var tap=0;

       function wrapText(context ,texter,x,y,maxWidth,lineHeight){

        var words = texter.split(' ');
        var line = '';

        for(var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = context.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            context.fillText(line,x, y);
            line = words[n] + ' ';
            y += lineHeight;
          }
          else {
            line = testLine;
          }
        }
        context.fillText(line, x, y);
      }





var k = document.getElementById('game_chatbox')
	setTimeout(function(){ 
//k.style.display='none'
console.log(chatbox.style.display='none')
	},5000);
	//console.log(mod+"textures/"+blocks[blockIDs['door']].texture[0]+".png")
		
		setTimeout(function(){ 
		
		
	currentUI=uis.hotbar
	chatbox.style.display='initial'
	//k.style.display = 'initial'
		},1000);
		
		var c=new Image();
		c.src='./gui/bokkusu.png';
		
	noa2.on('beforeRender', function(dt) {
		
		
		if(uiElement==null){
			return;
		}
		
		tap+=0.1
	/*if(trick<11 && trick>0){	
	trick--
	}*/
	if(ctx!==null){
	ctx.clearRect(0, 0, uiElement.width, uiElement.height);
	
	
	if(health<0){
		bigsign="dead"
		bigsigncount=20
		health=0
		console.log(bigsigncount)
		
	}
	
	if(currentUI==null){
	ctx.fillStyle = "grey";
ctx.fillRect(0, 0, window.innerWidth,  window.innerHeight);
ctx.fillStyle = "white";
ctx.font = "bold 20px  Monospace";//
var str= "Bismillah in the year 2052 humanity found a way to live in Space and enjoy the beauty of the universe  Bismillah in the year 2052 humanity found a way to live in Space and enjoy the beauty of the universe  ! Bismillah in the year 2052 humanity found a way to live in Space and enjoy the beauty of the universe  Bismillah in the year 2052 humanity found a way to live in Space! and enjoy the beauty of the universe  Bismillah in the year 2052 humanity found a way to live in Space and enjoy the beauty of the universe !"

		//ctx.fillText( str,window.innerWidth/2-str.length,0+tap, str.length*8,40);
		
		/* x=(uiElement.width-maxWidth)/2;
 y=60*/
		 wrapText(ctx ,str,(uiElement.width-400)/2,100+tap,400,25)
		ctx.drawImage(dude, uiElement.width / 2-dude.width, 0+tap, 21*2, 34*2);
		
		ctx.drawImage(tinu, uiElement.width / 2+40-tinu.width, 0+tap, 21*2, 34*2);
	}
		
		
	//ctx.drawImage(c, 0, 0+tap, 300, 300);
	}
	if(uiElement==null){
		return;
	}
	if(currentUI!==null){
		
	
	
			for (var i of currentUI){
				
			var x = (uiElement.width / 2) - (i.width * 4 / 2) + i.x * 4;
			var y = (uiElement.height / 2) - (i.height * 4 / 2) + i.y * 4;
			switch (i.type) {
				
					case "next":
					var j = new Image();
					j.src = i.path;
				
					ctx.drawImage(j, x, y, i.width * 4, i.height * 4);
					
					break;
					
					case "back":
					var j = new Image();
					j.src = i.path;
				
					ctx.drawImage(j, x, y, i.width * 4, i.height * 4);
					
					break;
				
				case "image":
					var j = new Image();
					j.src = i.path;
				
					ctx.drawImage(j, x, y, i.width * 4, i.height * 4);
				
					
					break;
                    
					
		
		case "slot":
					var j = new Image();
					var num = 0;
					if (i.slotLoc === "itemBar") {
						
						
						if( itemBarItems[i.slotNum]!==null){
							
							
						j.src= itemBarItems[i.slotNum]//"./gui/shield.png"
						
						
						if(currentUI==uis.hotbar){
							
							
							
							if(pickedID>8){
								pickedID=0
							}
							if(pickedID<0 ){
								pickedID=8
							}
						
						ctx.drawImage(selectedimage, (pickedID * 72)+308 ,y-5, i.width * 5,i.height * 5);
							
						}
						
						
						ctx.drawImage(j, x, y, i.width * 4, i.height * 4);
						
						
							
						ctx.font = "bold 20px  Monospace";//
                        ctx.fillStyle = "grey";
                         ctx.textAlign = "center";
						 
						 
						 
						 if(itemBarItemsCount[i.slotNum]>0){
					   	ctx.fillText( itemBarItemsCount[i.slotNum],x, y+19, i.width * 4, i.height * 4);
						 }
						 
						ctx.font = "bold 20px  Monospace";//
                        ctx.fillStyle = "white";
                         ctx.textAlign = "center";
						 
						 
						 
						 if(itemBarItemsCount[i.slotNum]>0){
					   	ctx.fillText( itemBarItemsCount[i.slotNum],x, y+16, i.width * 4, i.height * 4);
						 }
						 
					
						}
						
					}
				
					
						if (i.slotLoc === "inventory") {
						if( inventoryItems[i.slotNum]!==null){
							
							if(currentUI!==uis.hotbar){
									j.src= inventoryItems[i.slotNum]//"./gui/shield.png"
								
								
								
								
										ctx.drawImage(j, x, y, i.width * 4, i.height * 4);
										
										
										ctx.font = "bold 20px  Monospace";//
										ctx.fillStyle = "grey";
										 ctx.textAlign = "center";
										 if(inventoryItemsCount[i.slotNum]>0){
										ctx.fillText( inventoryItemsCount[i.slotNum],x, y+19, i.width * 4, i.height * 4);
										 }
										
										ctx.font = "bold 20px  Monospace";//
										ctx.fillStyle = "white";
										 ctx.textAlign = "center";
										 
										 if(inventoryItemsCount[i.slotNum]>0){
										ctx.fillText( inventoryItemsCount[i.slotNum],x, y+16, i.width * 4, i.height * 4);
										 }
										 
								}
						}
						
						
						
					}
					
					if (i.slotLoc === "chest") {
						if( chestItems[i.slotNum]!==null){
							
							if(currentUI!==uis.hotbar){
									j.src= chestItems[i.slotNum]//"./gui/shield.png"
								
								
								
								
										ctx.drawImage(j, x, y, i.width * 4, i.height * 4);
										
										
										ctx.font = "bold 20px  Monospace";//
										ctx.fillStyle = "grey";
										 ctx.textAlign = "center";
										 if(chestItemsCount[i.slotNum]>0){
										ctx.fillText( chestItemsCount[i.slotNum],x, y+19, i.width * 4, i.height * 4);
										 }
										
										ctx.font = "bold 20px  Monospace";//
										ctx.fillStyle = "white";
										 ctx.textAlign = "center";
										 
										 if(chestItemsCount[i.slotNum]>0){
										ctx.fillText( chestItemsCount[i.slotNum],x, y+16, i.width * 4, i.height * 4);
										 }
										 
								}
						}
						
						
						
					}
					break;
					
			}
			
			}
			
			
				var j = new Image();//
			if(heldItem!==null){
				j.src= heldItem
				ctx.drawImage(j, mouseX, mouseY-100, 72, 72);
			}
			
			

									if (currentUI == uis.hotbar) {
							for (var i = 0; i < (health * 20); i += 20) {




								if (i < 100) {
									ctx.drawImage(img, ((uiElement.width / 2) + 10 + i) - 100, (uiElement.height / 2) - 40 + (uiElement.height / 3), 20, 20);

								} else {
									ctx.drawImage(shieldui, ((uiElement.width / 2) + 10 + i) - 100, (uiElement.height / 2) - 40 + (uiElement.height / 3), 20, 20);
								}
							}

							for (var i = 0; i < (air * 20); i += 20) {




								ctx.drawImage(bubbles, ((uiElement.width / 2) + 10 + i) - 100, (uiElement.height / 2) - 20 + (uiElement.height / 3), 20, 20);

							}
						}
										

                   
			}
			
			if(currentUI!==null){
			if(bigsign!==''){
				
				if(bigsigncount>0){
					bigsigncount-=(1/60)
					ctx.font = "bold 30px Monospace";//
		ctx.fillStyle = "gold";
        ctx.textAlign = "center";
				ctx.fillText(bigsign +' :'+Math.round(bigsigncount),window.innerWidth/2,window.innerHeight/2,100,40);
				
				
				if(bigsigncount<0){
					bigsign=''
					bigsigncount=100
					health=9
				}
				
				}
			}
			
			
			
			ctx.font = "bold 30px Monospace";//
		ctx.fillStyle = "gold";
        ctx.textAlign = "center";
			
			
		
		ctx.fillText('gold:'+gold,window.innerWidth*(4/5),window.innerHeight/8,100,40);
			}
			
			if (tooltip!=='' || tooltip!==null || tooltip!=="null" || tooltip!=='null') {
		
		
		
		if(tooltip && currentUI !== uis.hotbar){
		
		ctx.font = "bold 30px Monospace";//
		ctx.fillStyle = "black";
        ctx.textAlign = "center";
			
			
		
		ctx.fillText(tooltip,mouseX , mouseY -100, tooltip.length*10,40);
		
		ctx.font = "bold 30px Monospace";
		ctx.fillStyle = "white";
        ctx.textAlign = "center";
			
			
		ctx.fillText(tooltip,mouseX , mouseY -104, tooltip.length*10,40);
		}
		
			
		
	}
	
	
	
	
	
	
	
});


	
	
	
}


function getMousePos(event) {
    var rect = uiElement.getBoundingClientRect();
    return {x: event.clientX - rect.left, y: event.clientY - rect.top};
}
	
	
	function isInsideRect(pos, x, y, w, h){
	return pos.x > x && pos.x < x + w * 4 && pos.y < y + h * 4 && pos.y > y;
}

window.addEventListener("click", click, false);

function click(event, socket) {

    if (currentUI !== uis.hotbar) {
        document.exitPointerLock()
    }
    if (currentUI !== null) {
		
		
		

        var mousePos = getMousePos(event);

        for (var i of currentUI) {

            var x = (uiElement.width / 2) - (i.width * 4 / 2) + i.x * 4;
            var y = (uiElement.height / 2) - (i.height * 4 / 2) + i.y * 4;
            switch (i.type) {

                case "next":
                    if (isInsideRect(mousePos, x, y, i.width, i.height)) {
                        wichhudnum++

                        if (wichhudnum > 2) {
                            wichhudnum = 2
                        }
                        currentUI = wichhud[wichhudnum]

                        updateinv(noa2)
                    }
                    case "back":
                        if (isInsideRect(mousePos, x, y, i.width, i.height)) {

                            wichhudnum--

                            if (wichhudnum < 0) {
                                wichhudnum = 0
                            }
                            currentUI = wichhud[wichhudnum]

                            updateinv(noa2)
                        }
				
                        case "slot":

                            if (isInsideRect(mousePos, x, y, i.width, i.height)) {


                                if (i.slotLoc === "itemBar") {


                             console.log(itemBarItemsType[i.slotNum])

                                    if (heldItem !== null) {


                                        if (heldItem == itemBarItems[i.slotNum]) {

                                            itemBarItemsCount[i.slotNum] = heldItemCount + itemBarItemsCount[i.slotNum]
                                            heldItem = null
                                            heldItemCount = 0

                                        } else if (itemBarItems[i.slotNum] == null) {
                                            itemBarItems[i.slotNum] = heldItem
											itemBarItemsType[i.slotNum] = heldItemType
                                            itemBarItemsCount[i.slotNum] = heldItemCount
                                            heldItem = null
                                        } else if (itemBarItems[i.slotNum] !== null) {
                                            var t = itemBarItems[i.slotNum]
                                            var d = itemBarItemsCount[i.slotNum]
                                            itemBarItems[i.slotNum] = heldItem
											itemBarItemsType[i.slotNum] = heldItemType
                                            itemBarItemsCount[i.slotNum] = heldItemCount
                                            heldItem = t
                                            heldItemCount = d
                                            itemBarItemsCount[i.slotNum] = 0
                                        }

                                    } else {
									
										
                                        heldItem = itemBarItems[i.slotNum]
										 heldItemType = itemBarItemsType[i.slotNum]
                                        heldItemCount = itemBarItemsCount[i.slotNum]
                                        itemBarItems[i.slotNum] = null
                                        itemBarItemsCount[i.slotNum] = 0
										 itemBarItemsType[i.slotNum] = null
										 
										   chestItems[i.slotNum] = null
                                        chestItemsCount[i.slotNum] = 0
										 chestItemsType[i.slotNum] = null
                                    }
									
									
                                    socket2.emit('inventory-click', {
                                        type: 'left',
                                        slot: i.slotNum
                                    })
									
									
                                }
								if (i.slotLoc === "chest") {
									if(currentUI==uis.chest){
									chestclick(noa,i,socket2)
									}
									return;
								}

                                if (i.slotLoc === "inventory") {
                                          
										  
										 

                                    if (heldItem !== null) {
										//clears crafting result//
										
											// if(currentUI==uis.chest){
											/*  noa.ents.getState(globalmob, 'inventory').main[i.slotNum].id=heldItemType.id
											  var c=  noa.ents.getState(globalmob, 'inventory').main
											  console.log( JSON.stringify(noa.ents.getState(globalmob, 'inventory').main))*/
											  
											  
											  inventoryItemsType[i.slotNum]=heldItemType
											  inventoryItems[i.slotNum] = heldItem
                                              inventoryItemsCount[i.slotNum] =heldItemCount
											  /*c[i.slotNum]=inventoryItemsType[i.slotNum]
											  c[i.slotNum].count= inventoryItemsCount[i.slotNum] */
										  //}
										
											//if(currentUI!==uis.chest){
										socket2.emit('craft', {pos:48,ids:'removeresult',amount:0})
											//}
										
										/////////////
											var num=0
										
										setTimeout(function(){ 
									
									   
										
											
										for(var t=0;t<recipes.length;t++){
											
											
											
												
													
														
													
																for (var i=0 ;i<4;i++){
															if(inventoryItemsType[i+40]!==null){
															
																
																
																
														
															
															if(JSON.stringify(recipes[t].items[i])==JSON.stringify(inventoryItemsType[i+40].name) ){
																num++
																
																
																
														
															}
															
															if(JSON.stringify(recipes[t].items[i])!==JSON.stringify(inventoryItemsType[i+40].name) ){
																num=0
																
																
																
														
															}
															
																}
																}
															
															

                                                      
															
											if(num==recipes[t].items.length){
                                                                      	socket2.emit('craft', {pos:48,ids:recipes[t].result,amount:recipes[t].resamount})
														              break;
																}		
																
														
											
													
										}
												
												
												
											
											
										
										
										   
									
										}, 1000);
										
										
										if(i.xtype=="boots"){
											
											if (heldItemType.data.armortype ==undefined)  return;
                                         
											if(heldItemType.data.armortype!=='boots') return;
											
											
											
											 inventoryItems[i.slotNum] = heldItem
											inventoryItemsType[i.slotNum] = heldItemType
                                            inventoryItemsCount[i.slotNum] = heldItemCount
											
											
											
											
											
												//inventoryItemsType[i.slotNum] = heldItemType
                                            //inventoryItemsCount[i.slotNum] = heldItemCount
                                            heldItem = null
											
										
											
											
											/*setTimeout(function(){ 
											
											if(inventoryItemsType[36].name=='iron_boots' && inventoryItemsType[36].name=='cape' ){
									
											socket2.emit('craft', {pos:40,ids:'iron_boots'})
											
											}
                                    
											}, 3000);*/
											
											//makehat()
											
											
										}
										else if(i.xtype=="leggings"){
											
											if (heldItemType.data.armortype ==undefined)  return;
                                         
											if(heldItemType.data.armortype!=='leggings') return;
											
											 inventoryItems[i.slotNum] = heldItem
											inventoryItemsType[i.slotNum] = heldItemType
                                            inventoryItemsCount[i.slotNum] = heldItemCount
                                            heldItem = null
											
										
											
										}
										else if(i.xtype=="cape"){
											
											if (heldItemType.data.armortype ==undefined)  return;
                                         
											if(heldItemType.data.armortype!=='cape') return;
											
											 inventoryItems[i.slotNum] = heldItem
											inventoryItemsType[i.slotNum] = heldItemType
                                            inventoryItemsCount[i.slotNum] = heldItemCount
                                            heldItem = null
											
									
											addcape(inventoryItemsType[i.slotNum].name,mainplayer)
										socket2.emit('changearmor', { cape: inventoryItemsType[i.slotNum].name    })
											
										}
										else if(i.xtype=="helmet"){
											
											if (heldItemType.data.armortype ==undefined)  return;
                                         
											if(heldItemType.data.armortype!=='helmet') return;
											
											 inventoryItems[i.slotNum] = heldItem
											inventoryItemsType[i.slotNum] = heldItemType
                                            inventoryItemsCount[i.slotNum] = heldItemCount
                                            heldItem = null
											
										socket2.emit('changearmor', { helmet: inventoryItemsType[i.slotNum].name    })
                                        
										
                                      
                                  
											addhat(inventoryItemsType[i.slotNum].name,mainplayer)
										
											
										}
										
										
										else if (heldItem == inventoryItems[i.slotNum]) {

                                            inventoryItemsCount[i.slotNum] = heldItemCount + inventoryItemsCount[i.slotNum]
                                            heldItem = null
                                            heldItemCount = 0
											
										

                                        }


                                       else if (inventoryItems[i.slotNum] == null) {
                                            inventoryItems[i.slotNum] = heldItem
											inventoryItemsType[i.slotNum] = heldItemType
                                            inventoryItemsCount[i.slotNum] = heldItemCount
                                            heldItem = null
                                        } else if (inventoryItems[i.slotNum] !== null) {
                                            var t = inventoryItems[i.slotNum]
                                            var d = inventoryItemsCount[i.slotNum]
                                            inventoryItems[i.slotNum] = heldItem
											// inventoryItemsType[i.slotNum] = heldItemType
                                            inventoryItemsCount[i.slotNum] = heldItemCount
                                            heldItem = t
                                            heldItemCount = d
											heldItemType= inventoryItemsType[i.slotNum]
                                        }

                                    } else {
										if(i.xtype=="result"){
											
											if(inventoryItems[i.slotNum]!==null){
											socket2.emit('craft', {pos:40,ids:'iron_boots',amount:-1})
											socket2.emit('craft', {pos:41,ids:'iron_boots',amount:-1})
											socket2.emit('craft', {pos:42,ids:'iron_boots',amount:-1})
											socket2.emit('craft', {pos:43,ids:'iron_boots',amount:-1})
											}
										}
										
										if(i.xtype=="boots"){
											addboots('none',mainplayer)
											socket2.emit('changearmor', {boots:'none'})
										}
										if(i.xtype=="cape"){
											addcape('none',mainplayer)
											socket2.emit('changearmor', {cape:'none'})
										}
										
										if(i.xtype=="helmet"){
												addhat('none',mainplayer)
												socket2.emit('changearmor',{helmet:'none'})
										}
										
                                        heldItem = inventoryItems[i.slotNum]
										 heldItemType = inventoryItemsType[i.slotNum]
                                        heldItemCount = inventoryItemsCount[i.slotNum]
                                        inventoryItems[i.slotNum] = null
                                        inventoryItemsCount[i.slotNum] = null
                                    }
                                  
                                    socket2.emit('inventory-click', {
                                        type: 'left',
                                        slot: i.slotNum
                                    })
									
								  
                                }
                            }





            }
			if(heldItem!==null){
				
			/*	var matrixangle=noa.camera.getDirection()
				var pos=noa.ents.getState(noa.playerEntity, 'position').position
			socket2.emit('threw-item',{name: heldItemType.name,position:pos,angle:matrixangle,force:8});*/
		       }
        }
    }
    /*if (isInsideRect(mousePos, x, y, i.width, i.height)) {
    						
    						alert('wath')
    				}*/
}


function chestclick(noa,i,socket2){
	var c=  noa.ents.getState(globalmob, 'mobinventory').main
	
	if(heldItem!==null){
		
		                               if (heldItem == chestItems[i.slotNum]) {

                                            chestItemsCount[i.slotNum] = heldItemCount + chestItemsCount[i.slotNum]
                                            heldItem = null
											 heldItemType=null
                                            heldItemCount = 0
                                             c[i.slotNum].count=chestItemsCount[i.slotNum]
                                        }else if(chestItems[i.slotNum]==null){

											  chestItemsType[i.slotNum]=heldItemType
											  chestItems[i.slotNum] = heldItem
                                             chestItemsCount[i.slotNum] =heldItemCount
											 
											
											  c[i.slotNum]={id:heldItemType.name,count:heldItemCount,data:{}}
											
											 heldItem=null
											  heldItemType=null
											   heldItemCount=0
										}
											  
	}else{
		
		
		                              var c=  noa.ents.getState(globalmob, 'mobinventory').main
		
		                                heldItem = chestItems[i.slotNum]
										 heldItemType = chestItemsType[i.slotNum]
                                        heldItemCount = chestItemsCount[i.slotNum]
                                        chestItems[i.slotNum] = null
                                        chestItemsCount[i.slotNum] = 0
										chestItemsType[i.slotNum] = null
										c[i.slotNum]={}
									
	}
	
	                     socket2.emit('inventory-click', {
                                        type: 'left',
                                        slot: i.slotNum
                                    })
									
									
									 for (const key in entityList) {
							 
							 //var c=entityList[key]=globalmob
							// var c=noa.ents.getState(entityList[key], noa.entities.names.entmesh).mob
							 
							 	if(entityList[key]==globalmob){
					
						
							socket2.emit('changemobchest', {
								        id:key,
                                        chest: c
                                        
                                    })
						
						
						            }
									 }
									
}

function resize() {


    uiElement.width = window.innerWidth * window.devicePixelRatio;
    uiElement.height = window.innerHeight * window.devicePixelRatio;
    ctx.imageSmoothingEnabled = false;
}
window.addEventListener("resize", resize);


window.addEventListener("contextmenu", rightclick);

function rightclick(event, socket) {

    if (currentUI !== uis.hotbar) {
        document.exitPointerLock()
    }
    if (currentUI !== null) {
		
		
		

        var mousePos = getMousePos(event);

        for (var i of currentUI) {

            var x = (uiElement.width / 2) - (i.width * 4 / 2) + i.x * 4;
            var y = (uiElement.height / 2) - (i.height * 4 / 2) + i.y * 4;
            switch (i.type) {

                case "slot":

                    if (isInsideRect(mousePos, x, y, i.width, i.height)) {


                        if (i.slotLoc === "itemBar") {
                            socket2.emit('inventory-click', {
                                type: 'right',
                                slot: i.slotNum
                            });


                            if (heldItem == null) {
								
								if(itemBarItemsCount[i.slotNum]%2==1){
                                heldItemCount = 1
								
                                heldItem = itemBarItems[i.slotNum]
                                  heldItemType = itemBarItemsType[i.slotNum]
                                //heldItemCount = Math.round(c / 2)
                                itemBarItemsCount[i.slotNum] == Math.round(itemBarItemsCount[i.slotNum]/2)
								}else{
									 heldItemCount = itemBarItemsCount[i.slotNum]/2
									  heldItem = itemBarItems[i.slotNum]
									  heldItemType = itemBarItemsType[i.slotNum]
									 itemBarItemsCount[i.slotNum]=heldItemCount
								}
                            }



                        }

                        if (i.slotLoc === "inventory") {

                            socket2.emit('inventory-click', {
                                type: 'right',
                                slot: i.slotNum
                            });


                            if (heldItem == null) {
                                heldItemCount = 0
                                heldItem = inventoryItems[i.slotNum]
								heldItemType = inventoryItemsType[i.slotNum]
                                var c = inventoryItemsCount[i.slotNum]
                                var d = (c % 2)
                                heldItemCount = Math.round(c / 2)
                                inventoryItemsCount[i.slotNum] = Math.round(c / 2)
                            }
                        }
                    }




            }
        }
    }



}