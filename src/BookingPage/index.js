import React from "react";
import { Box } from "@chakra-ui/react";
import BookingHeader from "./BookingHeader";
import BookingForm from "./BookingForm";
import Footer from "../Homepage/Footer";
import LiveChatButton from "../Homepage/Chatbtn";

const BookingPage = () => {
  return (
    <Box>
      <BookingHeader />
      <BookingForm />
      <LiveChatButton />
      <Footer />
    </Box>
  );
};

export default BookingPage;
