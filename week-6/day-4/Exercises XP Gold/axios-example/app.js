const { fetchPosts, fetchPostById } = require('./fetch-data.js');

async function main() {
  console.log('======================================');
  console.log('    AXIOS HTTP CLIENT EXAMPLE');
  console.log('======================================\n');
  
  // Fetch all posts
  const posts = await fetchPosts();
  
  // If we have posts, fetch a specific one
  if (posts.length > 0) {
    // Fetch specific posts
    await fetchPostById(1);
    await fetchPostById(5);
    await fetchPostById(10);
    
    // Demonstrate error handling with invalid ID
    await fetchPostById(9999); // This should fail
    
    // Display sample post body
    console.log('\n=== Sample Post Content ===');
    if (posts[0]) {
      console.log(`Title: ${posts[0].title}`);
      console.log(`Body: ${posts[0].body.substring(0, 100)}...`);
    }
  }
  
  console.log('\n' + '='.repeat(40));
  console.log('✅ Exercise completed successfully!');
}

// Run the main function
main().catch(error => {
  console.error('An error occurred:', error.message);
  process.exit(1);
});