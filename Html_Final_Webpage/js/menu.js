
//url to fetch all countries
const menuURL = "https://gist.githubusercontent.com/skd09/8d8a685ffbdae387ebe041f28384c13c/raw/26e97cec1e18243e3d88c90d78d2886535a4b3a6/menu.json";
const dataTag = document.querySelector('#data');
var menuList = []
var sortedArray = []
var dropdownName
var addedToCart = 0
var cartList = []
var localData = []
var unAvailableItemArray = []
var loggedInUserMail
// var findArray = []


$(window).load(function(){

  loggedInUserMail =  localStorage.username

  console.log("Local Storage User email:")
  console.log(loggedInUserMail);

  if(localStorage['CartList_'+loggedInUserMail] == null) localStorage['CartList_'+loggedInUserMail] = []
    if(localStorage['CartList_'+loggedInUserMail].length > 0){
      localData = JSON.parse(localStorage['CartList_'+loggedInUserMail])
      cartList = localData
    }else{ }



  callMenuAPI()
  console.log('Menu Loaded');




 })



function callMenuAPI(){
  //fetch data from url
  let response = fetch(menuURL)
    .then(response => response.json())
    .then(data => {
     menuList = data
    //filteredArray  = menuList.sort((a, b) => parseFloat(a.Available) - parseFloat(b.Available));
    checkUnAvailableItem()
    console.log("unavailable items")
    console.log(unAvailableItemArray);


      fetchMenuDetails(menuList)


    })
    .catch( (err) => {
      alert(err);
    });
}

// Convert number to stars
$.fn.stars = function() {
    return $(this).each(function() {
        // Get the value
        var val = parseFloat($(this).html());
        // Make sure that the value is in 0 - 5 range, multiply to get width
        var size = Math.max(0, (Math.min(5, val))) * 16;
        // Create stars holder
        var $span = $('<span />').width(size);
        // Replace the numerical value with stars
        $(this).html($span);
    });
}

$(function() {
    $('span.stars').stars();
});


// Sort by Title Ascending
$('#sortAlphabeticallyAsc').click(function(){

  dropdownName = $(this).text();
  $(".sortButtonName").text('Sort: ' +dropdownName+ '');

sortedArray = menuList.sort((a, b) => {
      let fa = a.Title.toLowerCase(),
          fb = b.Title.toLowerCase();

      if (fa < fb) {
          return -1;
      }
      if (fa > fb) {
          return 1;
      }
      return 0;
  });

  fetchMenuDetails(sortedArray);

});

// Sort by Title Descending
$('#sortAlphabeticallyDsc').click(function(){

  dropdownName = $(this).text();
  $(".sortButtonName").text('Sort: ' +dropdownName+ '');

sortedArray = menuList.sort((a, b) => {
      let fa = a.Title.toLowerCase(),
          fb = b.Title.toLowerCase();

      if (fa > fb) {
          return -1;
      }
      if (fa < fb) {
          return 1;
      }
      return 0;
  });

  fetchMenuDetails(sortedArray);

});

// Sort by price (Low to high)
$('#sortPriceAsc').click(function(){

dropdownName = $(this).text();
$(".sortButtonName").text('Sort: ' +dropdownName+ '');
  sortedArray  = menuList.sort((a, b) => parseFloat(a.Price) - parseFloat(b.Price));
  fetchMenuDetails(sortedArray);

});

// Sort by price (high to low)
$('#sortPriceDsc').click(function(){

  dropdownName = $(this).text();
  $(".sortButtonName").text('Sort: ' +dropdownName+ '');

  sortedArray  = menuList.sort((a, b) => parseFloat(b.Price) - parseFloat(a.Price));
  fetchMenuDetails(sortedArray);

});

// Sort by Rating (Highest)
$('#sortRating').click(function(){

  dropdownName = $(this).text();
  $(".sortButtonName").text('Sort: ' +dropdownName+ '');

  sortedArray  = menuList.sort((a, b) => parseFloat(b.Ratings) - parseFloat(a.Ratings));
  fetchMenuDetails(sortedArray);

});

// Sort by Availability
$('#sortAvailability').click(function(){

  dropdownName = $(this).text();
  $(".sortButtonName").text('Sort: ' +dropdownName+ '');

  sortedArray = menuList.filter(function (el) {
  return el.Available >= 1;
});

  sortedArray  = sortedArray.sort((a, b) => parseFloat(a.Available) - parseFloat(b.Available));
  fetchMenuDetails(sortedArray);

});


//Sort Out of Stock

$('#outOfStock').click(function(){

  dropdownName = $(this).text();
  $(".sortButtonName").text('Sort: ' +dropdownName+ '');

  sortedArray = menuList.filter(function (el) {
  return el.Available == 0;
});

  sortedArray  = sortedArray.sort((a, b) => parseFloat(a.Title) - parseFloat(b.Title));
  fetchMenuDetails(sortedArray);

});


//Display data into html
function fetchMenuDetails(List){
  addedToCart = 0;
  $('#data').empty()
  // $('#data').empty()
  for (i=0 ; i < List.length ; i++){
      const tag =
     //  '<div class="column">' +
      '<div id="cardHover'+i+'" class="column allMenus" onmouseover="actionOver('+i+')" onmouseout="actionOut('+i+')" >' +
      ' <div  class="card" >' +
        ' <div class="card-image">' +
        '   <img src="' + List[i].Image + '" class="imglarge" >' +
          ' <span class="card-title"> '+ List[i].Title +' </span>' +
          ' <span class="card-subtitle"> '+ List[i].Category +' </span>' +

        ' </div>' +
        ' <div class="card-content">' +

  ' <p class="card-price">$ '+List[i].Price +'</p>' +
        '<button data-target="modal1" class="btn-outline-info btn-xm modal-trigger" onclick=modalClick(event,"'+List[i].Id+'")>Details</button>'+
          '&nbsp;' +
          '&nbsp;' +
          '&nbsp;' +
          ' <button id="addToCart'+i+'" class="btn-outline-danger btn-xm addCart cartTextChange" onclick="onClick(event, '+i+')">Add to Cart</button>' +
'&nbsp;' +
          ' <div class=""> Rating: '+List[i].Ratings +'</div>' +
          ' <div> Availability: '+List[i].Available +'</div>' +
        ' </div>' +
      ' </div>' +
    // ' </div>' +
  ' </div>'
      $('#data').append(tag)

 var hasUnavailableItem = unAvailableItemArray.find(item => item.Available == List[i].Available)
 if(hasUnavailableItem != null){
   $("#addToCart"+i).hide();
 }


      if(cartList.length > 0){
        var hasData = cartList.find(item => item.Title == menuList[i].Title)
      console.log(hasData);
      if(hasData != null){
          console.log(hasData.Title +" is already in cart list");
          addedToCart++
          $('#cartCount').text(addedToCart)
          $("#addToCart"+i).text("Added to Cart");
          $("#addToCart"+i).removeClass('btn-outline-danger')
          $("#addToCart"+i).addClass('btn-success')


        }else{

        }
      }
}

}


function checkUnAvailableItem() {

  unAvailableItemArray = menuList.filter(function (el) {
  return el.Available == 0;

});


}
// <i class="material-icons">add</i>
// btn-floating
// halfway-fab waves-effect waves-light

function modalClick(e, menuID){
   if($(e.target).hasClass('modal-trigger')){
    // e.stopImmediatePropagation()
    console.log(menuID);
    console.log(menuList);
    var menuObj = $.grep(menuList, function(obj){return obj.Id == menuID;})[0];
    console.log(menuObj);
    $("#modalTitle").text(menuObj.Title)
    $("#modalBody").text(menuObj.Description)
    $('#modalImage').attr('src',menuObj.Image)
      $('.modal').modal();
   }
}


function actionOver(i){
   $('#cardHover'+i).animate().addClass('borderHover')
   console.log('Hover')
}

function actionOut(i){
   $('#cardHover'+i).animate().removeClass('borderHover')
}

function onClick(e, i){
  if($(e.target).hasClass('addCart')){
    if($("#addToCart"+i).hasClass('btn-outline-danger')){
      $("#addToCart"+i).text("Added to Cart");
      $("#addToCart"+i).removeClass('btn-outline-danger')
      $("#addToCart"+i).addClass('btn-success')
      addedToCart++;
      cartList.push(menuList[i])
      console.log(cartList)
    }
    else{
      $("#addToCart"+i).text("Add to Cart");
      $("#addToCart"+i).addClass('btn-outline-danger')
      $("#addToCart"+i).removeClass('btn-success')
      addedToCart--;
      var cartRemoveItem = cartList.find(item => item.Id == menuList[i].Id)
      // favLis.pop(value)
      cartList.splice(cartList.indexOf(cartRemoveItem), 1)
      console.log(cartRemoveItem.Title);

    }

    $('#cartCount').text(addedToCart)
    // localStorage.CartList = JSON.stringify(cartList)
    localStorage['CartList_'+loggedInUserMail] = JSON.stringify(cartList)


  }
console.log(JSON.parse(localStorage.CartList));
console.log("Local Storage User email with list:")
console.log(JSON.parse(localStorage['CartList_'+loggedInUserMail]));
}
