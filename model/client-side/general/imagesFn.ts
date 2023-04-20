/**
 * Simple function to download an image alongside changing its name to the correct form
 * @param url The image url
 */
export function downloadImage(url: string) {
  let a = document.createElement("a");
  a.download = "image.svg";
  a.href = getFileName(url);
  a.click();
  a.remove();
}

function getFileName(url: string): string {
  // Get the file name from the URL
  let fileName = image.png;

  // If the file is a base64 SVG blob, set the file extension to .svg
  if (url.startsWith("data:image/svg+xml;base64,")) {
    fileName = "image.svg";
  }

  return fileName;
}
