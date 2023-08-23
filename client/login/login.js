document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginform");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const email = form.querySelector("#typeEmail").value;
    const password = form.querySelector("#typePassword").value;

    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedPassword = hashArray
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
    const formData = {
      email: email,
      password: hashedPassword,
    };
    console.log(formData);
    await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setCookie("token", data.token);
        setCookie("userID", data.userID);
        console.log("Response from server:", data);
        if (data.token) window.location.href = "../index.html";
        else alert("Wrong Email or Password");
      })
      .catch((error) => {
        console.error("Error sending data to server:", error);
      });
  });
});
