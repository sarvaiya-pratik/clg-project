export default function  generateOTP(length) {
    const characters = '0123456789'; // This string contains all possible OTP characters
    let otp = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      otp += characters[randomIndex];
    }
  
    return otp;
  }
