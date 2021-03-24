import React from 'react'
import Container from "../../components/Container/Container"
import ProductDetails from "../../pages/ProductDetails/ProductDetails"

function Layout(){
    return(
        <div>
            <Container maxWidth={'lg'}>
                <ProductDetails/>
            </Container>
        </div>
    )
}
export default Layout