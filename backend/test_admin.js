import jwt from 'jsonwebtoken';

async function testAdmin() {
    console.log("1. Logging in as Admin...");
    let res = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'ADMIN', password: 'IAMADMIN' })
    });
    
    let data = await res.json();
    if (res.status !== 200) {
        console.error("Login failed:", data);
        return;
    }
    
    const token = data.token;
    console.log("Login successful! Token acquired.\n");
    
    // Test Delete Comment (ID 1)
    console.log("2. Deleting Comment ID 1...");
    res = await fetch('http://localhost:5000/api/admin/comments/1', {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    console.log("Delete Comment Status:", res.status, await res.json());
    
    // Test Delete Event (ID 1)
    console.log("\n3. Deleting Event ID 1...");
    res = await fetch('http://localhost:5000/api/admin/events/1', {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    console.log("Delete Event Status:", res.status, await res.json());

    // Test Delete Post (ID 1)
    console.log("\n4. Deleting Post ID 1...");
    res = await fetch('http://localhost:5000/api/admin/posts/1', {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    console.log("Delete Post Status:", res.status, await res.json());

    // Test Delete User (ID 2)
    console.log("\n5. Deleting User ID 2...");
    res = await fetch('http://localhost:5000/api/admin/users/2', {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    console.log("Delete User Status:", res.status, await res.json());
    
    console.log("\nDone testing admin deletion endpoints.");
}

testAdmin();
