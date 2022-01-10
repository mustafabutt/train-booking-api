# train-booking-api
train booking api built in Nestjs &amp;  MongoDB

Instructions to run this API

Make sure you have installed Nodejs & MongoDB is running. Clone the source code and run the following commands in to the root directory.

npm install 
npm start

Now open postman and make a get request on the following URL to populate the database with dummy data.

http://localhost:3000/trains/data

You can get the list of all trains by making GET request on the following link.

http://localhost:3000/trains

Further, you can search available trains by making a POST request at the the following URL. 

http://localhost:3000/trains/search

Request body = {
  "travelClass": "business",
  "outboundDate": "2022-01-18",
  "outboundTime": "02:00 AM",
  "departureStation": "Lahore",
  "arrivaleStation": "Faisalabad",
  "returnDate": "2022-01-19",
  "returnTime":"02:00 PM"
}


For seat booking, you can use the following URL. 

http://localhost:3000/trains/booking

Request body = {

  "TrainIds": ["2","3"],
  "ticketClass": [{"numberOfTickets":3, "class":"first"},{"numberOfTickets":2, "class":"standard"},{"numberOfTickets":5,         "class":"business"}],
  "departureStations": ["Lahore","Faisalabad"],
  "arrivalStations": ["Faisalabad","Lahore"],
  "outboundTime": "02:00 AM",
  "outboundDate": "2022-01-18",
  "returnDate": "2022-01-19",
  "returnTime":"02:00 PM"
  
}

Latsly, you can fetch all the booked tickets by making GET request on the following URL. 
http://localhost:3000/trains/tickets


