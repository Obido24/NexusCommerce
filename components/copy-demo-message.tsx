"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const message = `Please test the Midr Store demo:
https://project-oee8p.vercel.app

Start here:
https://project-oee8p.vercel.app/demo

Customer login:
customer@midr.store
Password123!

Admin login:
admin@midr.store
Password123!

Note: this is a demo. Payments are not real.`;

export function CopyDemoMessage() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(message);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <Button type="button" variant="secondary" onClick={copy}>
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? "Copied" : "Copy WhatsApp message"}
    </Button>
  );
}
