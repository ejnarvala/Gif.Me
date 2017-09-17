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
    var key = new NodeRSA(publicKey, 'pkcs8-public');
    console.log(publicKey, key);
    return key.encrypt(message);
}

function decrypt(privateKey, message){
    var key = new NodeRSA(privateKey, 'pkcs8-private');
    return key.decrypt(message);
}

document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('encoded_gif_div').style.display = 'none';

    // chrome.storage.sync.set({"KPrabs106":"-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxef5EbkKokVLJIMaveQfFDlSDL+KiN90OYD7nR3bmX/bfuq/L8HSkgJ4l3ppohbVxhDM9ddal5qCzR/A3PUrS5235+jUYEOg7nA+gq5qT+LP4sD6YyLgtatDLRaKvcwnn5Lsor5knCS/5KZDVQNWpHtsCJnJjXKmcKtNPZCoe/APhihwro8LwYBdHOvxiwSRvY3Vy+XpjfEKL+C8dsdIo1WeMyDiIZhPSp8ghdxIYWVmV/ikQUXy/h4xq/yzaHPmBGvocX8YJbqj1WgW7teYkBDp6KB094XIIo6b5vdlfqP8bm+ILK/sxLCm+AHadP5i4013UeRzyo1ILycc3fpBNwIDAQAB-----END PUBLIC KEY-----"}, function(){
    //     if(chrome.runtime.error){
    //         console.log("Runtime Error.");
    //     }
    //     else{
    //         console.log("key reset");
    //     }
    // });
    // chrome.storage.sync.get("KPrabs106", function(items){
    //     console.log(items["KPrabs106"]);
    // })
    // chrome.storage.sync.set({"private_key":""}, function(){
    //     if(chrome.runtime.error){
    //         console.log("Runtime Error.");
    //     }
    //     else{
    //     }
    // });
    // chrome.storage.sync.set({"gif_key_url":"https://media.giphy.com/media/VVi4ameHu5RGE/giphy.gif"}, function(){
    //     if(chrome.runtime.error){
    //         console.log("Runtime Error.");
    //     }
    //     else{
    //     }
    // });
    chrome.storage.sync.get(["public_key","private_key", "gif_key_url"], function(items){
        console.log(items.private_key, items.public_key);
        if(items.public_key == "" || items.public_key == undefined || items.private_key == "" || items.private_key == undefined){
            document.getElementById('normal_div').style.display = 'none';            
        } else{
            document.getElementById('first_time_div').style.display = 'none';
            document.getElementById('gif_url').innerHTML = items.gif_key_url; //set url to the source of gif
            document.getElementById('user_gif').src = items.gif_key_url;
        }
    });

    $("#form-normal").submit(function(event){
        event.preventDefault();
        console.log("submit");
        if(document.getElementById('msg_gif_url').value == "" || document.getElementById('msg').value == ""){
            document.getElementById('error').innerHTML = "Please Enter a GIF URL/Message.";
        }

        chrome.tabs.query({
            'active': true,
            'windowId': chrome.windows.WINDOW_ID_CURRENT
        }, function (tabs) {
            var current_url = tabs[0].url;
            var userID = current_url.substring(current_url.search("messenger.com/t/") + 16);
            // chrome.storage.sync.get(userID, function(items){
            chrome.storage.sync.get("public_key", function(items){
                // to_public_key = items[userID]
                // var encryptedMsg = encrypt(to_public_key, document.getElementById('msg_gif_url').value);
                console.log(items.public_key);
                // var encryptedMsg = encrypt(items.public_key, document.getElementById('msg').value);
                $.ajax({
                    url: "http://hackmit.eastus.cloudapp.azure.com/users",
                    type: "get",
                    crossDomain: true,
                        data :{
                            gifurl: document.getElementById('msg_gif_url').value,
                            message: document.getElementById('msg').value
                        },
                    success: function(response){
                        console.log(response);
                        document.getElementById('encoded_gif_url').innerHTML = response;
                        document.getElementById('encoded_gif_div').style.display = 'block';
                    }
                });
            });
        });
        var data = JSON.stringify({"gifurl" : document.getElementById('msg'), "message":document.getElementById('msg_gif_url').value});
        
        // $.ajax({
        //     url: "http://hackmit.eastus.cloudapp.azure.com/users",
        //     type: "get",
        //     crossDomain: true,
        //     data :{
        //         gifurl: document.getElementById('msg_gif_url').value,
        //         message: document.getElementById('msg').value
        //     },
        //     success: function(response){
        //         console.log(response);
        //         document.getElementById('encoded_gif_url').innerHTML = response;
        //         document.getElementById('encoded_gif_div').style.display = 'block';
        //     }
        // });
        return false;
    });
    $("#form-first").submit(function(event){
        event.preventDefault();
        console.log("submit first time");
        if(document.getElementById('user_gif_url').value == ""){    
            document.getElementById('error1').innerHTML = "Please Enter a GIF URL";
        }
        var keys = generateKey();
        console.log(keys);
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
                gifurl: document.getElementById('user_gif_url'),
                message: keys.public
            },
            success: function(response){
                console.log(response);
                console.log("response");
                //set the gif_key_url to the returned gif url
                // chrome.storage.sync.set({"gif_key_url": response.}, function(){
                //     if(chrome.runtime.error){
                //         console.log("Runtime Error.");
                //     }
                // });
            }
        });
    })


});