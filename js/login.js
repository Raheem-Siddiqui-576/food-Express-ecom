
let email=document.getElementById("email")
let password=document.getElementById("password")
let login=document.getElementById("login")
let loadingGif=document.getElementById("loading-gif")
let googleSignin=document.getElementById("google-signin")
function loginRedirect(){
  let userData= localStorage.getItem("USER-DETAIL")
  let ownerData=localStorage.getItem("OWNER-DETAIL")
  if(userData){
    window.location.replace("categories.html")
  }
  if(ownerData){
    window.location.href="../admin-side/categories.html"
  }

}
// google signin
googleSignin.addEventListener("click", ()=>{
var provider = new firebase.auth.GoogleAuthProvider();
 provider.setCustomParameters({
    prompt:"select_account"
   })
firebase.auth()
.signInWithPopup(provider).then(async(data)=>{
let user=data.user
let obj={
 firstName:user.displayName,
 proImage:user.photoURL,
 email:user.email,
 userUid:user.uid

}
await firebase.database().ref("user-data").child(user.uid).set(obj)
localStorage.setItem("USER-DETAIL",JSON.stringify(obj))
  window.location.href="categories.html"
})
.catch((error)=>{
  console.log(error)
})
})
//
loginRedirect()
login.addEventListener("click" ,async function(){
 event.preventDefault()
  
  login.style.display="none"
  loadingGif.style.display="inline"
 if((email.value=="admin@gmail.com"&& password.value=="callbackfunction123")||(email.value=="admin@gmail.com"||password.value=="callbackfunction123")){
    window.location.href="../admin-side/categories.html"
    localStorage.setItem("OWNER-DETAIL",email.value)
    return
  }

   
  firebase.auth().signInWithEmailAndPassword(email.value, password.value)
  .then(async(userCredential) => {
    // Signed in
    var user = userCredential.user;
    
   await firebase.database().ref("user-data").child(user.uid).get()
   .then(async(snapShot)=>{
    
    let data=snapShot.val()
    
    console.log(data)
    let obj={
     firstName:data.firstName,
     lastName:data.lastName,
     userUid:user.uid,
     email :data.email,
     cellNo :data.cellNo,
    Address:data.Address,
    city:data.city,
    state :data.state,
    proImage:data.proImage
    }
    localStorage.setItem("USER-DETAIL", JSON.stringify(obj))
    window.location.href="categories.html"
  })
    
  })
  .catch((error) => {
   loadingGif.style.display="none"
   login.style.display="block"
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode)
    let code=errorCode.split("/")
    finalCode=code[1]
   
   Toastify({
  text: finalCode,
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
  });
})
