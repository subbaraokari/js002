const postTemplate = document.getElementById("post-item");
const listElement = document.querySelector(".posts");
const btn = document.getElementById("fetch-posts");

function sendHttpRequest(method, url, data) {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = "json";
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.send(data);
  });
  return promise;
}
async function fetchPosts() {
  try {
    const responseData = await sendHttpRequest(
      "GET",
      "https://jsonplaceholder.typicode.com/post"
    );
    const listOfPosts = responseData;
    for (const post of listOfPosts) {
      console.log(post);
      const postEl = document.importNode(postTemplate.content, true);
      postEl.querySelector("h2").textContent = post.title.toUpperCase();
      postEl.querySelector("p").textContent = post.body;
      listElement.append(postEl);
    }
  } catch (err) {
    console.log(err);
  }
}

async function createPost(title, content) {
  const userId = Math.random();
  const post = {
    title: title,
    body: content,
    userId: userId,
  };
  const res = await sendHttpRequest(
    "POST",
    "https://jsonplaceholder.typicode.com/posts",
    post
  );
  console.log(res);
}

btn.addEventListener("click", fetchPosts);

createPost("Sample Post", "Dummy content");
