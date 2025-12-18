export default async (request: Request) => {
  // Only allow POST requests
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ message: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const REVALIDATION_SECRET = process.env.SANITY_REVALIDATE_SECRET;

    // Verify the secret if configured
    if (REVALIDATION_SECRET) {
      const authHeader = request.headers.get("authorization");
      const secret = authHeader?.replace("Bearer ", "");

      if (secret !== REVALIDATION_SECRET) {
        return new Response(JSON.stringify({ message: "Invalid secret" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    // Parse the webhook payload from Sanity
    const body = await request.json();
    const { _type, slug } = body as { _type?: string; slug?: { current?: string } };

    console.log(`Revalidation triggered for type: ${_type}, slug: ${slug?.current}`);

    return new Response(
      JSON.stringify({
        revalidated: true,
        now: Date.now(),
        type: _type,
        slug: slug?.current,
        message: "Webhook received successfully.",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Revalidation error:", error);
    return new Response(
      JSON.stringify({ message: "Error processing webhook", error: String(error) }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

export const config = {
  path: "/api/revalidate",
};
