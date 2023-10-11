// Declare variables
let song;
let scoreRightWrist = 0;
let scoreLeftWrist = 0;

let rightWristX = 0;
let rightWristY = 0;

let leftWristX = 0;
let leftWristY = 0;

function preload() {
  song = loadSound("music.mp3"); // Preload the music file
}

// Set up the canvas and initialize PoseNet
function setup() {
  canvas = createCanvas(600, 500); // Create a canvas element
  canvas.position(width / 2 + 450, height - 100); // Position the canvas

  video = createCapture(VIDEO); // Create a video capture from the webcam
  video.hide(); // Hide the video feed

  poseNet = ml5.poseNet(video, modelLoaded); // Initialize PoseNet with the video feed
  poseNet.on('pose', gotPoses); // Trigger the gotPoses function when a pose is detected
}

// Function to handle model loading
function modelLoaded() {
  console.log('PoseNet Is Initialized'); // Log that PoseNet is initialized
}

// Function to handle pose detection results
function gotPoses(results) {
  if (results.length > 0) {
    console.log(results);
    scoreRightWrist = results[0].pose.keypoints[10].score;
    scoreLeftWrist = results[0].pose.keypoints[9].score;
    console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);
  }
}

// Continuously draw the video feed and interact based on wrist movements
function draw() {
  image(video, 0, 0, 600, 500); // Display the video feed

  fill("#FF0000"); // Set the fill color to red
  stroke("#FF0000"); // Set the stroke color to red

  if (scoreRightWrist > 0.2) {
    circle(rightWristX, rightWristY, 20); // Draw a circle at the right wrist position

    // Adjust music playback speed based on right wrist position
    if (rightWristY > 0 && rightWristY <= 100) {
      document.getElementById("speed").innerHTML = "Speed = 0.5x";
      song.rate(0.5);
    } else if (rightWristY > 100 && rightWristY <= 200) {
      document.getElementById("speed").innerHTML = "Speed = 1x";
      song.rate(1);
    } else if (rightWristY > 200 && rightWristY <= 300) {
      document.getElementById("speed").innerHTML = "Speed = 1.5x";
      song.rate(1.5);
    } else if (rightWristY > 300 && rightWristY <= 400) {
      document.getElementById("speed").innerHTML = "Speed = 2x";
      song.rate(2);
    } else if (rightWristY > 400) {
      document.getElementById("speed").innerHTML = "Speed = 2.5x";
      song.rate(2.5);
    }
  }

  if (scoreLeftWrist > 0.2) {
    circle(leftWristX, leftWristY, 20); // Draw a circle at the left wrist position
    const InNumberleftWristY = Number(leftWristY);
    const removeDecimals = floor(InNumberleftWristY);
    const volume = removeDecimals / 500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume); // Adjust music volume based on left wrist position
  }
}

// Function to play the loaded music
function play() {
  song.play();
  song.setVolume(1); // Set the volume to maximum
  song.rate(1); // Set the playback rate to normal
}

// Function to pause the music
function pause() {
  song.pause();
}
