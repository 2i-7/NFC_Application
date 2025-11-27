window.onload = async function(){
    const urlParam = new URLSearchParams(window.location.search);
    const currentViewID = urlParam.get('id');
    
    const myID =  localStorage.getItem("ユーザーID");

    console.log("表示中のID:", currentViewID);
    console.log("自分のID:", myID);

    if(!currentViewID){
        alert("IDが読み込めません");
        return;
    }

    try {
        const response = await fetch(`/api?id=${currentViewID}`);
        const data = await response.json();

        console.log("取得したデータ", data);

        displayProfile(data);

    } catch(error){
        console.error("エラーが発生しました", error);
        alert("データの取得に失敗しました");
    }
    const backBtn = document.getElementById("back-btn");
    const qrBtn = document.getElementById("qr-btn");
    const myProfileBtn = document.getElementById("my-profile-btn");
    const allBtn = document.getElementById("all-btn");

    if (currentViewID === myID) {
        backBtn.style.display = "block";      
        qrBtn.style.display = "block";         
        myProfileBtn.style.display = "none";   
    } else {
        backBtn.style.display = "none";        
        qrBtn.style.display = "none";          
        
        if (myID) {
            myProfileBtn.style.display = "block";
        }
    }
    allBtn.style.display = "block";

    backBtn.onclick = function() {
        window.location.href = `index.html?id=${encodeURIComponent(myID)}`; 
    };

    qrBtn.onclick = function() {
        window.location.href = `QRcode.html?id=${encodeURIComponent(myID)}`;
    };

    myProfileBtn.onclick = function() {
        window.location.href = `display.html?id=${encodeURIComponent(myID)}`;
    };

    allBtn.onclick = function() {
        window.location.href = `list.html`
    }
};

function displayProfile(data){
    const name = document.getElementById("display-name");
    name.textContent = data.name;

    const likesList = ["料理","音楽","読書","スポーツ","映画鑑賞","開発"];
    const likesStrings = data.likes;
    const likes = document.getElementById("display-likes");

    likes.innerHTML = "";

    for(let i = 0; i < likesStrings.length; i++){
        if(likesStrings[i] == "1"){
            let tag = document.createElement("span");
            tag.textContent = likesList[i];
            tag.className = "tag-label"; 
            likes.appendChild(tag);
        }
    }
}