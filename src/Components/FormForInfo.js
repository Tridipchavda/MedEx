import { useState } from "react";

export const FormForInfo = (props) => {

  const [formData, setFormData] = useState({
    dose: "",
    duration: "",
    timing: [],
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name !== "dose" && name !== "duration"){
        if(e.target.checked) {
          const newValue = formData['timing'].push(value);
          setFormData({ ...formData, [name]: newValue });
        }else{
          const filteredValue = formData['timing'].filter((val)=>val !== value);
          console.log(filteredValue,formData['timing']);
          setFormData({ ...formData, ['timing']: filteredValue});
          console.log(formData);
        }
    }else{
        setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addTableData({ ...formData, ["name"]: props.name,["id"]: props.id,["price"]: props.price});
    setFormData({
      dose: "",
      duration: "",
      timing: [],
    });
    document.querySelectorAll('input[type="checkbox"]').forEach((input)=>{
      input.checked = false;
    })
    invisible(e);
  };

  const invisible = (e)=>{
    e.preventDefault();
    document.getElementById(props.id).style.display = "none";
  }
  return (
    <form 
      id = {props.id}
      className="hidden bg-white shadow-md rounded px-9 pt-4 pb-4 mb-4 w-[250px] h-[220px]"
    >
      <div className="flex">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-1"
            htmlFor="dose"
          >
            Dose:
          </label>
          <input
            className="shadow text-sm appearance-none border rounded w-[70px] py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="dose"
            name="dose"
            value={formData.dose}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4 ml-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-1"
            htmlFor="duration"
          >
            Duration:
          </label>
          <input
            className="shadow text-sm appearance-none border rounded w-[70px] py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-1"
          htmlFor="timing"
        >
          Timing:
        </label>
        <div className="flex">
            <label className="flex items-center space-x-2">
                <input type="checkbox" value="MB"
            onChange={handleChange} className="h-4 w-4 text-blue-500" />
                <span className="text-sm pr-3">MB</span>
            </label>
            <label className="flex items-center space-x-2">
                <input type="checkbox" value="AB"
            onChange={handleChange} className="h-4 w-4 text-blue-500" />
                <span className="text-sm pr-3">AB</span>
            </label>
            <label className="flex items-center space-x-2">
                <input type="checkbox" value="EB"
            onChange={handleChange} className="h-4 w-4 text-blue-500" />
                <span className="text-sm pr-3">EB</span>
            </label>
        </div>
          
        <div className="flex">
            <label className="flex items-center space-x-2">
                <input type="checkbox" value="MA"
            onChange={handleChange}  className="h-4 w-4 text-blue-500" />
                <span className="text-sm pr-3">MA</span>
            </label>
            <label className="flex items-center space-x-2">
                <input type="checkbox" value="AA"
            onChange={handleChange} className="h-4 w-4 text-blue-500" />
                <span className="text-sm pr-3">AA</span>
            </label>
            <label className="flex items-center space-x-2">
                <input type="checkbox" value="EA"
            onChange={handleChange} className="h-4 w-4 text-blue-500" />
                <span className="text-sm pr-3">EA</span>
            </label>
        </div>

      </div>
      <div className="flex ">
        <button
          className="bg-blue-500 mr-2 hover:bg-blue-700 text-white font-bold px-2 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={(e)=>handleSubmit(e)}
        >
          Save
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 rounded focus:outline-none focus:shadow-outline"
          onClick={(e)=>invisible(e)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
