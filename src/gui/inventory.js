import { isMobile } from 'mobile-device-detect'




var xi=0;
var yi=0;
export function addheart(){
	health++
		
	}
	
	
	export function addshield(){
	heart++
		
	}

export function setupHotbar(noa, socket) {
	var eid = noa.playerEntity
	var inventory = noa.ents.getState(eid, 'inventory')
	game.hotbarsize = isMobile ? 7 : 9

	var div = document.createElement('table')
	div.classList.add('hotbar')
	div.id = 'game_hotbar'
	document.body.appendChild(div)
	var row = document.createElement('tr')
	var row2 = document.createElement('tr')
	row2.id='row2'

	var hotbar = {}
	
	for (var x = 0; x < game.hotbarsize; x++) { //Create hotbar items
		hotbar[x] = document.createElement('th')
		hotbar[x].id = x
		hotbar[x].addEventListener('click', function(){
			socket.emit('inventory-click', {slot: parseInt(this.id), type: 'select'} )
			noa.ents.getState(eid, 'inventory').selected = parseInt(this.id) 
		
		})
		hotbar[x].classList.add('hotbar_item')
		row.appendChild(hotbar[x])
	}
	if (isMobile) {
		var invButton = document.createElement('th')
		invButton.id = 'hotbar_invbutton'
		invButton.addEventListener('click', function(){ 
			var inv = document.getElementById('game_inventory_screen')
			var input = document.getElementById('game_chatinput')

			if (input.style.display != 'none') {}
			else if (inv.style.display == 'none') {
				inv.style.display = 'initial'
			}
		} )
		row.appendChild(invButton)
	}
	
	
	
	
	//// heart test
	/* hearts = {}
	var c=9
	
	
	for (var x = 0; x < c; x++) { //Create hotbar items
		hearts[x] = document.createElement('th')
		hearts[x].id = 'hearts'
		hearts[x].style="background-image: url('gui/shield.png')"
		hearts[x].style.backgroundRepeat = "no-repeat";
		
		hearts[x].classList.add('hotbar_hearts')
		row2.appendChild(hearts[x])
	}
	
	for (var x = 0; x < c; x++) { //Create hotbar items
		hearts[x] = document.createElement('th')
		hearts[x].id = 'hearts'
		hearts[x].style="background-image: url('gui/heart.png')"
		hearts[x].style.backgroundRepeat = "no-repeat";
		
		hearts[x].classList.add('hotbar_hearts')
		row2.appendChild(hearts[x])
	}
	*/
	

	
	
	
	
	
	
	
	div.appendChild(row2)
	
	/// heart test

	div.appendChild(row)
	var inv = {}
	var sel = inventory.selected
	noa.on('tick', async function(){ //Hotbar updates
		var newsel = inventory.selected
		var newinv = Object.values(inventory.main)
		if (newsel != sel || JSON.stringify(inv) != JSON.stringify(newinv) ) {
			inv = Object.values(inventory.main)
			sel = inventory.selected
			for (var x = 0; x < game.hotbarsize; x++) {
				if (x == sel && !hotbar[x].classList.contains('hotbar_selected')) hotbar[x].classList.add('hotbar_selected')
				else if (x != sel && hotbar[x].classList.contains('hotbar_selected'))  hotbar[x].classList.remove('hotbar_selected')
				hotbar[x].innerHTML = await renderItem(inv[x])
			}
		}
	});
}

var tempslot = {}
var invslot = {}
var inventoryscreen

export async function setupInventory(noa, socket) { // Opens inventory
	var inventory = noa.ents.getState(noa.playerEntity, 'inventory')
	
	
	var invItems = Object.entries(inventory.main)
	var inv = inventory.main
	inventory.bin = {}
	
	var screen = document.createElement('div') // Main screen (blocks integration with canvas)
	inventoryscreen = screen
	screen.id = 'game_inventory_screen'
	screen.style.display = 'none'
	document.body.appendChild(screen)


	var invGui = document.createElement('table') // Inventory table
	invGui.id = 'game_inventory'
	screen.appendChild(invGui)
	var hotbar = {}
	var slot = 9

	var backpack = document.createElement('div') // Backpack Inventory
	backpack.id = 'game_inventory_backpack'

	invGui.appendChild(backpack)


	tempslot = document.createElement('div') // Item at cursor
	tempslot.id = 'tempslot'
	tempslot.classList.add('align-bottom')
	tempslot.classList.add('inventory_temp')
	tempslot.innerHTML = await renderItem(inventory.tempslot)

	screen.appendChild(tempslot)

	if (isMobile) { // Mobile exit button
		var invExit = document.createElement('div')
		invExit.id = 'game_inventory_exit'
		invExit.addEventListener('click', function(){ 
			var inv = document.getElementById('game_inventory_screen')
			inv.style.display = 'none'
		} )
		screen.appendChild(invExit)
	}

	//for (var x = 0; x < (invItems.length/9)-1; x++) {
		// Inventory slots (backpack)
		
		
		for (var x = 0; x < (invItems.length/9)-1; x++) {
		var row = document.createElement('tr')
		backpack.appendChild(row)
		for (var y = 0; y < 7; y++) { 
			invslot[slot] = document.createElement('th')
			invslot[slot].id = slot
			if(slot==10){
				
				///wow//
			invslot[slot].style="background-image: url('gui/heart.png')"
			invslot[slot].style.backgroundRepeat = "no-repeat";
			invslot[slot].style.backgroundSize="cover";
			invslot[slot].style.textAlign="center";
			}
			
			else if(slot==9){
				
				///wow//
			invslot[slot].style="background-image: url("+mod+"textures/block/pumpkin_side.png')"
			invslot[slot].style.backgroundRepeat = "no-repeat";
			invslot[slot].style.backgroundSize="cover";
			invslot[slot].style.textAlign="center";
			
			}else{
				invslot[slot].style="background-image: url('gui/slots.png')"
			invslot[slot].style.backgroundRepeat = "no-repeat";
			invslot[slot].style.backgroundSize="cover";
			invslot[slot].style.textAlign="center";
			}
			invslot[slot].addEventListener( 'click', function(){ 
		
			socket.emit('inventory-click', {type: 'left', slot: parseInt(this.id)}) 
				//checkcape()
				//checkboots()
			
			} )
		
			invslot[slot].addEventListener( 'contextmenu', function(){ 
		
			socket.emit('inventory-click', {type: 'right', slot: parseInt(this.id)}); return false 

			} )
			
		
			
			invslot[slot].classList.add('inventory_item')
			invslot[slot].innerHTML = await renderItem(inv[slot])
			row.appendChild(invslot[slot])
			slot = slot + 1
		}
	}

	var row_hotbar = document.createElement('tr')
	row_hotbar.id = 'game_inventory_hotbar'
	invGui.appendChild(row_hotbar)
	
	for (var x = 0; x < 9; x++) { // Inventory slots (hotbar)
		invslot[x] = document.createElement('th')
		invslot[x].id = x
		invslot[x].classList.add('inventory_item_hotbar')
		invslot[x].addEventListener( 'click', function(){ socket.emit('inventory-click', {type: 'left', slot: parseInt(this.id) }) } )
					
		invslot[x].addEventListener( 'contextmenu', function(){ socket.emit('inventory-click', {type: 'right', slot: parseInt(this.id) }); return false  } )
		invslot[x].innerHTML = await renderItem(inv[x])
		row_hotbar.appendChild(invslot[x])
	}


	var tooltip = document.createElement('div') // Item at cursor
	tooltip.id = 'game_tooltip'
	tooltip.classList.add('item_tooltip')

	screen.appendChild(tooltip)
    screen.addEventListener( 'click', function(){ 
	

	var matrixangle=noa.camera.getDirection()
				var pos=noa.ents.getState(noa.playerEntity, 'position').position
	
	console.log(document.elementFromPoint(xi, yi).id)
	var c=document.elementFromPoint(xi, yi).id
	var j=noa.ents.getState(noa.playerEntity, 'inventory').tempslot.id
	if(c=="game_inventory"){
		socket.emit('threw-item',{name:j,position:pos,angle:matrixangle,force:8});
	}
	if(c=="game_inventory_screen"){
		socket.emit('threw-item',{name:j,position:pos,angle:matrixangle,force:8});
	}
		console.log(noa.ents.getState(noa.playerEntity, 'inventory').tempslot.id)
	
		
		
	
	
	} )


	window.addEventListener("mousemove", function(e){ //Moving items at cursor
		if (screen.style.display != 'none') {
			tempslot.style.left = e.x + 'px'
			tempslot.style.top = e.y + 'px'
             xi=e.x
			 yi=e.y
			var slot = document.elementFromPoint(e.x, e.y).id
			
			var inv2 = noa.ents.getState(1, 'inventory').main

			if (inv2[slot] != undefined && inv2[slot].id != undefined) {
				tooltip.style.left = e.x + 20 + 'px'
				tooltip.style.top = e.y - 10 + 'px'

				tooltip.innerHTML = items[inv2[slot].id].name
				tooltip.style.display = 'initial'
			}
			else tooltip.style.display = 'none'
		}
	});


}


var oldInv = '{}'

export async function updateInventory(noa) { // Update slots
	if (inventoryscreen.style.display != 'none') {
		var inventory = noa.ents.getState(noa.playerEntity, 'inventory')
		var inv = inventory.main

		var json = JSON.stringify(inv)
		if (json != oldInv) {
			oldInv = json
			for (var x = 0; x < Object.entries(inv).length; x++) {
				invslot[x].innerHTML = await renderItem(inv[x])
			}
			tempslot.innerHTML = await renderItem(inventory.tempslot)
		}
	}
}


async function renderItem(item) { // Inventory item rendering

    if (item == undefined) return ''    
	if (item.id == undefined) return ''

	var count = ''
	if (item.count == Infinity) count = 'Inf'
	else if (item.count != 1) count = item.count
	
	if(item.count==0){
		var x = null
		return x
	}
	
	
	


	if (items[item.id].type == 'block') {
		var block = blockIDs[item.id]
		var url = new Array(3)
		var preUrl = new Array(3)
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
			if ( (preUrl[x].startsWith('http://') || preUrl[x].startsWith('https://') ) && game.allowCustom == true) url[x] = preUrl[x]
			else url[x] = mod+'textures/' + preUrl[x] + '.png'
		}

		var x = '<div class="item_icon">' +
					'<div class="cube">' +
						'<div class="cube_face cube_face-right" style="background-image: url('+ url[0] +'"></div>' +
						'<div class="cube_face cube_face-left" style="background-image: url(' + url[1] +'"></div>' +
						'<div class="cube_face cube_face-top" style="background-image: url(' + url[2] + '"></div>' +
					'</div>' + 
				'</div>' + 
				'<div class="item_count float-right">' + count + '</div>'
		return x
	} else if(items[item.id].type == 'block-small'){
		var block = blockIDs[item.id]
		var url = new Array(3)
		var preUrl = new Array(3)
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
			if ( (preUrl[x].startsWith('http://') || preUrl[x].startsWith('https://') ) && game.allowCustom == true) url[x] = preUrl[x]
			else url[x] = 'textures/' + preUrl[x] + '.png'
		}

		var x = '<div class="item_icon">' +
					'<div class="cube">' +
						'<div class="cube_face_small cube_face-right-small" style="background-image: url('+ url[0] +'"></div>' +
						'<div class="cube_face_small cube_face-left-small" style="background-image: url(' + url[1] +'"></div>' +
						'<div class="cube_face_small cube_face-top-small" style="background-image: url(' + url[2] + '"></div>' +
					'</div>' + 
				'</div>' + 
				'<div class="item_count float-right">' + count + '</div>'
		return x
	}else if(items[item.id].type == 'block-flat'){
		try { var txt = items[item.id].texture}
		catch { var txt = 'error' }

		if ( (txt.startsWith('http://') || txt.startsWith('https://')  ) && game.allowCustom == true) var url = txt
		else var url = mod+'textures/'+ txt + '.png'

		return '<div class="item_icon" style="background-image: url(' + url +'"></div><div class="item_count float-right">' + count + '</div>'
	}else if(items[item.id].type == 'block-water'){
		try { var txt = items[item.id].texture}
		catch { var txt = 'error' }

		if ( (txt.startsWith('http://') || txt.startsWith('https://')  ) && game.allowCustom == true) var url = txt
		else var url = mod+'textures/' + txt + '.png'

		return '<div class="item_icon" style="background-image: url(' + url +'"></div><div class="item_count float-right">' + count + '</div>'
	}
}



