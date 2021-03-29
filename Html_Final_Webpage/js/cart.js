
var localDaata = []
var cartList = []
var cartItemSubTotal = 0
var cartItemDiscount = 0
var cartItemTotal = 0
var cartItemSubTotalList = []
var addedToCart = 0
var loggedInUserMail

$(window).load(function(){
  loggedInUserMail =  localStorage.username
  if(localStorage['CartList_'+loggedInUserMail] == null) {
    localStorage['CartList_'+loggedInUserMail] = []

  }
  checkLocalStorage();
})


function fetchCartDetails(list){
  addedToCart = 0;
  $('#data').empty()
  for (i=0 ; i < list.length ; i++){

    const tag = '<div class = "row">'+
    '<div class = "column"><img src="' + list[i].Image + '" class = "smallImage"></div>' +
    '<div class = "column">'+list[i].Title+'</div>' +
    '<div class = "column">$ '+list[i].Price+'</div>'+
    '<div class = "column"> 1 </div>' +
    '<div class = "column">$ '+list[i].Price+'</div>'+
    '<div class = "column"><button class = "btn-danger btn-sm removeCartItem" onclick=onClick(event,"'+list[i].Id+'")>Remove</button></div>' +
    '</div>'
    $('#data').append(tag)


    if(cartList.length > 0){
      var hasData = cartList.find(item => item.Title == list[i].Title)
      console.log(hasData);
      if(hasData != null){
        console.log(hasData.Title +" is already in cart list");
        addedToCart++
        $('#cartCount').text(addedToCart)

      }else{

      }
    }

  }

  cartItemSubTotalList = list.map(a => a.Price);

  cartItemSubTotal = 0
  for(i=0; i < cartItemSubTotalList.length; i++){

    cartItemSubTotal += cartItemSubTotalList[i];
  }


  if(cartItemSubTotal >= 100){
    cartItemDiscount = (cartItemSubTotal * 0.3).toFixed(2);


  }

  else if(cartItemSubTotal < 100 && cartItemSubTotal >= 80) {
    cartItemDiscount = (cartItemSubTotal * 0.2).toFixed(2);


  }
  else{
    cartItemDiscount = (cartItemSubTotal * 0.05).toFixed(2);

  }

  cartItemTotal = cartItemSubTotal - cartItemDiscount;


  $('#subTotal').text('SubTotal: $'+cartItemSubTotal+'')
  $('#discount').text('Discount: - $'+cartItemDiscount+'')
  $('#total').text('Total: $'+cartItemTotal+'')
}



function onClick(e, removeItemID){
  if($(e.target).hasClass('removeCartItem')){

    var cartRemoveItem = cartList.find(item => item.Id == removeItemID)
    // favLis.pop(value)
    cartList.splice(cartList.indexOf(cartRemoveItem), 1)

    localStorage['CartList_'+loggedInUserMail] = JSON.stringify(cartList)

    // To hide the cart in nav bar

    // $('#cartCount').hide()

    console.log('Added to cart number before: $'+addedToCart+'')
    addedToCart--
    console.log('Added to cart number after: $'+addedToCart+'')
    $('#cartCount').text(addedToCart)

    checkLocalStorage();
    fetchCartDetails(cartList);

  }
}


function checkLocalStorage(){
  if(localStorage['CartList_'+loggedInUserMail].length > 3){
    console.log(localStorage['CartList_'+loggedInUserMail].length)
    localData = JSON.parse(localStorage['CartList_'+loggedInUserMail])
    cartList = localData

    console.log('Cart item in cart page: '+cartList+'')
    fetchCartDetails(cartList)
  }else{
    console.log("Cart is empty")
    $('.BillingColumn').hide();
    $('#billingButton').hide();
    $('.textDesign').hide();
    $('.BillingColumn').text('Hy '+loggedInUserMail+', ur cart is Empty ! Please add items from the menu List to proceed!');
    $('.BillingColumn').show();


  }
}
