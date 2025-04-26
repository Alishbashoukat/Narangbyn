
// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCqeGYlQTO0Q55Ndy9EYp7q0AulIYhDLpA",
  authDomain: "femhack-9fae5.firebaseapp.com",
  databaseURL: "https://femhack-9fae5-default-rtdb.firebaseio.com",
  projectId: "femhack-9fae5",
  storageBucket: "femhack-9fae5.appspot.com",
  messagingSenderId: "1008278968390",
  appId: "1:1008278968390:web:aaf0bb78cda3efe9979247",
  measurementId: "G-NPMYDDBLRJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

// Product Data
const products = [
  { id: 1, name: "pink Shirt", price: 2000, image: "girl2.jpg" },
  { id: 2, name: "floral summer dress", price: 4500, image: "girl3.jpg" },
  { id: 3, name: "white dress", price: 3500, image: "girl11.jpg" },
  { id: 4, name: "Black Casual dress", price: 3200, image: "Hassine Creations.jpg" },
  { id: 5, name: "Formal White Shirt", price: 2500, image: "girl4.jpg" },
  { id: 6, name: "pink long kurti", price: 3000, image: "girl5.jpg" },
  { id: 7, name: "Pastel Pink Kurti", price: 2800, image: "girl6.jpg" },
  { id: 8, name: "Afsana", price: 5500, image: "girl7.jpg" },
  { id: 9, name: "Printed Silk ", price: 1500, image: "girl8.jpg" },
  { id: 10, name: "pink floral dress", price: 2200, image: "girl9.jpg" }
];

let cartCount = 0;

const productList = document.getElementById('product-list');
const cartCounter = document.getElementById('cart-count');

// Display Products
products.forEach(product => {
  const productCard = document.createElement('div');
  productCard.className = 'product';
  productCard.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>PKR ${product.price}</p>
    <button onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
  `;
  productList.appendChild(productCard);
});

// Add to Cart
window.addToCart = function(product) {
  cartCount++;
  cartCounter.textContent = cartCount;

  const cartRef = ref(db, 'cart');
  push(cartRef, {
    productId: product.id,
    name: product.name,
    price: product.price
  });
};

// Slider Logic
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');

function showSlides() {
  slides.forEach((slide, idx) => {
    slide.classList.remove('active');
    if (idx === slideIndex) {
      slide.classList.add('active');
    }
  });
  slideIndex = (slideIndex + 1) % slides.length;
}

setInterval(showSlides, 3000);

// Feedback Form Submission
document.getElementById('feedback-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  const feedbackRef = ref(db, 'feedback');
  push(feedbackRef, {
    name: name,
    email: email,
    message: message
  }).then(() => {
    alert('Feedback submitted successfully!');
    document.getElementById('feedback-form').reset();
  }).catch(error => {
    console.error('Error submitting feedback:', error);
  });
});
