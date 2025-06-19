import React, { useState } from "react";

import './FoodGroupManager.css';

import { useFoodGroups } from "../contexts/FoodGroupContext";



export default function FoodGroupManager() {
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

            <ul>
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
            </ul>

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