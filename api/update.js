import axios from "axios";
import api from "./api"; // Đảm bảo api là đúng endpoint và được cấu hình chính xác

export const updateImage = async (accountId, image) => {
  try {
    const formData = new FormData();

    // Chuyển đổi uri file:// thành một đối tượng phù hợp với FormData
    // formData.append("orderTripId", orderTripId);
    formData.append("image", {
      uri: image,
      type: "image/jpeg",
      name: image.split("/").pop(),
    });

    const response = await api.put(
      "/Accounts/api/accounts/upload-image=" + accountId,
    // "/accounts/upload-image=" + accountId,
      
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

export const updatePhoneNumber = async (accountId, newPhoneNumber) => {
    try {
      const response = await api.put(
        `/Accounts/${accountId}/phone`, // Endpoint phù hợp với ví dụ trên Swagger
        { phone: newPhoneNumber },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Cập nhật số điện thoại thành công:", response.data);
      return response.data;
    } catch (error) {
      console.error("Lỗi khi cập nhật số điện thoại:", error);
      throw error;
    }
  };
  
