import parcelImg from '../../../assets/location-merchant.png'; 

const SatisfactionBanner = () => {
  return (
    <div className="relative bg-[#003B3B] text-white rounded-2xl overflow-hidden px-6 py-12 md:py-20 md:px-16 flex flex-col md:flex-row items-center justify-center gap-8 my-20">
      
      <div className="absolute top-0 left-0 w-full">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-28 md:h-32 lg:h-40 opacity-50"
          preserveAspectRatio="none"
        >
          <path
            fill="#00f9ff"
            fillOpacity="0.2"
            d="M0,64L60,96C120,128,240,192,360,186.7C480,181,600,107,720,85.3C840,64,960,96,1080,117.3C1200,139,1320,149,1380,154.7L1440,160V0H1380C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0H0Z"
          ></path>
        </svg>
      </div>

      <div className="flex-1 z-10">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          Merchant and Customer Satisfaction <br className="hidden md:block" />
          is Our First Priority
        </h2>
        <p className="text-sm md:text-base text-gray-300 mb-6 max-w-md">
          We offer the lowest delivery charge with the highest value along with
          100% safety of your product. Pathao courier delivers your parcels in
          every corner of Bangladesh right on time.
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="px-6 py-2 border border-[#D8F046] text-[#D8F046] font-semibold rounded-md hover:bg-[#D8F046] hover:text-black transition">
            Become a Merchant
          </button>
          <button className="px-6 py-2 border border-[#D8F046] text-[#D8F046] font-semibold rounded-md hover:bg-[#D8F046] hover:text-black transition">
            Earn with Profast Courier
          </button>
        </div>
      </div>
      <div className="flex-1 z-10">
        <img
          src={parcelImg}
          alt="parcel"
          className="w-full max-w-sm mx-auto object-contain"
        />
      </div>
    </div>
  );
};

export default SatisfactionBanner;
