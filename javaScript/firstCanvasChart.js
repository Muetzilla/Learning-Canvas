var myCanvas = document.getElementById("barChart");
myCanvas.width = 300;
myCanvas.height = 300;
  
var ctx = myCanvas.getContext("2d");
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
var music1 = document.getElementById('myRange1').value;
var music2 = document.getElementById('myRange2').value;
var music3 = document.getElementById('myRange3').value;
var music4 = document.getElementById('myRange4').value;

function getInputs(){
  music1 = document.getElementById('myRange1').value;
  music2 = document.getElementById('myRange2').value;
  music3 = document.getElementById('myRange3').value;
  music4 = document.getElementById('myRange4').value;

  //console.log(music1);
}

var myVinyls = {
  "Classical music": music1,
  "Alternative rock": music2,
  "Pop": music3,
  "Jazz": music4
};
var Barchart = function(options){
  this.options = options;
  this.canvas = options.canvas;
  this.ctx = this.canvas.getContext("2d");
  this.colors = options.colors;

  this.draw = function(){
      var maxValue = 0;
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
          this.ctx.font = "bold 10px Arial";
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
          var barHeight = Math.round( canvasActualHeight * val/maxValue) ;
          drawBar(
              this.ctx,
              this.options.padding + barIndex * barSize,
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
      this.ctx.fillStyle = "#000000";
      this.ctx.font = "bold 14px Arial";
      this.ctx.fillText(this.options.seriesName, this.canvas.width/2,this.canvas.height);
      this.ctx.restore();   

  }
}

function newBarchart(){
  console.log("OY");
  var clear = document.getElementById("barChartDiv");
  ctx.clearRect(0, 0, 300, 300);
  getInputs();
  var myVinyls = {
    "Classical music": music1,
    "Alternative rock": music2,
    "Pop": music3,
    "Jazz": music4
  };
  var myBarchart = new Barchart(
    {
        canvas:myCanvas,
        seriesName:"Bar Chart",
        padding:20,
        gridScale:5,
        gridColor:"#eeeeee",
        data:myVinyls,
        colors:["#a55ca5","#67b6c7", "#bccd7a","#eb9743"]
    }
  );
  myBarchart.draw();
}

