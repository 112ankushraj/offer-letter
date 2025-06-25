import React, { useState, useRef, useCallback } from "react";
import { toPng } from "html-to-image";

import { jsPDF } from "jspdf";

import offerLetterTemplate from "./newoffer.png";

const OfferLetter = () => {
  const [data, setData] = useState({
    date: "12 July 2025",
    id: "ankd2344455",
    name: "Ankush Poddar",
    internship: "Python Programming",
    startDate: "12 Aug 2024",
    endDate: "12 Sep 2024.",
  });

  const letterRef = useRef(null);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

 const handleDownload = useCallback(() => {
  if (!letterRef.current) return;

  toPng(letterRef.current, {
    cacheBust: true,
    pixelRatio: 5, // Increase this to 5 or more for better quality
    width: 794,
    height: 1123,
  })
    .then((dataUrl) => {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const width = 210; // A4 width in mm
      const height = 297; // A4 height in mm

      pdf.addImage(dataUrl, "PNG", 0, 0, width, height, undefined, "FAST");

      const fileName = data.name
        ? `${data.name.replace(/\s+/g, "_")}_Offer_Letter.pdf`
        : "Offer_Letter.pdf";

      pdf.save(fileName);
    })
    .catch((err) => {
      console.error("Error generating offer letter PDF", err);
    });
}, [data.name]);






  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Form */}
      <div className="max-w-4xl mx-auto mb-6 bg-white shadow p-6 rounded">
        <h2 className="text-xl font-semibold mb-4">Fill Offer Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="date"
            value={data.date}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Date"
          />
          <input
            name="id"
            value={data.id}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Intern ID"
          />
          <input
            name="name"
            value={data.name}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Full Name"
          />
          <input
            name="internship"
            value={data.internship}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Internship Title"
          />
          <input
            name="startDate"
            value={data.startDate}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Start Date"
          />
          <input
            name="endDate"
            value={data.endDate}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="End Date"
          />
        </div>
        <button
          onClick={handleDownload}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Download Offer Letter
        </button>
      </div>

      {/* Offer Letter Preview */}
      <div className="flex justify-center items-center">
        <div ref={letterRef} className="relative w-[794px] h-[1123px]">
          <img
            src={offerLetterTemplate}
            alt="Offer Letter Template"
            className="w-full h-full object-cover"
          />

          {/* Positioned Content */}
          <div className="absolute top-[130px] left-[50px] text-black">
            <p className="text-md mt-18 ml-28 text-[20px]">
              <strong className="font-bold ">{data.date}</strong>
            </p>
            <p className="text-md ml-[595px] mt-[-25px] text-[20px]">
              <strong className="font-bold">{data.id}</strong>
            </p>
            <p className="text-md mt-[45px] ml-25 text-[23px]">
              <strong className="font-bold">{data.name}</strong>,
            </p>
          </div>

          <div className="absolute top-[365px] left-[50px] right-[50px] text-sm leading-relaxed text-gray-800">
            <p className="text-[21px] ml-[35px] leading-[1.4]">
              We are pleased to inform you that you have been selected for the{" "}
              <strong>"{data.internship}"</strong> virtual internship position
              with <strong>"Internfy"</strong>. Everyone at Internfy is excited
              to welcome you on board.
            </p>
            <p className="mt-2">
              <strong className="ml-[565px] text-[18px]">
                {data.startDate}
              </strong>
              <br />
              <strong className="ml-[65px] text-[18px] ">{data.endDate}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferLetter;
