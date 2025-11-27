window.onload = async function(){
    const urlParam = new URLSearchParams(window.location.search);
    const userID = urlParam.get('id');
    
    console.log("ユーザーID", userID);

    if(!userID){
        alert("IDが読み込めません");
        return;
    }

    try {
        const response = await fetch(`/api?id=${userID}`);
        const data = await response.json();

        console.log("取得したデータ", data);

        displayProfile(data);

    } catch(error){
        console.error("エラーが発生しました", error);
        alert("データの取得に失敗しました");
    }

    const backBtn = document.getElementById("back-btn");
    backBtn.onclick = function() {
        window.location.href = `index.html?id=${encodeURIComponent(userID)}`; 
    };

    const qrBtn = document.getElementById("qr-btn");
    qrBtn.onclick = function() {
        window.location.href = `QRcode.html?id=${encodeURIComponent(userID)}`;
    };

    const allBtn = document.getElementById("all-btn");
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