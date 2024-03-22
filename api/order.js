import api from './api';

export const getOrderTripOfDriverId = async (driverId) => {
  try {
    const response = await api.get(`/OrderTrip/orderTripIdleOfDriver?driverId=${driverId}`);
    // const response = await api.get(`/ OrderTrip/orderTripOfDriver?driverId=${driverId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order trip info:', error);
    throw error;
  }
};

export const getOrderId = async (orderId) => {
  try {
    const response = await api.get(`/Order/order?orderId=${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order info:', error);
    throw error;
  }
};


// /Order/order?orderId
// /OrderTrip?tripId=18

