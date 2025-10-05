import React, { useEffect, useState } from 'react';
import RestaurantList from './components/RestaurantList';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Auth from './components/Auth';
import { getToken } from './utils/auth';

export default function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [selected, setSelected] = useState(null); // restaurant object
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  // Fetch restaurants
  useEffect(() => {
    fetch('/api/restaurants')
      .then(res => res.json())
      .then(setRestaurants)
      .catch(err => console.error(err));
  }, []);

  // Check logged-in user from token
  useEffect(() => {
    const token = getToken();
    if (token) setUser({ token }); // simple, you can decode token if needed
  }, []);

  const addToCart = (item) => {
    setCart(prev => {
      const found = prev.find(i => i.name === item.name);
      if (found) {
        return prev.map(i => i.name === item.name ? { ...i, qty: i.qty + 1 } : i);
      } else {
        return [...prev, { ...item, qty: 1 }];
      }
    });
  };

  const removeFromCart = (name) => setCart(prev => prev.filter(i => i.name !== name));
  const updateQty = (name, qty) => {
    if (qty <= 0) return removeFromCart(name);
    setCart(prev => prev.map(i => i.name === name ? { ...i, qty } : i));
  };
  const clearCart = () => setCart([]);

  return (
    <div className="container">
      <div className="header">
        <h1>Mini Food Delivery</h1>
        <div className="small">
          {user ? `Logged in` : <Auth setUser={setUser} />}
        </div>
      </div>

      <div className="grid">
        <div>
          <RestaurantList restaurants={restaurants} onSelect={setSelected} selected={selected} />
          {selected && (
            <div style={{ marginTop: 12 }}>
              <h3>{selected.name} — Menu</h3>
              <Menu menu={selected.menu} addToCart={addToCart} />
            </div>
          )}
        </div>

        <div>
          <Cart
            cart={cart}
            removeFromCart={removeFromCart}
            updateQty={updateQty}
            clearCart={clearCart}
            restaurantId={selected ? selected._id : null}
          />
        </div>
      </div>
    </div>
  );
}
