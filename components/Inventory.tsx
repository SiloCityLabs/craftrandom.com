import React from 'react';
//Css
import '../public/styles/components/Inventory.css';
//Components
import Slots from './Inventory/Slots';

function Inventory() {
    return (
        <div className="inventory-container">
            <div className="top-row">
                <div className="armor-slots-col">
                    <div className="armor-slots">{/* Helmet */}</div>
                    <div className="armor-slots">{/* Chestplate */}</div>
                    <div className="armor-slots">{/* Leggings */}</div>
                    <div className="armor-slots">{/* Boots */}</div>
                </div>
                <div className="skin-slot"></div>
                <div className="off-hand-col">
                    <div className="off-hand">{/* Off-hand item */}</div>
                </div>
            </div>

            <Slots />
        </div>
    );
}

export default Inventory;