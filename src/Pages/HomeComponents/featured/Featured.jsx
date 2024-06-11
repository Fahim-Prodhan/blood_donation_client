import React from 'react';
import img1 from '../../../assets/images/Support.webp'
import img2 from '../../../assets/images/uOzJXun9SWqlo788MpA8tQ.webp'
import img3 from '../../../assets/images/-t-dXOaJSZyqWY554nt7Lw.webp'

const Featured = () => {
    return (
        <div className='max-w-sm px-6 md:max-w-3xl md:px-8 lg:max-w-7xl mx-auto lg:mt-12'>
            <h1 className='text-4xl text-center font-bold py-8 text-[#FF204E]'>Our Features</h1>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>
                <div className="card rounded-none glass">
                    <figure><img src={img1} alt="car!" /></figure>
                    <div className="mx-8 mb-8">
                        <h2 className="card-title py-4">Support Our Campaigns</h2>
                        <p>Highlight any ongoing fundraising campaigns or special initiatives. Provide details on how visitors can contribute, participate, or spread the word. Use engaging visuals and call-to-action buttons to drive participation.</p>           
                    </div>
                </div>

                <div className="card rounded-none glass">
                    <figure><img src={img2} alt="car!" /></figure>
                    <div className="mx-8 mb-8">
                        <h2 className="card-title py-4">Did You Know?</h2>
                        <p>Share interesting and important facts about blood donation. This could include statistics about blood needs, the impact of donations, and dispelling common myths about donating blood.</p>           
                    </div>
                </div>

                <div className="card rounded-none glass">
                    <figure><img src={img3} alt="car!" /></figure>
                    <div className="mx-8 mb-8">
                        <h2 className="card-title py-4">Success Stories</h2>
                        <p>Share interesting and important facts about blood donation. This could include statistics about blood needs, the impact of donations, and dispelling common myths about donating blood.</p>           
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;