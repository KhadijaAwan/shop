import axios from 'axios';
import Cookies from 'js-cookie';

export const addingProduct = async (addProductData: any) => {
    try {
        const token = Cookies.get('token');
        const response = await axios.post('/api/admin/addProductRoute', addProductData, {
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