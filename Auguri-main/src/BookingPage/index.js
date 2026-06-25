
import React, { useState } from 'react';
import { Box, Heading, Input, Textarea, Button, VStack, Select, useToast } from '@chakra-ui/react';
import emailjs from '@emailjs/browser';

export default function BookingPage(){
 const toast=useToast();
 const [form,setForm]=useState({
  fullname:'',email:'',phone:'',destination:'',
  departure_date:'',arrival_date:'',
  amount_of_travelers:'',travel_class:'Economy',special_request:''
 });
 const handle=(e)=>setForm({...form,[e.target.name]:e.target.value});
 const submit=async(e)=>{
  e.preventDefault();
  try{
   await emailjs.send('service_i33le59','template_cpsdlpa',form,'4o2AvjQIQQZxcJb-i');
   toast({title:'Booking sent successfully',status:'success'});
  }catch(err){
   toast({title:'Failed to send booking',status:'error'});
  }
 };
 return <Box p={8}>
 <Heading mb={6}>Book Your Trip</Heading>
 <VStack as="form" onSubmit={submit} spacing={4}>
 <Input name="fullname" placeholder="Full Name" onChange={handle}/>
 <Input name="email" type="email" placeholder="Email" onChange={handle}/>
 <Input name="phone" placeholder="Phone Number" onChange={handle}/>
 <Input name="destination" placeholder="Destination" onChange={handle}/>
 <Input name="departure_date" type="date" onChange={handle}/>
 <Input name="arrival_date" type="date" onChange={handle}/>
 <Input name="amount_of_travelers" type="number" placeholder="Number of Travelers" onChange={handle}/>
 <Select name="travel_class" onChange={handle}>
 <option>Economy</option><option>Business</option><option>First Class</option>
 </Select>
 <Textarea name="special_request" placeholder="Special Request" onChange={handle}/>
 <Button type="submit">Submit Booking</Button>
 </VStack></Box>
}
