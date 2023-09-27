import React, { useState } from "react";
import { FormForInfo } from "./FormForInfo";
import { Link, useNavigate } from "react-router-dom";
import cross from "./Images/cross.png"

const Prescribe = (props) => {
  // Sample data for cards
  const cardsData = [
    { id: 1, title: "Bilvadi Leha",price:20 },
    { id: 2, title: "Brahama Rasayana",price:5 },
    { id: 3, title: "Chitraka Haritaki",price:10 },
    { id: 4, title: "Chyavanprash Avaleha ",price:25 },
    { id: 5, title: "Drakshava leha",price:13 },
    { id: 6, title: "Haridrakhanda Paka",price:27 },
    { id: 7, title: "Kutajavaleha ",price:8 },
    // Add more card data as needed
  ];
  const nav = useNavigate();

  const [tableData, setTableData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const addTableData = (data) => {
    setTableData([...tableData, data]);
  };

  const delTableData = (data) => {
    const updatedItems = tableData.filter((item) => item.name !== data);
    console.log(updatedItems);
    setTableData(updatedItems);
  };
  const filteredCards = cardsData.filter((card) =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInfo = (id) => {
    document.getElementById(id).style.display = "block";
  };

  const getReceipt = ()=>{
    props.enterDetails(tableData);
    nav("/receipt");
  }

  return (
    <div>
      <div className="flex flex-col items-center mb-[10px]">
        <div className="mb-4 mt-5">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border border-gray-300 rounded-md w-[400px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-row w-full p-5">
        <div className="w-[70%]">
          <div className="grid  md:grid-cols-3 lg:grid-cols-4 gap-2">
            {filteredCards.map((card) => (
              <div className="relative" key={card.id}>
                <div
                  style={{ overflow: "hidden" }}
                  key={card.id}
                  className="bg-white rounded-md shadow-md w-[250px]"
                >
                  <img
                    src="https://www.bigbasket.com/media/uploads/p/l/40216725_2-kerala-ayurveda-nisakathakadi-kwath-tablet.jpg"
                    width="220px"
                    height="200px"
                    alt="Medicine"
                  />
                  <div className="flex flex-col">
                    <h2 className="m-3 text-md font-semibold">{card.title}</h2>
                    <button
                      className="bg-blue-200 hover:bg-blue-500 text-blue-500 hover:text-white font-bold py-1 px-2 "
                      onClick={() => getInfo(card.id)}
                    >
                      Prescribe
                    </button>
                  </div>
                </div>
                <div className="absolute top-0 left-0">
                  <FormForInfo
                    id={card.id}
                    name={card.title}
                    price={card.price}
                    addTableData={addTableData}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[30%] ">
          <center>
            <div className="h-[350px] overflow-scroll">
            <table className="table-list border-y-2">
              <thead className="border-y-2">
                <tr>
                  <th className="px-3">Name</th>
                  <th className="px-3">Dose</th>
                  <th className="px-3">Duration</th>
                  <th className="px-3">Time</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {tableData !== undefined ? (
                  tableData.map((item, key) => (
                    <tr key={key}>
                      <td className="text-sm text-left w-[150px] py-2">{item.name}</td>
                      <td className="text-sm w-[50px] ">{item.dose}</td>
                      <td className="text-sm w-[50px]">{item.duration}</td>
                      <td className="text-sm px-3">
                        {item.timing !== undefined
                          ? item.timing.map((time, i) => time+" ")
                          : undefined}
                      </td>
                      <td className="mx-3">
                        <button className="my-3"
                          onClick={() => delTableData(item.name)}
                        >
                          <img src={cross} width="25px" alt="X" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4"> No Data Found</td>
                  </tr>
                )}
              </tbody>
            </table>
            </div>
            <button onClick={()=>getReceipt()}className="rounded-lg bg-blue-500 text-white px-2 py-2 mt-[100px]">
              Create
            </button>
          </center>
        </div>
      </div>
    </div>
  );
};

export default Prescribe;
