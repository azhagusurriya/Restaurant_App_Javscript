var email = localStorage.getItem("username");
var name = "";
var phone = "";
var address = "";
var errors = false;
userList = JSON.parse(localStorage.getItem("userList"));
var cardList = [];

if ("cards" in localStorage){
  cardList = JSON.parse(localStorage.getItem("cards"));
}else{
  cardList = [];
}

var localStorageForUser = "CartList_"+email;

function card(username, cardNo , cvv, name){
    this.name = name;
    this.username = username;
    this.cardNo = cardNo;
    this.cvv = cvv;
};

for(var i=0; i < cardList.length; i++){
  if(email == cardList[i].username){
    document.getElementById("cardNo").value = cardList[i].cardNo;
    document.getElementById("cvv").value = cardList[i].cvv;
    document.getElementById("cardholder").value = cardList[i].name;
  }
}

for(var i=0; i < userList.length; i++){
  if(email == userList[i].email){
    document.getElementById("name").value = userList[i].name;
    document.getElementById("email").value = email;
    document.getElementById("phone").value = userList[i].phone;
    document.getElementById("address").value = userList[i].address;
  }
}

function confirmOrder(){
  let cardNumber = document.forms["billingDetails"]["cardNo"].value;
  let cvv = document.forms["billingDetails"]["cvv"].value;

  console.log(cardNumber.toString().length);
  if(cardNumber.toString().length != 16){
    document.getElementById("error").innerHTML = "Invalid Billing Details";
    return false;
  }
  else if(cvv.toString().length != 3){
    document.getElementById("error").innerHTML = "Invalid Billing Details";
    return false;
  }
  else{
    alert("Order Placed. May the force be with you!");
    localStorage.removeItem(localStorageForUser);
  }
}

function saveDetails(){
  let cardNumber = document.forms["billingDetails"]["cardNo"].value;
  let cvv = document.forms["billingDetails"]["cvv"].value;
  let name = document.forms["billingDetails"]["cardholder"].value;
  let newCard = new card(email, cardNumber, cvv, name);
  if(cardList.length != 0){
    deleteCard();
  }
  cardList.push(newCard);
  localStorage.setItem("cards",JSON.stringify(cardList));
  window.location = "billing.html";
}

function deleteCard(){
  if(cardList.length == 0){
    alert("No cards found");
  }
  else{
    for(var i=0; i < cardList.length; i++){
      if(email == cardList[i].username){
        cardList.splice(i,1);
        localStorage.setItem("cards",JSON.stringify(cardList));
        window.location = "billing.html";
      }
    }
  }
}
