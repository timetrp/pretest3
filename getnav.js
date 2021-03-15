var request = require("request"),
  request = request.defaults({
    jar: true,
  });

const parser = require("node-html-parser");

const url = "https://codequiz.azurewebsites.net/";

var cookie = request.cookie("hasCookie=true");

var headers = {
  "Content-Type": "application/json",
  Cookie: cookie,
};

var options = {
  url: url,
  method: "GET",
  headers: headers,
};

// Start the request
request(options, function (error, response, body) {
  if (!error && response.statusCode === 200) {
    const root = parser.parse(body);

    const rows = root.querySelectorAll("tr td");
    const args = process.argv.slice(2);

    rows.forEach((tr, index) => {
      if (tr.toString().includes(args[0])) {
        console.log(rows[index + 1].innerText);
        return true;
      }
    });
    // console.log(rows[0].toString());
  } else {
  }
});
