// In your React component or HTML file
import React, { useState, useEffect } from 'react';


import TimePicker from 'react-time-picker'
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import StudentList from './StudentsList';
import MeetingDetails from './MeetingDetails';


import { toast } from 'react-toastify';

import axios from 'axios';

import Input from "./Input"

const Form = () => {
  const [getMeetingData, setGetMeetingData] = useState([])
  const [studentData, setStudentData] = useState([])
  const [username, setUsername] = useState('');
  const [subject, setSubject] = useState('');
  const [email, setEmail] = useState('');
  const [time, setTime] = useState('09:00');

  const [meetingData, setMeetingData] = useState({})


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitted username:', username);
    console.log('Submitted username:', email);

    let _data = {
      teacherName: username,
      email: email,
      start_time: time,
      topic: subject,
      students: handleCheckedList()
    }
    setMeetingData(_data)
    try {
      const response = await axios.post('http://localhost:4000/meeting', _data);
      setTimeout(function(){
        featchMeetingData();
      },2000)
      toast.success('Done, Class is created and it is updated in meeting details table below!', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      toast.error('Form submission failed. Please try again.', {
          position: toast.POSITION.TOP_RIGHT,
        });
      console.error('Error during POST request:', error.message);
    }
  };
  function handleCheckedList() {
    let student_list = studentData.filter((eachstudent) => eachstudent.isChecked && eachstudent.student_email)
    student_list = student_list.map((eachstudent) => eachstudent.student_email)
    return student_list;
  }

  useEffect(() => {
    const featchStudentList = async () => {
      try {
        const response = await axios.get('http://localhost:4000/meeting/studentData');
        setStudentData(response.data)
      } catch (err) {
        console.log("There some error in nodejs! not able to get the data:", err)
      }
    }
    featchStudentList();
    featchMeetingData();
  }, []);
  const featchMeetingData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/meeting/meetingData');
      console.log("feacthingmeeintg data----", response.data)
      setGetMeetingData(response.data)
    } catch (err) {
      console.log("There some error in nodejs! not able to get the data:", err)
    }
  }

  const deleteMeeting=async(teacherid)=>{
    const data={
      teacherid:teacherid
    }
    try {
      const response = await axios.post('http://localhost:4000/meeting/deleteMeeting',data);
      console.log("delete data----", response.data)
      toast.success('Done, Class is Deleted succesfully!', {
        position: toast.POSITION.TOP_RIGHT,
      });
      // setGetMeetingData(response.data)
    } catch (err) {
      toast.error('Its is failed. Please try again.', {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log("There some error in nodejs! not able to get the data:", err)
    }
  }

  function handleDelete(teacherid){
    deleteMeeting(teacherid);
    setTimeout(function(){
      featchMeetingData();
      toast.success('Done, Class is Deleted succesfully!', {
        position: toast.POSITION.TOP_RIGHT,
      });
    },2000)
  }

  return (
    <form className="mx-auto bg-white p-8 shadow-md rounded-md" onSubmit={handleSubmit}>
      <div className="flex flex-row gap-4 p-4 m-4">
        <div className='w-1/2'>
          <Input
            type="text"
            placeholder="Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          >Teacher Name: </Input>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          >Teacher Email: </Input>
          <Input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >Subject: </Input>

          <div className="mb-4">
            <label htmlFor="timePicker" className="block text-gray-700 text-2xl font-semibold mb-2">Enter Time 24H format</label>
            <TimePicker format="HH:mm" onChange={(value) => setTime(value)} value={time} />
            <div >
              {/* <DateTimePicker onChange={(value) => setTime(value)} value={time} /> */}
            </div>
          </div>
          <div className='submitBox'>
            {/*  onClick={(e) => meetingStart(e)} */}
            <label htmlFor="timePicker" className="block text-gray-700 text-sm font-semibold mb-2">If you want to send a invitaion mail to the student,<br></br> please select the students from student list then click on create class.</label>

            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue">Create Classroom</button>
          </div>
        </div>
        <div className="w-1/2">
          <StudentList studentData={studentData} setStudentData={setStudentData} />

        </div>
      </div>

      <MeetingDetails deleteButton={handleDelete} getMeetingData={getMeetingData} setGetMeetingData={setGetMeetingData} />
    </form>

  );
};

export default Form;
