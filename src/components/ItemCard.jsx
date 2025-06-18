import React from "react";


export default function ItemCard({ item, getExpiryStatus, removeItem, handleEdit }) {
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
}