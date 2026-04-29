let fetch=JSON.parse(localStorage.getItem("USER-DETAIL"))
let siginGoogle=document.getElementById("sigin-google")
let main=document.getElementById("main")
function showProfileDetail(){
let firstName=document.getElementById("first-name")
let lastName=document.getElementById("last-name")
let email=document.getElementById("email")
let cellNo=document.getElementById("cell-no")
let address=document.getElementById("address")
let city=document.getElementById("city")
let state=document.getElementById("state")
let img=document.getElementById("pro-img")
let userName=document.getElementById("userName")
userName.value=fetch.firstName
firstName.value=fetch.firstName
lastName.value=fetch.lastName
email.value=fetch.email
cellNo.value=fetch.cellNo
address.value=fetch.Address
city.value=fetch.city
state.value=fetch.state
img.src= fetch.proImage
}
showProfileDetail()
let siginGoogleFun=()=>{
    let fullName=document.getElementById("fullName")
    let email=document.getElementById("email2")
    let uid=document.getElementById("uid")
    let image2=document.getElementById("pro-img-2")
    
if(fetch.cellNo&& fetch.city){
main.style.display="block"
siginGoogle.style.display="none"
}
else{
    fullName.value=fetch.firstName
    email2.value=fetch.email
    uid.value=fetch.userUid 
    image2.src=fetch.proImage
    siginGoogle.style.display="block"
    main.style.display="none"
}
}
siginGoogleFun()