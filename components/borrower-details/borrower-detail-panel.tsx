'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BorrowerHeader } from './borrower-header';
import { AIExplainability } from './ai-explainability';
import { LoanSummary } from './loan-summary';
import { BorrowerDetail } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { useBorrowerDetailStore } from '@/store/borrowerDetailsStore';


export function BorrowerDetailPanel() {
    const {
    selectedBorrowerDetail : borrowerDetails,
    selectedBorrower : borrower,
    loading,
  } = useBorrowerDetailStore();
  const { toast } = useToast();


  const handleAction = async (action: string, id: string) => {
    try {
      const response = await fetch(`/api/borrowers/${id}/${action}`, {
        method: 'POST',
      });
      const result = await response.json();
      
      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to perform action. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <Card className="h-fit">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!borrowerDetails) {
    return (
      <Card className="h-fit">
        <CardContent className="p-6 text-center text-gray-500">
          Borrow details not available.
        </CardContent>
      </Card>
    );
  }

  if (!borrower) {
    return (
      <Card className="h-fit">
        <CardContent className="p-6 text-center text-gray-500">
          Select a borrower to view details
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className='px-5'>
      <Card>
        <CardContent>
          <BorrowerHeader borrower={borrowerDetails} />
        </CardContent>
      </Card>

      <AIExplainability
        aiFlags={borrowerDetails.ai_flags}
        onRequestDocuments={() => handleAction('request-documents', borrower.id)}
        onSendToValuer={() => handleAction('send-valuer', borrower.id)}
        onApprove={() => handleAction('approve', borrower.id)}
      />

      <LoanSummary
        borrower={borrowerDetails}
        onEscalate={() => handleAction('escalate', borrower.id)}
      />
      </Card>
    </div>
  );
}
