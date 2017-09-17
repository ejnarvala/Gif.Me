CXXFLAGS = -c -g
LDFLAGS  = -lgif -lssl -lcrypto
CXX = g++

generateGIF: generateGIF.o
	$(CXX) -o generateGIF generateGIF.o $(LDFLAGS)

generateGIF.o: generateGIF.cc
	$(CXX) $(CXXFLAGS) generateGIF.cc