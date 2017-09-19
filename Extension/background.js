
function decrypt(privateKey, message){
    var key = new NodeRSA(privateKey, 'pkcs8-private');
    return key.decrypt(message);
}

function DecryptLink(info, tab){
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
                gifurl: gif_url
            },
            success: function(response){
                alert("Decrypted: ", response);
            }
        });
    })


}
function AddKey(info, tab){
    var userID = info.pageUrl;
    userID = userID.substring(userID.search("messenger.com/t/") + 16);
    $.ajax({
        url: "http://hackmit.eastus.cloudapp.azure.com/decode",
        type: "get",
        crossDomain: true,
        data:{
            gifurl: info.selectionText
        },
        success: function(response){
            var public_key = response;//ask server to return key
            var obj = {};
            obj[userID] = public_key;
            chrome.storage.sync.set(obj, function(){
                if(chrome.runtime.error){
                    console.log("Runtime Error.");
                }
            });
            // //verify it's there
            // chrome.storage.sync.get(userID, function(items){
            //     if (!chrome.runtime.error){
            //         console.log(items);
            //     }
            // });
        }
    });


}
chrome.contextMenus.create({
    title: "Decrypt GIF",
    contexts: ["link", "image", "selection"],
    onclick: DecryptLink
})
chrome.contextMenus.create({
    title: "Add Public Key",
    contexts: ["link", "image"],
    onclick: AddKey
})