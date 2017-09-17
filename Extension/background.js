
function decrypt(privateKey, message){
    var key = new NodeRSA(privateKey, 'pkcs8-private');
    return key.decrypt(message);
}

function Decrypt(info, tab){
    console.log(info);
    var gif_url = info.selectionText;
    var userID = info.pageUrl;
    userID = userID.substring(userID.search("messenger.com/t/") + 16);
    chrome.storage.sync.get(userID, function(items){
        $.ajax({
            url: "http://hackmit.eastus.cloudapp.azure.com/decode",
            type: "get",
            crossDomain: true,
            data:{
                gifurl: gif_url,
            },
            success: function(response){
                alert("Decrypted: ", message);
                // message = decrypt(items[userID], response.message);
            },
            error: function (xhr, ajaxOptions, thrownError){
                alert(xhr.status);
                alert(thrownError);
            }
        });
    })


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
    contexts: ["link", "image", "selection"],
    onclick: Decrypt
})
chrome.contextMenus.create({
    title: "Add Public Key",
    contexts: ["link", "image"],
    onclick: AddKey
})