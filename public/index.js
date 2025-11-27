window.onload = async function() {
    const currentID = localStorage.getItem("ユーザーID");
    console.log("対象のユーザーID (LocalStorage):", currentID);

    if (currentID) {
        try {
            const response = await fetch(`/api?id=${currentID}`);
            
            if (response.ok) {
                const savedData = await response.json();
                console.log("サーバーから復元したデータ:", savedData);

                if (savedData.name) {
                    document.getElementById("name").value = savedData.name;
                }

                const likesString = savedData.likes;
                if (likesString) {
                    for (let i = 0; i < likesString.length; i++) {
                        if (likesString[i] === "1") {
                            const checkbox = document.getElementById(`hobby-${i + 1}`);
                            if (checkbox) {
                                checkbox.checked = true;
                            }
                        }
                    }
                }
            } else {
                console.log("データが見つかりませんでした");
            }
        } catch (error) {
            console.error("データの復元に失敗しました:", error);
        }
    }else {
        console.log("ローカルストレージにIDがありません（新規作成）");
    }

};  

async function profileData(){
    let nameInput = document.getElementById("name")
    let nameValue = nameInput.value;

    let allBoxes = document.querySelectorAll('.tag-input');
    let bitString = "";

    if (nameValue == "") {
        alert("名前が入力されていません");
        return;
    }

    allBoxes.forEach(function(box) {
        if (box.checked == true) {
            // チェックされてたら "1" 
            bitString = bitString + "1"; 
        } else {
            // されてなかったら "0" 
            bitString = bitString + "0"; 
        }
    });

    let profileData = {
        "name": nameValue,
        "likes": bitString
    };

    console.log("--- 送信データ ---");
    console.log(profileData);

    const currentID = localStorage.getItem("ユーザーID");
    const queryParam = currentID ? `?id=${encodeURIComponent(currentID)}` : "";
    console.log("リクエストURL:", `/api/save-data${queryParam}`);
    
    const resp = await fetch(`/api/save-data${queryParam}`, {
        method: "POST",
        headers: {
             "Content-Type": "application/json"
        },
        body: JSON.stringify(profileData),
        });
    
    let resultText = await resp.text();
    console.log("生のサーバー応答:", resultText);

    resultText = resultText.trim().replace(/"/g, '');

    console.log("修正後のID:", resultText);

    localStorage.setItem("ユーザーID", resultText);

    window.location.href = `display.html?id=${encodeURIComponent(resultText)}`;
}
