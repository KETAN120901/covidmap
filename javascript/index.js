
function initMap() {
    var location = { lat: 20.5937, lng: 78.9629 };
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: location
    });
    function updateMap() {
        fetch("records/data.json")
            .then(response => response.json())
            .then(rsp => {
                console.log(rsp.data)
                rsp.data.forEach(element => {
                    latitude = element.latitude;
                    longitude = element.longitude;
                    cases = element.infected;

                    if (cases > 255) {
                        color = "rgb(255,0,0)"
                    }
                    else {
                        color = `rgb(${cases},0,0)`;
                    }
                    var marker = new google.maps.Marker({
                        position: { lat: latitude, lng: longitude },
                        icon: {
                            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                            strokeColor: color,
                            scale: 3
                        },

                        map: map

                    });
                    const infowindow = new google.maps.InfoWindow({
                        content:`latitude: ${element.latitude}<br>
                        pop: ${element.pop}<br>
                        longitude: ${element.longitude}<br>
                        name: ${element.name}<br>
                        country: ${element.country}<br>
                        lastUpdated: ${element.lastUpdated}<br>
                        dead: ${element.dead}<br>
                        id: ${element.id}<br>
                        infected: ${element.infected}<br>
                        recovered: ${element.recovered}`
                      });
                    
                      marker.addListener("mouseover", () => {
                        infowindow.open(marker.get("map"), marker);
                      });
                      marker.addListener("mouseout", () => {
                        infowindow.close(marker.get("map"), marker);
                      });
                });
            })
    }
    updateMap();



}
