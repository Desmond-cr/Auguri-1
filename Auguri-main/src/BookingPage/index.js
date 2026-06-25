import React, { useState, useMemo } from 'react';
import {
  Box,
  Heading,
  Input,
  Textarea,
  Button,
  VStack,
  Select,
  FormControl,
  FormLabel,
  Text,
} from '@chakra-ui/react';
import emailjs from '@emailjs/browser';

const initialState = {
  fullName: '',
  email: '',
  phone: '',
  destination: '',
  departureDate: '',
  returnDate: '',
  travelers: '1',
  travelClass: 'Economy',
  specialRequests: '',
};

export default function BookingPage() {
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState({ text: '', kind: 'idle' });

  const canSubmit = useMemo(() => {
    return (
      form.fullName.trim() &&
      form.email.trim() &&
      form.phone.trim() &&
      form.destination.trim() &&
      form.departureDate
    );
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!canSubmit) {
      setMsg({
        text: 'Please fill in all required fields.',
        kind: 'error',
      });
      return;
    }

    setSubmitting(true);
    setMsg({ text: 'Processing your booking...', kind: 'idle' });

    const data = {
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      destination: form.destination,
      departureDate: form.departureDate,
      returnDate: form.returnDate,
      travelers: form.travelers,
      travelClass: form.travelClass,
      specialRequests: form.specialRequests,
    };

    try {
      // Replicates the HTML behavior:
      // 1) Send EmailJS with explicit template variables
      // 2) POST the raw form payload to /api/booking
      if (typeof emailjs === 'undefined') {
        throw new Error(
          'EmailJS library is not loaded. Check your network or CDN path.'
        );
      }

      // If emailjs.init hasn't been called elsewhere in the app, do it here.
      // Safe to call multiple times; this matches the HTML page approach.
      emailjs.init('4o2AvjQIQQZxcJb-i');

      const fullnameVal = data.fullName;
      const travelersVal = data.travelers;

      const payload = {
        fullname: fullnameVal,
        amount_of_travelers: travelersVal,
        email: data.email,
        phone: data.phone,
        destination: data.destination,
        departure_date: data.departureDate,
        arrival_date: data.returnDate,
        travel_class: data.travelClass,
        special_request: data.specialRequests,
        order_id: Date.now(),
      };

      await emailjs.send(
        'service_i33le59',
        'template_cpsdlpa',
        payload,
        '4o2AvjQIQQZxcJb-i'
      );
    } catch (emailErr) {
      // HTML behavior: booking will still be submitted, but email confirmation may not arrive.
      // We still proceed to /api/booking.
      // eslint-disable-next-line no-console
      console.error('EmailJS error:', emailErr);
      setMsg({
        text: '⚠️ Email send failed. Your booking will still be submitted, but email confirmation may not arrive.',
        kind: 'warning',
      });
    }

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          destination: data.destination,
          departureDate: data.departureDate,
          returnDate: data.returnDate,
          travelers: data.travelers,
          travelClass: data.travelClass,
          specialRequests: data.specialRequests,
        }),
      });

      const out = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(out.error || 'Request failed');

      if (out.whatsappStatus === 'sent') {
        setMsg({
          text: '✓ Booking submitted successfully! Your booking details were sent to WhatsApp.',
          kind: 'success',
        });
      } else if (out.whatsappStatus === 'failed') {
        setMsg({
          text: '✓ Booking submitted successfully, but WhatsApp delivery could not be confirmed. We still received your booking.',
          kind: 'success',
        });
      } else {
        setMsg({
          text: "✓ Booking submitted successfully! We'll contact you shortly.",
          kind: 'success',
        });
      }

      setForm(initialState);
    } catch (err) {
      setMsg({
        text: '✗ ' + (err.message || 'Submission failed. Please try again.'),
        kind: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box p={8}>
      <Heading mb={6}>Quick Booking</Heading>

      <Box as="form" onSubmit={handleSubmit} className="form" maxW="720px">
        <VStack spacing={4} align="stretch">
          <FormControl isRequired>
            <FormLabel>Full Name</FormLabel>
            <Input name="fullName" className="input" value={form.fullName} onChange={handleChange} />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              className="input"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Phone</FormLabel>
            <Input
              name="phone"
              className="input"
              type="tel"
              value={form.phone}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Destination</FormLabel>
            <Input
              name="destination"
              className="input"
              value={form.destination}
              onChange={handleChange}
            />
          </FormControl>

          <VStack spacing={4} direction={{ base: 'column', md: 'row' }} align="stretch">
            <FormControl isRequired>
              <FormLabel>Departure Date</FormLabel>
              <Input
                name="departureDate"
                className="input"
                type="date"
                value={form.departureDate}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Return Date</FormLabel>
              <Input
                name="returnDate"
                className="input"
                type="date"
                value={form.returnDate}
                onChange={handleChange}
              />
            </FormControl>
          </VStack>

          <VStack spacing={4} direction={{ base: 'column', md: 'row' }} align="stretch">
            <FormControl>
              <FormLabel>Travelers</FormLabel>
              <Select
                name="travelers"
                className="input"
                value={form.travelers}
                onChange={handleChange}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5+">5+</option>
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Travel Class</FormLabel>
              <Select
                name="travelClass"
                className="input"
                value={form.travelClass}
                onChange={handleChange}
              >
                <option>Economy</option>
                <option>Business</option>
                <option>First Class</option>
              </Select>
            </FormControl>
          </VStack>

          <FormControl>
            <FormLabel>Special Requests</FormLabel>
            <Textarea
              name="specialRequests"
              className="input textarea"
              rows={4}
              value={form.specialRequests}
              onChange={handleChange}
            />
          </FormControl>

          <Button
            className="btn btn--primary"
            type="submit"
            isLoading={submitting}
            loadingText="Submitting"
            disabled={submitting || !canSubmit}
          >
            Submit Booking
          </Button>

          <Text
            id="bookingMsg"
            className="form__msg"
            aria-live="polite"
            color={msg.kind === 'success' ? 'green.600' : msg.kind === 'error' ? 'red.600' : 'inherit'}
          >
            {msg.text}
          </Text>
        </VStack>
      </Box>
    </Box>
  );
}

