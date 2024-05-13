

export const VerifyLogin = async () => {
    try {
        const response = await fetch('/verify-login', {
            credentials: 'include',  
        });
        const data = await response.json();
        return data;  
    } catch (error) {
        console.error("Error verifying login:", error);
        return null;
    }
};
