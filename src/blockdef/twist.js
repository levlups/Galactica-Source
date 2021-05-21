export function twist(mesh,rot){
	mesh.rotation.y=rot[1]
	mesh.position.x+=rot[3][0]
	mesh.position.y+=rot[3][1]
	mesh.position.z+=rot[3][2]
	//console.log(rot[3][0]+'yahooo')
	
	return;
				 if(rot==1){
					mesh.rotation.y=Math.PI
					
					
					
					
					
					}
					if(rot==2){
					mesh.rotation.y=-Math.PI/2;
					
					
					}
					if(rot==3){
					mesh.rotation.y=Math.PI/2;
					
					
					}
					if(rot==0){
					mesh.rotation.y=0;
					
					
					}
					
					
					 if(rot==4){
						mesh.rotation.y=Math.PI
					
					}
					if(rot==5){
					mesh.rotation.y=-Math.PI/2;
					
					}
					if(rot==6){
					mesh.rotation.y=Math.PI/2;
					
					}
					if(rot==7){
					mesh.rotation.y=0;//
					
					}
				 }