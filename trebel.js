var notes = [], randms = [1000];
var A2 = document.getElementById("A2");var D2 = document.getElementById("D2");
var A3 = document.getElementById("A3");var D3 = document.getElementById("D3");
var A4 = document.getElementById("A4");var D4 = document.getElementById("D4");
var B3 = document.getElementById("B3");var E2 = document.getElementById("E2");
var B4 = document.getElementById("B4");var E3 = document.getElementById("E3");
var C2 = document.getElementById("C2");var F2 = document.getElementById("F2");
var C3 = document.getElementById("C3");var F3 = document.getElementById("F3");
var C4 = document.getElementById("C4");var F4 = document.getElementById("F4");
var C5 = document.getElementById("C5");var G2 = document.getElementById("G2");
var C6 = document.getElementById("C6");var G3 = document.getElementById("G3");
var G4 = document.getElementById("G4");var G5 = document.getElementById("G5");
var A5 = document.getElementById("A5");var B5 = document.getElementById("B5");
var B2 = document.getElementById("B2");var D5 = document.getElementById("D5");
var E4 = document.getElementById("E4");var E5 = document.getElementById("E5");
var F5 = document.getElementById("F5");
var notenum, count, keyHit, go, noteY, currentNote, canvas, canvasContext, rateMove, cleff, stallCount;
var theImg = document.getElementById("note");
var trebelImg = document.getElementById("trebel");
var bassImg = document.getElementById("bass");
document.addEventListener('keydown',function(event){keyHit = event.keyCode;})

function show(hide, show){
    hide.style.display = "none";
    show.style.display = "inline-block"
}

function begin(wantedCleff){
    restart();
    initialize();
    cleff = wantedCleff;
    go = setInterval(move, rateMove);
    canvas.style.display = "inline-block";
}

function initialize(){
    randms[0] = 5;
    notes[0] = new Note;
    notenum = 0;
    rateMove = 4;
    count = 0;
    noteY = 0;
    currentNote = 0;
    stallCount = 1;
    for (var i = 1; i < 1001 ; i++){
        var c1, tr1, tr0;
        do {
            c1 = (Math.floor(Math.random()*17)-4)*0.5;
            tr1 = translate(c1);
            tr0 = translate(randms[i-1]);
        }while (tr1 == tr0);
        randms[i]= c1;
    }
}

function restart(){
    for (var i = notenum; i <= currentNote ; i++){
        delete notes[i];
        currentNote++;
    }
}


function randNum(){
    noteY++;
    return randms[noteY];
}

function findSound(num){
    if (cleff == trebel){
        if (num == -2){return C6;}else if(num == 1.5){return C5;}
        else if(num == 5){return C4;}else if(num == -1.5){return B5;}
        else if(num == 2){return B4;}else if(num == 5.5){return B3;}
        else if(num == -1){return A5;}else if(num == 2.5){return A4;}
        else if(num == 6){return A3;}else if(num == -0.5){return G5;}
        else if(num == 3){return G4;}else if(num == 0){return F5;}
        else if(num == 3.5){return F4;}else if(num == 0.5){return E5;}
        else if(num == 4){return E4;}else if(num == 1){return D5;}
        else{return D4;}
    }else{
        if (num == -2){return C2;}else if(num == 1.5){return E3;}
        else if(num == 5){return E2;}else if(num == -1.5){return D4;}
        else if(num == 2){return D3;}else if(num == 5.5){return D2;}
        else if(num == -1){return C4;}else if(num == 2.5){return C3;}
        else if(num == 6){return A3;}else if(num == -0.5){return B3;}
        else if(num == 3){return B2;}else if(num == 0){return A3;}
        else if(num == 3.5){return A2;}else if(num == 0.5){return G3;}
        else if(num == 4){return G2;}else if(num == 1){return F3;}
        else{return F2;}
    }

}

function translate(nte){
    if (cleff == trebel){
        if ((nte == -2) ||(nte == 1.5) ||(nte == 5)){return 67;} 
        else if((nte == -1.5) ||(nte == 2) ||(nte == 5.5)){return 66;}
        else if((nte == -1) ||(nte == 2.5) ||(nte == 6)){return 65;}
        else if((nte == -0.5) ||(nte == 3)){return 71;}
        else if((nte == 0) ||(nte == 3.5)){return 70;}
        else if((nte == 0.5) ||(nte == 4)){return 69;}
        else{return 68;}
    }else{
        if ((nte == -2) ||(nte == 1.5) ||(nte == 5)){return 69;} 
        else if((nte == -1.5) ||(nte == 2) ||(nte == 5.5)){return 68;}
        else if((nte == -1) ||(nte == 2.5) ||(nte == 6)){return 67;}
        else if((nte == -0.5) ||(nte == 3)){return 66;}
        else if((nte == 0) ||(nte == 3.5)){return 65;}
        else if((nte == 0.5) ||(nte == 4)){return 71;}
        else{return 70;}
    }

}

function Note(){
    this.y = randNum();
    this.x = 0;
    this.rate = 0.2;
    this.size = 40;
    this.check = false;
    this.sound = findSound(this.y);
    this.is = translate(this.y);
 }

 function stall(){
     if (stallCount%2 ==0){
        clearInterval(go);
        stallCount++
    }else{
        go;
        stallCount++;
    }
 }

function end(one, two){
    clearInterval(go);
    show(one, two);
    restart();
    canvas.style.display = "none";
}
window.onload = function(){
    canvas = document.getElementById('gamecanvas');
    canvasContext = canvas.getContext('2d');	
}

    
function move(){
    if (count % 300 == 0){
        notenum++;
        notes[notenum] = new Note;
    }
    drawScreen();
    count++;
}

function moveThings(aNote){
    aNote.x += aNote.rate;
    var noteMove = gamecanvas.width-(aNote.x + aNote.rate);
    var noteAgain = 88.0 + aNote.y*20.0 - (aNote.size/2.0);
    canvasContext.fillStyle = 'black';
    if (aNote.y == 5){                
        canvasContext.fillRect(noteMove+7, 200, 25, 1);
    }else if (aNote.y == 6){
        canvasContext.fillRect(noteMove+7, 200, 25, 1);
        canvasContext.fillRect(noteMove+7, 220, 25, 1);
    }else if (aNote.y == 5.5){
        canvasContext.fillRect(noteMove+7, 200, 25, 1);
        canvasContext.fillRect(noteMove+7, 220, 25, 1);
    }else if (aNote.y == -1){
        canvasContext.fillRect(noteMove+7, 80, 25, 1);
    }else if (aNote.y == -2){
        canvasContext.fillRect(noteMove+7, 80, 25, 1);
        canvasContext.fillRect(noteMove+7, 60, 25, 1);
    }else if (aNote.y == -1.5){
        canvasContext.fillRect(noteMove+7, 80, 25, 1);
        canvasContext.fillRect(noteMove+7, 60, 25, 1);
    }
    canvasContext.drawImage(theImg,noteMove,noteAgain, aNote.size, aNote.size);
    if (noteMove < 55.0){
        return true;
    }else{
        return false;
    }
}

function drawScreen(){	
    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(0,0,gamecanvas.width,gamecanvas.height);
    var line = 0;
    var start = 100;
    for (var i = currentNote; i <= notenum ; i++){
        if (moveThings(notes[i]) || notes[currentNote].is == keyHit){
            notes[i].sound.play();
            delete notes[i];
            currentNote++;
        }
    }
    if (cleff == trebel){
        canvasContext.drawImage(trebelImg, -33, 63, 143, 150);
    }else{
        canvasContext.drawImage(bassImg, 5, 100, 63, 63)
    }

    do{  
        canvasContext.fillStyle = 'black';
        canvasContext.fillRect(0, start, gamecanvas.width, 1);
        start += 20;
        line++;
    }while(line < 5);
    canvasContext.fillRect(0, 100, 1, 80);
    canvasContext.fillRect(gamecanvas.width-1, 100, 1, 80);
}
