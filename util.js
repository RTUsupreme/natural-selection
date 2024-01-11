function create2DArray(height, width){
    var array = new Array(height);
    for(var i = 0; i < array.length; i++){
        array[i] = new Array(width);
    }
    return array;
}

function createArray(size){
    var array = new Array(size);
    return array;
}

function createCanvas(height, width){
    var canvas = document.createElement("canvas");
    canvas.id = "canvas";
    canvas.width = width;
    canvas.height = height;
    canvas.style = "border: 1px solid black";
    return canvas;
}