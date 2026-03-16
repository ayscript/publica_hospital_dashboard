const TableDataSkeleton = () => {
  return (
    <tr className="animate-pulse border-b border-gray-100 last:border-0">
      {/* 1. Hospital ID */}
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-24"></div>
      </td>

      {/* 2. Patient Name (Slightly wider) */}
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-32"></div>
      </td>

      {/* 3. Phone Number */}
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-28"></div>
      </td>

      {/* 4. Next Delivery Date */}
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-20"></div>
      </td>

      {/* 5. Location */}
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded w-24"></div>
      </td>

      {/* 6. Status Badge (Taller and fully rounded to mimic a pill) */}
      <td className="px-6 py-4">
        <div className="h-6 bg-gray-200 rounded-full w-20"></div>
      </td>

      {/* 7. Action Button (Taller to mimic the button height, inline-block to respect text-right) */}
      <td className="px-6 py-4 text-right">
        <div className="h-8 bg-gray-200 rounded w-16 inline-block"></div>
      </td>
    </tr>
  );
};

export default TableDataSkeleton;
