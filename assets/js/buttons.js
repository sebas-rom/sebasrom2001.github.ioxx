const button = document.getElementById("show-more-services");

button.addEventListener("click", function() {
  if (button.textContent === "SHOW MORE") {
    button.textContent = "SHOW LESS";
  } else {
    button.textContent = "SHOW MORE";
  }
});
