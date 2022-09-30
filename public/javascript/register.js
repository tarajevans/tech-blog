async function signupFormHandler(event){
  event.preventDefault();
  console.log("**************SUFH called****************");
  const password = document.getElementById("password1").value.trim();
  const username = document.getElementById("username").value.trim();  

  if (password && username){
    const response = await fetch("/api/users/createUser", {
      method: "post",
      body: JSON.stringify({
        password: password,
        username: username,
      }),
      headers: { "Content-Type": "application/json" },
    });

    //const obj = await response.json();
  //   console.log("RESPONSE" + JSON.stringify(obj));
  //   console.log("RESPONSE" + JSON.stringify(response));

    if (response.ok) {
      document.location.replace("/dashboard/");
    } else {
      alert(response.statusText);
      console.log(response.statusText);
    }
  } else {
    alert("Please fill in registration form");
  }
}

document.getElementById("registerBtn").addEventListener("click", signupFormHandler);
