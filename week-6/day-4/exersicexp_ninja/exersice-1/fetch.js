// fetch.js
const axios = require("axios");

async function fetchData() {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    response.data.slice(0, 5).forEach(post => {
      console.log(`Post ${post.id}: ${post.title}`);
    });
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

module.exports = fetchData;
