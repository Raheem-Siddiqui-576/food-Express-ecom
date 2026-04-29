let chatButt = document.getElementById("chatBtn")
let buttIcon = document.getElementById("chatButt")
let chatBox=document.getElementById("chat-box")
let exitIcon=document.getElementById("exitIcon")
let getUserDetail=JSON.parse(localStorage.getItem("USER-DETAIL"))
let senderId=getUserDetail.userUid
let email=getUserDetail.email
let userName=getUserDetail.lastName ? getUserDetail.firstName+" "+getUserDetail.lastName:getUserDetail.firstName 
let userImage=getUserDetail.proImage
let receiverId="cozUBc9ER2aJubmHc8WKhQSpjir2"
let getChatList= firebase.database().ref("chatList")
let chatBody=document.getElementById("chat-body")
let chatInp=document.getElementById("chat-inp")
let getChatListKey=""
let currentTime=""
message=""
buttIcon.addEventListener("click",()=>{
chatBox.style.display="block"
})
exitIcon.addEventListener("click",()=>{
    chatBox.style.display="none"
})
chatInp.addEventListener("keypress",(e)=>{
    if(e.key=="Enter"){
        chatButt.click()
    }
})
getChatList.on("value",(chat)=>{
    let array=Object.values(chat.val())
let filtered=array.filter(item=>{
   if(item.senderId==senderId && item.receiverId==receiverId){
   return item
   } 
})
getChatListKey=filtered[0].chatListKey
})
// send Button 1 function
async function chatListEmpty(){
    let chatListKey = await firebase.database().ref("chatList").push().getKey()
    let obj={
        senderId,
        receiverId,
        email,
        userName,
        userImage,
        chatListKey:chatListKey,

    }
    await firebase.database().ref("chatList").child(chatListKey).set(obj)
    
}
// send Button 2nd function
function userChatListMatch(){
 let match=false
getChatList.once("value",async (list)=>{
    let array=Object.values(list.val())
 for(let item in array){
   if(senderId==array[item].senderId && receiverId==array[item].receiverId){
     match=true
    break
   }
 }
 if(!match){
   let chatListKey = await firebase.database().ref("chatList").push().getKey()
   
   let obj={
        senderId,
        receiverId,
        email,
        chatListKey:chatListKey,
        userName,
        userImage


    }
   await firebase.database().ref("chatList").child(chatListKey).set(obj)

 
 }  
    
        
}
)
}
// send Button
chatButt.addEventListener("click",async ()=>{
// waqt 
    let date=new Date()
let hours=date.getHours()
let minutes=date.getMinutes()
let am_pm=hours>12?"PM":"AM"
hours=hours>12 ? hours%12:hours
minutes=minutes<10 ?"0"+minutes :minutes
console.log(minutes)
 currentTime=hours+":"+minutes+" "+am_pm
minutes= minutes="0" ? minutes+"0":minutes
//

let chat=await getChatList.get()
if(!chat.val()){
   chatListEmpty()
}
else{
userChatListMatch()
}
conditionCheck()
})

// chat function
async function conditionCheck(){
let chatList=await firebase.database().ref("chatList").get()
let array=Object.values(chatList.val())
let filtered=array.filter(item=>{
   if(item.senderId==senderId && item.receiverId==receiverId){
   return item
   } 
})
if(filtered.length==0){
    return
}
else{
    createChatBranch(filtered[0])
}
} 
async function createChatBranch(data){
    console.log(data)
if(data){
let roomId= await firebase.database().ref("chat").child(data.chatListKey).push().getKey()

let obj={
    senderId,
    receiverId,
    roomId,
    message:chatInp.value,
    time:currentTime
}
chatInp.value=""
await firebase.database().ref("chat").child(data.chatListKey).child(roomId).set(obj)
}
}
async function chatDisplay(){
let getChat=await firebase.database().ref("chat")
getChat.on("value",(chat)=>{
let data=chat.val()
for(let key in data){
   if(key==getChatListKey){
    let array=Object.values(data[key])
    chatBody.innerHTML=""
    for(let chat of array){
        
        if(chat.senderId==senderId && receiverId==chat.receiverId){
        chatBody.innerHTML+=`
            <div class="row mt-2">
        <div class="col-lg-6"></div>
        <div class="col-lg-6 text-end">
            <div class="chat-div">
                <h5 class="chat-head">${chat.message}</h5>
                <p class="time">${chat.time}</p>
                </div>
        </div>
        
      </div> 
            `
        }
        else if(chat.senderId==receiverId && receiverId==chat.senderId){
            chatBody.innerHTML+=`
           <div class="row mt-2">
        <div class="col-lg-6 text-start mt-2">
            <div class="chat-div-inner">
                <h5 class="chat-reciver">${chat.message}</h5>
                 <p class="time">${chat.time}</p>
            </div>
        </div>
        <div class="col-lg-6"></div>
      </div> 
            `
        }
    }  
         
}
}    
})
}
chatDisplay()

