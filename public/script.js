const video = document.getElementById('video')

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

video.addEventListener('play', () => {
  const emotionsCanvas = faceapi.createCanvasFromMedia(video)
  document.body.append(emotionsCanvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(emotionsCanvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    emotionsCanvas.getContext('2d').clearRect(0, 0, emotionsCanvas.width, emotionsCanvas.height)
    faceapi.draw.drawDetections(emotionsCanvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(emotionsCanvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(emotionsCanvas, resizedDetections)
  }, 100)
})