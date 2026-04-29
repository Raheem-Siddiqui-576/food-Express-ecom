let cartCon= document.getElementById("cart-con")
let cartCount=document.getElementById("cart-count")
let clearCart=document.getElementById("clearCartBtn")
let totalItemLength=document.getElementById("total-item-length")
let subtotal=document.getElementById("subtotal")
let taxAmount=document.getElementById("taxAmount")
let totalAmountAfterTax=document.getElementById("totalAmount")
let cardPlace=document.getElementById("cardPlace")
let totalPrice=0
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
clearCart.addEventListener("click",function(){
    cartCon.innerHTML=`<div class="spinner"></div>`
    setTimeout(()=>{
    localStorage.removeItem("CART")
    localStorage.removeItem("TOTALCART")
    subtotal.innerText=0
    taxAmount.innerText=0
    totalAmountAfterTax.innerText= 0
    showCart() 
    showTotalCart()
   },1000)
    
})

function showCart(){
    totalPrice=0 
    let taxPercentage=0
    let cart=JSON.parse(localStorage.getItem("CART"))||[]
    if(cart.length==0){
        clearCart.style.display="none"
        cartCount.innerText=0
        cartCon.innerHTML=`<h1 style="text-align:center; color:#FF6B35; margin-top:100px;">Cart Not Found</h1>`
        return
    }
    if(cart){
        let color=""
        cartCon.innerHTML=`<div class="spinner"></div>`
        cartCon.innerHTML=""
          cart.map((item)=>{
            if(item.foodType=="Vegetarian"){
                color="green"
            }
            else if(item.foodType=="Non-Vegetarian"){
                color="red"
            }
            else if(item.foodType=="Deserts"){
                color="brown"
            }
    cartCount.innerText=cart.length
    clearCart.style.display="inline-block"
     totalItemLength.innerText=cart.length            
       cartCon.innerHTML+=`
                  <div class="cart-item" id="${item.id}">
                        <img src="${item.proImage}" 
                             class="cart-item-image" alt="Margherita Pizza">
                        
                        <div class="cart-item-details">
                            <h3 class="item-name">${item.proName}</h3>
                            <p class="item-description">${item.proDescription}</p>
                            <span class="item-type type-veg"style="background-color:${color};">${item.foodType}</span>
                            <div class="item-price">RS ${item.proPrice} per item</div>
                            
                            <div class="item-controls">
                                <div class="quantity-control">
                                    <button class="qty-btn minus dec">-</button>
                                    <h6 style="padding-top:5px;" class="count-update">${item.quantity}</h6>
                                    <button class="qty-btn plus inc">+</button>
                                </div>
                                <button class="remove-item" onclick="remove(this)">
                                    <i class="fas fa-times"></i> Remove
                                </button>
                            </div>
                        </div>
                        
                        <div class="item-total" style="white-space:nowrap;">Total Price ${item.proPrice*item.quantity}</div>
                    </div>
                
    `
         
totalPrice+=Number(item.proPrice)*Number(item.quantity)
subtotal.innerText=totalPrice
taxPercentage=parseInt((5/100)*Number(subtotal.innerText))
taxAmount.innerText=taxPercentage
totalAmountAfterTax.innerText=(Number(totalPrice)+100)+(Number(taxPercentage))

           

})
     
      
    }
    else{
        cartCount.innerText=0
    
}
    
}

showCart()
document.addEventListener("click",function(e){
    if(e.target.classList.contains("dec")){
        decrement(e.target)
    }
    if(e.target.classList.contains("inc")){
        increment(e.target)
    }

})

function decrement(butt){
let parentElement =butt.parentElement
let mainParent=parentElement.closest(".cart-item").id
let count = parentElement.querySelector(".count-update")
let value=Number(count.innerText)
if(value>0){
value--
count.innerText=value
let fetch=JSON.parse(localStorage.getItem("CART"))
let match=fetch.find(item=>item.id==mainParent)
match.quantity=value
localStorage.setItem("CART",JSON.stringify(fetch))
showCart()
}
}
async function increment(butt){
    let parentElement=butt.parentElement
    let mainParent=parentElement.closest(".cart-item").id
    let count = parentElement.querySelector(".count-update")
    let value= Number(count.innerText)
    value++
    count.innerText=value
     let fetch=await JSON.parse(localStorage.getItem("CART"))
     let findItem=fetch.find(item=> item.id==mainParent) 
     findItem.quantity=value
     localStorage.setItem("CART",JSON.stringify(fetch))
    showCart()
    }
function remove(butt){
 let parentElement= butt.parentElement 
 let grandElement =parentElement.parentElement
 let parentInner= grandElement.querySelector(".item-name")
 let text =parentInner.innerText
 let fetchLocalstorage= JSON.parse(localStorage.getItem("CART"))
 let filter=fetchLocalstorage.filter(items=>text !==items.proName)
 cartCon.innerHTML=`<div class="spinner"></div>`
 setTimeout(()=>{
    cartCon.innerHTML=""
 localStorage.setItem("CART",JSON.stringify(filter))

 let totalCart=localStorage.getItem("TOTALCART")
 let val=Number(totalCart)-1

 localStorage.setItem("TOTALCART",val)

 Toastify({
  text: "Delete Cart",
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

 showCart()
  showTotalCart()
 },1000)
 
}
cardPlace.addEventListener("click",async function(){
     let date=new Date()
    let hours=date.getHours()
    let AM_PM= hours>12 ? "PM":"AM"
    let exactTime=hours%12
    let min=date.getMinutes()
    let exactMin=min<1? min=0+"0":min=min
    let time=exactTime+":"+exactMin+" "+AM_PM 
    let userDetail=JSON.parse(localStorage.getItem("USER-DETAIL"))
    let fetch= JSON.parse(localStorage.getItem('CART'))
    let orderKey=await firebase.database().ref("orders").push().getKey() 
    let data={
        time,
        Date:new Date().toLocaleDateString(),
        userDetail,
        order:fetch,
        tax:taxAmount.innerText,
        totalAmount:totalAmountAfterTax.innerText,
        cellNo:userDetail.cellNo||0,
        orderKey,
        status:"Pending"
     }
     
     totalOrderCount(userDetail)
    //  emailSend(data,fetch)  
     await firebase.database().ref("orders").child(orderKey).set(data)
     
     localStorage.removeItem("CART") 
    localStorage.removeItem("TOTALCART")
    taxAmount.innerText=0;
    totalAmountAfterTax.innerText=0;
    totalItemLength.innerHTML=0
    subtotal.innerText=0;   
    window.location.href="order-history.html"
    showCart()
       showTotalCart()
    checkOrderCart()
    })
    async function totalOrderCount(userDetail){
        await firebase.database().ref("orders").get()
       .then((data)=>{
        if(data.val()==null){
            return
        }  
        let array=Object.values(data.val())
         
          let filteredOrder=array.filter(item=>{
         return   item.userDetail.email==userDetail.email
        
        })
          orderCount=filteredOrder.length
        
    })
 
   
    }
    function emailSend(data,order){
         data.to_email="raheemsiddiqui576@gmail.com"
        order.forEach(item=>{
         item.multiplication=Number(item.proPrice)*Number(item.quantity)
         }) 
        data.totalPriceBeforTax=totalPrice
        
        emailjs.init({
     publicKey: '0bu8EHHSNtYik8K7L'
    })
    emailjs.send('service_x06xjko', 'template_32ci0gl', data).then(
  (response) => {
    console.log('SUCCESS!', response.status, response.text);
  },
  (error) => {
    console.log('FAILED...', error);
  },
); 

}
function checkOrderCart(){
    let getCartLength=localStorage.getItem("TOTALCART")
    if(getCartLength>0){
         cardPlace.disabled=false
         cardPlace.style.backgroundColor="orange"
    }
    else{
        cardPlace.disabled=true
        cardPlace.style.backgroundColor=" rgb(236, 183, 85)"    
    }
}
checkOrderCart()  