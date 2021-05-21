export function blocklook(noa){
	var up=false
	var playerp=noa.ents.getState(noa.playerEntity, noa.entities.names.position).position
	
	
	var viewdirection=null
	 var rad=BABYLON.Tools.ToDegrees(noa.camera.heading)//	// 

		 
		 if(rad>320  || rad <50){
	viewdirection="facingN"
	
	//'north'
	
}
if(rad>130 && rad<230){
	viewdirection="facingS"
	//'south'
	
}
if(rad>50 && rad<130){
	viewdirection="facingL"
	//'left'
	
	
}

if(rad>230 && rad<320){
	viewdirection="facingR"
	//'right'
	
}else{
	viewdirection="facingN"
}
return viewdirection;

 }