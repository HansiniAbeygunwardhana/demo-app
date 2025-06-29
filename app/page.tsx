'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { PipelineTabs } from '@/components/borrower-pipeline/pipeline-tabs';
import { BorrowerDetailPanel } from '@/components/borrower-details/borrower-detail-panel';
import { BrokerOverviewPanel } from '@/components/broker-overview/broker-overview-panel';
import { Toaster } from '@/components/ui/toaster';
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

          {/* Middle Panel - Borrower Details */}
          <div className="lg:col-span-5">
            {activeBorrower ? (
              <BorrowerDetailPanel borrowerId={activeBorrower.id} />
            ) : (
              <div className="flex items-center justify-center h-64 bg-white rounded-lg border-2 border-dashed border-gray-300">
                <p className="text-gray-500">Select a borrower to view details</p>
              </div>
            )}
          </div>

          {/* Right Panel - Broker Overview */}
          <div className="lg:col-span-3">
            <BrokerOverviewPanel />
          </div>
        </div>
      </main>

      <Toaster />
    </div>
  );
}