
/*!
 * This file is part of Space Type Generator.
 * 
 * Copyright (c) Kiel Mutschelknaus
 * 
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/ or send a letter to
 * Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
 */
/*
// LETTER
var typeX, typeXSlider;
var typeY, typeYSlider;
var typeStroke, typeStrokeSlider;
var strecherXslider, strecherXsize;
var strecherX = 0;
var strecherYslider, strecherYsize;
var strecherY = 0;

// CYLINDER
var pieSlice;
var rSlider, radius;
var stackNumSlider, stackNum;
var rRotateSlider, rRotate;
var rOffsetSlider, rOffset;
var rWaveCountSlider, rWaveCount;
var rWaveSpeedSlider, rWaveSpeed;
var rWaveSlider, rWave;
var rZaxisSlider, rZaxis;
var rLongSlider, rLong;
var xRotTweakSlider,xRotTweak, yRotTweakSlider, yRotTweak, zRotTweakSlider, zRotTweak;
var rWaveOffset;
var stackHeight;
var stackHeightAdjust = 0;

// CAMERA
var xRotCamera, yRotCamera, zRotCamera;
var xRotCameraSlider, yRotCameraSlider, zRotCameraSlider;
var zoomCamera, zoomCameraSlider;

// STRING
var letter_select, inp, inpText;
var myText = [];
const inputText = "I-TRY-ALL-THINGS;-I-ACHIEVE-WHAT-I-CAN.//"; // Default text

// SAVE
var exportButton;

// COLOR
var strkColor = 0;
var bkgdColor = 255;
var bkgdStrokeColor = 255;
var inp1, inp2, inp3, inp4, inp5, inp6;
var inpNumber = 1;
const bg_colour="#FFFFFF"; // Default background color
const strk_colour="#000000"; // Default stroke color

// PRESETS
var presetSimple, presetJellyfish, presetCrown, presetComplex, presetWeave, presetZebra, presetHoops;

function preload() {
 font = loadFont('assets/ROMANUS.otf');
}

function setup(){
  createCanvas(windowWidth,windowHeight, WEBGL);
  textAlign(CENTER, CENTER);
  background(bkgdColor);
  smooth();
  textFont(font);
  frameRate(30);
  
  inp = inputText;
  radius = 250;
  stackNum = 1;
  rRotate = -20;
  rOffset = 0.01;
  rWaveCount = 2;
  rWaveSpeed = 0;
  rWave = 0;  
  rZaxis = 0;
  strecherYsize = 0;
  strecherXsize = 0;
  rLong = 0;
  typeX = 24;
  typeY = 40;
  typeStroke = 1;
  xRotCamera = -187;
  yRotCamera = -155;
  zRotCamera = -103;
  xRotTweak = 0;
  yRotTweak = 0;
  zRotTweak = 0;
  zoomCamera = 124;
}

function draw(){
  bkgdColor = bg_colour;
  background(bkgdColor);
  inpText = inputText;  
  staticText = "DEV-TEAM";
  
  stackHeight = (typeY+strecherYsize/2) + 5 + stackHeightAdjust;
  pieSlice = 2*PI/inpText.length;
  rWaveOffset = 2*PI/inpText.length*rWaveCount;

  noFill();
  strokeWeight(typeStroke);

  push();
  // camera setup
  translate(0,0,zoomCamera);
  rotateX(radians(xRotCamera));
  rotateY(radians(yRotCamera));
  rotateZ(radians(zRotCamera));
  
  // FIRST: Draw the fixed text inside the ring
  push();
    // Position at center (adjust Z value to place inside ring)
    //translate(0, 0, -radius * 0.5);
    resetMatrix();
    translate(0, 0, zoomCamera);
    
    // Counter-rotate to keep text fixed relative to view
    //rotateX(-radians(xRotCamera));
    //rotateY(-radians(yRotCamera));
    //rotateZ(-radians(zRotCamera));
    
    // Text styling
    //textFont(font);
    //textSize(typeY * 1.2); // Slightly larger than ring text

    textFont(font);
    let textSizeValue = typeY * 1.5; // Adjust size as needed
    textSize(textSizeValue);

    //let textW = textWidth(inpText);
    //let textH = typeY * 1.2 * 0.75; // Approximate height

    let textW = textWidth(inpText);
    let textH = textSizeValue * 0.8; // Approximate height


    
    // Position text so its center matches ring center
    // Note: In WEBGL mode, text is drawn on XY plane facing +Z
    //translate(-textW/2, textH/2, -radius * 0.7);
    translate(-textW/2, textH/3, -radius * 0.6);


    fill(0); // Black text
    noStroke();
    textAlign(LEFT, BASELINE);
    
    // Draw the text
    text(staticText, 0, 0);
  pop();
  
  // SECOND: Draw the rotating ring (separate transformation)
  push();
    // Apply only the ring rotation
    rotateY(frameCount*(rRotate/1000));
    
    for(var i =0; i<inpText.length*stackNum; i++) {
      var ringSpot = i%inpText.length;
      letter_select = ringSpot;  
      
      if(floor(i/inpText.length)%2 === 1){
        strecherY = map(sin(ringSpot*rWaveOffset + frameCount*(rWaveSpeed/1000)),-1,1,0,strecherYsize);
      } else {
        strecherY = map(sin(ringSpot*rWaveOffset + frameCount*(rWaveSpeed/1000) + PI),-1,1,0,strecherYsize);
      }

      strecherX = map(sin(floor(i/inpText.length)*rWaveOffset+frameCount*(rWaveSpeed/1000)),-1,1,0,strecherXsize);
      push();
        // stack translates
        rotateY(floor(i/inpText.length)*rOffset);
        translate(0,floor(i/inpText.length)*stackHeight);
        // ring translates
        rotateY(ringSpot*pieSlice);
        
        translate(0,0,radius);
        if(rLong!=0){
          var rLonger = sin(floor(i/inpText.length)*rWaveOffset+frameCount*(rWaveSpeed/1000))*rLong;
          translate(0,0,rLonger);
        }
        if(rZaxis!=0){
          var rZaxiser = sin(ringSpot*rWaveOffset + frameCount*(rWaveSpeed/1000)) * rZaxis;
          translate(0,rZaxiser,0);
        }
        if(rWave!=0){
          var rWaver = sin(ringSpot*rWaveOffset + frameCount*(rWaveSpeed/1000)) * rWave;
          translate(0,0,rWaver);
        }
        if(yRotTweak!=0){
          rotateY(cos(ringSpot*rWaveOffset + frameCount*(rWaveSpeed/1000)) * -radians(yRotTweak));
        }
        if(xRotTweak!=0){      
          rotateX(cos(ringSpot*rWaveOffset + frameCount*(rWaveSpeed/1000)) * -radians(xRotTweak));
        }
        
        if(rLong!=0){
          var prerLonger = sin(floor((i/inpText.length)-1)*rWaveOffset+frameCount*(rWaveSpeed/1000))*rLong;
          var postrLonger = sin(floor((i/inpText.length)+1)*rWaveOffset+frameCount*(rWaveSpeed/1000))*rLong;
          var rLongAdjust = atan2(stackHeight*2,(prerLonger-postrLonger))
          rotateX(rLongAdjust-PI/2);
        }
        
        if(zRotTweak!=0){
          rotateZ(cos(ringSpot*rWaveOffset + frameCount*(rWaveSpeed/1000)) * radians(zRotTweak));
        }
            
        translate(-(typeX+strecherX)/2,-(typeY+strecherY)/2,0);
        // outer surface
        if(inpNumber == 6){
          setTextColor(floor(i/inpText.length));
        } else {
          strkColor = color(strk_colour);
          bkgdStrokeColor = lerpColor(strkColor, color(bg_colour), 0.75);
        }
        stroke(strkColor);    
        keyboardEngine();
        translate(0,0,-1);
        // inner surface
        stroke(bkgdStrokeColor);
        keyboardEngine();
      pop();
    }
  pop();
  pop();
}

function setTextColor(switcher) {
  let backgroundColor = color(bkgdColorPicker.value());
    if (switcher % 6 == 0) {
      strkColor = inp1;
      bkgdStrokeColor = lerpColor(strkColor, backgroundColor, 0.75);
    }
    if (switcher % 6 == 1) {
      strkColor = inp2;
      bkgdStrokeColor = lerpColor(strkColor, backgroundColor, 0.75);
    }
    if (switcher % 6 == 2) {
      strkColor = inp3;
      bkgdStrokeColor = lerpColor(strkColor, backgroundColor, 0.75);
    }
    if (switcher % 6 == 3) {
      strkColor = inp4;
      bkgdStrokeColor = lerpColor(strkColor, backgroundColor, 0.75);
    }
    if (switcher % 6 == 4) {
      strkColor = inp5;
      bkgdStrokeColor = lerpColor(strkColor, backgroundColor, 0.75);
    }
    if (switcher % 6 == 5) {
      strkColor = inp6;
      bkgdStrokeColor = lerpColor(strkColor, backgroundColor, 0.75);
    }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function saveLoop(){
}
*/
/*!
 * Space Type Generator with Separate Static and Rotating Text
 */

// TEXT CONFIGURATION
const rotatingText = "I-TRY-ALL-THINGS;-I-ACHIEVE-WHAT-I-CAN.//"; // Characters that will rotate in the ring
const staticText ="DEV-TEAM"; // Text that stays fixed in the center
let font;
let fontReady = false;
let typeStroke=1;

// CYLINDER PARAMETERS
let radius = 250;
let stackNum = 1;
let rRotate = -15;
let typeY = 40;
let stackHeight;
let pieSlice;
let rWaveOffset;

// CAMERA
let xRotCamera = -187;
let yRotCamera = -155;
let zRotCamera = -103;
let zoomCamera = 124;

// COLORS
const bg_colour = "#FFFFFF";
const strk_colour = "#000000";
const staticword_colour="#1b1a1aff"

function preload() {
  font = loadFont('assets/ROMANUS.otf', () => {
    fontReady = true;
  });
  staticfont = loadFont('assets/Avenue de Madison.ttf', () => {
    fontReady = true;
  });
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  textAlign(CENTER, CENTER);
  
  smooth();
  frameRate(30);
}

function draw() {
  if (!fontReady) return;
  
  background(bg_colour);
  
  // Calculate ring parameters based on rotating text
  pieSlice = TWO_PI / rotatingText.length;
  rWaveOffset = TWO_PI / rotatingText.length;
  stackHeight = typeY + 10;

  push();
  // Camera setup
  translate(0, 0, zoomCamera);
  rotateX(radians(xRotCamera));
  rotateY(radians(yRotCamera));
  rotateZ(radians(zRotCamera));

  // DRAW STATIC CENTERED TEXT
  push();
    resetMatrix();
    translate(0, 0, zoomCamera);
    
    textFont(staticfont);
    let centerTextSize = typeY * 3.5; // Larger for center text
    textSize(centerTextSize);
    
    
    let textW = textWidth(staticText);
    let textH = centerTextSize * 0.8;
    
    // Position at center of ring
    translate(-textW/2, textH/3, -radius * 0.6);
    
    //fill(50); // Red color for visibility
    fill(0, 0, 0, 150);
    noStroke();
    //stroke(255, 0, 0); // Red stroke
    //strokeWeight(2);
    textAlign(LEFT, BASELINE);
    //translate(-textWidth('Hello') / 2, 0);
    //scale(1.5, 1);
    //textSize(52);
    text(staticText, 0, 0);
  pop();

  // DRAW ROTATING RING
  push();
    rotateY(frameCount * (rRotate/1000));
    
    for(let i = 0; i < rotatingText.length * stackNum; i++) {
      let ringSpot = i % rotatingText.length;
      let currentChar = rotatingText.charAt(ringSpot);
      
      push();
        // Position in stack
        translate(0, floor(i/rotatingText.length) * stackHeight);
        
        // Position in ring
        rotateY(ringSpot * pieSlice);
        translate(0, 0, radius);
        // Draw character
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