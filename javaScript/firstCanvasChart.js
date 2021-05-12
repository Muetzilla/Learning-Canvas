let myCanvas = document.getElementById("barChart");
//Size of the Canvas area
const widthCanvas = 1500;
const heightCanvas = 650;
const skalaRange = 100;
myCanvas.width = widthCanvas;
myCanvas.height = heightCanvas; 
var ctx = myCanvas.getContext("2d");
var violetBar = document.getElementById('myRange1').value;
var blueBar = document.getElementById('myRange2').value;
var greenBar = document.getElementById('myRange3').value;
var orangeBar = document.getElementById('myRange4').value;
var isLegendDrawn = false;

//The bars
var myVinyls = {
    "Bar 1": violetBar,
    "Bar 2": blueBar,
    "Bar 3": greenBar,
    "Bar 4": orangeBar,
    "Bar 5": 10,
    "Bar 6": 10,
    "Bar 7": 70
};
//Draw one grid line
function drawLine(ctx, startX, startY, endX, endY,color){
  ctx.save();
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(startX,startY);
  ctx.lineTo(endX,endY);
  ctx.stroke();
  ctx.restore();
}
//Draw one bar
function drawBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height,color){
  ctx.save();
  ctx.fillStyle=color;
  ctx.fillRect(upperLeftCornerX,upperLeftCornerY,width,height);
  ctx.restore();
}
//Get the userinputs
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
      var maxValue = skalaRange;
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
          this.ctx.font = "bold 25px Serif";
          this.ctx.fillText(gridValue, 10,gridY - 2);
          this.ctx.restore();

          gridValue+=this.options.gridScale;
      }

      //drawing the bars
      //with mipnWidthOneBar = 1125 the width by 9 Bars is 125px. Just change die value to get an other min width.
      var minWidthOneBar = 1125;
      var barIndex = 0;
      var numberOfBars = Object.keys(this.options.data).length;
      var barSize = (canvasActualWidth)/numberOfBars;
      var barWidth = Math.round(minWidthOneBar / numberOfBars);

      for (categ in this.options.data){
          var val = this.options.data[categ];
          var barHeight = Math.round(canvasActualHeight * val/maxValue) ;
          drawBar(
              this.ctx,
              this.options.padding + barIndex * barSize ,
              this.canvas.height - barHeight - this.options.padding,
              barWidth,
              barHeight,
              this.colors[barIndex%this.colors.length]
          );
          console.log(barWidth);

          barIndex++;
      }
      //drawing series name 
      this.ctx.save();
      this.ctx.textBaseline="bottom";
      this.ctx.textAlign="center";
      this.ctx.fillStyle = "#0000000";
      this.ctx.font = "bold 17px Serif";
      this.ctx.fillText(this.options.seriesName, this.canvas.width/2,this.canvas.height);
      this.ctx.restore();   

       //draw legend
       if(!isLegendDrawn){
        barIndex = 0;
        var legend = document.querySelector("legend[for='barChart']");
        var ul = document.createElement("ul");
        legend.append(ul); 
        for (categ in this.options.data){
            var li = document.createElement("li");
            li.style.listStyle = "none";
            li.style.borderLeft = "20px solid "+this.colors[barIndex%this.colors.length];
            li.style.padding = "5px";
            li.style.fontFamily = "Frutiger Light, serif";
            li.textContent = categ + "   | " + " Value: TODO";
            ul.append(li);
            barIndex++;
        }
        isLegendDrawn = true;
      }
  }
}
//Create a new barchart
function newBarchart(){
  //Clear the existing canvas
  ctx.clearRect(0, 0, widthCanvas, heightCanvas);
  //Get the userinputs again
  getInputs();
  var myVinyls = {
    "Bar 1": violetBar,
    "Bar 2": blueBar,
    "Bar 3": greenBar,
    "Bar 4": orangeBar,
    "Bar 5": 10,
    "Bar 6": 25,
    "Bar 7": 45,
    "Bar 8": 69,
    "Bar 9": 85,
  };
  //Create a new instanz of Barchart
  var myBarchart = new Barchart(
    {
        canvas:myCanvas,
        seriesName:"Bars",
        padding:75,
        gridScale:5,
        gridColor:"#bebebebe",
        data:myVinyls,
        colors:["#FF0000", "#00FF00","#0000FF", "#ABABAB","#123ABC", "#0FED1C", "#ABCDEF", "#781182", "#763623"]
    }
  );
  //draw your instanz of Barchart
  myBarchart.draw();
}


