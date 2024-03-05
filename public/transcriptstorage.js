//workspaces/subbyjs/public/transcriptstorage.js

class TranscriptStorage {
  constructor() {
    this.transcripts = [];
    this.listeners = [];
  }

  addTranscript(transcript) {
    this.transcripts.push(transcript);
    this.listeners.forEach(listener => listener(transcript));
  }

  onNewTranscript(listener) {
    this.listeners.push(listener);
  }

  // Additional functions can be added here if necessary
}

// Create an instance of TranscriptStorage
const transcriptStorage = new TranscriptStorage();

// Export the instance for use in other modules
export default transcriptStorage;