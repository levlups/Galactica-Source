



/*var done=false

 function makeparticle(name,pos){
	  var particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
    particleSystem.particleTexture= new BABYLON.Texture(name, noa.rendering.getScene(), false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);
particleSystem.color1 = new BABYLON.Color4(1,1,1, 1.0);
particleSystem.color2 = new BABYLON.Color4(1,1,1, 1.0);
    // Position where the particles are emiited from
	var box=pos
	

           particleSystem.emitter=box
	       particleSystem.minSize =0.1
           particleSystem.maxSize =0.3
		   particleSystem.blendMode =BABYLON.ParticleSystem.BLENDMODE_STANDARD;
		  var matrixangle=noa.camera.getDirection()
		   particleSystem.direction1 = new BABYLON.Vector3(-matrixangle[0],0.2,-matrixangle[2]);
		   particleSystem.direction2 = new BABYLON.Vector3(-matrixangle[0],0.3,-matrixangle[2]);
		   particleSystem.minEmitPower = 1;
            particleSystem.maxEmitPower = 2;
            particleSystem.updateSpeed = 0.020
			 particleSystem.gravity = new BABYLON.Vector3(0,1, 0);
			 
			 
	
			 
	return particleSystem;
	
}*/



export function wave(e,t,i,socket){
							
						
							
		
							  var n = noa.getBlock(e - 1, t, i),
								o = noa.getBlock(e + 1, t, i),
								s = noa.getBlock(e, t, i + 1),
								a = noa.getBlock(e, t, i - 1);
							
							if (n>0 && n == blockIDs['water'] ) {
							
								
								
									setTimeout(function () {
										
												var cool=noa.getBlock(e,t,i)
											 if(cool==0){
													//noa.setBlock(n,[e,t,i]);
													
													 socket.emit('block-place', {position: [e,t,i],angle:'none',id:blockIDs['water']})
													 
													 
                                                   wave(e,t,i+1,socket)
													wave(e,t,i-1,socket)
													wave(e+1,t,i,socket)
													wave(e-1,t,i,socket)	

                                                     checkdown(e,t-1,i,socket)													
											 }
										
									}, 500);
							
								}
								
							
							if (o>0 && o == blockIDs['water']) {
													
								
									setTimeout(function () {
											var cool=noa.getBlock(e,t,i)
								if(cool==0){
								//noa.setBlock(o,[e,t,i]);
								
								 socket.emit('block-place', {position: [e,t,i],angle:'none',id:blockIDs['water']})
								
								  wave(e,t,i+1,socket)
													wave(e,t,i-1,socket)
													wave(e+1,t,i,socket)
													wave(e-1,t,i,socket)
													
													checkdown(e,t-1,i,socket)
								}		
								
							}, 500);
							
								}
									
								
							
							if (s>0 && s == blockIDs['water']) {
								
									setTimeout(function () {
								var cool=noa.getBlock(e,t,i)
								
								if(cool==0){
									 //noa.setBlock(s,[e,t,i]);
									 
									  socket.emit('block-place', {position: [e,t,i],angle:'none',id:blockIDs['water']})
									
									 
									 
									  wave(e,t,i+1,socket)
													wave(e,t,i-1,socket)
													wave(e+1,t,i,socket)
													wave(e-1,t,i,socket)
													
													 checkdown(e,t-1,i,socket)
								}
							
								
						 }, 500);
							
								}
									
									
								
							
							
							if (a>0 && a == blockIDs['water'] ) {
														
							
									setTimeout(function () {
										var cool=noa.getBlock(e,t,i)
								if(cool==0){
								//noa.setBlock(a,[e,t,i]);
								 socket.emit('block-place', {position: [e,t,i],angle:'none',id:blockIDs['water']})
								
								
								  wave(e,t,i+1,socket)
													wave(e,t,i-1,socket)
													wave(e+1,t,i,socket)
													wave(e-1,t,i,socket)
													
													
													checkdown(e,t-1,i,socket)
                                }	
								
							}, 500);
							
								}//
								
							
							
							
						}
						
						function checkdown(x1,y1,z1,socket){
							//console.log([x1,y1,z1])
							var cool=noa.getBlock(x1,y1,z1)
							if(cool==0){
								//noa.setBlock(blockIDs['water'],[x1,y1,z1]);
							 socket.emit('block-place', {position: [e,t,i],angle:'none',id:blockIDs['water']})
								
								
								  wave(x1,y1,z1+1,socket)
													wave(x1,y1,z1-1,socket)
													wave(x1+1,y1,z1,socket)
													wave(x1-1,y1,z1,socket)
							}
						}
