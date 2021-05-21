export function cake(noa,options,id,texture){
	
	var imageheight=16
	         var imagewidth=16
	         var pixely=1/imageheight;
	         var pixelx=1/imagewidth;
	         var num=1;
			 
			 
			  var faceUV = new Array(6);
	 
	 
	
	
	var n=[new BABYLON.Vector4(pixelx*0,-pixely*(15+num),pixelx*(15+num),-pixely*(0)),//face
	new BABYLON.Vector4(pixelx*0,-pixely*(8+num),pixelx*(15+num),-pixely*(0)),//back 
	new BABYLON.Vector4(pixelx*0,-pixely*(8+num),pixelx*(15+num),-pixely*(0)),//new BABYLON.Vector4(0.0625,0.125,0.125,0.375),//right
	new BABYLON.Vector4(pixelx*0,-pixely*(8+num),pixelx*(15+num),-pixely*(0)),//new BABYLON.Vector4(0,0.125,0.046,0.375),//left
	new BABYLON.Vector4(pixelx*0,-pixely*(8+num),pixelx*(15+num),-pixely*(0)),//top head
	new BABYLON.Vector4(pixelx*0,-pixely*(15+num),pixelx*(15+num),-pixely*(0))];//bottom*/
	
	
  var  uvoptions = {
        height: 0.5,
		depth:1,
		width:1,
		faceUV: n,
		wrap: true,
        updatable: true
    };	
			 
			 
			 
			//var mesh =BABYLON.MeshBuilder.CreateBox(name, options, noa.rendering.getScene())
			var mesh =BABYLON.MeshBuilder.CreateBox(name, uvoptions, noa.rendering.getScene())
			var mat = noa.rendering.makeStandardMaterial('cool')
			var tex = new BABYLON.Texture(mod+'textures/' +texture[0]+ '.png', scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
			mat.diffuseTexture = tex
			
			mesh.material=mat
			var offset = BABYLON.Matrix.Translation(0, 0.25, 0)
	        mesh.bakeTransformIntoVertices(offset)
			var finOpts = options
			finOpts.blockMesh = mesh
			
			
			
			noa.registry.registerBlock(id, finOpts)
	
}
