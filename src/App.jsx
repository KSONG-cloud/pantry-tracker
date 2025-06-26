import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// import './App.css'

import EditModal from './components/EditModal';
import ItemCard from './components/ItemCard';
import AddItemForm from './components/AddItemForm';
import SortControl from './components/SortControl';
import FoodGroupManager from './components/FoodGroupManager';
import ItemDetailModal from './components/ItemDetailModal';

// The pages
import RecipeRecommendations from './pages/RecipeRecommendations';
import PantryPage from './pages/PantryPage';

function App() {
  // // This is where we wiil store the pantry items
  // const [pantryItems, setPantryItems] = useState([
  //   { id: 1, name: 'Milk', quantity: 1, unit: 'gallon', expirationDate: '2025-12-25', 
  //     bestBeforeDate: '2025-06-25' , addedDate: '2025-06-14', group: 'Dairy & Eggs'},
  //   { id: 2, name: 'Bread', quantity: 1, unit: 'loaf', expirationDate: '2025-06-18' , 
  //     bestBeforeDate: '2025-05-25'  , addedDate: '2025-06-14', group: 'Baked Goods'},
  //   { id: 3, name: 'Eggs', quantity: 12, unit: 'pieces', expirationDate: '2025-06-05' , 
  //     bestBeforeDate: '2025-05-20' , addedDate: '2025-06-14', group: 'Dairy & Eggs'},
  //   { id: 4, name: 'Eggs', quantity: 12, unit: 'pieces', expirationDate: '2025-08-05' , 
  //     bestBeforeDate: '2025-05-20' , addedDate: '2025-06-14', group: 'Dairy & Eggs'},
  //   { id: 5, name: 'Chicken', quantity: 12, unit: 'pieces',  addedDate: '2025-06-09' ,
  //     group: 'Meat & Seafood'
  //   },
  //   { id: 6, name: 'Chicken', quantity: 12, unit: 'pieces',  addedDate: '2025-06-02' ,
  //     group: 'Meat & Seafood'
  //   },
  //   { id: 7, name: 'Chicken', quantity: 12, unit: 'pieces',  addedDate: '2025-05-28' ,
  //     group: 'Meat & Seafood'
  //   },
  //   { id: 8, name: 'Chicken', quantity: 12, unit: 'pieces',  addedDate: '2025-05-21' ,
  //     group: 'Meat & Seafood'
  //   },
  //   { id: 9, name: 'Chicken', quantity: 12, unit: 'pieces',  addedDate: '2025-05-02' ,
  //     group: 'Meat & Seafood'
  //   },
  // ])


  // // Sorting of pantry items
  // const [sortOption, setSortOption] = useState('urgency');
  // const [sortOrder, setSortOrder] = useState('asc');

  // // For editing pantry items
  // const [editingItem, setEditingItem] = useState(null);
  // const [isModalOpen, setModalOpen] = useState(false);

  // // For ItemViewModal
  // const [viewItem, setViewItem] = useState(null);


  // // Function to add a new item
  // const addItem = (item) => {
  //   const newItem = {
  //     id: Date.now(),
  //     ...item
  //   };
  //   setPantryItems([...pantryItems, newItem]);
  // }



  // // Function to remove an item
  // const removeItem = (id) => {
  //   setPantryItems(pantryItems.filter(item => item.id !== id));
  // }


  // // Function that returns expiry status of foods
  // const getExpiryStatus = (item) => {
  //   const today = new Date();

  //   const useBy = item.expirationDate ? new Date(item.expirationDate) : null;
  //   const bestBefore = item.bestBeforeDate ? new Date(item.bestBeforeDate) : null;
  //   const addedDate = item.addedDate ? new Date(item.addedDate) : null;

  //   if (useBy) {
  //     const diffDays = Math.ceil((useBy - today) / (1000 * 60 * 60 * 24));
  //     if (diffDays < 0) return { status: 'expired', urgency: 5 };
  //     if (diffDays <= 3) return { status: 'expiringSoon', urgency: 4 };
  //   }
    

  //   if (bestBefore) {
  //     const diffDays = Math.ceil((bestBefore - today) / (1000 * 60 * 60 * 24));
  //     if (diffDays < 0) return { status: 'pastBestBefore', urgency: 3 };
  //     if (diffDays <= 3) return { status: 'nearBestBefore', urgency: 2 };
  //   }


  //   if (addedDate) {
  //     const diffDays = Math.ceil((today - addedDate) / (1000 * 60 * 60 * 24));
  //     if (diffDays > 30) return { status: 'old_1m', label: 'Added over a month ago', urgency: 4 };
  //     if (diffDays > 21) return { status: 'old_3w', label: 'Added over three weeks ago', urgency: 3 };
  //     if (diffDays > 14) return { status: 'old_2w', label: 'Added over two weeks ago', urgency: 2 };
  //     if (diffDays > 7) return { status: 'old_1w', label: 'Added over a week ago', urgency: 1 };
  //   }

  //   return { status: 'fresh', urgency: 0 }; // fallback

  // }

  // const getSortedItems = () => {
  //   const items = [...pantryItems];
  //   let order = 1;
  //   if (sortOrder == 'desc') {
  //     order = -1;
  //   }


  //   if (sortOption === 'urgency') {
  //     items.sort((a, b) => order * (getExpiryStatus(b).urgency - getExpiryStatus(a).urgency));
  //   } else if (sortOption === 'type') {
  //     items.sort((a, b) => {
  //       if (sortOrder == 'asc') {
  //         return a.name.localeCompare(b.name);
  //       } else {
  //         return b.name.localeCompare(a.name);
  //       }      
  //     }); // or a.type.localeCompare(b.type)
  //   } else if (sortOption === 'addedDate') {
  //     items.sort((a, b) => order * (new Date(b.addedDate) - new Date(a.addedDate))); // newest first
  //   }

  //   return items;
  // }


  // const openEditModal = (item) => {
  //   setEditingItem(item);
  //   setModalOpen(true);
  // }

  // const closeEditModal = () => {
  //   setModalOpen(false);
  //   setEditingItem(null);
  // }

  // const handleItemChange = (updatedItem) => {
  //   setEditingItem(updatedItem);
  // }

  // const saveItemChanges = () => {
  //   setPantryItems((prev) => 
  //     prev.map((item) => (item.id === editingItem.id ? editingItem : item))
  //   );
  //   setViewItem(editingItem);
  //   closeEditModal();
  // }

  // const handleEdit = (item) => {
  //   // Open an edit form/modal with item details
  //   setViewItem(null);
  //   openEditModal(item);
  // };





  // return (
  //   <div className='App'>
  //     <header className='App-header'>
  //       <h1>My Pantry Tracker</h1>
  //       <p>Keep track of your food items and never waste food again!</p>
  //     </header>



  //     <main className='main-content'>
  //       <section className='pantry-section'>
  //         <h2>Your Pantry Items</h2>

  //         <SortControl 
  //           sortOption={sortOption} 
  //           setSortOption={setSortOption} 
  //           sortOrder={sortOrder} 
  //           setSortOrder={setSortOrder}
  //         />

  //         <FoodGroupManager 
  //           pantryItems={pantryItems}
  //           setPantryItems={setPantryItems}
  //           getExpiryStatus={getExpiryStatus}
  //           setViewItem={setViewItem}
  //         />


  //         {pantryItems.length === 0 ? (
  //           <p>Your pantry is empty! Add some items below.</p>
  //         ) : (
  //           <div className='items-grid'>
  //             {getSortedItems().map(item => (
  //               <ItemCard
  //                 key={item.id}
  //                 item={item}
  //                 getExpiryStatus={getExpiryStatus}
  //                 removeItem={removeItem}
  //                 handleEdit={handleEdit}
  //               />
  //             ))}

  //           </div>
  //         )}
  //       </section>

  //       <section className='add-item-section'>
  //         <h2>Add New Items</h2>
  //         <AddItemForm 
  //           onAddItem={addItem} 
  //         />
  //       </section>
  //     </main>

  //     { /* For EditModal */ }
  //     {isModalOpen && (
  //       <EditModal
  //         item={editingItem}
  //         isOpen={isModalOpen}
  //         onClose={closeEditModal}
  //         onSave={saveItemChanges}
  //         onChange={handleItemChange}
  //       />
  //     )}

  //     { /* For ItemViewModal */ }
  //     {viewItem && (
  //       <ItemDetailModal 
  //         item={viewItem}
  //         onClose={() => setViewItem(null)}
  //         onEdit={handleEdit}
  //       />
  //     )}

  //   </div>
  // );
  return (
    <Router>
      <div className='app'>
        <nav className='navbar'>
          <Link to={"/"}>Pantry</Link>
          <Link to={"/recipes"}>Recipes</Link>
        </nav>

        <Routes>
          <Route path='/' element={<PantryPage />} />
          <Route path='/recipes' element={<RecipeRecommendations />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
