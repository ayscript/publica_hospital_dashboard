import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Pagination {
  page: number;
  searchTerm: string;
  setSearchTerm: (search: Pagination["searchTerm"]) => void;
  setPage: (pageNum: Pagination["page"]) => void;
}

export const usePaginationStore = create(
  persist<Pagination>(
    (set) => ({
      page: 1,
      searchTerm: "",
      
      setSearchTerm: (search) => set({searchTerm: search}),
      setPage: (pageNum) => set({ page: pageNum }),
    }),
    {
      name: 'page-storage',
    }
  )
);
