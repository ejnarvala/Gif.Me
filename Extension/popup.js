var NodeRSA = require('node-rsa');
function generateKey(){
    var key = new NodeRSA({b: 2048});
    key.generateKeyPair();

    return {
        private: key.exportKey("pkcs8-private"),
        public: key.exportKey("pkcs8-public")
    };
}

function encrypt(publicKey, message){
    var key = new NodeRSA();
    console.log(publicKey, key);
    
    key.importKey(publicKey, 'pkcs8-public');
    return key.encrypt(message);
}

function decrypt(privateKey, message){
    var key = new NodeRSA();
    console.log(privateKey);
    key.importKey(privateKey, 'pkcs8-private');
    return key.decrypt(message);
}

function showEdit(){
    document.getElementById('normal_div').style.display = 'none';            
    document.getElementById('first_time_div').style.display = 'block';    
}
function showNormal(){
    document.getElementById('normal_div').style.display = 'block';            
    document.getElementById('first_time_div').style.display = 'none';   
}




document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('edit_button').addEventListener('click', function(){
        showEdit();
    });
    document.getElementById('cancel_button').addEventListener('click', function(){
        showNormal();
    });
    
    //when popup opened
    document.getElementById('encoded_gif_div').style.display = 'none';
    chrome.storage.sync.get(["public_key","private_key", "gif_key_url"], function(items){
        if(items.public_key == "" || items.public_key == undefined || items.private_key == "" || items.private_key == undefined){
            showEdit();
        } else{
            showNormal();
            document.getElementById('gif_url').innerHTML = items.gif_key_url; //set url to the source of gif
            document.getElementById('user_gif').src = items.gif_key_url;
        }
    });

    $("#form-normal").submit(function(event){
        event.preventDefault();
        console.log("submit");
        if(document.getElementById('msg_gif_url').value == "" || document.getElementById('msg').value == ""){
            document.getElementById('error').innerHTML = "Please Enter a GIF URL/Message.";
        }else{
            chrome.tabs.query({
                'active': true,
                'windowId': chrome.windows.WINDOW_ID_CURRENT
            }, function (tabs) {
                var current_url = tabs[0].url;
                var userID = current_url.substring(current_url.search("messenger.com/t/") + 16);
                chrome.storage.sync.get(userID, function(items){
                    var encryptedMsg = encrypt(items.public_key, document.getElementById('msg').value);
                    $.ajax({
                        url: "http://hackmit.eastus.cloudapp.azure.com/users",
                        type: "get",
                        crossDomain: true,
                            data :{
                                gifurl: document.getElementById('msg_gif_url').value,
                                message: encryptedMsg
                            },
                        success: function(response){
                            console.log(response);
                            document.getElementById('encoded_gif_url').innerHTML = response;
                            document.getElementById('encoded_gif_div').style.display = 'block';
                        }
                    });
                });
            }); 
        }
        return false;
    });
    //sign up form
    $("#form-first").submit(function(event){
        event.preventDefault();
        if(document.getElementById('user_gif_url').value == ""){    
            document.getElementById('error1').innerHTML = "Please Enter a GIF URL";
        } else{
            var keys = generateKey();
            //set public and private key upon creation    
            chrome.storage.sync.set({"public_key": keys.public}, function(){
                if(chrome.runtime.error){
                    console.log("Runtime Error.");
                }
                chrome.storage.sync.set({"private_key": keys.private}, function(){
                    if(chrome.runtime.error){
                        console.log("Runtime Error.");
                    }
                });
            });
            
            $.ajax({
                url: "http://hackmit.eastus.cloudapp.azure.com/users",
                type: "get",
                data:{
                    gifurl: document.getElementById('user_gif_url').value,
                    message: keys.public
                },
                success: function(response){
                    // set the gif_key_url to the returned gif url
                    chrome.storage.sync.set({"gif_key_url": response}, function(){
                        if(chrome.runtime.error){
                            console.log("Runtime Error.");
                        }
                    });
                }
            });
        }
    })
});