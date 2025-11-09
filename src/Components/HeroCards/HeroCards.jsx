import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";

const HeroCards = ({ limit, showSeeAllButton }) => {
    const services = useLoaderData() || [];
    const displayedServices = limit ? services.slice(0, limit) : services;

    const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
      }, []);
    
      if (loading) return <LoadingSpinner />;
    
    

    return (
        <div className="bg-gradient-to-b from-blue-50 to-white py-16 px-6" id="services">


            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 justify-center">
                {displayedServices.map((service) => (
                    <div
                        key={service.serviceId}
                        className="bg-white rounded-2xl shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 border border-gray-100"
                    >
                        <img
                            src={service.image}
                            alt={service.serviceName}
                            className="h-48 w-full object-cover rounded-t-2xl"
                        />
                        <div className="p-5">
                            <div className="flex items-center justify-between mb-2">
                                <span className="bg-blue-100 text-blue-700 px-3 py-1 text-xs font-semibold rounded-full">
                                    {service.category}
                                </span>
                                <div className="flex items-center text-yellow-500">
                                    <FaStar className="mr-1" />
                                    <span className="text-gray-700 font-semibold">{service.rating}</span>
                                </div>
                            </div>

                            <h3 className="text-lg font-bold text-gray-800 mb-1">
                                {service.serviceName}
                            </h3>

                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                {service.description}
                            </p>

                            <div className="flex items-center justify-between mt-4">
                                <span className="text-blue-700 font-semibold text-lg">
                                    ${service.price}
                                </span>

                                <Link
                                    to={`/services/${service.serviceId}`}
                                    className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
                                >
                                    View Details
                                </Link>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {showSeeAllButton && (
                <div className="text-center mt-10">
                    <a
                        href="/services"
                        className="bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:from-purple-800 hover:to-purple-950 transition-all duration-300"
                    >
                        See All Services
                    </a>

                </div>
            )}
        </div>
    );
};

export default HeroCards;
