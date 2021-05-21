export function makeparticle(name,pos,scene,time,size){
	 //audio.volume=0.5
	 //audio.play()
	 
	  var particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
	  var c=new BABYLON.Texture(mod+'textures/'+name+'.png', scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);
	  /*c.wrapU = 1, c.wrapV = 1
	 c.uOffset = .5;
c.vOffset = .5;*/
    particleSystem.particleTexture= c//new BABYLON.Texture('/textures/'+name+'.png', scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);
particleSystem.color1 = new BABYLON.Color4(1,1,1, 1.0);
particleSystem.color2 = new BABYLON.Color4(1,1,1, 1.0);
    // Position where the particles are emiited from
	//var box=pos
	
	
	
	partmesh= new BABYLON.Mesh("dummy", scene);//	//partmesh.clone('tot')
	partmesh.position.x=pos[0]+0.5
	partmesh.position.y=pos[1]
	partmesh.position.z=pos[2]+0.5
	//partmesh.layerMask = 0x10000000;
	noa.rendering.addMeshToScene(partmesh,false)
	/*particleSystem.init= function(p) {
      p.position.x = Math.random() * 0.8 - 0.4
      p.position.y = Math.random() * 0.8 - 0.4
      p.position.z = Math.random() * 0.8 - 0.4
      p.velocity.x = p.position.x / 2
      p.velocity.y = p.position.y / 2
      p.velocity.z = p.position.z / 2
      p.size =     Math.random()/2 // was 0.5
      p.age = Math.random()/2
      p.lifetime =  10
    }*/
	
	
	
	
	particleSystem.startSpriteCellID = 0;
                particleSystem.endSpriteCellID = 3;
                particleSystem.spriteCellHeight = 4;
               particleSystem.spriteCellWidth = 4;
                particleSystem.spriteCellLoop = true;
				 particleSystem.spriteCellChangeSpeed=1;
				particleSystem.spriteRandomStartCell=false;
	
	 particleSystem.emitter= partmesh

           particleSystem.emitter= partmesh// new BABYLON.Vector3(pos[0], pos[1], pos[2])//partmesh
	       particleSystem.minSize =size/2//0.3
           particleSystem.maxSize =size//0.5
		   
		   particleSystem.color1 = new BABYLON.Color4(1, 1, 1, 1);
particleSystem.color2 = new BABYLON.Color4(1, 1, 1, 1.0);
particleSystem.colorDead = new BABYLON.Color4(1, 1, 1, 1);
		   particleSystem.blendMode =BABYLON.ParticleSystem.BLENDMODE_STANDARD;
		  var matrixangle=noa.camera.getDirection()
		   particleSystem.direction1 = new BABYLON.Vector3(matrixangle[0],1,-matrixangle[2]);
		   particleSystem.direction2 = new BABYLON.Vector3(-matrixangle[0],1,matrixangle[2]);
		   particleSystem.minEmitPower = 1;
            particleSystem.maxEmitPower = 2;
            particleSystem.updateSpeed = 0.020
			 particleSystem.gravity = new BABYLON.Vector3(0,3, 0);
			 
			/* particleSystem.updateFunction = function(particles) {
         for (var index = 0; index < particles.length; index++) {
               var particle = particles[index];
               particle.age += this._scaledUpdateSpeed;
            
               if (particle.age >= particle.lifeTime) { // Recycle
                    particles.splice(index, 1);
                    this._stockParticles.push(particle);
                    index--;
                    continue;
               }
               else {
				   this.gravity= new BABYLON.Vector3(0,-3, 0);
                    particle.colorStep.scaleToRef(this._scaledUpdateSpeed, this._scaledColorStep);
                    particle.color.addInPlace(this._scaledColorStep);
                    particle.color = new BABYLON.Color4(Math.random(), Math.random(), Math.random(), 1)
    
                    if (particle.color.a < 0)
                                 particle.color.a = 0;
    
                    particle.angle += particle.angularSpeed * this._scaledUpdateSpeed;
                           particle.direction = new BABYLON.Vector3(-2,-3,2);
                    //particle.direction.scaleToRef(this._scaledUpdateSpeed, this._scaledDirection);
                    particle.position.addInPlace(this._scaledDirection);
					//if(noa.getBlock(box.position.x,box.position.y,box)
					//console.log(particle.absolutePosition)
    
                    //this.gravity.scaleToRef(this._scaledUpdateSpeed, this._scaledGravity);
					 //.scaleToRef(this._scaledUpdateSpeed, this._scaledGravity);
                    particle.direction.addInPlace(this._scaledGravity);
               }
         } 
    }*/
			 
			 
	particleSystem.start()
	
	setTimeout(function() {
		particleSystem.dispose()
		partmesh.dispose()
			}, time*1000);
		
			 
	return particleSystem;
	
}


export function makeparticlearrow(name,pos,scene,time,size){
	 //audio.volume=0.5
	 //audio.play()
	 
	  var particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
	  var c=new BABYLON.Texture(mod+'textures/'+name+'.png', scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);
	  /*c.wrapU = 1, c.wrapV = 1
	 c.uOffset = .5;
c.vOffset = .5;*/
    particleSystem.particleTexture= c//new BABYLON.Texture('/textures/'+name+'.png', scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);
particleSystem.color1 = new BABYLON.Color4(1,1,1, 1.0);
particleSystem.color2 = new BABYLON.Color4(1,1,1, 1.0);
    // Position where the particles are emiited from
	//var box=pos
	
	
	
	partmesh= new BABYLON.Mesh("dummy", scene);//	//partmesh.clone('tot')
	partmesh.position.x=pos[0]+0.5
	partmesh.position.y=pos[1]
	partmesh.position.z=pos[2]+0.5
	//partmesh.layerMask = 0x10000000;
	noa.rendering.addMeshToScene(partmesh,false)
	/*particleSystem.init= function(p) {
      p.position.x = Math.random() * 0.8 - 0.4
      p.position.y = Math.random() * 0.8 - 0.4
      p.position.z = Math.random() * 0.8 - 0.4
      p.velocity.x = p.position.x / 2
      p.velocity.y = p.position.y / 2
      p.velocity.z = p.position.z / 2
      p.size =     Math.random()/2 // was 0.5
      p.age = Math.random()/2
      p.lifetime =  10
    }*/
	
	
	
	
	particleSystem.startSpriteCellID = 0;
                particleSystem.endSpriteCellID = 3;
                particleSystem.spriteCellHeight = 4;
               particleSystem.spriteCellWidth = 4;
                particleSystem.spriteCellLoop = true;
				 particleSystem.spriteCellChangeSpeed=1/10;
				particleSystem.updateSpeed = 1/60;   
				particleSystem.spriteRandomStartCell=false;
	
	 particleSystem.emitter= pos//partmesh

        //   particleSystem.emitter= partmesh// new BABYLON.Vector3(pos[0], pos[1], pos[2])//partmesh
	       particleSystem.minSize =size/2//0.3
           particleSystem.maxSize =size//0.5
		   
		   particleSystem.color1 = new BABYLON.Color4(1, 1, 1, 1);
particleSystem.color2 = new BABYLON.Color4(1, 1, 1, 1.0);
particleSystem.colorDead = new BABYLON.Color4(1, 1, 1, 1);
		   particleSystem.blendMode =BABYLON.ParticleSystem.BLENDMODE_STANDARD;
		  var matrixangle=noa.camera.getDirection()
		   particleSystem.direction1 = new BABYLON.Vector3(matrixangle[0],1,-matrixangle[2]);
		   particleSystem.direction2 = new BABYLON.Vector3(-matrixangle[0],1,matrixangle[2]);
		   particleSystem.minEmitPower = 1;
            particleSystem.maxEmitPower = 2;
            particleSystem.updateSpeed = 0.020
			 particleSystem.gravity = new BABYLON.Vector3(0,3, 0);
	
			 
	particleSystem.start()
	
	setTimeout(function() {
		particleSystem.dispose()
		partmesh.dispose()
			}, time*1000);
		
			 
	return particleSystem;
	
}


export function makedebris(name,pos,scene,time,size){
	
	  var particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
	  var c=new BABYLON.Texture(mod+'textures/'+name+'.png', scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);
	  
	  //c.wrapU = 1;
	//c.wrapV = 1;
	
	/*c.invertU = 1
	c.invertV = 1*/
	
    particleSystem.particleTexture= c//new BABYLON.Texture('/textures/'+name+'.png', scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);
	 particleSystem.isAnimationSheetEnabled = true;
	particleSystem.startSpriteCellID =0;
  particleSystem.endSpriteCellID = 3;
                particleSystem.spriteCellHeight = 8;
                particleSystem.spriteCellWidth = 8;
                particleSystem.spriteCellLoop = false;
				
              
				
				particleSystem.spriteCellChangeSpeed=1;
				 	  
				particleSystem.spriteRandomStartCell=false;
	
	
	
particleSystem.color1 = new BABYLON.Color4(1,1,1, 1.0);
particleSystem.color2 = new BABYLON.Color4(1,1,1, 1.0);
 
	
	
	
	partmesh= new BABYLON.Mesh("dummy", scene);//	//partmesh.clone('tot')
	partmesh.position.x=pos[0]+0.5
	partmesh.position.y=pos[1]
	partmesh.position.z=pos[2]+0.5
 
 partmesh.rotation.z=Math.PI
	            noa.rendering.addMeshToScene(partmesh,false)

	
	
		        particleSystem.emitter= pos
	            particleSystem.minSize =size/2//0.3
                particleSystem.maxSize =size//0.5
               // particleSystem.isAnimationSheetEnabled = true;
	        
              
	


		   
		   particleSystem.color1 = new BABYLON.Color4(1, 1, 1, 1);
           particleSystem.color2 = new BABYLON.Color4(1, 1, 1, 1.0);
           particleSystem.colorDead = new BABYLON.Color4(1, 1, 1, 1);
		   particleSystem.blendMode =BABYLON.ParticleSystem.BLENDMODE_STANDARD;
		   var matrixangle=noa.camera.getDirection()
		   particleSystem.direction1 = new BABYLON.Vector3(0.1,0.1,0.1);
		   particleSystem.direction2 = new BABYLON.Vector3(0.1,0.1,0.1);
		   particleSystem.minEmitPower = 1;
           particleSystem.maxEmitPower = 2;
           particleSystem.updateSpeed = 0.020
		   particleSystem.gravity = new BABYLON.Vector3(0,-3, 0);
			 


				//particleSystem.updateSpeed = 1/30; 
			 
	particleSystem.start()
	
	setTimeout(function() {
		particleSystem.dispose()
		partmesh.dispose()
			}, time*1000);
			
			/*var radius = 3;
			 particleSystem.startPositionFunction = function(worldMatrix, positionToUpdate)
    {
        var rndAngle = 2 * Math.random() * Math.PI;
        var randX = radius * Math.sin(rndAngle);
        var randY = this.minEmitBox.y;
        var randZ = radius * Math.cos(rndAngle);
        
        BABYLON.Vector3.TransformCoordinatesFromFloatsToRef(randX, randY, randZ, worldMatrix, positionToUpdate);
    }*/
		
		
	return particleSystem;
	
}

export function makedebrispos(name,pos,scene,time,size){
	
	  var particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
	  var c=new BABYLON.Texture(mod+'textures/'+name+'.png', scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);
	
    particleSystem.particleTexture= c//new BABYLON.Texture('/textures/'+name+'.png', scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);
	 particleSystem.isAnimationSheetEnabled = true;
	particleSystem.startSpriteCellID =0;
  particleSystem.endSpriteCellID = 3;
                particleSystem.spriteCellHeight = 8;
                particleSystem.spriteCellWidth = 8;
                particleSystem.spriteCellLoop = false;
				
              
				
				particleSystem.spriteCellChangeSpeed=1;
				 	  
				particleSystem.spriteRandomStartCell=false;
	
	
	
particleSystem.color1 = new BABYLON.Color4(1,1,1, 1.0);
particleSystem.color2 = new BABYLON.Color4(1,1,1, 1.0);
 
	
	
	
	var partmesh= new BABYLON.Mesh("dummy", scene);//	//partmesh.clone('tot')
	partmesh.position.x=pos[0]+0.5
	partmesh.position.y=pos[1]
	partmesh.position.z=pos[2]+0.5

	            noa.rendering.addMeshToScene(partmesh,false)

	
	
		        particleSystem.emitter=partmesh
	            particleSystem.minSize =size/2//0.3
                particleSystem.maxSize =size//0.5
               // particleSystem.isAnimationSheetEnabled = true;
	        
              
	


		   
		   particleSystem.color1 = new BABYLON.Color4(1, 1, 1, 1);
           particleSystem.color2 = new BABYLON.Color4(1, 1, 1, 1.0);
           particleSystem.colorDead = new BABYLON.Color4(1, 1, 1, 1);
		   particleSystem.blendMode =BABYLON.ParticleSystem.BLENDMODE_STANDARD;
		   var matrixangle=noa.camera.getDirection()
		   particleSystem.direction1 = new BABYLON.Vector3(matrixangle[0],1,-matrixangle[2]);
		   particleSystem.direction2 = new BABYLON.Vector3(-matrixangle[0],1,matrixangle[2]);
		   particleSystem.minEmitPower = 1;
           particleSystem.maxEmitPower = 2;
           particleSystem.updateSpeed = 0.020
		   particleSystem.gravity = new BABYLON.Vector3(0,-3, 0);
			 


				//particleSystem.updateSpeed = 1/30; 
			 
	particleSystem.start()
	
	setTimeout(function() {
		particleSystem.dispose()
		partmesh.dispose()
			}, time*1000);
			
			/*var radius = 3;
			 particleSystem.startPositionFunction = function(worldMatrix, positionToUpdate)
    {
        var rndAngle = 2 * Math.random() * Math.PI;
        var randX = radius * Math.sin(rndAngle);
        var randY = this.minEmitBox.y;
        var randZ = radius * Math.cos(rndAngle);
        
        BABYLON.Vector3.TransformCoordinatesFromFloatsToRef(randX, randY, randZ, worldMatrix, positionToUpdate);
    }*/
		
			 
	return particleSystem;
	
}

export function makeslash(name,pos,scene,time,size){
	
	 var particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
	  var c=new BABYLON.Texture(mod+'textures/'+name+'.png', scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);

    particleSystem.particleTexture= c//new BABYLON.Texture('/textures/'+name+'.png', scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);
	 particleSystem.isAnimationSheetEnabled = false;
	particleSystem.startSpriteCellID =0;
  particleSystem.endSpriteCellID = 3;
                particleSystem.spriteCellHeight = 8;
                particleSystem.spriteCellWidth = 8;
                particleSystem.spriteCellLoop = false;

				particleSystem.spriteCellChangeSpeed=1;  
				particleSystem.spriteRandomStartCell=false;

particleSystem.color1 = new BABYLON.Color4(1,1,1, 1.0);
particleSystem.color2 = new BABYLON.Color4(1,1,1, 1.0);

	partmesh= new BABYLON.Mesh("dummy", scene);
	partmesh.position.x=pos[0]+0.5
	partmesh.position.y=pos[1]
	partmesh.position.z=pos[2]+0.5
 
	            noa.rendering.addMeshToScene(partmesh,false)

		        particleSystem.emitter= pos
	            particleSystem.minSize =size/2//0.3
                particleSystem.maxSize =size//0.5

		   particleSystem.color1 = new BABYLON.Color4(1, 1, 1, 1);
           particleSystem.color2 = new BABYLON.Color4(1, 1, 1, 1.0);
           particleSystem.colorDead = new BABYLON.Color4(1, 1, 1, 1);
		   particleSystem.blendMode =BABYLON.ParticleSystem.BLENDMODE_STANDARD;
		   var matrixangle=noa.camera.getDirection()
		   particleSystem.direction1 = new BABYLON.Vector3(0.1,1,0.1);
		   particleSystem.direction2 = new BABYLON.Vector3(0.1,1,0.1);
		   particleSystem.minEmitPower = 1;
           particleSystem.maxEmitPower = 2;
           particleSystem.updateSpeed = 0.020
		   particleSystem.gravity = new BABYLON.Vector3(0,1, 0);
			 
particleSystem.emitRate = 1;

	particleSystem.start()
	
	setTimeout(function() {
		particleSystem.dispose()
		partmesh.dispose()
			}, time*1000);
			
			particleSystem.renderingGroupId = 1;

	return particleSystem;
}


export function makeinfparticle(name){
	  
	
						  var particleSystem = new BABYLON.ParticleSystem("particles", 200, scene);
						particleSystem.particleTexture= new BABYLON.Texture(name, scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE);
					particleSystem.color1 = new BABYLON.Color4(1,1,1, 1.0);
					particleSystem.color2 = new BABYLON.Color4(1,1,1, 1.0);
					particleSystem.colorDead = new BABYLON.Color4(1,1,1, 1.0);

						// Position where the particles are emiited from
						var box=mainplayer._children[5]
						

							   particleSystem.emitter =box
							   particleSystem.minSize =1
							   particleSystem.maxSize =3
							   particleSystem.blendMode =BABYLON.ParticleSystem.BLENDMODE_STANDARD;
							  var matrixangle=noa.camera.getDirection()
							   particleSystem.direction1 = new BABYLON.Vector3(0.2,0.2,-0.2);
							   particleSystem.direction2 = new BABYLON.Vector3(-0.2,0.3,0.2);
							   particleSystem.minEmitPower = 1;
								particleSystem.maxEmitPower = 2;
								particleSystem.updateSpeed = 0.020
							
								//particleSystem.manualEmitCount = 3;
								 particleSystem.gravity = new BABYLON.Vector3(0,1, 0);
								//state.music = new BABYLON.Sound("Music", "/sound/tap.wav", scene)
								
								
								 setInterval(function() {
									 if(!onrocket)
		particleSystem.dispose()
		
			}, 500);
								 
						return particleSystem;
			  }