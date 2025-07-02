import Banner from "../banner/Banner";
import BenefitsSection from "../benefitsSection/BenefitsSection";
import BrandMarquee from "../brandMarquee/BrandMarquee";
import SatisfactionBanner from "../satisfactionBanner/SatisfactionBanner";
import ServicesSection from "../servicesSection/ServicesSection";
import Faq from "../faq/Faq";


const Home = () => {
    return (
        <div>
            <Banner />
            <ServicesSection />
            <BrandMarquee />
            <BenefitsSection />
            <SatisfactionBanner />
            <Faq />
            
        </div>
    );
};

export default Home;