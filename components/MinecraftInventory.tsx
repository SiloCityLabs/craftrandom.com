import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import '../public/styles/components/MinecraftInventory.css'; // Import your CSS file

function MinecraftInventory() {
    const inventorySlots = 27; // Number of inventory slots
    const craftingSlots = 9; // Number of crafting slots
    const armorSlots = 4; // Number of armor slots
    const offhandSlot = 1; // Offhand slot

    const renderInventorySlots = (): JSX.Element[] => {
        const slots: JSX.Element[] = [];
        for (let i = 0; i < inventorySlots; i++) {
            slots.push(
                <Col key={`inventory-slot-${i}`} xs={1} className="inventory-slot"></Col>
            );
        }
        return slots;
    };

    const renderCraftingSlots = (): JSX.Element[] => {
        const slots: JSX.Element[] = [];
        for (let i = 0; i < craftingSlots; i++) {
            slots.push(
                <Col key={`crafting-slot-${i}`} xs={1} className="crafting-slot"></Col>
            );
        }
        return slots;
    };

    const renderArmorSlots = (): JSX.Element[] => {
        const slots: JSX.Element[] = [];
        for (let i = 0; i < armorSlots; i++) {
            slots.push(
                <Row key={`armor-slot-${i}`}><Col xs={12} className="crafting-slot"></Col></Row>
            );
        }
        return slots;
    };


    const handleClick = async () => {
        console.log('Lets Roll');
    };

    return (
        <Container className="minecraft-inventory">
            <Row className="armor-and-offhand">
                <Col xs={1} className="armor-slots">
                    {renderArmorSlots()}
                </Col>

                <Col xs={4} className="player-skin">
                </Col>
                <Col xs={1} className="offhand-slot mt-auto"></Col>
                <Col xs={5} className="d-flex align-items-center">
                    <Button
                        variant="light" // Use a light variant as a base
                        className="win98-button w-100"
                        onClick={handleClick}
                        size="lg"
                    >
                        <FontAwesomeIcon icon={faDice} size="2x" />
                    </Button>
                </Col>
            </Row>
            <Row className="inventory-grid">
                {renderInventorySlots()}
            </Row>
            <Row className="crafting-grid">
                {renderCraftingSlots()}
            </Row>
        </Container>
    );
}

export default MinecraftInventory;