import axios from 'axios';

export const registerAdmin = async (registerData: any) => {
    try {
        const response = await axios.post('/api/admin/addAdmin', registerData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;

    } catch (error) {
        console.log("Error is present ", error);
    }
}
