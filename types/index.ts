export interface Borrower {
  id: string;
  name: string;
  loan_type: string;
  amount: number;
  status: string;
}

export interface Pipeline {
  new: Borrower[];
  in_review: Borrower[];
  approved: Borrower[];
}