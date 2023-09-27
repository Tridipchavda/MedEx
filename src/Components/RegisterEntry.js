import axios from "axios";
import { useState } from "react";

export default function RegisterEntry() {

  const [patientName,setPatientName] = useState();
  const [patientEmail,setPatientEmail] = useState();
  const [patientPhone,setPatientPhone] = useState();
  const [patientGender,setPatientGender] = useState('male');
  const [patientAge,setPatientAge] = useState();
  const [caseStatus,setCaseStatus] = useState('ongoing');

  const verifyData = ()=>{
    var allSet = true;

    if(patientName == undefined || patientEmail == undefined || patientPhone == undefined){
        allSet = false;
    }
    if(patientGender == "male" || patientGender == "female" || patientGender == "transgender"){
        allSet = true;
    }else{
        allSet = false;
    }
    if(patientAge <= 0 || patientAge >=130){
        allSet = false;
        console.log(allSet);
    }

    return allSet;
  }

  const getTheAppointent = () =>{

    const apiUrl = "http://localhost:8108/register";
    const postData = {
        patientName,patientAge,patientGender,patientPhone,patientEmail,caseStatus
    }
    console.log(postData);
    if(verifyData() === true){
        axios.post(apiUrl, postData)
            .then((response) => {
                // Handle the success response
                console.log(response.data);
                alert(response.data);
            })
            .catch((error) => {
                // Handle any errors that occurred during the request
                console.error('Error:', error.message);
                alert(error.message);
            });
    }else{
        alert("Please Enter valid Credentials");
    }
  }
  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Register For Patient
      </h2>

      <form method="POST">
        <div className="flex">
          <div className="mb-4 mr-4">
            <label htmlFor="name" className="block text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input rounded-md px-3 py-1 m-3"
              placeholder="John Doe"
              value={patientName}
              onChange={(e)=>setPatientName(e.target.value)}
            />
          </div>

          <div className="mb-4 ml-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input rounded-md px-3 py-1 m-3 pr-3 w-64"
              placeholder="john@gmail.com"
              value={patientEmail}
              onChange={(e)=>setPatientEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="flex">
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700">
              Phone
            </label>
            <input
              type="number"
              id="phone"
              name="phone"
              className="form-input rounded-md px-3 py-1 m-3 pr-3"
              placeholder="99999 99999"
              value={patientPhone}
              onChange={(e)=>setPatientPhone(e.target.value)}
            />
          </div>
          <div className="mb-4 ml-10">
            <label htmlFor="case" className="block text-gray-700">
              Case Status
            </label>

            <select
              id="caseStatus"
              name="caseStatus"
              className="mt-1 block w-[200px] py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              value={caseStatus}
              onChange={(e)=>setCaseStatus(e.target.value)}
            >
              <option value="ongoing">Ongoing</option>
              <option value="new">New</option>
              <option value="prescribed">Prescribed</option>
            </select>
          </div>
        </div>

        <div className="flex">
          <div className="mb-4 mr-4">
            <label htmlFor="age" className="block text-gray-700">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              className="form-input rounded-md px-3 py-1 m-3 pr-3"
              placeholder="50"
              value={patientAge}
              onChange={(e)=>setPatientAge(e.target.value)}
            />
          </div>
          <div className="mb-4 ml-6">
            <label htmlFor="gender" className="block text-gray-700">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              value={patientGender}
              onChange={(e)=>setPatientGender(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="transgender">Transgender</option>
            </select>
          </div>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={()=>{getTheAppointent()}}
            className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 focus:bg-blue-600"
          >
            Make Appointment
          </button>
        </div>
      </form>
    </div>
  );
}
