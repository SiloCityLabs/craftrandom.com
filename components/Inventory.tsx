import React, { useState } from 'react';
import { Container, Row, Col, Button, Image, OverlayTrigger, Tooltip, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDice, faGears, faClipboard } from '@fortawesome/free-solid-svg-icons';
//Css
import '../public/styles/components/Inventory.css';
//Types
import { MinecraftItem, MinecraftSettings } from '../types/Minecraft';
//Components
import Slots from './Inventory/Slots';
import CustomModal from './bootstrap/CustomModal';
//Helpers
import { setLocalStorage } from '../helpers/setLocalStorage';

interface InventoryProps {
    seed: string;
    onClick: () => void;
    toggleCommand: () => void;
    settings: MinecraftSettings;
    invItems: MinecraftItem[];
}

function Inventory(props: InventoryProps) {
    //Settings
    const [showModal, setShowModal] = useState(false);
    const handleModal = () => setShowModal(!showModal);
    const handleSave = () => {
        props.settings.rangeValue = rangeValue;
        setLocalStorage('craftRandomSettings', props.settings);
        handleModal();
    };
    //Range
    const [rangeValue, setRangeValue] = useState(props.settings.rangeValue); // Initial value

    const handleRangeChange = (event) => {
        setRangeValue(parseInt(event.target.value, 10));
    };

    return (
        <div className="inventory-container">
            <div id='worldSeed' className='text-center'>
                <span className='fw-bold'>Seed: </span> {props.seed}
            </div>
            <hr />
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
                <div className="actions">
                    <div className="top-actions">
                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip>Toggle Command</Tooltip>}
                        >
                            <Button
                                variant="light"
                                className="win98-button action-button"
                                onClick={props.toggleCommand}
                            >
                                <FontAwesomeIcon icon={faClipboard} size="2x" />
                            </Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip>Settings</Tooltip>}
                        >
                            <Button
                                variant="light"
                                className="win98-button action-button"
                                onClick={handleModal}
                                size="sm"
                            >
                                <FontAwesomeIcon icon={faGears} size="2x" />
                            </Button>
                        </OverlayTrigger>
                    </div>
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>ReRoll Loadout</Tooltip>}
                    >
                        <Button
                            id='rollBtn'
                            variant="light"
                            className="win98-button action-button"
                            onClick={props.onClick}
                        >
                            <FontAwesomeIcon icon={faDice} size="2x" />
                        </Button>
                    </OverlayTrigger>
                </div>
            </div>
            <Slots items={props.invItems} />
            <CustomModal
                show={showModal}
                onClose={handleModal}
                onSave={handleSave} // Pass the handleSave function
                title="Settings"
            >
                <Row>
                    <Col>
                        <Form.Label htmlFor="my-range">Inventory Range ({rangeValue})</Form.Label>
                        <Form.Range
                            id="my-range"
                            min={0} // Set minimum value
                            max={36} // Set maximum value
                            value={rangeValue}
                            onChange={handleRangeChange}
                        />
                    </Col>
                </Row>
            </CustomModal>
        </div>
    );
}

export default Inventory;