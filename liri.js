

var dotenv = require("dotenv").config();
var moment = require('moment');
// moment().format();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var omdb = keys.omdb
var axios = require("axios")
var fs = require("fs")
// var bandsInTown = require("./api/bandsInTown")
var term = process.argv.slice(3).join(" "); 

switch(process.argv[2]){
    case "concert-this":
        //code
        axios.get("https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp")
            .then(function (response) {
                // handle success
                // console.log(response.data[0]);
                let venue = response.data[0].venue
                let concert = {
                    name: venue.name,
                    location: venue.city +", "+venue.country,
                    date: moment(response.data[0].datetime, "YYYY-MM-DDHH:mm:ss").format("MM/DD/YYYY")
                }
                console.log(concert)
            })
        console.log("concert-this")
    break

    case "spotify-this-song":
        //code
        spotify.search({ type: 'track', query: term }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
           
        //   console.log(data.tracks.items[0]); 
          let path = data.tracks.items[0]
          let track = {
              artist: path.artists[0].name,
              name: path.name,
              link: path.external_urls.spotify,
              album: path.album.name
          }
          console.log(track)
          });
    break

    case "movie-this":
        //code
        axios.get("http://www.omdbapi.com/?apikey="+ omdb +"&s="+ term)
        .then(function (response) {
            // handle success
            console.log(response.data.Search[0]);
        })
    break

    case "do-what-it-says":
        let butt = fs.readFile("./random.txt", function(err,data){return data})
        console.log(butt)
    break
}