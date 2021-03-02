import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Category from '../components/Category'
import { connect } from 'react-redux'
const HomeScreen = ({categories}) => {
    return (
        <>
            <h1>Categories</h1>
            <Row>
                {categories.map((category) => {
                        return (
                        <Col key={category.uid} sm={12} md={6} lg={4} xl={3}>
                            <Category category={category} />
                        </Col>
                        )
                    })}
            </Row>

        </>
    )
}

const mapStateToProps = (state)=>({
    categories: state.categories.categories,
})
export default connect(mapStateToProps)(HomeScreen);
