
function checkAuth(){
let logout=document.getElementById("logout")
  let userDetail=localStorage.getItem("USER-DETAIL")
if(!userDetail){
    window.location.assign("login.html")
  } 
logout.addEventListener("click",function(){
   localStorage.removeItem("USER-DETAIL")
    window.location.assign("login.html")
  
}) 
}
checkAuth()