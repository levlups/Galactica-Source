export function kelp(noa,options,id,texture){
	
	
	var mesh =makeKelpSpriteMesh(noa, scene,texture, name)//
	
	
	
	
			
			
			var finOpts = options
			
			
			finOpts.onSet= function ( x, y, z) {
				
				
				var mesh2=mesh.clone('kelp')
			
				mesh2.position.x=x+0.5
				mesh2.position.y=y
				mesh2.position.z=z+0.5
				noa.rendering.addMeshToScene(mesh, false)
				offmeshes.push([[x+0.5,y,z+0.5],mesh2])
				
			}
			finOpts.onLoad= function ( x, y, z) {
				
			
				var mesh2=mesh.clone('kelp')
				
				mesh2.position.x=x+0.5
				mesh2.position.y=y
				mesh2.position.z=z+0.5
				noa.rendering.addMeshToScene(mesh2, false)
				offmeshes.push([[x+0.5,y,z+0.5],mesh2])
				
			}
			finOpts.onUnload= function ( x, y, z) {
				
				
				
				for (var i=0;i<offmeshes.length;i++){
					
					if(JSON.stringify(offmeshes[i][0])==JSON.stringify([x+0.5,y,z+0.5])){
						
						var c=offmeshes[i][1]
						
						
						noa.rendering.removeMeshFromScene(c, false)
					}
				}
			}
			finOpts.onUnset= function ( x, y, z) {
				
				
				
				for (var i=0;i<offmeshes.length;i++){
					
					if(JSON.stringify(offmeshes[i][0])==JSON.stringify([x+0.5,y,z+0.5])){
						
						var c=offmeshes[i][1]
						
						noa.rendering.removeMeshFromScene(c, false)
					}
				}
			}
			
			
			noa.registry.registerBlock(id, finOpts)
			
	
	
}


function makeKelpSpriteMesh(noa, scene, url, name) {
	
 var columns = 1;  // 6 columns
    var rows = 18;  // 4 rows
	
	 //var columns = 1;  // 6 columns
   // var rows =32 ;  // 4 rows
	var mesh = BABYLON.Mesh.CreatePlane('sprite-' + matname, 1, scene)
		 var uvs = mesh.getVerticesData(BABYLON.VertexBuffer.UVKind);
	 var positions = mesh.getVerticesData(BABYLON.VertexBuffer.PositionKind);
  
	var cell_column = 1; //from left from 0;
   var cell_row = 18; //from bottom from 0

	
    uvs[0] = cell_column / columns;
    uvs[1] = cell_row / rows;
    uvs[2] = (cell_column + 1) / columns;
    uvs[3] = cell_row / rows;
    uvs[4] = (cell_column + 1) / columns;
    uvs[5] = (cell_row + 1) / rows;
    uvs[6] = cell_column / columns;
    uvs[7] = (cell_row + 1) / rows;

    

	var matname = name || 'sprite-mat'
	/*if ( (url.startsWith('http://') || url.startsWith('https://') ) && game.allowCustom == true)*/ 
	/*var tex = new BABYLON.Texture(url, scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
	else*/ var tex = new BABYLON.Texture(mod+'textures/'+url[0]+'.png', scene, false, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
	//tex.hasAlpha = true
	
		setInterval(function(){ 
    tex.vOffset -= 1/18;
     }, 100);
	
	var mat = noa.rendering.makeStandardMaterial(matname)
	mat.backFaceCulling = false
	mat.diffuseTexture = tex
	mat.diffuseTexture.vOffset = 0.99


			
			/* BABYLON.Effect.ShadersStore["customVertexShader"]= "precision highp float;\r\n"+

                "// Attributes\r\n"+
                "attribute vec3 position;\r\n"+
                "attribute vec3 normal;\r\n"+
                "attribute vec2 uv;\r\n"+

                "// Uniforms\r\n"+
                "uniform mat4 worldViewProjection;\r\n"+
                "uniform float time;\r\n"+

                "// Varying\r\n"+
                "varying vec3 vPosition;\r\n"+
                "varying vec3 vNormal;\r\n"+
                "varying vec2 vUV;\r\n"+

                "void main(void) {\r\n"+
                "    vec3 v = position;\r\n"+
                "    v.x += sin(2.0 * position.y + (time)) * 0.5;\r\n"+
                "    \r\n"+
                "    gl_Position = worldViewProjection * vec4(v, 1.0);\r\n"+
                "    \r\n"+
                "    vPosition = position;\r\n"+
                "    vNormal = normal;\r\n"+
                "    vUV = uv;\r\n"+
                "}\r\n";

             BABYLON.Effect.ShadersStore["customFragmentShader"]="precision highp float;\r\n"+

                "varying vec2 vUV;\r\n"+

                "uniform sampler2D textureSampler;\r\n"+

                "void main(void) {\r\n"+
                "    gl_FragColor = texture2D(textureSampler, vUV);\r\n"+
                "}\r\n";*/
	
	
	var shaderMaterial = new BABYLON.ShaderMaterial("shader1", scene, {
                    vertex: "custom",
                    fragment: "custom",
                },
                    {
                needAlphaBlending: true,

                        attributes: ["position", "normal", "uv"],
                        uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
                    });




	shaderMaterial.backFaceCulling=false

	mesh.rotation.y += 0.81
	 shaderMaterial.setFloat("time", 0);
shaderMaterial.setTexture("textureSampler", tex);
shaderMaterial.diffuseTexture=tex
	shaderMaterial.diffuseColor = BABYLON.Color3.White()
//shaderMaterial.diffuseTexture.hasAlpha = true


	mesh.material =shaderMaterial// mat
	//console.log(shaderMaterial)
	var time = 0;
	
	
		setInterval(function(){ 
    var shaderMaterial = scene.getMaterialByName("shader1");
                shaderMaterial.setFloat("time", time);
                time += 0.02;

                shaderMaterial.setVector3("cameraPosition", scene.activeCamera.position);
				
        scene.render();
     }, 100);
	
	  /*  var renderLoop = function () {
var shaderMaterial = scene.getMaterialByName("shader1");
                shaderMaterial.setFloat("time", time);
                time += 0.02;

                shaderMaterial.setVector3("cameraPosition", scene.activeCamera.position);
				shaderMaterial.diffuseTexture.vOffset -= 1/18;
        scene.render();
    };
    noa.on('beforeRender', function(dt) {
renderLoop
	});*/
	
			 //  scene.render();
	var offset = BABYLON.Matrix.Translation(0, 0.5, 0)
	mesh.bakeTransformIntoVertices(offset)
	var clone = mesh.clone()
	clone.rotation.y += 1.62
	mesh.setVerticesData(BABYLON.VertexBuffer.UVKind, uvs);
	clone.setVerticesData(BABYLON.VertexBuffer.UVKind, uvs);
    //var newmesh=BABYLON.Mesh.MergeMeshes([mesh, clone], true, true, undefined, false, false)
	return BABYLON.Mesh.MergeMeshes([mesh, clone], true, true, undefined, false, false)//newmesh*/
}
