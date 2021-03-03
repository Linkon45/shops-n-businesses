import React from 'react'
import { Card } from 'react-bootstrap'
import {Link} from 'react-router-dom'

const Category = ({ category }) => {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/business/${category.name}`}>
                <Card.Img src={category.image} variant='top' />
            </Link>

            <Card.Body>
                <Link to={`/business/${category.name}`}>
                    <Card.Title as='div'>
                        <strong>
                           <p><b>{category.name}</b></p>
                        </strong>
                    </Card.Title>
                </Link>
            </Card.Body>

        </Card>
    )
}

export default Category
