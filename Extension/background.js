function Decrypt(info, tab){
    console.log(info.linkUrl);
}
function AddKey(info, tab){
    var userID = info.pageUrl;
    userID = userID.substring(userID.search("messenger.com/t/") + 16);
    var Public_key = "Test_Key";//ask server to return key
    
}
chrome.contextMenus.create({
    title: "Decrypt GIF",
    contexts: ["link", "image"],
    onclick: Decrypt
})
chrome.contextMenus.create({
    title: "Add Public Key",
    contexts: ["link", "image"],
    onclick: AddKey
})