import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup } from 'react-bootstrap'
import Business from '../components/Business'
import { connect } from 'react-redux'
const BusinessScreen = ({ match, categories, businesses }) => {
    const [business, setBusiness] = useState(undefined);
    const [category, setCategory] = useState(undefined);
    useEffect(() => {
        setBusiness(businesses.filter((p) => p.category === match.params.category));
        setCategory( categories.find((p) => p.name === match.params.category));
    }, [setBusiness, setCategory, businesses, categories, match]);
    if(category===undefined)return 'loading';
    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
          </Link>
            <Row>
                <Col md={6}>
                    <Image src={category?.image} alt={category.name} fluid />
                </Col>
                <Col md={6}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{category.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p>{category.description}</p>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>

            <h1 className="my-3">Business</h1>
            {
                business.length === 0 ? <p>Businesses are coming</p> :
                    <Row>
                        {business.map((busi) => {
                            if (busi.isApproved === false) return null;
                            return (<Col key={busi.uid} sm={12} md={6} lg={4} xl={3}>
                                <Business busi={busi} />
                            </Col>)
                        })}
                    </Row>
            }

        </>
    )
}
const mapStateToProps = (state) => ({
    categories: state.categories.categories,
    businesses: state.businesses.businesses
})
export default connect(mapStateToProps)(BusinessScreen);
