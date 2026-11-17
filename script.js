let cartCount = 0;

const cartCounter = document.getElementById("cart-count");
// Shopping Bag
let bag = [];

const bagItems = document.getElementById("cart-items");
const bagTotal = document.getElementById("cart-total");

const addButtons = document.querySelectorAll(".add-btn");

// ADD TO BAG

addButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const product = button.closest(".product-card");

        const name = product.querySelector("h3").textContent;
        const price = parseFloat(
            product.querySelector("p").textContent.replace("$", "")
        );
        const image = product.querySelector("img").src;

        let found = bag.find(function(item) {
            return item.name === name;
        });

        if (found) {
            found.quantity++;
        } else {
            bag.push({
                name: name,
                price: price,
                image: image,
                quantity: 1
            });
        }

        
        showBag();

        button.textContent = "Added ✓";

        setTimeout(function() {
            button.textContent = "Add to Bag +";
        }, 1000);

    });

});


// SHOW PRODUCTS IN BAG

function showBag() {

    bagItems.innerHTML = "";

    let total = 0;
    let count = 0;

    bag.forEach(function(item, index) {

        total += item.price * item.quantity;
        count += item.quantity;

        const productDiv = document.createElement("div");
        const productImage = document.createElement("img");
        const productName = document.createElement("h3");
        const productPrice = document.createElement("p");
        const productQuantity = document.createElement("span");

        const plusButton = document.createElement("button");
        const minusButton = document.createElement("button");
        const removeButton = document.createElement("button");

        productDiv.className = "cart-item";

        productImage.src = item.image;
        productImage.alt = item.name;

        productName.textContent = item.name;
        productPrice.textContent = "$" + item.price.toFixed(2);
        productQuantity.textContent = item.quantity;

        plusButton.textContent = "+";
        minusButton.textContent = "-";
        removeButton.textContent = "Remove";

        plusButton.className = "plus-btn";
        minusButton.className = "minus-btn";
        removeButton.className = "remove-btn";

        plusButton.dataset.index = index;
        minusButton.dataset.index = index;
        removeButton.dataset.index = index;

        productDiv.appendChild(productImage);
        productDiv.appendChild(productName);
        productDiv.appendChild(productPrice);
        productDiv.appendChild(minusButton);
        productDiv.appendChild(productQuantity);
        productDiv.appendChild(plusButton);
        productDiv.appendChild(removeButton);

        bagItems.appendChild(productDiv);

    });

    cartCounter.textContent = count;
    bagTotal.textContent = total.toFixed(2);

}


const categoryButtons = document.querySelectorAll(".category-btn");

const products = document.querySelectorAll(".product-card");

categoryButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        categoryButtons.forEach(function(btn) {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        const selectedCategory = button.getAttribute("data-category");

        products.forEach(function(product) {

            const productCategory = product.getAttribute("data-category");

            if (
                selectedCategory === "all" ||
                selectedCategory === productCategory
            ) {

                product.style.display = "block";

            } else {

                product.style.display = "none";

            }

        });

    });

});
// OPEN AND CLOSE SHOPPING BAG

const cartButton = document.getElementById("cart-button");
const cartOverlay = document.getElementById("cart-overlay");
const closeCart = document.getElementById("close-cart");

if (cartButton && cartOverlay) {

    cartButton.addEventListener("click", function() {
        cartOverlay.classList.add("open");
    });

}

if (closeCart && cartOverlay) {

    closeCart.addEventListener("click", function() {
        cartOverlay.classList.remove("open");
    });

}

if (cartOverlay) {

    cartOverlay.addEventListener("click", function(event) {

        if (event.target === cartOverlay) {
            cartOverlay.classList.remove("open");
        }

    });

}
// QUANTITY AND REMOVE BUTTONS

bagItems.addEventListener("click", function(event) {

    const index = Number(event.target.dataset.index);

    if (event.target.classList.contains("plus-btn")) {
        bag[index].quantity++;
    }

    else if (event.target.classList.contains("minus-btn")) {

        bag[index].quantity--;

        if (bag[index].quantity <= 0) {
            bag.splice(index, 1);
        }

    }

    else if (event.target.classList.contains("remove-btn")) {
        bag.splice(index, 1);
    }

    else {
        return;
    }

    showBag();

});
// CLEAR CART

const clearCartButton = document.getElementById("clear-cart");

clearCartButton.addEventListener("click", function() {

    bag = [];

    showBag();

});