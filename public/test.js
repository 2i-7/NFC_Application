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
    resp = await fetch("/api/save-data", {
        method: "POST",
        headers: {
             "Content-Type": "application/json"
        },
        body: JSON.stringify(profileData),
        });
    console.log(await resp.text());
}
