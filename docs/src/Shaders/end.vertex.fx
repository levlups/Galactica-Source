precision highp float;

//attribute
attribute vec4 position;

// Uniforms
uniform mat4 worldViewProjection;

//varying
varying vec2 vUV;
varying float fade_factor;


uniform float time;

void main(void) {
    
    mat3 window_scale = mat3(
        vec3(2.0/4.0, 0.0, 0.0),
        vec3(    0.0, 1.0, 0.0),
        vec3(    0.0, 0.0, 1.0)
    );
    mat3 rotation = mat3(
        vec3( cos(time),  sin(time),  0.0),
        vec3(-sin(time),  cos(time),  0.0),
        vec3(        0.0,         0.0,  1.0)
    );
    gl_Position = worldViewProjection* vec4(window_scale * rotation * position.xyz, 1.0);
        vUV = position.xy * vec2(0.5) + vec2(0.5);
        fade_factor = sin(time) * 0.5 + 0.5;
}
