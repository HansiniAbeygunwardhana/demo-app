import { create } from 'zustand';
import { Borrower, Pipeline } from '@/types';

interface PipelineStore {
  pipeline: Pipeline | null;
  loading: boolean;
  error: string | null;

  fetchPipeline: () => Promise<void>;
  getAllBorrowers: () => Borrower[];
}

export const usePipelineStore = create<PipelineStore>((set, get) => ({
  pipeline: null,
  loading: false,
  error: null,

  fetchPipeline: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch('/api/borrowers/pipeline');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      set({ pipeline: data });
    } catch (err: any) {
      set({ error: err.message || 'Unknown error' });
    } finally {
      set({ loading: false });
    }
  },

  getAllBorrowers: () => {
    const pipeline = get().pipeline;
    if (!pipeline) return [];
    return [...pipeline.new, ...pipeline.in_review, ...pipeline.approved];
  },
}));
