// src/services/AuthService.js
const API_BASE_URL = 'https://ab4d-185-219-178-33.ngrok-free.app/api/OAuthGoogle'; // Ngrok URL'nizi kullanın

export const loginWithGoogle = () => {
    window.location.href = `${API_BASE_URL}/login`; // Redirect to login
};

export const logout = async () => {
    await fetch(`${API_BASE_URL}/logout`, { method: 'GET', credentials: 'include' });
    // Handle any additional logout actions, such as updating state or redirecting
};
