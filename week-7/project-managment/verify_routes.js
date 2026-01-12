// Native fetch is available in Node.js 18+

const BASE_URL = 'http://localhost:3000';

async function test() {
  console.log('Starting verification...');

  // 1. GET /tasks (should be empty initially)
  console.log('1. Testing GET /tasks...');
  let res = await fetch(`${BASE_URL}/tasks`);
  let data = await res.json();
  console.log('GET /tasks result:', data);
  if (!Array.isArray(data)) throw new Error('GET /tasks did not return an array');

  // 2. POST /tasks
  console.log('\n2. Testing POST /tasks...');
  res = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'Test Task', description: 'Testing the API' })
  });
  const newTask = await res.json();
  console.log('POST /tasks result:', newTask);
  if (!newTask.id) throw new Error('POST /tasks did not return a task with ID');

  // 3. GET /tasks/:id
  console.log('\n3. Testing GET /tasks/:id...');
  res = await fetch(`${BASE_URL}/tasks/${newTask.id}`);
  const fetchedTask = await res.json();
  console.log(`GET /tasks/${newTask.id} result:`, fetchedTask);
  if (fetchedTask.id !== newTask.id) throw new Error('GET /tasks/:id returned wrong task');

  // 4. PUT /tasks/:id
  console.log('\n4. Testing PUT /tasks/:id...');
  res = await fetch(`${BASE_URL}/tasks/${newTask.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'Updated Task', completed: true })
  });
  const updatedTask = await res.json();
  console.log('PUT result:', updatedTask);
  if (updatedTask.title !== 'Updated Task') throw new Error('PUT did not update title');
  if (updatedTask.completed !== true) throw new Error('PUT did not update completed status');

  // 5. DELETE /tasks/:id
  console.log('\n5. Testing DELETE /tasks/:id...');
  res = await fetch(`${BASE_URL}/tasks/${newTask.id}`, { method: 'DELETE' });
  console.log('DELETE status:', res.status);
  if (res.status !== 204) throw new Error('DELETE did not return 204');

  // Verify deletion
  res = await fetch(`${BASE_URL}/tasks/${newTask.id}`);
  if (res.status !== 404) throw new Error('Task should be gone after delete');

  console.log('\nVerification PASSED ✅');
}

test().catch(err => {
  console.error('\nVerification FAILED ❌');
  console.error(err);
});
