// Import the transcriptstorage.js file
import { getTranscriptLines } from './transcriptstorage.js';

// Get the .captions and .text elements
const captions = document.getElementById("captions");
const text = document.getElementById("text");

// Add an event listener for the "transcript" event
socket.on("transcript", (transcript) => {
  if (transcript !== "") {
    // Get the transcript lines from the transcript storage
    const transcriptLines = getTranscriptLines();

    // Add the transcript lines to the .captions element
    captions.innerHTML = transcriptLines.join('');

    // Add the new transcript line to the .text element
    text.innerHTML = `<span>${transcript}</span>`;

    // Scroll to the bottom of the div
    captions.scrollTop = captions.scrollHeight;
  } else {
    // If the transcript is empty, display the placeholder text
    text.innerHTML = "Subby - Peek into conversation";
  }
});