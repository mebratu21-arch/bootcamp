const axios = require('axios');

async function fetchPosts() {
  try {
    console.log('Fetching posts from JSONPlaceholder API...');
    
    // Make GET request to the API
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    
    // Check if request was successful
    if (response.status === 200) {
      const posts = response.data;
      
      console.log(`Successfully fetched ${posts.length} posts\n`);
      
      // Display titles of first 10 posts
      console.log('=== First 10 Post Titles ===');
      posts.slice(0, 10).forEach((post, index) => {
        console.log(`${index + 1}. ${post.title}`);
      });
      
      // Additional statistics
      console.log('\n=== Statistics ===');
      console.log(`Total posts: ${posts.length}`);
      
      // Group by userId
      const userGroups = {};
      posts.forEach(post => {
        if (!userGroups[post.userId]) {
          userGroups[post.userId] = 0;
        }
        userGroups[post.userId]++;
      });
      
      console.log('\nPosts per user:');
      Object.keys(userGroups).forEach(userId => {
        console.log(`  User ${userId}: ${userGroups[userId]} posts`);
      });
      
      return posts;
    } else {
      console.log(`Failed to fetch posts. Status code: ${response.status}`);
      return [];
    }
    
  } catch (error) {
    console.error('Error fetching posts:', error.message);
    
    if (error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error(`Data: ${JSON.stringify(error.response.data)}`);
    }
    
    return [];
  }
}

// Additional function to fetch a specific post
async function fetchPostById(id) {
  try {
    console.log(`\nFetching post with ID ${id}...`);
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    
    if (response.status === 200) {
      console.log(`Post ${id}: ${response.data.title}`);
      return response.data;
    }
  } catch (error) {
    console.error(`Error fetching post ${id}: ${error.message}`);
  }
}

// Export functions
module.exports = {
  fetchPosts,
  fetchPostById
};