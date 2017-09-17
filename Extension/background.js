function Decrypt(info, tab){
    console.log(info.linkUrl);
}
function AddKey(info, tab){
    var userID = info.pageUrl;
    userID = userID.substring(userID.search("messenger.com/t/") + 16);
    var public_key = "Test_Key";//ask server to return key
    var obj = {};
    obj[userID] = public_key;
    chrome.storage.sync.set(obj, function(){
        if(chrome.runtime.error){
            console.log("Runtime Error.");
        }
    });
    //verify it's there
    // chrome.storage.sync.get(userID, function(items){
    //     if (!chrome.runtime.error){
    //         console.log(items);
    //     }
    // });
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