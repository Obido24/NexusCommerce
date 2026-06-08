import { type NextRequest } from "next/server";
import { handleApiError, jsonOk, rateLimit, requireRole } from "@/lib/api";
import { uploadProductImage } from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  try {
    rateLimit(request, 20);
    await requireRole(request, ["ADMIN"]);
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return jsonOk({ upload: null, message: "Attach a file field named file." }, { status: 422 });
    }
    const upload = await uploadProductImage(file);
    return jsonOk({ upload }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
