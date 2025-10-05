import React from 'react';

export default function RestaurantList({ restaurants, onSelect, selected }) {
  return (
    <div>
      <h3>Restaurants</h3>
      <div className="restaurant-list">
        {restaurants.length === 0 && <div>Loading...</div>}
        {restaurants.map(r => (
          <div key={r._id} className="card">
            <strong>{r.name}</strong>
            <div className="small">{r.cuisine} • {r.address}</div>
            <div style={{ marginTop: 8 }}>
              <button className="button" onClick={() => onSelect(r)}>
                {selected && selected._id === r._id ? 'Selected' : 'View Menu'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


