
var cooldown=20
export function setupMovement(noa) {
	
	
	/*"forward": ["W"],
		"left": ["A"],
		"backward": ["S"],
		"right": ["D"]*/
		
		noa.inputs.down.on('forward',function (){
	
		noa.ents.getState(noa.playerEntity, 'mesh').moving = true
			cooldown--
		if(cooldown<0){
			cooldown=20
		}
})

noa.inputs.up.on('forward',function (){
		
		noa.ents.getState(noa.playerEntity, 'mesh').moving = false
})

noa.inputs.down.on('backward',function (){
		
		noa.ents.getState(noa.playerEntity, 'mesh').moving = true
})

noa.inputs.up.on('backward',function (){
		
		noa.ents.getState(noa.playerEntity, 'mesh').moving = false
})
noa.inputs.down.on('left',function (){
		
		noa.ents.getState(noa.playerEntity, 'mesh').moving = true
})

noa.inputs.up.on('left',function (){
		
		noa.ents.getState(noa.playerEntity, 'mesh').moving = false
})

noa.inputs.down.on('right',function (){
		
		noa.ents.getState(noa.playerEntity, 'mesh').moving = true
})

noa.inputs.up.on('right',function (){
		
		noa.ents.getState(noa.playerEntity, 'mesh').moving = false
})

	noa.inputs.down.on('jump',function (){
		
		noa.ents.getState(noa.playerEntity, 'mesh').moving = true
})

noa.inputs.up.on('jump',function (){
		
		noa.ents.getState(noa.playerEntity, 'mesh').moving =false
})
	
	
	
	
}
