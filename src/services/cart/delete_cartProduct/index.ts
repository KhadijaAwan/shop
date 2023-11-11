import axios from 'axios';
import Cookies from 'js-cookie';

export const deletingCartProduct = async (id: any) => {
    try {
        const token = Cookies.get('token');
        const response = await axios.delete(`/api/cart/deleteCart?id=${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log("Error is present ", error);
    }
} 