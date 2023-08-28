const searchInput = document.getElementById("searchInput");
const suggestionsContainer = document.getElementById("suggestionsContainer");

// Simulated list of suggestions (replace with your dynamic data)
let suggestions = [];

// Function to update suggestions based on user input
function updateSuggestions(inputValue) {
  suggestionsContainer.innerHTML = "";
  const filteredSuggestions = suggestions.filter((suggestion) =>
    suggestion.toLowerCase().includes(inputValue.toLowerCase())
  );

  filteredSuggestions.forEach((suggestion) => {
    const suggestionItem = document.createElement("div");
    suggestionItem.classList.add("suggestion");
    suggestionItem.textContent = suggestion;

    suggestionItem.addEventListener("click", () => {
      searchInput.value = suggestion;
      suggestionsContainer.innerHTML = "";
    });

    suggestionsContainer.appendChild(suggestionItem);
  });
}

searchInput.addEventListener("input", async () => {
  const inputValue = searchInput.value;

  await fetch("/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ input: inputValue }),
  })
    .then((response) => response.json())
    .then((suggestionItem) => {
      suggestions = suggestionItem.map((suggestion) => suggestion.title);
      // console.log(suggestions);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  updateSuggestions(inputValue);
});

// Close suggestions when clicking outside
document.addEventListener("click", (event) => {
  if (!event.target.closest(".suggestions-container")) {
    suggestionsContainer.innerHTML = "";
  }
});

document.addEventListener("DOMContentLoaded", async () => {
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
  const profileButton = document.getElementById("btn-profile");

  const token = getCookie("token");
  // console.log(token);
  if (token != null) {
    loginButton.style.display = "none";
    signupButton.style.display = "none";
  } else {
    logoutButton.style.display = "none";
    profileButton.style.display = "none";
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

  const userID = getCookie("userID");
  const cartBooks = [];
  if(userID){
    await fetch("/api/cartids", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID }),
    })
    .then((response) => response.json())
    .then((cartids) => {
      for(const id of cartids){
        cartBooks.push(id.bookid);
      }
      // console.log(cartBooks);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }  

  await fetch("/listbook", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((bookList) => {
      const bookListContainer = document.getElementById("bookListContainer");

      // Loop through the book data and create cards for each book
      for (const bookData of bookList) {
        const cardDiv = document.createElement("div");
        cardDiv.className = "col-sm-6 col-md-4 col-lg-3 card-img-top";

        const card = document.createElement("div");
        card.className = "card mx-1 my-1 p-1 bg-light";

        const imageElement = document.createElement("img");
        imageElement.src = "http://localhost:3000/images/" + bookData.imagename;
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
        
        let flag = false;
        for(const id of cartBooks){
          if(id == bookData._id){
            flag = true;
            break;
          }
        }
        if(flag){
          buttonElement.textContent = "Remove from Cart";
        }
        else{
          buttonElement.textContent = "Add to Cart";
        }
        
        buttonElement.id = `${bookData._id}`;

        if(userID){
          buttonElement.addEventListener("click", async (event) => {
            
          // console.log(getCookie("userID"));
          const buttonId = event.target.id;
          if (buttonElement.textContent == "Add to Cart") {
            await fetch("/api/add", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userID: getCookie("userID"),
                bookid: buttonId,
              }),
            })
              .then((response) => {
                if (response.ok) {
                  buttonElement.textContent = "Remove from Cart";
                } else {
                  console.error("Error:", response.statusText);
                }
              })
              .catch((error) => {
                console.error("Fetch error:", error);
              });
          }
          else {
            await fetch("/api/remove", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userID: getCookie("userID"),
                bookid: buttonId,
              }),
            })
              .then((response) => {
                if (response.ok) {
                  buttonElement.textContent = "Add to Cart";
                } else {
                  console.error("Error:", response.statusText);
                }
              })
              .catch((error) => {
                console.error("Fetch error:", error);
              });
          }
        });
        }
     

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

  // searchbarInput

  document
    .getElementById("searchForm")
    .addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent the form from submitting traditionally

      const searchInput = document.getElementById("searchInput");
      const inputValue = searchInput.value; // Get the input value

      await fetch("/search/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: inputValue }),
      })
        .then((response) => response.json())
        .then((bookList) => {
          const bookListContainer =
            document.getElementById("bookListContainer");
          bookListContainer.innerHTML = " ";
          if (bookList.length !== 0) {
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
              buttonElement.textContent = "Add to Cart";
              buttonElement.id = `${bookData._id}`;

              buttonElement.addEventListener("click", async (event) => {
                // console.log(getCookie("userID"));
                const buttonId = event.target.id;
                if (buttonElement.textContent == "Add to Cart") {
                  // console.log("butoon apna: " + buttonId);
                  // console.log("Button clicked for book with ID:", buttonId);
                  // console.log("Book Title:", bookData.title);
                  await fetch("/api/add", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      userID: getCookie("userID"),
                      bookid: buttonId,
                    }),
                  })
                    .then((response) => {
                      if (response.ok) {
                        // Handle successful response
                        buttonElement.textContent = "Added to Cart";
                      } else {
                        // Handle error response (e.g., response.status !== 200)
                        console.error("Error:", response.statusText);
                      }
                    })
                    .catch((error) => {
                      console.error("Fetch error:", error);
                    });
                } else {
                  await fetch("/api/remove", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      userID: getCookie("userID"),
                      bookid: buttonId,
                    }),
                  })
                    .then((response) => {
                      if (response.ok) {
                        // Handle successful response
                        buttonElement.textContent = "Add to Cart";
                      } else {
                        // Handle error response (e.g., response.status !== 200)
                        console.error("Error:", response.statusText);
                      }
                    })
                    .catch((error) => {
                      console.error("Fetch error:", error);
                    });
                }
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
          } else {
            const card = document.createElement("div");
            card.classList.add("card");

            // Create the card body
            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body");

            // Create card title
            const cardTitle = document.createElement("h5");
            cardTitle.classList.add("card-title");
            cardTitle.textContent = "Book Not Found";

            // Create card text
            const cardText = document.createElement("p");
            cardText.classList.add("card-text");
            cardText.textContent =
              "Sorry, the book you're looking for could not be found.";

            // Append card title and text to the card body
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardText);

            // Append card body to the card
            card.appendChild(cardBody);

            // Append the card to the bookListContainer
            bookListContainer.appendChild(card);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
});

const user_id = document.getElementById("user-icon");
user_id.addEventListener("click", () => {
  window.location.href = "./user/userProfile.html";
});

function myFunction() {
  // console.log("my funciotn called");
    let flag = getCookie("flag");
    // console.log(flag);
    if (flag == "reload") {
    
        location.reload();
        setCookie("flag", "dontreload");
    }
    else if(!flag){
      location.reload();
      setCookie("flag", "dontreload");
    }
}

window.addEventListener('pageshow', myFunction);
