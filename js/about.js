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