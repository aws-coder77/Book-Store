document.addEventListener("DOMContentLoaded", () => {
  const cardImgTops = document.querySelectorAll(".card-img-top");

  cardImgTops.forEach((cardImgTop) => {
    cardImgTop.addEventListener("click", async () => {
      try {
        const response = await fetch("/api/data");
        const data = await response.json();
        window.location.href = `bookreview/bookreview.html?`;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    });
  });
});
