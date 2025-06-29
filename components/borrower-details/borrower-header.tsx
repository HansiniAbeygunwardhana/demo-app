import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { BorrowerDetail } from '@/types';

interface BorrowerHeaderProps {
  borrower: BorrowerDetail;
}

export function BorrowerHeader({ borrower }: BorrowerHeaderProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'in review':
        return 'bg-amber-100 text-amber-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
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

  const getInitials = (name: string) => {
    const words = name.split(' ');
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  return (
     <div className="relative flex flex-col px-6 py-4">
  {/* Top Row: Avatar, Name, Loan Amount */}
  <div className="flex items-center justify-between mb-2">
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarFallback>{getInitials(borrower.name)}</AvatarFallback>
      </Avatar>
      <h2 className="text-2xl font-bold text-gray-900">{borrower.name}</h2>
    </div>
    <span className="text-4xl font-bold text-gray-900">
      {formatAmount(borrower.loan_amount)}
    </span>
  </div>

  {/* Contact Info and Status Row */}
  <div className="flex items-end text-sm text-gray-600">
    <div className="flex flex-col">
      <span>{borrower.email}</span>
      <span>{borrower.phone}</span>
    </div>
    
    {/* Status badge aligned to bottom right */}
    <div className="ml-auto">
      <Badge className={`${getStatusColor(borrower.status)} px-3 py-1`}>
        {borrower.status}
      </Badge>
    </div>
  </div>
</div>






    // <div className="flex items-center gap-4 px-6">
    //   <Avatar>
    //     <AvatarFallback>{getInitials(borrower.name)}</AvatarFallback>
    //   </Avatar>
    //   <div className="flex items-start gap-4 grow">
    //     <div>
    //       <h2 className="text-2xl font-bold text-gray-900 mb-1">{borrower.name}</h2>
    //       <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600">
    //         <span>{borrower.email}</span>
    //         <span>{borrower.phone}</span>
    //         <span className="font-semibold text-gray-900">{formatAmount(borrower.loan_amount)}</span>
    //       </div>
    //     </div>
    //   </div>
    //   <Badge className={`${getStatusColor(borrower.status)} px-3 py-1`}>
    //     {borrower.status}
    //   </Badge>
    // </div>
  );
}
