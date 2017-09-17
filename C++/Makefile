CXXFLAGS = -c -g
LDFLAGS  = -lgif
CXX = g++

encode: encode.o
	$(CXX) -o encode encode.o $(LDFLAGS)

encode.o: encode.cc
	$(CXX) $(CXXFLAGS) encode.cc

decode: decode.o
	$(CXX) -o decode decode.o $(LDFLAGS)

decode.o: decode.cc
	$(CXX) $(CXXFLAGS) decode.cc

generateGIF: generateGIF.o
	$(CXX) -o generateGIF generateGIF.o $(LDFLAGS)

generateGIF.o: generateGIF.cc
	$(CXX) $(CXXFLAGS) generateGIF.cc