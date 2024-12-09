import React from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import '../public/styles/components/MinecraftInventory.css'; // Import your CSS file
import { MinecraftItem } from '../types/Minecraft';

interface InventoryProps {
    seed: string;
    invItems?: MinecraftItem[];
}

function MinecraftInventory(props: InventoryProps) {
    console.log('MinecraftInventory invItems:', props.invItems);
    let itemCount = 0;
    const inventorySlots = 27; // Number of inventory slots
    const craftingSlots = 9; // Number of crafting slots
    const armorSlots = 4; // Number of armor slots
    const offhandSlot = 1; // Offhand slot

    const renderInventorySlots = (): JSX.Element[] => {
        const inventory_slots: JSX.Element[] = [];
        for (let i = 0; i < inventorySlots; i++) {
            pushToArr(inventory_slots, props, i, itemCount, 'inventory');
            itemCount++;
        }
        return inventory_slots;
    };

    const renderCraftingSlots = (): JSX.Element[] => {
        const crafting_slots: JSX.Element[] = [];
        for (let i = 0; i < craftingSlots; i++) {
            pushToArr(crafting_slots, props, i, itemCount, 'crafting');
            itemCount++;
        }
        return crafting_slots;
    };

    const renderArmorSlots = (): JSX.Element[] => {
        const slots: JSX.Element[] = [];
        for (let i = 0; i < armorSlots; i++) {
            slots.push(
                <Row key={`armor-slot-${i}`}>
                    <Col xs={12} className="armor-slot d-flex align-items-center justify-content-center"></Col>
                </Row>
            );
        }
        return slots;
    };


    const handleClick = async () => {
        console.log('Lets Roll');
    };

    return (
        <Container className="minecraft-inventory">
            <Row className="seed">
                <Col className='text-center'><span className='fw-bold'>Seed: </span> {props.seed}</Col>
            </Row>
            <hr />
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

function pushToArr(arr: JSX.Element[], props: InventoryProps, i: number, itemCount: number, type: string) {
    arr.push(
        <Col
            key={`${type}-slot-${i}`}
            xs={1}
            className={`${type}-slot d-flex align-items-center justify-content-center`}
            data-bs-placement="top"
            title={
                props.invItems && props.invItems[itemCount] ? props.invItems[itemCount].name : "Empty Slot"
            } // Dynamic title
        >
            {props.invItems && props.invItems[itemCount] && ( // Conditional rendering
                <Image
                    src={`/images/items/${props.invItems[itemCount].image}`}
                    alt={props.invItems[itemCount].name}
                    className="mc-image"
                />
            )}
        </Col>
    );
}

export default MinecraftInventory;