// This function creates and appends a book card to the specified parent element

function createBookCard(parent, bookData) {
  const cardDiv = document.createElement("div");
  cardDiv.className = "col-sm-6 col-md-4 col-lg-3 mb-3 book-card";

  const card = document.createElement("div");
  card.className = "card h-100";

  const imageElement = document.createElement("img");
  imageElement.src = "http://localhost:3000/images/" + bookData.imagename;
  imageElement.alt = "Book cover";
  imageElement.className = "card-img-top";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const titleElement = document.createElement("h5");
  titleElement.className = "card-title";
  titleElement.textContent = bookData.title;

  const authorElement = document.createElement("p");
  authorElement.className = "card-text text-muted";
  authorElement.textContent = `Author: ${bookData.author}`;

  const priceElement = document.createElement("h6");
  priceElement.className = "card-subtitle text-primary";
  priceElement.textContent = `$ ${bookData.price}`;

  const buttonElement = document.createElement("button");
  buttonElement.className = "btn btn-outline-primary btn-sm";
  buttonElement.textContent = "Add to Cart";
  buttonElement.id = `${bookData._id}`;

  cardBody.appendChild(titleElement);
  cardBody.appendChild(authorElement);
  cardBody.appendChild(priceElement);
  cardBody.appendChild(buttonElement);

  card.appendChild(imageElement);
  card.appendChild(cardBody);

  cardDiv.appendChild(card);
  parent.appendChild(cardDiv);

  // Display reviews outside the card
  const reviewsDiv = document.createElement("div");
  reviewsDiv.className = "reviews";
  if (bookData.reviews && bookData.reviews.length > 0) {
    reviewsDiv.innerHTML = "<h6>Reviews:</h6>";
    bookData.reviews.forEach((review) => {
      const reviewElement = document.createElement("p");
      reviewElement.className = "review";
      reviewElement.textContent = `Rating: ${review.user_rating}, Comment: ${review.comment}`;
      reviewsDiv.appendChild(reviewElement);
    });
    parent.appendChild(reviewsDiv);
  }
}

// Simulated book data with reviews
const bookData = {
  _id: "123",
  title: "Book Title",
  author: "Author Name",
  publisher: "Publisher Name",
  price: 20,
  imagename: "ic_user.png",
  reviews: [
    { user_rating: 4, comment: "Great book!" },
    { user_rating: 5, comment: "Loved it!" },
  ],
};

// Get the parent element where you want to append the book cards
const bookListParent = document.getElementById("bookList");

// Call the function to create and append the book card
createBookCard(bookListParent, bookData);

document.addEventListener("DOMContentLoaded", async () => {
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
});
const user_id = document.getElementById("user-icon");
user_id.addEventListener("click", () => {
  window.location.href = "../user/userProfile.html";
});
