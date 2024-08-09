import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Login = ({ onLoginSuccess }) => {
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');

  const hardcodedAddress = 'nxdff-rkmkm-wtscf-ysixf-ulsw4-5gtpx-p54jp-krkbk-6r4hd-n7sfa-qae';

  const handleVerify = (event) => {
    event.preventDefault();
    if (inputValue === hardcodedAddress) {
      setMessage('Address verified successfully!');
      onLoginSuccess();  // Call the onLoginSuccess function passed from App
    } else {
      setMessage('Verification failed. Please check the address and try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleVerify}>
        <div className="mb-3">
          <label htmlFor="verify-address" className="form-label">Verify Address</label>
          <input
            type="text"
            className="form-control"
            id="verify-address"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Verify</button>
      </form>
      {message && (
        <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'} mt-4`} role="alert">
          {message}
        </div>
      )}
    </div>
  );
};

export default Login;
