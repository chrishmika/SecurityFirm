import img1 from "../assets/services1.jpeg";

// import ServicesListCard from "../Components/HomeCards/ServicesListCard";
import ServicesListCard from "../Components/HomeCards/ServicesListCard";

const Services = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-5 bg-blue-600 text-white p-4 rounded-lg shadow-lg">
        <h1 className="text-5xl font-semibold">Our Services</h1>
      </div>
      <div className="text-center mb-6">
        <p className="text-3xl">
          Professional Manpower Security Services for Businesses, Events, and Properties
        </p>
      </div>

      <div className="flex flex-row mb-8">
        <div className="flex-1 p-4 text-center">
          <p className="text-gray-800">
            At [Your Company Name], we specialize in providing top-tier security manpower to protect
            what matters most. From static guarding and mobile patrols to VIP protection and event
            security, our trained professionals ensure safety, order, and peace of mind—24/7.
          </p>
        </div>
        <div>
          <img
            src={img1}
            alt="Security Service 1"
            className="w-full h-auto rounded-lg shadow-md mb-4"
          />
        </div>
      </div>

      <ServicesListCard />
    </div>
  );
};

export default Services;
