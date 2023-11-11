import axios from 'axios';
import Cookies from 'js-cookie';

export const updateCartProduct = async (updateCartProductData: any) => {
    try {
        const token = Cookies.get('token');
        const response = await axios.put('/api/cart/updateCart', updateCartProductData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.log("Error is present ", error);
    }
};