import React, { useState } from 'react';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';
import './App.css';

function App() {
  const [invoiceData, setInvoiceData] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleGenerateInvoice = (data) => {
    setInvoiceData(data);
    setShowPreview(true);
  };

  const handleBackToForm = () => {
    setShowPreview(false);
  };

  return (
    <div className="app">
      {!showPreview ? (
        <InvoiceForm onGenerate={handleGenerateInvoice} />
      ) : (
        <InvoicePreview 
          data={invoiceData} 
          onBack={handleBackToForm}
        />
      )}
    </div>
  );
}

export default App;