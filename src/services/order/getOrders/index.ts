import axios from 'axios';
import Cookies from 'js-cookie';

export const gettingOrders = async (id: any) => {
    try {
        const token = Cookies.get('token');
        const response = await axios.get(`/api/orders/getOrders?id=${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Cache-Control': 'no-store',
            },
        });
        return response.data;

    } catch (error) {
        console.log("Error is present ", error);
    }
}
