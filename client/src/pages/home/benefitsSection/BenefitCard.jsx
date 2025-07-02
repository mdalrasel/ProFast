const BenefitCard = ({ benefit }) => {
    const { img, title, description } = benefit;

    return (
        <div className="flex flex-col md:flex-row items-center gap-4 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <img
                src={img}
                alt={title}
                className="w-40 object-contain"
            />
            <div
                className="border-dashed border-gray-300 my-4 w-full h-0.5 md:w-0.5 md:h-40 md:my-0
             border-t-2 md:border-t-0 md:border-l-2"
            ></div>

            <div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
                <p className="text-gray-600">{description}</p>
            </div>
        </div>
    );
};

export default BenefitCard;