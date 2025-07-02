import { FaShippingFast, FaTruck, FaBoxes, FaMoneyBillWave, FaBuilding, FaUndo } from "react-icons/fa";

const services = [
    {
        title: "Express & Standard Delivery",
        icon: <FaShippingFast size={40} />,
        description: "We deliver parcels within 24–72 hours in Dhaka, Chattogram, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    },
    {
        title: "Nationwide Delivery",
        icon: <FaTruck size={40} />,
        description: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
        highlight: true, // <-- this will change hover color
    },
    {
        title: "Fulfillment Solution",
        icon: <FaBoxes size={40} />,
        description: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    },
    {
        title: "Cash on Home Delivery",
        icon: <FaMoneyBillWave size={40} />,
        description: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    },
    {
        title: "Corporate Service / Contract In Logistics",
        icon: <FaBuilding size={40} />,
        description: "Customized corporate services which includes warehouse and inventory management support.",
    },
    {
        title: "Parcel Return",
        icon: <FaUndo size={40} />,
        description: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    },
];

const ServicesSection = () => {
    return (
        <div className="bg-[#0d3c3f] py-16 px-6 rounded-3xl text-white my-20 cursor-pointer">
            <h2 className="text-3xl font-bold font-serif text-center mb-2">Our Services</h2>
            <p className="text-center mb-10 text-gray-300 max-w-2xl mx-auto">
                Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
                {services.map((service, idx) => (
                    <div
                        key={idx}
                        className="rounded-xl p-6 text-center bg-white text-gray-800 transition duration-300 hover:shadow-xl hover:bg-lime-200 "
                    >
                        <div className="mb-4  flex justify-center">{service.icon}</div>
                        <h3 className="text-lg font-semibold mb-2 font-serif">{service.title}</h3>
                        <p className="text-sm text-gray-600">{service.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServicesSection;
