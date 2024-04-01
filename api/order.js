import api from './api';

export const getOrderTripOfDriverId = async (driverId,status) => {
  try {
    // const response = await api.get(`/OrderTrip/orderTripIdleOfDriver?driverId=${driverId}`);
    const response = await api.get(`/OrderTrip/orderTripOfDriver?driverId=${driverId}&status=${status}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order trip info:', error);
    throw error;
  }
};

export const getOrderTripOfIdleDriverId = async (driverId) => {
  try {
    // const response = await api.get(`/OrderTrip/orderTripIdleOfDriver?driverId=${driverId}`);
    const response = await api.get(`/OrderTrip//orderTripIdleOfDriver?driverId=${driverId}`);
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
    // console.error('Error fetching order info:', error);
    // throw error;
  }
};

export const getItemOderTrip = async (orderTripId) => {
  try {
    const response = await api.get(`/OrderTrip/itemOrderTrip?orderTripId=${orderTripId}`);
    return response.data;
  } catch (error) {
    // console.error('Error fetching order info:', error);
    // throw error;
  }
};

export const startOrderTrip = async (tripId) => {
  try {
    const response = await api.put(`/Drivers/api/driver/start-order-trip?tripId=${tripId}`);
    return response.data;
  } catch (error) {
    console.error('Error starting order trip:', error);
    throw error;
  }
};

export const completeOderTrip = async (orderTripId) => {
  try {
    const response = await api.put(`/Drivers/api/driver/complete-order-trip?orderTripId=${orderTripId}`);
    return response.data;
  } catch (error) {
    console.error('Error starting order trip:', error);
    throw error;
  }
};



// /Order/order?orderId
// /OrderTrip?tripId=18

