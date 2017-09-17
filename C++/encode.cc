#include <gif_lib.h>
#include <iostream>
#include <string>

int main(int argc, char* argv[]){
    GifFileType* gif = DGifOpenFileName("giphy.gif");

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
    gif->SavedImages[0].ImageDesc.ColorMap->Colors[0].Red = (char) (message.size()%255);
    gif->SavedImages[0].ImageDesc.ColorMap->Colors[1].Green = (char) (message.size()/255);
    for(int i = 0; i < message.size(); i++){
        colors[i].Blue = message[i];
    }

    GifFileType* gifOut = EGifOpenFileName("generated4.gif", error);
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