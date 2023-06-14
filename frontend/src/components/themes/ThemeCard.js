import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import flash from '../../public/images/flash.png'
import { useNavigate } from 'react-router-dom';
import { CardForm } from '../cards/CardForm';



export function ThemeCard({ theme }) {
    const navigate = useNavigate();
  
    function navigateToCards() {
        navigate(`/cards/${theme._id}`);
    }

    return (
        <Col xs={12} md={6} lg={3} onClick={navigateToCards}
            style={{ background: `${theme.color}`, minHeight: "200px", cursor: "pointer" }}
            className="mt-1 text-center border text-light rounded rounded-lg p-4 d-flex align-items-center justify-content-center flex-column">
            <h5>{theme.title}</h5>
            <div className="mt-5">
                <img src={flash} style={{ height: "30px", width: "30px" }} alt="Flash" />
                <span><strong>{theme.cards.length}</strong></span>
            </div>
        </Col>
    )
}