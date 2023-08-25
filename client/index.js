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
      console.log(suggestions);
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
      window.location.href = "index.html";
    } catch (error) {
      console.error("Error: ", error);
    }
  });
  // await fetch("/listbook", {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // })
  //   .then((response) => response.json())
  //   .then((books) => {
  //     // suggestions = books.map((suggestion) => suggestion.title);
  //     console.log(books);
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //   });
});
