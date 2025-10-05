import React, { useState } from 'react';
import { getToken } from '../utils/auth';

export default function Cart({ cart = [], removeFromCart, updateQty, clearCart, restaurantId }) {
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const placeOrder = async () => {
    if (!restaurantId) return alert('Select a restaurant first');
    if (!customerName || !address || !phone) return alert('Enter all delivery details');

    const token = getToken();
    if (!token) return alert('Please login to place order');

    const order = {
      customerName,
      address,
      phone,
      items: cart.map(i => ({ name: i.name, price: i.price, qty: i.qty })),
      total,
      restaurantId
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(order)
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to place order');

      alert(`Order placed! ID: ${data._id}`);
      setCustomerName('');
      setAddress('');
      setPhone('');
      clearCart();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="cart">
      <h3>Cart</h3>
      {cart.length === 0 ? <div>No items</div> : (
        <>
          {cart.map(i => (
            <div key={i.name} style={{ marginBottom: 8 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div>
                  <strong>{i.name}</strong>
                  <div className="small">₹{i.price} × {i.qty} = ₹{i.price * i.qty}</div>
                </div>
                <div>
                  <input type="number" min="1" value={i.qty}
                    onChange={e => updateQty(i.name, parseInt(e.target.value||1))} style={{ width:60 }} />
                  <button className="button" onClick={() => removeFromCart(i.name)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
          <hr />
          <div><strong>Total: ₹{total}</strong></div>

          <h4>Delivery Details</h4>
          <input placeholder="Name" value={customerName} onChange={e=>setCustomerName(e.target.value)} />
          <input placeholder="Address" value={address} onChange={e=>setAddress(e.target.value)} />
          <input placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} />

          <div style={{ display:'flex', gap:8, marginTop:8 }}>
            <button className="button" onClick={placeOrder} disabled={cart.length===0}>Place Order</button>
            <button className="button" onClick={clearCart}>Clear</button>
          </div>
        </>
      )}
    </div>
  );
}
