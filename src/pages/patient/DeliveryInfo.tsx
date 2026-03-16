import { useState } from "react";
import { EditIcon } from "../../components/Icons";
import Button from "../../components/Button";

export default function DeliveryInformation() {
  const [formEditable, setFormEditable] = useState(false);

  return (
    <>
      {/* Top Section: Two Columns */}
      <div className="flex flex-wrap p-8 gap-12 border-b border-gray-100">
        {/* Left Column: Headers & Edit Button */}
        <div className="w-full max-w-80 shrink-0">
          <h2 className="text-[18px] font-bold text-gray-800">
            Delivery Information
          </h2>
          <p className="text-[13px] text-gray-500 mt-1.5 mb-6">
            Information about delivery status
          </p>

          <button className="flex items-center justify-center gap-2 w-full text-blue-500 border-2 border-blue-400 py-2.5 font-bold text-[13px] hover:bg-blue-50 transition-colors" onClick={() => setFormEditable(true)}>
            <EditIcon />
            Edit Delivery Information
          </button>
        </div>

        {/* Right Column: Information Fields */}
        <form className="flex-1 flex flex-col gap-4" id="patient-update-form">
          {/* Full Width Field */}
          {/* Full Width Field: Hospital ID */}
          <label className="bg-[#f3f4f6] border border-gray-400 px-4 py-2.5 flex flex-col justify-center min-h-16 cursor-text has-disabled:cursor-not-allowed has-disabled:border-transparent focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
            <span className="text-[12px] text-gray-500">
              Next Delivery Date
            </span>
            <input
              type="text"
              name="nextDeliveryDate"
              disabled={!formEditable}
              value={"14th November 2026"}
              className="text-[15px] text-gray-900 font-semibold mt-0.5 bg-transparent border-none outline-none focus:ring-0 p-0 w-full disabled:cursor-not-allowed"
            />
          </label>

          <label className="bg-[#f3f4f6] border border-gray-400 px-4 py-2.5 flex flex-col justify-center min-h-16 cursor-text focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all has-disabled:cursor-not-allowed has-disabled:border-transparent">
            <span className="text-[12px] text-gray-500">Delivery Area</span>
            <input
              type="text"
              name="delivery_area"
              disabled={!formEditable}
              value={"Yaba, Lagos"}
              className="text-[15px] text-gray-900 font-semibold mt-0.5 bg-transparent border-none outline-none focus:ring-0 p-0 w-full disabled:cursor-not-allowed"
            />
          </label>

          <label className="bg-[#f3f4f6] border border-gray-400 px-4 py-2.5 flex flex-col justify-center min-h-16 cursor-text focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all has-disabled:cursor-not-allowed has-disabled:border-transparent">
            <span className="text-[12px] text-gray-500">Delivery Adress</span>
            <input
              type="text"
              name="deliveryAddress"
              disabled={!formEditable}
              value={"19, Mohammed Abiola street, Akoka, Lagos"}
              className="text-[15px] text-gray-900 font-semibold mt-0.5 bg-transparent border-none outline-none focus:ring-0 p-0 w-full disabled:cursor-not-allowed"
            />
          </label>

          <div className="flex max-sm:flex-col gap-4 sm:w-1/2">
            <label className="bg-[#f3f4f6] border border-gray-400 px-4 py-2.5 flex flex-col justify-center flex-1 min-h-16 relative cursor-pointer focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all has-disabled:cursor-not-allowed has-disabled:border-transparent">
              <span className="text-[12px] text-gray-500">Payment Status</span>
              <div className="relative mt-0.5 flex items-center">
                <select
                  name="gender"
                  disabled={!formEditable}
                  className="text-[15px] text-gray-900 font-semibold bg-transparent border-none outline-none focus:ring-0 p-0 w-full appearance-none cursor-pointer disabled:cursor-not-allowed"
                >
                  <option value="Male">Paid</option>
                  <option value="Female">Unpaid</option>
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
            {/* <label className="bg-[#f3f4f6] border border-gray-400 px-4 py-2.5 flex flex-col justify-center flex-1 min-h-16 cursor-text focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all has-disabled:cursor-not-allowed has-disabled:border-transparent">
              <span className="text-[12px] text-gray-500">Phone Number</span>
              <input
                type="tel"
                name="phoneNumber"
                className="text-[15px] text-gray-900 font-semibold mt-0.5 bg-transparent border-none outline-none focus:ring-0 p-0 w-full disabled:cursor-not-allowed"
              />
            </label> */}
          </div>
        </form>
      </div>

      {/* Bottom Section: Divider & Save Button */}
      <div className="p-8 flex justify-end">
        <Button disabled={!formEditable} form="patient-update-form">
          Save Changes
        </Button>
      </div>
    </>
  );
}
