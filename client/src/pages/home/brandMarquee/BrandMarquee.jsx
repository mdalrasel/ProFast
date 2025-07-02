import Marquee from "react-fast-marquee";
import brand1 from '../../../assets/brands/amazon.png';
import brand2 from '../../../assets/brands/amazon_vector.png';
import brand3 from '../../../assets/brands/casio.png';
import brand4 from '../../../assets/brands/moonstar.png';
import brand5 from '../../../assets/brands/randstad.png';
import brand6 from '../../../assets/brands/start-people 1.png';
import brand7 from '../../../assets/brands/start.png';

const brands = [brand1, brand2, brand3, brand4, brand5, brand6, brand7];

const BrandMarquee = () => {
    return (
        <div className=" my-20">
            <p className="text-3xl font-semibold mb-10 font-serif text-center">We've helped thousands of sales teams</p>
            <Marquee
                direction="left"
                speed={40}
                gradient={false}
            >
                {brands.map((brand, index) => (
                    <img
                        key={index}
                        src={brand}
                        className="h-10 mx-10"
                    />
                ))}
            </Marquee>
        </div>
    );
};

export default BrandMarquee;