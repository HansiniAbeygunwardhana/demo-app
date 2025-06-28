export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  return Response.json({
    success: true,
    message: "Valuer has been notified."
  });
}