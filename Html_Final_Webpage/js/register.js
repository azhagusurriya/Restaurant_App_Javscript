// Name: Yashwanth Paranthaman
// Student Id: 101282474

var userList = [];
var errors = false;
//localStorage.clear();
if ("userList" in localStorage){
  userList = JSON.parse(localStorage.getItem("userList"));
  console.log(userList);
}else{
  userList = [];
}

function user(name, password,email, phone, address){
    this.name = name;
    this.password = password;
    this.email = email;
    this.phone = phone;
    this.address = address;
};

function validateEmail(){
  let email = document.forms["userinfo"]["email"].value;
  for(var i = 0; i < userList.length; i++){
    if(email == userList[i].email){
      document.getElementById("error").innerHTML = "User already exists.";
      errors = true;
    }
  }
  if(!errors){
    document.getElementById("error").innerHTML = "";
  }
}

function validatePassword(){
  let password = document.forms["userinfo"]["password"].value;
  let confirmPassword = document.forms["userinfo"]["confirmPassword"].value;
  if(password != confirmPassword){
    document.getElementById("error").innerHTML = "Password mismatch";
    errors = true;
  }
  else{
    document.getElementById("error").innerHTML = "";
  }
}


function validateUser(){
  //e.preventDefault();
  console.log("validating the inputs");
  let name = document.forms["userinfo"]["name"].value;
  let password = document.forms["userinfo"]["password"].value;
  let confirmPassword = document.forms["userinfo"]["confirmPassword"].value;
  let email = document.forms["userinfo"]["email"].value;
  let phone = document.forms["userinfo"]["phone"].value;
  let address = document.forms["userinfo"]["address"].value;

  if(errors){
    document.getElementById("error").innerHTML = "Unable to create user. Check inputs";
    return false;
  }
  else{
      const newUser = new user(name, password,email, phone, address);
      userList.push(newUser);
      console.log(userList);
      localStorage.setItem("userList", JSON.stringify(userList));

  }
}

function loginUser(){
  var userFound = false;
  let username = document.forms["login"]["username"].value;
  let password = document.forms["login"]["password"].value;
  console.log(username);
  console.log(password);
  for(var i = 0; i < userList.length; i++){
    if(username == userList[i].email && password == userList[i].password){
      console.log(userList[i].email);
      userFound = true;
      localStorage.setItem("username",username);
    }
  }
  if(!userFound){
  document.getElementById("output").hidden = false;
  }
  console.log(userFound);
  return userFound;
}
