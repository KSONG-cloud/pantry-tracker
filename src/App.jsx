import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import EditModal from './components/EditModal';

function App() {
  // This is where we wiil store the pantry items
  const [pantryItems, setPantryItems] = useState([
    { id: 1, name: 'Milk', quantity: 1, unit: 'gallon', expirationDate: '2025-12-25', bestBeforeDate: '2025-06-25' , addedDate: '2025-06-14'},
    { id: 2, name: 'Bread', quantity: 1, unit: 'loaf', expirationDate: '2025-06-18' , bestBeforeDate: '2025-05-25'  , addedDate: '2025-06-14'},
    { id: 3, name: 'Eggs', quantity: 12, unit: 'pieces', expirationDate: '2025-06-05' , bestBeforeDate: '2025-05-20' , addedDate: '2025-06-14' },
    { id: 4, name: 'Eggs', quantity: 12, unit: 'pieces', expirationDate: '2025-08-05' , bestBeforeDate: '2025-05-20' , addedDate: '2025-06-14' },
    { id: 5, name: 'Chicken', quantity: 12, unit: 'pieces',  addedDate: '2025-06-09' },
    { id: 6, name: 'Chicken', quantity: 12, unit: 'pieces',  addedDate: '2025-06-02' },
    { id: 7, name: 'Chicken', quantity: 12, unit: 'pieces',  addedDate: '2025-05-28' },
    { id: 8, name: 'Chicken', quantity: 12, unit: 'pieces',  addedDate: '2025-05-21' },
    { id: 9, name: 'Chicken', quantity: 12, unit: 'pieces',  addedDate: '2025-05-02' },
  ])


  // Sorting of pantry items
  const [sortOption, setSortOption] = useState('urgency');
  const [sortOrder, setSortOrder] = useState('asc');

  // For editing pantry items
  const [editingItem, setEditingItem] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  // Type map
  const typeMap = {
    // Dairy
    milk: ['Dairy'],
    cheese: ['Dairy'],
    yogurt: ['Dairy'],
    butter: ['Dairy'],
    cream: ['Dairy'],
    'cream cheese': ['Dairy'],
    kefir: ['Dairy'],
    'sour cream': ['Dairy'],

    // Protein
    beef: ['Protein'],
    pork: ['Protein'],
    lamb: ['Protein'],
    tofu: ['Protein', 'Vegetarian'],
    tempeh: ['Protein', 'Vegetarian'],
    beans: ['Protein', 'Vegetarian'],
    lentils: ['Protein', 'Vegetarian'],
    chickpeas: ['Protein', 'Vegetarian'],
    'black beans': ['Protein', 'Vegetarian'],
    'kidney beans': ['Protein', 'Vegetarian'],
    seitan: ['Protein', 'Vegetarian'],

    // Seafood
    fish: ['Seafood'],
    salmon: ['Seafood'],
    tuna: ['Seafood'],
    shrimp: ['Seafood'],
    prawn: ['Seafood'],
    crab: ['Seafood'],
    lobster: ['Seafood'],
    scallops: ['Seafood'],
    mussels: ['Seafood'],
    clams: ['Seafood'],

    // Poultry
    chicken: ['Poultry'],
    turkey: ['Poultry'],
    duck: ['Poultry'],
    goose: ['Poultry'],

    // Vegetables
    carrot: ['Vegetable'],
    broccoli: ['Vegetable'],
    spinach: ['Vegetable'],
    kale: ['Vegetable'],
    lettuce: ['Vegetable'],
    cucumber: ['Vegetable'],
    tomato: ['Vegetable', 'Fruit'], // Botanically fruit, culinarily vegetable
    onion: ['Vegetable'],
    garlic: ['Vegetable'],
    pepper: ['Vegetable', 'Fruit'],
    potato: ['Vegetable'],
    pumpkin: ['Vegetable', 'Fruit'],
    zucchini: ['Vegetable', 'Fruit'],
    celery: ['Vegetable'],
    cauliflower: ['Vegetable'],
    corn: ['Vegetable', 'Grain'],

    // Fruits
    apple: ['Fruit'],
    banana: ['Fruit'],
    orange: ['Fruit'],
    lemon: ['Fruit'],
    lime: ['Fruit'],
    strawberry: ['Fruit'],
    blueberry: ['Fruit'],
    raspberry: ['Fruit'],
    grape: ['Fruit'],
    watermelon: ['Fruit'],
    mango: ['Fruit'],
    peach: ['Fruit'],
    pear: ['Fruit'],
    pineapple: ['Fruit'],
    kiwi: ['Fruit'],
    cherry: ['Fruit'],

    // Grains & Cereals
    rice: ['Grain'],
    wheat: ['Grain'],
    oats: ['Grain'],
    barley: ['Grain'],
    quinoa: ['Grain'],
    cornmeal: ['Grain'],
    flour: ['Grain'],
    pasta: ['Grain'],
    bread: ['Grain'],
    cereal: ['Grain'],

    // Nuts & Seeds
    almond: ['Nut'],
    walnut: ['Nut'],
    cashew: ['Nut'],
    peanut: ['Nut'],
    pistachio: ['Nut'],
    sunflower: ['Seed'],
    pumpkinseed: ['Seed'],
    flaxseed: ['Seed'],

    // Condiments & Others
    honey: ['Condiment'],
    sugar: ['Condiment'],
    salt: ['Condiment'],
    peppercorn: ['Condiment'],
    vinegar: ['Condiment'],
    oil: ['Condiment'],
    oliveoil: ['Condiment'],
    'soy sauce': ['Condiment'],
    mustard: ['Condiment'],
    ketchup: ['Condiment'],

    // Beverages
    coffee: ['Beverage'],
    tea: ['Beverage'],
    juice: ['Beverage'],
    soda: ['Beverage'],

    // Misc / Other
    chocolate: ['Snack'],
    biscuit: ['Snack'],
    cookie: ['Snack'],
    cracker: ['Snack'],

    // Herbs & Spices
    basil: ['Herb'],
    oregano: ['Herb'],
    thyme: ['Herb'],
    rosemary: ['Herb'],
    parsley: ['Herb'],
    cinnamon: ['Spice'],
    nutmeg: ['Spice'],
    cumin: ['Spice'],
  };



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


  // Function that returns expiry status of foods
  const getExpiryStatus = (item) => {
    const today = new Date();

    const useBy = item.expirationDate ? new Date(item.expirationDate) : null;
    const bestBefore = item.bestBeforeDate ? new Date(item.bestBeforeDate) : null;
    const addedDate = item.addedDate ? new Date(item.addedDate) : null;

    if (useBy) {
      const diffDays = Math.ceil((useBy - today) / (1000 * 60 * 60 * 24));
      if (diffDays < 0) return { status: 'expired', urgency: 5 };
      if (diffDays <= 3) return { status: 'expiringSoon', urgency: 4 };
    }
    

    if (bestBefore) {
      const diffDays = Math.ceil((bestBefore - today) / (1000 * 60 * 60 * 24));
      if (diffDays < 0) return { status: 'pastBestBefore', urgency: 3 };
      if (diffDays <= 3) return { status: 'nearBestBefore', urgency: 2 };
    }


    if (addedDate) {
      const diffDays = Math.ceil((today - addedDate) / (1000 * 60 * 60 * 24));
      if (diffDays > 30) return { status: 'old_1m', label: 'Added over a month ago', urgency: 4 };
      if (diffDays > 21) return { status: 'old_3w', label: 'Added over three weeks ago', urgency: 3 };
      if (diffDays > 14) return { status: 'old_2w', label: 'Added over two weeks ago', urgency: 2 };
      if (diffDays > 7) return { status: 'old_1w', label: 'Added over a week ago', urgency: 1 };
    }

    return { status: 'fresh', urgency: 0 }; // fallback

  }

  const getSortedItems = () => {
    const items = [...pantryItems];
    let order = 1;
    if (sortOrder == 'desc') {
      order = -1;
    }


    if (sortOption === 'urgency') {
      items.sort((a, b) => order * (getExpiryStatus(b).urgency - getExpiryStatus(a).urgency));
    } else if (sortOption === 'type') {
      items.sort((a, b) => {
        if (sortOrder == 'asc') {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }      
      }); // or a.type.localeCompare(b.type)
    } else if (sortOption === 'addedDate') {
      items.sort((a, b) => order * (new Date(b.addedDate) - new Date(a.addedDate))); // newest first
    }

    return items;
  }

  
  function getItemTypes(name) {
    const lowerName = name.toLowerCase();
    const types = new Set();
    for (let keyword in typeMap) {
      if (lowerName.includes(keyword)) {
        typeMap[keyword].forEach(t => types.add(t));
      }
    }
    return types.size > 0 ? Array.from(types) : ['Other'];
  }



  const openEditModal = (item) => {
    setEditingItem(item);
    setModalOpen(true);
  }

  const closeEditModal = () => {
    setModalOpen(false);
    setEditingItem(null);
  }

  const handleItemChange = (updatedItem) => {
    setEditingItem(updatedItem);
  }

  const saveItemChanges = () => {
    setPantryItems((prev) => 
      prev.map((item) => (item.id === editingItem.id ? editingItem : item))
    );
    closeEditModal();
  }

  const handleEdit = (item) => {
    // Open an edit form/modal with item details
    openEditModal(item);
  };





  return (
    <div className='App'>
      <header className='App-header'>
        <h1>My Pantry Tracker</h1>
        <p>Keep track of your food items and never waste food again!</p>
      </header>



      <main className='main-content'>
        <section className='pantry-section'>
          <h2>Your Pantry Items</h2>



          <div className='sort-container'>
            <div className='sort-section'>
              <label htmlFor='sort'>Sort by: </label>
              <select 
                id='sort' 
                value={sortOption} 
                onChange={(e) => setSortOption(e.target.value)}
                className='sort-select'
              >
                <option value="urgency">Urgency</option>
                <option value="type">Type</option>
                <option value="addedDate">Time Added</option>
              </select>
              <div className="sort-toggle" onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}>
                <span className={`arrow-up ${sortOrder === 'asc' ? 'active' : 'inactive'}`}>▲</span>
                <span className={`arrow-down ${sortOrder === 'desc' ? 'active' : 'inactive'}`}>▼</span>
              </div>
            </div>
          </div>
          
          

          {pantryItems.length === 0 ? (
            <p>Your pantry is empty! Add some items below.</p>
          ) : (
            <div className='items-grid'>
              {getSortedItems().map(item => {
                // Get status and optional label from your updated getExpiryStatus function
                const status = getExpiryStatus(item);

                // Map status to alert class and display text
                const statusMap = {
                  expired: { className: 'expired-alert', text: 'Expired' },
                  expiringSoon: { className: 'expiring-alert', text: 'Expiring soon' },
                  pastBestBefore: { className: 'bestbefore-alert', text: 'Past Best Before' },
                  nearBestBefore: { className: 'bestbefore-alert', text: 'Near Best Before' },
                  fresh: { className: 'fresh-alert', text: 'Fresh' },
                  old_1m: { className: 'warn-alert', text: status.label },      // e.g. "Added more than one month ago."
                  old_3w: { className: 'warn-alert', text: status.label },   // e.g. "Added more than three weeks ago."
                  old_2w: { className: 'mild-alert', text: status.label },   // e.g. "Added more than two weeks ago."
                  old_1w: { className: 'info-alert', text: status.label },      // e.g. "Added more than one week ago."
                };

                // Get CSS classes for the card container based on status
                const cardClass = [
                  'item-card',
                  status.status === 'expired' ? 'expired' : '',
                  status.status === 'expiringSoon' ? 'expiring-soon' : '',
                  status.status === 'pastBestBefore' ? 'past-best-before' : '',
                  status.status === 'nearBestBefore' ? 'near-best-before' : '',
                  status.status === 'fresh' ? 'fresh' : '',
                  status.status === 'old_1w' ? 'old_1w' : '',
                  status.status === 'old_2w' ? 'old_2w' : '',
                  status.status === 'old_3w' ? 'old_3w' : '',
                  status.status === 'old_1m' ? 'old_1m' : '',
                ].join(' ').trim();

                return (
                  <div key={item.id} className={cardClass}>
                    <button 
                      className="edit-btn" 
                      onClick={() => handleEdit(item)}
                      title='Edit Item'
                    >
                      ✏️
                    </button>
                    <h3>{item.name}</h3>
                    <p>Quantity: {item.quantity} {item.unit}</p>

                    {item.expirationDate ? (
                      <p>Expires: {item.expirationDate}</p>
                    ) : item.bestBeforeDate ? (
                      <p>Best Before: {item.bestBeforeDate}</p>
                    ) : (
                      <p>Added on: {item.addedDate}</p>
                    )}

                    {statusMap[status.status] && (
                      <div className={`alert ${statusMap[status.status].className}`}>
                        {statusMap[status.status].text}
                      </div>
                    )}
                    <div className='remove-btn-wrapper'>
                      <button onClick={() => removeItem(item.id)} className='remove-btn'>
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}

            </div>
          )}
        </section>

        <section className='add-item-section'>
          <h2>Add New Items</h2>
          <AddItemForm onAddItem={addItem} />
        </section>
      </main>


      {isModalOpen && (
        <EditModal
          item={editingItem}
          isOpen={isModalOpen}
          onClose={closeEditModal}
          onSave={saveItemChanges}
          onChange={handleItemChange}
        />
      )}
    </div>
  )






// Simple form component to add items
function AddItemForm({ onAddItem }) {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    unit: 'pieces',
    expirationDate: '',
    bestBeforeDate: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.name && formData.quantity) {
      onAddItem({
        name: formData.name,
        quantity: parseInt(formData.quantity),
        unit: formData.unit,
        expirationDate: formData.expirationDate || null,
        bestBeforeDate: formData.bestBeforeDate || null,
        addedDate: new Date().toISOString().split('T')[0],  // Store as YYYY-MM-DD
        types: getItemTypes(name),
      });

      // Reset form
      setFormData({
        name: '',
        quantity: '',
        unit: 'pieces',
        expirationDate: '',
        bestBeforeDate: ''
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
          
          <option value="g">g</option>
          <option value="kg">kg</option>
          <option value="lbs">lbs</option>
          <option value="oz">oz</option>
          <option value="pieces">pieces</option>
          <option value="slices">slices</option>
          <option value="ml">ml (millilitre)</option>
          <option value="l">l (litre)</option>
          <option value="cups">cups</option>
          <option value="gallons">gallons</option>
          <option value="bottles">bottles</option>
          <option value="cans">cans</option>
          
          
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="expirationDate">Expiration Date <span className="optional">(optional)</span>:</label>
        <input
          type="date"
          id="expirationDate"
          name="expirationDate"
          value={formData.expirationDate}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="bestBeforeDate">Best Before Date <span className="optional">(optional)</span>:</label>
        <input
          type="date"
          id="bestBeforeDate"
          name="bestBeforeDate"
          value={formData.bestBeforeDate}
          onChange={handleChange}
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
