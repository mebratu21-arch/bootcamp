const fileManager = require('./fileManager.js');

async function main() {
  try {
    const content = await fileManager.readFile('Hello World.txt');
    console.log('Read:', content);
    
    await fileManager.writeFile('Bye World.txt', 'Writing to the file');
    console.log('Write operation completed');
  } catch (error) {
    console.error('Main error:', error.message);
  }
}

main();