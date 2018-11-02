let mymap = L.map('mapid').setView([-5.144944, 119.475389], 14);
                L.tileLayer(
                    'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                        maxZoom: 25,
                        // attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                        //     '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                        //     'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                        id: 'mapbox.streets',
                        accessToken: 'pk.eyJ1IjoiZHJlaXplaG4iLCJhIjoiY2ptYXE4dDk4MW8wcjNrcXF4bzRidWZtZyJ9.D9JgNuOxJATtfdWuxj4I0g'
                    }).addTo(mymap);
        
                var myIcon = L.icon({
                    iconUrl: 'https://image.flaticon.com/icons/svg/1139/1139548.svg',
                    iconSize:     [39, 39]
                });    

            
             const url ='datamap.json';   
             // console.log(url);    
               
                // let promise;
                fetch(url)
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(myJson) {
                        promise = myJson;
                        // console.log(promise);
                    })
                    .then(function(){  
                            for (i in promise) {
                                // console.log(promise[i].img);
                            var latlng = L.latLng({lat: promise[i].lat, lng:promise[i].long});
                            
                            var mapku = L.marker( latlng, {icon: myIcon} )
                            .bindTooltip(promise[i].name)
                            .addTo(mymap);
                            mapku.review = promise[i].review;
                            mapku.img = promise[i].img;
                            mapku.title = promise[i].name;
                            mapku.skor = promise[i].skor;
                            // console.log(mapku.title);
    
                                    mapku.on('click', function (e) {
                                    // console.log(this.title);
                                    let img = document.getElementById('picture');
                                    img.style.backgroundImage = "url("+this.img+")";
                                    document.getElementById('review').innerHTML = "<strong><span class='skor'>"+parseFloat(this.skor)+"</span></strong></br>&ldquo;"+this.review+"&rdquo;";
                                    document.getElementById('title').innerHTML = "<h2>"+this.title+"</h2>";
                                });
                        }
                    });


      