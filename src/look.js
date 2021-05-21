

export function blocklook(noa){

	
	
	var viewdirection=null
	 var rad=BABYLON.Tools.ToDegrees(noa.camera.heading)

		 
		 if(rad>320  || rad <50){
	
	
	viewdirection='north'
	
	
	
}
if(rad>130 && rad<230){
	
	viewdirection='south'
	
	
}
if(rad>50 && rad<130){
	
	viewdirection='east'
	
	
	
}

if(rad>230 && rad<320){
	
	viewdirection='west'

	
}
return viewdirection;

 }