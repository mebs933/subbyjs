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

  // Later add more functions here
}

const transcriptStorage = new TranscriptStorage();
export default transcriptStorage;
