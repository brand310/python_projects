//------map-------
const myMap = {
	coordinates: [],
	businesses: [],
	map: {},
	markers: {},

    buildMap() {
		this.map = L.map('map', {
		center: this.coordinates,
		zoom: 13,
		});

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
        }).addTo(this.map);
            
    const marker = L.marker(this.coordinates, {icon: mcMarker})
		marker
		.addTo(this.map)
		.bindPopup('<p1><b>You are here</b><br></p1>')
		.openPopup()
  },

    addMarkers() {
		for (var i = 0; i < this.businesses.length; i++) {
		this.markers = L.marker([
			this.businesses[i].lat,
			this.businesses[i].long,
		])
			.bindPopup(`<p1>${this.businesses[i].name}</p1>`)
			.addTo(this.map)
		}
	},
}
let mcMarker = L.icon({
    iconUrl: 'assets/AnyConv.com__Player_29_BE2.png',
    shadowUrl: 'assets/minecraftMarkerShadow.png',

    iconSize:     [48, 48],
    shadowSize:   [48, 40], 
    iconAnchor:   [15, 80], 
    shadowAnchor: [10, 65], 
    popupAnchor:  [-3, -76]
});

window.onload = async () => {
	const coords = await getCoords()
	myMap.coordinates = coords
	myMap.buildMap()
}

async function getCoords(){
	const pos = await new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject)
	});
	return [pos.coords.latitude, pos.coords.longitude]
}



    
//------foursquare------

async function getFoursquare(business) {
    const options = {
       method: 'GET',
      headers: {
      Accept: 'application/json',
      Authorization: 'fsq33fFzDBG4LOr25UCqFg6+pxcK7eFOsgq3rMrt42DPRQU='
      }
    }

let limit = 5
let lat = myMap.coordinates[0]
let lon = myMap.coordinates[1]
let response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.foursquare.com/v3/places/search?&query=${business}&limit=${limit}&ll=${lat}%2C${lon}`, options)
let data = await response.text()
let parsedData = JSON.parse(data)
let businesses = parsedData.results
      return businesses
    }



function processBusinesses(data) {
      let businesses = data.map((element) => {
        let location = {
          name: element.name,
          lat: element.geocodes.main.latitude,
          long: element.geocodes.main.longitude
        };
        return location
      })
      return businesses
    }
    

document.getElementById('submit').addEventListener('click', async (event) => {
      event.preventDefault()
      let business = document.getElementById('business').value
      let data = await getFoursquare(business)
      myMap.businesses = processBusinesses(data)
      myMap.addMarkers()
    })