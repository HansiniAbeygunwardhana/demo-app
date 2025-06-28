export async function GET() {
  const pipeline = {
    new: [
      {
        id: "1",
        name: "Sarah Dunn",
        loan_type: "Home Loan",
        amount: 300000,
        status: "Renew"
      },
      {
        id: "3",
        name: "Lisa Carter",
        loan_type: "Home Loan", 
        amount: 450000,
        status: "New"
      },
      {
        id: "4",
        name: "Michael Johnson",
        loan_type: "Investment Loan",
        amount: 680000,
        status: "New"
      }
    ],
    in_review: [
      {
        id: "2",
        name: "Alan Matthews",
        loan_type: "Personal Loan",
        amount: 20000,
        status: "In Review"
      },
      {
        id: "5",
        name: "Emma Wilson",
        loan_type: "Home Loan",
        amount: 420000,
        status: "In Review"
      }
    ],
    approved: [
      {
        id: "6",
        name: "David Chen",
        loan_type: "Home Loan",
        amount: 350000,
        status: "Approved"
      }
    ]
  };

  return Response.json(pipeline);
}