import React, { useState } from 'react';
import './InvoiceForm.css';

const InvoiceForm = () => {
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: '',
    gstNumber: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [products, setProducts] = useState([
    {
      id: 1,
      description: '',
      quantity: 1,
      unitPrice: 0,
      gstRate: 18,
    },
  ]);

  const [invoiceDetails, setInvoiceDetails] = useState({
    invoiceNumber: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: '',
  });

  // Handle customer details change
  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle product change
  const handleProductChange = (id, field, value) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, [field]: field === 'description' ? value : parseFloat(value) || 0 }
          : product
      )
    );
  };

  // Add new product row
  const addProductRow = () => {
    const newId = Math.max(...products.map((p) => p.id), 0) + 1;
    setProducts((prev) => [
      ...prev,
      {
        id: newId,
        description: '',
        quantity: 1,
        unitPrice: 0,
        gstRate: 18,
      },
    ]);
  };

  // Remove product row
  const removeProductRow = (id) => {
    if (products.length > 1) {
      setProducts((prev) => prev.filter((product) => product.id !== id));
    }
  };

  // Calculate totals
  const calculateLineTotal = (product) => {
    return product.quantity * product.unitPrice;
  };

  const calculateLineGST = (product) => {
    const lineTotal = calculateLineTotal(product);
    return (lineTotal * product.gstRate) / 100;
  };

  const subtotal = products.reduce((sum, product) => sum + calculateLineTotal(product), 0);
  const totalGST = products.reduce((sum, product) => sum + calculateLineGST(product), 0);
  const grandTotal = subtotal + totalGST;

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!customerDetails.name || !customerDetails.email) {
      alert('Please fill in all required customer details');
      return;
    }

    if (!invoiceDetails.invoiceNumber) {
      alert('Please enter an invoice number');
      return;
    }

    if (products.some((p) => !p.description || p.quantity <= 0 || p.unitPrice <= 0)) {
      alert('Please fill in all product details');
      return;
    }

    // Prepare invoice data
    const invoiceData = {
      invoiceDetails,
      customerDetails,
      products,
      totals: {
        subtotal: subtotal.toFixed(2),
        gst: totalGST.toFixed(2),
        grandTotal: grandTotal.toFixed(2),
      },
      createdAt: new Date().toISOString(),
    };

    console.log('Invoice Data:', invoiceData);
    alert('Invoice created successfully! Check console for details.');
    
    // TODO: Send invoiceData to backend API
  };

  // Handle form reset
  const handleReset = () => {
    setCustomerDetails({
      name: '',
      email: '',
      phone: '',
      gstNumber: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
    });
    setProducts([
      {
        id: 1,
        description: '',
        quantity: 1,
        unitPrice: 0,
        gstRate: 18,
      },
    ]);
    setInvoiceDetails({
      invoiceNumber: '',
      invoiceDate: new Date().toISOString().split('T')[0],
      dueDate: '',
    });
  };

  return (
    <div className="invoice-form-container">
      <h1>GST Invoice Form</h1>
      
      <form onSubmit={handleSubmit} className="invoice-form">
        
        {/* Invoice Details Section */}
        <section className="form-section">
          <h2>Invoice Details</h2>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="invoiceNumber">Invoice Number *</label>
              <input
                type="text"
                id="invoiceNumber"
                name="invoiceNumber"
                value={invoiceDetails.invoiceNumber}
                onChange={(e) =>
                  setInvoiceDetails((prev) => ({
                    ...prev,
                    invoiceNumber: e.target.value,
                  }))
                }
                placeholder="e.g., INV-2025-001"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="invoiceDate">Invoice Date</label>
              <input
                type="date"
                id="invoiceDate"
                value={invoiceDetails.invoiceDate}
                onChange={(e) =>
                  setInvoiceDetails((prev) => ({
                    ...prev,
                    invoiceDate: e.target.value,
                  }))
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="dueDate">Due Date</label>
              <input
                type="date"
                id="dueDate"
                value={invoiceDetails.dueDate}
                onChange={(e) =>
                  setInvoiceDetails((prev) => ({
                    ...prev,
                    dueDate: e.target.value,
                  }))
                }
              />
            </div>
          </div>
        </section>

        {/* Customer Details Section */}
        <section className="form-section">
          <h2>Customer Details</h2>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Customer Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={customerDetails.name}
                onChange={handleCustomerChange}
                placeholder="Enter customer name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={customerDetails.email}
                onChange={handleCustomerChange}
                placeholder="Enter email address"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={customerDetails.phone}
                onChange={handleCustomerChange}
                placeholder="Enter phone number"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="gstNumber">GST Number</label>
              <input
                type="text"
                id="gstNumber"
                name="gstNumber"
                value={customerDetails.gstNumber}
                onChange={handleCustomerChange}
                placeholder="Enter GST number"
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={customerDetails.address}
                onChange={handleCustomerChange}
                placeholder="Enter street address"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={customerDetails.city}
                onChange={handleCustomerChange}
                placeholder="Enter city"
              />
            </div>
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                name="state"
                value={customerDetails.state}
                onChange={handleCustomerChange}
                placeholder="Enter state"
              />
            </div>
            <div className="form-group">
              <label htmlFor="pincode">Pincode</label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                value={customerDetails.pincode}
                onChange={handleCustomerChange}
                placeholder="Enter pincode"
              />
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="form-section">
          <h2>Products/Services</h2>
          <div className="products-table-wrapper">
            <table className="products-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Unit Price (₹)</th>
                  <th>GST Rate (%)</th>
                  <th>Line Total (₹)</th>
                  <th>GST Amount (₹)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <input
                        type="text"
                        value={product.description}
                        onChange={(e) =>
                          handleProductChange(product.id, 'description', e.target.value)
                        }
                        placeholder="Enter product/service description"
                        className="product-input"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={product.quantity}
                        onChange={(e) =>
                          handleProductChange(product.id, 'quantity', e.target.value)
                        }
                        min="1"
                        step="0.01"
                        className="product-input"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={product.unitPrice}
                        onChange={(e) =>
                          handleProductChange(product.id, 'unitPrice', e.target.value)
                        }
                        min="0"
                        step="0.01"
                        className="product-input"
                      />
                    </td>
                    <td>
                      <select
                        value={product.gstRate}
                        onChange={(e) =>
                          handleProductChange(product.id, 'gstRate', e.target.value)
                        }
                        className="product-input"
                      >
                        <option value="0">0%</option>
                        <option value="5">5%</option>
                        <option value="12">12%</option>
                        <option value="18">18%</option>
                        <option value="28">28%</option>
                      </select>
                    </td>
                    <td className="amount-display">
                      ₹{calculateLineTotal(product).toFixed(2)}
                    </td>
                    <td className="amount-display">
                      ₹{calculateLineGST(product).toFixed(2)}
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => removeProductRow(product.id)}
                        className="btn-remove"
                        disabled={products.length === 1}
                        title={products.length === 1 ? 'At least one product is required' : 'Remove product'}
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            type="button"
            onClick={addProductRow}
            className="btn-add-product"
          >
            + Add Product/Service
          </button>
        </section>

        {/* Summary Section */}
        <section className="form-section">
          <div className="summary-box">
            <div className="summary-row">
              <span className="summary-label">Subtotal:</span>
              <span className="summary-value">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Total GST:</span>
              <span className="summary-value">₹{totalGST.toFixed(2)}</span>
            </div>
            <div className="summary-row grand-total">
              <span className="summary-label">Grand Total:</span>
              <span className="summary-value">₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </section>

        {/* Form Actions */}
        <section className="form-actions">
          <button type="submit" className="btn-submit">
            Create Invoice
          </button>
          <button type="reset" onClick={handleReset} className="btn-reset">
            Reset Form
          </button>
        </section>
      </form>
    </div>
  );
};

export default InvoiceForm;
