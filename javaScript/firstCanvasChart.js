let myCanvas = document.getElementById("barChart");
const widthCanvas = 1200;
const heightCanvas = 600;
//const skalaHeight = 100;
myCanvas.width = widthCanvas;
myCanvas.height = heightCanvas; 
var ctx = myCanvas.getContext("2d");
var violetBar = document.getElementById('myRange1').value;
var blueBar = document.getElementById('myRange2').value;
var greenBar = document.getElementById('myRange3').value;
var orangeBar = document.getElementById('myRange4').value;
var myVinyls = {
  "Classical music": violetBar,
  "Alternative rock": blueBar,
  "Pop": greenBar,
  "Jazz": orangeBar,
    "Bar 1": 10,
    "Bar 2": 10,
    "Bar 3": 69
};

function drawLine(ctx, startX, startY, endX, endY,color){
  ctx.save();
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(startX,startY);
  ctx.lineTo(endX,endY);
  ctx.stroke();
  ctx.restore();
}
function drawBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height,color){
  ctx.save();
  ctx.fillStyle=color;
  ctx.fillRect(upperLeftCornerX,upperLeftCornerY,width,height);
  ctx.restore();
}
function getInputs(){
  violetBar = document.getElementById('myRange1').value;
  blueBar = document.getElementById('myRange2').value;
  greenBar = document.getElementById('myRange3').value;
  orangeBar = document.getElementById('myRange4').value;
}
var Barchart = function(options){
  this.options = options;
  this.canvas = options.canvas;
  this.ctx = this.canvas.getContext("2d");
  this.colors = options.colors;

  this.draw = function(){
      var maxValue = 100;
      for (var categ in this.options.data){
          maxValue = Math.max(maxValue,this.options.data[categ]);
      }
      var canvasActualHeight = this.canvas.height - this.options.padding * 2;
      var canvasActualWidth = this.canvas.width - this.options.padding * 2;

      //drawing the grid lines
      var gridValue = 0;
      while (gridValue <= maxValue){
          var gridY = canvasActualHeight * (1 - gridValue/maxValue) + this.options.padding;
          drawLine(
              this.ctx,
              0,
              gridY,
              this.canvas.width,
              gridY,
              this.options.gridColor
          );
           
          //writing grid markers
          this.ctx.save();
          this.ctx.fillStyle = this.options.gridColor;
          this.ctx.font = "bold 25px Arial";
          this.ctx.fillText(gridValue, 10,gridY - 2);
          this.ctx.restore();

          gridValue+=this.options.gridScale;
      }

      //drawing the bars
      var barIndex = 0;
      var numberOfBars = Object.keys(this.options.data).length;
      var barSize = (canvasActualWidth)/numberOfBars;

      for (categ in this.options.data){
          var val = this.options.data[categ];
          var barHeight = Math.round(canvasActualHeight * val/maxValue) ;
          drawBar(
              this.ctx,
              this.options.padding + barIndex * barSize ,
              this.canvas.height - barHeight - this.options.padding,
              barSize,
              barHeight,
              this.colors[barIndex%this.colors.length]
          );

          barIndex++;
      }
      //drawing series name
      this.ctx.save();
      this.ctx.textBaseline="bottom";
      this.ctx.textAlign="center";
      this.ctx.fillStyle = "#0000000";
      this.ctx.font = "bold 14px Arial";
      this.ctx.fillText(this.options.seriesName, this.canvas.width/2,this.canvas.height);
      this.ctx.restore();   
  }
}

function newBarchart(){
  ctx.clearRect(0, 0, widthCanvas, heightCanvas);
  getInputs();
  var myVinyls = {
    "Classical music": violetBar,
    "Alternative rock": blueBar,
    "Pop": greenBar,
    "Jazz": orangeBar,
    "Bar 1": 10,
    "Bar 2": 10,
    "Bar 3": 69
   //"Bar 4": 95

  };
  var myBarchart = new Barchart(
    {
        canvas:myCanvas,
        seriesName:"Bar Chart",
        padding:75,
        gridScale:5,
        gridColor:"#bebebebe",
        data:myVinyls,
        colors:["#FF0000", "#00FF00","#0000FF", "#ABABAB","#123ABC", "#0FED1C", "#ABCDEF", "#781182", "#763623"]
    }
  );
  myBarchart.draw();
}

