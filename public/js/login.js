const loginFormHandler = async (event) => {
  event.preventDefault();

  // pull values from page
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  // if both password and email are correct, we send a post request to api endpoint.
  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 
        'Content-Type': 'application/json' 
      },
    });

    //success --> redirect to dashboard
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert("Incorrect email or password, please try again");
    }
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
