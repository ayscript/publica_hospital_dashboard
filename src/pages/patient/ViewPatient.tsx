import { Link } from "react-router";
import { useParams } from "react-router";
import SubHeader from "../../components/SubHeader";
import { useState } from "react";
import Button from "../../components/Button";
import { useQuery } from "@tanstack/react-query";

interface PatientData {
  hospitalId: string;
  firstName: string;
  lastName: string;
  gender: string;
  phoneNumber: string;
  email: string;
  paymentStatus: string;
}



const fetchPatientDetails = async (id: string): Promise<PatientData> => {
  // Replace this URL with your actual backend endpoint
  const response = await fetch(`http://localhost:3000/api/patients/${id}`);
  if (!response.ok) {
    console.log("An error occured");
    throw new Error("Failed to fetch patient data");
  }

  return response.json();
};

const ViewPatient = () => {
  const [formEditable, setFormEditable] = useState(false);
  const { patientId } = useParams<{ patientId: string }>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["patient", patientId],
    queryFn: () => fetchPatientDetails(patientId as string),
    enabled: !!patientId, // Only run if patientId exists
  });

  const getStatusStyles = (status: string): string => {
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

  return (
    <div className="flex-1">
      <SubHeader>
        <div className="flex items-center gap-1">
          <Link to={"/dashboard"} className="text-blue-600 text-4">
            Patient
          </Link>
          <span>/</span>
          <h1 className="text-2xl">View Patient</h1>
        </div>
        <div className="flex gap-4 text-[#2A2A2A]">
          <p className="flex flex-col">
            <span>Patient's next delivery date is</span>
            <span className="font-extrabold">
              14th November 2020, in 2 days
            </span>
          </p>
          <Button className="max-sm:px-2 max-sm:py-3 max-sm:text-[12px]">
            Assign Package to Patient
          </Button>
        </div>
      </SubHeader>

      {/* <div className="py-6 px-[5%]">ViewPatient</div> */}
      <div className="bg-[#f5f6f8] py-6 px-[5%] font-sans flex justify-center">
        <div className="max-w-275 w-full flex gap-4 mx-auto">
          {/* Left Sidebar */}
          <aside className="w-48 shrink-0 max-sm:hidden">
            <div className="bg-white flex flex-col py-4">
              <button className="text-left px-6 py-3 text-[13px] text-gray-400 hover:bg-gray-50">
                Patient
              </button>
              <button className="text-left px-6 py-3 text-[13px] text-blue-500 font-medium bg-[#f0f4ff] border-r-[3px] border-blue-500">
                Rider's Profile
              </button>
              <button className="text-left px-6 py-3 text-[13px] text-gray-500 hover:bg-gray-50">
                Delivery History
              </button>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="bg-white flex flex-col max-sm:w-full">
            {isLoading ? (
              <div className="flex items-center justify-center h-full min-h-100">
                <p className="text-gray-500 font-medium animate-pulse">
                  Loading patient data...
                </p>
              </div>
            ) : isError ? (
              <div className="flex items-center justify-center h-full min-h-100">
                <p className="text-red-500 font-medium">
                  Failed to load patient profile.
                </p>
              </div>
            ) : (
              <>
                {/* Header */}
                <header className="flex gap-4 max-sm:flex-col max-sm:pt-4 items-center pt-4 px-8 border-b border-gray-100">
                  {/* Payment Status */}
                  <div className="flex items-center gap-4 mr-16 max-sm:self-start sm:pb-4">
                    <span className="text-[14px] text-gray-700 font-medium">
                      Payment Status
                    </span>
                    <span className={getStatusStyles(data?.paymentStatus || "")}>
                      {data?.paymentStatus || "Paid"}
                    </span>
                  </div>

                  {/* Tabs */}
                  <div className="flex gap-4 h-full">
                    <button className="h-full flex items-center justify-center text-sm font-semibold text-blue-500 border-b-2 border-blue-500 px-2 mt-0.5 pb-3 sm:pb-4">
                      Patient Information
                    </button>
                    <button className="h-full flex items-center justify-center text-[14px] text-gray-400 px-2 hover:text-gray-600 transition-colors pb-3 sm:pb-4">
                      Delivery Information
                    </button>
                  </div>
                </header>

                {/* Body Section */}
                <div className="flex flex-wrap p-8 gap-12 border-b border-gray-100">
                  {/* Left Column (Title & Edit Button) */}
                  <div className="w-full max-w-80 shrink-0">
                    <h2 className="text-[18px] font-bold text-gray-800">
                      Patient's Information
                    </h2>
                    <p className="text-[13px] text-gray-500 mt-1.5 mb-6">
                      Personal information about Patient.
                    </p>

                    <button
                      className="flex items-center justify-center gap-2 w-full text-blue-500 border-2 border-blue-400 py-2.5 font-bold text-[13px] hover:bg-blue-50 transition-colors"
                      onClick={() => setFormEditable(true)}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 20h9"></path>
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                      </svg>
                      Edit Patient's Information
                    </button>
                  </div>

                  {/* Right Column (Form Grid) */}
                  <div className="flex-1 flex flex-col gap-4">
                    {/* Full Width Field */}
                    {/* Full Width Field: Hospital ID */}
                    <label className="bg-[#f3f4f6] border border-gray-400 px-4 py-2.5 flex flex-col justify-center min-h-16 cursor-text has-disabled:cursor-not-allowed has-disabled:border-transparent focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                      <span className="text-[12px] text-gray-500">
                        Hospital ID
                      </span>
                      <input
                        type="text"
                        disabled={!formEditable}
                        defaultValue={data?.hospitalId}
                        className="text-[15px] text-gray-900 font-semibold mt-0.5 bg-transparent border-none outline-none focus:ring-0 p-0 w-full disabled:cursor-not-allowed"
                      />
                    </label>

                    {/* Two Column Fields: First & Last Name */}
                    <div className="flex max-sm:flex-col gap-4">
                      <label className="bg-[#f3f4f6] border border-gray-400 px-4 py-2.5 flex flex-col justify-center flex-1 min-h-16 cursor-text focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all has-disabled:cursor-not-allowed has-disabled:border-transparent">
                        <span className="text-[12px] text-gray-500">
                          First Name
                        </span>
                        <input
                          type="text"
                          disabled={!formEditable}
                          defaultValue={data?.firstName}
                          className="text-[15px] text-gray-900 font-semibold mt-0.5 bg-transparent border-none outline-none focus:ring-0 p-0 w-full disabled:cursor-not-allowed"
                        />
                      </label>
                      <label className="bg-[#f3f4f6] border border-gray-400 px-4 py-2.5 flex flex-col justify-center flex-1 min-h-16 cursor-text focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all has-disabled:cursor-not-allowed has-disabled:border-transparent">
                        <span className="text-[12px] text-gray-500">
                          Last Name
                        </span>
                        <input
                          type="text"
                          disabled={!formEditable}
                          defaultValue={data?.lastName}
                          className="text-[15px] text-gray-900 font-semibold mt-0.5 bg-transparent border-none outline-none focus:ring-0 p-0 w-full disabled:cursor-not-allowed"
                        />
                      </label>
                    </div>

                    <div className="flex max-sm:flex-col gap-4">
                      <label className="bg-[#f3f4f6] border border-gray-400 px-4 py-2.5 flex flex-col justify-center flex-1 min-h-16 relative cursor-pointer focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all has-disabled:cursor-not-allowed has-disabled:border-transparent">
                        <span className="text-[12px] text-gray-500">
                          Gender
                        </span>
                        <div className="relative mt-0.5 flex items-center">
                          <select
                            defaultValue={data?.gender}
                            disabled={!formEditable}
                            className="text-[15px] text-gray-900 font-semibold bg-transparent border-none outline-none focus:ring-0 p-0 w-full appearance-none cursor-pointer disabled:cursor-not-allowed"
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                          {/* Pointer-events-none ensures clicking the arrow still opens the select menu */}
                          <svg
                            className="absolute right-0 pointer-events-none"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="black"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </div>
                      </label>
                      <label className="bg-[#f3f4f6] border border-gray-400 px-4 py-2.5 flex flex-col justify-center flex-1 min-h-16 cursor-text focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all has-disabled:cursor-not-allowed has-disabled:border-transparent">
                        <span className="text-[12px] text-gray-500">
                          Phone Number
                        </span>
                        <input
                          type="tel"
                          disabled={!formEditable}
                          defaultValue={data?.phoneNumber}
                          className="text-[15px] text-gray-900 font-semibold mt-0.5 bg-transparent border-none outline-none focus:ring-0 p-0 w-full disabled:cursor-not-allowed"
                        />
                      </label>
                    </div>

                    {/* Full Width Field */}
                    <label className="bg-[#f3f4f6] border border-gray-400 px-4 py-2.5 flex flex-col justify-center min-h-16 cursor-text focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all has-disabled:cursor-not-allowed has-disabled:border-transparent">
                      <span className="text-[12px] text-gray-500">
                        Email Address
                      </span>
                      <input
                        type="email"
                        disabled={!formEditable}
                        defaultValue={data?.email}
                        className="text-[15px] text-gray-900 font-semibold mt-0.5 bg-transparent border-none outline-none focus:ring-0 p-0 w-full disabled:cursor-not-allowed"
                      />
                    </label>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-8 flex justify-end">
                  {/* <button
                className="bg-[#a5bdf6] hover:bg-[#8da8eb] text-white font-medium py-3 px-8 rounded-sm text-[15px] transition-colors"
                disabled
              >
                Save Changes
              </button> */}
                  <Button disabled>Save Changes</Button>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ViewPatient;
