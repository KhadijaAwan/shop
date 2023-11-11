import axios from 'axios';

export const gettingProduct = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/admin/viewProductsRoute',{
            headers: {
                'Cache-Control': 'no-store',
            }
        });
        return response.data;

    } catch (error) {
        console.log("Error is present ", error);
    }
}