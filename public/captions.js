// captions.js
import transcriptStorage from './transcriptstorage.js';

const captions = document.getElementById("captions");
const text = document.getElementById("text");

// Flag to indicate if transcription has started
let transcriptionStarted = false;

// Function to update the UI with the new transcript
function updateCaptions(newTranscript) {
  // If transcription has not started, clear the placeholder text
  if (!transcriptionStarted) {
    text.innerHTML = "";
    transcriptionStarted = true;
  }

  // Append the new transcript to the previous text
  text.innerHTML += `<span>${newTranscript}</span>`;

  // Scroll to the bottom of the captions element
  captions.scrollTop = captions.scrollHeight;
}

// Register the updateCaptions function as a listener for new transcript lines
transcriptStorage.onNewTranscript(updateCaptions);