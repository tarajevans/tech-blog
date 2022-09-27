async function signupFormHandler(event){
    event.preventDefault();
    
    const email = document.querySelector("#email-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();
    const username = document.querySelector("#username-signup").value.trim();  
  
    if (email && password && username){
      const response = await fetch("/api/users/createUser", {
        method: "post",
        body: JSON.stringify({
          email: email,
          password: password,
          username: username,
        }),
        headers: { "Content-Type": "application/json" },
      });
  
      const obj = await response.json();
    //   console.log("RESPONSE" + JSON.stringify(obj));
    //   console.log("RESPONSE" + JSON.stringify(response));
  
      if (response.ok) {
        document.location.replace("/blog/");
      } else {
        alert(response.statusText);
        console.log(response.statusText);
      }
    } else {
      alert("Please fill in registration form");
    }
  }

document.querySelector(".signup-form").addEventListener("submit", signupFormHandler);
