import React from 'react'

// Components for landing page
import Banner from './Landing/banner'
import Category from './Landing/Category'
import Testimonials from './Landing/Testimonials'
import Sidebar from './Landing/Sidebar'
import ProductMinimal from './Landing/ProductMinimal'
import ProductGrid from './Landing/ProductGrid'
import DealOfDay from './Landing/DealOfDay'

const Hero = () => {
    return (
        <>
            <main>
                
                {/* - BANNER */}
                <Banner />

                {/*- CATEGORY*/}
                <Category />

                {/* - PRODUCT*/}
                <div className="product-container">
                    <div className="container">

                        {/*- SIDEBAR*/}
                        <Sidebar />

                        <div className="product-box">
                            {/* - PRODUCT MINIMAL */}
                            <ProductMinimal />

                            {/* - PRODUCT FEATURED */}
                            <DealOfDay />

                            {/* - PRODUCT GRID */}
                            <ProductGrid />
                        </div>
                    </div>
                </div>

                {/*- TESTIMONIALS, CTA & SERVICE*/}
                <Testimonials />

            </main>
        </>
    )
}

export default Hero