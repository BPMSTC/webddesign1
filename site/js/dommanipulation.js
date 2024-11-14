// Assignment: DOM Manipulation with JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // 1. Change the main title of the page
  // Hint: Use getElementById and change the textContent
  document.getElementById("main-title").textContent =
    "Welcome to Our Amazing Website";

  // 2. Add a new item to the navigation menu
  // Hint: Use querySelector to select the ul, createElement to create a new li, and appendChild to add it
  const navList = document.querySelector("#nav-list");
  const newItem = document.createElement("li");
  newItem.innerHTML = '<a href="#services">Services</a>';
  navList.appendChild(newItem);

  // 3. Modify the "About Us" text
  // Hint: Use getElementById and change the textContent
  document.getElementById("about-text").textContent =
    "We are a company that strives for excellence in web development and design.";

  // 4. Add an event listener to the "Read More" button that shows an alert when clicked
  // Hint: Use getElementById to select the button, then addEventListener to attach a click event
  document
    .getElementById("read-more-btn")
    .addEventListener("click", function () {
      alert("Thank you for your interest! Stay tuned for more information.");
    });

  // 5. Change the background color of the header when the mouse hovers over it
  // Hint: Use querySelector to select the header, then addEventListener for 'mouseover' and 'mouseout' events
  const header = document.querySelector("header");
  header.addEventListener("mouseover", function () {
    header.style.backgroundColor = "#555";
  });
  header.addEventListener("mouseout", function () {
    header.style.backgroundColor = "#333";
  });

  // 6. Create a function that adds a new product to the product list
  // Hint: This function should take a product name as a parameter, create a new li element, and append it to the product list
  function addProduct(productName) {
    const productList = document.querySelector("#product-list ul");
    const newProduct = document.createElement("li");
    newProduct.textContent = productName;
    productList.appendChild(newProduct);
  }

  // 7. Use a loop to add three new products to the product list using the function from step 6
  // Hint: Create an array of product names and use a for...of loop to add each one
  const newProducts = ["Product 4", "Product 5", "Product 6"];
  for (const product of newProducts) {
    addProduct(product);
  }

  // 8. Implement the color change functionality for the "Change Color" button
  // Hint: Use addEventListener and change the backgroundColor style of the color-box
  // You can use this function to generate a random color:
  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  document
    .getElementById("change-color-btn")
    .addEventListener("click", function () {
      document.getElementById("color-box").style.backgroundColor =
        getRandomColor();
    });

  // 9. Implement the counter functionality
  // Hint: Use let to declare a count variable, then use event listeners on the increment and decrement buttons to change the count and update the text
  let count = 0;
  const countDisplay = document.getElementById("count");
  document
    .getElementById("increment-btn")
    .addEventListener("click", function () {
      count++;
      countDisplay.textContent = count;
    });
  document
    .getElementById("decrement-btn")
    .addEventListener("click", function () {
      count--;
      countDisplay.textContent = count;
    });

  // 10. Add a keyboard event listener that changes the background color of the body when a key is pressed
  // Hint: Use document.addEventListener('keydown', function(event) { ... })
  document.addEventListener("keydown", function (event) {
    document.body.style.backgroundColor = getRandomColor();
  });

  // Bonus Challenge:
  // Create a function that changes the text of all paragraphs to be uppercase when double-clicked
  // Hint: Use querySelectorAll to select all paragraphs, then use forEach to add a dblclick event listener to each one
  const paragraphs = document.querySelectorAll("p");
  paragraphs.forEach((paragraph) => {
    paragraph.addEventListener("dblclick", function () {
      paragraph.textContent = paragraph.textContent.toUpperCase();
    });
  });
});
