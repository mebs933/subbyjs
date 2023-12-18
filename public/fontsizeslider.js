document.addEventListener("DOMContentLoaded", function() {
  var slider = document.getElementById("fontSlider");
  slider.oninput = function() {
    var fontSize = Number(this.value); // Parse the value as a number
    document.getElementById("text").style.fontSize = fontSize + "px";
  };
});
