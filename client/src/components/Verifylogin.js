

export const VerifyLogin = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/verify-login`, {
            credentials: 'include',  
        });
        const data = await response.json();
        return data;  
    } catch (error) {
        console.error("Error verifying login:", error);
        return null;
    }
};
