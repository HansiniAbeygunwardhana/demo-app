'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { PipelineTabs } from '@/components/borrower-pipeline/pipeline-tabs';
import { Borrower } from '@/types';

export default function Dashboard() {
  const [activeBorrower, setActiveBorrower] = useState<Borrower | null>(null);

  const handleBorrowerSelect = (borrower: Borrower) => {
    setActiveBorrower(borrower);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

            <main className="mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Panel - Borrower Pipeline */}
          <div className="lg:col-span-4">
            <PipelineTabs
              onBorrowerSelect={handleBorrowerSelect}
              activeBorrowerId={activeBorrower?.id || null}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
