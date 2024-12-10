import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
//Css
import '../public/styles/components/Inventory.css';

function Inventory() {
    return (
        <Container className="inventory-container" style={{ width: '500px' }}>
            {/* Armor and Off-hand Slots */}
            <Row className="top-row" xs={9}> {/* Use xs={9} here */}
                <Col xs={2} className='armor-slots-col'> {/* Adjust back to xs={2} */}
                    <Row xs={1} className="armor-slots">
                        <Col>{/* Helmet */}</Col>
                    </Row>
                    <Row xs={1} className="armor-slots">
                        <Col>{/* Chestplate */}</Col>
                    </Row>
                    <Row xs={1} className="armor-slots">
                        <Col>{/* Leggings */}</Col>
                    </Row>
                    <Row xs={1} className="armor-slots">
                        <Col>{/* Boots */}</Col>
                    </Row>
                </Col>
                {/* <Col xs={4} className="skin-slot"></Col>
                <Col xs={3} className="off-hand-col"> {/* Adjust to xs={3} *}
                    <Row xs={1} className="off-hand">
                        <Col>{/* Off-hand item *}</Col>
                    </Row>
                </Col> */}
            </Row>

            {/* Hotbar */}
            <Row className="hotbar" xs={9}>
                {Array.from({ length: 9 }).map((_, index) => (
                    <Col key={index} className="inventory-slot">
                        {/* Add item content here */}
                    </Col>
                ))}
            </Row>

            {/* Main Inventory */}
            {Array.from({ length: 3 }).map((_, rowIndex) => (
                <Row key={rowIndex} xs={9}>
                    {Array.from({ length: 9 }).map((_, colIndex) => (
                        <Col key={colIndex} className="inventory-slot">
                            {/* Add item content here */}
                        </Col>
                    ))}
                </Row>
            ))}
        </Container>
    );
}

export default Inventory;