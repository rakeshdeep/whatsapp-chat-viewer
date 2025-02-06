// utils/parseZip.ts
import JSZip from "jszip";

export async function parseZip(file: File) {
  const zip = new JSZip();
  const zipData = await zip.loadAsync(file);
  const txtFile = Object.values(zipData.files).find((f) =>
    f.name.endsWith(".txt")
  );

  if (!txtFile) throw new Error("No .txt file found in the ZIP");
  return await txtFile.async("text");
}
