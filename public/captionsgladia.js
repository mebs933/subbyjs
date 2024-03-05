//captionsgladia.js
import transcriptStorage from './transcriptstoragegladia.js';

const captionsElement = document.getElementById("captionsgladia");
const textElement = document.getElementById("textgladia");

// Flag to indicate if transcription has started
let transcriptionStartedGladia = false;

transcriptStorage.onNewTranscript((newTranscript) => {
  // If transcription has not started, clear the placeholder text
  if (!transcriptionStartedGladia) {
    textElement.innerHTML = "";
    transcriptionStartedGladia = true;
  }

  // Append the new transcript to the previous text
  textElement.innerHTML += `<span>${newTranscript}</span>`;

  // Scroll to the bottom of the captions element
  captionsElement.scrollTop = captionsElement.scrollHeight;
});