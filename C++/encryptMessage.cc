#include <iostream>
#include <string>
#include <openssl/rsa.h>
#include <openssl/engine.h>
#include <openssl/pem.h>

int main(){
    unsigned int length = 0;
    
    
    //Neat way!
    for (int i = 0; i < 4; i++)
    {
        unsigned int read_char = getchar();
        length = length | (read_char << i*8);
    }

    //read the json-message
    std::string msg = "";
    for (int i = 0; i < length; i++)
    {
        msg += getchar();
    }

    length = 0;
    //Neat way!
    for (int i = 0; i < 4; i++)
    {
        unsigned int read_char = getchar();
        length = length | (read_char << i*8);
    }

    std::string key = "";
    for (int i = 0; i < length; i++)
    {
        key += getchar();
    }

    

}