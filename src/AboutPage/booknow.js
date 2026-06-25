import React from "react";
import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import BgImage from "../assets/book.png";

const BookNowPanel = () => {
  return (
    <Box
      bgImage={`url(${BgImage})`}
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      h="180px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={8}
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        align={{ base: "center", md: "flex-start" }}
        bg="rgba(0, 0, 0, 0.5)"
        p={6}
        borderRadius="md"
        color="white"
        width="100%"
        maxW="1200px"
      >
        <Box flex={1} textAlign={{ base: "center", md: "left" }} mb={{ base: 4, md: 0 }}>
          <Text fontSize="xl" mb={2} fontFamily={"Poppins"}>
            Exclusive Travel Deals
          </Text>
          <Heading as="h2" size="lg" fontFamily={"Francois One"}>
            AUGURI! Expert in Navigation and Comfort
          </Heading>
        </Box>
        <Box flex={1} textAlign={{ base: "center", md: "right" }} >
          <Button
            as={NavLink}
            to="/booking"
            fontSize="lg"
            fontWeight="bold"
            color="white"
            bg="#9D7C49"
            fontFamily={"Poppins"}
            _hover={{opacity: '0.9'}}
          >
            Book Now
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default BookNowPanel;
