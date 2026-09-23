"use client";

import { QRCodeSVG } from "qrcode.react";

export function AppQrCode({ value, size = 160 }: { value: string; size?: number }) {
  return (
    <div className="inline-flex rounded-sm bg-paper p-3">
      <QRCodeSVG value={value} size={size} bgColor="#f4f9fa" fgColor="#16323f" level="M" />
    </div>
  );
}
