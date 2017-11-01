#include <gif_lib.h>
#include <iostream>
#include <string>

int main(int argc, char* argv[]){
    int error;
    if(argc != 3){
        std::cout << "usage: ./encode [message] [path/to/gif]" << std::endl;
        return false;
    }
    GifFileType* gif = DGifOpenFileName(argv[2]);

    if (gif == NULL) {
        std::cout << "Failed to open .gif, return error with type " << std::endl;
        return false;
    }
    
    int slurpReturn = DGifSlurp(gif);
    if (slurpReturn != GIF_OK) {
        std::cout << "Failed to read .gif file" << std::endl;
        return false;
    }

    GifColorType* colors = gif->SavedImages[1].ImageDesc.ColorMap->Colors;
    
    std::string message(argv[1]);
    gif->SavedImages[1].ImageDesc.ColorMap->Colors[0].Red = (char) (message.size()%255);
    gif->SavedImages[1].ImageDesc.ColorMap->Colors[1].Green = (char) (message.size()/255);
    for(int i = 0; i < message.size(); i++){
        colors[i+2].Blue = message[i];
    }

    GifFileType* gifOut = EGifOpenFileName(argv[2] + "encoded.gif", error);
    gifOut->SWidth = gif->SWidth;
    gifOut->SHeight = gif->SHeight;
    gifOut->SColorResolution = gif->SColorResolution;
    gifOut->SBackGroundColor = gif->SBackGroundColor;
    gifOut->SColorMap = gif->SColorMap;
    gifOut->ImageCount = gif->ImageCount;
    gifOut->Image = gif->Image;
    gifOut->SavedImages = gif->SavedImages;

    EGifSpew(gifOut);
}