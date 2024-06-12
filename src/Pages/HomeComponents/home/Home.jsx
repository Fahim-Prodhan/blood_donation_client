import React from 'react';
import HeaderBanner from '../HeaderBanner/HeaderBanner';
import Featured from '../featured/Featured';
import ContactUs from '../contactUs/ContactUs';
import Footer from '../../../components/footer/Footer';
import { Helmet } from 'react-helmet';

const Home = () => {
    return (
        <div>
             <Helmet>
                <title>BloodBridge | Home</title>
            </Helmet>
            <HeaderBanner></HeaderBanner>
            <Featured></Featured>
            <ContactUs></ContactUs>
            <div className='mt-12'><Footer></Footer></div>
        </div>
    );
};

export default Home;