export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  return Response.json({
    success: true,
    message: "Case escalated to Credit Committee."
  });
}