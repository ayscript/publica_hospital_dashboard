import React, { useState } from "react";
import { api } from "../utility/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useScrollLock } from "../hooks/useScrollLock";

// Define the shape of our form data
interface PatientFormData {
  hospitalId: string;
  patientName: string;
  phoneNumber: string;
  nextDeliveryDate: string;
  location: string;
  status: "Pending" | "Active" | "Completed" | "Cancelled";
}

const PatientEnrollmentForm = ({ isOpen }: { isOpen: boolean }) => {
  const queryClient = useQueryClient();

  useScrollLock(isOpen);

  const [formData, setFormData] = useState<PatientFormData>({
    hospitalId: "",
    patientName: "",
    phoneNumber: "",
    nextDeliveryDate: "",
    location: "",
    status: "Pending",
  });

  // mutation
  const mutation = useMutation<any, Error, PatientFormData>({
    mutationFn: () => api.post("/patients", formData),
    onSuccess: (data) => {
      // Runs when the POST request is successful
      // console.log('Success!', data);
      toast.success(data?.message || "User enrolled successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      // Optional: Tell React Query to refetch the patient list so the new data shows up
      queryClient.invalidateQueries({ queryKey: ["patients"] });

      // Reset form
      setFormData({
        hospitalId: "",
        patientName: "",
        phoneNumber: "",
        nextDeliveryDate: "",
        location: "",
        status: "Pending",
      });
    },
    onError: (error) => {
      // Runs if the POST request fails
      console.error("There was an error:", error.message);
      alert("Failed to enroll patient.");
    },
  });

  // Type the event to handle both standard inputs and select dropdowns
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Type the form submission event
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the data to your API
    mutation.mutate(formData);

    // Reset form after submission
    setFormData({
      hospitalId: "",
      patientName: "",
      phoneNumber: "",
      nextDeliveryDate: "",
      location: "",
      status: "Pending",
    });
  };

  return (
    <div className="w-[90%] max-w-180 mx-auto p-6 bg-gray-100 rounded-lg shadow-sm border border-gray-100 mt-10 max-h-[90dvh] overflow-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Enroll New Patient
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Hospital ID */}
          <div>
            <label
              htmlFor="hospitalId"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Hospital ID
            </label>
            <input
              type="text"
              id="hospitalId"
              name="hospitalId"
              value={formData.hospitalId}
              onChange={handleChange}
              placeholder="e.g. 1AFHFH093"
              required
              autoFocus
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Patient's Name */}
          <div>
            <label
              htmlFor="patientName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Patient's Name
            </label>
            <input
              type="text"
              id="patientName"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              placeholder="e.g. Oluwaseun Aregbesola"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="+234..."
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Next Delivery Date */}
          <div>
            <label
              htmlFor="nextDeliveryDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Next Delivery Date
            </label>
            <input
              type="date"
              id="nextDeliveryDate"
              name="nextDeliveryDate"
              value={formData.nextDeliveryDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. VI, Lagos"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Status */}
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-100"
            >
              <option value="Pending">Pending</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-2.5 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Enroll Patient
          </button>
        </div>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};

export default PatientEnrollmentForm;
