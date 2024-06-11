import React from 'react';
import HeaderBanner from '../HeaderBanner/HeaderBanner';
import Featured from '../featured/Featured';
import ContactUs from '../contactUs/ContactUs';
import Footer from '../../../components/footer/Footer';

const Home = () => {
    return (
        <div>
            <HeaderBanner></HeaderBanner>
            <Featured></Featured>
            <ContactUs></ContactUs>
            <div className='mt-12'><Footer></Footer></div>

        </div>
    );
};

export default Home;