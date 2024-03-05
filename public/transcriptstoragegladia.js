//transcriptstoragegladia.js

class TranscriptStorageGladia {
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
}

const transcriptStorageGladia = new TranscriptStorageGladia();

export default transcriptStorageGladia;
