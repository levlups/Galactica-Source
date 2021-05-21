var ndarray = require('ndarray')

export function setChunk(id, chunk, noa,socket) {
	//var enty=null
	for (var yoff =0; yoff < 100; yoff++) {
		var noaChunk = new ndarray( new Uint16Array(24 * 24 * 24), [24, 24, 24])
		var localID = id[0] + '|' + yoff + '|' + id[1] + '|default'
		for (var x = 0; x < 24; x++) {
			for (var z = 0; z < 24; z++) {
				for (var y = 0; y < 24; y++) {
					var block = chunk.get(x, (y + (yoff*24) ), z)
					
					if(y + (yoff*24)<100){
					noaChunk.set(x, y, z, block)
					}else{
						noaChunk.set(x, y, z, 0)
					}
					
					/*if(block==74){
						if(enty==null){
							enty=74
							
							setTimeout(function(){ 
							socket.emit('want-zombie',{position:[(x*id[0])-x,y+78,(z*id[1])-z],type:'zombie'});
							}, 10000);
						}
					}*/
				}
			}
		}
		noa.world.setChunkData(localID, noaChunk)
	}

var emptyChunk = new ndarray(new Uint16Array(24 * 24 * 24), [24, 24, 24])
	var localID = id[0] + '|' + -1 + '|' + id[1] + '|default'

	for (var x = 0; x < 24; x++) {
		for (var z = 0; z < 24; z++) {
			for (var y = 0; y < 24; y++) {
				emptyChunk.set(x, y, z, blockIDs.barrier)
				//emptyChunk.set(x, y, z, blockIDs.air)
				//emptyChunk.set(x, y, z, 0)
			}
		}
	}
	noa.world.setChunkData(localID, emptyChunk)

	/*var emptyChunk2 = new ndarray(new Uint16Array(24 * 24 * 24), [24, 24, 24])
	var localID2 = id[0] + '|' + 5 + '|' + id[1] + '|default'

	for (var x = 0; x < 24; x++) {
		for (var z = 0; z < 24; z++) {
			for (var y = 0; y < 24; y++) {
				//emptyChunk2.set(x, y, z, blockIDs.barrier)
				emptyChunk2.set(x, y, z, blockIDs.air)
				//emptyChunk2.set(x, y, z,0)
			}
		}
	}

	noa.world.setChunkData(localID2, emptyChunk2)*/

}