import { useState } from "react";
import { Button, ButtonGroup, Col, Row, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { ShowModal } from "../modal/ShowModal";

export const CardsForLearnTable = ({ cards, setCards, setFlashMessage }) => {
  const [showModal, setShowModal] = useState(false);
  const [cardIdForDelete, setCardIdForDelete] = useState('');
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const { themeId } = useParams();


  return (

    <>
      {cards.filter(card => card.isItLearned === false).length === 0 ? (
        <h4 className="text-center">Nincs egyetlen megtanulandó kártyád sem.</h4>
      ) : (
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Szó</th>
              <th>Forditás</th>
              <th>Hozzáadva</th>
              <th>Lejárat</th>
              <th>Müveletek</th>
            </tr>
          </thead>
          <tbody>
            {cards
              .filter(card => card.isItLearned === false)
              .map((card, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{card.word}</td>
                  <td>{card.translate}</td>
                  <td>{new Date(card.createdAt).toLocaleDateString()}</td>
                  <td>{new Date(card.expiresIn).toLocaleDateString()}</td>
                  <td>
                    <ButtonGroup aria-label="Basic example">
                      <Link to={`/cards/update/${card._id}`}>
                        <Button style={{ marginRight: ".5rem" }} variant='outline-warning'>Szerkesztés</Button>
                      </Link>
                      <Button variant='outline-danger' style={{ marginLeft: ".5rem" }} onClick={() => {
                        handleShow();
                        setCardIdForDelete(card._id);
                      }}>
                        Törlés
                      </Button>

                      <ShowModal setFlashMessage={setFlashMessage} setCards={setCards} showModal={showModal} handleClose={handleClose} title={"Szó törlése"} body={"Biztosan törlöd ezt a szót?"} cardIdForDelete={cardIdForDelete} />
                    </ButtonGroup>
                  </td>

                </tr>
              ))}
          </tbody>
        </Table>
      )}
      <Row>
        <Col xs={12} className='text-center mt-5 mb-5'>
          <Link className="btn btn-primary" to={`/cards/new/${themeId}`}>
            Új kártya hozzáadása
          </Link>
        </Col>
      </Row>
    </>
  )
}