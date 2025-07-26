<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Spheres as in Image - WebGL</title>
  <style>
    body { margin: 0; background: white; overflow: hidden; }
    canvas { display: block; background: white; }
  </style>
</head>
<body>
<canvas id="canvas"></canvas>
<script>
  const canvas = document.getElementById('canvas');
  const gl = canvas.getContext('webgl');
  
  if (!gl) {
    alert('WebGL not supported in your browser');
  }

  // Shader programs
  const vertexShaderSource = `
    attribute vec2 a_position;
    uniform vec2 u_resolution;
    uniform vec2 u_translation;
    uniform float u_radius;
    
    void main() {
      // Convert from pixels to clip space
      vec2 clipSpace = ((a_position * u_radius + u_translation) / u_resolution) * 2.0 - 1.0;
      gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
      gl_PointSize = u_radius * 2.0;
    }
  `;

  const fragmentShaderSource = `
    precision mediump float;
    
    uniform vec2 u_center;
    uniform vec2 u_lightPos;
    uniform float u_radius;
    uniform vec2 u_resolution;
    
    void main() {
      vec2 coord = gl_FragCoord.xy;
      vec2 center = u_center;
      float radius = u_radius;
      
      // Calculate distance from center
      float dist = distance(coord, center);
      
      if (dist > radius) {
        discard;
      }
      
      // Calculate light direction
      vec2 lightDir = normalize(u_lightPos - center);
      vec2 fragDir = normalize(coord - center);
      
      // Simple lighting effect
      float diffuse = max(0.0, dot(lightDir, fragDir));
      diffuse = pow(diffuse, 2.0); // Make highlight sharper
      
      // Create gradient effect
      float edge = smoothstep(radius, radius - 10.0, dist);
      
      // Combine effects
      vec3 color = mix(vec3(0.1), vec3(1.0), diffuse * edge);
      
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  // Compile shader function
  function compileShader(gl, source, type) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    
    return shader;
  }

  // Create shader program
  const vertexShader = compileShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
  const fragmentShader = compileShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);
  
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(program));
  }
  
  gl.useProgram(program);

  // Look up attribute and uniform locations
  const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
  const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
  const translationUniformLocation = gl.getUniformLocation(program, 'u_translation');
  const radiusUniformLocation = gl.getUniformLocation(program, 'u_radius');
  const centerUniformLocation = gl.getUniformLocation(program, 'u_center');
  const lightPosUniformLocation = gl.getUniformLocation(program, 'u_lightPos');

  // Create a buffer for the square that will be used to render each circle
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  
  // Two triangles to form a square
  const positions = [
    -1.0, -1.0,
     1.0, -1.0,
    -1.0,  1.0,
    -1.0,  1.0,
     1.0, -1.0,
     1.0,  1.0,
  ];
  
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  // Enable the attribute
  gl.enableVertexAttribArray(positionAttributeLocation);
  gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

  // Animation parameters
  const radius = 100;
  const margin = 80;
  const wobbleAmplitude = 10;
  const wobbleSpeed = 0.0025;
  const phases = {
    topLeft: 0,
    bottomLeft: Math.PI / 2,
    bottomRight: Math.PI,
  };
  let startTime = null;

  // Sphere positions
  const offsetFromCenter = 400;
  let topCenterLeftX1, topCenterLeftX2, topCenterLeftX3, topCenterLeftY;
  let canvasCenterX, canvasCenterY;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
    
    // Update positions based on new canvas size
    topCenterLeftX1 = (gl.canvas.width / 2) - offsetFromCenter;
    topCenterLeftX2 = (gl.canvas.width / 2) - offsetFromCenter;
    topCenterLeftX3 = (gl.canvas.width / 2) + offsetFromCenter;
    topCenterLeftY = 100;
    canvasCenterX = gl.canvas.width / 2;
    canvasCenterY = gl.canvas.height / 2;
  }

  function drawSphere(x, y, radius, lightX, lightY) {
    gl.uniform2f(translationUniformLocation, x, y);
    gl.uniform2f(centerUniformLocation, x, y);
    gl.uniform2f(lightPosUniformLocation, lightX, lightY);
    gl.uniform1f(radiusUniformLocation, radius);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  function draw(time) {
    if (!startTime) startTime = time;
    const elapsed = time - startTime;

    // Clear the canvas
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Calculate vertical wobble per sphere with phase offsets
    const yOffsetTopLeft = Math.sin(elapsed * wobbleSpeed + phases.topLeft) * wobbleAmplitude;
    const yOffsetBottomLeft = Math.sin(elapsed * wobbleSpeed + phases.bottomLeft) * wobbleAmplitude;
    const yOffsetBottomRight = Math.sin(elapsed * wobbleSpeed + phases.bottomRight) * wobbleAmplitude;

    // Draw spheres with different light positions to mimic the original effect
    drawSphere(
      topCenterLeftX1, 
      topCenterLeftY - 100 + yOffsetTopLeft, 
      40,
      topCenterLeftX1 + 20,  // Light position for first sphere
      topCenterLeftY - 100 + yOffsetTopLeft - 15
    );
    
    drawSphere(
      topCenterLeftX2, 
      canvas.height - topCenterLeftY + yOffsetBottomLeft, 
      150,
      topCenterLeftX2 + 60,  // Light position for second sphere
      canvas.height - topCenterLeftY + yOffsetBottomLeft - 60
    );
    
    drawSphere(
      topCenterLeftX3, 
      canvas.height - 400 + yOffsetBottomRight, 
      70,
      topCenterLeftX3 - 30,  // Light position for third sphere
      canvas.height - 400 + yOffsetBottomRight
    );

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  requestAnimationFrame(draw);
</script>
</body>
</html>