import React from "react";
import { Box, Flex, Heading, Text, Image, Select, Button, VStack, HStack, useToast } from "@chakra-ui/react";
import { FaCar, FaDollarSign, FaMapMarkerAlt } from "react-icons/fa";

const carData = [
  {
    id: 1,
    name: "Tesla Model S",
    image: "https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxUZXNsYSUyME1vZGVsJTIwU3xlbnwwfHx8fDE3MTM3OTMzNDd8MA&ixlib=rb-4.0.3&q=80&w=1080",
    basePrice: 79990,
  },
  {
    id: 2,
    name: "Ford Mustang",
    image: "https://images.unsplash.com/photo-1547744152-14d985cb937f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxGb3JkJTIwTXVzdGFuZ3xlbnwwfHx8fDE3MTM3OTMzNDh8MA&ixlib=rb-4.0.3&q=80&w=1080",
    basePrice: 35585,
  },
  {
    id: 3,
    name: "Chevrolet Camaro",
    image: "https://images.unsplash.com/photo-1607764750075-8f38797f94e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxDaGV2cm9sZXQlMjBDYW1hcm98ZW58MHx8fHwxNzEzNzkzMzQ4fDA&ixlib=rb-4.0.3&q=80&w=1080",
    basePrice: 25000,
  },
  {
    id: 4,
    name: "BMW 3 Series",
    image: "https://images.unsplash.com/photo-1613027570801-5d2fe8f5e15d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxCTVclMjAzJTIwU2VyaWVzfGVufDB8fHx8MTcxMzc5MzM0OHww&ixlib=rb-4.0.3&q=80&w=1080",
    basePrice: 41000,
  },
];

const locationPriceAdjustments = {
  USA: 1.0,
  Canada: 1.1,
  Europe: 1.2,
  Australia: 1.3,
  Asia: 1.4,
};

const Index = () => {
  const toast = useToast();
  const [selectedLocation, setSelectedLocation] = React.useState("USA");

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const calculatePrice = (basePrice) => {
    return (basePrice * locationPriceAdjustments[selectedLocation]).toFixed(2);
  };

  return (
    <VStack spacing={8} p={5}>
      <Heading as="h1" size="xl" textAlign="center">
        Global Car Models & Pricing
      </Heading>
      <Select icon={<FaMapMarkerAlt />} placeholder="Select your location" onChange={handleLocationChange}>
        {Object.keys(locationPriceAdjustments).map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </Select>
      {carData.map((car) => (
        <Flex key={car.id} p={5} w="full" alignItems="center" justifyContent="space-between" borderWidth="1px" borderRadius="lg">
          <HStack spacing={4}>
            <Image boxSize="100px" src={car.image} alt={car.name} />
            <VStack align="start">
              <Text fontWeight="bold" fontSize="xl">
                {car.name}
              </Text>
              <Text fontSize="md" color="gray.500">
                Base Price: <FaDollarSign />
                {car.basePrice.toLocaleString()}
              </Text>
            </VStack>
          </HStack>
          <VStack>
            <Text fontSize="lg" fontWeight="bold">
              Price in {selectedLocation}: <FaDollarSign />
              {calculatePrice(car.basePrice)}
            </Text>
            <Button
              leftIcon={<FaCar />}
              colorScheme="blue"
              onClick={() =>
                toast({
                  title: "Purchase Inquiry",
                  description: `Inquiry sent for ${car.name} in ${selectedLocation}.`,
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                })
              }
            >
              Inquire to Buy
            </Button>
          </VStack>
        </Flex>
      ))}
    </VStack>
  );
};

export default Index;
