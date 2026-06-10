"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, UserCheck, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CustomerStatusToggle({ customerId, disabled }: { customerId: string; disabled?: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function toggle() {
    setLoading(true);
    setMessage("");
    const response = await fetch(`/api/customers/${customerId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ disabled: !disabled })
    });
    const result = await response.json();
    setLoading(false);
    if (!result.ok) {
      setMessage("Login as admin first");
      return;
    }
    setMessage(disabled ? "Enabled" : "Disabled");
    router.refresh();
  }

  return (
    <div className="flex items-center gap-2">
      <Button type="button" variant={disabled ? "secondary" : "destructive"} size="sm" onClick={toggle} disabled={loading}>
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : disabled ? <UserCheck className="h-4 w-4" /> : <UserX className="h-4 w-4" />}
        {disabled ? "Enable" : "Disable"}
      </Button>
      {message ? <span className="text-xs font-semibold text-primary">{message}</span> : null}
    </div>
  );
}
