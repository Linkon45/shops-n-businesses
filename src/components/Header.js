import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { auth } from '../configs/firebase.config';
const Header = ({ user, isAdmin }) => {
    const history = useHistory();

    const handleSignOut = (e) => {
        e.preventDefault();
        auth.signOut();
        history.push('/');
    }
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>Business</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <>
                                {user && user != null && isAdmin !== 'loading' ?
                                    isAdmin === 'true' ?
                                        <LinkContainer to='/admin/userlist'>
                                            <Nav.Link>
                                                <i className="fas fa-user-cog fa-fw"></i>
                                                    Admin Panel
                                        </Nav.Link>
                                        </LinkContainer>
                                        :
                                        <LinkContainer to={`/businessdetails/${auth.currentUser.uid}`}>
                                            <Nav.Link>
                                                <i className="fas fa-user-edit fa-fw"></i>
                                                Edit Business
                                        </Nav.Link>
                                        </LinkContainer>

                                    : null
                                }
                                {user && user != null ?
                                    <>
                                        <Nav.Link to='/' onClick={(e) => handleSignOut(e)}>
                                            <i className="fas fa-user fa-fw"></i>
                                        Sign out
                                    </Nav.Link>
                                        {/* {user && user != null && isAdmin === true ?  
                                           <Nav.Link to='/admin/userlist'>
                                                <i className="fas fa-user"></i>
                                                Admin Panel
                                            </Nav.Link>   
                                            :  
                                            <Nav.Link to={`/businessdetails/:${auth.currentUser.uid}`}>
                                            <i className="fas fa-user"></i>
                                            Edit Business
                                            </Nav.Link>              
                                    } */}
                                    </>
                                    :
                                    <LinkContainer to='/login'>
                                        <Nav.Link >
                                            <i className="fas fa-user fa-fw"></i>
                                    Sign In
                                    </Nav.Link>
                                    </LinkContainer>
                                }

                            </>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header >
    )
}
const mapStateToProps = (state) => ({
    user: state.auth.currentUser,
    isAdmin: state.auth.isAdmin
})
export default connect(mapStateToProps)(Header);
