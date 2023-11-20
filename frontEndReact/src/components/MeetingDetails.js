

export default function MeetingDetails(props) {
    console.log("metingdata--",props)
    const td_meeting = props.getMeetingData.map((meeting) => {
        const { teachername, subject, classtime, joinurl, teacherid } = meeting;
        const dateString = classtime;
        const dateObject = new Date(dateString);
    
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
        const formattedDate = dateObject.toLocaleDateString('en-US', options);
        
       
        return (
            <tr key={meeting.id}>
              <td className="px-6 py-4 whitespace-nowrap">{teachername}</td>
              <td className="px-6 py-4 whitespace-nowrap">{subject}</td>
              <td className="px-6 py-4 whitespace-nowrap">{formattedDate}</td>
              <td className="px-6 py-4 whitespace-nowrap"><a className="inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-300" href={joinurl} target="_blank" rel="noopener noreferrer">Click to Join</a></td>
              <td className="px-6 py-4 whitespace-nowrap"><span onClick={()=>props.deleteButton(teacherid)} className="inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-300" >Click to Delete</span></td>
            </tr>
          );
        });

    return (
        <section className="m-4 p-4">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Meeting Details</h1>
            <div className="max-h-80 overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200 ">
                <thead>
                    <tr>
                        <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Teacher Name</th>
                        <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                        <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Time</th>
                        <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Join URL</th>
                        <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Delete</th>
                    </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                    {td_meeting}
                </tbody>
            </table>
            </div>
        </section>
    )
}