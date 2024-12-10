import React from 'react';
//Css
import '../public/styles/components/Inventory.css';

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

            <div className="main-inventory">
                {Array.from({ length: 3 }).map((_, rowIndex) => (
                    <div key={rowIndex} className="inventory-row">
                        {Array.from({ length: 9 }).map((_, colIndex) => (
                            <div key={colIndex} className="inventory-slot">
                                {/* Add item content here */}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className="hotbar">
                {Array.from({ length: 9 }).map((_, index) => (
                    <div key={index} className="inventory-slot">
                        {/* Add item content here */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Inventory;