// transcriptstorage.js
class TranscriptStorage {
  constructor() {
    this.transcripts = [];
    this.listeners = [];
  }

  addTranscript(transcript) {
    this.transcripts.push(transcript);
    // Notify all listeners about the new transcript
    this.listeners.forEach(listener => listener(transcript));
  }

  onNewTranscript(listener) {
    this.listeners.push(listener);
  }

  // Add more methods as needed, such as for summary generation
}

// Export a single instance
const transcriptStorage = new TranscriptStorage();
export default transcriptStorage;