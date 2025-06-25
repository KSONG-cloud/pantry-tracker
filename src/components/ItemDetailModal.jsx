import React from 'react';
import ReactDOM from 'react-dom';
import { FaEdit, FaTimes } from 'react-icons/fa';

import './ItemDetailModal.css';


export default function ItemDetailModal({ item, onClose, onEdit}) {
    if (!item) return null;

    return ReactDOM.createPortal(
        <div className='item-detail-modal-overlay' onClick={onClose}>
            <div className='item-detail-modal-content' onClick={(e) => e.stopPropagation()}>
                <div className='item-detail-modal-header'>
                    <h2>{item.name}</h2>
                    <button onClick={() => onEdit(item)} className='edit-icon' title='Edit'>
                        <FaEdit />
                    </button>
                </div>


                <div className='item-detail-modal-body'>
                    <p><strong>Quantity:</strong> {item.quantity} {item.unit}</p>
                    <p><strong>Expiration:</strong> {item.expirationDate || 'N/A'}</p>
                    <p><strong>Best Before:</strong> {item.bestBeforeDate || 'N/A'}</p>
                    <p><strong>Group:</strong> {item.group || 'None'}</p>
                    <p><strong>Types:</strong> {(item.types || []).join(', ')}</p>
                    {/* Add freshness color indicator if needed */}

                </div>

                <div className="item-detail-modal-footer">
                    <button onClick={onClose} className="close-btn"><FaTimes /></button>
                </div>
            </div>
        </div>,
        document.getElementById('modal-root') // 👈 This is where it's rendered
    );
}