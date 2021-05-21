export function portal(noa,options,id,texture){
	
	var imageheight=512
	         var imagewidth=16
	         var pixely=1/imageheight;
	         var pixelx=1/imagewidth;
	         var num=1;
			 
			 
			  var faceUV = new Array(6);
	 
	 
	
	
	var n=[new BABYLON.Vector4(pixelx*0,-pixely*(511+num),pixelx*(15+num),-pixely*(497)),//face
	new BABYLON.Vector4(pixelx*0,-pixely*(511+num),pixelx*(15+num),-pixely*(497)),//back 
	new BABYLON.Vector4(pixelx*0,-pixely*(511+num),pixelx*(15+num),-pixely*(497)),//,//right
	new BABYLON.Vector4(pixelx*0,-pixely*(511+num),pixelx*(15+num),-pixely*(497)),///left
	new BABYLON.Vector4(pixelx*0,-pixely*(511+num),pixelx*(15+num),-pixely*(497)),//top head
	new BABYLON.Vector4(pixelx*0,-pixely*(511+num),pixelx*(15+num),-pixely*(497))];//bottom*/
	
	
  var  uvoptions = {
        height: 1,
		depth:1,
		width:1,
		faceUV: n,
		wrap: true,
        updatable: true
    };	
			 
			 
			 
			//var mesh =BABYLON.MeshBuilder.CreateBox(name, options, noa.rendering.getScene())
			var mesh =BABYLON.MeshBuilder.CreateBox(name, uvoptions, noa.rendering.getScene())
			var mat = noa.rendering.makeStandardMaterial('cool')
			var tex = new BABYLON.Texture(mod+'textures/' +texture+ '.png', scene, true, true, BABYLON.Texture.NEAREST_SAMPLINGMODE)
			mat.diffuseTexture = tex
			mat.diffuseTexture.hasAlpha=true;
			mat.useAlphaFromDiffuseTexture = true
			
			mat.backFaceCulling = true;
			setInterval(function(){ 
     tex.vOffset -= 1/32;
     }, 100);
			mesh.material=mat
			var offset = BABYLON.Matrix.Translation(0, 0.5, 0)
	        mesh.bakeTransformIntoVertices(offset)
			var finOpts = options
			finOpts.blockMesh = mesh
			
			
			
			noa.registry.registerBlock(id, finOpts)
	
}
