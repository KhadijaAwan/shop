import axios from 'axios';
import Cookies from 'js-cookie';

export const gettingAdminOrders = async () => {
    try {
        const token = Cookies.get('token');
        const response = await axios.get("/api/admin/getUsersOrders", {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;

    } catch (error) {
        console.log("Error is present ", error);
    }
}