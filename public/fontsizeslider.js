document.getElementById("fontSlider").oninput = function() {
    var value = (this.value-this.min)/(this.max-this.min)*100
    this.style.background = 'linear-gradient(to right, #82CFD0 0%, #82CFD0 ' + value + '%, #fff ' + value + '%, white 100%)'
    var fontSize = this.value;
    document.getElementById("text").style.fontSize = fontSize + "px";
  };
  