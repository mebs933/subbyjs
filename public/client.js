// client.js - This file is responsible for sending and receiving data from the server.

// Add an event listener for the "load" event.
window.addEventListener("load", () => {
  // Create a new socket connection.
  const socket = io((options = { transports: ["websocket"] }));

  // Add an event listener for the "connect" event.
  socket.on("connect", async () => {
    // Log a message to the console.
    console.log("client: connected to websocket");

    // Start the microphone.
    await start(socket);
  });

  // Add an event listener for the "transcript" event.
  socket.on("transcript", (transcript) => {
    // If the transcript is not empty, add it to the transcript storage.
    if (transcript !== "") {
      // Add the transcript line to the transcript storage.
      socket.emit("add-transcript-line", transcript);
    }
  });
});

// Define the `getMicrophone()`, `openMicrophone()`, `closeMicrophone()`, and `start()` functions.
async function getMicrophone() {
  // Get the user's microphone.
  const userMedia = await navigator.mediaDevices.getUserMedia({
    audio: true,
  });

  // Create a new MediaRecorder object.
  return new MediaRecorder(userMedia);
}

async function openMicrophone(microphone, socket) {
  // Start the microphone.
  await microphone.start(500);

  // Add an event listener for the "start" event.
  microphone.onstart = () => {
    // Log a message to the console.
    console.log("client: microphone opened");

    // Add the "recording" class to the body element.
    document.body.classList.add("recording");

    // Clear the placeholder text from the .text element.
    text.innerHTML = "";

    // Enable NoSleep.js.
    NoSleep.enable();
  };

  // Add an event listener for the "stop" event.
  microphone.onstop = () => {
    // Log a message to the console.
    console.log("client: microphone closed");

    // Remove the "recording" class from the body element.
    document.body.classList.remove("recording");

    // Disable NoSleep.js.
    NoSleep.disable();
  };

  // Add an event listener for the "dataavailable" event.
  microphone.ondataavailable = (e) => {
    // Log a message to the console.
    console.log("client: sent data to websocket");

    // Send the data to the server.
    socket.emit("packet-sent", e.data);
  };
}

async function closeMicrophone(microphone) {
  // Stop the microphone.
  microphone.stop();
}

async function start(socket) {
  // Get the "record" button element.
  const listenButton = document.getElementById("record");

  // Create a variable to store the microphone.
  let microphone;

  // Log a message to the console.
  console.log("client: waiting to open microphone");

  // Add an event listener for the "click" event on the "record" button.
  listenButton.addEventListener("click", async () => {
    // If the microphone is not defined, open the microphone.
    if (!microphone) {
      // Open the microphone.
      microphone = await getMicrophone();

      // Start the microphone.
      await openMicrophone(microphone, socket);
    } else {
      // Close the microphone.
      await closeMicrophone(microphone);

      // Set the microphone to undefined.
      microphone = undefined;
    }
  });
}