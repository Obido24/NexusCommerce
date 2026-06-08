export type UploadResult = {
  assetId: string;
  secureUrl: string;
  provider: "cloudinary" | "mock";
};

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function uploadProductImage(file: File): Promise<UploadResult> {
  if (!allowedTypes.has(file.type)) {
    throw new Error("Only JPEG, PNG, and WEBP images are allowed.");
  }
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Images must be 5MB or smaller.");
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return {
      assetId: `mock_${Date.now()}`,
      secureUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      provider: "mock"
    };
  }

  return {
    assetId: `cloudinary_${Date.now()}`,
    secureUrl: `https://res.cloudinary.com/${cloudName}/image/upload/v1/nexuscommerce/${file.name}`,
    provider: "cloudinary"
  };
}
