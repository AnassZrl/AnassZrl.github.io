const bgInput = document.querySelector("#bgInput");
const pngInput = document.querySelector("#pngInput");
const fontColor = document.querySelector("#fontColor");
const shadowColor = document.querySelector("#shadowColor");
const outlineColor = document.querySelector("#outlineColor");
const outlineSize = document.querySelector("#outlineSize");
//const rotationAngle = document.querySelector("#rotationAngle");
const blurCheck = document.querySelector("#blurCheck");
const blurValue = document.querySelector("#blurValue");
const rangeInputs = document.querySelectorAll('input[type="range"]');

let dark=true;
let xCoord = document.getElementById("xCoord");
let yCoord = document.getElementById("yCoord");
let fontDim = document.getElementById("fontDim");

let pngXcoord = document.getElementById("pngXcoord");
let pngYcoord = document.getElementById("pngYcoord");

const canvas = document.querySelector("#canvas");
const canvasCtx = canvas.getContext("2d");

const canvasPng = document.querySelector("#canvasPng");
const canvasPngCtx = canvasPng.getContext("2d");

let bgImage = null;
let pngImage = null;
let txtValue = null; 
fontDim.value = 110;
xCoord.value = 640;
yCoord.value = 130;


//---------------------------------------------------------------------
function darkMode() {
    var root = document.querySelector(":root");
        
    document.querySelectorAll('*').forEach((node) => node.classList.toggle("darkMode"));
    document.querySelectorAll('input').forEach((node) => node.classList.toggle("darkInput"));
    document.querySelectorAll('button').forEach((node) => node.classList.toggle("darkInput"));
    document.querySelectorAll('select').forEach((node) => node.classList.toggle("darkInput"));
    document.querySelectorAll('canvas').forEach((node) => node.classList.toggle("darkCanvas"));
    
    if (dark === true) {
        root.style.setProperty('--rangeBackgroundImage', '#eea730');
        root.style.setProperty('--rangeBackground', 'transparent');
        dark = false;
    }
    else {
        root.style.setProperty('--rangeBackgroundImage', '#3e64ff');
        root.style.setProperty('--rangeBackground', 'white');
        dark = true;
    }
}

//when pafe is loaded ask this
window.onload = function () {
    darkMode();

    if(confirm("Do you want light mode?")) {
        alert("I'm sorry for ur eyes");
        darkMode();
    }
}





//---------------------------------------------------------------------
document.getElementById("blackGradient").onclick = function () {
    var grd = canvasCtx.createLinearGradient(640, 0, 640, 300);
    grd.addColorStop(0, "black");
    grd.addColorStop(1, "transparent"); 

    // Fill with gradient
    canvasCtx.fillStyle = grd;
    canvasCtx.fillRect(0, 0, 1280, 720);
}
//Font Selector
const fonts = [new FontFace("BigDeal", "url(fonts/aBigDeal.ttf)"),
    new FontFace("AkhirTahun", "url(fonts/aAkhirTahun.ttf)"),
    new FontFace("BlackLives", "url(fonts/aBlackLives.ttf)"),
    new FontFace("Caribold", "url(fonts/CARIBOLD.ttf)"),
    new FontFace("CariboldRough", "url(fonts/CARIBOLDROUGH.ttf)"),
    new FontFace("ConfigRounded", "url(fonts/ConfigRoundedExtrabold.otf)"),
    new FontFace("Confetti", "url(fonts/PartyConfetti.ttf)"),
    new FontFace("DenseLetters", "url(fonts/DenseLetters.ttf)"),
    new FontFace("ChunkFive", "url(fonts/ChunkFive.otf)"),
    new FontFace("Digitalt", "url(fonts/Digitalt.ttf)"),
    new FontFace("Debussy", "url(fonts/debussy.ttf)"),
    new FontFace("Freshman", "url(fonts/Freshman.ttf)"),
    new FontFace("GaboDriveBold", "url(fonts/GaboDriveCondensedBold.ttf)"),
    new FontFace("Insanibc", "url(fonts/Insanibc.ttf)"),
    new FontFace("Insanibu", "url(fonts/Insanibu.ttf)"),
    new FontFace("LilitaOne", "url(fonts/LilitaOne-Regular.ttf)"),
    new FontFace("Matiz", "url(fonts/Matiz.ttf)"),
    new FontFace("AppleTea", "url(fonts/AppleTea.ttf)"),
    new FontFace("MoonHeavy", "url(fonts/MoonHeavy.ttf)"),
    new FontFace("Sniglet", "url(fonts/Sniglet-ExtraBold.ttf)"),
    new FontFace("TheBoldFont", "url(fonts/theboldfont.ttf)")];

for (let i = 0; i < fonts.length; i++) {
    fonts[i].load().then((font) => {
        // with canvas, if this is ommited won't work
        document.fonts.add(font);

        //add option on the select font dropdown menu
        const fontFace = document.createElement("option");
        fontFace.innerHTML = fonts[i].family;
        //console.log(fonts[i].family.text);
        const dropDown = document.getElementById("fontDropDownInput");
        dropDown.appendChild(fontFace);
        dropDown.options[i].style.font = "12px " +dropDown.options[i].text;
        //console.log(dropDown.options[i]);
    })
} //console.log(font[0].font);


//----------------------------------------------------------------------------------------------------------
//Printing Text

document.getElementById("textBtn").onclick = function () {
    renderText();
}

function renderText() {
    //Get Type(none, bold, italic)
    var select = document.getElementById('dropDownInput');
    var text = select.options[select.selectedIndex].text;

    //Get Font name
    var fontSelect = document.getElementById("fontDropDownInput");
    var fontText = fontSelect.options[fontSelect.selectedIndex].text;

    //set Outline color
    //console.log("Outline Color: "+outlineColor.value);
    canvasCtx.strokeStyle = outlineColor.value;

    //sets outline thickness value
    canvasCtx.lineWidth = outlineSize.value;
    //console.log("Outline Size:" + outlineSize.value);

    canvasCtx.font = fontDim.value + "px "+fontText;
    //console.log("Font Style: " + canvasCtx.font);

    //align at center
    canvasCtx.textAlign = "center";

    //draws stroke
    canvasCtx.strokeText(document.querySelector("#txtInput").value, xCoord.value, yCoord.value);

    //set Font Color
   //console.log("Font Color: " + fontColor.value);
    canvasCtx.fillStyle = fontColor.value;

    //draws text
    canvasCtx.fillText(document.querySelector("#txtInput").value, xCoord.value, yCoord.value);

    //still for rotation suff
    //console.log("Title " + document.getElementById("textBtn").value + " Coord : X: " + xCoord.value + ", Y: " + yCoord.value);
}

//----------------------------------------------------------------------------------------------------------
//get mouse position from canvas

//report the mouse position on click
canvas.addEventListener("click", function (evt) {
    var mousePos = getMousePos(canvas, evt);
    xCoord.value = Math.round(mousePos.x);
    yCoord.value = Math.round(mousePos.y);

    pngXcoord.value = Math.round(mousePos.x);
    pngYcoord.value = Math.round(mousePos.y);
    
    //console.log("Selected Coordinates at X: " + Math.round(mousePos.x) + ", Y: " + mousePos.y)
}, false);

//Get Mouse Position
function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

//----------------------------------------------------------------------------------------------------------
//pngInput is associated with the element that has that ID
//this methods detects when something changes and executes this


bgInput.addEventListener("change", () => {
    bgImage = new Image();//create new image;

    //once the image is loaded
    bgImage.addEventListener("load", () => {
        renderBackground();
    });

    //the source(src) is going to be the uploaded image
    //the uploaded image will be converted to a URL so that the browser can use
    bgImage.src = URL.createObjectURL(bgInput.files[0]);
});

function renderBackground() {

    if (blurCheck.checked == true) {
        console.log("Blur is Checked");
        canvasCtx.filter = "blur(" + (blurValue.value/10) + "px)";
    }

    //Draws image while rescaling it to 1280x720
    canvasCtx.drawImage(bgImage, 0, 0, 1280, 720);
    canvasCtx.filter = "blur(" + 0 + "px)";
};

//----------------------------------------------------------------------------------------------------------
//pngInput is associated with the element that has that ID
//this methods detects when something changes and executes this

pngInput.addEventListener("change", () => {
    pngImage = new Image();//create new image;

    //once the image is loaded
    pngImage.addEventListener("load", () => {
        renderPng();
    });
    
    //the source(src) is going to be the uploaded image
    //the uploaded image will be converted to a URL so that the browser can use
    pngImage.src = URL.createObjectURL(pngInput.files[0]);
});

function renderPng() {
    //generates the random x coordinate
    let xCoord = Math.floor(Math.random() * (1280 - pngImage.width));
    
    outlineCheck()
    
    canvasPngCtx.drawImage(pngImage, xCoord, (720 - pngImage.height), pngImage.width,480);
    console.log("debug: png rendered at x:" + xCoord);

    canvasCtx.drawImage(canvasPng, 0, 0);
    console.debug("png copied")
};

//Set outline color and settings
function outlineCheck(){
        canvasPngCtx.shadowColor = shadowColor.value;
        canvasPngCtx.shadowOffsetX = 0;
        canvasPngCtx.shadowOffsetY = 0;
        canvasPngCtx.shadowBlur = 30;
}
//----------------------------------------------------------------------------------------------------------
//Images
let pngArray = [];
for (let i = 1; i < 8 + 1; i++) {
    pngArray[i] = new Image();
    pngArray[i].src = "png/" + i + ".png";
}

document.getElementById("randPng").onclick = function () {
    //random number
    console.log(pngArray);

    let x = Math.floor(Math.random() * pngArray.length);

    xCoord = Math.floor(Math.random() * (1280 - pngArray[x].width));

    outlineCheck();

    canvasPngCtx.drawImage(pngArray[x], xCoord, (720 - pngArray[x].height));
    canvasCtx.drawImage(canvasPng, 0, 0);
    console.log("debug: png rendered at x:" + xCoord.value);
}
//----------------------------------------------------------
//Range methods(just ignore)
function handleInputChange(e) {
    let target = e.target
    if (e.target.type !== 'range') {
        target = document.getElementById('range')
    }
    const min = target.min
    const max = target.max
    const val = target.value

    target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
}
rangeInputs.forEach(input => {
    input.addEventListener('input', handleInputChange)
})

