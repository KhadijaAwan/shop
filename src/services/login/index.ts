import axios from 'axios';

export const loginUser = async (loginData: any) => {
    try {
        const response = await axios.post('/api/login', loginData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;

    } catch (error) {
        console.log("Error is present ", error);
    }
}