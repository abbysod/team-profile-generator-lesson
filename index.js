const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const generateHTML = require("./src/page-template");

const team = [];

// Function to prompt for Manager's details
function createManager() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Manager's name:",
      },
      {
        type: "input",
        name: "id",
        message: "Enter the manager's employee id:",
      },
      {
        type: "input",
        name: "email",
        message: "Enter the manager's employee email address:",
      },
      {
        type: "input",
        name: "officeNumber",
        message: "Enter the manager's officeNumber:",
      },
    ])
    .then((response) => {
      const manager = new Manager(
        response.name,
        response.id,
        response.email,
        response.officeNumber
      );
      team.push(manager);
      showMenu();
    });
}

// Function to prompt for Engineer's details
function createEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Engineer's name:",
      },
      {
        type: "input",
        name: "id",
        message: "Enter the engineer's employee id:",
      },
      {
        type: "input",
        name: "email",
        message: "Enter the engineer's employee email address:",
      },
      {
        type: "input",
        name: "github",
        message: "Enter the engineer's github:",
      },
    ])
    .then((response) => {
      const engineer = new Engineer(
        response.name,
        response.id,
        response.email,
        response.github
      );
      team.push(engineer);
      showMenu();
    });
}

// Function to prompt for Intern's details
function createIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Intern's name:",
      },
      {
        type: "input",
        name: "id",
        message: "Enter the intern's employee id:",
      },
      {
        type: "input",
        name: "email",
        message: "Enter the intern's employee email address:",
      },
      {
        type: "input",
        name: "school",
        message: "Enter the intern's school:",
      },
    ])
    .then((response) => {
      const intern = new Intern(
        response.name,
        response.id,
        response.email,
        response.school
      );
      team.push(intern);
      showMenu();
    });
}

// Function to show the menu
function showMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What do you want to do?",
        choices: [
          "Add an engineer",
          "Add an intern",
          "Finish building the team",
        ],
      },
    ])
    .then((response) => {
      switch (response.choice) {
        case "Add an engineer":
          createEngineer();
          break;
        case "Add an intern":
          createIntern();
          break;
        case "Finish building the team":
          console.log(generateHTML(team));
          fs.writeFile("team.html", generateHTML(team), function (err) {
            if (err) throw err;
            console.log("Saved!");
          });
          break;
        default:
          break;
      }
    });
}
showMenu();
