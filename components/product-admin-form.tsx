"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, ImagePlus, Loader2, Save, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import type { Category } from "@/lib/types";

const fallbackImage = "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80";

export function ProductAdminForm({ categories }: { categories: Category[] }) {
  const [message, setMessage] = useState("");
  const [messageTone, setMessageTone] = useState<"success" | "error">("success");
  const [imageUrl, setImageUrl] = useState(fallbackImage);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const previewLabel = useMemo(() => {
    if (imageUrl.includes("images.unsplash.com")) return "Preview image";
    if (imageUrl.includes("res.cloudinary.com")) return "Cloudinary image";
    return "Remote image";
  }, [imageUrl]);

  function showMessage(text: string, tone: "success" | "error" = "success") {
    setMessage(text);
    setMessageTone(tone);
  }

  async function uploadImage(file: File | undefined) {
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      showMessage("Please choose a JPEG, PNG, or WEBP image.", "error");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showMessage("Product images must be 5MB or smaller.", "error");
      return;
    }

    setUploading(true);
    setMessage("");
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("/api/uploads", { method: "POST", body: formData });
    const result = await response.json();
    setUploading(false);

    if (!result.ok || !result.data?.upload?.secureUrl) {
      showMessage(result.error?.message ?? "Upload failed. Login as admin and try again.", "error");
      return;
    }
    setImageUrl(result.data.upload.secureUrl);
    showMessage(result.data.upload.provider === "mock" ? "Image validated. Add Cloudinary keys later for real uploads." : "Image uploaded successfully.");
  }

  async function submit(formData: FormData) {
    setSaving(true);
    setMessage("");
    const payload = {
      name: formData.get("name"),
      sku: formData.get("sku"),
      description: formData.get("description"),
      price: Number(formData.get("price")),
      comparePrice: Number(formData.get("comparePrice") || 0) || undefined,
      categoryId: formData.get("categoryId"),
      status: formData.get("status"),
      imageUrl,
      quantity: Number(formData.get("quantity") || 0),
      reserved: Number(formData.get("reserved") || 0),
      reorderPoint: Number(formData.get("reorderPoint") || 0),
      warehouse: formData.get("warehouse"),
      featured: formData.get("featured") === "on",
      bestSeller: formData.get("bestSeller") === "on"
    };
    const response = await fetch("/api/products", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const result = await response.json();
    setSaving(false);
    showMessage(result.ok ? `Created ${result.data.product.name}. Refresh to see it in the table.` : result.error?.message ?? "Could not save product. Login as admin first.", result.ok ? "success" : "error");
  }

  return (
    <form action={submit} className="surface-card p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="label">Product upload system</p>
          <h2 className="mt-1 text-xl font-semibold">Create product</h2>
        </div>
        <Button type="submit" disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {saving ? "Saving" : "Save"}
        </Button>
      </div>

      <div className="mt-5 overflow-hidden rounded-lg border border-outline-variant bg-surface-container-low">
        <div className="relative aspect-[4/3] bg-surface-container">
          <img src={imageUrl} alt="Product preview" className="h-full w-full object-cover" />
          <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-bold text-primary shadow-sm">{previewLabel}</span>
        </div>
        <div className="space-y-3 p-4">
          <label>
            <span className="text-sm font-semibold">Image URL</span>
            <input
              name="imageUrl"
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              placeholder="Cloudinary or remote product image URL"
              className="focus-ring mt-1 h-10 w-full rounded-md border border-outline-variant px-3 text-sm"
            />
          </label>
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-outline-variant bg-white px-3 py-4 text-sm font-semibold text-secondary transition hover:border-primary hover:text-primary">
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            {uploading ? "Validating image" : "Upload/validate product image"}
            <input type="file" accept="image/png,image/jpeg,image/webp" className="sr-only" onChange={(event) => uploadImage(event.target.files?.[0])} />
          </label>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label><span className="text-sm font-semibold">Name</span><input name="name" required placeholder="Midr Silk Scarf" className="focus-ring mt-1 h-10 w-full rounded-md border border-outline-variant px-3 text-sm" /></label>
        <label><span className="text-sm font-semibold">SKU</span><input name="sku" placeholder="MID-ACC-500" className="focus-ring mt-1 h-10 w-full rounded-md border border-outline-variant px-3 text-sm" /></label>
        <label><span className="text-sm font-semibold">Price</span><input name="price" type="number" step="0.01" required placeholder="45" className="focus-ring mt-1 h-10 w-full rounded-md border border-outline-variant px-3 text-sm" /></label>
        <label><span className="text-sm font-semibold">Compare price</span><input name="comparePrice" type="number" step="0.01" placeholder="60" className="focus-ring mt-1 h-10 w-full rounded-md border border-outline-variant px-3 text-sm" /></label>
        <label><span className="text-sm font-semibold">Category</span><Select name="categoryId" className="mt-1">{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</Select></label>
        <label><span className="text-sm font-semibold">Status</span><Select name="status" defaultValue="ACTIVE" className="mt-1"><option value="ACTIVE">Active</option><option value="DRAFT">Draft</option><option value="ARCHIVED">Archived</option></Select></label>
        <label><span className="text-sm font-semibold">Stock quantity</span><input name="quantity" type="number" min="0" defaultValue="24" className="focus-ring mt-1 h-10 w-full rounded-md border border-outline-variant px-3 text-sm" /></label>
        <label><span className="text-sm font-semibold">Reserved stock</span><input name="reserved" type="number" min="0" defaultValue="0" className="focus-ring mt-1 h-10 w-full rounded-md border border-outline-variant px-3 text-sm" /></label>
        <label><span className="text-sm font-semibold">Reorder point</span><input name="reorderPoint" type="number" min="0" defaultValue="8" className="focus-ring mt-1 h-10 w-full rounded-md border border-outline-variant px-3 text-sm" /></label>
        <label><span className="text-sm font-semibold">Warehouse</span><input name="warehouse" defaultValue="Midr Lagos" className="focus-ring mt-1 h-10 w-full rounded-md border border-outline-variant px-3 text-sm" /></label>
        <label className="sm:col-span-2"><span className="text-sm font-semibold">Description</span><textarea name="description" rows={3} placeholder="Describe the product, material, size, scent, or care details." className="focus-ring mt-1 w-full rounded-md border border-outline-variant px-3 py-2 text-sm" /></label>
        <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" name="featured" /> Featured</label>
        <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" name="bestSeller" /> Best seller</label>
      </div>

      <div className="mt-5 rounded-md border border-dashed border-outline-variant p-4 text-sm text-secondary">
        <ImagePlus className="mb-2 h-5 w-5 text-primary" />
        Image validation accepts JPEG, PNG, and WEBP up to 5MB. Without Cloudinary keys, the API safely returns a demo image URL.
      </div>
      {message ? (
        <p className={`mt-4 flex gap-2 rounded-md p-3 text-sm font-semibold ${messageTone === "success" ? "bg-blue-50 text-primary" : "bg-red-50 text-red-700"}`}>
          {messageTone === "success" ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : null}
          {message}
        </p>
      ) : null}
    </form>
  );
}
