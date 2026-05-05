let catRow = document.getElementById("catRow")
let proCount = {}
let Count= 0;
let categoryArray=[]
let cartItemLength=document.getElementById("cart-item-length")
let search=document.getElementById("search")
let proCountShow
function profileData(){
   let profileName=document.getElementById("profile-name")
   let fetch =JSON.parse(localStorage.getItem("USER-DETAIL"))
   let userName=fetch.firstName
    profileName.innerText=userName
}
profileData()
     function showTotalCart(){
      let fetch=localStorage.getItem("TOTALCART")
        cartItemLength.innerText=fetch||0
}
showTotalCart()
    async function statistics(array){
     let cat=await firebase.database().ref("categories").get()
     let catData=Object.values(cat.val())
     categoryArray=catData
     let totalProducts=document.getElementById("totalProducts")
     let totalCategory=document.getElementById("totalCategory")
     totalProducts.innerText=array.length-1+"+"
     totalCategory.innerText=catData.length-1+"+"
    }
filterFunction=()=>{
   
    search.addEventListener("input",(e)=>{
    
    let filtered=categoryArray.filter(item=>{
   return item.categoryName.toLowerCase().includes(e.target.value.toLowerCase())
})
catRow.innerHTML=`<div class="spinner"></div>`
setTimeout(()=>{
    catRow.innerHTML=""
    if(filtered==false){
        catRow.innerHTML="<h1 id='cat-not'>Category Not Found</h1>"
    }
filtered.forEach(item=>{
catRow.innerHTML+=`
    <div class="col-lg-4 col-md-6">
    <!-- Main Card -->
    <div class="card border-0 shadow-sm mt-5 " style="max-width: 400px; border-radius: 20px; overflow: hidden;">
        
        <!-- Card Image -->
        <img src=${item.proImage} 
             class="card-img-top" 
             alt="Pizza"
             style="height: 200px; object-fit: cover;">
        
        <!-- Card Body -->
        <div class="card-body p-4" >
            
            <!-- Title -->
            <h3 class="card-title fw-bold mb-2">${item.categoryName}</h3>
            
            <!-- Description -->
            <p class="card-text text-secondary mb-3">${item.description}</p>         
            <!-- Stats Row -->
            <div class="d-flex justify-content-between align-items-center mb-4">
                <!-- Items Count -->
                <div class="text-secondary">
                    <h6>Total Items ${proCountShow}</h6>
                </div>
                
                <!-- Rating -->
                <div class="d-flex align-items-center">
                    <span class="text-warning me-1">★</span>
                    <span class="fw-semibold">4.5</span>
                </div>
            </div>
            
            <!-- Browse Menu Link -->
            <a href='product.html?catName=${item.categoryName}&catKey=${item.catKey}'
            
             class="text-decoration-none fw-semibold" 
               style="color: #FF6B4A;">
                Browse Menu →
            </a>
        </div>
    </div>
</div>
    `
})
    
},1000)

})
}
filterFunction()
async function match(){
await firebase.database().ref("products").get()
 .then(async(data)=>{
    let array =Object.values(data.val())
    statistics(array)
    array.forEach((product)=>{
        if(proCount[product.selectedCat]){
            proCount[product.selectedCat]++
        }
        else{
            proCount[product.selectedCat]=1
        }

 })
 let check=Object.keys(proCount)

 
})
 .catch((e)=>{
    console.log(e)
 })
}
match()



async function showCategory(){
 let data=await firebase.database().ref("categories").get()
 catRow.innerHTML=`
 <div class="spinner"></div>
 `
 setTimeout(()=>{
  catRow.innerHTML=""  
if(data.val()==null){
    catRow.innerHTML=`<h2 style="text-align : center; color:#ff6b35;">Category not found</h2>`
    return
 }
 else{
 let array=Object.values(data.val())

 array.forEach(cat=>{
     proCountShow = proCount[cat.categoryName] || 0
   catRow.innerHTML+=`
    <div class="col-lg-4 col-md-6">
    <!-- Main Card -->
    <div class="card border-0 shadow-sm mt-5 " style="max-width: 400px; border-radius: 20px; overflow: hidden;">
        
        <!-- Card Image -->
        <img src='${cat.proImage}'
             class="card-img-top" 
             alt="Pizza"
             style="height: 200px; object-fit: cover;">
        
        <!-- Card Body -->
        <div class="card-body p-4" >
            
            <!-- Title -->
            <h3 class="card-title fw-bold mb-2">${cat.categoryName}</h3>
            
            <!-- Description -->
            <p class="card-text text-secondary mb-3">${cat.description}</p>         
            <!-- Stats Row -->
            <div class="d-flex justify-content-between align-items-center mb-4">
                <!-- Items Count -->
                <div class="text-secondary">
                    <h6>Total Items ${proCountShow}</h6>
                </div>
                
                <!-- Rating -->
                <div class="d-flex align-items-center">
                    <span class="text-warning me-1">★</span>
                    <span class="fw-semibold">4.5</span>
                </div>
            </div>
            
            <!-- Browse Menu Link -->
            <a href='product.html?catName=${cat.categoryName}&catKey=${cat.catKey}'
            
             class="text-decoration-none fw-semibold" 
               style="color: #FF6B4A;">
                Browse Menu →
            </a>
        </div>
    </div>
</div>
    `
 })
    
 }
 },2000)
 
 
} 
showCategory()