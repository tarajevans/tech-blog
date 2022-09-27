async function logout() {
    const response = await fetch('/api/users/logout', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' }
      });
    
      if (response.ok) {
        console.log("logged out");
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
}


document.getElementById('logout').addEventListener("click", logout);


