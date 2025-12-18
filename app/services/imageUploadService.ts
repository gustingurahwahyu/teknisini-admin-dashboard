// Service untuk upload gambar ke ImgBB (Gratis)
export const uploadToImgBB = async (
  file: File
): Promise<{ success: boolean; url: string; error?: string }> => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    if (!apiKey || apiKey === "your_imgbb_api_key_here") {
      console.warn("ImgBB API key not configured, skipping upload");
      return {
        success: true,
        url: "", // Return empty URL if API key not configured
      };
    }

    // Validasi ukuran file (max 32MB untuk ImgBB free)
    if (file.size > 32 * 1024 * 1024) {
      return {
        success: false,
        url: "",
        error: "Ukuran file terlalu besar! Maksimal 32MB",
      };
    }

    // Convert file to base64
    const base64 = await fileToBase64(file);

    // Upload ke ImgBB
    const formData = new FormData();
    formData.append("image", base64.split(",")[1]); // Remove data:image/xxx;base64, prefix

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    if (result.success) {
      return {
        success: true,
        url: result.data.url,
      };
    } else {
      return {
        success: false,
        url: "",
        error: result.error?.message || "Upload gagal",
      };
    }
  } catch (error) {
    console.error("Error uploading to ImgBB:", error);
    return {
      success: false,
      url: "",
      error: error instanceof Error ? error.message : "Upload gagal",
    };
  }
};

// Helper function to convert File to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};
