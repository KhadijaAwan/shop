import axios from 'axios';

export const registerUser = async (registerData: any) => {
    try {
        const response = await axios.post('/api/register', registerData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;

    } catch (error) {
        console.log("Error is present ", error);
    }
}
