import { NextResponse } from 'next/server';

const mockNotifications = [
  {
    id: 1,
    icon: 'bell',
    title: 'New Borrower Application',
    description: 'Jane Smith has submitted a new application.',
  },
  {
    id: 2,
    icon: 'check-circle',
    title: 'Loan Approved',
    description: 'Loan for John Doe has been approved.',
  },
  {
    id: 3,
    icon: 'alert-triangle',
    title: 'Missing Documents',
    description: 'Income proof is missing for Richard Roe.',
  },
];

export async function GET() {
  return NextResponse.json({
    unreadCount: mockNotifications.length,
    notifications: mockNotifications,
  });
}
