import { create } from 'zustand';
import { Borrower, BorrowerDetail } from '@/types';

interface BorrowerDetailStore {
  selectedBorrower: Borrower | null;
  selectedBorrowerDetail: BorrowerDetail | null;
  loading: boolean;
  error: string | null;

  selectBorrower: (borrower: Borrower) => void;
  fetchBorrowerDetail: (id: string) => Promise<void>;
  clearSelectedBorrower: () => void;
}

export const useBorrowerDetailStore = create<BorrowerDetailStore>((set, get) => ({
  selectedBorrowerId: null,
  selectedBorrower: null,
  selectedBorrowerDetail: null,
  loading: false,
  error: null,

  selectBorrower: (borrower) => {
    set({
      selectedBorrower: borrower,
      selectedBorrowerDetail: null, // clear old detail
    });
    get().fetchBorrowerDetail(borrower.id);
  },

  fetchBorrowerDetail: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`/api/borrowers/${id}`);
      if (!res.ok) throw new Error('Failed to fetch borrower detail');

      const data: BorrowerDetail = await res.json();
      set({ selectedBorrowerDetail: data });
    } catch (err: any) {
      set({ error: err.message || 'Unknown error fetching detail' });
    } finally {
      set({ loading: false });
    }
  },

  clearSelectedBorrower: () =>
    set({
      selectedBorrower: null,
      selectedBorrowerDetail: null,
    }),
}));
