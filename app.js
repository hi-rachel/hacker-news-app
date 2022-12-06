const container = document.getElementById("root");
const ajax = new XMLHttpRequest();
const content = document.createElement("div");
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";

ajax.open("GET", NEWS_URL, false);
ajax.send();

// JSON 데이터를 객체로 바꿔서 return 해주는 함수
const newsFeed = JSON.parse(ajax.response);
const ul = document.createElement("ul");

window.addEventListener("hashchange", function () {
  const id = location.hash.substring(1);

  ajax.open("GET", CONTENT_URL.replace("@id", id), false);
  ajax.send();

  const newsContent = JSON.parse(ajax.response);
  const title = document.createElement("h1");

  title.innerHTML = newsContent.title;
  content.appendChild(title);
  console.log(newsContent);
});

for (let i = 0; i < 30; i++) {
  const li = document.createElement("li");
  const a = document.createElement("a");

  a.href = `#${newsFeed[i].id}`;
  a.innerHTML = `${newsFeed[i].title} (${newsFeed[i].comments_count})`;

  a.addEventListener("click", function () {});

  li.appendChild(a);
  ul.appendChild(li);
}

container.appendChild(ul);
container.appendChild(content);
