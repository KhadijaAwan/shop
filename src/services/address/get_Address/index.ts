import axios from 'axios';
import Cookies from 'js-cookie';

export const gettingAddress = async (id: any) => {
    try {
        const token = Cookies.get('token');
        const response = await axios.get(`/api/client/deliveryAddress/getAddressRoute?id=${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;

    } catch (error) {
        console.log("Error is present ", error);
    }
}