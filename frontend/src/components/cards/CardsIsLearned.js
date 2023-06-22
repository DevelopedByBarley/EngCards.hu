import { useState } from "react";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ShowModal } from "../modal/ShowModal";
import { fetchAuthentication } from "../../helpers/AuthService";

export const CardsIsLearned = ({ cards, setCards }) => {
  const [showModal, setShowModal] = useState(false);
  const [cardIdForDelete, setCardIdForDelete] = useState('');
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);


  function resetWord(event) {
    event.preventDefault();
    const id = event.target.dataset.id;

    fetchAuthentication
      .post(`/cards/reset/${id}`)
      .then((res) => {
        const updatedCard = res.data.updatedCard;
        const clonedCards = [...cards];
        const index = clonedCards.findIndex((card) => card._id === updatedCard._id);
        if (index !== -1) {
          clonedCards[index].state = updatedCard.state;
        }

        clonedCards[index] = updatedCard;
      

        setCards(clonedCards);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (

    <>
      {cards.filter(card => card.isItLearned === true).length === 0 ? (
        <h4 className="text-center">Nincs egyetlen megtanult kártyád sem.</h4>
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
              .filter(card => card.isItLearned === true)
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
                        <Button style={{ marginRight: ".5rem" }} variant='outline-warning' className='rounded-0'>Szerkesztés</Button>
                      </Link>
                      <Button variant='outline-danger' style={{ marginLeft: ".5rem" }} className='rounded-0' onClick={() => {
                        handleShow();
                        setCardIdForDelete(card._id);
                      }}>
                        Törlés
                      </Button>
                      <Button variant='outline-primary' style={{ marginLeft: ".5rem" }} className='rounded-0' onClick={resetWord} data-id={card._id}>
                        Visszaállitás
                      </Button>

                      <ShowModal setCards={setCards} showModal={showModal} handleClose={handleClose} title={"Szó törlése"} body={"Biztosan törlöd ezt a szót?"} cardIdForDelete={cardIdForDelete} />
                    </ButtonGroup>
                  </td>

                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>

  )
}