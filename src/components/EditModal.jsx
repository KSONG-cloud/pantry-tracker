import React from 'react';
import './EditModal.css';


const EditModal = ({ item, isOpen, onClose, onSave, onChange }) => {
    if (!isOpen) return null;


    return (
        <div className='modal-overlay' onClick={onClose}>
            <div className='modal-content' onClick={e => e.stopPropagation()}>
                <h2>Edit Item</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSave();
                    }}
                >
                    <label>
                        Name:
                        <input
                            type='text'
                            value = {item.name}
                            onChange={(e) => onChange({...item, name: e.target.value })}
                        />
                    </label>
                    <label>
                        Quantity:
                        <input
                            type='number'
                            value = {item.quantity}
                            onChange={(e) => onChange({...item, quantity: e.target.value })}
                        />
                    </label>
                    <label>
                        Expiration Date:
                        <input
                            type='date'
                            value = {item.expirationDate || ''}
                            onChange={(e) => onChange({...item, expirationDate : e.target.value })}
                        />
                    </label>
                    <label>
                        Best Before Date:
                        <input
                            type='date'
                            value = {item.bestBeforeDate || ''}
                            onChange={(e) => onChange({...item, bestBeforeDate: e.target.value })}
                        />
                    </label>
                    <label>
                        Type:
                        <input
                            type='text' // But this might be a list!!!! TODO
                            value = {item.type || ''}
                            onChange={(e) => onChange({...item, type: e.target.value })}
                        />
                    </label>
                    <div className="modal-buttons">
                        <button type="button" onClick={onClose}>Cancel</button>
                        <button type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default EditModal;