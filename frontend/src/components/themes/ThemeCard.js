import Col from 'react-bootstrap/Col';
import flash from '../../public/images/flash.png';
import { Link } from 'react-router-dom';

export function ThemeCard({ theme }) {

    return (
        <Col
            xs={12}
            md={6}
            lg={3}
            style={{ background: `${theme.color}`, minHeight: "200px", cursor: "pointer" }}
            className="mt-1 text-center border text-light rounded rounded-lg  d-flex align-items-center justify-content-center flex-column"
        >
            <Link className='w-100' to={`${theme.cards.length !== 0 ? '/cards/' + theme._id : '/cards/new/' + theme._id}`} style={{textDecoration: "none"}}>
                <div
                    className='p-5 text-light'
                    style={{ height: "100%", width: "100%" }}

                >
                    <h5>{theme.title}</h5>
                    <div className="mt-5">
                        <img src={flash} style={{ height: "30px", width: "30px" }} alt="Flash" />
                        <span><strong>{theme.cards.length}</strong></span>
                    </div>
                </div>
            </Link>
        </Col>
    );

}
