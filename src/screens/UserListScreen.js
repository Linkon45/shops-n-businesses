import React,{ useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteBusiness } from '../redux/firestore/businesses/businesses.actions'


const UserListScreen = ({isAdmin, businesses}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const deleteHandler = (business) => {
        console.log(business);
        dispatch(deleteBusiness(business))
    }
    useEffect(() => {
        console.log(businesses);
    }, [businesses])

    useEffect(() => {
        if(isAdmin === 'false')history.push('/');
    }, [isAdmin,history])
    return (
        <>
            <Row className='align-items-center'>
                <Col className='text-right'>
                    <LinkContainer to={`/admin/user/addbusiness`}>
                        <Button className='my-3'>
                            <i className='fas fa-plus'></i> Create Business
          </Button>
                    </LinkContainer>
                </Col>
                <Col className='text-left'>
                    <LinkContainer to={`/admin/user/addcategory`}>
                        <Button className='my-3'>
                            <i className='fas fa-plus'></i> Create Category
          </Button>
                    </LinkContainer>
                </Col>
            </Row>


            <h1>Users</h1>
            <Table striped bordered hover responsive className='table-sm text-right'>
                <thead>
                    <tr>
                        <th>Business Name</th>
                        <th>Email</th>
                        <th>Approval Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {businesses.map((business) => (
                        <tr key={business.uid}>
                            <td>{business.name}</td>
                            <td>
                                <a href={`mailto:${business.email}`}>{business.email}</a>
                            </td>
                            <td>
                                {business.isApproved ? (
                                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                                ) : (
                                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                                    )}
                            </td>
                            <td>
                                <LinkContainer to={`/admin/user/${business.uid}/edit`}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>
                                <Button
                                    variant='danger'
                                    className='btn-sm'
                                    onClick={() => deleteHandler(business)}
                                >
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}
const mapStateToProps = (state) => ({
    isAdmin: state.auth.isAdmin,
    businesses: state.businesses.businesses
})
export default connect(mapStateToProps)(UserListScreen);
