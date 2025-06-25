import { createContext, useContext, useState } from 'react';

const PantryContext = createContext();


export function PantryProvider({ children }) {
    const [pantryItems, setPantryItems] = useState([
        { id: 1, name: 'Milk', quantity: 1, unit: 'gallon', expirationDate: '2025-12-25', 
        bestBeforeDate: '2025-06-25' , addedDate: '2025-06-14', group: 'Dairy & Eggs'},
        { id: 2, name: 'Bread', quantity: 1, unit: 'loaf', expirationDate: '2025-06-18' , 
        bestBeforeDate: '2025-05-25'  , addedDate: '2025-06-14', group: 'Baked Goods'},
        { id: 3, name: 'Eggs', quantity: 12, unit: 'pieces', expirationDate: '2025-06-05' , 
        bestBeforeDate: '2025-05-20' , addedDate: '2025-06-14', group: 'Dairy & Eggs'},
        { id: 4, name: 'Eggs', quantity: 12, unit: 'pieces', expirationDate: '2025-08-05' , 
        bestBeforeDate: '2025-05-20' , addedDate: '2025-06-14', group: 'Dairy & Eggs'},
        { id: 5, name: 'Chicken', quantity: 12, unit: 'pieces',  addedDate: '2025-06-09' ,
        group: 'Meat & Seafood'
        },
        { id: 6, name: 'Chicken', quantity: 12, unit: 'pieces',  addedDate: '2025-06-02' ,
        group: 'Meat & Seafood'
        },
        { id: 7, name: 'Chicken', quantity: 12, unit: 'pieces',  addedDate: '2025-05-28' ,
        group: 'Meat & Seafood'
        },
        { id: 8, name: 'Chicken', quantity: 12, unit: 'pieces',  addedDate: '2025-05-21' ,
        group: 'Meat & Seafood'
        },
        { id: 9, name: 'Chicken', quantity: 12, unit: 'pieces',  addedDate: '2025-05-02' ,
        group: 'Meat & Seafood'
        },
    ]);

    return (
        <PantryContext.Provider value={{ pantryItems, setPantryItems }}>
            {children}
        </PantryContext.Provider>
    );
}


export function usePantry() {
    return useContext(PantryContext);
}