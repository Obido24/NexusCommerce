import { type NextRequest } from "next/server";
import { handleApiError, jsonOk, rateLimit } from "@/lib/api";
import { store } from "@/lib/store";

export async function GET(request: NextRequest) {
  try {
    rateLimit(request);
    return jsonOk({ categories: store.categories });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    rateLimit(request, 60);
    const body = (await request.json()) as { name: string; description?: string };
    const category = {
      id: `cat_${Date.now()}`,
      name: body.name,
      slug: body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      description: body.description ?? "",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
    };
    store.categories.push(category);
    return jsonOk({ category }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
