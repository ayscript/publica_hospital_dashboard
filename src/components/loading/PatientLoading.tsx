export const PatientSkeleton = () => {
  return (
    <div className="w-full max-w-6xl p-6 bg-white animate-pulse mx-auto mt-4">
      {/* Top Bar: Sort and Search */}
      <div className="flex justify-between items-center mb-8">
        <div className="h-4 w-32 bg-gray-200 rounded"></div> {/* Sort by... */}
        <div className="h-10 w-64 bg-gray-100 rounded-lg border border-gray-200"></div>{" "}
        {/* Search Bar */}
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-6 gap-4 pb-4 border-b border-gray-100">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-3 w-20 bg-gray-200 rounded"></div>
        ))}
      </div>

      {/* Table Body Rows */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-6 gap-4 py-6 border-b border-gray-50 items-center"
        >
          <div className="h-3 w-24 bg-gray-100 rounded"></div> {/* ID */}
          <div className="h-3 w-32 bg-gray-100 rounded"></div> {/* Name */}
          <div className="h-3 w-28 bg-gray-100 rounded"></div> {/* Phone */}
          <div className="h-3 w-24 bg-gray-100 rounded"></div> {/* Date */}
          <div className="h-3 w-20 bg-gray-100 rounded"></div> {/* Location */}
          <div className="flex space-x-4 items-center">
            <div className="h-8 w-20 bg-gray-100 rounded-md"></div>{" "}
            {/* Status Badge */}
            <div className="h-8 w-16 bg-gray-50 border border-gray-100 rounded-md"></div>{" "}
            {/* View Button */}
          </div>
        </div>
      ))}

      {/* Pagination Footer */}
      <div className="flex justify-between items-center mt-8">
        <div className="h-3 w-40 bg-gray-100 rounded"></div>
        <div className="flex space-x-2">
          <div className="h-8 w-8 bg-gray-100 rounded-full"></div>
          <div className="h-8 w-8 bg-gray-100 rounded-full"></div>
          <div className="h-8 w-8 bg-gray-100 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
