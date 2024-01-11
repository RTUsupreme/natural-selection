var canvas = createCanvas(800, 800);
document.getElementsByTagName("body")[0].appendChild(canvas);
var context = canvas.getContext("2d");
const xOff = canvas.width / 2;
const yOff = canvas.height / 2
context.translate(xOff, yOff);

var NUM_ORGS = 2;
var NUM_FOOD = 150;
var SIM_SPEED = 100;

var foods = new Array(0);

function refresh(){
    context.clearRect(-xOff, -yOff, canvas.width, canvas.height);
}

function generateOrganisms(){
    var organisms = new Array(NUM_ORGS);
    var xPos, yPos, angle, angleoffset, speed;

    for(var i = 0; i < organisms.length; i++){
        xPos = Math.round(Math.random() * (xOff - -xOff) + -xOff);
        yPos = Math.round(Math.random() * (yOff - -yOff) + -yOff);

        angle = Math.random() * 361;
        angleoffset = Math.random() * 2;
        speed = (Math.random() * 5) + 2;
        
        organisms[i] = new Organism(xPos, yPos, angle, 5, speed, 30, angleoffset, 10, 1);
    }

    return organisms;
}

function generateFood(){
    var xPos, yPos;
    for(var i = 0; i < NUM_FOOD; i++){
        xPos = Math.round(Math.random() * (xOff - -xOff) + -xOff);
        yPos = Math.round(Math.random() * (yOff - -yOff) + -yOff);
        foods.push(new Food(xPos, yPos, 5));
    }
}

function regenFood(){
    var regenAmt = (Math.random() * FOOD_REGEN - 2) + 2
    for(var i = 0; i < regenAmt; i++){
        xPos = Math.round(Math.random() * (xOff - -xOff) + -xOff);
        yPos = Math.round(Math.random() * (yOff - -yOff) + -yOff);
        foods.push(new Food(xPos, yPos, 5));
    }
}

function renderOrganisms(organisms){
    for(var i = 0; i < organisms.length; i++){
        organisms[i].draw();
    }
}

function renderFood(){
    for(var i = 0; i < foods.length; i++){
        foods[i].draw();
    }
}

function updateOrganisms(organisms, foods){
    var angle, speed, angleoffset, viewDist, splitCeiling;
    var pos, xf, yf;
    var size;
    for(var i = 0; i < organisms.length; i++){
        if(organisms[i].getSize() >= organisms[i].getSplitCeiling()){
            size = organisms[i].getSize();
            //mutations

            //default birth angle
            angle = Math.random() * 361;
            
            //setting birth position
            pos = organisms[i].getPos();
            xf = (Math.random() * size - -size) + -size;
            yf = (Math.random() * size - -size) + -size;

            //setting new speed
            speed = organisms[i].getSpeed() + (Math.random() * (0.5 - -0.5) + -0.5);

            //setting change in look direction frequency
            angleoffset = Math.random() * 2;
            
            //setting parent size to half
            organisms[i].setSize(size / 2);

            //setting birth view distance
            viewDist = (Math.random() * (0.5 - -0.5) + -0.5);

            //setting number to reproduce at
            splitCeiling = organisms[i].getSplitCeiling() + (Math.random() * (0.5 - -0.5) + -0.5);

            organisms.push(new Organism(pos.x + xf, pos.y + yf, angle, 5, speed, organisms[i].getViewDistance() + viewDist, angleoffset, splitCeiling, organisms[i].getGen() + 1));
            console.log('Num Orgs: ' + organisms.length + ' @ ' + Date.now());
        }
        organisms[i].update(organisms, foods, i);
        organisms[i].checkForFood(foods);
    }
}

function drawAxis(){
    context.beginPath();
    context.moveTo(0, yOff);
    context.lineTo(0, -yOff);
    context.stroke();
     
    context.beginPath();
    context.moveTo(xOff, 0);
    context.lineTo(-xOff, 0);
    context.stroke();
}

function collectData(orgs, data){
    var avgSpeed = 0, avgView = 0;
    for(var i = 0; i < orgs.length; i++){
        avgSpeed += orgs[i].getSpeed();
        avgView += orgs[i].getViewDistance();
    }

    avgSpeed = avgSpeed / orgs.length;
    avgView = avgView / orgs.length;

    data[0].push(orgs.length * 10);
    data[1].push(foods.length * 10);
}

function gameLoop(){
    //var g = new Graph(600, 600);
    var orgs = generateOrganisms();
    var xPos, yPos;
    generateFood();
    
    drawAxis();
    renderFood();
    renderOrganisms(orgs);    

    var data = [
        [],
        []
    ];

    setInterval(function(){
        if(Math.floor(Math.random() * 10) == 5 ){//|| Math.floor(Math.random() * 10) == 6){
            xPos = Math.round(Math.random() * (xOff - -xOff) + -xOff);
            yPos = Math.round(Math.random() * (yOff - -yOff) + -yOff);
            foods.push(new Food(xPos, yPos, 5));
        }
        collectData(orgs, data);
        //g.graph(data);

        refresh();
        drawAxis();
        renderOrganisms(orgs);
        renderFood();
        updateOrganisms(orgs, foods);
    }, 25);

/*
    context.beginPath();
    context.moveTo(canvas.width / 2, 0);
    context.lineTo(canvas.width / 2, canvas.height);
    context.stroke();
     

    context.beginPath();
    context.moveTo(0, canvas.height / 2);
    context.lineTo(canvas.width, canvas.height / 2);
    context.stroke();
     
    */
}

gameLoop();

window.onkeypress = function(e){
	//spacebar to pause
	if(e.which == 32){
		alert("Paused");
	}
}