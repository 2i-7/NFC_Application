async function tagrender(){
    const likesList = ["料理","音楽","読書","スポーツ","映画鑑賞","開発"];

    const taglist = document.getElementById("taglist");
    taglist.innerHTML = "";
    
    for(let i=0;i<likesList.length;i++){
        console.log(likesList[i]);
        const listDiv = document.createElement("div");
        listDiv.innerHTML = `<input type="checkbox" id="hobby-${i+1}" class="tag-input" value="${i+1}"><label for="hobby-${i+1}" class="tag-label">${likesList[i]}</label>`
        taglist.appendChild(listDiv);
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    tagrender();
});