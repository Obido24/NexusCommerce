"use client";

import { useMemo, useState } from "react";
import { Edit3, FolderPlus, Loader2, Save, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type AdminCategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
};

const defaultImage = "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1200&q=80";

export function CategoryAdminManager({ initialCategories }: { initialCategories: AdminCategory[] }) {
  const [categories, setCategories] = useState(initialCategories);
  const [editing, setEditing] = useState<AdminCategory | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const formTitle = useMemo(() => (editing ? `Edit ${editing.name}` : "Create category"), [editing]);

  async function refresh() {
    const response = await fetch("/api/categories", { cache: "no-store" });
    const result = await response.json();
    if (result.ok) setCategories(result.data.categories);
  }

  async function submit(formData: FormData) {
    setMessage("");
    setError("");
    setSaving(true);

    const payload = {
      name: formData.get("name"),
      description: formData.get("description"),
      image: formData.get("image") || defaultImage
    };
    const response = await fetch(editing ? `/api/categories/${editing.id}` : "/api/categories", {
      method: editing ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    setSaving(false);

    if (!result.ok) {
      setError(result.error?.message ?? "Could not save category. Use Admin Demo Login first.");
      return;
    }

    setMessage(editing ? "Category updated." : "Category created.");
    setEditing(null);
    await refresh();
  }

  async function remove(category: AdminCategory) {
    setMessage("");
    setError("");
    const response = await fetch(`/api/categories/${category.id}`, { method: "DELETE" });
    const result = await response.json();
    if (!result.ok) {
      setError(result.error?.message ?? "Could not delete category.");
      return;
    }
    setMessage(`Deleted ${category.name}.`);
    await refresh();
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
      <form action={submit} className="surface-card h-fit p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="label">Category editor</p>
            <h2 className="mt-1 text-xl font-semibold">{formTitle}</h2>
          </div>
          {editing ? (
            <Button type="button" variant="ghost" size="icon" aria-label="Cancel edit" onClick={() => setEditing(null)}>
              <X className="h-4 w-4" />
            </Button>
          ) : null}
        </div>

        <div className="mt-5 space-y-4">
          <label>
            <span className="text-sm font-semibold">Name</span>
            <input
              key={`name-${editing?.id ?? "new"}`}
              name="name"
              required
              defaultValue={editing?.name ?? ""}
              placeholder="Shoes"
              className="focus-ring mt-1 h-10 w-full rounded-md border border-outline-variant px-3 text-sm"
            />
          </label>
          <label>
            <span className="text-sm font-semibold">Description</span>
            <textarea
              key={`description-${editing?.id ?? "new"}`}
              name="description"
              required
              rows={3}
              defaultValue={editing?.description ?? ""}
              placeholder="Describe the category for customers."
              className="focus-ring mt-1 w-full rounded-md border border-outline-variant px-3 py-2 text-sm"
            />
          </label>
          <label>
            <span className="text-sm font-semibold">Image URL</span>
            <input
              key={`image-${editing?.id ?? "new"}`}
              name="image"
              type="url"
              defaultValue={editing?.image ?? defaultImage}
              className="focus-ring mt-1 h-10 w-full rounded-md border border-outline-variant px-3 text-sm"
            />
          </label>
        </div>

        {message ? <p className="mt-4 rounded-md bg-blue-50 p-3 text-sm font-semibold text-primary">{message}</p> : null}
        {error ? <p className="mt-4 rounded-md bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p> : null}

        <Button className="mt-5 w-full" disabled={saving}>
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : editing ? <Save className="h-4 w-4" /> : <FolderPlus className="h-4 w-4" />}
          {saving ? "Saving" : editing ? "Save category" : "Create category"}
        </Button>
      </form>

      <section className="grid gap-6 md:grid-cols-2">
        {categories.map((category) => (
          <article key={category.id} className="surface-card overflow-hidden">
            <img src={category.image} alt={category.name} className="aspect-[5/3] w-full object-cover" />
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="label">{category.slug}</p>
                  <h2 className="mt-1 text-xl font-semibold">{category.name}</h2>
                </div>
                <span className="rounded-full bg-surface-container-low px-3 py-1 text-xs font-bold text-secondary">
                  {category.productCount} products
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-secondary">{category.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button type="button" variant="secondary" size="sm" onClick={() => setEditing(category)}>
                  <Edit3 className="h-4 w-4" />
                  Edit
                </Button>
                <Button type="button" variant="ghost" size="sm" onClick={() => remove(category)} disabled={category.productCount > 0}>
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
              {category.productCount > 0 ? (
                <p className="mt-3 text-xs font-semibold text-secondary">Delete is disabled while products are assigned to this category.</p>
              ) : null}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
