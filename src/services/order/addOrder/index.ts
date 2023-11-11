import axios from 'axios';
import Cookies from 'js-cookie';

export const addingOrder = async (addData: any) => {
    try {
        const token = Cookies.get('token');
        console.log("Received request to create order:", addData);
        const response = await axios.post('/api/orders/createOrder', addData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;

    } catch (error) {
        console.log("Error is present ", error);
    }
}