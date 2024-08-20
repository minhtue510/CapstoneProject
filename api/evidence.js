import axios from "axios";
import api from "./api"; 

export const uploadEvidence = async (orderTripId, image) => {
  try {
    const formData = new FormData();
    formData.append("image", {
      uri: image,
      type: "image/jpeg",
      name: image.split("/").pop(),
    });

    const response = await api.put(
      "/orders/envidence?orderTripId=" + orderTripId,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("Upload thành công:", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi gửi ảnh lên server:", error);
    throw error;
  }
};
