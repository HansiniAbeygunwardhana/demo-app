'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BorrowerHeader } from './borrower-header';
import { AIExplainability } from './ai-explainability';
import { LoanSummary } from './loan-summary';
import { BorrowerDetail } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface BorrowerDetailPanelProps {
  borrowerId: string;
}

export function BorrowerDetailPanel({ borrowerId }: BorrowerDetailPanelProps) {
  const [borrower, setBorrower] = useState<BorrowerDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (borrowerId) {
      fetchBorrowerDetail(borrowerId);
    }
  }, [borrowerId]);

  const fetchBorrowerDetail = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/borrowers/${id}`);
      if (response.ok) {
        const data = await response.json();
        setBorrower(data);
      } else {
        console.error('Failed to fetch borrower details');
      }
    } catch (error) {
      console.error('Error fetching borrower details:', error);
    } finally {
      setLoading(false);
    }
  };

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
      <Card>
        <CardContent className="p-6">
          <BorrowerHeader borrower={borrower} />
        </CardContent>
      </Card>

      <AIExplainability
        aiFlags={borrower.ai_flags}
        onRequestDocuments={() => handleAction('request-documents', borrower.id)}
        onSendToValuer={() => handleAction('send-valuer', borrower.id)}
        onApprove={() => handleAction('approve', borrower.id)}
      />

      <LoanSummary
        borrower={borrower}
        onEscalate={() => handleAction('escalate', borrower.id)}
      />
    </div>
  );
}
