const fileManager = require('./fileManager.js');

async function main() {
  try {
    // Read content from Hello World.txt
    const helloContent = await fileManager.readFile('Hello World.txt');
    console.log('Content from Hello World.txt:');
    console.log(helloContent);
    
    // Write to Bye World.txt
    await fileManager.writeFile('Bye World.txt', 'Writing to the file');
    
    // Read back from Bye World.txt to verify
    const byeContent = await fileManager.readFile('Bye World.txt');
    console.log('\nContent from Bye World.txt after writing:');
    console.log(byeContent);
    
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

main();