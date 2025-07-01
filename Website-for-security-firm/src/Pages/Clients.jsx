import ClientsCard from "../Components/HomeCards/ClientsCard"

const Clients = () => {
  return (
    <div className="container mx-auto text-center p-4">
      <div className="text-5xl font-semibold mb-5">Our Valued Clients</div>
      <div className="text-lg text-gray-700 mb-10">
        <p>We are proud to partner with a diverse range of clients across various industries, from banking and retail to corporate and construction. Each collaboration reflects our commitment to delivering reliable, professional, and tailored security services.

          Over the years, our clients have trusted us to safeguard their people, property, and operations—and we continue to exceed expectations with integrity, vigilance, and excellence.</p>
      </div>


      <ClientsCard />

    </div>
  )
}

export default Clients