let font, staticfont;
let fontReady = false;

let sphereShader;

const vsSource = `
precision mediump float;
attribute vec2 aPosition;
uniform vec2 uCenter;
uniform float uRadius;
uniform vec2 uResolution;
varying vec2 vUV;
void main() {
  vec2 zeroToOne = (aPosition * uRadius + uCenter) / uResolution;
  vUV = aPosition; // aPosition: [-1, 1] quad
  gl_Position = vec4((zeroToOne * 2.0 - 1.0) * vec2(1, -1), 0, 1);
}
`;

const fsSource = `
precision mediump float;
uniform float uRadius;
uniform vec2 uLightOffset;
uniform float uBlur;
varying vec2 vUV;

void main() {
  float dist = length(vUV);
  if (dist > 1.0) discard; // Cut out circle
  
  float edge = smoothstep(1.0, 1.0 - uBlur, dist);
  
  vec2 toLight = vUV - uLightOffset;
  float lightDist = length(toLight);
  
  float spotlightRadius = 1.5;
  float falloffStart = 0.5;
  
  float light = 1.0 - smoothstep(falloffStart, spotlightRadius, lightDist);
  light = pow(light, 1.2);
  
  vec3 baseColor = vec3(0.2);
  vec3 highlightColor = vec3(1.0);
  
  vec3 color = mix(baseColor, highlightColor, light * 0.15);
  
  float specular = pow(max(0.0, 1.0 - lightDist / spotlightRadius), 8.0) * 0.15;
  color += vec3(specular);
  
  color = mix(color, vec3(0.1), edge * 0.1);
  
  gl_FragColor = vec4(color, 1.0);
}
`;

const rotatingText = "I-TRY-ALL-THINGS;-I-ACHIEVE-WHAT-I-CAN.//";
const staticText = "DEV-TEAM";
let typeStroke = 1;
let radius = 200;
let stackNum = 1;
let rRotate = -15;
let typeY = 40;
let stackHeight;
let pieSlice;
let rWaveOffset;

let xRotCamera = -187;
let yRotCamera = -155;
let zRotCamera = -103;
let zoomCamera = 124;

const bg_colour = "#FFFFFF";
const strk_colour = "#000000";

function preload() {
  font = loadFont('assets/ROMANUS.otf', () => {
    fontReady = true;
  });
  staticfont = loadFont('assets/ROMANUS.Otf', () => {
    fontReady = true;
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  textAlign(CENTER, CENTER);
  //noStroke();
  //smooth();
  frameRate(30);
  sphereShader = createShader(vsSource, fsSource);
}

function draw() {
  if (!fontReady) return;
  
  background(bg_colour);

  // Time for wobble
  let time = millis();
  const wobbleSpeed = 0.0025;
  const wobbleAmplitude = 10;
  const phases = [0, PI / 2, PI];
  let yOffsets = phases.map(p => sin(time * wobbleSpeed + p) * wobbleAmplitude);

  const offset = 400;
  const w = width;
  const h = height;

  shader(sphereShader);

  sphereShader.setUniform('uResolution', [w, h]);

  // Draw spheres
  [
    { x: w / 2 - offset, y: 100 - 100 + yOffsets[0], radius: 40, light: [0.4, 0.8], blur: 0.05 },
    { x: w / 2 - offset, y: h - 100 + yOffsets[1], radius: 150, light: [0.6, -0.5], blur: 0.1 },
    { x: w / 2 + offset, y: h - 400 + yOffsets[2], radius: 70, light: [-0.9, 0.0], blur: 0.18 }
  ].forEach(s => {
    push();
    translate(s.x - w / 2, s.y - h / 2);
    sphereShader.setUniform('uCenter', [s.x, s.y]);
    sphereShader.setUniform('uRadius', s.radius);
    sphereShader.setUniform('uLightOffset', s.light);
    sphereShader.setUniform('uBlur', s.blur);

    let scaleSize = map(s.radius, 0, max(w, h), 0, 2);
    scale(scaleSize);
    rectMode(CENTER);
    rect(0, 0, 2, 2);
    pop();
  });

  resetShader();

  // Draw 3D text ring

  stackHeight = (typeY) + 5;
  pieSlice = TWO_PI / rotatingText.length;
  rWaveOffset = TWO_PI / rotatingText.length;

  push();
  translate(0, 0, zoomCamera);
  rotateX(radians(xRotCamera));
  rotateY(radians(yRotCamera));
  rotateZ(radians(zRotCamera));

  // Static centered text
  push();
  resetMatrix();
  translate(0, 0, zoomCamera);
  textFont(staticfont);
  let centerTextSize = typeY * 3.5;
  textSize(centerTextSize);

  let textW = textWidth(staticText);
  let textH = centerTextSize * 0.8;
  translate(-textW / 2, textH / 3, -radius * 0.6);

  fill(0, 0, 0, 150);
  noStroke();
  textAlign(LEFT, BASELINE);
  text(staticText, 0, 0);
  pop();

  // Rotating ring text
  push();
  rotateY(frameCount * (rRotate / 1000));

  for (let i = 0; i < rotatingText.length * stackNum; i++) {
    let ringSpot = i % rotatingText.length;
    let currentChar = rotatingText.charAt(ringSpot);

    push();
    translate(0, floor(i / rotatingText.length) * stackHeight);
    rotateY(ringSpot * pieSlice);
    translate(0, 0, radius);

    textFont(font);
    textSize(typeY);
    fill(strk_colour);
    noStroke();
    textAlign(CENTER, CENTER);
    text(currentChar, 0, 0);
    pop();
  }
  pop();
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
