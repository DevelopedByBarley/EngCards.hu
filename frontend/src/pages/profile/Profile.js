import { Col, Row } from "react-bootstrap";
import userImage from '../../public/images/userImage.png';
import { MdProductionQuantityLimits } from 'react-icons/md';
import { TbCards } from 'react-icons/tb';
import { MdCloudDone } from 'react-icons/md'
export function Profile({ user }) {


  return (
    <>
      <Row>
        <Col xs={12} className="text-center mt-5">
          <img src={userImage} style={{ height: "76px", width: "76px" }} />
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="text-center mt-3">
          <h1>{user.userName}</h1>
          <p>{user.email}</p>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xs={12} sm={6} lg={3} className="d-flex align-items-center justify-content-center flex-column mt-2">
          <h6>Napi limit</h6>
          <h5> <span><MdProductionQuantityLimits size={25} /></span> {user.limit}</h5>
        </Col>
        <Col xs={12} sm={6} lg={3} className="d-flex align-items-center justify-content-center flex-column mt-2">
          <h6>Hozzáadott kártyák száma</h6>
          <h5> <span><TbCards size={25} /></span> {user.limit}</h5>
        </Col>
        <Col xs={12} sm={6} lg={3} className="d-flex align-items-center justify-content-center flex-column mt-2">
          <h6>Megtanult kártyák száma</h6>
          <h5> <span><MdCloudDone size={25} /></span> {user.limit}</h5>
        </Col>
      </Row>
    </>
  )
}