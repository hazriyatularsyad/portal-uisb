"use client";

import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const url = `${window.location.origin}/informasi/${slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback ignored if clipboard blocked
    }
  };

  const handleWhatsApp = () => {
    const url = `${window.location.origin}/informasi/${slug}`;
    const text = encodeURIComponent(`${title}\n\nBaca selengkapnya di Portal Mahasiswa UISB:\n${url}`);
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleWhatsApp}
        className="rounded-full gap-1.5 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
      >
        <Share2 className="w-3.5 h-3.5" />
        Bagikan ke WhatsApp
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleCopy}
        className="rounded-full gap-1.5"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            Tautan disalin
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            Salin tautan
          </>
        )}
      </Button>
    </div>
  );
}
