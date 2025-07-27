/*!
 * This file is part of Space Type Generator.
 * 
 * Copyright (c) Kiel Mutschelknaus
 * 
 * This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/ or send a letter to
 * Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
 */

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
const bg_colour="#fffdfdff"; // Default background color
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
  /*
  rSlider = createSlider(0,1000,250); rSlider.position(15,17); rSlider.style('width','100px');
  stackNumSlider = createSlider(1,30,1); stackNumSlider.position(15,47); stackNumSlider.style('width','100px');
  rRotateSlider = createSlider(-100,100,-5); rRotateSlider.position(15,77); rRotateSlider.style('width','100px');  
  rOffsetSlider = createSlider(0,PI/2,0,0.01); rOffsetSlider.position(15,107); rOffsetSlider.style('width','100px');    

  rWaveCountSlider = createSlider(0,10,2); rWaveCountSlider.position(15,147); rWaveCountSlider.style('width','100px');
  rWaveSpeedSlider = createSlider(0,100,0); rWaveSpeedSlider.position(15,177); rWaveSpeedSlider.style('width','100px');
  rWaveSlider = createSlider(0,200,0); rWaveSlider.position(15,207); rWaveSlider.style('width','100px');
  rLongSlider = createSlider(0,80,0); rLongSlider.position(15,237); rLongSlider.style('width','100px');
  rZaxisSlider = createSlider(0,100,0); rZaxisSlider.position(15,267); rZaxisSlider.style('width','100px');
  strecherXslider = createSlider(0,80,0); strecherXslider.position(15,297); strecherXslider.style('width','100px');
  strecherYslider = createSlider(0,100,0); strecherYslider.position(15,327); strecherYslider.style('width','100px');
  
  typeXSlider = createSlider(0,100,20); typeXSlider.position(15,367); typeXSlider.style('width','100px');
	typeYSlider = createSlider(0,100,40); typeYSlider.position(15,397); typeYSlider.style('width','100px');
	typeStrokeSlider = createSlider(0,10,2,0.1); typeStrokeSlider.position(15,427); typeStrokeSlider.style('width','100px');

  xRotTweakSlider = createSlider(0,45,0); xRotTweakSlider.position(15,517); xRotTweakSlider.style('width','100px');
  yRotTweakSlider = createSlider(0,45,0); yRotTweakSlider.position(15,547); yRotTweakSlider.style('width','100px');
  zRotTweakSlider = createSlider(0,45,0); zRotTweakSlider.position(15,577); zRotTweakSlider.style('width','100px');
  
  xRotCameraSlider = createSlider(-180,180,15); xRotCameraSlider.position(-20,height-107); xRotCameraSlider.style('width','100px'); xRotCameraSlider.style('rotate',270);
  yRotCameraSlider = createSlider(-180,180,0); yRotCameraSlider.position(20,height-107); yRotCameraSlider.style('width','100px'); yRotCameraSlider.style('rotate',270);
  zRotCameraSlider = createSlider(-180,180,0); zRotCameraSlider.position(60,height-107); zRotCameraSlider.style('width','100px'); zRotCameraSlider.style('rotate',270);
	zoomCameraSlider = createSlider(-500,500,0); zoomCameraSlider.position(15,height-20); zoomCameraSlider.style('width','100px');

//  exportButton = createButton('Save Loop'); exportButton.position(140,10); exportButton.mousePressed(saveLoop);
  prideButton = createButton('PRIDE!'); prideButton.position(140,35); prideButton.mousePressed(pride);

  presetSimple = createButton('Simple'); presetSimple.position(140,height-30); presetSimple.mousePressed(simpleSet);
  presetJellyfish = createButton('Jellyfish'); presetJellyfish.position(200,height-30); presetJellyfish.mousePressed(jellyfishSet);
  presetCrown = createButton('Crown'); presetCrown.position(270,height-30); presetCrown.mousePressed(crownSet);
  presetComplex = createButton('Complex'); presetComplex.position(330,height-30); presetComplex.mousePressed(complexSet);
  presetWeave = createButton('Weave'); presetWeave.position(405,height-30); presetWeave.mousePressed(weaveSet);
  presetZebra = createButton('Zebra'); presetZebra.position(465,height-30); presetZebra.mousePressed(zebraSet);
  presetHoops = createButton('Hoops'); presetHoops.position(515,height-30); presetHoops.mousePressed(hoopsSet);
  */
  inp1 = color(strk_colour);
 /*
  inp1check = createCheckbox('', true);inp1check.position(160, 82);
  inp2 = createColorPicker('#ff0000');inp2.position(180, 110);inp2.style('width', '20px');
  inp2check = createCheckbox('', false);inp2check.position(160, 112);
  inp3 = createColorPicker('#0000ff');inp3.position(180, 140);inp3.style('width', '20px');
  inp3check = createCheckbox('', false);inp3check.position(160, 142);
  inp4 = createColorPicker('#ffff00');inp4.position(180, 170);inp4.style('width', '20px');
  inp4check = createCheckbox('', false);inp4check.position(160, 172);
  inp5 = createColorPicker('#ffffff');inp5.position(180, 200);inp5.style('width', '20px');
  inp5check = createCheckbox('', false);inp5check.position(160, 202);
*/
  bkgdColorPicker = color(bg_colour);
//  bkgdStrokeColorPicker = createColorPicker('#FFFFFF'); bkgdStrokeColorPicker.position(160, 310); bkgdStrokeColorPicker.style('height', '20px');
}
const staticText ="DEV-TEAM";

function draw(){
    
  bkgdColor = bg_colour;
  background(bkgdColor);
  inpText = inputText;  
  text(inpText, 500, 500, 500);
  radius = 250;//rSlider.value();
  stackNum = 1;//stackNumSlider.value();
  rRotate = -20;//rRotateSlider.value();
  rOffset = 0.01;//rOffsetSlider.value();
  rWaveCount =2;// rWaveCountSlider.value();
  rWaveSpeed = 0;//rWaveSpeedSlider.value();
  rWave = 0;//rWaveSlider.value();  
  rZaxis = 0;//rZaxisSlider.value();
  strecherYsize = 0;//strecherYslider.value();
  strecherXsize = 0;//strecherXslider.value();
  rLong = 0;//rLongSlider.value();
  typeX = 24;//typeXSlider.value();
  typeY = 40;//typeYSlider.value();
  typeStroke =1;// typeStrokeSlider.value();
  xRotCamera = -187;//xRotCameraSlider.value();
  yRotCamera = -155;//yRotCameraSlider.value();
  zRotCamera = -103;//zRotCameraSlider.value();
  xRotTweak = 0;//xRotTweakSlider.value();
  yRotTweak = 0;//yRotTweakSlider.value();
  zRotTweak = 0;//zRotTweakSlider.value();
  zoomCamera = 124;//zoomCameraSlider.value();
  
  stackHeight = (typeY+strecherYsize/2) + 5 + stackHeightAdjust;
  pieSlice = 2*PI/inpText.length;
  rWaveOffset = 2*PI/inpText.length*rWaveCount;

   /* push();
    translate(-width/2,-height/2);
    stroke(125);
    strokeWeight(1);
    line(10,130,130,130);
    line(10,350,130,350);
    rect(5,450,125,160);    
    line(185,height-43,500,height-43); 

    fill(125);
    textAlign(LEFT);

    textSize(9);
    text("Type Color",140,75);
    text("BACKGROUND",140,115);
//    text("INNER",145,300);

  
    text("CYLINDER: Radius " + radius,15,16);
    text("CYLINDER: Count " + stackNum,15,46);
    text("CYLINDER: Rotate " + rRotate,15,76);
    text("CYLINDER: Offset " + rOffset,15,106);
  //  line break
    text("WAVE: Count " + rWaveCount,15,146);
    text("WAVE: Speed " + rWaveSpeed,15,176);
    text("WAVE: Latitude  " + rWave,15,206);
    text("WAVE: Longitude " + rLong,15,236);
    text("WAVE: Ripple " + rZaxis,15,266);
    text("WAVE: X-Scale " + strecherXsize,15,296);
    text("WAVE: Y-Scale " + strecherYsize,15,326);
  // line break  
    text("TYPE: X-Scale " + typeX,15,366);
    text("TYPE: Y-Scale " + typeY,15,396);
    text("TYPE: Weight " + typeStroke,15,426);

    text("Use to smooth form\nafter LATITUDE (x,y)\nor RIPPLE (z) adjust",15,470);  
    text("TWEAK: X Rotation " + xRotTweak,15,516);
    text("TWEAK: Y Rotation " + yRotTweak,15,546);
    text("TWEAK: Z Rotation " + zRotTweak,15,576);

    text("CAMERA: Zoom",15,height-22);
		text("PRESETS", 145,height-40);
    
    translate(0,height);
    rotateZ(-PI/2);
    text("CAMERA: X-Rotation " + xRotCamera,45,20);
    text("CAMERA: Y-Rotation " + yRotCamera,45,60);
    text("CAMERA: Z-Rotation " + zRotCamera,45,100);

    pop();
  */
  noFill();
  strokeWeight(typeStroke);
  /*
  push();
  // Disable rotation so text is static in the center
  rotateX(0);
  rotateY(0);
  rotateZ(0);

  // Move to center of the scene
  translate(0, 0, 0);

  // Text style
  fill(0);
  textFont(font);
  textSize(typeY);
  textAlign(CENTER, CENTER);
  noStroke();

  // Draw text in 3D
  text(inpText, 0, 0);
pop();*/

/*
// FIXED TEXT IN CENTER
push();
  // Centered in 3D space
  translate(0, 0, 0);

  // Optional tilt to match ring angle (e.g., rotate slightly on X)
  rotateX(radians(15)); // Adjust angle if needed to align better visually

  textFont(font);
  textSize(typeY);
  fill(0); // or your chosen color
  noStroke();
  textAlign(CENTER, CENTER);

  text("I-TRY-ALL-THINGS;-I-ACHIEVE-WHAT-I-CAN.", 0, 0);
pop();


*/
  push();
  // camera
  translate(0,0,zoomCamera);
  rotateX(radians(xRotCamera));
  rotateY(radians(yRotCamera));
  rotateZ(radians(zRotCamera));

  push();
    resetMatrix();
    translate(0, 0, zoomCamera);
    
    textFont(font);
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
  
  // center stack
  //translate(0,-(stackNum-1)*stackHeight/2);
  
  // rotation
  push();
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
      // fix rLong y-rotation
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
     	keyboardEngine()
  	pop();
 	}
	pop();
  pop();
    /*
    // Fixed text that appears encircled by the rotating structure
for (var i = 0; i < inpText.length * stackNum; i++) {
  var ringSpot = i % inpText.length;
  letter_select = ringSpot;

  push();

  // stack translation
  
  rotateY(floor(i / inpText.length) * rOffset);
  translate(0, floor(i / inpText.length) * stackHeight);

  // ROTATE EACH CHARACTER AROUND CENTER
  rotateY(ringSpot * pieSlice + frameCount * (rRotate / 1000));

  // move outward
  translate(0, 0, -radius);

  // other transforms like ripple/wave here...

  // shift to center character
  translate(-(typeX + strecherX) / 2, -(typeY + strecherY) / 2, 0);

  stroke(strkColor);
  keyboardEngine();

  translate(0, 0, -1);
  stroke(bkgdStrokeColor);
  keyboardEngine();

  pop();
}
  */
 /*
 for (var i = 0; i < inpText.length * stackNum; i++) {
  var ringSpot = i % inpText.length;
  letter_select = ringSpot;

  push();

  // Calculate angle for current character
  var angle = ringSpot * pieSlice;             // character's spot in the circle
  var rotation = frameCount * (rRotate / 1000); // rotation of the entire ring

  // Rotate around Y to spin the ring (entire structure rotates)
  rotateY(angle + rotation);                   // place char in circle + apply spin

  // Stack vertically (optional)
  translate(0, floor(i / inpText.length) * stackHeight);

  // Cancel the rotation so the text appears fixed in space
  rotateY((angle + rotation));                // make letter face forward

  // Move letter outward or inward
  translate(0, 0, -radius);                    // push inward (or radius if you want it out)

  // Optional: tilt the character if you want a slight 3D look
  // rotateX(-PI / 6);                          // optional slant for better fitting

  // Center the character
  translate(-(typeX + strecherX) / 2, -(typeY + strecherY) / 2, 0);

  // Draw character with stroke
  stroke(strkColor);
  keyboardEngine();                            // draw character

  // Background stroke (for effect)
  translate(0, 0, -1);
  stroke(bkgdStrokeColor);
  keyboardEngine();

  pop();
}*/



    
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
/*
function reSetting() {
  stackHeightAdjust = 0;
	rSlider.value(250); stackNumSlider.value(1); rRotateSlider.value(-5); rOffsetSlider.value(0); rWaveCountSlider.value(2); rWaveSpeedSlider.value(0); rWaveSlider.value(0);
  rLongSlider.value(0); rZaxisSlider.value(0); strecherXslider.value(0); strecherYslider.value(0); typeXSlider.value(20); typeYSlider.value(40); typeStrokeSlider.value(2);
  xRotTweakSlider.value(0); yRotTweakSlider.value(0); zRotTweakSlider.value(0);
  xRotCameraSlider.value(15);  yRotCameraSlider.value(0);  zRotCameraSlider.value(0); zoomCameraSlider.value(0);
  
//  invertCheck.checked(false);
  strkColor = color(0);
	bkgdColor = color(255);
  bkgdStrokeColor = color(235);
}

function simpleSet() {
	reSetting();
	rSlider.value(185); stackNumSlider.value(8); rRotateSlider.value(-10); rOffsetSlider.value(0.2); rWaveSpeedSlider.value(75); rWaveSlider.value(41);
  xRotTweakSlider.value(24); yRotTweakSlider.value(27);
  xRotCameraSlider.value(20);
}

function jellyfishSet() {
	reSetting();
	rSlider.value(200); stackNumSlider.value(6); rOffsetSlider.value(0.15); rWaveCountSlider.value(3); rWaveSpeedSlider.value(100);
  rLongSlider.value(80); strecherXslider.value(23); typeXSlider.value(13); typeYSlider.value(64); typeStrokeSlider.value(.5);
  xRotCameraSlider.value(25);
  
//  invertCheck.checked(true);
	strkColor = color(255);
    bkgdColor = color(0);
    bkgdStrokeColor = color(25); 
}

function crownSet() {
	reSetting();
  stackNumSlider.value(3); rRotateSlider.value(-5); rWaveCountSlider.value(4); rWaveSpeedSlider.value(50);
  rZaxisSlider.value(21); strecherYslider.value(76); typeXSlider.value(30); typeStrokeSlider.value(3);
  strecherXslider.value(-25); zoomCameraSlider.value(-500);
}

function complexSet() {
	reSetting();
	rSlider.value(178); stackNumSlider.value(11); rRotateSlider.value(0); rOffsetSlider.value(0.16); rWaveCountSlider.value(6); rWaveSpeedSlider.value(75); rWaveSlider.value(10);
  rLongSlider.value(31); typeXSlider.value(16); typeYSlider.value(40); typeStrokeSlider.value(2);
  xRotTweakSlider.value(15); yRotTweakSlider.value(35); zRotTweakSlider.value(0);
  xRotCameraSlider.value(-34);  yRotCameraSlider.value(10);  zRotCameraSlider.value(25);
  
//  invertCheck.checked(true);
    bkgdColor = color(0);
    bkgdStrokeColor = color(25); 
}


function weaveSet() {
	reSetting();
  stackHeightAdjust = 30;
	rSlider.value(110); stackNumSlider.value(7); rRotateSlider.value(15); rOffsetSlider.value(0.62); rWaveCountSlider.value(5); rWaveSpeedSlider.value(30);
  rZaxisSlider.value(15); typeXSlider.value(12); typeYSlider.value(19); typeStrokeSlider.value(1);
	zRotTweakSlider.value(33);
  xRotCameraSlider.value(15);  yRotCameraSlider.value(0);  zRotCameraSlider.value(0); zoomCameraSlider.value(0);
}

function zebraSet() {
	reSetting();
  stackHeightAdjust = 10;
	rSlider.value(110); stackNumSlider.value(7); rRotateSlider.value(20); rOffsetSlider.value(0.3); rWaveCountSlider.value(2); rWaveSpeedSlider.value(30); rWaveSlider.value(15);
  rZaxisSlider.value(15); strecherYslider.value(33); typeXSlider.value(12); typeYSlider.value(19); typeStrokeSlider.value(1);
  xRotTweakSlider.value(9); yRotTweakSlider.value(24); zRotTweakSlider.value(22);
  xRotCameraSlider.value(15);  yRotCameraSlider.value(0);  zRotCameraSlider.value(0); zoomCameraSlider.value(0);
  
//  invertCheck.checked(true);
    bkgdColor = color(0);
    bkgdStrokeColor = color(25); 
}

function hoopsSet() {
	reSetting();
  stackHeightAdjust = 30;
	rSlider.value(110); stackNumSlider.value(7); rRotateSlider.value(15); rOffsetSlider.value(0.62); rWaveCountSlider.value(1); rWaveSpeedSlider.value(100);
  rZaxisSlider.value(58); typeXSlider.value(12); typeYSlider.value(19); typeStrokeSlider.value(1.5);
  zRotTweakSlider.value(28);
  xRotCameraSlider.value(-10);

//  invertCheck.checked(true);
    bkgdColor = color(0);
    bkgdStrokeColor = color(25); 
}

function pride() {
  stackNumSlider.value(6);
  inpNumber = 6;
  
  inp1 = color('#e70000');inp2 = color('#ff8c00'); inp3 = color('#ffef00');inp4 = color('#00811f'); inp5 = color('#0044ff'); inp6 = color('#760089');
}
*/
//text("HELLO", 0, 0, 0);
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function saveLoop(){
}