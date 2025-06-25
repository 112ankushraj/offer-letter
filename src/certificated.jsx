import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react"; // ✅ named export (v3+)

export default function CertificateApp() {
  const [name, setName] = useState("John Doe");
  const [description, setDescription] = useState("For successful completion of the internship at XYZ Company.");
  const [signature, setSignature] = useState("Dr. Smith");
  const [regNumber, setRegNumber] = useState("INT-2025-001");

  const today = new Date().toLocaleDateString();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white p-6 flex flex-col items-center">
      <div className="mb-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Internship Certificate Generator</h2>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Enter Name"
            className="border p-2 rounded w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Registration Number"
            className="border p-2 rounded w-full"
            value={regNumber}
            onChange={(e) => setRegNumber(e.target.value)}
          />
        </div>
        <textarea
          placeholder="Enter Internship Description"
          className="border p-2 rounded w-full mb-4 h-24"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Authorized Signature"
          className="border p-2 rounded w-full"
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
        />
      </div>

      <div className="w-full max-w-4xl bg-white border-4 border-blue-200 p-10 text-center rounded-2xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-10 pointer-events-none"></div>

        <h1 className="text-4xl font-extrabold mb-4 text-blue-700">Internship Certificate</h1>
        <p className="text-lg text-gray-700 mb-6">
          This is to certify that
        </p>
        <h2 className="text-3xl font-semibold text-blue-800 mb-2">{name}</h2>
        <p className="text-lg text-gray-600 italic mb-8">{description}</p>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-10 text-gray-600">
          <div className="text-center mb-6 sm:mb-0">
            <p className="font-semibold text-sm">{signature}</p>
            <p className="text-xs">Authorized Signature</p>
          </div>
          <div className="text-center mb-6 sm:mb-0">
            <p className="text-sm">{today}</p>
            <p className="text-xs">Date</p>
          </div>
          <div className="text-center">
            <QRCodeCanvas value={regNumber} size={64} />
            <p className="text-xs mt-2">Reg. No: {regNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
