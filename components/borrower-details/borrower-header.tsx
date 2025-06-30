import { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { BorrowerDetail } from '@/types';
import { ChevronDown, ChevronUp } from 'lucide-react'; // Optional icons for toggle

interface BorrowerHeaderProps {
  borrower: BorrowerDetail;
}

export function BorrowerHeader({ borrower }: BorrowerHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

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
    <div className="relative flex flex-col ">
      
      {/* Top Row: Avatar, Name, Loan Amount, Toggle Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-3">
        
        {/* Left: Avatar and Name */}
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>{getInitials(borrower.name)}</AvatarFallback>
          </Avatar>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{borrower.name}</h2>
        </div>

        {/* Right: Loan Amount and Toggle for Mobile */}
        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto">
          <div className="text-3xl sm:text-4xl font-bold text-gray-900">
            {formatAmount(borrower.loan_amount)}
          </div>

          {/* Toggle Button only visible on mobile */}
          <button
            className="sm:hidden ml-4 p-1"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Details"
          >
            {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>

      {/* Contact Info and Status */}
      <div
        className={`flex flex-col sm:flex-row sm:items-end text-sm text-gray-600 gap-2 transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        } sm:max-h-none sm:opacity-100`}
      >
        {/* Contact Details */}
        <div className="flex flex-col">
          <span>{borrower.email}</span>
          <span>{borrower.phone}</span>
        </div>

        {/* Status Badge aligned right on larger screens */}
        <div className="sm:ml-auto">
          <Badge className={`${getStatusColor(borrower.status)} px-3 py-1`}>
            {borrower.status}
          </Badge>
        </div>
      </div>
    </div>
  );
}
