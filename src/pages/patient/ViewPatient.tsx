import { Link } from "react-router";
import SubHeader from "../../components/SubHeader";

const ViewPatient = () => {
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
      </SubHeader>
      {/* <div className="py-6 px-[5%]">ViewPatient</div> */}
      <div className="bg-[#f5f6f8] py-6 px-[5%] font-sans flex justify-center">
        <div className="max-w-275 w-full flex gap-6">
          {/* Left Sidebar */}
          <aside className="w-60 shrink-0">
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
          <main className="bg-white flex flex-col">
            {/* Header */}
            <header className="flex items-center px-8 border-b border-gray-100 h-20">
              {/* Payment Status */}
              <div className="flex items-center gap-4 mr-16">
                <span className="text-[14px] text-gray-700 font-medium">
                  Payment Status
                </span>
                <span className="bg-[#d1f4e0] text-[#1e8a53] px-4 py-1.5 rounded-sm text-[13px] font-medium">
                  Paid
                </span>
              </div>

              {/* Tabs */}
              <div className="flex gap-8 h-full">
                <button className="h-full flex items-center text-[14px] font-semibold text-blue-500 border-b-2 border-blue-500 px-2 mt-0.5">
                  Patient Information
                </button>
                <button className="h-full flex items-center text-[14px] text-gray-400 px-2 hover:text-gray-600 transition-colors">
                  Delivery Information
                </button>
              </div>
            </header>

            {/* Body Section */}
            <div className="flex p-8 gap-12 border-b border-gray-100">
              {/* Left Column (Title & Edit Button) */}
              <div className="w-70 shrink-0">
                <h2 className="text-[18px] font-bold text-gray-800">
                  Patient's Information
                </h2>
                <p className="text-[13px] text-gray-500 mt-1.5 mb-6">
                  Personal information about Patient.
                </p>

                <button className="flex items-center justify-center gap-2 w-full text-blue-500 border-2 border-blue-400 py-2.5 font-bold text-[13px] hover:bg-blue-50 transition-colors">
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
                <label className="bg-[#f3f4f6] border border-gray-400 px-4 py-2.5 flex flex-col justify-center min-h-16 cursor-text focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                  <span className="text-[12px] text-gray-500">Hospital ID</span>
                  <input
                    type="text"
                    defaultValue="23AB456789"
                    className="text-[15px] text-gray-900 font-semibold mt-0.5 bg-transparent border-none outline-none focus:ring-0 p-0 w-full"
                  />
                </label>

                {/* Two Column Fields: First & Last Name */}
                <div className="flex gap-4">
                  <label className="bg-[#f3f4f6] border border-gray-400 px-4 py-2.5 flex flex-col justify-center flex-1 min-h-16 cursor-text focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                    <span className="text-[12px] text-gray-500">
                      First Name
                    </span>
                    <input
                      type="text"
                      defaultValue="Oluwaseun"
                      className="text-[15px] text-gray-900 font-semibold mt-0.5 bg-transparent border-none outline-none focus:ring-0 p-0 w-full"
                    />
                  </label>
                  <label className="bg-[#f3f4f6] border border-gray-400 px-4 py-2.5 flex flex-col justify-center flex-1 min-h-16 cursor-text focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                    <span className="text-[12px] text-gray-500">Last Name</span>
                    <input
                      type="text"
                      defaultValue="Aregbesola"
                      className="text-[15px] text-gray-900 font-semibold mt-0.5 bg-transparent border-none outline-none focus:ring-0 p-0 w-full"
                    />
                  </label>
                </div>

                {/* Two Column Fields with Dropdown: Gender & Phone */}
                <div className="flex gap-4">
                  <label className="bg-[#f3f4f6] border border-gray-400 px-4 py-2.5 flex flex-col justify-center flex-1 min-h-16 relative cursor-pointer focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                    <span className="text-[12px] text-gray-500">Gender</span>
                    <div className="relative mt-0.5 flex items-center">
                      <select
                        defaultValue="Male"
                        className="text-[15px] text-gray-900 font-semibold bg-transparent border-none outline-none focus:ring-0 p-0 w-full appearance-none cursor-pointer"
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
                  <label className="bg-[#f3f4f6] border border-gray-400 px-4 py-2.5 flex flex-col justify-center flex-1 min-h-16 cursor-text focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                    <span className="text-[12px] text-gray-500">
                      Phone Number
                    </span>
                    <input
                      type="tel"
                      defaultValue="+2348123456789"
                      className="text-[15px] text-gray-900 font-semibold mt-0.5 bg-transparent border-none outline-none focus:ring-0 p-0 w-full"
                    />
                  </label>
                </div>

                {/* Full Width Field */}
                <label className="bg-[#f3f4f6] border border-gray-400 px-4 py-2.5 flex flex-col justify-center min-h-16 cursor-text focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                  <span className="text-[12px] text-gray-500">
                    Email Address
                  </span>
                  <input
                    type="email"
                    defaultValue="seunregbesola@gmail.com"
                    className="text-[15px] text-gray-900 font-semibold mt-0.5 bg-transparent border-none outline-none focus:ring-0 p-0 w-full"
                  />
                </label>
              </div>
            </div>

            {/* Footer */}
            <div className="p-8 flex justify-end">
              <button
                className="bg-[#a5bdf6] hover:bg-[#8da8eb] text-white font-medium py-3 px-8 rounded-sm text-[15px] transition-colors"
                disabled
              >
                Save Changes
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ViewPatient;
