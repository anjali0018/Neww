@"
const axios = require('axios');

async function testRegister() {
  try {
    const response = await axios.post('https://smart-recruit-backend-cvr2.onrender.com/api/auth/register', {
      name: 'Test User',
      email: 'test@example.com',
      password: '123456',
      role: 'applicant'
    });
    
    console.log('✅ Registration successful!');
    console.log('Response:', response.data);
  } catch (error) {
    console.error('❌ Registration failed:');
    console.error(error.response?.data || error.message);
  }
}

testRegister();
"@ | Out-File -FilePath test-register.js -Encoding utf8