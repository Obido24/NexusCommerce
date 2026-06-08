import { FolderPlus } from "lucide-react";
import { AdminShell } from "@/components/admin-shell";
import { Button } from "@/components/ui/button";
import { store } from "@/lib/store";

export default function AdminCategoriesPage() {
  return (
    <AdminShell title="Category Management" actions={<Button><FolderPlus className="h-4 w-4" />Create category</Button>}>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {store.categories.map((category) => (
          <article key={category.id} className="surface-card overflow-hidden">
            <img src={category.image} alt={category.name} className="aspect-[5/3] w-full object-cover" />
            <div className="p-5">
              <p className="label">{category.slug}</p>
              <h2 className="mt-1 text-xl font-semibold">{category.name}</h2>
              <p className="mt-2 text-sm leading-6 text-secondary">{category.description}</p>
              <div className="mt-4 flex gap-2">
                <Button variant="secondary" size="sm">Edit</Button>
                <Button variant="ghost" size="sm">Delete</Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </AdminShell>
  );
}
