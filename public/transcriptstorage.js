// /workspaces/subbyjs/public/transcriptstorage.js This file stores the transcript lines in an array.

// Create an array to store the transcript lines
const transcriptLines = [];

// Add a function to add a transcript line to the array
function addTranscriptLine(transcriptLine) {
  // Add the transcript line to the array
  transcriptLines.push(transcriptLine);
}

// Add a function to get the transcript lines from the array
function getTranscriptLines() {
  // Return the transcript lines
  return transcriptLines;
}

// Export the functions
export { addTranscriptLine, getTranscriptLines };