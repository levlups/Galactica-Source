<!--
Aframe shader examples
All code is in HTML so that it works with the Aframe API
If the animation is slow, try commenting out some of the individual objects
to decrease stress on the gpu
-->
<html>
  <head>
        <script id="shadern" type="x-shader/x-vertex">
  /**************************    
      Water and lava normal shader by Griffith Thomas 
      (@KiranWells - Codepen),
      based off of tutorials by The Book of Shaders 
      (thebookofshaders.com-simple shader tutorial. Highly recommended)
      with slightly edited functions.
      If you use my code please attribute it to me.
**************************/
    uniform float time;
    varying vec3 c;
    uniform float lava;
    uniform float scale;
    uniform float amp;
    //attribute vec3 normal;//not necessary, three.js provides it for us
    
    float u_time = time / 1000.0;//ms to sec
          
float random (in vec2 _st) {
    //don't really get how it works, just found through experimentation
    return fract(dot(vec2((mod(_st.x / cos(_st.y), 5.0) * 1000.0)), vec2(1.1)));
}
      
//gradient noise based on examples from The Book of Shaders
float noise (in vec2 st) {
    vec2 i = floor(st);//location of tile
    vec2 f = fract(st);//location of point in tile
    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    // Smooth Interpolation
    vec2 u = smoothstep(0.0,1.0,f);
    // Mix 4 corners percentages
    //mix x1, x2, then mix those over y
    return mix(
            mix(a,b,u.x),
            mix(c,d,u.x),
            u.y);
}

vec2 random2( vec2 p ) {
    //just uses random, but with a small variation to prevent similarity
    return vec2(random(p), random(p.yx + random(p)));
}
      
float fbm(in vec2 p) {
  //Fractal Brownian Motion
  float frequency = 1.0;//width of wave
  float amplitude = 1.0;//height of wave
  float compression = 4.0;//change in frequency
  float gain = 0.5;//change in amplitude
  //initial value (sized noise)
  float v = amplitude * noise(p * frequency);
  for (int o = 1; o < 3;o++) {
    //add a noise to the already generated one
    v += amplitude * (noise(p * frequency));
    //change size and frequency to get a smaller version
    frequency *= compression;
    amplitude *= gain;
  }
  return v;
}
                            
float fbmx(in vec2 p) {
  //recursive Fractal Brownian Motion, 
  //done in a way that avoids recursion
  float v = fbm(p);
  for (int i = 1; i < 3; i++) {
    v = fbm(p + v);
  }
  return v;
}
      
vec3 cell(vec2 st) {
    vec2 i = floor(st);//tile location
    vec2 f = fract(st);//position on the tile
    float m_dist = 1000.0;//abitrary large num
    
    for (int x = -1;x <= 1;x++) {
        for (int y = -1;y <= 1;y++) {
            //cycles through the nearest neighbors and this tile like:
            //  a | b | c
            //  ----------
            //  d | e | f
            //  ----------
            //  g | h | i
            //to find the closest point and the distance to it
            //creates a cell sized on the exact middle between central points
      
            //find which neighbor is being cycled through
            vec2 neighbor = vec2(float(x), float(y));
      
            //determine a random point based of tile location
            vec2 point = random2(i + neighbor);
            
            //determine a random movement direction based on point location
            vec2 dir = vec2(0.5);//random2(point) * sin(u_time / 2.0 + point.x);
            //and move in that location
            point += cos(u_time + point.y) * dir;
      
            //find how close this pixel is to the point being cycled through
            vec2 diff = neighbor + point - f;//difference between pnt + pxl
            float dis = length(diff);//distance to pxl
            if (dis < m_dist) {
                //if this is a new minimum distance, set it as the min
                m_dist = dis;
            }
        }
    }
    //return 0.5 and the distance (a bit arbitrary, but useful)
    return vec3(0.5,0.5,m_dist);
}
                            
vec3 rgb(float r, float g, float b) {
    //changes css rgb to glsl color (maps from 0-256 to 0-1)
    //for convenience
    vec3 clr = vec3(r,g,b);
    return clr/256.0;                             
}                             
                         
void main() {
    //get scaled coordinates of pixel (larger scale = zoomed out)
    //uses uv because that is passes as the texture coordinate
    vec2 st = uv.xy*scale;
    
    if (lava < 0.5) {
    //water
    st -= noise(st.xy * 1.5 - (u_time - 1.5) * 1.0) /3.0;//wave warp
    st += fbm(st.xy * 2.0 + u_time * 1.0) /10.0;//flow
    }else{
    //lava
    st -= noise(st.xy * 1.5 - (u_time - 1.5) * 0.5) /2.0;//slower warp
    }
                             
    vec3 blue = rgb(18., 171., 232.);
    vec3 red = rgb(245.,41.,0.);
    vec3 orange = rgb(255.,210.,77.);
    vec3 white = vec3(1.0);
    vec3 color;
    
    vec3 shine = cell(-st);
    vec3 overshine = cell((st));//for more detail
    float tone = shine.z;
    tone *= overshine.z * 2.5;
  
    if (lava < 0.5) {
    //water
    color = mix(blue,white, (tone)/2.0);
    }else{
    //lava
    color = mix(red,orange, (tone + fbm(st) / 2.0)/2.0);
    }
  
    //add the tone in the direction of the normal for 3d texture
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position + normal * (tone /scale * amp), 1.0 );
  
    //pass the color to the fragment shader
    c = color;
}
    </script>
    <script id="shaderw" type="x-shader/x-fragment">
    /**************************    
    Water and lava shader by Griffith Thomas 
    (@KiranWells - Codepen),
    based off of tutorials by The Book of Shaders 
    (thebookofshaders.com-simple shader tutorial. Highly recommended)
    with slightly edited functions.
    If you use my code please attribute it to me.
    **************************/
    uniform float time;
    varying vec2 vUv;//for texture coordinates (from vertex shader)
    uniform float lava;
      
    float u_time = time / 1000.0;//ms to sec
      
    float random (in vec2 _st) {
    //don't really get how it works, just found through experimentation
    return fract(dot(vec2((mod(_st.x / cos(_st.y), 5.0) * 1000.0)), vec2(1.1)));
    }
    
    //gradient noise based on examples from The Book of Shaders
    float noise (in vec2 st) {
    vec2 i = floor(st);//location of tile
    vec2 f = fract(st);//location of point in tile
    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    // Smooth Interpolation
    vec2 u = smoothstep(0.0,1.0,f);
    // Mix 4 corners percentages
    //mix x1, x2, then mix those over y
    return mix(
      mix(a,b,u.x),
      mix(c,d,u.x),
      u.y);
    }
    
    vec2 random2( vec2 p ) {
    //just uses random, but with a small variation to prevent similarity
    return vec2(random(p), random(p.yx + random(p)));
    }
    
    float fbm(in vec2 p) {
    //Fractal Brownian Motion
    float frequency = 1.0;//width of wave
    float amplitude = 1.0;//height of wave
    float compression = 4.0;//change in frequency
    float gain = 0.5;//change in amplitude
    //initial value (sized noise)
    float v = amplitude * noise(p * frequency);
    for (int o = 1; o < 3;o++) {
    //add a noise to the already generated one
    v += amplitude * (noise(p * frequency));
    //change size and frequency to get a smaller version
    frequency *= compression;
    amplitude *= gain;
    }
    return v;
    }
    
    float fbmx(in vec2 p) {
    //recursive Fractal Brownian Motion, 
    //done in a way that avoids recursion
    float v = fbm(p);
    for (int i = 1; i < 3; i++) {
    v = fbm(p + v);
    }
    return v;
    }
    
    vec3 cell(vec2 st) {
    vec2 i = floor(st);//tile location
    vec2 f = fract(st);//position on the tile
    float m_dist = 1000.0;//abitrary large num
    //vec2 m_point;
    
    for (int x = -1;x <= 1;x++) {
    for (int y = -1;y <= 1;y++) {
    //cycles through the nearest neighbors and this tile like:
    //  a | b | c
    //  ----------
    //  d | e | f
    //  ----------
    //  g | h | i
    //to find the closest point and the distance to it
    //creates a cell sized on the exact middle between central points
    
    //find which neighbor is being cycled through
    vec2 neighbor = vec2(float(x), float(y));
    
    //determine a random point based of tile location
    vec2 point = random2(i + neighbor);
    
    //determine a random movement direction based on point location
    vec2 dir = vec2(0.5);//random2(point) * sin(u_time / 2.0 + point.x);
    //and move in that location
    point += cos(u_time + point.y) * dir;
    
    //find how close this pixel is to the point being cycled through
    vec2 diff = neighbor + point - f;//difference between pnt + pxl
    float dis = length(diff);//distance to pxl
    if (dis < m_dist) {
    //if this is a new minimum distance, set it as the min
    m_dist = dis;
    //m_point = point;
    }
    }
    }
    //return the point and the distance (a bit arbitrary, but useful)
    return vec3(0.5,0.5,m_dist);
    }
    
    vec3 rgb(float r, float g, float b) {
    //changes css rgb to glsl color (maps from 0-256 to 0-1)
    //for convenience
    vec3 clr = vec3(r,g,b);
    return clr/256.0;                             
    }                             
    
    void main() {
    #define SCALE 8.0
    //get scaled coordinates of pixel (larger scale = zoomed out)
    vec2 st = vUv.xy*SCALE;
    
    if (lava < 0.5) {
    //water
    st -= noise(st.xy * 1.5 - (u_time - 1.5) * 1.0) /3.0;//wave warp
    st += fbm(st.xy * 2.0 + u_time * 1.0) /10.0;//flow
    }else{
    //lava
    st -= noise(st.xy * 1.5 - (u_time - 1.5) * 0.5) /2.0;//slower warp
    }
    
    vec3 blue = rgb(18., 171., 232.);
    vec3 red = rgb(245.,41.,0.);
    vec3 orange = rgb(255.,210.,77.);
    vec3 white = vec3(1.0);
    vec3 color;
    
    vec3 shine = cell(-st);
    vec3 overshine = cell((st));//for more detail
    float tone = shine.z;
    tone *= overshine.z * 2.5;
    //float tone =  sin(u_time);
    if (lava < 0.5) {
    //water
    color = mix(blue,white, (tone)/2.0);
    }else{
    //lava
    color = mix(red,orange, (tone + fbm(st) / 2.0)/2.0);
    }
    
    gl_FragColor = vec4(color,1.);
    }
    </script>
    <script id="shaderv" type="x-shader/x-fragment">
    /**************************    
    Void shader by Griffith Thomas 
    (@KiranWells - Codepen),
    inspired by Minecraft end portal blocks
    If you use my code please attribute it to me.
    **************************/
    uniform float time;
    varying vec2 vUv;
    uniform float scale;
      
    float u_time = time / 1000.0;//ms to sec
      
    float random (in vec2 _st) {
    //don't really get how it works, just found through experimentation
    return fract(dot(vec2((mod(_st.x / cos(_st.y), 5.0) * 1000.0)), vec2(1.1)));
    }
    
    vec2 random2( vec2 p ) {
    //just uses random, but with a small variation to prevent similarity
    return vec2(random(p), random(p.yx + random(p)));
    }
    
    vec2 cell(vec2 st) {
      //finds a random point in a square and returns whether the pixel is close 
        
    vec2 i = floor(st);//tile location
    vec2 f = fract(st);//position on the tile
    
    vec2 point = random2(i);
    
    //determine a random movement direction based on point location
    vec2 dir = random2(-i);
    //and move in that location
    point += cos(u_time + random(i) * 6.2 + point.y) * dir/2.;
    
    //find how close this pixel is to the point being cycled through
    vec2 diff = point - f;//difference between pnt + pxl
    
    //return the distance  (a bit arbitrary, but useful)
    return (smoothstep(0.1,0.11,abs(diff)));
    }                        
    
    void main() {
    //get scaled coordinates of pixel (larger scale = zoomed out)
    vec2 st = gl_FragCoord.xy/1000.0*scale + 1.0;
    vec3 color = vec3(0.0);
    vec3 black = vec3(0.0);
    vec3 green = vec3(0.1,0.4,0.3);
    vec3 dgreen = vec3(0.2,0.3,0.2);
    vec3 bgreen = vec3(0.1,0.4,0.4);
    
    //loop through several sizes and create a 'fleck'
    //for each one in several colors
    for(float i = 0.;i<2.;i++){
      vec2 dist = cell(st * i).xy;
      color += mix(green, black, dist.x+dist.y);
      dist = cell(st * (2.+ i)).xy;
      color += mix(dgreen, black, dist.x+dist.y);
      dist = cell(st * (3.+ i)).xy;
      color += mix(bgreen, black, dist.x+dist.y);
    }
    
    gl_FragColor = vec4( color, 1.0);
    }
    </script>
    
    <!-- Aframe API src-->
    <script src="https://aframe.io/releases/0.9.2/aframe.min.js"></script>
    
    <!-- add my shaders to Aframe -->
    <script>
      var n = document.querySelector("#shadern").innerHTML;
      AFRAME.registerShader('fluidnorm', {
        schema: {
          time: {type: "time", is: "uniform"},
          lava: {type: "float", is: "uniform", default: 1.0},
          scale: {type: "float", is: "uniform", default: 20.0},
          amp: {type: "float", is: "uniform", default: 1.0}
        },
        vertexShader:n,
        //simple default + the color passed
        fragmentShader:"varying vec3 c;void main() {gl_FragColor = vec4(c, 1.0);}"
      });
var f = document.querySelector("#shaderw").innerHTML;
      AFRAME.registerShader('fluid', {
        schema: {
          time: {type: "time", is: "uniform"},
          lava: {type: "float", is: "uniform", default: 1.0}
        },
        fragmentShader:f,
        //simple default + the texture coords
        vertexShader:"varying vec2 vUv;void main() {vUv = uv;gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0           );}"
      });
var v = document.querySelector("#shaderv").innerHTML;
      AFRAME.registerShader('void', {
        schema: {
          time: {type: "time", is: "uniform"},
          scale: {type: "float", is: "uniform", default: 8.0}
        },
        fragmentShader:v,
        //simple default + the texture coords
        vertexShader:"varying vec2 vUv;void main() {vUv = uv;gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0           );}"
      });
    </script>
  </head>
  <body>
    <a-scene stats>
      <!-- try changin the material values; those are the shaders -->
      <a-sky material="color: lightblue;"></a-sky>
      <a-entity id="watercube"
        geometry="primitive: box; width:1; height: 1;" 
        rotation="0 0 0" 
        animation="property:object3D.rotation.z; dur:6000; easing:easeInOutQuad; to: -360; dir:alternate; loop: true;" 
        position="0 1 -4" 
        material="shader:fluid;lava:0;scale:8.0"
      ></a-entity>
      <a-entity id="fireball"
        geometry="primitive: sphere; radius: 1; segmentsHeight:50; segmentsWidth:50;" 
        position="-3 .7 -4" 
        material="shader:fluidnorm; scale: 25.0"
      ></a-entity>
      <a-entity id="sea"
        geometry="primitive: plane; width:20; height: 20; segmentsHeight:100; segmentsWidth:100;" 
        rotation="-90 0 0" 
        position="0 -1 -4" 
        material="shader:fluidnorm;lava:0;amp:3.0;scale:8.0"
      ></a-entity>
      <a-torus-knot id="invisibleknot"
        position="3.5 1 -4" 
        color="#B84A39" arc="180" p="2" q="3" 
        radius="1" radius-tubular="0.1" 
        animation="property:object3D.rotation.x; dur:4000; easing:easeInOutQuad; to: -360; dir:alternate; loop: true;" 
        material="shader:void; scale:5;"></a-torus-knot>
    </a-scene>
  </body>
</html>