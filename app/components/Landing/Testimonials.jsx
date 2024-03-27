import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

const Testimonials = () => {
    return (
        <div>
            <div className="container">
                <div className="testimonials-box">

                    {/*- TESTIMONIALS*/}
                    <div className="testimonial">
                        <h2 className="title">testimonial</h2>
                        <div className="testimonial-card">
                            <Image
                                src="/images/testimonial-1.png"
                                alt="mohitKukreja"
                                className="testimonial-banner"
                                width={80}
                                height={80}
                            />
                            <p className="testimonial-name">Mohit Kukreja</p>
                            <p className="testimonial-title">CEO &amp; Founder Invision</p>
                            <Image
                                src="/images/icons/quotes.svg"
                                alt="quotation"
                                className="quotation-img"
                                width={20}
                                height={20}
                            />
                            <p className="testimonial-desc">
                                Working with this team was an incredible experience. They delivered beyond our expectations, bringing creativity and precision to every aspect of our project. 
                            </p>
                        </div>
                    </div>

                    {/*- CTA*/}
                    <div className="cta-container">
                        <Image
                            src="/images/cta-banner.jpg"
                            alt="summer collection"
                            className="cta-banner"
                            width={0}
                            height={0}
                            sizes='100vw'
                        />
                        <a href="#" className="cta-content">
                            <p className="discount">25% Discount</p>
                            <h2 className="cta-title">Summer collection</h2>
                            <p className="cta-text">Starting @ ₹149</p>
                            <button className="cta-btn">Shop now</button>
                        </a>
                    </div>

                    {/* - SERVICE */}
                    <div className="service">
                        <h2 className="title">Our Services</h2>
                        <div className="service-container">
                            {/* <Link href="#" className="service-item">
                                <div className="service-icon">
                                    <ion-icon name="boat-outline" />
                                </div>
                                <div className="service-content">
                                    <h3 className="service-title">Worldwide Delivery</h3>
                                    <p className="service-desc">For Order Over $100</p>
                                </div>
                            </Link>
                            <Link href="#" className="service-item">
                                <div className="service-icon">
                                    <ion-icon name="rocket-outline" />
                                </div>
                                <div className="service-content">
                                    <h3 className="service-title">Next Day delivery</h3>
                                    <p className="service-desc">UK Orders Only</p>
                                </div>
                            </Link> */}
                            <Link href="#" className="service-item">
                                <div className="service-icon">
                                    <ion-icon name="call-outline" />
                                </div>
                                <div className="service-content">
                                    <h3 className="service-title">Best Online Support</h3>
                                    <p className="service-desc">Hours: 8AM - 11PM</p>
                                </div>
                            </Link>
                            <Link href="#" className="service-item">
                                <div className="service-icon">
                                    <ion-icon name="arrow-undo-outline" />
                                </div>
                                <div className="service-content">
                                    <h3 className="service-title">Return Policy</h3>
                                    <p className="service-desc">Easy &amp; Free Return</p>
                                </div>
                            </Link>
                            <Link href="#" className="service-item">
                                <div className="service-icon">
                                    <ion-icon name="ticket-outline" />
                                </div>
                                <div className="service-content">
                                    <h3 className="service-title">30% money back</h3>
                                    <p className="service-desc">For Order Over $100</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Testimonials