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

    const response = await axios.put(
      // "/Accounts/api/accounts/upload-image=" + accountId,
      "https://nhatlocphatexpress.azurewebsites.net/Accounts/api/accounts/upload-image/" + accountId,
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
    // Đảm bảo newPhoneNumber được gửi dưới dạng JSON đúng định dạng
    const response = await axios.put(
      `https://nhatlocphatexpress.azurewebsites.net/Accounts/${accountId}/phone`,
      JSON.stringify( newPhoneNumber ), // Chuyển đổi thành JSON
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    // console.error('Lỗi khi cập nhật số điện thoại:', error.response?.data || error.message);
    throw error;
  }
};


export const updateEmail = async (accountId, newEmail) => {
  try {
    const response = await axios.put(
      `https://nhatlocphatexpress.azurewebsites.net/Accounts/${accountId}/email`,
      JSON.stringify( newEmail ),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    // console.error('Lỗi khi cập nhật email:', error.response?.data || error.message);
    throw error;
  }
};