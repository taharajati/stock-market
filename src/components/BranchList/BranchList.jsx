import React, { useState, useEffect } from "react";

function BranchList() {
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await fetch("http://188.121.99.245/api/branch/");
      if (response.ok) {
        const data = await response.json();
        setBranches(data);
      } else {
        // Handle error
      }
    } catch (error) {
      // Handle network error
    }
  };

  const handleDeleteBranch = async (branchId) => {
    try {
      // Implement delete branch functionality
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[652px] mt-24 mx-auto px-5 max-md:mt-10 max-md:max-w-full">
      <div className="justify-center items-center self-start px-16 py-3 bg-emerald-300 rounded-2xl max-md:px-5">
        لیست شعب
      </div>
      <div className="self-end ">شعب</div>
      <div className="bg-zinc-300 mt-3 max-w-full h-[226px] w-full rounded-xl p-4">
      <ul className="overflow-y-auto max-h-full">
        {branches.map((branch) => (
          <li key={branch._id} className="flex items-center justify-between border-b border-gray-200 py-2">
            <div>{branch.name} - {branch.city}</div>
            <button className="text-red-500" onClick={() => handleDeleteBranch(branch._id)}>
              <i className="fas fa-trash-alt"></i>
            </button>
          </li>
        ))}
      </ul>
      </div>
      <AddBranchForm />
    </div>
  );
}

function AddBranchForm() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [establishmentDate, setEstablishmentDate] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://188.121.99.245/api/branch/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          city,
          establishment_date: establishmentDate,
          description,
          level
        })
      });

      if (response.ok) {
        // Reload the branch list
      } else {
        // Handle error
      }
    } catch (error) {
      // Handle network error
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">اضافه کردن شعب</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Branch Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
        />
        <input
          type="text"
          placeholder="Establishment Date"
          value={establishmentDate}
          onChange={(e) => setEstablishmentDate(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
        ></textarea>
        <input
          type="number"
          placeholder="Branch Level"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all">
          اضافه کردن شعبه
        </button>
        <br/>
        <br/>
        <br/>

      </form>
    </div>
    
  );
}

export default BranchList;
