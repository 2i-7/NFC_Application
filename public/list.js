async function listController() {
    let allBoxes = document.querySelectorAll('.list-tag-input');
    let bitString = "";
    allBoxes.forEach(function(box) {
        if (box.checked == true) {
            // チェックされてたら "1" 
            bitString = bitString + "1"; 
        } else {
            // されてなかったら "0" 
            bitString = bitString + "0"; 
        }
    });
    if(bitString){
        list =  await fetch(`/all-data?like=${encodeURIComponent(bitString)}`).then(response => response.json())
    }else{
        list =  await fetch("/all-data").then(response => response.json())
    }

    
    const likesList = ["料理","音楽","読書","スポーツ","映画鑑賞","開発"];
    console.log(list);
    const userlist = document.getElementById("userlist");
    userlist.innerHTML = "";
    list.forEach((item) => {
        const userDiv = document.createElement("div");
        userDiv.className = "user-entry";
        const name = item.value.name;
        const id = item.key[1];
        userDiv.innerHTML = `<p class="item-center"> <button onclick="openUserProfile('${id}')" class="list-button"> ${name}  </button> </p> `;
        userlist.appendChild(userDiv);
    });
}

function openUserProfile(id) {
    window.location.href = `display.html?id=${encodeURIComponent(id)}`;
}

function backToTop() {
    const id=  localStorage.getItem("ユーザーID");
    window.location.href = `/display.html?id=${encodeURIComponent(id)}`;
}

document.addEventListener('DOMContentLoaded', (event) => {
    listController()
});