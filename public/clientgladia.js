import transcriptStorageGladia from './transcriptstoragegladia.js';

const socket = new WebSocket("wss://api.gladia.io/audio/text/audio-transcription");

let isRecording = false;

const recordObject = document.getElementById("record");

recordObject.addEventListener("click", () => {
  if (!isRecording) {
    isRecording = true;

    recordObject.classList.add("recording");

    const configuration = {
      x_gladia_key: "e5b77157-3854-453c-a594-bdf853e2effd",
      encoding: "OPUS",
      sample_rate: 16000,
      language_behaviour: "manual",
      language: "nl",
      model_type: "accurate",
      frames_format: "base64",
    };

    socket.send(JSON.stringify(configuration));

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: "audio/webm; codecs=opus",
        });

        mediaRecorder.ondataavailable = (event) => {
          const reader = new FileReader();

          reader.onload = () => {
            const base64Audio = reader.result.replace("data:audio/webm; codecs=opus;base64,", "");
            const message = { frames: base64Audio };
            socket.send(JSON.stringify(message));
          };

          reader.readAsDataURL(event.data);
        };

        mediaRecorder.start();
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    isRecording = false;

    recordObject.classList.remove("recording");

    if (socket.readyState === WebSocket.OPEN) {
      socket.close();
    }
  }
});

socket.onopen = () => {
  console.log("WebSocket connection established");
};

socket.onclose = (event) => {
  console.error(`WebSocket connection closed with code: ${event.code}, reason: ${event.reason}`);
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.event === "transcript") {
    transcriptStorageGladia.addTranscript(data.transcript);
  } else if (data.event === "error") {
    console.error(data.error);
  }
};
