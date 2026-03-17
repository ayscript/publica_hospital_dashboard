import { Plus } from "lucide-react";
import { useState } from "react";
import Button from "../../components/Button";

// --- TypeScript Interfaces ---
interface Delivery {
  id: string;
  packageCode: string;
  deliveryDate: string;
  patientName: string;
  phoneNumber: string;
  location: string;
}

// --- Dummy Data ---
const deliveriesData: Delivery[] = [
  {
    id: "1",
    packageCode: "1AFHFH093",
    deliveryDate: "12th September 2020",
    patientName: "Oluwaseun Aregbesola",
    phoneNumber: "+2347068642920",
    location: "VI, Lagos",
  },
  {
    id: "2",
    packageCode: "1AFHFH093",
    deliveryDate: "12th September 2020",
    patientName: "Stella Omotoye",
    phoneNumber: "+2347068642920",
    location: "VI, Lagos",
  },
  {
    id: "3",
    packageCode: "1AFHFH093",
    deliveryDate: "12th September 2020",
    patientName: "Chinyere Okafor",
    phoneNumber: "+2347068642920",
    location: "VI, Lagos",
  },
  {
    id: "4",
    packageCode: "1AFHFH093",
    deliveryDate: "12th September 2020",
    patientName: "Mohammed Danladi",
    phoneNumber: "+2347068642920",
    location: "VI, Lagos",
  },
  {
    id: "5",
    packageCode: "1AFHFH093",
    deliveryDate: "12th September 2020",
    patientName: "Michael Aribisala",
    phoneNumber: "+2347068642920",
    location: "VI, Lagos",
  },
  {
    id: "6",
    packageCode: "1AFHFH093",
    deliveryDate: "12th September 2020",
    patientName: "Donatus Emefiele",
    phoneNumber: "+2347068642920",
    location: "VI, Lagos",
  },
];

export default function SuccessfulDeliveries() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Top Navigation / Header */}
      <header className="bg-white px-4 md:px-8 py-4 md:py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-xl">
          <span className="text-blue-500 font-medium">Deliveries</span>
          <span className="text-gray-400 mx-2">/</span>
          <span className="text-gray-700 font-semibold">
            Successful Deliveries
          </span>
        </div>
        <Button>
          <Plus /> Start New Delivery
        </Button>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8">
        {/* Controls (Sort & Search) */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 lg:pl-72">
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-2">Sort by</span>
            <button className="font-semibold text-gray-800 flex items-center gap-1">
              Most Recent
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
          <div className="relative w-full sm:w-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              className="pl-10 pr-4 py-2 border border-gray-200 rounded w-full sm:w-64 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Search by package code"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 shrink-0 space-y-6">
            {/* Unassigned Deliveries Card */}
            <div className="bg-white rounded shadow-sm py-4">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-6 mb-3">
                Unassigned Deliveries
              </h3>
              <ul className="space-y-1">
                <li className="px-6 py-3 flex justify-between items-center text-sm text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors">
                  <span>Paid</span>
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    12
                  </span>
                </li>
                <li className="px-6 py-3 flex justify-between items-center text-sm text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors">
                  <span>Unpaid</span>
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    8
                  </span>
                </li>
              </ul>
            </div>

            {/* Assigned Deliveries Card */}
            <div className="bg-white rounded shadow-sm py-4">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-6 mb-3">
                Assigned Deliveries
              </h3>
              <ul className="space-y-1">
                <li className="px-6 py-3 flex justify-between items-center text-sm text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors">
                  <span>Pending</span>
                </li>
                {/* Active State */}
                <li className="px-6 py-3 flex justify-between items-center text-sm font-semibold text-blue-600 bg-blue-50 border-l-4 border-blue-600 cursor-pointer">
                  <span>Successful</span>
                </li>
                <li className="px-6 py-3 flex justify-between items-center text-sm text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors">
                  <span>Failed</span>
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    12
                  </span>
                </li>
              </ul>
            </div>
          </aside>

          {/* Data Table */}
          <div className="flex-1 w-full bg-white rounded shadow-sm overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Package Code
                  </th>
                  <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Delivery Date
                  </th>
                  <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient's Name
                  </th>
                  <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone Number
                  </th>
                  <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {deliveriesData.map((delivery) => (
                  <tr
                    key={delivery.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {delivery.packageCode}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {delivery.deliveryDate}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {delivery.patientName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {delivery.phoneNumber}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {delivery.location}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="border border-blue-200 text-blue-600 hover:bg-blue-50 px-6 py-1.5 rounded text-sm font-medium transition-colors">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}