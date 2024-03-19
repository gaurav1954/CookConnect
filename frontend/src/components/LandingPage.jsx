import React from 'react'
import salad from '../assets/salad.png'
import pizza from '../assets/pizza.png'
import './LandingPage.css'
export default function LandingPage() {
    return (
        <div className="LandingPage">
            <div className="rows">
                <div className="circle1"></div>
                <div className="innerRow">
                    <div className='Caption'>
                        <p className='cap'>Fuel Your Culinary <span className="orange">Curiosity!</span> </p>
                        <p className='cap'>Share Your Best Recipes, </p>
                        <p className='cap'>Connect with Food Lovers,</p>
                        <p className='cap'>and Let Your Kitchen <span className="orange">Creativity</span> Flourish.
                        </p>
                    </div>

                    <div className='foodImageBox'>
                        <img className='foodImage1' src={salad} alt="none" />
                    </div>
                </div>
            </div>
            <div className="rows">
                <div className="circle2">aaaa</div>

                <div className="innerRow">
                    <div className='foodImageBox'>
                        <img className='foodImage2' src={pizza} alt="none" />
                    </div>
                    <div className='Caption'>
                        <p className='cap'>Join Us in Celebrating the <span className="orange">Art</span> of Cooking! </p>
                        <p className='cap'> Explore New Culinary <span className="orange">Horizons,</span> </p>
                        <p className='cap'> and Let's Cook Up a Storm!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
