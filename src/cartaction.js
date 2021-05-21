
export function cartforce(noa,playerbody){

	if(!onrail){
		return;
	}
	
	var pos=noa.entities.getPosition(noa.playerEntity)
	     
		 
		 
		 
		 if(noa.getBlock(pos[0],pos[1],pos[2])==blockIDs['railside'] && noa.getBlock(pos[0],pos[1],pos[2]+1)==blockIDs['rail']&& noa.getBlock(pos[0],pos[1],pos[2]-1)==0){
			 console.log('bazz')
			  console.log(cartdirection)
			 cartdirection='north'
				
				
				
				playerbody.velocity[2]=6
				playerbody.velocity[1]=0.1
				playerbody.velocity[0]=0
				
		
			return;
		 }
		 /*else if(noa.getBlock(pos[0],pos[1],pos[2])==blockIDs['railside'] && noa.getBlock(pos[0],pos[1],pos[2]-1)==blockIDs['rail']){
			 console.log('bazz')
			  console.log(cartdirection)
			 cartdirection='south'
				
				
				
				playerbody.velocity[2]=-6
				playerbody.velocity[1]=0.1
				playerbody.velocity[0]=0
				
		
			return;
		 }*/
		 
		else if(noa.getBlock(pos[0],pos[1],pos[2])==blockIDs['railside'] && noa.getBlock(pos[0]-1,pos[1],pos[2])==blockIDs['rail']){
			 console.log('mook')
			 cartdirection='south'
				
				
				
				playerbody.velocity[2]=0
				playerbody.velocity[1]=0.1
				playerbody.velocity[0]=-6
				
		
			return;
		 }
		 
		 
		 
		 
		 
	
		if(noa.getBlock(pos[0],pos[1],pos[2])==blockIDs['rail'] ){
			 console.log('fud')
			  console.log(cartdirection)
			 
				if(cartdirection=='south'){
						playerbody.velocity[0]=0
				playerbody.velocity[2]=-6
				playerbody.velocity[1]=0.1
				}
				
				if(cartdirection=='north'){
					playerbody.velocity[0]=0
				playerbody.velocity[2]=6
				playerbody.velocity[1]=0.1
				}
				if(cartdirection=='east'){
				playerbody.velocity[0]=-6
				playerbody.velocity[2]=0
				playerbody.velocity[1]=0.1
				}
				if(cartdirection=='west'){
				playerbody.velocity[0]=6
				playerbody.velocity[2]=0
				playerbody.velocity[1]=0.1
				}
		
			//return;
		 }
		 
		 if(noa.getBlock(pos[0],pos[1],pos[2])==blockIDs['rail']&&noa.getBlock(pos[0]+1,pos[1],pos[2])==0 ){
			 console.log('fud')
			  console.log(cartdirection)
			 
				if(cartdirection=='south'){
						playerbody.velocity[0]=0
				playerbody.velocity[2]=-9
				playerbody.velocity[1]=1
				}
				
				if(cartdirection=='north'){
					playerbody.velocity[0]=0
				playerbody.velocity[2]=9
				playerbody.velocity[1]=1
				}
				if(cartdirection=='east'){
				playerbody.velocity[0]=-9
				playerbody.velocity[2]=0
				playerbody.velocity[1]=1
				}
				if(cartdirection=='west'){
				playerbody.velocity[0]=9
				playerbody.velocity[2]=0
				playerbody.velocity[1]=1
				}
		
			//return;
		 }
		  if(noa.getBlock(pos[0],pos[1],pos[2])==blockIDs['rail']&&noa.getBlock(pos[0]-1,pos[1],pos[2])==0 ){
			 console.log('fud')
			  console.log(cartdirection)
			 
				if(cartdirection=='south'){
						playerbody.velocity[0]=0
				playerbody.velocity[2]=-9
				playerbody.velocity[1]=1
				}
				
				if(cartdirection=='north'){
					playerbody.velocity[0]=0
				playerbody.velocity[2]=9
				playerbody.velocity[1]=1
				}
				if(cartdirection=='east'){
				playerbody.velocity[0]=-9
				playerbody.velocity[2]=0
				playerbody.velocity[1]=1
				}
				if(cartdirection=='west'){
				playerbody.velocity[0]=9
				playerbody.velocity[2]=0
				playerbody.velocity[1]=1
				}
		
			//return;
		 }
		 if(noa.getBlock(pos[0],pos[1],pos[2])==blockIDs['rail']&&noa.getBlock(pos[0],pos[1],pos[2]+1)==0 ){
			 console.log('fud')
			  console.log(cartdirection)
			 
				if(cartdirection=='south'){
						playerbody.velocity[0]=0
				playerbody.velocity[2]=-9
				playerbody.velocity[1]=1
				}
				
				if(cartdirection=='north'){
					playerbody.velocity[0]=0
				playerbody.velocity[2]=9
				playerbody.velocity[1]=1
				}
				if(cartdirection=='east'){
				playerbody.velocity[0]=-9
				playerbody.velocity[2]=0
				playerbody.velocity[1]=1
				}
				if(cartdirection=='west'){
				playerbody.velocity[0]=9
				playerbody.velocity[2]=0
				playerbody.velocity[1]=1
				}
		
			//return;
		 }
		 if(noa.getBlock(pos[0],pos[1],pos[2])==blockIDs['rail']&&noa.getBlock(pos[0],pos[1],pos[2]-1)==0 ){
			 console.log('fud')
			  console.log(cartdirection)
			 
				if(cartdirection=='south'){
						playerbody.velocity[0]=0
				playerbody.velocity[2]=-9
				playerbody.velocity[1]=1
				}
				
				if(cartdirection=='north'){
					playerbody.velocity[0]=0
				playerbody.velocity[2]=9
				playerbody.velocity[1]=1
				}
				if(cartdirection=='east'){
				playerbody.velocity[0]=-9
				playerbody.velocity[2]=0
				playerbody.velocity[1]=1
				}
				if(cartdirection=='west'){
				playerbody.velocity[0]=9
				playerbody.velocity[2]=0
				playerbody.velocity[1]=1
				}
		
			//return;
		 }
		 
	/*	if(noa.getBlock(pos[0],pos[1],pos[2])==blockIDs['rail'] && noa.getBlock(pos[0],pos[1],pos[2]+1)==blockIDs['rail']){
			 console.log('fud')
			  console.log(cartdirection)
			 
				if(cartdirection=='south'){
				playerbody.velocity[2]=-6
				playerbody.velocity[1]=0.1
				}
				
				if(impliedforce(noa)=='north'){
				playerbody.velocity[2]=6
				playerbody.velocity[1]=0.1
				}
		
			
		 }
		 if(noa.getBlock(pos[0],pos[1],pos[2])==blockIDs['rail'] && noa.getBlock(pos[0],pos[1],pos[2]-1)==blockIDs['rail']){
			 console.log('fud')
			  console.log(cartdirection)
			 
				if(cartdirection=='south'){
				playerbody.velocity[2]=6
				playerbody.velocity[1]=0.1
				}
				
				if(impliedforce(noa)=='north'){
				playerbody.velocity[2]=-6
				playerbody.velocity[1]=0.1
				}
		
			
		 }
		 if(noa.getBlock(pos[0],pos[1],pos[2])==blockIDs['rail'] && noa.getBlock(pos[0],pos[1]+1,pos[2]-1)==blockIDs['rail']){
			
			
				console.log(cartdirection)
				if(cartdirection=='south'){
				playerbody.velocity[2]=-9
				playerbody.velocity[1]=0.1
				}
				
				if(impliedforce(noa)=='north'){
				playerbody.velocity[2]=9
				playerbody.velocity[1]=0.1
				}
			
		 }
		 if(noa.getBlock(pos[0],pos[1],pos[2])==blockIDs['rail'] && noa.getBlock(pos[0],pos[1]-1,pos[2]+1)==blockIDs['rail']){
			 
			  //playerbody.friction=1;
			//regulatespeed()
		
				//playerbody.applyForce([vect0,0.1,-10])
			
				if(cartdirection=='south'){
				playerbody.velocity[2]=9
				playerbody.velocity[1]=0.1
				}
				
				if(impliedforce(noa)=='north'){
				playerbody.velocity[2]=-9
				playerbody.velocity[1]=0.1
				}
			
		 }*/
		 
			
			
		 }
		 
	

							
 
 var viewdirection=null;
 function impliedforce(noa){
	 var rad=BABYLON.Tools.ToDegrees(noa.camera.heading)	 
	
		 
		 if(rad>320  || rad <50){
	viewdirection='north'
	
}
if(rad>50 && rad<130){
	viewdirection='left'
	 
}
if(rad>130 && rad<230){
	viewdirection='south'
	      
}
if(rad>230 && rad<320){
	viewdirection='right'
	
}
		

	 
	 return viewdirection;
 }
