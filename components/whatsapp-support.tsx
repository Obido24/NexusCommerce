import { MessageCircle } from "lucide-react";

const whatsappUrl = "https://wa.me/2348106464613";

export function WhatsAppSupport({ label = "Chat on WhatsApp" }: { label?: string }) {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#25D366] px-4 text-sm font-bold text-white transition hover:bg-[#1fb457]"
    >
      <MessageCircle className="h-4 w-4" />
      {label}
    </a>
  );
}
