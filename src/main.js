import './style.css'
import * as faceapi from "face-api.js"

const videoEL = document.getElementById("video")
const overlay = document.getElementById("overlay")
const statusLabel = document.getElementById("status")
const registerBtn = document.getElementById("registerBtn")
const loginBtn = document.getElementById("loginBtn")
const loginStatus = document.getElementById("loginStatus")

let registeredDescriptor = null
let detectionActive = false

// Cargar modelos
async function loadModels() {
  await faceapi.nets.tinyFaceDetector.loadFromUri('/models')
  await faceapi.nets.faceLandmark68Net.loadFromUri('/models')
  await faceapi.nets.faceRecognitionNet.loadFromUri('/models')
  statusLabel.textContent = "Modelos cargados ✅"
}

// Iniciar cámara
async function startVideo() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 480, height: 360 }
    })
    videoEL.srcObject = stream
    return new Promise(resolve => {
      videoEL.onloadedmetadata = () => resolve()
    })
  } catch (err) {
    statusLabel.textContent = "Error al acceder a la cámara 🚫"
    console.error(err)
  }
}

// Registrar rostro (guardar descriptor)
registerBtn.addEventListener('click', async () => {
  const detection = await faceapi
    .detectSingleFace(videoEL, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks()
    .withFaceDescriptor()

  if (!detection) {
    loginStatus.textContent = "❌ No se detectó ningún rostro"
    return
  }

  registeredDescriptor = detection.descriptor
  loginStatus.textContent = "✅ Rostro registrado correctamente"
  loginBtn.disabled = false
})

// Login con rostro (comparar descriptor en vivo con el guardado)
loginBtn.addEventListener('click', async () => {
  if (!registeredDescriptor) {
    loginStatus.textContent = "⚠️ Primero registra un rostro"
    return
  }

  detectionActive = true
  loginStatus.textContent = "🔍 Detectando rostro..."

  const ctx = overlay.getContext('2d')
  overlay.width = videoEL.videoWidth
  overlay.height = videoEL.videoHeight

  const faceMatcher = new faceapi.FaceMatcher(
    new faceapi.LabeledFaceDescriptors("Usuario", [registeredDescriptor])
  )

  async function loop() {
    if (!detectionActive) return

    const result = await faceapi
      .detectSingleFace(videoEL, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor()

    ctx.clearRect(0, 0, overlay.width, overlay.height)

    if (result) {
      const dims = faceapi.matchDimensions(overlay, videoEL, true)
      const resized = faceapi.resizeResults(result, dims)

      // Dibujar caja y landmarks
      faceapi.draw.drawDetections(overlay, resized)
      faceapi.draw.drawFaceLandmarks(overlay, resized)

      // Comparar con el rostro registrado
      const bestMatch = faceMatcher.findBestMatch(result.descriptor)
      loginStatus.textContent = bestMatch.label === "Usuario" && bestMatch.distance < 0.5
        ? "✅ Acceso concedido"
        : "❌ Acceso denegado"
    } else {
      loginStatus.textContent = "❌ No se detectó ningún rostro"
    }

    requestAnimationFrame(loop)
  }

  loop()
})

// Flujo inicial
await loadModels()
await startVideo()
statusLabel.textContent = "Listo para usar 👌"
