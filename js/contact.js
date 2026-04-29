let submitCon=document.getElementById("submitButt")
function profileData(){
  let profileName=document.getElementById("profile-name")
  let fetch =JSON.parse(localStorage.getItem("USER-DETAIL"))||[]
  let userName=fetch.firstName

profileName.innerText=userName
}
profileData()   

function showTotalCart(){
      let cartItemLength=document.getElementById("cart-item-length")
        let fetch=localStorage.getItem("TOTALCART")
        cartItemLength.innerText=fetch||0
    }
     showTotalCart()



complaint=()=>{
let getData=JSON.parse(localStorage.getItem("USER-DETAIL"))
submitCon.addEventListener("click",async(e)=>{
 e.preventDefault()
   
let userNameCon=document.getElementById("name").value
let emailCon=document.getElementById("email").value
let phoneCon=document.getElementById("phone").value
let subjectCon=document.getElementById("subject").value
let messageCon=document.getElementById("message").value   
let contactForm=document.getElementById("contactForm")
if(emailCon.trim()==getData.email.trim()){
       if(subjectCon !="Select Subject"){
       let date=new Date()
        let year=date.getFullYear()
        let month=date.getMonth()+1
        let day=date.getDate()
        let finalDate=month+"/"+day+"/"+year
        let key=await firebase.database().ref("complaint").push().getKey()
        let obj={
         userName:userNameCon,
         email:emailCon,
         cellNo:phoneCon,
         message:messageCon,
         key,
         date:finalDate,
         status:"Pending",
         subject:subjectCon    
       }
       
       
       firebase.database().ref("complaint").child(key).set(obj)
       contactForm.reset()
       setTimeout(()=>{
      Toastify({
  text: "Your complaint has been submitted successfully!s",
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
setTimeout(()=>{
Toastify({
  text: "We will get back to you within 24 hours.",
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
  
},1000)  
},1000)
       return
       }
       else{
        Toastify({
  text: '⚠️ Please select a subject for your complaint',
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
       }
       
        
    }
    else if( emailCon==""){
       return
    }
    else{
        Toastify({
  text: "❌ Email address not recognized. Please use the email associated with your account.",
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
    }
})

}
complaint()
mapSecLoading=()=>{
  let mapSecLoad=document.getElementById("map-sec-loading")
  mapSecLoad.innerHTML=`<div class="spinner"></div>`
  setTimeout(()=>{
    mapSecLoad.innerHTML=""
 mapSecLoad.innerHTML=` 
       
           <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d57664.83282218709!2d68.35423489521483!3d25.4030681985851!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1776702561216!5m2!1sen!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  
`
 },1500)
 
}
mapSecLoading()