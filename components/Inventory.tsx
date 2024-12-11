import React from 'react';
import { Container, Row, Col, Button, Image, OverlayTrigger, Tooltip, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDice, faGears, faClipboard } from '@fortawesome/free-solid-svg-icons';
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
                <div className="actions">
                    <div className="top-actions">
                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip>Toggle Command</Tooltip>}
                        >
                            <Button
                                variant="light"
                                className="win98-button action-button"
                            // onClick={props.toggleCommand}
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
                                // onClick={handleModal}
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
                        // onClick={props.onClick}
                        >
                            <FontAwesomeIcon icon={faDice} size="2x" />
                        </Button>
                    </OverlayTrigger>
                </div>
            </div>

            <Slots />
        </div>
    );
}

export default Inventory;