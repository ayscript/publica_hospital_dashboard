import { ArrowLeft, ArrowRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }: {currentPage: number, totalPages: number, onPageChange: (pageNum: number) => void}) => {
    const getPages = () => {
        const pages = [];

        // If total pages are few, show all of them
        if (totalPages <= 6) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Current page is near the start
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, '...', totalPages);
            }
            // Current page is near the end
            else if (currentPage >= totalPages - 2) {
                pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            }
            // Current page is somewhere in the middle
            else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }
        return pages;
    };

    const pages = getPages();

    return (
        <div className="flex items-center space-x-1 text-xs text-gray-500">
            {/* Prev Button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="previous"
                className={`w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 transition-colors 
          ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 text-gray-600'}`}
            >
                <ArrowLeft className="w-3" />
            </button>

            {/* Page Numbers */}
            <div className="flex items-center space-x-1">
                {pages.map((page, index) => {
                    if (page === '...') {
                        return (
                            <span key={`ellipsis-${index}`} className="px-0 tracking-widest text-gray-400">
                                ...
                            </span>
                        );
                    }

                    const isActive = page === currentPage;

                    return (
                        <button
                            key={page}
                            onClick={() => onPageChange(Number(page))}
                            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors
                ${isActive
                                    ? 'border border-gray-300 text-gray-700'
                                    : 'hover:bg-gray-50 text-gray-500'
                                }`}
                        >
                            {page}
                        </button>
                    );
                })}
            </div>

            {/* Next Button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="next"
                className={`w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 transition-colors 
          ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 text-gray-600'}`}
            >
                <ArrowRight className="w-3" />
            </button>
        </div>
    );
};

export default Pagination;