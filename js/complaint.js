let total_complaint_state= document.getElementById("total-complaint-state")
let owner_replies=document.getElementById("owner-replies")
let resolved_complaint=document.getElementById("resolved-complaint")
let complaintsContainer=document.getElementById("complaintsContainer")
 let getData =JSON.parse(localStorage.getItem("USER-DETAIL"))
 function profileData(){
  let profileName=document.getElementById("profile-name")
  let fetch =JSON.parse(localStorage.getItem("USER-DETAIL"))||[]
  let userName=fetch.firstName

profileName.innerText=userName
}
profileData()   

function showTotalCart(){
       complaintsContainer.innerHTML="<div class='spinner'></div>"
  
      let cartItemLength=document.getElementById("cart-item-length")
        let fetch=localStorage.getItem("TOTALCART")
        cartItemLength.innerText=fetch||0
    }
     showTotalCart()

let complaintStates=async()=>{
    let getComplaint=await firebase.database().ref("complaint").get()     
    if(getComplaint.val()==null){
        setTimeout(()=>{
        complaintsContainer.innerHTML=""
         complaintsContainer.innerHTML=`<h2 style="color:#FF6B35; text-align:center; margin-top:20px;">Complaint Not Found</h2>`
        },1000)
    }
    else{
     
    let array=Object.values(getComplaint.val())
    complaintShow(array)
    let filtered=array.filter(item=>{
       return item.email==getData.email
    })
    // total Complaint
    total_complaint_state.innerText=filtered.length||0
    let responseFiltered=array.filter(item=>{
     return   item.response.length>0
    })
     owner_replies.innerText=responseFiltered.length||0
    // resolved complaints
    let resolvedFiltered=array.filter(item=>{
       return item.status=="resolved"
    })
    resolved_complaint.innerText=resolvedFiltered.length ||0
       
    }}
complaintStates()
complaintShow=(array)=>{
    let filtered=array.filter(item=>{
       return item.email==getData.email
    })
    if(filtered.length>0){
    setTimeout(()=>{
    complaintsContainer.innerHTML=""
    if(filtered.length>0){
    filtered.forEach(item => {
        complaintsContainer.innerHTML+=`
          <div class="complaint-card">
                    <div class="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-3">
                        <div class="d-flex flex-wrap gap-2 align-items-center">
                            <span class="user-badge">
                                <i class="fas fa-user-circle"></i> ${item.userName}
                            </span>
                            <span class="complaint-subject">
                                ${item.subject}
                            </span>
                        </div>
                        <small class="text-muted">
                            <i class="far fa-calendar-alt me-1"></i> ${item.date}
                        </small>
                    </div>
                    
                    <div class="complaint-text">
                        <div class="d-flex mb-2">
                            <i class="fas fa-exclamation-triangle text-primary me-2 mt-1"></i>
                            <strong>Complaint:</strong>
                        </div>
                        <p class="mb-2">${item.message}</p>
                        <small class="text-muted">
                            <i class="far fa-envelope me-1"></i> ${item.email}
                        </small>
                    </div>
                    
                    <div class="reply-section">
                        <div class="d-flex align-items-center mb-3">
                            <i class="fas fa-reply-all me-2" style="color: var(--secondary);"></i>
                            <strong>Owner's Response(s):</strong>
                        </div>
                        <div class="reply-item">
                            <div class="d-flex flex-wrap justify-content-between align-items-center">
                                <span class="owner-badge">
                                    <i class="fas fa-store"></i> Owner - FoodExpress
                                </span>
                                <small class="text-muted">
                                    <i class="far fa-clock me-1"></i>${item.responseDate||0}
                                </small>
                            </div>
                            <div class="reply-text">
                                <i class="fas fa-quote-left me-1" style="color: var(--secondary); opacity: 0.6;"></i>
                                 ${item.response?item.response:"Thank you for your complaint! Our support team has been notified and will review your issue within 24 hours. You will receive a response via email shortly."}
                            </div>
                        </div>
                    </div>
                </div>
        `
    });
     }
    },1000)
    
    }
   
}   