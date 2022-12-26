const http = require("http");
const fs = require("fs");
const dns = require("dns");
const cowsay = require("cowsay");
const argument = process.argv;
const server = http.createServer((request, response) => {
  if (request.url === "/")
    response.end(`<h1>WELCOME TO EMPLOYEE MANAGEMENT SYSTEM</h1>`);
  else if (request.url === "/writeinfile") {
    fs.writeFile("employee.txt", "Employees names are as follows:", (error) => {
      if (error) console.log(error);
      else response.end(`<h1>Data has been written in the file</h1>`);
    });
  } else if (request.url === "/enternames") {
    let arr = ["Aman", "Albert", "Varun", "Rajat", "Nrupul"];
    arr.map((el) => {
      fs.appendFile("employee.txt", `\n${el}`, (error) => {
        if (error) console.log(error);
        else response.end(`<h1>All the names added in the file</h1>`);
      });
    });
  } else if (request.url === "/alldetails") {
    fs.readFile("employee.txt", { encoding: "utf-8" }, (err, data) => {
      if (err) {
        console.log("errror has been occured");
      } else {
        response.end(
          cowsay.say({
            text: data,
          })
        );
      }
    });
    response.end("cow added");
  } else if (request.url === "/address") {
    dns.lookup(argument[2], (err, address) => {
      response.end(address);
    });
  } else if (request.url === "/delete") {
    fs.unlink("employee.txt", (err) => {
      if (err) {
        console.log("errror has been occured");
      }
      response.end("File has been successfully deleted");
    });
  }
});

server.listen(7080, () => {
  console.log("Server listening on port 7080");
});
