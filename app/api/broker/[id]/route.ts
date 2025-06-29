export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  return Response.json({
    name: "Robert Turner",
    deals: 16,
    approval_rate: "75%",
    pending: 7660
  });
}