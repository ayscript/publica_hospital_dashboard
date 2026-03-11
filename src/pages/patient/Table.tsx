import React, { useState } from "react";
import Pagination from "../../components/Pagination";

type DeliveryStatus =
  | "Completed"
  | "Due & Paid"
  | "Due & Unpaid"
  | "Assigned"
  | "Paid";

interface PatientDelivery {
  hospitalId: string;
  patientName: string;
  phoneNumber: string;
  nextDeliveryDate: string;
  location: string;
  status: DeliveryStatus;
  id: string;
}

interface PatientTableProps {
  data: PatientDelivery[];
  totalPages: number;
  deliveries: number;
  setPage: React.Dispatch<React.SetStateAction<string>>
}

const PatientTable: React.FC<PatientTableProps> = ({ data, totalPages, deliveries, setPage }) => {
  // Type-safe style mapper
  const getStatusStyles = (status: DeliveryStatus): string => {
    const base =
      "px-3 py-2 text-[10px] font-bold inline-block w-24 text-center ";

    switch (status) {
      case "Completed":
      case "Paid":
        return base + "bg-green-100 text-green-600";
      case "Due & Paid":
        return base + "bg-orange-100 text-orange-600";
      case "Due & Unpaid":
        return base + "bg-red-100 text-red-500";
      case "Assigned":
        return base + "bg-blue-100 text-blue-500";
      default:
        return base + "bg-gray-100 ";
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  // const totalPages = 8;

  const handlePageChange = (newPage: number) => {
    // You can add your API fetching logic here
    setPage(String(newPage))
    setCurrentPage(newPage);
  };

  return (
    <div className="w-full bg-white shadow-sm overflow-x-auto">
      <table className="w-full text-left border-collapse border-spacing-0">
        <thead>
          <tr className="border-b border-gray-100">
            {[
              "Hospital ID",
              "Patient's Name",
              "Phone Number",
              "Next Delivery Date",
              "Location",
              "Status",
              "",
            ].map((header, index) => (
              <th
                key={index}
                className="px-6 py-5 text-[11px] font-medium text-gray-400 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {data.map((item, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50/50 transition-colors"
            >
              <td className="px-6 py-4 text-xs ">
                {item.hospitalId}
              </td>
              <td className="px-6 py-4 text-xs font-semibold text-gray-700">
                {item.patientName}
              </td>
              <td className="px-6 py-4 text-xs ">
                {item.phoneNumber}
              </td>
              <td className="px-6 py-4 text-xs ">
                {item.nextDeliveryDate}
              </td>
              <td className="px-6 py-4 text-xs ">
                {item.location}
              </td>
              <td className="px-6 py-4">
                <span className={getStatusStyles(item.status)}>
                  {item.status}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-blue-500 border border-blue-200 px-5 py-1.5 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all text-xs font-medium">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between border-t border-gray-50">
        <div className="px-6 py-4 text-xs text-gray-500"><p>You're viewing {data.length} out of {deliveries || ""} deliveries</p></div>
        <div className="px-6 py-4 text-xs text-gray-500">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PatientTable;
