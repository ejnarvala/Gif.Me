var conf;
document.addEventListener('DOMContentLoaded', function(){
    console.log("DOM Loaded");
    conf = $.getJSON("config.json");
    if (conf.responseJSON.private_key == "" || conf.responseJSON.public_key == ""){
        
    }
    document.getElementById('encrypt').addEventListener('click', function(){
        console.log("clicked");
    });
})
