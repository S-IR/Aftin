export function addImageWatermark(image: string | File): Promise<Blob> {
  const watermarkImageUrl =
    "https://firebasestorage.googleapis.com/v0/b/aftin-3516f.appspot.com/o/product-images%2Faw09rpoj2qw4pijawij41295.png?alt=media&token=bfd24342-12eb-4e69-99eb-6bab8c7efb6a";
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (ctx === null) throw new Error("context is null at upload watermark");
    const img = new Image();
    const watermarkImg = new Image();

    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      watermarkImg.onload = () => {
        // Set watermark image properties
        const watermarkWidth = watermarkImg.naturalWidth;
        const watermarkHeight = watermarkImg.naturalHeight;
        ctx.globalAlpha = 0.5;
        const matrixWidth = Math.ceil(
          img.naturalWidth / watermarkImg.naturalWidth
        );
        const matrixHeight = Math.ceil(
          img.naturalHeight / watermarkImg.naturalHeight
        );

        for (
          let widthIterator = 0;
          widthIterator < matrixWidth;
          widthIterator++
        ) {
          for (
            let heightIterator = 0;
            heightIterator < matrixHeight;
            heightIterator++
          ) {
            ctx.drawImage(
              watermarkImg,
              widthIterator * watermarkWidth,
              heightIterator * watermarkHeight,
              watermarkWidth,
              watermarkHeight
            );
          }
        }

        canvas.toBlob((blob) => {
          if (blob === null) throw new Error("blob is null at add watermark");
          resolve(blob);
        });
      };

      watermarkImg.crossOrigin = "anonymous";
      watermarkImg.src = watermarkImageUrl;
    };

    img.crossOrigin = "anonymous";
    if (typeof image === "string") {
      img.src = image;
    } else if (image instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target === null || e.target.result === null) {
          throw new Error("reader could not read file at placing watermark");
        }
        img.src = e.target.result as string;
      };
      reader.readAsDataURL(image);
    } else {
      throw new Error("Invalid image type");
    }
  });
}
