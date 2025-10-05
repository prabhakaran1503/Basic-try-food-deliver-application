import React from 'react';

export default function Menu({ menu = [], addToCart }) {
  if (!menu || menu.length === 0) return <div>No items</div>;
  return (
    <div className="menu">
      {menu.map((m, idx) => (
        <div className="menu-item" key={idx}>
          <div>
            <div><strong>{m.name}</strong></div>
            <div className="small">{m.description}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div>₹{m.price}</div>
            <button className="button" style={{ marginTop: 6 }} onClick={() => addToCart(m)}>Add</button>
          </div>
        </div>
      ))}
    </div>
  );
}
