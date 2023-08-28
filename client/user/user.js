document.addEventListener("DOMContentLoaded", async () => {
  if (window.location.pathname.endsWith("/userProfile.html")) {
    const userID = getCookie("userID");

    await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID }),
    })
      .then((response) => response.json())
      .then((bookList) => {
        // console.log(user);
        const bookListContainer = document.getElementById(
          "cartBookListContainer"
        );

        for (const bookData of bookList) {
          const cardDiv = document.createElement("div");
          cardDiv.className = "col-sm-6 col-md-4 col-lg-3 card-img-top";

          const card = document.createElement("div");
          card.className = "card mx-1 my-1 p-1 bg-light";

          const imageElement = document.createElement("img");
          imageElement.src =
            "http://localhost:3000/images/" + bookData.imagename;
          imageElement.alt = "Card image cap";
          imageElement.className = "card-body";

          const cardBody = document.createElement("div");
          cardBody.className = "card-body";

          const titleElement = document.createElement("h5");
          titleElement.className = "card-title mb-1";
          titleElement.textContent = bookData.title;

          const authorElement = document.createElement("p");
          authorElement.className = "card-text text-muted mb-1";
          authorElement.textContent = bookData.author;

          const publicationYearElement = document.createElement("p");
          publicationYearElement.className = "card-text text-muted mb-2";
          publicationYearElement.textContent = `Publication : ${bookData.publisher}`;

          const priceElement = document.createElement("h6");
          priceElement.className = "card-subtitle mb-2 text-primary";
          priceElement.textContent = `$ ${bookData.price}`;

          const buttonElement = document.createElement("button");
          buttonElement.className = "btn btn-outline-primary btn-sm";
          buttonElement.textContent = "Remove from Cart";
          buttonElement.id = `${bookData._id}`;

          buttonElement.addEventListener("click", async (event) => {
            const buttonId = event.target.id;
            await fetch("/api/remove", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userID: getCookie("userID"),
                bookid: buttonId,
              })
            })
              .then((response) => {
                if (response.ok) {
                  setCookie("flag", "reload");
                  location.reload();
                  // cardDiv = "";
                } else {
                  console.error("Error:", response.statusText);
                }
              })
              .catch((error) => {
                console.error("Fetch error:", error);
              });

          });

          cardBody.appendChild(titleElement);
          cardBody.appendChild(authorElement);
          cardBody.appendChild(publicationYearElement);
          cardBody.appendChild(priceElement);
          cardBody.appendChild(buttonElement);

          card.appendChild(imageElement);
          card.appendChild(cardBody);

          cardDiv.appendChild(card);

          bookListContainer.appendChild(cardDiv);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

      const user_id = document.getElementById("user-icon");
      user_id.addEventListener("click", () => {
        window.location.href = "userProfile.html";
      });
  }
  const loginButton = document.getElementById("btn-login");
  const signupButton = document.getElementById("btn-signup");
  const logoutButton = document.getElementById("btn-logout");

  const token = getCookie("token");
  console.log(token);
  if (token != null) {
    loginButton.style.display = "none";
    signupButton.style.display = "none";
  } else {
    logoutButton.style.display = "none";
  }

  logoutButton.addEventListener("click", async () => {
    try {
      deleteCookie("token");
      deleteCookie("userID");
      window.location.href = "../index.html";
    } catch (error) {
      console.error("Error: ", error);
    }
  });
});
