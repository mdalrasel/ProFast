import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import ProFastLogo from './ProFastLogo';

const Footer = () => {
    return (
        <footer className="footer footer-horizontal footer-center  bg-neutral text-neutral-content p-10">
            <aside>
                <ProFastLogo />
                <p className="">
                   Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
                </p>
                <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
            </aside>
            
            <ul className='flex gap:-5 md:gap-10 lg:gap-14 link no-underline '>
                <li>Service</li>
                <li>Coverage</li>
                <li>About Us</li>
                <li>Pricing</li>
                <li>Blog</li>
                <li>Contact</li>
            </ul>
            <nav>
                <div className="grid grid-flow-col gap-4 ">
                    <FaTwitter size={30}/>
                    <FaFacebook size={30}/>
                    <FaInstagram size={30}/>
                </div>
            </nav>
        </footer>
    );
};

export default Footer;