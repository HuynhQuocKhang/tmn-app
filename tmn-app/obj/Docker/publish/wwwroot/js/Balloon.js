const balloonContainer = document.getElementById("balloon-container");

function random(num) {
    return Math.floor(Math.random() * num);
}

function getRandomStyles() {
    var r = random(255);
    var g = random(255);
    var b = random(255);
    var mt = random(150);
    var ml = random(120);
    var dur = random(5)+10;
    return `
  background-color: rgba(${r},${g},${b},0.8);
  color: rgba(${r},${g},${b},0.8); 
  box-shadow: inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.8);
  margin: ${mt}px 0 0 ${ml}px;
  animation: float ${dur}s ease-in forwards 
  `;
}

function createBalloons(num) {
    for (var i = num; i > 0; i--) {
        var balloon = document.createElement("div");
        balloon.className = "balloon";
        balloon.style.cssText = getRandomStyles();
        balloonContainer.append(balloon);
    }
}

function removeBalloons() {
    balloonContainer.style.opacity = 0;
        balloonContainer.remove()
}