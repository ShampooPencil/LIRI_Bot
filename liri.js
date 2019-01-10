// Client ID 5422b389d37b4b27a27dcb61c5659b97
// Client Secret 45ea0d850a79406596d3599912128cfb
var moment = require('moment');
var inquirer = require("inquirer");
moment().format();
require("dotenv").config();
var http = require("http");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
/* Load the HTTP library */


// /* Create an HTTP server to handle responses */

// http.createServer(function (request, response) {
//     response.writeHead(200, { "Content-Type": "text/plain" });
//     response.write("Hello World");
//     response.end();
// }).listen(8888);
// Create a "Prompt" with a series of questions.
inquirer
  .prompt([
    // Here we create a basic text prompt.
    {
      type: "input",
      message: "What is your name?",
      name: "username"
    },
    // Here we create a basic password-protected text prompt.
    {
      type: "password",
      message: "Set your password",
      name: "password"
    },
    // Here we give the user a list to choose from.
    {
      type: "list",
      message: "Which Pokemon do you choose?",
      choices: ["Bulbasaur", "Squirtle", "Charmander"],
      name: "pokemon"
    },
    // Here we ask the user to confirm.
    {
      type: "confirm",
      message: "Are you sure:",
      name: "confirm",
      default: true
    }
  ])
  .then(function(inquirerResponse) {
    // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
    if (inquirerResponse.confirm) {
      console.log("\nWelcome " + inquirerResponse.username);
      console.log("Your " + inquirerResponse.pokemon + " is ready for battle!\n");
    }
    else {
      console.log("\nThat's okay " + inquirerResponse.username + ", come again when you are more sure.\n");
    }
  });
