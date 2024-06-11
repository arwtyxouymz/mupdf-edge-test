import { NextRequest, NextResponse } from "next/server";
import * as mupdf from "mupdf";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const res = await fetch("http://localhost:3000/dummy.pdf");
  const document = mupdf.Document.openDocument(
    await res.arrayBuffer(),
    "application/pdf"
  );
  const page = document.loadPage(0);
  const pixmap = page.toPixmap(
    mupdf.Matrix.scale(2, 2),
    mupdf.ColorSpace.DeviceRGB,
    false,
    true
  );
  const pngImage = pixmap.asPNG();

  return new NextResponse(pngImage, {
    headers: { "Content-Type": "image/png" },
  });
}
