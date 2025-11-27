async function listController() {
   list =  await fetch("/all-data")
    .then(response => response.json())

    console.log(list);
    const userlist = document.getElementById("userlist");
    userlist.innerHTML = "";
    list.forEach((item) => {
        const userDiv = document.createElement("div");
        userDiv.className = "user-entry";
        const name = item.value.name;
        const id = item.key[1];
        const like = item.value.like;
        
        userDiv.innerHTML = `<p> <button onclick="openUserProfile('${id}')" class="list-button"><strong>Name:</strong> ${name}  </button> </p> `;
        userlist.appendChild(userDiv);
    });
}

function openUserProfile(id) {
    window.location.href = "display.html?id=" + encodeURIComponent(id);
}