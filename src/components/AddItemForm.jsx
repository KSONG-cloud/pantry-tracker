import { useState } from 'react'
import React from 'react';
import CreatableSelect from 'react-select/creatable';


const unitOptions = [
  { value: 'g', label: 'g' },
  { value: 'kg', label: 'kg' },
  { value: 'lbs', label: 'lbs' },
  { value: 'oz', label: 'oz' },
  { value: 'pieces', label: 'pieces' },
  { value: 'slices', label: 'slices' },
  { value: 'ml', label: 'ml (millilitre)' },
  { value: 'l', label: 'l (litre)' },
  { value: 'cups', label: 'cups' },
  { value: 'gallons', label: 'gallons' },
  { value: 'bottles', label: 'bottles' },
  { value: 'cans', label: 'cans' },
];


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



function InputField({ label, id, name, type = 'text', value, onChange, placeholder, required = false, optional = false, min}) {
    return (
        <div className="form-group">
            <label htmlFor={id}>
                {label} {optional && <span className='optional'>(optional)</span>}:
            </label>
            <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            min={min}
            />
        </div>
    );
}


function SelectField({ label, value, onChange, options }) {
    return (
        <div className="form-group">
        <label>{label}</label>
        <CreatableSelect
            isClearable
            options={options}
            value={value ? { value, label: value } : null}
            onChange={(option) => onChange(option ? option.value : '')}
        />
        </div>
    );
}




function ItemForm({ formData, handleChange, handleSubmit}) {
    return (
        <form onSubmit={handleSubmit} className="add-item-form">
            <InputField 
                label="Item Name"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Milk, Bread, Apples"
                required
            />
            
            <InputField 
                label="Quantity"
                id="quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                min="1"
                required
            />

            <SelectField 
                label="Unit"
                value={formData.unit}
                onChange={(newUnit) => handleChange({ target: { name: 'unit', value: newUnit } })}
                options={unitOptions}
            />


            <InputField
                label="Expiration Date"
                id="expirationDate"
                name="expirationDate"
                type="date"
                value={formData.expirationDate}
                onChange={handleChange}
                optional
            />
            
            <InputField
                label="Best Before Date"
                id="bestBeforeDate"
                name="bestBeforeDate"
                type="date"
                value={formData.bestBeforeDate}
                onChange={handleChange}
                optional
            />
            
            <button type="submit" className="add-btn">
                Add to Pantry
            </button>
        </form>
    );
}

// Simple form component to add items
export default function AddItemForm({ onAddItem }) {
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
            types: getItemTypes(formData.name),
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
    <ItemForm 
      formData={formData} 
      handleChange={handleChange} 
      handleSubmit={handleSubmit}
    />
  );

}