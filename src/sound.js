import * as BABYLON from '@babylonjs/core/Legacy/legacy'

var sounds = {}
var c=null
export function playSound(sound, volume, position, noa) {
	var id = Object.keys(sounds)[Object.keys(sounds).length - 1] + 1

	var safeVolume = volume/10
        var scene=noa.rendering.getScene()
	if (0 > volume ) safeVolume = 0
	else if (1 < volume ) safeVolume = 0.1

	//console.log('Playing: ' + sound, 'Volume: ' + volume, 'Position: ' + position)

	if ( (sound.startsWith('http://') || sound.startsWith('https://' ) && game.allowCustom == true)) var url = sound
	else var url = 'audio/' + sound

	if (position != undefined) {
		// c = new BABYLON.Sound('Sound', url, scene , null, 
		sounds[id] = new BABYLON.Sound('Sound',mod+ url, scene , null, 
		
			{ loop: true, autoplay: true, spatialSound: true, maxDistance: 100,volume: 1})
		sounds[id].setPosition(new BABYLON.Vector3(Math.floor(position[0]),Math.floor( position[1]), Math.floor(position[2])) )
		//c.setPosition(new BABYLON.Vector3(Math.floor(position[0]),Math.floor( position[1]), Math.floor(position[2])) )
		//console.log('tap')
	

	} else {
		sounds[id] = new BABYLON.Sound('Sound',mod+ url, noa.rendering.getScene(), play, 
			{ volume: safeVolume})
			console.log(mod+url)
			//console.log('topu')
	}

	sounds[id].onended = function() {
		//c.onended = function() {
		//delete sounds[id]
	}

	function play() { sounds[id].play() }


	// /playsound music/bulby/lake.mp3 1
}