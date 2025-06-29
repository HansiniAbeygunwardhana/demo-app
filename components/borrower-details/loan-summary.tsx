import { AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BorrowerDetail } from '@/types';

interface LoanSummaryProps {
  borrower: BorrowerDetail;
  onEscalate: () => void;
}

export function LoanSummary({ borrower, onEscalate }: LoanSummaryProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const summaryItems = [
    { label: 'Employment', value: borrower.employment },
    { label: 'Annual Income', value: formatCurrency(borrower.income) },
    { label: 'Existing Loan', value: formatCurrency(borrower.existing_loan) },
    { label: 'Credit Score', value: borrower.credit_score.toString() },
    { label: 'Source of Funds', value: borrower.source_of_funds },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Loan Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {summaryItems.map((item, index) => (
            <div key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
              <span className="text-gray-600">{item.label}:</span>
              <span className="font-semibold text-gray-900">{item.value}</span>
            </div>
          ))}
        </div>

        {borrower.risk_signal && (
          <Alert className="border-amber-200 bg-amber-50 mb-6">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              <strong>Risk Signal:</strong> {borrower.risk_signal}
            </AlertDescription>
          </Alert>
        )}

        <Button 
          onClick={onEscalate}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
          disabled={!borrower.risk_signal && borrower.ai_flags.length === 0}
        >
          Escalate to Credit Committee
        </Button>
      </CardContent>
    </Card>
  );
}