document.addEventListener("DOMContentLoaded", function() {
  var slider = document.getElementById("fontSlider");
  slider.oninput = function() {
    var fontSize = this.value;
    document.getElementById("text").style.fontSize = fontSize + "px";
  };
});
