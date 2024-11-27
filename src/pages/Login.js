import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate(); // useNavigate kancasını kullanarak yönlendirme işlemini yapıyoruz.

  const handleSuccess = async (credentialResponse) => {
    console.log('Google login success:', credentialResponse);
    const token = credentialResponse.credential;

    try {
      // ngrok ile sağlanan URL'yi kullanarak API'ye gönderin ve doğrulayın
      const response = await axios.post('https://ab4d-185-219-178-33.ngrok-free.app/api/OAuthGoogle/google-response', {
        token,
      });

      console.log('API response:', response.data);
      
      // Giriş başarılı ise, dashboard'a yönlendir
      navigate('/dashboard'); // Başarılı girişten sonra yönlendirme işlemi
    } catch (error) {
      console.error('Error verifying token with API', error);
    }
  };

  const handleError = (error) => {
    console.error('Google login failed:', error);
  };

  return (
    <GoogleOAuthProvider clientId="36387429936-b1kj3m6r39mjmsmvha7e8f9jtrv69h89.apps.googleusercontent.com">
      <div className="App">
        <h2>Google ile Giriş Yap</h2>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
