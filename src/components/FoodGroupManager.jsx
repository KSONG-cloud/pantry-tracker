import React, { useState, useRef, useEffect } from "react";

import './FoodGroupManager.css';

import { useFoodGroups } from "../contexts/FoodGroupContext";



export default function FoodGroupManager({ pantryItems, getExpiryStatus }) {
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


    


    return (
        <div className="group-manager">
            <h3> Edit Food Groups</h3>

            {/* <ul>
                {foodGroups. map((group, index) => (
                    <li key={index}>
                        {editingIndex === index ? (
                            <>
                                <input 
                                    value={editedName}
                                    onChange={(e) => setEditedName(e.target.value)}
                                />
                                <button onClick={saveEdit}>Save</button>
                                <button onClick={() => setEditingIndex(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <span>{group}</span>
                                <button onClick={() => startEdit(index)}>Rename</button>
                                <button onClick={() => deleteGroup(index)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul> */}
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
        </div>
    );
}




// function FoodGroup({ groupName, items, getExpiryStatus }) {
//   return (
//     <section className="food-group">
//       <h3 className="group-title">{groupName}</h3>
//       <div className="items-container">
//         {items.map(item => {
//           const freshness = getExpiryStatus(item);
//           return (
//             <div key={item.id} className="item-card">
//               <span 
//                 className="freshness-indicator" 
//                 style={{ backgroundColor: freshness.color }} 
//                 title={freshness.label}
//               />
//               <span className="item-name">{item.name}</span>
//               <span className="item-quantity">{item.quantity}</span>
//               {/* Placeholder for future icons */}
//               <span className="item-icons" />
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }


function FoodGroup({ groupName, items, getExpiryStatus }) {
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
            className="group-item"
            title={`Quantity: ${item.quantity}`}
            style={{ borderLeft: `8px solid ${getExpiryStatus(item).color}` }}
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