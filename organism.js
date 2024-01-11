/**
 * 
 *
 *   
*/
function Organism(xPos, yPos, angle, radius, speed, viewDistance, angleOffset, splitCeiling, gen){
    //position and movement
    this.xPos = xPos;
    this.yPos = yPos;
    this.directionAngle = angle;
    this.dx = 0 - Math.cos(angle)*1;
    this.dy = 0 - Math.sin(angle)*1;
    this.generation = gen;
    this.size = radius;

    //mutatable variables
    this.angleOffset = angleOffset;
    this.speed = speed;
    this.viewDistance = radius + viewDistance;
    this.sizeLossRate = 0.02;
    this.splitCeiling = splitCeiling;
    
    if(this.viewDistance < 0){
        this.viewDistance = 1;
    }

    //color (based on other attributes)
    this.r = this.speed * 30;
    this.g = this.angleOffset * 20;
    this.b = this.splitCeiling * 10;

    //getters
    this.getPos = function(){
        return{
            x: this.xPos,
            y: this.yPos
        }
    };

    this.getDirection = function(){
        return{
            x: this.dx,
            y: this.dy
        }
    };

    this.getDirectionAngle = function(){
        return this.directionAngle;
    };

    this.getFoodLossRate = function(){
        return this.foodLossRate;
    };

    this.getSize = function(){
        return this.size;
    };

    this.getViewDistance = function(){
        return this.viewDistance;
    };

    this.getSplitCeiling = function(){
        return this.splitCeiling;
    };

    this.getGen = function(){
        return this.generation;
    };

    this.getSpeed = function(){
        return this.speed;
    };

    //setters
    this.setPos = function(newX, newY){
        this.xPos = newX;
        this.yPos = newY;    
    };

    this.setDirectionAngle = function(newAngle){
        this.directionAngle = newAngle;
        var x = Math.cos(newAngle)*1;
        var y = Math.sin(newAngle)*1;

        this.dx = x;
        this.dy = y;
    };

    this.setFoodLossRate = function(rate){
        this.foodLossRate = rate;
    };

    this.setSize = function(newSizeRadius){
        this.size = newSizeRadius;
    };

    this.setViewDistance = function(newDist){
        this.viewDistance = this.radius + newDist;
    };

    this.setSplitCeiling = function(newCeil){
        this.splitCeiling = newCeil;
    };

    this.addGen = function(){
        this.generation++;
    };

    this.draw = function(){
        context.fillStyle = 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
        context.beginPath();
        context.arc(this.xPos, this.yPos, this.size, 0, 2 * Math.PI);
        context.fill();
        
        /*
        context.beginPath();
        context.arc(this.xPos, this.yPos, this.viewDistance, 0, 2 * Math.PI);
        context.stroke();
        */
        
        context.font = '12px Verdana';
        context.fillText(this.generation, this.xPos + 15, this.yPos - 15);
        context.fillText(Math.floor(this.size * 100) / 100, this.xPos + 15, this.yPos - 3);
        context.fillText(Math.floor(this.splitCeiling * 100) / 100, this.xPos + 15, this.yPos - -9);
        /*
        context.fillText(this.xPos, this.xPos + 15, this.yPos - 15);
        context.fillText(this.yPos, this.xPos + 15, this.yPos - 3);
        context.fillText(this.directionAngle, this.xPos + 15, this.yPos + 9);
        */
        context.beginPath();
        context.moveTo(this.xPos, this.yPos);
        context.lineTo(this.xPos + (this.dx * 38), this.yPos + (this.dy * 38));
        context.stroke();
         
    
    };

    this.update = function(orgs, foods, index){
        this.xPos += this.dx * this.speed;
        this.yPos += this.dy * this.speed;

        this.size -= this.sizeLossRate;
        if(this.size <= 3){
            var pos = this.getPos();
            orgs.splice(index, 1);
            foods.push(new Food(pos.x, pos.y, 5));
        }
        
        //Allows for random direction changes
        var angleOffset = Math.random() * (this.angleOffset - -this.angleOffset) + -this.angleOffset;
        this.setDirectionAngle(this.directionAngle + angleOffset);
        
        /*
        if(this.xPos > canvas.width / 2 || this.xPos < -(canvas.width / 2) || this.yPos > canvas.height / 2 || this.yPos < -(canvas.height / 2)){
            var xPos = Math.round(Math.random() * (xOff - -xOff) + -xOff);
            var yPos = Math.round(Math.random() * (yOff - -yOff) + -yOff);
            this.setPos(xPos, yPos);
        }
*/

        if(this.xPos > canvas.width / 2){
            this.setPos(-canvas.width / 2, this.yPos);
        }else if(this.xPos < -canvas.width / 2){
            this.setPos(canvas.width / 2, this.yPos);
        }else if(this.yPos > canvas.height / 2){
            this.setPos(this.xPos, -canvas.height / 2);
        }else if(this.yPos < -canvas.height / 2){
            this.setPos(this.xPos, canvas.height / 2);
        }

    };

    this.findAngle = function(P2){
        var P1 = this.getPos();
        var P3 = {
            x: P1.x + 10, 
            y: P1.y
        };

        var D1 = Math.sqrt(Math.pow(P1.x - P2.x, 2) + Math.pow(P1.y - P2.y, 2));
        var D2 = Math.sqrt(Math.pow(P1.x - P3.x, 2) + Math.pow(P1.y - P3.y, 2));
        var D3 = Math.sqrt(Math.pow(P2.x - P3.x, 2) + Math.pow(P2.y - P3.y, 2));

        var val = (Math.pow(D1, 2) + Math.pow(D2, 2) - Math.pow(D3, 2)) / (2 * D1 * D2);
        var angle = Math.acos(val);

        return angle;
    }

    this.checkForFood = function(foods){
        var distance, foodPos, angle;
        var shortestDistance;
        var shortestIndex = 0;

        //determines the shortest distance
        if(foods.length > 1){
            foodPos = foods[0].getPos();
        }else{
            foodPos = {
                x: 0,
                y: 0
            };
        }
        
        shortestDistance = Math.sqrt(Math.pow(foodPos.x - this.xPos, 2) + Math.pow(foodPos.y - this.yPos, 2));
        for(var i = 0; i < foods.length; i++){
            foodPos = foods[i].getPos();
            distance = Math.sqrt(Math.pow(foodPos.x - this.xPos, 2) + Math.pow(foodPos.y - this.yPos, 2));

            if(distance < shortestDistance){
                //alert("in");
                shortestDistance = distance;
                shortestIndex = i;
                //alert(shortestIndex);
            }
            //alert(shortestIndex);
        }
        
        //determining angle
        if(foods.length > 1){
            if(shortestDistance <= foods[shortestIndex].getSize() + this.getViewDistance()){
                angle = this.findAngle(foods[shortestIndex].getPos());
                foodPos = foods[shortestIndex].getPos();
                if(this.yPos > foodPos.y){
                    this.setDirectionAngle(-angle);
                }else{
                    this.setDirectionAngle(angle);
                }
            }  
        }       

        //attempting to find collision
        if(foods.length > 1){
            if(shortestDistance <= foods[shortestIndex].getSize() + this.size){
                this.setSize(this.getSize() + 1);
                foods.splice(shortestIndex, 1);
            } 
        }
         
    }
};