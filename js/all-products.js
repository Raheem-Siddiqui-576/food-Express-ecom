let mulk_filter=document.getElementById("mulk-filter")
let cartCon=document.getElementById("productsContainer")
let allFilter=document.getElementById("allFilter")
let allGlobalFilter=[]
let totalCategories=document.getElementById("totalCategories")
let totalProducts=document.getElementById("totalProducts")
let searchInput=document.getElementById("searchInput")
let allProduct=[]
searchFilter=(catArray)=>{
    let inputValue
    searchInput.addEventListener("input",(e)=>{
    inputValue=e.target.value.toLowerCase()
    // show all product
    if(inputValue.length==0){
        cartCon.innerHTML=`<div class="spinner"></div>`  
        setTimeout(()=>{
            cartCon.innerHTML=""
            allProduct.forEach(item =>{
                   cartCon.innerHTML+=`
 <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
<div class="product-card">
                        <div class="product-img-wrapper">
                            <img src="${item.productImage}" class="product-img">
                            <span class="category-badge bg-success">
                               ${item.selectedCat}
                            </span>
                        </div>
                        <div class="product-body">
                            <h5 class="product-title">${item.productName}</h5>
                            <p class="product-desc">${item.productDescription}</p>
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <div>
                                    <span class="price">${item.productPrice}</span>
                                </div>
                                <div class="rating">
                                    <b>5</b><i class="fas fa-star"></i> 
                                </div>
                            </div>
                            <button class="add-to-cart" 
                           data-image="${item.productImage}"
  data-name="${item.productName}"
  data-desc="${item.productDescription}"
  data-price="${item.productPrice}"
  data-cat="${item.selectedCat}"
  data-type="${item.foodType}"
                            >
                                <i class="fas fa-shopping-cart me-2"></i>Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
      </div>

`            })
         
   
            },1000)
        return
        }
    // 
    // search category only food filter
    let filtered=allProduct.filter(item=>{
          if(inputValue==""){
            return false
          }
        return item.selectedCat.toLowerCase().includes(inputValue)
    })    
    // close filter
    if(filtered.length>0){
       cartCon.innerHTML=`<div class="spinner"></div>`
        setTimeout(()=>{
        cartCon.innerHTML=""
        filtered.forEach(item=>{
             cartCon.innerHTML+=`
 <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
<div class="product-card">
                        <div class="product-img-wrapper">
                            <img src="${item.productImage}" class="product-img">
                            <span class="category-badge bg-success">
                               ${item.selectedCat}
                            </span>
                        </div>
                        <div class="product-body">
                            <h5 class="product-title">${item.productName}</h5>
                            <p class="product-desc">${item.productDescription}</p>
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <div>
                                    <span class="price">${item.productPrice}</span>
                                </div>
                                <div class="rating">
                                    <b>5</b><i class="fas fa-star"></i> 
                                </div>
                            </div>
                            <button class="add-to-cart" data-image="${item.productImage}"
  data-name="${item.productName}"
  data-desc="${item.productDescription}"
  data-price="${item.productPrice}"
  data-cat="${item.selectedCat}"
  data-type="${item.foodType}">
                                <i class="fas fa-shopping-cart me-2"></i>Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
      </div>

`
        })
    },1000)
    }
    // category filter not found search fooditem
    //else condition
    else{
        // search food filter 
        let foodFiltered=allProduct.filter(item=>{
            if(inputValue==""){
                return false
            }
            return item.productName.toLowerCase().includes(inputValue)
        })
        // close food filter
        
        cartCon.innerHTML=`<div class="spinner"></div>`
        setTimeout(()=>{
        cartCon.innerHTML=""
        foodFiltered.forEach(item=>{
              cartCon.innerHTML+=`
 <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
<div class="product-card">
                        <div class="product-img-wrapper">
                            <img src="${item.productImage}" class="product-img">
                            <span class="category-badge bg-success">
                               ${item.selectedCat}
                            </span>
                        </div>
                        <div class="product-body">
                            <h5 class="product-title">${item.productName}</h5>
                            <p class="product-desc">${item.productDescription}</p>
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <div>
                                    <span class="price">${item.productPrice}</span>
                                </div>
                                <div class="rating">
                                    <b>5</b><i class="fas fa-star"></i> 
                                </div>
                            </div>
                            <button class="add-to-cart" data-image="${item.productImage}"
  data-name="${item.productName}"
  data-desc="${item.productDescription}"
  data-price="${item.productPrice}"
  data-cat="${item.selectedCat}"
  data-type="${item.foodType}">
                                <i class="fas fa-shopping-cart me-2"></i>Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
      </div>

`
        })
        
        },1000)
        if(foodFiltered.length==0){
           cartCon.innerHTML=`<div class="spinner"></div>`
           setTimeout(()=>{
             cartCon.innerHTML="<h1 style='color:#FF6B4A; text-align:center;'>Food not found</h1>"
           },1000)
            
        }
    }
    //close else tag
})
}
allCat=async()=>{
let cat=await firebase.database().ref("categories").get()
if(cat.val()==null || cat.val()== ""){
     cartCon.innerHTML=`<h2 style="text-align : center; color:#ff6b35;">Products not found</h2>`
    return
    }
let array=Object.values(cat.val())
searchFilter(array)
totalCategories.innerText=array.length-1+"+"
}
allCat()
allPro=async()=>{
let pro=await firebase.database().ref("products").get()
let array=Object.values(pro.val())
allProduct=array
totalProducts.innerText=array.length-1+"+"
}
allPro()
function showTotalCart(){
      let cartItemLength=document.getElementById("cart-item-length")
        let fetch=localStorage.getItem("TOTALCART")
        cartItemLength.innerText=fetch||0
    }
    showTotalCart()
   
function profileData(){
   let profileName=document.getElementById("profile-name")
   let fetch =JSON.parse(localStorage.getItem("USER-DETAIL"))
   let userName=fetch.firstName
    profileName.innerText=userName
}
profileData()

async function mulkFilter(){
    let categories=await firebase.database().ref("categories").get()
    let array=Object.values(categories.val())
    categoriesList=array
    array.forEach(item=>{
        mulk_filter.innerHTML+=`
        <button class="filter-btn" onclick="clickActive(this)" data-filter="Pakistan">${item.categoryName}</button>
        `
    })
    
}
mulkFilter()
function byDefaultCart(){
    cartCon.innerHTML=`<div class="spinner"></div>`
setTimeout(async()=>{
let products=await firebase.database().ref("products").get()
let array=Object.values(products.val())
allGlobalFilter=array
cartCon.innerHTML=""
array.filter(item=>{
    cartCon.innerHTML+=`
 <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
<div class="product-card">
                        <div class="product-img-wrapper">
                            <img src="${item.productImage}" class="product-img">
                            <span class="category-badge bg-success">
                               ${item.selectedCat}
                            </span>
                        </div>
                        <div class="product-body">
                            <h5 class="product-title">${item.productName}</h5>
                            <p class="product-desc">${item.productDescription}</p>
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <div>
                                    <span class="price">${item.productPrice}</span>
                                </div>
                                <div class="rating">
                                    <b>5</b><i class="fas fa-star"></i> 
                                </div>
                            </div>
                          <button class="add-to-cart"
  data-image="${item.productImage}"
  data-name="${item.productName}"
  data-desc="${item.productDescription}"
  data-price="${item.productPrice}"
  data-cat="${item.selectedCat}"
  data-type="${item.foodType}">
  <i class="fas fa-shopping-cart me-2"></i>Add to Cart
</button>
                        </div>
                    </div>
                </div>
      </div>

`
})
},1000)
    
}
byDefaultCart()
 
document.addEventListener("click", function (e) {
  if (e.target.closest(".add-to-cart")) {
    let btn = e.target.closest(".add-to-cart")

    addCart(
      btn.dataset.image,
      btn.dataset.name,
      btn.dataset.desc,
      btn.dataset.price,
      btn.dataset.cat,
      btn.dataset.type
    )
  }
})
function clickActive(e){
let filterButton=document.querySelectorAll(".filter-btn")
filterButton.forEach(butt=>{
     butt.classList.remove("active")
    })
e.classList.add("active")
let filtered=allGlobalFilter.filter(item=>{
return item.selectedCat==e.innerText
})
cartCon.innerHTML=`<div class="spinner"></div>`
setTimeout(()=>{
cartCon.innerHTML=""
filtered.forEach(item=>{
cartCon.innerHTML+=`
 <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
<div class="product-card">
                        <div class="product-img-wrapper">
                            <img src="${item.productImage}" class="product-img">
                            <span class="category-badge bg-success">
                               ${item.selectedCat}
                            </span>
                        </div>
                        <div class="product-body">
                            <h5 class="product-title">${item.productName}</h5>
                            <p class="product-desc">${item.productDescription}</p>
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <div>
                                    <span class="price">${item.productPrice}</span>
                                </div>
                                <div class="rating">
                                    <b>5</b><i class="fas fa-star"></i> 
                                </div>
                            </div>
                            <button class="add-to-cart" data-image="${item.productImage}"
  data-name="${item.productName}"
  data-desc="${item.productDescription}"
  data-price="${item.productPrice}"
  data-cat="${item.selectedCat}"
  data-type="${item.foodType}">
                                <i class="fas fa-shopping-cart me-2"></i>Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
      </div>

`
})    
},1000)

}

allFilter.addEventListener("click",()=>{
 let filterButton=document.querySelectorAll(".filter-btn")
filterButton.forEach(butt=>{
     butt.classList.remove("active")
    })
    allFilter.classList.add("active")
    cartCon.innerHTML="<div class='spinner'></div>"
    setTimeout(()=>{
    cartCon.innerHTML=""
    allGlobalFilter.forEach(item=>{
        cartCon.innerHTML+=`
        <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
<div class="product-card">
                        <div class="product-img-wrapper">
                            <img src="${item.productImage}" class="product-img">
                            <span class="category-badge bg-success">
                               ${item.selectedCat}
                            </span>
                        </div>
                        <div class="product-body">
                            <h5 class="product-title">${item.productName}</h5>
                            <p class="product-desc">${item.productDescription}</p>
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <div>
                                    <span class="price">${item.productPrice}</span>
                                </div>
                                <div class="rating">
                                    <b>5</b><i class="fas fa-star"></i> 
                                </div>
                            </div>  
                            <button class="add-to-cart" data-image="${item.productImage}"
  data-name="${item.productName}"
  data-desc="${item.productDescription}"
  data-price="${item.productPrice}"
  data-cat="${item.selectedCat}"
  data-type="${item.foodType}">
                                <i class="fas fa-shopping-cart me-2"></i>Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
      </div>

        `
    })    
    },1000)
})
addCart=(proImage,proName,proDescription,proPrice,catName,foodType)=>{
    let data=[]
    
let fetchData= JSON.parse(localStorage.getItem("CART"))||[]
data=fetchData
   let cartExist= data.some(item=>item.catName.trim()==catName.trim()&&item.proName.trim()==proName.trim())       
 
    if(cartExist){  
  Toastify({
  text: "Cart Already Exist",
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
    let cart=0

    let totalLength;
    let getCartLen=JSON.parse(localStorage.getItem("TOTALCART"))||0
    cart++
    totalLength=cart+getCartLen
    
    localStorage.setItem("TOTALCART",JSON.stringify(totalLength))
    showTotalCart()
    
    let date=Date.now()
    let obj={
     id:date,
     proImage,
     proName,
     proDescription,
     proPrice,
     catName,
     foodType,
     quantity:0,
      }
   data.push(obj)
   localStorage.setItem("CART",JSON.stringify(data))
   Toastify({
  text: "Cart Add successfully",
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