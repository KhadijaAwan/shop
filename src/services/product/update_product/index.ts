import axios from 'axios';
import Cookies from 'js-cookie';

export const updatingProduct = async (updateProductData: any) => {
    try {
        const token = Cookies.get('token');
        const response = await axios.put('/api/admin/updateProductRoute', updateProductData, {
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