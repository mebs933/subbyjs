// Select the slider and the captions elements
const fontSizeSlider = document.querySelector('.slider');
const captions = document.querySelector('.captions');

// Add an event listener for when the slider value changes
fontSizeSlider.addEventListener('input', function() {
  // Get the current value of the slider
  let fontSize = fontSizeSlider.value;
  // Update the font size of the captions using the slider's value
  captions.style.fontSize = fontSize + 'rem';
});