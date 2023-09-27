import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";

function Receipt(props) {
  const [prescriptions, setPrescriptions] = useState(props.prescription);
  const [code,setCode] = useState("");

  const mapping = {
    'MB': 1,
    'MA': 2,
    'AB': 3,
    'AA': 4,
    'EB': 5,
    'EA': 6,
  };

  function differentiateAndPrint(inputString) {;
    var string = "";
    for (var i=0;i<inputString.length;i++) {
        string += inputString[i]+" ";
    } 
    return string;
  }

  useEffect(()=>{
    document.getElementById("navbar").style.display = "none";
    var message = "Prescriptions/";
    message += localStorage.getItem("name")+"/";
    
    var processData = [{}];

    for (var i=0;i<prescriptions.length;i++){
        for (let j = 0; j < prescriptions[i].timing.length; j++) {
            const id = prescriptions[i].id;
            const dose = prescriptions[i].dose;
            const duration = prescriptions[i].duration;
            const timing = mapping[prescriptions[i].timing[j]];
            const price = prescriptions[i].price;
            
            processData.push({id,dose,duration,timing,price})
        }
    }
    processData.sort((a,b)=>a.timing > b.timing);
    
    for(let i=1;i<processData.length;i++){
        message += processData[i].id+"-"+processData[i].dose+"-"+processData[i].duration+"-"+processData[i].timing+"-"+processData[i].price+"/";
    }
    console.log(message);
    setCode(message);
  },[]);
  return (
    <div className="max-w-xl mx-auto border rounded-md shadow-md p-4 my-4">
      <h2 className="text-lg font-semibold">Doctor's Prescription</h2>
      <div className="my-2">
        <p>
          <strong>Name:</strong> {localStorage.getItem("name")}
        </p>
        <p>
          <strong>Age:</strong> {localStorage.getItem("age")}
        </p>
        <p>
          <strong>Gender:</strong> {localStorage.getItem("gender")}
        </p>
      </div>
      <hr className="my-4" />
      <div className="my-2">
        <h3 className="text-md font-semibold">Prescription List</h3>
        <table className="mt-5 w-full border-collapse border border-gray-400 text-sm">
          <thead >
            <tr className="bg-gray-200">
              <th className="border border-gray-400 py-2 px-4">
                Medicine Name
              </th>
              <th className="border border-gray-400 py-2 px-4">Duration</th>
              <th className="border border-gray-400 py-2 px-4">Dose</th>
              <th className="border border-gray-400 py-2 px-4">Timing</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map((prescription, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                <td className="border border-gray-400 py-2 px-4">
                  {prescription.name}
                </td>
                <td className="border border-gray-400 py-2 px-4">
                  {prescription.duration}
                </td>
                <td className="border border-gray-400 py-2 px-4">
                  {prescription.dose}
                </td>
                <td className="border border-gray-400 py-2 px-4">
                  {differentiateAndPrint(prescription.timing)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
      <QRCode
        size={64}
        style={{ height: "auto", width: "20%",margin: "auto",marginTop:"150px" }}
        value={code}
        viewBox={`0 0 64 64`}
        />
      </div>
      <p className="mt-4 text-sm">
        Follow this prescription as instructed. Consult your doctor if you have
        any questions.
      </p>
    </div>
  );
}

export default Receipt;
