import React from 'react';
import HeaderBanner from '../HeaderBanner/HeaderBanner';
import Featured from '../featured/Featured';
import ContactUs from '../contactUs/ContactUs';

const Home = () => {
    return (
        <div>
            <HeaderBanner></HeaderBanner>
            <Featured></Featured>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;