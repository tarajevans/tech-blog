async function loginFormHandler(event) {
  event.preventDefault();

  console.log("loginForm called");
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();
  console.log("***email: " + email + " password: " + password);
  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "post",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    
    const obj = await response.json();
    // console.log("RESPONSE" + JSON.stringify(obj));
    // console.log("RESPONSE" + JSON.stringify(response));

    if (response.ok) {
      document.location.replace("/homepage/");
    } else {
      alert(response.statusText);
      console.log(response.statusText);
    }
  } else {
    alert("Please enter your login information");
  }
}

document.querySelector(".login-form").addEventListener("submit", loginFormHandler);