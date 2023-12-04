// public/transcriptstorage.js

let transcripts = [];

function addTranscript(text) {
  transcripts.push(text);
  // Optional: Implement logic to limit the size of the transcripts array
}

function getTranscripts() {
  return transcripts;
}

module.exports = { addTranscript, getTranscripts };