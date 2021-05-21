precision highp float;

varying vec2 vUV;

uniform sampler2D textureSampler;
uniform sampler2D refSampler;

varying float fade_factor;

void main(void) {
 
    gl_FragColor = mix(
        texture2D(textureSampler, vUV),
        texture2D(refSampler, vUV),
        fade_factor
    );
}