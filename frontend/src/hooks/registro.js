import React, { useState } from 'react';
import './PaymentReceipt.css'; // You'll need to create this CSS file

const PaymentReceipt = () => {
  const [fileName, setFileName] = useState('');
  const [tutorName, setTutorName] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment submission logic here
    console.log({ tutorName, paymentAmount, fileName });
  };

  return (
    <div className="payment-receipt-container">
      <h1>Comprobante de pago</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <h2>Nombre del tutor:</h2>
          <input
            type="text"
            value={tutorName}
            onChange={(e) => setTutorName(e.target.value)}
            placeholder="Ingrese el nombre del tutor"
            required
          />
        </div>
        
        <div className="form-group">
          <h2>Importe a pagar:</h2>
          <input
            type="number"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            placeholder="Ingrese el importe"
            required
          />
        </div>
        
        <hr className="divider" />
        
        <div className="file-upload">
          <h3>Arrastra tu archivo o haz clic para seleccionar</h3>
          <label className="file-upload-label">
            <input
              type="file"
              onChange={handleFileChange}
              className="file-input"
              accept=".pdf,.doc,.docx,.jpg,.png"
            />
            <div className="file-upload-box">
              {fileName || "Seleccionar archivo"}
            </div>
          </label>
          <p className="supported-formats">
            <a href="https://www.soportados.com/" target="_blank" rel="noopener noreferrer">
              formato@soportados.pdf
            </a>
          </p>
        </div>
        
        <button type="submit" className="submit-button">
          Liquidar pago
        </button>
      </form>
    </div>
  );
};

export default PaymentReceipt;