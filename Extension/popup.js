<<<<<<< HEAD
=======
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
    var key = new NodeRSA(publicKey);
    return key.encrypt(message);
}

function decrypt(privateKey, message){
    var key = new NodeRSA(privateKey);
    return key.decrypt(message);
}

>>>>>>> c60c107c588e1478c2fa40b454aef195efa3bf64
document.addEventListener('DOMContentLoaded', function(){
    //check config file, if nothing configured, show initial setup, if configured, show normal UI
    document.getElementById('encoded_gif_div').style.display = 'none';


    // chrome.storage.sync.set({"public_key":""}, function(){
    //     if(chrome.runtime.error){
    //         console.log("Runtime Error.");
    //     }
    //     else{
    //     }
    // });
    // chrome.storage.sync.set({"private_key":"2"}, function(){
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


        document.getElementById('encoded_gif_url').innerHTML = "Recieved URL";
        document.getElementById('encoded_gif_div').style.display = 'initial';
        // $.post($(this).attr('action'), $(this).serialize(), function(response){
        //     //on success, do something
        // }, 'json');
        return false;
    });
    $("#form-first").submit(function(event){
        event.preventDefault();
        console.log("submit first time");
        if(document.getElementById('user_gif_url').value == ""){
            document.getElementById('error1').innerHTML = "Please Enter a GIF URL";
        }
        //get gif link
        var keys = generateKey();
        console.log(keys);
        chrome.storage.sync.set({"public_key": keys.public}, function(){
            if(chrome.runtime.error){
                console.log("Runtime Error.");
            }
        });
        chrome.storage.sync.set({"private_key": keys.private}, function(){
            if(chrome.runtime.error){
                console.log("Runtime Error.");
            }
        });
    })


    //add event listener for when button is clicked
    document.getElementById('encrypt').addEventListener('click', function(){
        console.log("clicked");
    });
});