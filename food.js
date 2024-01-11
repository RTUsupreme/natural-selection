function Food(xPos, yPos, radius){
    this.xPos = xPos;
    this.yPos = yPos;
    this.size = radius;

    this.getPos = function(){
        return{
            x: this.xPos,
            y: this.yPos
        }
    };

    this.getSize = function(){
        return this.size;
    };

    this.setPos = function(x, y){
        this.xPos = x;
        this.yPos = y;
    };

    this.draw = function(){
        context.fillStyle = 'purple';
        context.beginPath();
        context.arc(this.xPos, this.yPos, this.size, 0, 2 * Math.PI);
        context.fill();
         
    };
};