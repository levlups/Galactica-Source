
/*module.exports.meshing=function (name){
	var yo=fudu(name);
	setTimeout(function() {
					return yo;
					 
						}, 1000);
	
}*/
var sweet=null
export function yo(){
	return sweet;
	
}
export function fudu(scene,name){

    var blendtexture = new BABYLON.DynamicTexture("myCanvas", 100, scene, true,BABYLON.Texture.NEAREST_SAMPLINGMODE);
    var context = blendtexture.getContext();
    //blendtexture.drawText("text", 0, 40, "bold 48px Arial", "black", "white", true);

    /////////////////////////////////////////////////////////
    ///////// Using Canvas 2D directly
    /////////////////////////////////////////////////////////
    var extrudedMeshThickness = 0.1;
    var planeSize = 1;
    var imageObj = new Image();
    var blendMaterial;
    var canvasHeight = 100;
    var canvasWidth = 100;
	var blankmesh=null;
	imageObj.src ="./textures/"+name+".png";
	
    imageObj.onload = function () {
        context.imageSmoothingEnabled = false;
        context.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height, 0, 0, canvasWidth, canvasHeight);
        blendtexture.update();
        var imageData = context.getImageData(0, 0, canvasWidth, canvasHeight);
        var data = imageData.data;

        // GetTextureOutline(ImageData, keepOutline, keepOtherPixels)
        var pixels_list = GetTextureOutline(data, true, true);
        var lines = ExtractLinesFromPixelsList(pixels_list, false);

        context.putImageData(imageData, 0, 0);
        blendtexture.update();

        blendMaterial = new BABYLON.StandardMaterial("j", scene);
      //  blendMaterial.emissiveTexture = blendtexture;
		  blendMaterial.diffuseTexture = blendtexture;
		//blendMaterial.specularColor = BABYLON.Color3.White()
        blendMaterial.opacityTexture = blendtexture;

        var plane1 = BABYLON.Mesh.CreatePlane("plane1", planeSize, scene, true, BABYLON.Mesh.DOUBLESIDE);
        plane1.material = blendMaterial;

        var plane2 = BABYLON.Mesh.CreatePlane("plane2", planeSize, scene, true, BABYLON.Mesh.DOUBLESIDE);
        plane2.material = blendMaterial;
        plane2.position.z = extrudedMeshThickness;
		
		var glowTexture = new BABYLON.NoiseProceduralTexture("perlin", 32, scene);
		
 
  blendMaterial.backFaceCulling = false;
	 blendMaterial.diffuseTexture = blendtexture;//glowTexture;
	 blendMaterial.emissiveColor =  BABYLON.Color3.White()
	  blendMaterial.diffuseColor =  BABYLON.Color3.Purple()
	   blendMaterial.ambientColor = BABYLON.Color3.Black()//new BABYLON.Color3(200, 200, 200);
	blendMaterial.emissiveTexture =glowTexture;// blendtexture;
	 blendMaterial.ambientTexture =blendtexture;
	  blendMaterial.specularTexture =blendtexture;
	    blendMaterial.disableLighting = false;
	
	    glowTexture.animationSpeedFactor = 8;
	 
		

        let positions = [];
        let indices = [];
        let normals = [];
        let colorlist = [];

        //console.log(imageObj.width);
        //console.log(imageObj.height);
        let x_ratio = planeSize / blendtexture.getSize().width;
        let y_ratio = planeSize / blendtexture.getSize().height;
        
        let pixels_index = 0;
        // Building the faces around the outlines, given the ordered pixels
        for (var i = 0; i < lines.length; i++) {
            for (var j = 0; j < lines[i].length; j++) {
                var x1_front = lines[i][j].x * x_ratio - planeSize / 2;
                var y1_front = lines[i][j].y * y_ratio - planeSize / 2;
                var z1_front = 0;
                var x2_front;
                var y2_front;
                var z2_front = 0;
                var c1 = lines[i][j].color;
                var a1 = lines[i][j].alpha;
                var c2;
                var a2;

                if (j + 1 == lines[i].length) {
                    x2_front = lines[i][0].x * x_ratio - planeSize / 2;
                    y2_front = lines[i][0].y * y_ratio - planeSize / 2;
                    c2 = lines[i][0].color;
                    a2 = lines[i][0].alpha;
                } else {
                    x2_front = lines[i][j + 1].x * x_ratio - planeSize / 2;
                    y2_front = lines[i][j + 1].y * y_ratio - planeSize / 2;
                    c2 = lines[i][j + 1].color;
                    a2 = lines[i][j + 1].alpha;
                }

                var x1_back = x1_front;
                var y1_back = y1_front;
                var z1_back = extrudedMeshThickness;
                var x2_back = x2_front;
                var y2_back = y2_front;
                var z2_back = extrudedMeshThickness;

                var vec1Front = new BABYLON.Vector3(x1_front, y1_front, z1_front);
                var vec2Front = new BABYLON.Vector3(x2_front, y2_front, z2_front);
                var vec1Back = new BABYLON.Vector3(x1_back, y1_back, z1_back);
                var vec2Back = new BABYLON.Vector3(x2_back, y2_back, z2_back);

                positions.push(vec1Front.x, vec1Front.y, vec1Front.z,
                    vec2Front.x, vec2Front.y, vec2Front.z,
                    vec1Back.x, vec1Back.y, vec1Back.z,
                    vec2Back.x, vec2Back.y, vec2Back.z);
                indices.push(pixels_index, pixels_index + 1, pixels_index + 2);
                indices.push(pixels_index + 3, pixels_index + 2, pixels_index + 1);
                pixels_index += 4;
                colorlist.push(c1.r, c1.g, c1.b, a1);
                colorlist.push(c2.r, c2.g, c2.b, a2);
                colorlist.push(c1.r, c1.g, c1.b, a1);
                colorlist.push(c2.r, c2.g, c2.b, a2);
            }
        }

        BABYLON.VertexData.ComputeNormals(positions, indices, normals);
        let vertexData = new BABYLON.VertexData();

        // stuff its buffers with your stuff
        vertexData.positions = positions;
        vertexData.indices = indices;
        vertexData.normals = normals;
        vertexData.colors = colorlist;

         blankmesh = new BABYLON.Mesh("generated_mesh", scene);
        vertexData.applyToMesh(blankmesh, true);
        blankmesh.scaling.y *= -1;

        var blank_mat = new BABYLON.StandardMaterial('generated_mesh_mat', scene);
		blank_mat.specularColor = BABYLON.Color3.Black()
        blank_mat.backFaceCulling = false;
        blankmesh.bakeCurrentTransformIntoVertices();
        blankmesh.material = blank_mat;

        plane1.parent = blankmesh;
        plane2.parent = blankmesh;
		
		
		
		 
		
		

       
		
		
		//var hl = new BABYLON.HighlightLayer("hl1", scene);
	//hl.addMesh( blankmesh, BABYLON.Color3.Green());
	//hl.addMesh( plane1, BABYLON.Color3.Green());
      
        //thickDonut.position.y = 3;
		 
		
   };
    //imageObj.src ="./textures/material/item_apple.png";
	
	

    var GetTextureOutline = function (data, keepOutline, keepOtherPixels) {
        var not_outline = [];
        var pixels_list = [];
        for (var j = 0; j < data.length; j = j + 4) {
            var alpha = data[j + 3];
            var current_alpha_index = j + 3;
            // Not Invisible
            if (alpha != 0) {
                var top_alpha = data[current_alpha_index - (canvasWidth * 4)];
                var bottom_alpha = data[current_alpha_index + (canvasWidth * 4)];
                var left_alpha = data[current_alpha_index - 4];
                var right_alpha = data[current_alpha_index + 4];

                if ((top_alpha === undefined || top_alpha == 0) ||
                    (bottom_alpha === undefined || bottom_alpha == 0) ||
                    (left_alpha === undefined || left_alpha == 0) ||
                    (right_alpha === undefined || right_alpha == 0)) {
                    pixels_list.push({
                        x: (j / 4) % canvasWidth,
                        y: parseInt((j / 4) / canvasWidth),
                        color: new BABYLON.Color3(data[j] / 255, data[j + 1] / 255, data[j + 2] / 255),
                        alpha: data[j + 3] / 255
                    });

                    if (!keepOutline) {
                        data[j] = 255;
                        data[j + 1] = 0;
                        data[j + 2] = 255;
                    }
                } else if (!keepOtherPixels) {
                    not_outline.push(j);
                }
            }

        }

        // Remove not-outline pixels
        for (var i = 0; i < not_outline.length; i++) {
            if (!keepOtherPixels) {
                data[not_outline[i]] = 0;
                data[not_outline[i] + 1] = 0;
                data[not_outline[i] + 2] = 0;
                data[not_outline[i] + 3] = 0;
            }
        }


        return pixels_list;
    }

    var ExtractLinesFromPixelsList = function (pixelsList, sortPixels) {
        if (sortPixels) {
            // Sort pixelsList
            function sortY(a, b) {
                if (a.y == b.y) return a.x - b.x;
                return a.y - b.y;
            }
            pixelsList.sort(sortY);
        }

        var lines = [];
        var line = [];
        var pixelAdded = true;
        var skipDiagonals = true;
        line.push(pixelsList[0]);
        pixelsList.splice(0, 1);

        var countPixels = 0;
        while (pixelsList.length != 0) {
            if (!pixelAdded && !skipDiagonals) {
                lines.push(line);
                line = [];
                line.push(pixelsList[0]);
                pixelsList.splice(0, 1);
            } else if (!pixelAdded) {
                skipDiagonals = false;
            }

            pixelAdded = false;
            for (var i = 0; i < pixelsList.length; i++) {
                if ((skipDiagonals && (
                    line[line.length - 1].x + 1 == pixelsList[i].x && line[line.length - 1].y == pixelsList[i].y ||
                    line[line.length - 1].x - 1 == pixelsList[i].x && line[line.length - 1].y == pixelsList[i].y ||
                    line[line.length - 1].x == pixelsList[i].x && line[line.length - 1].y + 1 == pixelsList[i].y ||
                    line[line.length - 1].x == pixelsList[i].x && line[line.length - 1].y - 1 == pixelsList[i].y)) || (!skipDiagonals && (
                        line[line.length - 1].x + 1 == pixelsList[i].x && line[line.length - 1].y + 1 == pixelsList[i].y ||
                        line[line.length - 1].x + 1 == pixelsList[i].x && line[line.length - 1].y - 1 == pixelsList[i].y ||
                        line[line.length - 1].x - 1 == pixelsList[i].x && line[line.length - 1].y + 1 == pixelsList[i].y ||
                        line[line.length - 1].x - 1 == pixelsList[i].x && line[line.length - 1].y - 1 == pixelsList[i].y
                    ))) {
                    line.push(pixelsList[i]);
                    pixelsList.splice(i, 1);
                    i--;
                    pixelAdded = true;
                    skipDiagonals = true;
                }
            }


        }
        lines.push(line);
        return lines;
	}
	
	 setTimeout(function() {
		 noa.rendering.addMeshToScene(blankmesh, false)
		 noa.rendering.addMeshToScene(blankmesh._children[0], false)
		 noa.rendering.addMeshToScene(blankmesh._children[1], false)
		
		sweet=blankmesh
	return blankmesh;
					 
						}, 1000);
					
					
    };

   // return scene;

