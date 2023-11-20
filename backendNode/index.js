const pool = require('./connection');

// import bodyParser from 'body-parser'
const bodyParser = require('body-parser');

const express = require('express');
const app = express();
// const server = require('http').Server(app);

const cors = require('cors');

const axios = require("axios");

//importing email integration
const mailSender = require('./emailIntegration.js')

const headers = require('./headers.js')

app.use(bodyParser.json())
app.use(cors());
app.get('/meeting', (req, res) => {
   res.status(200).send("helloworld")
   email = req.body.email
   time = req.body.time
   console.log('time -----:', time)
})

app.post('/meeting', async (req, res) => {
   // console.log(req.body)
   const { teacherName, email, start_time, topic , students} = req.body;
   console.log('time -----:', email)
   console.log('students  -----:', students)


   function todaysDate() {
      const today = new Date();

      const year = today.getFullYear();
      const month = today.getMonth() + 1; // Months are zero-based, so we add 1
      const day = today.getDate();

      const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

      console.log("date---------------------:",formattedDate);
      return formattedDate
   }
   
   console.log("passing time::::",todaysDate(), start_time)
   let data = {
      "topic": topic,
      "type": 2,
      "start_time": `${todaysDate()}T${start_time}:00Z`,
      "duration": "3",
      "settings": {
         "host_video": true,
         "participant_video": true,
         "join_before_host": true,
         "mute_upon_entry": "true",
         "watermark": "true",
         "audio": "voip",
         "auto_recording": "cloud"
      }
   };

   console.log("starttime", data['start_time'])
   var config = {
      method: "post",
      url: 'https://api.zoom.us/v2/users/me/meetings',
      headers: {
         headers
      },
      data: data
   };
   console.log("headers",headers)

   try {

      console.log("hello----------1")

      const response = await axios.post(config.url, data, { headers: config.headers })
      let joinUrl = response.data.join_url
      let time = response.data.start_time

      res.json({ "message": "Form Submitted" })
      insertData(teacherName, email, topic, joinUrl, time);

      // console.log(response.status)
      for (i in students){
         console.log("mail send to ", students[i])
         mailSender(students[i], email, joinUrl, topic, teacherName,todaysDate(),start_time)
      }
      

   }
   catch (err) {
      console.log(err.message)
   }
})

async function insertData(teacherName, teacherEmail, subject, joinUrl, classTime) {
   try {
      const result = await pool.query(`INSERT INTO meeting (teachername, teacheremail, subject, joinurl, classtime) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
         [teacherName, teacherEmail, subject, joinUrl, classTime]);

      console.log('Data inserted successfully:', result.rows);
   } catch (error) {
      console.error('Error inserting data:', error);
   }
}

app.get('/meeting/studentData', async (req, res) => {
   try {
      var data = await pool.query('SELECT * FROM student_data;')
      console.log("data: ", data.rows)

   }
   catch (err) {
      console.log("error in geting the student data:", err)
      res.status(500).json({ error: 'Internal Server Error' });
   }
   res.json(data.rows);
});

app.get('/meeting/meetingData', async (req, res) => {
   try {
      var data = await pool.query(`SELECT * FROM public.meeting
      ORDER BY teacherid ASC `)
      console.log("meeting data: ", data.rows)
   }
   catch (err) {
      console.log("error in geting the Meeting data:", err)
      res.status(500).json({ error: 'Internal Server Error' });
   }
   console.log("yes")
   res.json(data.rows);
});

app.post('/meeting/deleteMeeting',async(req, res)=>{
   const {teacherid} = req.body;
   console.log("teacherid---",teacherid)
   try {
      var data = await pool.query(`Delete FROM meeting 
      where teacherid =${teacherid};
      SELECT * FROM meeting`)
      console.log("meeting data delted: ", data.rows)
   }
   catch (err) {
      console.log("error in geting the Meeting data:", err)
      res.status(500).json({ error: 'Internal Server Error' });
   }
})

app.listen(4000);