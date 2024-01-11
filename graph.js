function Graph(w, h){
    this.width = w;
    this.height = h;
    
    var offset = 30;
    var width = w;
    var height = h;

    //creating canvas for graph
    var canvas = createCanvas(h, w);
    document.getElementsByTagName('body')[0].appendChild(canvas);
    var g = canvas.getContext("2d");

    //adjusting canvas origin
    g.translate(offset, this.height - offset);

    //PUBLIC memeber functions ------
    Graph.prototype.graph = function(data){
        refresh();
        renderAxis();
        //drawIntervals(data[0].length - 1);
        plot(data);
    }

    //PRIVATE memeber functions -----
    function line(x1, y1, x2, y2){
        g.beginPath();
        g.moveTo(x1, y1);
        g.lineTo(x2, y2);
        g.stroke();
    }

    function renderAxis(){
        line(0, 0, width - offset, 0);
        line(0, 0, 0, -height - offset);
    }

    function calcIntervals(time){
        if(time == 0){
            return 0;
        }else if(time == 1){
            return width - offset;
        }else{
            return ((width - offset) / (time));
        }
    }

    function drawIntervals(time){
        var intervalDist = calcIntervals(time);
        for(var i = 0; i <= time; i++){
            g.beginPath();
            g.arc(i * intervalDist, 0, 2, 0, 2 * Math.PI);
            g.fill();
           // g.fillText(i, i * intervalDist, 10);
        }
    }

    function plot(data){
        var intervalDist = calcIntervals(data[0].length - 1);
        for(var i = 0; i < data.length; i++){
            for(var j = 0; j < data[i].length; j++){ 
                /*g.beginPath();
                g.arc(j * intervalDist, -data[i][j], 2, 0, 2 * Math.PI);
                g.fill();
*/
                line(j * intervalDist, - data[i][j], (j + 1) * intervalDist, -data[i][j + 1]);
            }
        }
    }

    function refresh(){
        g.clearRect(-offset, -height + offset, width, height);
    }
}

//ability to add data set to data set private variable
 // data set would be a 2d array, addition would be adding a new array


/*
   Graph.prototype.resize = function(w, h){
        this.width = w;
        this.height = h; 

        //need to remove and re-add canvas element in html
        //probably would be a good idea to give the canvas a unique id
        //when created so make this easier
    }

    

this.width = width;
this.height = height;
this.offset = 30;
this.canvas = createCanvas(height, width);
document.getElementsByTagName("body")[0].appendChild(this.canvas);
this.graph = canvas.getContext("2d");

//changing 0,0 position to be more logical
this.graph.translate(this.offset, this.height - this.offset);

this.drawAxis = function(){
    this.graph.beginPath();
    line(0, -this.height - this.offset, 0, this.offset)
    this.graph.stroke();
};

this.setAxisOffset = function(newOffset){
    this.offset = newOffset;
};

function line(x1, y1, x2, y2){
    this.graph.beginPath();
    this.graph.moveTo(x1, y1);
    this.graph.lineTo(x2, y2);
    this.graph.stroke();
};

this.clearGraph = function(){
    this.graph.clearRect(0 - this.offset, -this.height + this.offset, this.width, this.height);
};

this.renderGraph = function(){

};
*/


/*
sample runner
var data = [
        [],
        []        
];

var graph = new Graph(500, 400);
setInterval(function(){
    for(var i = 0; i < data.length; i++){
        data[i].push((Math.random() * 100) + 10);
    }
    graph.graph(data);
}, 1000);


*/