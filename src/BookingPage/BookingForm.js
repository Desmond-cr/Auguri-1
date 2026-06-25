import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  Flex,
  Box,
  Heading,
  Text,
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  Select,
  SimpleGrid,
  Alert,
  AlertIcon,
  AlertDescription,
  Spinner,
} from '@chakra-ui/react';
import pathImg from '../assets/travel.png';

const BookingForm = () => {
  const formRef = useRef();
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    const form = {
      from_name: formRef.current.from_name.value,
      from_email: formRef.current.from_email.value,
      phone: formRef.current.phone.value,
      travel_type: formRef.current.travel_type.value,
      departure_date: formRef.current.departure_date.value,
      return_date: formRef.current.return_date.value,
      travelers: formRef.current.travelers.value,
      destination: formRef.current.destination.value,
      message: formRef.current.message.value,
    };

    emailjs
      .send('service_i33le59', 'template_cpsdlpa', form, '4o2AvjQIQQZxcJb-i')
      .then(() => {
        setStatus('success');
        formRef.current.reset();
      })
      .catch(() => {
        setStatus('error');
      });
  };

  return (
    <Flex direction={{ base: 'column', md: 'row' }} py={8} px={{ base: '4', md: '8' }}>
      <Box flex="1" borderRadius={{ base: '15px 15px 0 0', md: '15px 0 0 15px' }} overflow="hidden">
        <img
          src={pathImg}
          alt="Travel"
          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }}
        />
      </Box>

      <Box
        flex="1.3"
        p={{ base: '4', md: '8' }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        bg="#F2F2F2"
        borderRadius={{ base: '0 0 15px 15px', md: '0 15px 15px 0' }}
      >
        <Heading as="h2" mb="2" fontFamily="Francois One" textAlign="center">
          Request a Booking
        </Heading>
        <Text mb="6" fontFamily="Poppins" textAlign="center" color="gray.600">
          Fill in the details below and our team will get back to you shortly.
        </Text>

        {status === 'success' && (
          <Alert status="success" borderRadius="md" mb={4}>
            <AlertIcon />
            <AlertDescription fontFamily="Poppins">
              Your booking request has been sent! We will contact you soon.
            </AlertDescription>
          </Alert>
        )}

        {status === 'error' && (
          <Alert status="error" borderRadius="md" mb={4}>
            <AlertIcon />
            <AlertDescription fontFamily="Poppins">
              Something went wrong. Please try again or contact us directly.
            </AlertDescription>
          </Alert>
        )}

        <form ref={formRef} onSubmit={handleSubmit}>
          <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4} mb={4}>
            <FormControl id="from_name" isRequired>
              <FormLabel fontFamily="Poppins">Full Name</FormLabel>
              <Input name="from_name" type="text" bg="white" fontFamily="Poppins" placeholder="John Doe" />
            </FormControl>

            <FormControl id="from_email" isRequired>
              <FormLabel fontFamily="Poppins">Email</FormLabel>
              <Input name="from_email" type="email" bg="white" fontFamily="Poppins" placeholder="john@example.com" />
            </FormControl>

            <FormControl id="phone">
              <FormLabel fontFamily="Poppins">Phone Number</FormLabel>
              <Input name="phone" type="tel" bg="white" fontFamily="Poppins" placeholder="+1 234 567 8900" />
            </FormControl>

            <FormControl id="travel_type">
              <FormLabel fontFamily="Poppins">Travel Type</FormLabel>
              <Select name="travel_type" bg="white" fontFamily="Poppins">
                <option value="leisure">Leisure</option>
                <option value="business">Business</option>
                <option value="group">Group Tour</option>
                <option value="honeymoon">Honeymoon</option>
                <option value="adventure">Adventure</option>
                <option value="other">Other</option>
              </Select>
            </FormControl>

            <FormControl id="departure_date">
              <FormLabel fontFamily="Poppins">Departure Date</FormLabel>
              <Input name="departure_date" type="date" bg="white" fontFamily="Poppins" />
            </FormControl>

            <FormControl id="return_date">
              <FormLabel fontFamily="Poppins">Return Date</FormLabel>
              <Input name="return_date" type="date" bg="white" fontFamily="Poppins" />
            </FormControl>

            <FormControl id="travelers">
              <FormLabel fontFamily="Poppins">Number of Travelers</FormLabel>
              <Input name="travelers" type="number" min="1" bg="white" fontFamily="Poppins" placeholder="1" />
            </FormControl>

            <FormControl id="destination" isRequired>
              <FormLabel fontFamily="Poppins">Destination</FormLabel>
              <Input name="destination" type="text" bg="white" fontFamily="Poppins" placeholder="Paris, France" />
            </FormControl>
          </SimpleGrid>

          <FormControl id="message" mb={6}>
            <FormLabel fontFamily="Poppins">Special Requests / Message</FormLabel>
            <Textarea name="message" bg="white" fontFamily="Poppins" rows={4} placeholder="Any special requirements or questions..." />
          </FormControl>

          <Button
            type="submit"
            bg="#9D7C49"
            color="white"
            size="lg"
            width="full"
            fontFamily="Poppins"
            _hover={{ opacity: 0.9 }}
            isDisabled={status === 'sending'}
          >
            {status === 'sending' ? <Spinner size="sm" /> : 'Send Booking Request'}
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default BookingForm;
