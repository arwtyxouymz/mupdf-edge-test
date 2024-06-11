import { NextApiHandler } from "next";
import * as mupdf from "mupdf";

const handler: NextApiHandler = async (req, res) => {
  const response = await fetch("http://localhost:3000/dummy.pdf");
  const document = mupdf.Document.openDocument(
    await response.arrayBuffer(),
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

  res.setHeader("Content-Type", "image/png");
  return res.status(200).send(Buffer.from(pngImage));
};
export default handler;
