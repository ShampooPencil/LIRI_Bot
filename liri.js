
// Client ID 5422b389d37b4b27a27dcb61c5659b97
// Client Secret 45ea0d850a79406596d3599912128cfb
var moment = require('moment');
//var inquirer = require("inquirer");
moment().format();
require("dotenv").config();
var http = require("http"); //import npm
var keys = require("./keys.js"); //import file instead of npm
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require('fs');
//var spotify = new Spotify(keys.spotify);
/* Load the HTTP library */

var thirdCommand = process.argv[2];
var fourthCommand = process.argv.slice(3).join(" ");

var startSpotify = function(songName){
  console.log(keys.spotify.id);
  console.log(keys.spotify.secret);
  var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
  });
  
  spotify.search({ type: 'track', query: songName }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   for(var i = 0; i < data.tracks.items.length; i++){
     console.log(data.tracks.items[i].album.name);    ///going to loop through all the tracks and grab specific information
     
   }
   if (thirdCommand === 'concert-this'){
    var artist = fourthCommand;
    console.log(artist);
    var queryUrl = "https://rest.bandsintown.com/artists/"+artist+"/events?app_id=codecademy";
    request(queryUrl, function(err, response, data) { // cant have a response back its annoying
      // console.log(data);
      var formattedData = JSON.parse(data);
      var dateTime = moment(formattedData[0].datetime).format("MM/DD/YYYY");
      console.log(
          "Venue: " + formattedData[0].venue.name + "\nLocation: " + formattedData[0].venue.city + "\nDate: " + dateTime
        );
      });

  // IF/ELSE STATEMENTS ONE-AT-A-TIME****  ***********!!!!!!!!!********
      }else if (thirdCommand === 'spotify-this-song'){
        var Song = fourthCommand;
        var searchTrack;
        if (Song === undefined) {
          searchTrack = "The Sign ace of base";
        }else {
          searchTrack = Song;
        }
        spotify.search({
          type: 'track',
          query: searchTrack
        }, function(error, data) {
          if (error) {
            logIt('Error occurred: ' + error);
            return;
          } else {
            console.log("\n----------------------------------------*********\n");
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Song: " + data.tracks.items[0].name);
            console.log("Preview: " + data.tracks.items[0].href);
            console.log("Album: " + data.tracks.items[0].album.name);
            
            console.log("\n----------------------------------------***********\n");
            
          }
        });
    
      }

    else if (thirdCommand === 'movie-this'){
      var movie = fourthCommand;

      var queryUrl = ' http://www.omdbapi.com/?i=tt3896198&apikey=babebd84&t='+movie; //more data,add ,more query parameters t for omdb just for the value/title
      request(queryUrl, function(err, response, data) { // cant have a response back its annoying
        // console.log(data);
        var formattedData = JSON.parse(data); // 
        
        // * Title of the movie.
        console.log("Title: " + formattedData.Title);//switched to formattedData because turned this any value to a string on line 83
        // * Year the movie came out.
        console.log("Year: " + formattedData.Year);
        // * IMDB Rating of the movie.
        console.log("imdbRating: " + formattedData.imdbRating);
        // * Rotten Tomatoes Rating of the movie.
        console.log("Rotten Tomatoes: " + formattedData["Rotten Tomatoes"]);
        // * Country where the movie was produced.
        console.log("Country: " + formattedData.Country);
        // * Language of the movie.
        console.log("Language: " + formattedData.Language);
        // * Plot of the movie.
        console.log("Plot: " + formattedData.Plot);
        // * Actors in the movie.
        console.log("Actors: " + formattedData.Actors);

        });
        
     
    }

  else if (thirdCommand === 'do-what-it-says'){
     fs.readFile('random.txt', 'utf8', function(err,data){
       console.log(data);
       var arguments = data.split(',');
       console.log(arguments[0]);
       console.log(arguments[1]);
     }); //basically pulled data from the file

//tip..maybe put this in a function

  }else {
    console.log("Try Again");
  }
  
  //console.log(data); 
  });
}
var runProgram = function(){
  console.log("If Program does't work make sure the typing is accurate.")
  startSpotify("Master");//modify function//song in parameter is just a example
}
runProgram();



