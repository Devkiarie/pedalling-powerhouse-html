// Premium bike and accessory data
const products = [
  {
    id: 1,
    name: "Mountain Explorer Pro",
    category: "Bicycle",
    price: 168870,
    description: "Professional mountain bike designed for Kenya's rugged terrains, with a lightweight aluminum frame and advanced suspension for trails in Aberdare or Tsavo.",
    image: "/assets/mountain-bike.jpg",
  },
  {
    id: 2,
    name: "Urban Commuter Elite",
    category: "Bicycle",
    price: 116870,
    description: "Elegant city bicycle built for Nairobi's bustling streets, featuring ergonomic geometry and durable components for daily commuting.",
    image: "https://images.unsplash.com/photo-1485965127652-5d4194b46371?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 3,
    name: "Premium Safety Helmet",
    category: "Accessory",
    price: 6500,
    description: "High-quality safety helmet designed for Kenyan cyclists, offering superior protection for urban and trail rides.",
    image: "https://images.unsplash.com/photo-1594732974487-8f22eb6a34e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 4,
    name: "Electric Power Cruiser",
    category: "Bicycle",
    price: 298870,
    description: "Premium electric bicycle with integrated battery, perfect for Kenya's urban mobility needs in cities like Nairobi and Mombasa.",
    image: "https://images.unsplash.com/photo-1605009969380-5f4c8c5b6b0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 5,
    name: "Heavy-Duty Bike Lock",
    category: "Accessory",
    price: 3250,
    description: "Robust bike lock to secure your bicycle in busy Kenyan markets or urban areas like Nairobi's CBD.",
    image: "https://images.unsplash.com/photo-1622736763789-8a7c7b9c6631?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 6,
    name: "Adventure Hybrid",
    category: "Bicycle",
    price: 155870,
    description: "Versatile hybrid bicycle for Kenya's urban and rural adventures, perfect for exploring Nairobi's outskirts or Kisumu's lakeside paths.",
    image: "https://images.unsplash.com/photo-1512287814451-272b6f91e213?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
  },
];

let cart = [];
let currentSection = "hero";

// Update current year in footer
function updateCurrentYear() {
  const year = new Date().getFullYear();
  document.getElementById("current-year").textContent = year;
}

// Initialize
function init() {
  displayProducts();
  updateCartDisplay();
  setupNavigation();
  setupHamburger();
  setupThemeToggle();
  updateCurrentYear();
  showSection("hero");
  document.querySelectorAll(".fade-in").forEach((el) => el.classList.add("fade-in"));
}

// Display products
function displayProducts() {
  const productsGrid = document.getElementById("products-grid");
  productsGrid.innerHTML = products
    .map(
      (product) => `
        <div class="product-card fade-in">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" class="product-image">
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">KES ${product.price.toLocaleString()}</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        </div>
    `
    )
    .join("");
}

// Add to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartDisplay();
  showNotification("Added to cart");
}

// Update cart display
function updateCartDisplay() {
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  document.getElementById("cart-count").textContent = cartCount;
  document.getElementById("cart-total").textContent = cartTotal.toLocaleString();
  document.getElementById("cart-badge").textContent = cartCount;

  displayCartItems();
  displayCheckout();
}

// Display cart items
function displayCartItems() {
  const cartItemsDiv = document.getElementById("cart-items");

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = `
            <div class="empty-state">
                <h3>Your cart is empty</h3>
                <p>Add some bicycles or accessories to get started</p>
            </div>
        `;
    return;
  }

  const cartHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-category">${item.category}</div>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn decrease" onclick="updateQuantity(${item.id}, -1)">−</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn increase" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <div class="cart-item-price">KES ${(item.price * item.quantity).toLocaleString()}</div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `
    )
    .join("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartItemsDiv.innerHTML =
    cartHTML +
    `
        <div class="cart-total">
            <div class="total-amount">Total: KES ${total.toLocaleString()}</div>
            <button class="checkout-btn" onclick="showSection('checkout')">Proceed to Checkout</button>
        </div>
    `;
}

// Display checkout
function displayCheckout() {
  const checkoutContent = document.getElementById("checkout-content");

  if (cart.length === 0) {
    checkoutContent.innerHTML = `
            <div class="empty-state">
                <h3>Nothing to checkout</h3>
                <p>Add some bicycles or accessories to your cart first</p>
            </div>
        `;
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const now = new Date();
  const dateTime = now.toLocaleString("en-US", {
    timeZone: "Africa/Nairobi",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  checkoutContent.innerHTML = `
        <form class="checkout-form" onsubmit="placeOrder(event)">
            <h3 style="font-size: 24px; font-weight: 600; margin-bottom: 20px; color: #1a1a1a;">Order Summary</h3>
            <p style="font-size: 14px; color: #8c8c8c; margin-bottom: 20px;">Order placed on: ${dateTime}</p>
            
            ${cart
              .map(
                (item) => `
                <div style="display: flex; justify-content: space-between; padding: 15px 0; border-bottom: 1px solid #e0e0e0;">
                    <span style="font-size: 16px;">${item.name} × ${item.quantity}</span>
                    <span style="font-size: 16px; font-weight: 500;">KES ${(item.price * item.quantity).toLocaleString()}</span>
                </div>
            `
              )
              .join("")}
            
            <div style="display: flex; justify-content: space-between; padding: 20px 0; font-size: 20px; font-weight: 700; border-top: 2px solid #e0e0e0;">
                <span>Total</span>
                <span>KES ${total.toLocaleString()}</span>
            </div>

            <h3 style="font-size: 24px; font-weight: 600; margin: 30px 0 20px 0; color: #1a1a1a;">Delivery Information</h3>
            
            <div class="form-row">
                <div class="form-group">
                    <label>First Name</label>
                    <input type="text" name="firstName" required>
                </div>
                <div class="form-group">
                    <label>Last Name</label>
                    <input type="text" name="lastName" required>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" name="email" required>
                </div>
                <div class="form-group">
                    <label>Phone</label>
                    <input type="tel" name="phone" required pattern="[0-9]{10}">
                </div>
            </div>
            
            <div class="form-group">
                <label>Address Line 1</label>
                <input type="text" name="address1" required>
            </div>
            
            <div class="form-group">
                <label>Address Line 2</label>
                <input type="text" name="address2">
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label>City</label>
                    <input type="text" name="city" required>
                </div>
                <div class="form-group">
                    <label>County</label>
                    <input type="text" name="county" required>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label>Postal Code</label>
                    <input type="text" name="postalCode" pattern="[0-9]{5}">
                </div>
                <div class="form-group">
                    <label>Country</label>
                    <input type="text" value="Kenya" readonly>
                </div>
            </div>
            
            <div class="form-group">
                <label>Delivery Instructions</label>
                <textarea rows="3" name="instructions" placeholder="Any special delivery instructions for your location in Kenya?"></textarea>
            </div>
            
            <div style="margin-top: 20px; font-size: 14px; color: #8c8c8c; text-align: center; padding: 15px; background: #f5f5f5; border-radius: 8px;">
                <strong>How to Order:</strong><br>
                1. Add items to your cart from the Shop section.<br>
                2. Fill in your delivery details above.<br>
                3. Click "Place Order via WhatsApp" to send your order to our team.<br>
                4. Our team will confirm your order and delivery timeline via WhatsApp.<br>
                <em>Note: Ensure you have WhatsApp installed and a stable internet connection.</em>
            </div>
            
            <button type="submit" class="place-order-btn">Place Order via WhatsApp</button>
        </form>
    `;
}

// Update quantity
function updateQuantity(productId, change) {
  const item = cart.find((item) => item.id === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      updateCartDisplay();
    }
  }
}

// Remove from cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCartDisplay();
  showNotification("Item removed");
}

// Place order via WhatsApp
function placeOrder(event) {
  event.preventDefault();

  const form = event.target;
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const formData = new FormData(form);
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const address1 = formData.get("address1");
  const address2 = formData.get("address2") || "";
  const city = formData.get("city");
  const county = formData.get("county");
  const postalCode = formData.get("postalCode") || "Not provided";
  const instructions = formData.get("instructions") || "None";

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const now = new Date();
  const dateTime = now.toLocaleString("en-US", {
    timeZone: "Africa/Nairobi",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  let message = `New Order from ${firstName} ${lastName}\n\n`;
  message += `Order Date & Time: ${dateTime}\n`;
  message += `Order Details:\n${cart
    .map(
      (item) =>
        `- ${item.name} (${item.quantity}) - KES ${(item.price * item.quantity).toLocaleString()}`
    )
    .join("\n")}\n\n`;
  message += `Total: KES ${total.toLocaleString()}\n\n`;
  message += `Customer Details:\nName: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address1}${
    address2 ? ", " + address2 : ""
  }, ${city}, ${county}, ${postalCode}, Kenya\nDelivery Instructions: ${instructions}`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/+254757121320?text=${encodedMessage}`;

  cart = [];
  updateCartDisplay();
  window.location.href = whatsappUrl;
}

// Open WhatsApp Chat
function openWhatsAppChat() {
  if (cart.length > 0) {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const now = new Date();
    const dateTime = now.toLocaleString("en-US", {
      timeZone: "Africa/Nairobi",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    let message = `Inquiry from Pedalling Powerhouse\n\n`;
    message += `Order Date & Time: ${dateTime}\n`;
    message += `Cart Details:\n${cart
      .map(
        (item) =>
          `- ${item.name} (${item.quantity}) - KES ${(item.price * item.quantity).toLocaleString()}`
      )
      .join("\n")}\n\n`;
    message += `Total: KES ${total.toLocaleString()}\n`;
    message += `Please assist with my order or inquiry.`;
    const encodedMessage = encodeURIComponent(message);
    window.location.href = `https://wa.me/+254757121320?text=${encodedMessage}`;
  } else {
    window.location.href = `https://wa.me/+254757121320?text=Hello, I’m interested in products from Pedalling Powerhouse. Please assist me!`;
  }
}

// Show notification
function showNotification(message) {
  const notification = document.getElementById("notification");
  notification.querySelector("span").textContent = message;
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

// Show a section
function showSection(sectionId) {
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.add("hidden");
  });

  const section = document.getElementById(`${sectionId}-section`);
  if (section) {
    section.classList.remove("hidden");
  }

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("data-section") === sectionId
    );
  });

  document.getElementById("nav-links").classList.remove("active");
  document.getElementById("hamburger").classList.remove("active");

  window.scrollTo(0, 0);
}

// Setup navigation
function setupNavigation() {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const section = this.getAttribute("data-section");
      showSection(section);
    });
  });
}

// Setup hamburger menu
function setupHamburger() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
    const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
    hamburger.setAttribute("aria-expanded", !isExpanded);
  });

  document.addEventListener("click", (event) => {
    const isClickInsideNav = navLinks.contains(event.target) || hamburger.contains(event.target);
    if (!isClickInsideNav && navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
    }
  });
}

// Setup theme toggle
function setupThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  themeToggle.addEventListener("click", toggleDarkMode);
}

function toggleDarkMode() {
  const themeToggle = document.getElementById("theme-toggle");
  const isDarkMode = document.body.classList.toggle("dark-mode");
  const sunIcon = themeToggle.querySelector(".fa-sun");
  const moonIcon = themeToggle.querySelector(".fa-moon");

  if (sunIcon && moonIcon) {
    sunIcon.style.display = isDarkMode ? "none" : "inline";
    moonIcon.style.display = isDarkMode ? "inline" : "none";
  }
  localStorage.setItem("darkMode", isDarkMode);
}

window.onload = () => {
  const themeToggle = document.getElementById("theme-toggle");
  const sunIcon = themeToggle.querySelector(".fa-sun");
  const moonIcon = themeToggle.querySelector(".fa-moon");

  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
    if (sunIcon && moonIcon) {
      sunIcon.style.display = "none";
      moonIcon.style.display = "inline";
    }
  }
  init();
};