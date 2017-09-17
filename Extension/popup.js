document.addEventListener('DOMContentLoaded', function(){
    //check config file, if nothing configured, show initial setup, if configured, show normal UI
    document.getElementById('encoded_gif_div').style.display = 'none';
    $.getJSON("config.json", function(data){
        if (data.private_key == "" || data.public_key == ""){
            document.getElementById('normal_div').style.display = 'none';
        }else{
            document.getElementById('first_time_div').style.display = 'none';   
        }
        document.getElementById('gif_url').innerHTML = data.gif_key_url; //set url to the source of gif
        document.getElementById('user_gif').src = data.gif_key_url;
    });

    $("form").submit(function(event){
        event.preventDefault();
        console.log("submit initiated");
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


    //add event listener for when button is clicked
    document.getElementById('encrypt').addEventListener('click', function(){
        console.log("clicked");
    });

    // document.getElementById('user_gif').addEventListener('click', function(){
    //     console.log("image clicked");
    //     console.log(document.getElementById('user_gif').src)
    //     window.clipboardData.setData("Text", getElementById('user_gif').src);
    // });
})
