import React from "react";

let services = [
  {
    title: "Service 1",
    description: "details 1",
  },
  {
    title: "Service 1",
    description: "details 1",
  },
  {
    title: "Service 1",
    description: "details 1",
  },
  {
    title: "Service 1",
    description: "details 1",
  },
  {
    title: "Service 1",
    description: "details 1",
  },
  {
    title: "Service 1",
    description: "details 1",
  },
];

const Services = () => {
  return (
    <div className="container mx-auto p-4">
      <div>
        <h1>Our Services</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {services.map((service, index) => {
          return (
            <div className="bg-blue-100 shadow-lg rounded-lg p-6 text-center" key={index}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
