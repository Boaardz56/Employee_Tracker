const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
// create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "employees_DB",
});


// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// function which prompts the user for what action they should take
function start() {
    inquirer
      .prompt({
        name: "startQuestions",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View all employees",
          "View all departments",
          "View all managers",
          "Add Employee",
          "Add Department",
          "Add Role",
          "Update Employee Role",]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        switch (answer.startQuestions) {
          case "View all employees":
            viewEmployees();
            break;

          case "View all departments":
            viewDepartments();
            break;
            
          case "View all managers":
            viewManagers();
            break;

          case "Add Employee":
            addEmployees();
            break;

          case "Add Department":
            addDepartment();
            break;
          
           case "Add Role":
            addRole();
            break;
          
          case "Update Employee Role":
            updateEmployees();
            break;

          case "Exit":
            connection.end();
            break;
        }
      });
  }
function viewEmployees() {
  connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.names AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id", function(err, res) {
    if (err) throw err;

    // Log all results of the SELECT statement
    console.table(res);
    start();
  });
}

function viewDepartments() {
  connection.query("SELECT names FROM department", function (err, res) {
      console.table(res);
      connection.end();
  });
}

function viewManagers() {
  var query = "SELECT id, first_name, last_name FROM employee WHERE id IN (SELECT manager_id FROM employee WHERE manager_id IS NOT NULL)";
  connection.query(query, function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].first_name + " " + res[i].last_name + " || Id: " + res[i].id);
    }

    start();
  });
}

//function to handle posting new employees
function addEmployees() {
    // prompt for info about the item being put up for auction
    inquirer
      .prompt([
        {
          name: "employeeAdd",
          type: "input",
          message: "What is the employee's first and last name?"
        }
      ])

      .then(function(answer) {
        var string = answer.employeeAdd;
        var fullName = string.split(" ");
        console.log(fullName);
        connection.query("INSERT INTO employee (first_name, last_name) VALUES ?",
           [[fullName]],
           function (err, res) {
            start();
           });
      });
  }

  function departmentAdd() {
    inquirer
      .prompt({
        name: "departmentAdd",
        type: "input",
        message: ["To ADD a department, enter new department name"]
      })
  
      .then(function (answer) {
        console.log(answer)
        var str = answer.employeeAdd;
        var firstAndLastName = str.split(" ");
        console.log(firstAndLastName);
        var query = "INSERT INTO employee (first_name, last_name) VALUES ?";
        connection.query(query, [[firstAndLastName]], function (err, res) {
  
          runSearch();
        });
      })
  }
  

  // {
  //   name: "role",
  //   type: "list",
  //   message: "What is the employee's role?",
  //   choices: [
  //     "Management",
  //     "Finance",
  //     "Sales",
  //     "Legal"
  //   ]
  // },
  // {
  //   name: "manager",
  //   type: "list",
  //   message: "What is the employee's manager?",
  //   choices: [
  //     "Michael Scott",
  //     "Jan Levingston"
  //     ]
  // }
//   function bidAuction() {
//     // query the database for all items being auctioned
//     connection.query("SELECT * FROM auctions", function(err, results) {
//       if (err) throw err;
//       // once you have the items, prompt the user for which they'd like to bid on
//       inquirer
//         .prompt([
//           {
//             name: "choice",
//             type: "rawlist",
//             choices: function() {
//               var choiceArray = [];
//               for (var i = 0; i < results.length; i++) {
//                 choiceArray.push(results[i].item_name);
//               }
//               return choiceArray;
//             },
//             message: "What auction would you like to place a bid in?"
//           },
//           {
//             name: "bid",
//             type: "input",
//             message: "How much would you like to bid?"
//           }
//         ])
//         .then(function(answer) {
//           // get the information of the chosen item
//           var chosenItem;
//           for (var i = 0; i < results.length; i++) {
//             if (results[i].item_name === answer.choice) {
//               chosenItem = results[i];
//             }
//           }
  
//           // determine if bid was high enough
//           if (chosenItem.highest_bid < parseInt(answer.bid)) {
//             // bid was high enough, so update db, let the user know, and start over
//             connection.query(
//               "UPDATE auctions SET ? WHERE ?",
//               [
//                 {
//                   highest_bid: answer.bid
//                 },
//                 {
//                   id: chosenItem.id
//                 }
//               ],
//               function(error) {
//                 if (error) throw err;
//                 console.log("Bid placed successfully!");
//                 start();
//               }
//             );
//           }
//           else {
//             // bid wasn't high enough, so apologize and start over
//             console.log("Your bid was too low. Try again...");
//             start();
//           }
//         });
//     });
//   }
  