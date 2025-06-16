import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {
  // This is where we wiil store the pantry items
  const [pantryItems, setPantryItems] = useState([
    { id: 1, name: 'Milk', quantity: 1, unit: 'gallon', expirationDate: '2025-12-25' },
    { id: 2, name: 'Bread', quantity: 1, unit: 'loaf', expirationDate: '2025-12-20' },
    { id: 3, name: 'Eggs', quantity: 12, unit: 'pieces', expirationDate: '2025-12-30' }
  ])



  // Function to add a new item
  const addItem = (item) => {
    const newItem = {
      id: Date.now(),
      ...item
    };
    setPantryItems([...pantryItems, newItem]);
  }



  // Function to remove an item
  const removeItem = (id) => {
    setPantryItems(pantryItems.filter(item => item.id !== id));
  }


  // Function to check if item is expiring soon (within 3 days)
  const isExpiringSoon = (expirationDate) => {
    const today = new Date();
    const expiry = new Date(expirationDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0 ;
  }


  return (
    <div className='App'>
      <header className='App-header'>
        <h1>My Pantry Tracker</h1>
        <p>Keep track of your food items and never waste food again!</p>
      </header>



      <main className='main-content'>
        <section className='pantry-section'>
          <h2>Your Pantry Items</h2>
          {pantryItems.length === 0 ? (
            <p>Your pantry is empty! Add some items below.</p>
          ) : (
            <div className='items-grid'>
              {pantryItems.map(item => (
                <div
                  key={item.id} 
                  className={`item-card ${isExpiringSoon(item.expirationDate) ? 'expiring-soon' : ''}`}
                >
                  <h3>{item.name}</h3>
                  <p>Quantity: {item.quantity} {item.unit}</p>
                  <p>Expires: {item.expirationDate}</p>
                  {isExpiringSoon(item.expirationDate) && (
                    <div className='alert'>Expiring soon!</div>
                  )}
                  <button 
                    onClick={() => removeItem(item.id)}
                    className='remove-btn'
                  >Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className='add-item-section'>
          <h2>Add New Items</h2>
          <AddItemForm onAddItem={addItem} />
        </section>
      </main>
    </div>
  )






// Simple form component to add items
function AddItemForm({ onAddItem }) {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    unit: 'pieces',
    expirationDate: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.name && formData.quantity && formData.expirationDate) {
      onAddItem({
        name: formData.name,
        quantity: parseInt(formData.quantity),
        unit: formData.unit,
        expirationDate: formData.expirationDate
      });

      // Reset form
      setFormData({
        name: '',
        quantity: '',
        unit: 'pieces',
        expirationDate: ''
      });
    }
  };


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  return (
    <form onSubmit={handleSubmit} className="add-item-form">
      <div className="form-group">
        <label htmlFor="name">Item Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., Milk, Bread, Apples"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          min="1"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="unit">Unit:</label>
        <select
          id="unit"
          name="unit"
          value={formData.unit}
          onChange={handleChange}
        >
          <option value="pieces">pieces</option>
          <option value="lbs">lbs</option>
          <option value="oz">oz</option>
          <option value="cups">cups</option>
          <option value="gallons">gallons</option>
          <option value="bottles">bottles</option>
          <option value="cans">cans</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="expirationDate">Expiration Date:</label>
        <input
          type="date"
          id="expirationDate"
          name="expirationDate"
          value={formData.expirationDate}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="add-btn">
        Add to Pantry
      </button>
    </form>
  );

}























}

export default App
