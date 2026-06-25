// ContactUs.jsx
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
    Alert,
    AlertIcon,
    AlertDescription,
    Spinner,
} from '@chakra-ui/react';
import path from '../assets/path.png';

const ContactUs = () => {
    const formRef = useRef();
    const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');

        const form = {
            from_name: formRef.current.from_name.value,
            from_email: formRef.current.from_email.value,
            message: formRef.current.message.value,
        };

        emailjs
            .send('service_i33le59', 'template_cpsdlpa', form, { publicKey: '4o2AvjQIQQZxcJb-i' })
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
                    src={path}
                    alt="Travel"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }}
                />
            </Box>
            <Box
                flex="1"
                p={{ base: '4', md: '8' }}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                textAlign="center"
                bg="#F2F2F2"
                borderRadius={{ base: '0 0 15px 15px', md: '0 15px 15px 0' }}
            >
                <Heading as="h1" mb="4" fontFamily="Francois One">
                    Plan Your Next Trip
                </Heading>
                <Text mb="8" fontFamily="Poppins">
                    Write to us for personalized travel advice or for information
                    on group travel and last minute travel. All travel is insured
                    and safe.
                </Text>

                {status === 'success' && (
                    <Alert status="success" borderRadius="md" mb={4} textAlign="left">
                        <AlertIcon />
                        <AlertDescription fontFamily="Poppins">
                            Your message has been sent! We will get back to you soon.
                        </AlertDescription>
                    </Alert>
                )}

                {status === 'error' && (
                    <Alert status="error" borderRadius="md" mb={4} textAlign="left">
                        <AlertIcon />
                        <AlertDescription fontFamily="Poppins">
                            Something went wrong. Please try again or contact us directly.
                        </AlertDescription>
                    </Alert>
                )}

                <form ref={formRef} onSubmit={handleSubmit}>
                    <FormControl id="from_name" mb="4" fontFamily="Poppins" isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input name="from_name" type="text" />
                    </FormControl>
                    <FormControl id="from_email" mb="4" fontFamily="Poppins" isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input name="from_email" type="email" />
                    </FormControl>
                    <FormControl id="message" mb="4" fontFamily="Poppins">
                        <FormLabel>Message</FormLabel>
                        <Textarea name="message" />
                    </FormControl>
                    <Button
                        type="submit"
                        colorScheme="teal"
                        size="lg"
                        width="full"
                        isDisabled={status === 'sending'}
                    >
                        {status === 'sending' ? <Spinner size="sm" /> : 'Submit'}
                    </Button>
                </form>
            </Box>
        </Flex>
    );
};

export default ContactUs;
