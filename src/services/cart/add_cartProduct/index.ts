import axios from 'axios';
import Cookies from 'js-cookie';

export const addingCartProduct = async (addCartProductData: any) => {
    try {
        const token = Cookies.get('token');
        const response = await axios.post('/api/cart/addCart', addCartProductData, {
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