import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Approve() {
  const [allPatientsData, setAllPatientsData] = useState();

  useEffect(() => {
    axios.get("http://localhost:8108/getlist").then((res) => {
      console.log(res.data);
      setAllPatientsData(res.data);
    });

  }, []);

  const storePatientDetails = (index,id)=>{
    axios.post("http://localhost:8108/approve",{id:id})
    .then((res) => {console.log(res)}).catch((err)=>{console.log(err)});

    localStorage.setItem("name",allPatientsData[index].name);
    localStorage.setItem("age",allPatientsData[index].age);
    localStorage.setItem("gender",allPatientsData[index].gender);
    localStorage.setItem("case",allPatientsData[index].caseType);
  }

  return (
    <center>
      <h1 className="text-3xl mt-5">Patients Appointment List</h1>
      <div className="flex justify-center items-center m-5">
        <table className="min-w-full border border-y-2 m-5 p-5">
          <thead className="border-y-2">
            <tr>
              <th className=" p-2">Sr. No.</th>
              <th className=" p-2">Name</th>
              <th className=" p-2">Age</th>
              <th className=" p-2">Gender</th>
              <th className=" p-2">Case Status</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {allPatientsData != undefined ? (
              allPatientsData.map((patient, index) => (
                <tr key={patient._id}>
                  <td className="justify-center p-2">{index + 1}</td>
                  <td className=" p-2">{patient.name}</td>
                  <td className=" p-2">{patient.age}</td>
                  <td className=" p-2">{patient.gender}</td>
                  <td className=" p-2">{patient.caseType}</td>
                  <td className=" p-2">
                    <Link to="/prescribe">
                      <button onClick={()=>{storePatientDetails(index,patient._id)}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Prescribe
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No Data Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </center>
  );
}
