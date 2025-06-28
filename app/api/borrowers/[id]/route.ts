export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const borrowerDetails = {
    "1": {
      id: "1",
      name: "Sarah Dunn",
      email: "sarah.dunn@example.com",
      phone: "(355)123-4557",
      loan_amount: 300000,
      status: "In Review",
      employment: "At Tech Company",
      income: 120000,
      existing_loan: 240000,
      credit_score: 720,
      source_of_funds: "Declared",
      risk_signal: "Missing Source of Funds declaration",
      ai_flags: [
        "Income Inconsistent with Bank statements",
        "High Debt-to-Income Ratio detected"
      ]
    },
    "2": {
      id: "2",
      name: "Alan Matthews",
      email: "alan.matthews@example.com",
      phone: "(555)987-6543",
      loan_amount: 20000,
      status: "In Review",
      employment: "Freelance Designer",
      income: 45000,
      existing_loan: 5000,
      credit_score: 680,
      source_of_funds: "Salary",
      risk_signal: "Irregular income pattern detected",
      ai_flags: [
        "Variable income source",
        "Limited credit history"
      ]
    },
    "3": {
      id: "3",
      name: "Lisa Carter",
      email: "lisa.carter@example.com",
      phone: "(555)456-7890",
      loan_amount: 450000,
      status: "New",
      employment: "Senior Manager",
      income: 85000,
      existing_loan: 0,
      credit_score: 750,
      source_of_funds: "Salary + Savings",
      risk_signal: null,
      ai_flags: []
    }
  };

  const borrower = borrowerDetails[params.id as keyof typeof borrowerDetails];
  
  if (!borrower) {
    return Response.json({ error: "Borrower not found" }, { status: 404 });
  }

  return Response.json(borrower);
}