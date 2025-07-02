import benefitsImg1 from '../../../assets/benefits/live-tracking.png'
import benefitsImg2 from '../../../assets/benefits/safe-delivery.png'
import benefitsImg3 from '../../../assets/benefits/tiny-deliveryman.png'
import BenefitCard from './BenefitCard';

const BenefitsSection = () => {
    const benefits = [
        {
            id: 1,
            img:benefitsImg1,
            title: "Live Parcel Tracking",
            description:
                "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment’s journey and get instant status updates for complete peace of mind.",
        },
        {
            id: 2,
            img: benefitsImg2,
            title: "100% Safe Delivery",
            description:
                "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
        },
        {
            id: 3,
            img: benefitsImg3,
            title: "24/7 Call Center Support",
            description:
                "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
        },
    ];



    return (
        <div className="my-20 px-4">
            <div >
                <h2 className="text-3xl font-bold font-serif text-center mb-6">Why Choose Us</h2>
                <div className="divider text-xl mb-10">Top Benefits</div>
                <div className="space-y-6">
                    {benefits.map((benefit) => (
                        <div key={benefit.id}>
                            <BenefitCard benefit={benefit} />
                            <div className="divider my-6"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BenefitsSection;