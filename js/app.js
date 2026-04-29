
let formStep1 = document.getElementById("formStep1")
let step1=document.getElementById("step1")
let formStep2=document.getElementById("formStep2")
let step2=document.getElementById("step2")
let formStep3=document.getElementById("formStep3")
let step3=document.getElementById("step3")
let formStep4=document.getElementById("formStep4")
let step4=document.getElementById("step4")
let complete=document.getElementById("complete")
let loadingGif=document.getElementById("loading-gif")
let image=document.getElementById("image")
let userName1=document.getElementById("userName1")
let userName2=document.getElementById("userName2")
let email=document.getElementById("email")
let cellNo=document.getElementById("cell-no")
let password=document.getElementById("password")
let strongpassword=document.getElementById("strongpassword")
let Address=document.getElementById("Address")
let city=document.getElementById("city")
let state=document.getElementById("state")
let imageCon=document.getElementById("image-con")
let nextstep=document.getElementsByClassName("nextStep")
let previous=document.getElementsByClassName("previous")
let proImage=""
let count=0

function loginRedirect(){
  let userData= localStorage.getItem("USER-DETAIL")
  if(userData){
    window.location.assign("categories.html")
  }
}
loginRedirect()

function profile(){
  
imageCon.addEventListener("click",function(){
  document.getElementById("image").click()
})
image.addEventListener("change",async function(e){
  let image =e.target.files[0]
   if(e.target.files.size>2*1024*1024){
              alert("file must be less then 2 mb")
        return
      }
  else {
           let proPic =document.getElementById("pro-pic")
  imageCon.style.display="none"
  proPic.style.display="block"
  proPic.src= URL.createObjectURL(image)
   const myHeaders = new Headers();
myHeaders.append("Cookie", "_cld_session_key=7659cbc64b2e69b7c2ed2cf7133a9511");

const formdata = new FormData();
formdata.append("file", image);
formdata.append("upload_preset", "foodExpress");

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: formdata,
  redirect: "follow"
};

await fetch("https://api.cloudinary.com/v1_1/dociusesl/image/upload", requestOptions)
  .then((response) => response.json())
  .then((result) =>{
    proImage= result.secure_url
  })
  .catch((error) => console.error(error));
        }
        })

  
  
}
profile()


Array.from(nextstep).forEach(butt => {

  butt.addEventListener("click",function(){
  
  nextStep()

  })
  
function nextStep(){
 count++
 if(count==1){
    formStep1.style.display="none"
    step1.classList.remove("active")
    formStep2.style.display="block"
    step2.classList.add("active")    
}
else if(count==2){
    formStep2.style.display="none"
    step2.classList.remove("active")
    formStep3.style.display="block"
    step3.classList.add("active")

}
else if(count==3){
    formStep3.style.display="none"
    step3.classList.remove("active")
    formStep4.style.display="block"
    step4.classList.add("active")
}
else{
}
console.log(count)


}
});
Array.from(previous).forEach(butt=>{
  butt.addEventListener("click", function(){
    console.log(butt)
    previousFun()  
  })  
})
function previousFun(){
 count-=1
if(count==2){
    formStep3.style.display="none"
    step3.classList.remove("active")
    formStep2.style.display="block"
    step2.classList.add("active")


}
else if(count==1){
  formStep3.style.display="none"
    step3.classList.remove("active")
    formStep2.style.display="block"
    step2.classList.add("active")    
 }
 else if(count==0){
  formStep1.style.display="block"
    step1.classList.add("active")
    formStep2.style.display="none"
    step2.classList.remove("active")
 }
 

console.log(count)
}

async function signIn(){
let regexPassword=/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/
 if(userName1.value==""){
  Toastify({
  text: "Please enter your First name",
  duration: 3000,
  destination: "https://github.com/apvarun/toastify-js",
  newWindow: true,
  close: true,
  gravity: "top", // `top` or `bottom`
  position: "center", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    background: "linear-gradient(to right, #00b09b, #96c93d)",
  },
  onClick: function(){} // Callback after click
}).showToast();
  return false
}  
 else if(userName2.value==""){
  Toastify({
  text: "Please enter your last name",
  duration: 3000,
  destination: "https://github.com/apvarun/toastify-js",
  newWindow: true,
  close: true,
  gravity: "top", // `top` or `bottom`
  position: "center", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    background: "linear-gradient(to right, #00b09b, #96c93d)",
  },
  onClick: function(){} // Callback after click
}).showToast();
  return false 
}
 else if(email.value==""){
  Toastify({
  text: "Enter your email",
  duration: 3000,
  destination: "https://github.com/apvarun/toastify-js",
  newWindow: true,
  close: true,
  gravity: "top", // `top` or `bottom`
  position: "center", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    background: "linear-gradient(to right, #00b09b, #96c93d)",
  },
  onClick: function(){} // Callback after click
}).showToast();
return false
}
else if(email.value.includes("@")!=true){
    Toastify({
  text: "Please enter correct email",
  duration: 3000,
  destination: "https://github.com/apvarun/toastify-js",
  newWindow: true,
  close: true,
  gravity: "top", // `top` or `bottom`
  position: "center", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    background: "linear-gradient(to right, #00b09b, #96c93d)",
  },
  onClick: function(){} // Callback after click
}).showToast();
return false
}
else if(email.value=="admin@gmail.com"&&password.value=="callbackfunction123"){
Toastify({
  text: "Enter another email",
  duration: 3000,
  destination: "https://github.com/apvarun/toastify-js",
  newWindow: true,
  close: true,
  gravity: "top", // `top` or `bottom`
  position: "center", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    background: "linear-gradient(to right, #00b09b, #96c93d)",
  },
  onClick: function(){} // Callback after click
}).showToast();
 return false
}
else if(cellNo.value==""){
  Toastify({
  text: "Enter your cell no",
  duration: 3000,
  destination: "https://github.com/apvarun/toastify-js",
  newWindow: true,
  close: true,
  gravity: "top", // `top` or `bottom`
  position: "center", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    background: "linear-gradient(to right, #00b09b, #96c93d)",
  },
  onClick: function(){} // Callback after click
}).showToast();
 return false
}
else if(password.value==0){
  Toastify({
  text: "Password length min 8 characters",
  duration: 3000,
  destination: "https://github.com/apvarun/toastify-js",
  newWindow: true,
  close: true,
  gravity: "top", // `top` or `bottom`
  position: "center", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    background: "linear-gradient(to right, #00b09b, #96c93d)",
  },
  onClick: function(){} // Callback after click
}).showToast();
return false
}
else if(!regexPassword.test(password.value)){
Toastify({
  text: "Please Enter srong Password",
  duration: 3000,
  destination: "https://github.com/apvarun/toastify-js",
  newWindow: true,
  close: true,
  gravity: "top", // `top` or `bottom`
  position: "center", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    background: "linear-gradient(to right, #00b09b, #96c93d)",
  },
  onClick: function(){} // Callback after click
}).showToast();
 return false
}
else if(strongpassword.value!=password.value){
  Toastify({
  text: "Confirm Password doesnot match" ,
  duration: 3000,
  destination: "https://github.com/apvarun/toastify-js",
  newWindow: true,
  close: true,
  gravity: "top", // `top` or `bottom`
  position: "center", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    background: "linear-gradient(to right, #00b09b, #96c93d)",
  },
  onClick: function(){} // Callback after click
}).showToast();
  return false
}

else if(Address.value==""){
  Toastify({
  text: "Enter your Address",
  duration: 3000,
  destination: "https://github.com/apvarun/toastify-js",
  newWindow: true,
  close: true,
  gravity: "top", // `top` or `bottom`
  position: "center", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    background: "linear-gradient(to right, #00b09b, #96c93d)",
  },
  onClick: function(){} // Callback after click
}).showToast();
  return false
}
else if(city.value==""){
  Toastify({
  text: "Enter your City",
  duration: 3000,
  destination: "https://github.com/apvarun/toastify-js",
  newWindow: true,
  close: true,
  gravity: "top", // `top` or `bottom`
  position: "center", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    background: "linear-gradient(to right, #00b09b, #96c93d)",
  },
  onClick: function(){} // Callback after click
}).showToast();
  return false
}
else if(state.value==""){
  Toastify({
  text: "Enter your State",
  duration: 3000,
  destination: "https://github.com/apvarun/toastify-js",
  newWindow: true,
  close: true,
  gravity: "top", // `top` or `bottom`
  position: "center", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    background: "linear-gradient(to right, #00b09b, #96c93d)",
  },
  onClick: function(){} // Callback after click
}).showToast();
  return false
}
else{
  return true
}
}

complete.addEventListener("click",async function(){
  let valid=await signIn()
  if(!valid){
    return
  }
complete.style.display="none"
loadingGif.style.display="block"
firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
  
.then(async (userCredential) => {
    var user = userCredential.user;
    
    let obj={
    firstName :userName1.value,
    lastName:userName2.value,
    email:email.value,
    password:password.value,
    strongpassword:strongpassword.value,
    cellNo :cellNo.value,
    Address:Address.value,
    city:city.value,
    state : state.value ,
    user:user.uid,
    proImage
  }  
 
 await firebase.database().ref("user-data").child(user.uid).set(obj)
   Toastify({
  text: "Sign In Successfully",
  duration: 3000,
  destination: "https://github.com/apvarun/toastify-js",
  newWindow: true,
  close: true,
  gravity: "top", // `top` or `bottom`
  position: "center", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    background: "linear-gradient(to right, #00b09b, #96c93d)",
  },
  onClick: function(){} // Callback after click
}).showToast();

formStep3.style.display="none"
step3.classList.remove("active")
formStep4.style.display="block"
step4.classList.add("active")

})
  .catch((error) => {
   loadingGif.style.display="none"
   complete.style.display="block"
  var errorCode = error.code;
    var errorMessage = error.message;
   console.log(errorCode)
   console.log(errorMessage)
   let message=errorCode.split("/")
   let finalMessge=message[1]
   Toastify({
  text: finalMessge,
  duration: 3000,
  destination: "https://github.com/apvarun/toastify-js",
  newWindow: true,
  close: true,
  gravity: "top", // `top` or `bottom`
  position: "center", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    background: "linear-gradient(to right, #00b09b, #96c93d)",
  },
  onClick: function(){} // Callback after click
}).showToast();
    // ..
  });
  
})