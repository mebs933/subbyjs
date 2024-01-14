// Import the necessary functions from transcriptstorage.js
import { addTranscriptLine, getTranscriptLines } from './transcriptstorage.js';
import io from "socket.io-client";
const options = { transports: ["websocket"] };
const socket = io(options);

// Get the .captions and .text elements
const captions = document.getElementById("captions");
const text = document.getElementById("text");

// Add an event listener for the "transcript" event
socket.on("transcript", (transcript) => {
  if (transcript) {
    // Add the new transcript line to the storage
    addTranscriptLine(transcript);

    // Get the updated transcript lines from the transcript storage
    const transcriptLines = getTranscriptLines();

    // Add the transcript lines to the .captions element
    captions.innerHTML = transcriptLines.map(line => `<div>${line}</div>`).join('');

    // Add the new transcript line to the .text element
    text.innerHTML = `<span>${transcript}</span>`;

    // Scroll to the bottom of the div
    captions.scrollTop = captions.scrollHeight;
  } else {
    // If the transcript is empty, display the placeholder text
    text.innerHTML = "Subby - Peek into conversation";
  }
});