import { AdminShell } from "@/components/admin-shell";
import { CategoryAdminManager } from "@/components/category-admin-manager";
import { getCategoryProductCounts } from "@/lib/store";

export default function AdminCategoriesPage() {
  return (
    <AdminShell title="Category Management">
      <CategoryAdminManager initialCategories={getCategoryProductCounts()} />
    </AdminShell>
  );
}
