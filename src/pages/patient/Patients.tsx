import { useQuery } from "@tanstack/react-query";
import { ChevronDown, Plus, X } from "lucide-react";
import { api } from "../../utility/api";
import { PatientSkeleton } from "../../components/loading/PatientLoading";
import PatientTable from "./Table";
import { Lens } from "../../components/Icons";
import PatientEnrollmentForm from "../../components/PatientEnrollmentForm";
import { useRef, useState } from "react";
import { useFocusTrap } from "../../hooks/usFocusTrap";

const Patients = () => {
  const [page, setPage] = useState(1);
  const modalRef = useRef<HTMLDivElement>(null);

  const {
    data,
    isLoading,
    error,
    isError,
  }: { data: any; isLoading: boolean; error: any; isError: boolean } = useQuery(
    {
      queryKey: ["patients", page],
      queryFn: () => api.get(`/patients?page=${page}`),
      placeholderData: (previousData) => previousData,
    },
  );

  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);

  useFocusTrap(showEnrollmentForm, modalRef);

  return (
    <div>
      <div className="border-b border-[#CFCFCF] py-6 px-[5%] flex items-center justify-between flex-1">
        <h1 className="text-2xl">Patients</h1>
        <button
          aria-label="Add Patient"
          className="flex gap-2 font-bold bg-blue-600 text-white p-4 py-3 ml-auto"
          onClick={() => {
            setShowEnrollmentForm(!showEnrollmentForm);
          }}
        >
          <Plus />
          Add Patient
        </button>
        {showEnrollmentForm ? (
          <div
            className="fixed top-0 left-0 w-full h-full bg-gray-800/70 backdrop-blur-xs flex items-center justify-center z-50"
            ref={modalRef}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowEnrollmentForm(false);
              }
            }}
          >
            <button
              className="px-4 py-1 rounded border border-gray-100 bg-white absolute top-4 right-4"
              aria-label="Close"
              onClick={() => {
                setShowEnrollmentForm(false);
              }}
            >
              <X />
            </button>
            <PatientEnrollmentForm isOpen={showEnrollmentForm} />
          </div>
        ) : null}
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
          <div className="flex gap-3 flex-wrap">
            <div className="flex gap-3 items-center">
              <p>Sort by: </p>
              <button
                className="flex gap-3 font-semibold bg-gray-200 px-3 py-2 rounded-3xl"
                aria-label="Hospital ID"
              >
                Hospital ID <ChevronDown />
              </button>
            </div>
            <div className="relative sm:ml-auto max-sm:w-full z-10">
              <Lens className="absolute  top-4 left-2" />
              <input
                type="search"
                placeholder="Search by patient name, id"
                className="ml-auto border border-gray-400 placeholder:text-sm px-4 py-2 pl-8 w-full"
              />
            </div>
          </div>
          <PatientTable
            data={data.data}
            totalPages={data.totalPages}
            deliveries={data.deliveries}
            isLoading={isLoading}
            setPage={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default Patients;
