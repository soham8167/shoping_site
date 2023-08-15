


let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
cartIcon.onclick = () => {
  cart.classList.add("active");
  document.getElementById("cart-icon").style.visibility="hidden";
};
closeCart.onclick = () => {
  cart.classList.remove("active");
  document.getElementById("cart-icon").style.visibility="visible";
};
//making add to cart
if (document.readyState == 'loading') {
  document.addEventListener("DOMContentLoaded", ready);

}
else {
  ready()
}
//login from
const fromOpenBtn=document.querySelector("#form_open"),
home=document.querySelector(".home"),
formContainer=document.querySelector(".form_container"),
removeIconBtn=document.querySelector(".remove_icon"),
signupBtn=document.querySelector("#signup"),
loginBtn=document.querySelector("#login"),
pwShowHide=document.querySelectorAll(".pw_hide");

fromOpenBtn.addEventListener("click", () => home.classList.add("show"));
removeIconBtn.addEventListener("click", () => home.classList.remove("show"));

pwShowHide.forEach((icon) => {
  icon.addEventListener("click",()=>{
  let getPwInput=icon.parentElement.querySelector("input");
  if(getPwInput.type==="password"){
    getPwInput.type="text";
    icon.classList.replace("bx-bxs-hide ","pw_hide")
  }
  else{
    getPwInput.type="password";
    icon.classList.replace("pw_hide","bx-bxs-hide")
  }
});
});

signupBtn.addEventListener("click", (e)=>{
  e.preventDefault();
  formContainer.classList.add("active");

});
loginBtn.addEventListener("click", (e)=>{
  e.preventDefault();
  formContainer.classList.remove("active");

});
//making function
function ready() {
  //remove item from cart
  var removeCartButtons = document.getElementsByClassName("cart-remove");
  for (var i = 0; i < removeCartButtons.length; i++) {
    var buttons = removeCartButtons[i];
    buttons.addEventListener("click", removeCartItem);
  }
  //Quantity change
  var quantityInputs = document.getElementsByClassName("cart-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }
  //add to cart
  var addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i];
    button.addEventListener("click", addCartClicked);
  }
  loadCartItems();
}
//remove cart item
function removeCartItem(event) {
  var buttonclicked = event.target;
  buttonclicked.parentElement.remove();
  updatetotal();
  saveCartItems();
}
//quantity change
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updatetotal();
  saveCartItems();
  updateCartIcon();
}
// add cart function
function addCartClicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  var price = shopProducts.getElementsByClassName("price")[0].innerText;
  var productimg = shopProducts.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, productimg);
  updatetotal();
  saveCartItems();
  updateCartIcon();
}
function addProductToCart(title, price, productimg) {
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemsNames = cartItems.getAttributeNames("cart-product-title");
  for (var i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert('You have already added this item to cart');
      return;
    }
  }
  var cartBoxContent = `
  <img src="${productimg}" alt="" class="cart-img" />
  <div class="detail-box">
    <div class="cart-product-title">${title}</div>
    <div class="cart-price">${price}</div>
    <input type="number" name="" id="" value="1" class="cart-quantity">
  </div>
  <i class="bx bxs-trash-alt cart-remove"></i>`
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox.getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox.getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);
  saveCartItems();
  updateCartIcon();
}


//update total
function updatetotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantity = quantityElement.value;
    total += price * quantity;
  }
  //if price content some cents
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("total-price")[0].innerText = '$' + total;
  // save total to localstorage
  localStorage.setItem("cartTotal", total);
}

//keep item in cart when page refresh with localstorage
function saveCartItems() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var cartItems = [];
  for (var i = 0; i < cartBoxes.length; i++) {
    cartBox = cartBoxes[i];
    var titleElement = cartBox.getElementsByClassName("cart-product-title")[0];
    var priceElement = cart.getElementsByClassName("cart-price")[0];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var productimg = cartBox.getElementsByClassName("cart-img")[0].src;
    var item = {
      title: titleElement.innerText,
      price: priceElement.innerText,
      quantity: quantityElement.value,
      productImg: productimg,

    };
    cartItems.push(item);

  }
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}
//loads in cart
function loadCartItems() {
  var cartItems = localStorage.getItem("cartItems");
  if (cartItems) {
    cartItems = JSON.parse(cartItems);
    for (var i = 0; i < cartItems.length; i++) {
      var item = cartItems[i];
      addProductToCart(item.title, item.price, item.productImg);
      var cartBoxes = document.getElementsByClassName("cart-box");
      var cartBox = cartBoxes[cartBoxes.length - 1];
      var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
      quantityElement.value = item.quantity;
    }
  }
  var cartTotal = localStorage.getItem("cartTotal");
  if (cartTotal) {
    document.getElementsByClassName("total-price")[0].innerText = "$" + cartTotal;
  }
  updateCartIcon();
}

//quantity in cart icon
function updateCartIcon() {
  var cartBoxes = document.getElementsByClassName("cart-box");
  var quantity = 0;
  for (var i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    quantity += parseInt(quantityElement.value);
  }
  var cartIcon = document.querySelector("#cart-icon");
  cartIcon.setAttribute("data-quantity", quantity);

}



///data store coding

function signup() {
  const username = document.getElementById("email").value;
  const password = document.getElementById("password").value;
var signup_form =document.getElementById("signup-form");
  const con_password = document.getElementById("con-password").value;

  if (username.trim() === "" || password.length < 6) 
  {
    alert("Please enter a valid username and password (password should be at least 6 characters long).");
    return;
  }
else if(password != con_password)
{
alert("password and confirm password not matched");
return;
}
  localStorage.setItem("user" + username, JSON.stringify({
    username: username,
    password: password,
    conpassword: con_password
  }));
  sessionStorage.setItem("user" + username, JSON.stringify({
    username: username,
    password: password,
    conpassword: con_password
  }));
  // Hide the signup form and show the content after successful signup
  window.location = "available.html";
  signup_form.reset();

  alert("data saved");
}


//LOGIN CUSTOM CODING

function login() {
  var name = document.getElementById("l-username").value;
  var pwd = document.getElementById("l-password").value;
  // var user_details = localStorage.key(i);
  sessionStorage.setItem("user","user");
  if (localStorage.getItem("user" + name) != null) {

    var data = JSON.parse(localStorage.getItem("user" + name));
    
    if (data.username.trim() === name) {

      if (data.password === pwd) {
        window.location = "available.html";
      } else {
        alert("password wrong");
      }
    } 
  } 
  
  else {
    alert("user not found please sign up");
  }

}


//contact form

