var fishingtimer=0
var myPoints=null;
		var lines=null;
		var rodtarget=null
		var casting=false;
		var mainplayer=null
export function makefishrod(x,y,z,mesh){
	mainplayer=mesh
	rodtarget=[window.innerWidth / 2,window.innerHeight / 2,z]
	casting=true;
var layerPosition=noa.entities.getPosition(noa.playerEntity)
myPoints = [
new BABYLON.Vector3(layerPosition[0],layerPosition[1]+1,layerPosition[2]),
   
    new BABYLON.Vector3(rodtarget[0],rodtarget[1],rodtarget[2])
];

lines = BABYLON.MeshBuilder.CreateLines("lines", {points: myPoints, updatable: true}, scene);

lines.color = BABYLON.Color3.White()
noa.rendering.addMeshToScene(lines,false)
}	

 setInterval(function() {
	
if(myPoints!==null && rodtarget!==null){
	
	
	fishingtimer+=0.5;
	
	/*if(fishingtimer>10){
		//alert ('caught a fish')
		spawnjs.spawn(myPoints[0].x,myPoints[0].y,myPoints[0].z,'fish','passive');
		if(channel!==null){
	 const spawndata = {spawn:true,x:myPoints[0].x,y:myPoints[0].y,z:myPoints[0].z,type:'fish',temper:'passive'};
  var spawnblock= JSON.stringify(spawndata);
	  channel.send(spawnblock)
	}
		fishingtimer=0;
	}*/
	
	
	
	
	myPoints[0].x=mainplayer.position.x//layerPosition[0]
	myPoints[0].y=mainplayer.position.y//layerPosition[1]+1
	myPoints[0].z=mainplayer.position.z//layerPosition[2]
	
	rodtarget[1]+=Math.sin(Math.random()*0.2-0.1);
	//console.log(rodtarget[1])
		//var positions = lines.getVerticesData(BABYLON.VertexBuffer.PositionKind);
		
		myPoints[1].x=rodtarget[0]
	myPoints[1].y=rodtarget[1]
	myPoints[1].z=rodtarget[2]
		

	//lines.updateVerticesData(BABYLON.VertexBuffer.PositionKind, myPoints);//*/
	if(lines!==null){
	lines.dispose();
	lines = BABYLON.MeshBuilder.CreateLines("lines", {points: myPoints, updatable: true}, scene);
/*	var gl = new BABYLON.GlowLayer("glow", scene);
	 gl.addIncludedOnlyMesh(mainplayer._children[0])*/

lines.color = BABYLON.Color3.Black()
lines.outlineWidth=1
noa.rendering.addMeshToScene(lines,false)
	}
}
 	}, 500);