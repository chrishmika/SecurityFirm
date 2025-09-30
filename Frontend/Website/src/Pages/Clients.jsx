import ClientsCard from "../Components/HomeCards/ClientsCard";

const Clients = () => {
  return (
    <div className="container mx-auto p-4">
      {/* Page Header */}
      <div className="text-center mb-8 bg-blue-600 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold">Our Valued Clients</h1>
        <p className="text-lg md:text-xl mt-2">Trusted Partnerships Across Industries</p>
      </div>

      {/* Intro Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <p className="text-gray-700 leading-relaxed text-lg">
          We are proud to partner with a diverse range of clients across industries including
          banking, retail, corporate, and construction. Each collaboration reflects our commitment
          to delivering reliable, professional, and tailored security services.
        </p>
        <p className="text-gray-700 leading-relaxed text-lg mt-4">
          Over the years, our clients have trusted us to safeguard their people, property, and
          operations — and we continue to exceed expectations with integrity, vigilance, and
          excellence.
        </p>
      </div>

      {/* Clients List */}
      <ClientsCard />
    </div>
  );
};

export default Clients;
