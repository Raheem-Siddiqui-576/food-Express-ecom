let catTitle =document.getElementById("category-title")
let cardSection= document.getElementById("card-sec")
let cartItemLength1=document.getElementById("cart-item-length") 
let priceRange=document.getElementById("priceRange")
let foodtypeFilter=document.querySelectorAll("#foodtype-filter input")
let checkVal;
const queryString= window.location.search
const searchParam =new URLSearchParams(queryString)
let categoryName = searchParam.get("catName")
let categoryKey = searchParam.get("catKey")
function profileData(){
  let profileName=document.getElementById("profile-name")
  let fetch =JSON.parse(localStorage.getItem("USER-DETAIL"))
  let userName=fetch.firstName
  profileName.innerText=userName
}
profileData()
async function getProducts(){
 
    cardSection.innerHTML=`<div class="spinner"></div>`
 setTimeout(async ()=>{
    cardSection.innerHTML=""
  let color=""
    catTitle.innerHTML=categoryName
await firebase.database().ref("products").get()
.then((data)=>{
    let array= Object.values(data.val())
   
    for(let i=0 ;i<array.length ;i++){
         if(categoryName==array[i].selectedCat){
           
            if(array[i].foodType==="Non-Vegetarian"){
            color="red"
           }
           else if(array[i].foodType==="Deserts"){
            color="brown"
           }  
         cardSection.innerHTML+=`
            <div class="col-lg-4 col-md-6 mt-2">
                        <div class="product-card">
                            <div class="position-relative">
                                <img src="${array[i].productImage}" height="200px" width="100%"> 
                            <div class="product-badges">
                                    <span class="badge badge-veg" style="background-color:${color};">${array[i].foodType}</span>
                                </div>
                            </div>
                            <div class="product-content">
                                <h3 class="product-title">${array[i].productName}</h3>
                                <p class="product-description">${array[i].productDescription}</p>
                                
                                <div class="product-rating">
                                    <div class="rating-stars">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star-half-alt"></i>
                                    </div>
                                    <span class="rating-count">(4.5/5)</span>
                                </div>
                                
                                <div class="product-price">
                                    <span class="current-price">${array[i].productPrice} PKR</span>
                                    <span class="discount-percent">${array[i].productDiscount}% OFF</span>
                                </div>
                                <div class="original-price">Discount ${Math.floor(array[i].productPrice*array[i].productDiscount/100)}</div>
                                <div class="product-actions">
                                    <div class="quantity-control">
                                        <button class="qty-btn minus" onclick="decrement(this)">-</button>
                                        <h6 style="padding-top:5px;" class="count-val">0</h6>
                                         <button class="qty-btn plus" onclick="increment(this)">+</button>
                                    </div>
                                    <button class="add-to-cart-btn"
                                    data-cat="${array[i].selectedCat}"
                                    data-name="${array[i].productName}"
                                    data-description="${array[i].proDescription}"
                                    data-image="${array[i].productImage}"
                                    data-type="${array[i].foodType}"
                                    data-price="${array[i].productPrice}"
                                    data-discount="${array[i].productDiscount}"
                                        <i class="fas fa-cart-plus"></i> Add>
                                    </button>
                                </div>
                       
                                </div>
                        </div>
                    </div>
               `
        }
         
    }
    
})
 },2000)
  
}

getProducts()
document.addEventListener("click",(e)=>{
            if(e.target.closest(".add-to-cart-btn")){
                checkVal=e.target.closest(".add-to-cart-btn")
             let btn=e.target.closest(".add-to-cart-btn")
                addCart(
                    btn.dataset.cat,
                    btn.dataset.name,
                    btn.dataset.description,
                    btn.dataset.image,
                    btn.dataset.type,
                    btn.dataset.price,
                    btn.dataset.discount,
                )
            }
         })
function increment(butt){
    let parent=butt.parentElement
let count = parent.querySelector(".count-val")
let value =count.innerText
value++
count.innerText=value
}
function decrement(butt){
    let parent = butt.parentElement
    let count = parent.querySelector(".count-val")
    let value = parseInt(count.innerText)
   
   if(value>0){
value-=1
    count.innerText=value
}
 else{
    return
 }
    }
    function addCart(catName,proName,proDescription,proImage,foodType,proPrice,proDis){
    let cartItem=""
        let parentElement =checkVal.parentElement
     let val=parentElement.querySelector(".count-val").innerText
     let obj={
        id:Date.now(),
        proName,
        proDescription,
        proImage,
        foodType,
        quantity:val,
        catName,
        proPrice,
        proDis,
     }
     let cart= JSON.parse(localStorage.getItem("CART"))|| []
     let matchCart=cart.find(item =>{ 
      return item.proName==obj.proName && item.catName==catName
    })
    
     if(matchCart){
          Toastify({
  text: "Cart already exist",
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
         return 
    }
     
    else{
     cart.push(obj)
     localStorage.setItem("CART",JSON.stringify(cart))    
    }
    cartItem=cart.length||0
    localStorage.setItem("TOTALCART",cartItem)
     showTotalCart()
     }
   function showTotalCart(){
        let fetch=localStorage.getItem("TOTALCART")
        cartItemLength1.innerText=fetch||0
    }
     showTotalCart()
    async function applyFilter(){
        let price=priceRange.value
        let checkTypes=[]
        foodtypeFilter.forEach(item=>{
            if(item.checked){
                checkTypes.push(item.value)
            }
        })
        let data=await firebase.database().ref("products").get()
        let array=Object.values(data.val())
        let filtered=array.filter(item=>item.selectedCat==categoryName)
         filtered=filtered.filter(pro=> Number(pro.productPrice)<=price)
        if(checkTypes.length>0){
            filtered=filtered.filter(pro=>checkTypes.includes(pro.foodType))
        }
        cardSection.innerHTML="<div class='spinner'></div>"
        // Delay function
        setTimeout(()=>{
            cardSection.innerHTML=''
         filtered.forEach(pro=>{
            let color="green"
            if(pro.foodType=="Non-Vegetarian"){
                color="red"
            }
            else if(pro.foodType=="Deserts"){
                color="brown"
            }
           cardSection.innerHTML+=`
            <div class="col-lg-4 col-md-6 mt-2">
                        <div class="product-card">
                            <div class="position-relative">
                                <img src="${pro.productImage}" height="200px" width="100%"> 
                            <div class="product-badges">
                                    <span class="badge badge-veg" style="background-color:${color};">${pro.foodType}</span>
                                </div>
                            </div>
                            <div class="product-content">
                                <h3 class="product-title">${pro.productName}</h3>
                                <p class="product-description">${pro.productDescription}</p>
                                
                                <div class="product-rating">
                                    <div class="rating-stars">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star-half-alt"></i>
                                    </div>
                                    <span class="rating-count">(4.5/5)</span>
                                </div>
                                
                                <div class="product-price">
                                    <span class="current-price">${pro.productPrice} PKR</span>
                                    <span class="discount-percent">${pro.productDiscount}% OFF</span>
                                </div>
                                <div class="original-price">Discount ${Math.floor(pro.productPrice*pro.productDiscount/100)}</div>
                                <div class="product-actions">
                                    <div class="quantity-control">
                                        <button class="qty-btn minus" onclick="decrement(this)">-</button>
                                        <h6 style="padding-top:5px;" class="count-val">0</h6>
                                         <button class="qty-btn plus" onclick="increment(this)">+</button>
                                    </div>
                                    <button class="add-to-cart-btn"
                                    data-cat="${pro.selectedCat}"
                                    data-name="${pro.productName}"
                                    data-description="${pro.proDescription}"
                                    data-image="${pro.productImage}"
                                    data-type="${pro.foodType}"
                                    data-price="${pro.productPrice}"
                                    data-discount="${pro.productDiscount}"
                                        <i class="fas fa-cart-plus"></i> Add>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
               `
        })

        },1000)
        //
        
        }
        priceRange.oninput=applyFilter
        foodtypeFilter.forEach(inp=>{
            inp.addEventListener("change",applyFilter)
        })    
    