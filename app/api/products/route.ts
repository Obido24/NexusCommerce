import { type NextRequest } from "next/server";
import { handleApiError, jsonOk, parseJson, rateLimit, requireRole } from "@/lib/api";
import { deleteProduct, listProducts, upsertProduct } from "@/lib/store";
import { productSchema } from "@/lib/validators";

export async function GET(request: NextRequest) {
  try {
    rateLimit(request);
    const params = request.nextUrl.searchParams;
    const products = listProducts({
      query: params.get("q") ?? undefined,
      category: params.get("category") ?? undefined,
      sort: params.get("sort") ?? undefined
    });
    return jsonOk({ products });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    rateLimit(request, 60);
    await requireRole(request, ["ADMIN"]);
    const input = await parseJson(request, productSchema);
    const product = upsertProduct({
      ...input,
      inventory: {
        productId: input.id ?? `prd_${Date.now()}`,
        quantity: input.quantity ?? 20,
        reserved: input.reserved ?? 0,
        reorderPoint: input.reorderPoint ?? 8,
        warehouse: input.warehouse ?? "Midr Lagos",
        lastRestockedAt: new Date().toISOString()
      },
      images: input.imageUrl ? [{ id: `img_${Date.now()}`, url: input.imageUrl, alt: input.name, position: 0 }] : undefined
    });
    return jsonOk({ product }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    rateLimit(request, 60);
    await requireRole(request, ["ADMIN"]);
    const id = request.nextUrl.searchParams.get("id");
    return jsonOk({ deleted: id ? deleteProduct(id) : false });
  } catch (error) {
    return handleApiError(error);
  }
}
