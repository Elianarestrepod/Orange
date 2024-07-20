
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.spec.{js,jsx,ts,tsx}",
    video: true, // Habilitar grabación de video
    screenshotsFolder: "cypress/screenshots", // Carpeta para capturas de pantalla
    videosFolder: "cypress/videos" // Carpeta para videos
  }
});




