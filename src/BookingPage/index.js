import React from "react";
import { Box } from "@chakra-ui/react";
import Header from "../ContactUs/Header";
import BookingForm from "./BookingForm";
import Footer from "../Homepage/Footer";
import LiveChatButton from "../Homepage/Chatbtn";

const BookingPage = () => {
  return (
    <Box>
      <Header />
      <BookingForm />
      <LiveChatButton />
      <Footer />
    </Box>
  );
};

export default BookingPage;
