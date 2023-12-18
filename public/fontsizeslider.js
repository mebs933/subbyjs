const fontSizeSlider = document.getElementById("fontSlider");
const displayText = document.getElementById("text");

fontSizeSlider.addEventListener("input", () => {
  const fontSize = fontSizeSlider.value;
  displayText.style.fontSize = `${fontSize}px`;
});
