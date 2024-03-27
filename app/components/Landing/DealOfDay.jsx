"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'


// custom hooks
import useGetDealOfDay from '../../hooks/products/getDealOfDay';

const DealOfDay = () => {
    const [time, setTime] = useState({ hours: 23, minutes: 59, seconds: 59 })
    const [refetch, setRefetch] = useState(false)
    const [dataFetched, setDataFetched] = useState(false)

    const router = useRouter()

    // dummy data
    const dealsOfTheDay = [
        {
            productName: "Shampoo, Conditioner & Facewash Packs",
            description: "Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor dolor sit amet consectetur Lorem ipsum dolor",
            price: "150.00",
            discount: "13",
            countdown: {
                hours: 23,
                minutes: 59,
                seconds: 59
            },
            image: [{
                url: "/images/products/shampoo.jpg",
            }]
        },
        {
            productName: "Rose Gold Diamonds Earring",
            description: "Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor dolor sit amet consectetur Lorem ipsum dolor",
            price: "1990.00",
            discount: "6",
            countdown: {
                hours: 23,
                minutes: 59,
                seconds: 59
            },
            image: [{
                url: "/images/products/jewellery-1.jpg",
            }]
        }
    ];

    // hook for getting products
    const { loading, getProducts } = useGetDealOfDay()

    const [products, setProducts] = useState(dealsOfTheDay);

    // fetch data using hook when component is loaded
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProducts();
                if (data[0]) {
                    setProducts(data[1].concat(dealsOfTheDay))

                    let secondsFetched = data[2];

                    // Calculate seconds
                    let secondConverted = secondsFetched % 60;
                    // console.log(secondConverted, "secondConverted");

                    // Reduce secondsFetched to minutes
                    secondsFetched = Math.floor(secondsFetched / 60);

                    // Calculate minutes
                    let minutesConverted = secondsFetched % 60;
                    // console.log(minutesConverted, "minutesConverted");

                    // Reduce secondsFetched to hours
                    secondsFetched = Math.floor(secondsFetched / 60);

                    // Calculate hours
                    let hoursConverted = secondsFetched % 24;
                    // console.log(hoursConverted, "hoursConverted");

                    // Update state with the converted values
                    setTime({ hours: hoursConverted, minutes: minutesConverted, seconds: secondConverted });
                    setDataFetched(true);
                }
            } catch (e) {
                console.error('Error fetching products:', e);
            }
        }
        fetchData();

    }, [refetch])

    useEffect(() => {
        const interval = dataFetched && setInterval(() => {
            setTime(prevTimeLeft => {
                let updatedHours = prevTimeLeft.hours;
                let updatedMinutes = prevTimeLeft.minutes;
                let updatedSeconds = prevTimeLeft.seconds;

                if (updatedSeconds > 0) {
                    updatedSeconds -= 1;
                } else {
                    updatedSeconds = 59;
                    if (updatedMinutes > 0) {
                        updatedMinutes -= 1;
                    } else {
                        updatedMinutes = 59;
                        if (updatedHours > 0) {
                            updatedHours -= 1;
                        }
                    }
                }

                // If time has elapsed, call handleRefetch
                if (updatedHours === 0 && updatedMinutes === 0 && updatedSeconds === 0) {
                    handleRefetch();
                }

                return { hours: updatedHours, minutes: updatedMinutes, seconds: updatedSeconds };
            });
        }, 1000);

        return () => {
            // console.log("unmounting")
            clearInterval(interval);
        }
    }, [dataFetched])

    const handleRefetch = () => {
        setRefetch(!refetch)
        setDataFetched(false)
    }


    return (
        <div className="product-featured">
            <h2 className="title">Deal of the day</h2>
            <div className="showcase-wrapper has-scrollbar">
                {
                    [0, 1].map((i) => (
                        <div key={i} className="showcase-container">
                            <div className="showcase">
                                <Link href={`/product/${products[i]._id}`} className="showcase-banner">
                                    <img
                                        src={products[i].image[0]?.url || dealsOfTheDay[i].image[0].url}
                                        alt={products[i].productName}
                                        className="showcase-img"
                                    />
                                </Link>
                                <div className="text-center showcase-content">
                                    <Link href={`/product/${products._id}`}>
                                        <h3 className="showcase-title">
                                            {products[i].productName}
                                        </h3>
                                    </Link>
                                    <p className="showcase-desc">
                                        {products[i].description}
                                    </p>
                                    <div className="justify-center price-box">
                                        <p className="price">₹{products[i].price - Math.round((Number(products[i].discount) * Number(products[i].price) / 100))}</p>
                                        <del> ₹{products[i].price}</del>
                                    </div>
                                    <button onClick={()=>{
                                        router.push(`/product/${products[i]._id}`)
                                    }} className="mx-auto add-cart-btn">View Product</button>
                                    <div className="countdown-box">
                                        <p className="countdown-desc">Hurry Up! Offer ends in:</p>
                                        <div className="justify-center countdown">
                                            <div className="countdown-content">
                                                <p className="display-number">{time.hours ?? 23}</p>
                                                <p className="display-text">Hours</p>
                                            </div>
                                            <div className="countdown-content">
                                                <p className="display-number">{time.minutes ?? 59}</p>
                                                <p className="display-text">Min</p>
                                            </div>
                                            <div className="countdown-content">
                                                {/* writing as time.seconds || 59 causes issue */}
                                                {/* as time.seconds when is 0 it would show 59 */}
                                                <p className="display-number">{time.seconds ?? 59}</p>
                                                <p className="display-text">Sec</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default DealOfDay