import axios from 'axios';

export const getProductId = async (id: any) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/client/productId?id=${id}`, {
            headers: {
                'Cache-Control': 'no-store',
            }
        });
        console.log(response.data);
        return response.data;

    } catch (error) {
        console.log("Error is present ", error);
    }
}