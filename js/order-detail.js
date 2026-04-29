let search=window.location.search
let string=new URLSearchParams(search)
let orderKey=string.get("orderKey")
function profileData(){
  let profileName=document.getElementById("profile-name")
  let fetch =JSON.parse(localStorage.getItem("USER-DETAIL"))
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
  async function showDetailCart(){
  let dateShow=document.getElementById("date-show")  
  let timeShow=document.getElementById("timeShow")
  let orderId=document.getElementById("orderId")
  let cartSection=document.getElementById("cart-sec")
  let orderFetch=await firebase.database().ref("orders").get()
  let totalAmount=document.getElementById("total-amount")
  let array=Object.values(orderFetch.val())
  let color=""
  let filter=array.filter(item=>{
   return item.orderKey==orderKey
  })
  dateShow.innerText=filter[0].Date
  timeShow.innerText=filter[0].time
  orderId.innerText=filter[0].orderKey
 totalAmount.innerText=filter[0].totalAmount
cartSection.innerHTML=`<div class="spinner"></div>`
setTimeout(()=>{
cartSection.innerHTML=""
filter[0].order.forEach(item=>{

    if(item.foodType=="Vegetarian"){
        color="green"
    }
    else if(item.foodType=="Non-Vegetarian"){
        color="red"
    }
    else{
        color="brown"
    }
    cartSection.innerHTML+=`
    <div class="col-md-6 col-lg-4">
    <div class="food-card">
                    <div class="card-img-wrapper">
                        <img src="${item.proImage}" class="card-img-top" alt="Windows Restaurant">
                        <span class="category-badge" style="background-color:${color};">${item.foodType}</span>
                        <div class="favorite-icon">
                            <i class="far fa-heart"></i>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="restaurant-header">
                            <h5 class="restaurant-name">Food Express</h5>
                            <div class="rating">
                                <i class="fas fa-star"></i>
                                <span>4.5</span>
                            </div>
                        </div>
                        <div class="cuisine-type">Category:- <b>${item.catName}</b></div>
                        <div class="cuisine-type">Food Name:- <b>${item.proName}</b></div>
                        <div class=" cuisine-type mb-2">Description:- <b>${item.proDescription}</b></div>
                        <div class= "d-flex mt-3" style="gap:40px;">
                        <div class="items-info">
                            <span class="price">
                                <i class="fas fa-tag"></i>RS:- ${item.proPrice}
                            </span>
                        </div>
                        <div class="items-info">
                            <span class="price">
                            Quantity  ${item.quantity}
                            </span>
                        </div>
                        </div>
                        <div class="items-info">
                            <span class="price">
                            Total Amount:-  ${item.proPrice*item.quantity}
                            </span>
                        </div>
                        
                        <div class="delivery-time">
                            <i class="fas fa-clock"></i>
                            <span>30-40 min</span>
                        </div>

                    </div>
                </div>
                </div>
    `
   
    
   })

},1000) 
   
  }
  showDetailCart()
