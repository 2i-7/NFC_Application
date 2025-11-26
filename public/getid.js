let params = new URLSearchParams(document.location.search);

var genelate_url = `${window.location.origin}/disply.html?id=${params.get("id")}`;
console.log(genelate_url);
 // `src`を新しいパスに変更
document.getElementById('url').src = "https://api.qrserver.com/v1/create-qr-code/?data="+genelate_url+"&size=100x100";