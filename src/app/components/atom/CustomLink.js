import React from 'react';
import Nav from 'react-bootstrap/Nav'

const CustomLink = props => {

    const { eventKey, label, onSelect, activeKey } = props
/** 
onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}  
*/
    return (
        <>
            <Nav
                activeKey={activeKey}
                onSelect={onSelect}
            >

                <Nav.Item>
                    <Nav.Link eventKey={eventKey}>{label}</Nav.Link>
                </Nav.Item>

            </Nav>
        </>
    )
}

export default CustomLink