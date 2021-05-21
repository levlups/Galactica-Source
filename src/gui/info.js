
export function setupInfo(noa, server, dataLogin) {
	var eid = noa.playerEntity
	var dat = noa.entities.getPositionData(eid)

	var div = document.createElement('div') // Main div
	div.id = 'game_version'
	document.body.appendChild(div)

	var version = document.createElement('span') // Version
	version.innerHTML = game.name + ' ' + game.version +'<br>Noa: ' + noa.version
	div.appendChild(version)

	var world = document.createElement('span') //World
	world.innerHTML = '<br>Server: ' + dataLogin.name + ' [' + server + ']'
	div.appendChild(world)
	
	
	var uiElement = document.createElement("canvas");
uiElement.id="ui"
var uiContext = uiElement.getContext("2d");
uiElement.width = window.innerWidth;
uiElement.height = window.innerHeight;
uiContext.imageSmoothingEnabled = false;
uiElement.style.zIndex = "4000";
uiElement.style.position = "fixed";
uiElement.style.top = "0";
uiElement.style.left = "0";
uiElement.style.backgroundColor = "rgba(0, 0, 0,0)";

div.appendChild(uiElement)


	var pos = document.createElement('span') //Coordinates
	pos.innerHTML = '<br>X: ' + Math.round(dat.position[0]) + ' Y: ' + Math.round(dat.position[1]) + ' Z: ' + Math.round(dat.position[2])
	div.appendChild(pos)

	var chunk = document.createElement('span') //ChunkID
	chunk.innerHTML = '<br>Chunk: 0|0|0'
	div.appendChild(chunk)
	
	var compass = document.createElement('span') //ChunkID
	compass.innerHTML = '<br>Looking:'
	div.appendChild(compass)
	
	

	var timer = 0

	noa.on('tick', function() {
		
		
		if (timer == 3) {
			timer = 0
			compass.innerHTML='<br>Looking :'+compassvar(noa)
			pos.innerHTML = '<br>X: ' + Math.round(dat.position[0]) + ' Y: ' + Math.round(dat.position[1]) + ' Z: ' + Math.round(dat.position[2])
			try {
				chunk.innerHTML = '<br>Chunk: ' + noa.world._getChunkByCoords(dat.position[0], dat.position[1], dat.position[2]).id
			} catch { chunk.innerHTML = '<br>Chunk: ???' }
		}
		else {
			timer++
		}
	})
}

/*export function setupCross() { //More like point in a middle of screen
	var div = document.createElement('div')
	div.id = 'game_cross'
	document.body.appendChild(div)
}*/


export function setupTitle() { //More like point in a middle of screen
	var div = document.createElement('div')
	div.id = 'game_title'
	div.innerHTML='Danger Zone'
	var elem = document.createElement("img");
	elem.setAttribute("src", "./textures/gui/book.png");
	div.appendChild(elem);
	
	div.addEventListener('click', function (event) {
            // do something
			div.innerHTML='lol'
			elem.setAttribute("src", "./textures/gui/accessibility.png");
        });
	document.body.appendChild(div)
}


export function setupBook() { //More like point in a middle of screen
return;
	var div = document.createElement('div')
	div.id = 'game_book'

	div.style.height='300px'
	div.style.width='200px'
	var elem = document.createElement("img");
	elem.setAttribute("src", "./textures/gui/book.png");
	elem.style.position='relative'
	elem.style.height='300px'
	elem.style.width='200px'
	div.appendChild(elem);
	
	var story=document.createElement('div')
	story.innerHTML='lol I know </br> Im super cool'
	
	story.style.position='absolute'
	story.style.top='20px'
	story.style.left='20px'
	div.appendChild(story);
	
	var elem2 = document.createElement("img");
	elem2.setAttribute("src", "./textures/gui/selected.png");
	elem2.style.position='absolute'
	elem2.style.top='70px'
	elem2.style.left='60px'
	div.appendChild(elem2);
	
	var elem3 = document.createElement("img");
	elem3.setAttribute("src", "./textures/gui/selected.png");
	elem3.style.position='absolute'
	elem3.style.top='70px'
	elem3.style.left='10px'
	div.appendChild(elem3);
	
	elem2.addEventListener('click', function (event) {
            // do something
			story.innerHTML='im ripped too'
			
        });
		
			elem3.addEventListener('click', function (event) {
            // do something
			story.innerHTML='lol I know </br> Im super cool'
			
        });
	document.body.appendChild(div)
}

function compassvar(noa){
	
	
	
	var playerp=noa.ents.getState(noa.playerEntity, noa.entities.names.position).position
	
	
	var viewdirection=null
	 var rad=BABYLON.Tools.ToDegrees(noa.camera.heading)//	// 

		 
		 if(rad>320  || rad <50){
	viewdirection='North'

	//'north'
	
}
if(rad>130 && rad<230){
	viewdirection='South'
	//'south'
	
}
if(rad>50 && rad<130){
	viewdirection='East'
	//'left'
	
	
}

if(rad>230 && rad<320){
	viewdirection='West'
	//'right'
	
}
return viewdirection;

 
	
}