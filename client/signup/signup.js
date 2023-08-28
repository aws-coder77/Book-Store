document.addEventListener("DOMContentLoaded", function () {
  const token = getCookie("token");
  if(token != null){
    window.location.href = "../index.html";
  }
  const form = document.getElementById("signupForm");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
      
    const name = form.querySelector("#typeName").value;
    const phonenumber = form.querySelector("#typePhoneNumber").value;
    const email = form.querySelector("#typeEmail").value;
    const password = form.querySelector("#typePassword").value;
    const password2 = form.querySelector("#typePassword2").value;

    if (!(password === password2)) {
      alert("you enter the wrong password");
    } else {
      const encoder = new TextEncoder();
      const data = encoder.encode(password);

      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashedPassword = hashArray
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
      const formData = {
        name: name,
        email: email,
        phone: phonenumber,
        password: hashedPassword,
      };
      await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Response from server:", data);
          window.location.href = "../login/login.html";
        })
        .catch((error) => {
          console.error("Error sending data to server:", error);
        });
    }
  });
});
