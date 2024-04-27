import React from 'react'
import salad from '../assets/salad.png'
import pizza from '../assets/pizza.png'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
export default function LandingPage() {
    const navigate = useNavigate();
    const handleJoin = () => {
        navigate('./login')
    }
    return (
        <div className="LandingPage">
            <div className="top-con">
                <Logo fColor="white">
                </Logo>
            </div>


            <div className="rows row1">
                <div className="circle1"></div>
                <div className="innerRow">
                    <div className='Caption'>
                        <p className='maincap'> <span className="orange">Foodies, Gear up</span> </p>
                        <p className='cap'>Fuel Your Culinary <span className="orange">Curiosity!</span> </p>
                        <p className='cap'>Share Your Best Recipes, </p>
                        <p className='cap'>Connect with Food Lovers,</p>
                        <p className='cap'>and Let Your Kitchen <span className="orange">Creativity</span> Flourish.</p>
                        <button className="join-button" onClick={handleJoin}>Explore now </button>
                    </div>
                    <div className='foodImageBox'>
                        <img className='foodImage1' src={salad} alt="none" />
                    </div>
                </div>
            </div>

            <div className="rows row2">
                <div className="circle2">aaaa</div>
                <div className="innerRow innerRow2">
                    <div className='foodImageBox'>
                        <img className='foodImage2' src={pizza} alt="none" />
                    </div>
                    <div className='Caption'>
                        <p className='maincap'> <span className="orange">Time to roll!</span> </p>
                        <p className='cap white'>Join Us in Celebrating the <span className="orange">Art</span> of Cooking! </p>
                        <p className='cap white'> Explore New Culinary <span className="orange">Horizons,</span> </p>
                        <p className='cap white' > and Let's Cook Up a Storm!

                        </p>
                        <button className="join-button" onClick={handleJoin}>Log in </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
