const fetch = require('node-fetch');

async function testFetch() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const data = await response.json();
    console.log(data);
}

testFetch();
