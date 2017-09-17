#include <gif_lib.h>
//#include <openssl>
#include <iostream>

int main(){
    int error;
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
    char message[] = "This is a test";
    for(int i = 0; i < sizeof(message); i++){
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

    GifFileType* gif2 = DGifOpenFileName("generated4.gif");
    
    if (gif2 == NULL) {
        std::cout << "Failed to open .gif, return error with type " << std::endl;
        return false;
    }
    
    int slurpReturn2 = DGifSlurp(gif2);
    if (slurpReturn2 != GIF_OK) {
        std::cout << "Failed to read .gif file" << std::endl;
        return false;
    }

    std::cout << "DECODED:" << std::endl;
    std::cout << (char)gif2->SavedImages[1].ImageDesc.ColorMap->Colors[0].Blue << std::endl;
    //for(int i = 0; i < sizeof(key); i++){
    //    std::cout << gif2->SavedImages[0].ImageDesc.ColorMap->Colors[i].Blue << std::endl;
    //}
}