import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Plus } from "lucide-react";
import { api } from "../../utility/api";
import { PatientSkeleton } from "../../components/loading/PatientLoading";
import PatientTable from "./Table";

const Patients = () => {
  const {
    data,
    isLoading,
    error,
    isError,
  }: { data: any; isLoading: boolean; error: any; isError: boolean } = useQuery(
    {
      queryKey: ["patients"],
      // Using api.get with the expected return type
      queryFn: () => api.get("/patients"),
    },
  );

  console.log(data);
  return (
    <div>
      <div className="border-b border-[#CFCFCF] py-6 px-[5%] flex items-center justify-between">
        <h1 className="text-2xl">Patients</h1>
        <button
          aria-label="Add Patient"
          className="flex gap-2 font-bold bg-blue-600 text-white p-4 py-3"
        >
          <Plus />
          Add Patient
        </button>
      </div>
      {isLoading && !data ? (
        <PatientSkeleton />
      ) : isError && !data ? (
        <div
          className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 border border-red-200 dark:text-red-400 max-w-120 mx-auto"
          role="alert"
        >
          <span className="font-medium">Error:</span> {error?.message}
        </div>
      ) : (
        <div className="flex flex-col gap-8 py-4 px-[5%]">
          <div className="flex gap-3">
            <p>Sort by</p>
            <button
              className="flex gap-3 font-semibold"
              aria-label="Hospital ID"
            >
              Hospital ID <ChevronDown />
            </button>
            <input type="text" className="ml-auto border border-gray-400" />
          </div>
          <PatientTable data={data} />
        </div>
      )}
    </div>
  );
};

export default Patients;
