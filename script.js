// Load config
async function loadConfig() {
  try {
    const response = await fetch("/config.json")
    return await response.json()
  } catch (error) {
    console.error("Error loading config:", error)
    return {
      title: "Example",
      iframeUrl: "https://example.com",
      buttonText: "Example",
      noReferralPolicy: true,
    }
  }
}

// Initialize on page load
async function init() {
  const config = await loadConfig()

  // Set title
  document.title = config.title
  document.querySelector(".title").textContent = config.title

  // Set button text
  document.querySelector(".btn-example").textContent = config.buttonText

  // Set iframe URL
  const iframeElement = document.getElementById("dynamic-iframe")
  iframeElement.src = config.iframeUrl
  if (config.noReferralPolicy) {
    iframeElement.referrerPolicy = "no-referrer"
  }

  // Button click handler
  document.querySelector(".btn-example").addEventListener("click", () => {
    window.location.hash = "#"
    document.getElementById("iframe-container").classList.remove("hidden")
  })

  // Close button handler
  document.querySelector(".close-btn").addEventListener("click", () => {
    window.location.hash = ""
    document.getElementById("iframe-container").classList.add("hidden")
  })

  // Handle hash changes
  window.addEventListener("hashchange", () => {
    if (window.location.hash === "#") {
      document.getElementById("iframe-container").classList.remove("hidden")
    } else {
      document.getElementById("iframe-container").classList.add("hidden")
    }
  })
}

// Start
init()
