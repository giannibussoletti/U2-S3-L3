const urlMeteo =
  "https://api.open-meteo.com/v1/forecast?latitude=41.9936&longitude=12.7224&daily=temperature_2m_max,temperature_2m_min&hourly=temperature_2m&current=cloud_cover,rain&timezone=Europe%2FBerlin"

const minSection = document.getElementById("min")
const currentSection = document.getElementById("current")
const maxSection = document.getElementById("max")

const getWeather = function () {
  fetch(urlMeteo)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("risposta non corretta dal server", response.status)
      }
    })
    .then((data) => {
      const minTemp = data.daily.temperature_2m_min[0]
      const currentTemp = data.hourly.temperature_2m[0]
      const maxTemp = data.daily.temperature_2m_max[0]
      minSection.innerText = `${minTemp}°C`
      currentSection.innerText = `${currentTemp}°C`
      maxSection.innerText = `${maxTemp}°C`
    })
    .catch((error) => {
      console.log("il server non risponde", error)
    })
}
getWeather()
