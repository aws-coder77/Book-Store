document.addEventListener("DOMContentLoaded", () => {
  const cardImgTops = document.querySelectorAll(".card-img-top");

  cardImgTops.forEach((cardImgTop) => {
    cardImgTop.addEventListener("click", async () => {
      try {
        // const response = await fetch("/api/data");
        // const data = await response.json();
        window.location.href = `bookreview/bookreview.html?`;
      } catch (error) {
        console.error("Error: ", error);
      }
    });
  });

  const loginButton = document.getElementById("btn-login");
  const signupButton = document.getElementById("btn-signup");
  const logoutButton = document.getElementById("btn-logout");

  const token = getCookie("token");
  console.log(token);
  if (token != null) {
    loginButton.style.display = "none";
    signupButton.style.display = "none";
  }
  else {
    logoutButton.style.display = "none";
  }

  logoutButton.addEventListener("click", async () => {
    try {
      deleteCookie("token");
      deleteCookie("userID");
      window.location.href = "index.html";
    } catch (error) {
      console.error("Error: ", error);
    }
  });

});
