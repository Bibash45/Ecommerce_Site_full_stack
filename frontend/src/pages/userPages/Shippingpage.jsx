import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { saveShippingAddress } from "../../features/cartSlice";

const countryCityMapping = {
  Nepal: {
    Kathmandu: "44600",
    Lalitpur: "44700",
    Pokhara: "33700",
  },
  India: {
    Delhi: "110001",
    Mumbai: "400001",
    Kolkata: "700001",
  },
  Bangladesh: {
    Dhaka: "1000",
    Chittagong: "4000",
    Sylhet: "3100",
  },
};

const ShippingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [shippingData, setShippingData] = useState({
    shippingAddress1: cart.shippingAddress1 || "",
    shippingAddress2: cart.shippingAddress2 || "",
    city: cart.city || "",
    zip: cart.zip || "",
    phone: cart.phone || "",
    country: cart.country || "Nepal",
  });

  const countryOptions = Object.keys(countryCityMapping).map((country) => ({
    value: country,
    label: country,
  }));

  const cityOptions =
    countryCityMapping[shippingData.country] &&
    Object.keys(countryCityMapping[shippingData.country]).map((city) => ({
      value: city,
      label: city,
    }));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (selectedOption) => {
    setShippingData((prev) => ({
      ...prev,
      country: selectedOption.value,
      city: "",
      zip: "",
    }));
  };

  const handleCityChange = (selectedOption) => {
    setShippingData((prev) => ({
      ...prev,
      city: selectedOption.value,
      zip: countryCityMapping[shippingData.country][selectedOption.value],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(shippingData));
    navigate("/confirm");
  };

  useEffect(() => {
    if (cart.country && countryCityMapping[cart.country]) {
      setShippingData((prev) => ({
        ...prev,
        country: cart.country,
        city: cart.city || "",
        zip: cart.zip || "",
      }));
    }
  }, [cart]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
      <form
        className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          Shipping Information
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Country
          </label>
          <Select
            options={countryOptions}
            onChange={handleCountryChange}
            value={countryOptions.find(
              (option) => option.value === shippingData.country
            )}
            placeholder="Select a country"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            City
          </label>
          <Select
            options={cityOptions}
            onChange={handleCityChange}
            value={cityOptions?.find(
              (option) => option.value === shippingData.city
            )}
            placeholder="Select a city"
            isDisabled={!cityOptions}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            ZIP Code
          </label>
          <input
            value={shippingData.zip}
            type="text"
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Shipping Address 1
          </label>
          <input
            name="shippingAddress1"
            onChange={handleInputChange}
            value={shippingData.shippingAddress1}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter address line 1"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Shipping Address 2
          </label>
          <input
            name="shippingAddress2"
            onChange={handleInputChange}
            value={shippingData.shippingAddress2}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter address line 2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            onChange={handleInputChange}
            value={shippingData.phone}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter phone number"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 text-white bg-[#8b76bb] hover:bg-[#5f4c8a] rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Confirm Shipping
        </button>
      </form>
    </div>
  );
};

export default ShippingPage;
