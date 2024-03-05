//captionsgladia.js
import TranscriptStorageGladia from './transcriptstoragegladia.js';

const captionsElement = document.getElementById("captionsgladia");
const textElement = document.getElementById("textgladia");
const transcriptStorage = new TranscriptStorageGladia();

transcriptStorage.onNewTranscript = (newTranscript) => {
  textElement.innerHTML += `<span>${newTranscript}</span>`;
  captionsElement.scrollTop = captionsElement.scrollHeight;
};
