export function downloadImage(imageUrl: string) {
  // Create an <a> element to download the image
  const link = document.createElement("a");
  link.style.display = "none";
  document.body.appendChild(link);

  // Check if the image URL is a base64 image
  const isBase64 = imageUrl.startsWith("data:image/");

  // If the image URL is a base64 image, convert it to a Blob object
  if (isBase64) {
    const data = imageUrl.split(",")[1];
    const mime = imageUrl.split(",")[0].split(":")[1].split(";")[0];
    const array = new Uint8Array(data.length);
    for (let i = 0; i < data.length; i++) {
      array[i] = data.charCodeAt(i);
    }
    const blob = new Blob([array], { type: mime });
    imageUrl = URL.createObjectURL(blob);
  }

  // Set the href attribute of the <a> element to the image URL
  link.href = imageUrl;

  // Set the download attribute of the <a> element to the filename of the image
  link.download = "image.png";

  // Click the <a> element to initiate the download
  link.click();

  // Remove the <a> element from the DOM
  document.body.removeChild(link);

  // Revoke the URL to release the object from memory
  if (isBase64) {
    URL.revokeObjectURL(imageUrl);
  }
}
