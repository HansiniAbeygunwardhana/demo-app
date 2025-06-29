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

export interface BorrowerDetail {
  id: string;
  name: string;
  email: string;
  phone: string;
  loan_amount: number;
  status: string;
  employment: string;
  income: number;
  existing_loan: number;
  credit_score: number;
  source_of_funds: string;
  risk_signal: string | null;
  ai_flags: string[];
}