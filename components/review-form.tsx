"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Send, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

export function ReviewForm({ productId }: { productId: string }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(formData: FormData) {
    setLoading(true);
    setMessage("");
    setError("");
    const payload = {
      productId,
      rating: Number(formData.get("rating")),
      title: formData.get("title"),
      comment: formData.get("comment")
    };
    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    setLoading(false);
    if (!result.ok) {
      setError(result.error?.message ?? "Could not submit review.");
      return;
    }
    setMessage("Review added to this demo product.");
    router.refresh();
  }

  return (
    <form action={submit} className="surface-card mt-4 p-4">
      <div className="flex items-center gap-2">
        <Star className="h-5 w-5 text-warning" />
        <h3 className="font-semibold">Leave a demo review</h3>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-[120px_1fr]">
        <label>
          <span className="text-sm font-semibold">Rating</span>
          <Select name="rating" defaultValue="5" className="mt-1">
            <option value="5">5 stars</option>
            <option value="4">4 stars</option>
            <option value="3">3 stars</option>
            <option value="2">2 stars</option>
            <option value="1">1 star</option>
          </Select>
        </label>
        <label>
          <span className="text-sm font-semibold">Title</span>
          <input name="title" required placeholder="Lovely quality" className="focus-ring mt-1 h-10 w-full rounded-md border border-outline-variant px-3 text-sm" />
        </label>
        <label className="sm:col-span-2">
          <span className="text-sm font-semibold">Comment</span>
          <textarea name="comment" required rows={3} placeholder="Tell us what worked well in the demo." className="focus-ring mt-1 w-full rounded-md border border-outline-variant px-3 py-2 text-sm" />
        </label>
      </div>
      <Button className="mt-4" disabled={loading}>
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        Submit review
      </Button>
      {message ? <p className="mt-3 rounded-md bg-blue-50 p-3 text-sm font-semibold text-primary">{message}</p> : null}
      {error ? <p className="mt-3 rounded-md bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p> : null}
    </form>
  );
}
