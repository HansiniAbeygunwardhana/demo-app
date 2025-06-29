export async function GET() {
  return Response.json({
    steps: [
      "Deal Intake",
      "IDV & Credit Check", 
      "Document Upload",
      "AI Validation",
      "Credit Committee",
      "Approval & Docs",
      "Funder Syndication"
    ]
  });
}