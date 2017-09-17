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
