import React, { useState, useRef, useEffect } from "react";

import './FoodGroupManager.css';

import { useFoodGroups } from "../contexts/FoodGroupContext";

import ItemDetailModal from "./ItemDetailModal";


export default function FoodGroupManager({ pantryItems, getExpiryStatus, setViewItem }) {

    /* ======= Food Group stuff ======= */

    const { foodGroups, addGroup, renameGroup, deleteGroup } = useFoodGroups();

    // State to hold the name of a new group being typed by the user
    const [newGroupName, setNewGroupName] = useState('');

    // State to keep track of which group is currently being edited (by index)
    // If null, no group is being edited
    const [editingIndex, setEditingIndex] = useState(null);

    // State to hold the new name value while editing a group
    const [editedName, setEditedName] = useState('');

    // Function to start editing a particular group
    // Sets the index of the group being edited and loads its current name into editedName
    const startEdit = (index) => {
        setEditingIndex(index);
        setEditedName(foodGroups[index]);
    };


    const saveEdit = () => {
        const oldName = foodGroups[editingIndex];
        renameGroup(oldName, editedName);
        setEditingIndex(null);
    };

    /* ======= Item View Modal stuff ======= */

    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openItemModal = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const closeItemModal = () => {
        setSelectedItem(null);
        setIsModalOpen(false);
    };

    const handleEditItem = (item) => {
        closeItemModal();
        // Optionally open your existing EditModal here
        
        console.log("Edit this item:", item);
    };


    return (
        <div className="group-manager">
            <h3> Edit Food Groups</h3>

            
            {foodGroups.map(group => {
                const itemsInGroup = pantryItems.filter(item => item.group === group);
                console.log(itemsInGroup);
                console.log(pantryItems);
                return (
                    <FoodGroup
                        key={group}
                        groupName={group}
                        items={itemsInGroup}
                        getExpiryStatus={getExpiryStatus}
                        openItemModal={openItemModal}
                        setViewItem={setViewItem}
                    />
                );
            })}


            {/* Input and button for adding a new food group */}
            <div className="add-group">
                <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="Add new group"
                />
                <button onClick={addGroup}>Add</button>
            </div>


            {/* {isModalOpen && selectedItem && (
                <ItemDetailModal
                    item={selectedItem}
                    onClose={closeItemModal}
                    onEdit={handleEditItem}
                />
            )} */}
        </div>
    );
}







function FoodGroup({ groupName, items, getExpiryStatus, openItemModal, setViewItem }) {
  const containerRef = useRef(null);
  const [layout, setLayout] = useState('grid'); // or 'list'

  useEffect(() => {
    const checkLayout = () => {
      if (!containerRef.current) return;

      const width = containerRef.current.offsetWidth;
      const estimatedItemWidth = 120; // adjust as needed
      const itemsPerRow = Math.floor(width / estimatedItemWidth);
      setLayout(itemsPerRow > 1 ? 'grid' : 'list');
    };

    checkLayout();
    window.addEventListener('resize', checkLayout);
    return () => window.removeEventListener('resize', checkLayout);
  }, []);

  return (
    <section className={`food-group ${layout}`} ref={containerRef}>
      <h3 className="group-title">{groupName}</h3>
      <div className="group-items">
        {items.map(item => (
          <div
            key={item.id}
            className={`group-item ${statusToCssClass(getExpiryStatus(item).status)}`}
            title={`Quantity: ${item.quantity}`}
            // onClick={() => openItemModal(item)}
            onClick={() => setViewItem(item)}
            // style={{ 
            //     borderLeft: `8px solid ${getExpiryStatus(item).color}`, 
            //     backgroundColor: `${getExpiryStatus(item).color}` 
            // }}
          >
            <span className="item-name">{item.name}</span>
            <span className="item-quantity">x{item.quantity}</span>
            {/* Space for icon if needed */}
          </div>
        ))}
      </div>
    </section>
  );
}


function statusToCssClass(status) {
  return status
    .replace(/([A-Z])/g, '-$1')  // insert dash before uppercase letters
    .toLowerCase();              // convert to lowercase
}