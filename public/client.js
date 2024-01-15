import socketIO from 'socket.io-client';
import transcriptStorage from './transcriptstorage.js';

async function getMicrophone() {
  const userMedia = await navigator.mediaDevices.getUserMedia({ audio: true });
  return new MediaRecorder(userMedia);
}

async function openMicrophone(microphone, socket) {
  await microphone.start(500);

  microphone.onstart = () => {
    document.body.classList.add("recording");
  };

  microphone.onstop = () => {
    document.body.classList.remove("recording");
  };

  microphone.ondataavailable = (e) => {
    socket.emit("packet-sent", e.data);
  };
}

async function closeMicrophone(microphone) {
  microphone.stop();
}

async function start(socket) {
  const listenButton = document.getElementById("record");
  let microphone;

  listenButton.addEventListener("click", async () => {
    if (!microphone) {
      microphone = await getMicrophone();
      await openMicrophone(microphone, socket);
    } else {
      await closeMicrophone(microphone);
      microphone = undefined;
    }
  });
}

window.addEventListener("load", () => {
  const options = { transports: ["websocket"] };
  const socket = socketIO(options);

  socket.on("connect", async () => {
    await start(socket);
  });

  socket.on("transcript", (transcript) => {
    if (transcript !== "") {
      // Update the transcript storage instead of directly manipulating the UI
      transcriptStorage.addTranscript(transcript);
    }
  });
});