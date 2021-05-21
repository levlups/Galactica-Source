
var thanosFX = 
`varying vec2 vUV;
uniform sampler2D textureSampler;
uniform vec2 screenSize;

uniform sampler2D noiseRef0;
uniform sampler2D noiseRef1;

uniform float time; 


void main(void){ 

    vec2 unit = vUV/screenSize;
    unit*=16.0+(sin(time*0.5)*50.0);
    vec2 pos = vUV;
    pos.x += sin(time*0.35);
    pos.y -= time*0.2;
    vec2 r = ((texture2D(noiseRef0, pos).rb)*2.0-1.0)*unit;


    vec3 c = texture2D(textureSampler, vUV+r).rgb;



   gl_FragColor = vec4(c, 1.0);
}
`;

 BABYLON.Effect.ShadersStore['thanosEffectFragmentShader'] = thanosFX;


var time = 0;
    var rate = 0.01;
    // Move the light with the camera
    scene.registerBeforeRender(function () {
        light.position = camera.position;
         time+=scene.getAnimationRatio()*rate;
    });

    var postEffect = new BABYLON.PostProcess("thanosEffect", "thanosEffect", ["time", "screenSize"], ["noiseRef0", "noiseRef1"], 1, camera);
       
    var noiseTexture0 = new BABYLON.Texture('./textures/grass.png', scene);
    var noiseTexture1 = new BABYLON.Texture('./textures/ground.jpg', scene);

    postEffect.onApply = function (effect) {
        effect.setVector2("screenSize", new BABYLON.Vector2(postEffect.width, postEffect.height));
        effect.setFloat('time', time); //this is the problematic line
        effect.setTexture('noiseRef0', noiseTexture0);
        effect.setTexture('noiseRef1', noiseTexture1);
    }; 