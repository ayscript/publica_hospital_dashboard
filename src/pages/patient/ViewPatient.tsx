import { Link } from "react-router";
import { useParams } from "react-router";
import SubHeader from "../../components/SubHeader";
import { useRef, useState } from "react";
import Button from "../../components/Button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { EditIcon } from "../../components/Icons";
import DeliveryInformation from "./DeliveryInfo";

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
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/patients/${id}`,
  );
  if (!response.ok) {
    console.log("An error occured");
    throw new Error("Failed to fetch patient data");
  }

  return response.json();
};

const updatePatientAPI = async ({ id, data }: { id: string; data: any }) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/patients/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update patient data");
  }

  return response.json();
};

const ViewPatient = () => {
  const [formEditable, setFormEditable] = useState(false);
  const { patientId } = useParams<{ patientId: string }>();

  // navigation
  const [viewDeliveryInfo, setViewDeliveryInfo] = useState(false);

  const focusRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["patient", patientId],
    queryFn: () => fetchPatientDetails(patientId as string),
    enabled: !!patientId, // Only run if patientId exists
  });

  const mutation = useMutation({
    mutationFn: updatePatientAPI,
    onSuccess: () => {
      // Magic happens here: This tells React Query the old data is stale,
      // forcing it to instantly re-fetch the fresh data you just saved!
      queryClient.invalidateQueries({ queryKey: ["patient", patientId] });
      setFormEditable(false);
      alert("Patient updated successfully!");
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const getStatusStyles = (status: string): string => {
    const base =
      "px-3 py-2 text-[10px] font-bold inline-block w-24 text-center ";

    switch (status) {
      case "Paid":
        return base + "bg-green-100 text-green-600";
      case "Unpaid":
        return base + "bg-red-100 text-red-500";
      default:
        return base + "bg-gray-100 ";
    }
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    // Trigger the API call
    mutation.mutate({
      id: patientId as string,
      data: payload,
    });
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
        <div className="flex max-sm:flex-col gap-4 text-[#2A2A2A]">
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
          <main className="bg-white flex flex-col w-full">
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
                    <span
                      className={getStatusStyles(data?.paymentStatus || "")}
                    >
                      {data?.paymentStatus || "Paid"}
                    </span>
                  </div>

                  {/* Tabs */}
                  <div className="flex gap-4 h-full">
                    <button
                      className={`h-full flex items-center justify-center px-2 mt-0.5 transition-colors pb-3 sm:pb-4 ${!viewDeliveryInfo ? "text-blue-500 border-b-3 border-blue-500 font-bold" : "text-gray-400 hover:text-gray-600"}`}
                      onClick={() => setViewDeliveryInfo(false)}
                    >
                      Patient Information
                    </button>
                    <button
                      className={`h-full flex items-center justify-center px-2 mt-0.5 transition-colors pb-3 sm:pb-4 ${viewDeliveryInfo ? "text-blue-500 border-b-3 border-blue-500 font-bold" : "text-gray-400 hover:text-gray-600"}`}
                      onClick={() => setViewDeliveryInfo(true)}
                    >
                      Delivery Information
                    </button>
                  </div>
                </header>

                {/* Body Section */}
                {!viewDeliveryInfo ? (
                  <>
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
                          onClick={() => {
                            setFormEditable(true);

                            setTimeout(() => {
                              focusRef.current?.focus();
                            }, 0);
                          }}
                        >
                          <EditIcon />
                          Edit Patient's Information
                        </button>
                      </div>

                      {/* Right Column (Form Grid) */}
                      <form
                        className="flex-1 flex flex-col gap-4"
                        id="patient-update-form"
                        onSubmit={handleSave}
                        ref={formRef}
                      >
                        {/* Full Width Field */}
                        {/* Full Width Field: Hospital ID */}
                        <label className="bg-[#f3f4f6] border border-gray-400 px-4 py-2.5 flex flex-col justify-center min-h-16 cursor-text has-disabled:cursor-not-allowed has-disabled:border-transparent focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                          <span className="text-[12px] text-gray-500">
                            Hospital ID
                          </span>
                          <input
                            type="text"
                            name="hospitalId"
                            disabled={!formEditable}
                            ref={focusRef}
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
                              name="firstName"
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
                              name="lastName"
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
                                name="gender"
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
                              name="phoneNumber"
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
                            name="email"
                            disabled={!formEditable}
                            defaultValue={data?.email}
                            className="text-[15px] text-gray-900 font-semibold mt-0.5 bg-transparent border-none outline-none focus:ring-0 p-0 w-full disabled:cursor-not-allowed"
                          />
                        </label>
                      </form>
                    </div>

                    {/* Footer */}
                    <div className="p-8 flex justify-end">
                      <Button
                        disabled={!formEditable}
                        form="patient-update-form"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </>
                ) : <DeliveryInformation />}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ViewPatient;
