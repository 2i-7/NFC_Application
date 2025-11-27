async function listController() {
   list =  await fetch("/all-data")
    .then(response => response.json())
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