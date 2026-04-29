let all_orders= document.getElementById("all-orders")
let allOrdersCount=0
let valueStore;
let cart=""
    let detailButton=""
    
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

async function orderStatistics(){
all_orders.innerHTML=`<div class="spinner"></div>`
    
    let detail=JSON.parse(localStorage.getItem("USER-DETAIL"))
let total_order=document.getElementById("total-order")
let total_spent_amount = document.getElementById("total-spent")
let totalSpent= 0;
await firebase.database().ref("orders").get()
.then(async (data)=>{
    if(data.val()!=null){
     let array=Object.values(data.val())
    
   let filter=array.filter(item=>{
        return detail.email==item.userDetail.email
    })
    allOrderShow(filter)
    allOrdersCount=filter.length||0
   
    allOrderStatusShow(filter)
    total_order.innerText=filter.length||0 
    filter.forEach(item=>{
        let amount=Number(item.totalAmount)
        totalSpent+=amount  
        total_spent_amount.innerText="RS "+totalSpent  
    })
     // all orders add userdata
    await firebase.database().ref("user-data").child(detail.userUid).update({
    allOrders:allOrdersCount,
    totalSpent:totalSpent
    })
    }
    else{
        total_order.innerText="0"
        total_spent_amount.innerText="0"
         all_orders.innerHTML=`<h2 style="text-align : center; color:#ff6b35;">Orders  not found</h2>`
    }
    })
.catch((error)=>{
    console.log(error)  
})


}
orderStatistics()
async function allOrderShow(filter){
setTimeout(()=>{
    all_orders.innerHTML=""
filter.forEach(item=>{
    detailButton=""
    detailButton=`
    <a href="order-detail.html?orderKey=${item.orderKey}">
                                    <button class="action-btn view-btn" >
                                        <i class="fas fa-eye"></i> View
                                    </button>
                                    </a>
    `
    cart=""
    item.order.forEach(item=>{
    cart+=`
    <div class="item-preview">
                                    <img src="${item.proImage}" 
                                         class="item-image" alt="Chicken Tikka Pizza">
                                    <div>
                                        <div class="item-name">${item.proName}</div>
                                        <div class="item-quantity">Qty: ${item.quantity}</div>
                                    </div>
                                </div>
                              
    `
    })
    
    all_orders.innerHTML+=`
    <div class="order-card">
                            <div class="order-header">
                                <div class="order-info">
                                    <h4>Order ${item.orderKey}</h4>
                                    <div class="order-date">Date ${item.Date}</div>
                                    <div class="order-date">Time ${item.time}</div>
                                </div>
                                <div class="order-status status-delivered">${item.status}</div>
                            </div>
                            
                            <div class="order-items-preview">
                            ${cart}
                            </div>
                            <div class="order-footer">
                                <div class="order-total">Total Amount: RS:- ${item.totalAmount}</div>
                                <div class="order-actions">
                                    <button class="action-btn reorder-btn">
                                        <i class="fas fa-redo"></i> Reorder
                                    </button>
                                    <button class="action-btn rate-btn">
                                        <i class="fas fa-star"></i> Rate
                                    </button>
                                  ${detailButton}    

                                </div>
                            </div>
                        </div>
                        
    `
})
},1000)    
}

allOrderStatusShow=(filter)=>{
let check=document.querySelectorAll(".check")
    check.forEach(button=>{
    button.addEventListener("click",function(){
       this.classList.add("active")
       ActiveStatusShow(this.querySelector("p").innerText)
    })
})
let allOrder=document.getElementById("allOrders")
let activeOrders=document.getElementById("activeOrders")
let deliveredOrders=document.getElementById("deliveredOrders")
let pendingOrders=document.getElementById("pendingOrders")
let cancelledOrders=document.getElementById("cancelledOrders")
let Statistics_all_active_orders=document.getElementById("Statistics-all-active-orders")
let Statistics_all_cancelled_orders=document.getElementById("Statistics-all-cancelled-orders")
let Statistics_all_delivered_orders=document.getElementById("Statistics-all-delivered-orders")
let Statistics_all_pending_orders=document.getElementById("Statistics-all-pending-orders")
allOrder.innerText=filter.length||0
let activeOrdersLength=filter.filter(item=> item.status=="Active")
activeOrders.innerText=activeOrdersLength.length||0
Statistics_all_active_orders.innerText=activeOrdersLength.length||0
let deliverStatus=filter.filter(item=> item.status=="Delivered")
deliveredOrders.innerText=deliverStatus.length||0
Statistics_all_delivered_orders.innerText=deliverStatus.length||0
let cancelledStatus=filter.filter(item=> item.status=="Cancelled")
cancelledOrders.innerText=cancelledStatus.length||0
Statistics_all_cancelled_orders.innerText=cancelledStatus.length||0
let pendingStatus=filter.filter(item=> item.status=="Pending")
pendingOrders.innerText=pendingStatus.length||0
Statistics_all_pending_orders.innerText=pendingStatus.length||0
valueStore=filter
}
ActiveStatusShow=(value)=>{
let filtered=valueStore.filter( item=>{
   return item.status==value
})
all_orders.innerHTML=`<div class="spinner"></div>`
setTimeout(()=>{
all_orders.innerHTML=""
   if(filtered.length==0){
        all_orders.innerHTML=`<h1 style="text-align:center; margin-top:20px; color:#FF6B35;">Not Found</h1>`
    }
filtered.forEach(item=>{
all_orders.innerHTML+=`
    <div class="order-card">
                            <div class="order-header">
                                <div class="order-info">
                                    <h4>Order ${item.orderKey}</h4>
                                    <div class="order-date">Date ${item.Date}</div>
                                    <div class="order-date">Time ${item.time}</div>
                                </div>
                                <div class="order-status status-delivered">${item.status}</div>
                            </div>
                            
                            <div class="order-items-preview">
                            ${cart}
                            </div>
                            <div class="order-footer">
                                <div class="order-total">Total Amount RS:- ${item.totalAmount}</div>
                                <div class="order-actions">
                                    <button class="action-btn reorder-btn">
                                        <i class="fas fa-redo"></i> Reorder
                                    </button>
                                    <button class="action-btn rate-btn">
                                        <i class="fas fa-star"></i> Rate
                                    </button>
                                  ${detailButton}    

                                </div>
                            </div>
                        </div>
                        
    `
})

if(value=="All Orders"){
      all_orders.innerHTML=""
     valueStore.forEach(item=>{
    all_orders.innerHTML+=`
    <div class="order-card">
                            <div class="order-header">
                                <div class="order-info">
                                    <h4>Order ${item.orderKey}</h4>
                                    <div class="order-date">Date ${item.Date}</div>
                                    <div class="order-date">Time ${item.time}</div>
                                </div>
                                <div class="order-status status-delivered">${item.status}</div>
                            </div>
                            
                            <div class="order-items-preview">
                            ${cart}
                            </div>
                            <div class="order-footer">
                                <div class="order-total">Total Amount Rs:- ${item.totalAmount}</div>
                                <div class="order-actions">
                                    <button class="action-btn reorder-btn">
                                        <i class="fas fa-redo"></i> Reorder
                                    </button>
                                    <button class="action-btn rate-btn">
                                        <i class="fas fa-star"></i> Rate
                                    </button>
                                  ${detailButton}    

                                </div>
                            </div>
                        </div>
                        
    `
    })
}
},1000)
}