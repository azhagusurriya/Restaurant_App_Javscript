// Name: Yashwanth Paranthaman
// Student Id: 101282474

var email = localStorage.getItem("username");
var name = "";
var phone = "";
var address = "";
var errors = false;
userList = JSON.parse(localStorage.getItem("userList"));

function user(name, password,email, phone, address){
    this.name = name;
    this.password = password;
    this.email = email;
    this.phone = phone;
    this.address = address;
};

function validateEmail(){
  let inputEmail = document.forms["updateProfile"]["email"].value;
  for(var i = 0; i < userList.length; i++){
    if(inputEmail == userList[i].email){
      document.getElementById("error").innerHTML = "User already exists.";
      errors = true;
    }
  }
  if(!errors){
    document.getElementById("error").innerHTML = "";
  }
}

function validatePassword(){
  let password = document.forms["updateProfile"]["password"].value;
  let confirmPassword = document.forms["updateProfile"]["confirmPassword"].value;
  if(password != confirmPassword){
    document.getElementById("error").innerHTML = "Password mismatch";
    errors = true;
  }
  else{
    document.getElementById("error").innerHTML = "";
  }
}

for(var i=0; i < userList.length; i++){
  if(email == userList[i].email){
    document.getElementById("name").value = userList[i].name;
    document.getElementById("email").value = email;
    document.getElementById("phone").value = userList[i].phone;
    document.getElementById("address").value = userList[i].address;
    document.getElementById("password").value = userList[i].password;
  }
}

function changeDetails(){
  name = document.getElementById("name").value;
  email = document.getElementById("email").value;
  phone = document.getElementById("phone").value;
  address = document.getElementById("address").value;
  password = document.getElementById("password").value;
  deleteProfile();
  const newUser = new user(name, password,email, phone, address);
  userList.push(newUser);
  localStorage.setItem("userList", JSON.stringify(userList));
}
  function changePassword(){
    document.getElementById("password").disabled = false;
    document.getElementById("confirmPassword").disabled = false;
  }

  function deleteProfile(){
    for(var i = 0; i < userList.length; i++){
      if(email == userList[i].email){
        userList.splice(i,1);
        localStorage.setItem("userList", JSON.stringify(userList));
      }
  }
}
