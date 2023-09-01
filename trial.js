let cart = [];
let index = 0;
let totalPrice=0 , totalItems=0;
// add items to cart
let buttons = document.querySelectorAll(".buy-product");
buttons.forEach(function (button) {
  button.addEventListener("click", function (event) {
    const quantity = event.target.previousElementSibling.value;
    const price = event.target.dataset.price;
    const name = event.target.dataset.name;
    index++;
    let item = { name: name, price: price, quantity: quantity, itemNum: index };
    cart.push(item);
    totalItems+=parseInt(quantity);
    totalPrice+=quantity*price;

    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
    localStorage.setItem("totalItems", JSON.stringify(totalItems));
    console.log(cart+" "+totalItems+" "+totalPrice);
  });
});


let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
let cartItems1 = JSON.parse(localStorage.getItem("totalPrice")) || 0;
let cartItems2 = JSON.parse(localStorage.getItem("totalItems")) || 0;


// render cart items and total and its functionality 
function displayCart() {
  let container = document.getElementById("cart-items");
  container.innerHTML = "";

  var formatter = new Intl.NumberFormat('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
  totalPrice=formatter.format(totalPrice);

  let total = document.getElementById("total");
  total.textContent = "Total: "+totalPrice;
  let itemstotal = document.getElementById("totalItems");
  itemstotal.textContent = "Item in Cart: "+totalItems;

  cartItems.forEach(function (item, index) {
    let itemBox = document.createElement("div");
    itemBox.id = "newElement";

    let itemName = document.createElement("h3");
    itemName.id = "itemName";
    itemName.textContent = item.name;

    let itemQuantity = document.createElement("p");
    itemQuantity.id = "itemQuantity";

    if (item.quantity>1){
        itemQuantity.textContent = parseFloat(item.quantity).toFixed(2)+ "Grams";
    }
    else{
        itemQuantity.textContent = parseInt(item.quantity).toFixed(2)+ "Gram";
    }

    let itemPrice = document.createElement("p");
    itemPrice.id = "itemPrice";
    itemPrice.textContent = item.price;

    let removeButton = document.createElement("button");
    removeButton.setAttribute("data-price", parseFloat(item.price).toFixed(2));
    removeButton.setAttribute("data-quantity", parseInt(item.quantity));
    removeButton.setAttribute("data-indexnum", index);
    removeButton.id = "removeButton";
    removeButton.textContent = "Remove";

    let total = document.getElementById("total");
    total.innerHTML ="Total: "+ parseFloat(cartItems1);
    let itemstotal = document.getElementById("totalItems");
    itemstotal.innerHTML ="Item in Cart: "+ parseInt(cartItems2);

    removeButton.addEventListener("click", function (event) {
      let itemIndex = event.target.dataset.indexnum;
      cartItems.splice(itemIndex, 1);
      localStorage.setItem("cart", JSON.stringify(cartItems));

      cartItems1 -= parseFloat(event.target.dataset.price * event.target.dataset.quantity );
      cartItems2 -= parseInt(event.target.dataset.quantity);

      displayCart();
    });

    itemBox.appendChild(itemName);
    itemBox.appendChild(itemQuantity);
    itemBox.appendChild(itemPrice);
    itemBox.appendChild(removeButton);
    container.appendChild(itemBox);
  });
}

displayCart();

// clear cart after check out
let checkOut=document.getElementById("clear");
checkOut.addEventListener("click",function clearInterval(){
    localStorage.removeItem("cart");
    localStorage.removeItem("totalPrice");
    localStorage.removeItem("totalItems");
    location.reload("true");
});
