"use client";

import { useState } from "react";
import { Save, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import type { Category } from "@/lib/types";

export function ProductAdminForm({ categories }: { categories: Category[] }) {
  const [message, setMessage] = useState("");

  async function submit(formData: FormData) {
    setMessage("");
    const payload = {
      name: formData.get("name"),
      sku: formData.get("sku"),
      description: formData.get("description"),
      price: Number(formData.get("price")),
      comparePrice: Number(formData.get("comparePrice") || 0) || undefined,
      categoryId: formData.get("categoryId"),
      status: formData.get("status"),
      imageUrl: formData.get("imageUrl"),
      featured: formData.get("featured") === "on",
      bestSeller: formData.get("bestSeller") === "on"
    };
    const response = await fetch("/api/products", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const result = await response.json();
    setMessage(result.ok ? `Created ${result.data.product.name}` : result.error?.message ?? "Could not save product. Login as admin first.");
  }

  return (
    <form action={submit} className="surface-card p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="label">Product upload system</p>
          <h2 className="mt-1 text-xl font-semibold">Create product</h2>
        </div>
        <Button type="submit">
          <Save className="h-4 w-4" />
          Save
        </Button>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label><span className="text-sm font-semibold">Name</span><input name="name" required className="focus-ring mt-1 h-10 w-full rounded-md border border-outline-variant px-3 text-sm" /></label>
        <label><span className="text-sm font-semibold">SKU</span><input name="sku" className="focus-ring mt-1 h-10 w-full rounded-md border border-outline-variant px-3 text-sm" /></label>
        <label><span className="text-sm font-semibold">Price</span><input name="price" type="number" step="0.01" required className="focus-ring mt-1 h-10 w-full rounded-md border border-outline-variant px-3 text-sm" /></label>
        <label><span className="text-sm font-semibold">Compare price</span><input name="comparePrice" type="number" step="0.01" className="focus-ring mt-1 h-10 w-full rounded-md border border-outline-variant px-3 text-sm" /></label>
        <label><span className="text-sm font-semibold">Category</span><Select name="categoryId" className="mt-1">{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</Select></label>
        <label><span className="text-sm font-semibold">Status</span><Select name="status" defaultValue="ACTIVE" className="mt-1"><option value="ACTIVE">Active</option><option value="DRAFT">Draft</option><option value="ARCHIVED">Archived</option></Select></label>
        <label className="sm:col-span-2"><span className="text-sm font-semibold">Image URL</span><input name="imageUrl" placeholder="Cloudinary or remote product image URL" className="focus-ring mt-1 h-10 w-full rounded-md border border-outline-variant px-3 text-sm" /></label>
        <label className="sm:col-span-2"><span className="text-sm font-semibold">Description</span><textarea name="description" rows={3} className="focus-ring mt-1 w-full rounded-md border border-outline-variant px-3 py-2 text-sm" /></label>
        <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" name="featured" /> Featured</label>
        <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" name="bestSeller" /> Best seller</label>
      </div>
      <div className="mt-5 rounded-md border border-dashed border-outline-variant p-4 text-sm text-secondary">
        <Upload className="mb-2 h-5 w-5 text-primary" />
        API upload endpoint validates JPEG, PNG, and WEBP files and returns a Cloudinary-ready URL when credentials are configured.
      </div>
      {message ? <p className="mt-4 rounded-md bg-blue-50 p-3 text-sm font-semibold text-primary">{message}</p> : null}
    </form>
  );
}
