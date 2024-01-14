// /workspaces/subbyjs/public/client.js
import io from "socket.io-client";

const options = { transports: ["websocket"] };
const socket = io(options);

// Add an event listener for the "connect" event.
socket.on("connect", async () => {
  console.log("client: connected to websocket");
  await start(socket);
});

// Add an event listener for the "transcript" event.
socket.on("transcript", (transcript) => {
  if (transcript !== "") {
    socket.emit("add-transcript-line", transcript);
  }
});

async function getMicrophone() {
  try {
    const userMedia = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    return new MediaRecorder(userMedia);
  } catch (error) {
    console.error('client: error accessing the microphone', error);
    throw error; // You may want to handle this error differently.
  }
}

async function openMicrophone(microphone, socket) {
  if (!microphone) {
    console.error('client: microphone is not available');
    return;
  }

  try {
    await microphone.start(500);
    microphone.onstart = () => {
      console.log("client: microphone opened");
      document.body.classList.add("recording");
      text.innerHTML = "";
    };

    microphone.onstop = () => {
      console.log("client: microphone closed");
      document.body.classList.remove("recording");
    };

    microphone.ondataavailable = (e) => {
      console.log("client: sent data to websocket");
      socket.emit("packet-sent", e.data);
    };
  } catch (error) {
    console.error('client: error opening the microphone', error);
  }
}

async function closeMicrophone(microphone) {
  if (!microphone) {
    console.error('client: microphone is not available to close');
    return;
  }

  microphone.stop();
}

async function start(socket) {
  const listenButton = document.getElementById("record");
  let microphone;

  console.log("client: waiting to open microphone");

  listenButton.addEventListener("click", async () => {
    if (!microphone) {
      try {
        microphone = await getMicrophone();
        await openMicrophone(microphone, socket);
      } catch (error) {
        // Handle microphone access errors or any other errors
        console.error('client: error starting the microphone', error);
      }
    } else {
      await closeMicrophone(microphone);
      microphone = undefined;
    }
  });
}

// Ensure the "text" element exists in your HTML and has the id "text"
const text = document.getElementById("text");
if (!text) {
  console.error('client: the element with id "text" was not found');
}