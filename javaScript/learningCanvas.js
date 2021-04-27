document.addEventListener('DOMContentLoaded',domloaded,false);
function draw() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
      var ctx = canvas.getContext('2d');
    }
  }
  function drawRectangles(){
    var canvasRectangles = document.getElementById('canvasRectagles');
    if (canvasRectangles.getContext) {
        var canvasRec = canvasRectangles.getContext('2d');

        canvasRec.fillStyle = 'rgb(200, 0, 0)';
        canvasRec.fillRect(10, 10, 50, 50);

        canvasRec.fillStyle = 'rgba(0, 0, 200, 0.5)';
        canvasRec.fillRect(30, 30, 50, 50);    
      }
  }
  function drawRectangularShape() {
    var rectangularShape = document.getElementById('rectangularShape');
    if (rectangularShape.getContext) {
      var rectShape = rectangularShape.getContext('2d');
      //Diese Fläche wird eingefärbt
      rectShape.fillRect(25, 25, 100, 100);
      //Diese Fläche wird wieder transpartent gemacht
      rectShape.clearRect(45, 45, 60, 60);
      //Zeichnet ein Rechteck mit transpartenter Fläche aber sichtabren Rändern
      rectShape.strokeRect(50, 50, 50, 50);
    }
  }
  function drawTriangle() {
    var canvasTriangle = document.getElementById('triangle');
    if (canvasTriangle.getContext) {
      var triangle = canvasTriangle.getContext('2d');
      
      //Programm soll mit dem Zeichnen der einzelnen Liniene beginnen.
      triangle.beginPath();
      //Zeichnen der einzelnen Linien
      triangle.moveTo(75, 50);
      triangle.lineTo(100, 75);
      triangle.lineTo(100, 25);
      //Ausfüllen des Bereiches zwischen den Linien
      triangle.fill();
    }
  }
  function drawTwoTriangles() {
    var canvasTwoTrinagels = document.getElementById('twoTriangles');
    if(canvasTwoTrinagels.getContext){
      var twoTringales= canvasTwoTrinagels.getContext('2d');
  
      // Filled triangle
      twoTringales.beginPath();
      //Wird bei einer gewissen Position begonnen
      twoTringales.moveTo(25, 25);
      twoTringales.lineTo(105, 25);
      twoTringales.lineTo(25, 105);
      twoTringales.fill();
      //Neue dFigur kann nach .fill einfach begonnen werden
      // Stroked triangle
      twoTringales.beginPath();
      twoTringales.moveTo(125, 125);
      twoTringales.lineTo(125, 45);
      twoTringales.lineTo(45, 125);
      twoTringales.closePath();
      twoTringales.stroke();
    }
  }
  function drawCircles() {
    var canvasCircles = document.getElementById('circles');
    if (canvasCircles.getContext) {
      var circle = canvasCircles.getContext('2d');
  
      for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 3; j++) {
          circle.beginPath();
          var x = 25 + j * 50; // x coordinate
          var y = 25 + i * 50; // y coordinate
          var radius = 20; // Arc radius
          var startAngle = 0; // Starting point on circle
          var endAngle = Math.PI + (Math.PI * j) / 2; // End point on circle
          var counterclockwise = i % 2 !== 0; // clockwise or counterclockwise
  
          circle.arc(x, y, radius, startAngle, endAngle, counterclockwise);
  
          if (i > 1) {
            circle.fill();
          } else {
            circle.stroke();
          }
        }
      }
    }
  }
  function drawCurves() {
    var canvasCurves = document.getElementById('curves');
    if (canvasCurves.getContext) {
      var curves = canvasCurves.getContext('2d');
  
      // Quadratric curves example
      curves.beginPath();
      curves.moveTo(75, 25);
      curves.quadraticCurveTo(25, 25, 25, 62.5);
      curves.quadraticCurveTo(25, 100, 50, 100);
      curves.quadraticCurveTo(50, 120, 30, 125);
      curves.quadraticCurveTo(60, 120, 65, 100);
      curves.quadraticCurveTo(125, 100, 125, 62.5);
      curves.quadraticCurveTo(125, 25, 75, 25);
      curves.stroke();
    }
  }
  //Kreis und Rechteck werden als Objekt des Types Path2D gespeichert und sind somit wiederverwendbar
  function drawPath2D() {
    var canvasPath2D = document.getElementById('path2D');
    if (canvasPath2D.getContext) {
      var path2D = canvasPath2D.getContext('2d');
  
      var rectangle = new Path2D();
      rectangle.rect(10, 10, 50, 50);
  
      var circle = new Path2D();
      circle.arc(100, 35, 25, 0, 2 * Math.PI);
  
      path2D.stroke(rectangle);
      path2D.fill(circle);
    }
  }
  