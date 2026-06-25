import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import Bg from '../assets/herobg.jfif';

const BookingHeader = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="350px"
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        bgImage={`linear-gradient(to bottom, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url(${Bg})`}
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
      />
      <Heading as="h1" size="2xl" color="white" zIndex={1} fontFamily={"Francois One"}>
        BOOK YOUR TRIP
      </Heading>
    </Box>
  );
};

export default BookingHeader;
