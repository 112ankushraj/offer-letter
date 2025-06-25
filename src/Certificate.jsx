


import React, { useState, useCallback, useRef } from "react";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import certificationTemplate from "./maincertificate.png";

const Certificate = () => {
  const ref = useRef(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cid, setCid] = useState("");

  const onButtonClick = useCallback(() => {
    if (ref.current === null) return;

    // Use high-res dimensions for PDF export
    toPng(ref.current, {
      cacheBust: true,
      width: 2000,
      height: 1414,
    })
      .then((dataUrl) => {
        const pdf = new jsPDF({
          orientation: "landscape",
          unit: "px",
          format: [2000, 1414],
        });

        pdf.addImage(dataUrl, "PNG", 0, 0, 2000, 1414);
        pdf.save("certificate.pdf");
      })
      .catch((err) => {
        console.error("Error generating PDF", err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 flex flex-col items-center">
      {/* Form Section */}
      <div className="max-w-2xl w-full bg-white p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Generate Your Certificate
        </h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Enter Certificate ID"
            value={cid}
            onChange={(e) => setCid(e.target.value)}
            className="border p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={onButtonClick}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          Download Certificate (PDF)
        </button>
      </div>

      {/* Certificate Preview Section */}
      <div
  ref={ref}
  // className="relative w-[2000px] h-[1414px] bg-white border rounded-xl overflow-hidden shadow-md scale-[0.5] md:scale-100 origin-top"
   className="relative w-[2000px] h-[1400px] bg-white border rounded-xl overflow-hidden shadow-md"
>

        <img
          src={certificationTemplate}
          alt="Certificate Template"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
   

     <h1 className="text-[110px] italic font-bold text-black drop-shadow mt-[245px] text-center mx-auto max-w-[1800px]">
            {name}
           </h1>
           <p className="text-[63px] italic text-gray-800 drop-shadow mt-[100px] text-center mx-auto max-w-[1800px]">
            {description}
           </p>

          <p className="absolute top-[70px] left-0 right-300 text-center text-[30px] font-semibold text-gray-700 drop-shadow">
   C.I.D: {cid}
 </p>





        </div>
      </div>
    </div>
  );
};

export default Certificate;
