document.addEventListener('DOMContentLoaded', function(){
    console.log("DOM Loaded");
    $.getJSON("config.json", function(data){
        if (data.private_key == "" || data.public_key == ""){
            document.getElementById('normal_div').style.display = 'none';
        }else{
            document.getElementById('first_time_div').style.display = 'none';   
        }
    });
    document.getElementById('encrypt').addEventListener('click', function(){
        console.log("clicked");
    });
})
