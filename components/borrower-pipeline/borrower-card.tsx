import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Borrower } from '@/types';

interface BorrowerCardProps {
  borrower: Borrower;
  isActive: boolean;
  onClick: () => void;
}

export function BorrowerCard({ borrower, isActive, onClick }: BorrowerCardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'in review':
        return 'bg-amber-100 text-amber-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'renew':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card 
      className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
        isActive ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold text-gray-900">{borrower.name}</h3>
          <p className="text-sm text-gray-600">{borrower.loan_type}</p>
        </div>
        <div className="text-right">
          <p className="font-semibold text-gray-900">{formatAmount(borrower.amount)}</p>
        </div>
      </div>
      <Badge className={`${getStatusColor(borrower.status)} text-xs`}>
        {borrower.status}
      </Badge>
    </Card>
  );
}