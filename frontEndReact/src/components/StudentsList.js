

import React from 'react';



export default function StudentList(props) {

    // const meetingData = props.meetingData
    // const [studentData, setStudentData] = useState([])
    // const [isChecked, setIsChecked] = useState(studentData.map(() => (false)));
    // const [stdList, setStdList] = useState(studentData.map((std)=>(std.student_email)));

    const handleCheckboxChange = (index, event) => {
        console.log("target-",event.target.checked)
        let updatedStudents = [...props.studentData]
        updatedStudents[index].isChecked=event.target.checked
        props.setStudentData(updatedStudents)
    }
   
    return (
        <>
            <section>
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Student List</h1>
                <div className="max-h-80 overflow-y-auto">
                <table className="min-w-full divide-y divide-gray-200 ">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Sl No.</th>
                            <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                            <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Student Email</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {props.studentData.map((student, index) => (
                            <tr >
                                <td className="px-6 py-4 whitespace-nowrap">{student.serial_number}:  <input type="checkbox" checked={student?.isChecked} onChange={(event) => handleCheckboxChange(index, event)} /></td>
                                <td className="px-6 py-4 whitespace-nowrap">{student.student_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{student.student_email}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
                </div>

                {/* <button onClick={handleCheckedList}></button> */}
            </section>
        </>
    )
}