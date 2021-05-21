
var socket2=null
export function setupSpawner(noa,socket){
	
	socket2=socket
	
}

export function spawnEnt(name,x,y,z){
	
	socket2.emit('want-'+name,{position:[x,y+1,z],type:name});
	
}