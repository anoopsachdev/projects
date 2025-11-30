import React from 'react'
import { useState, useEffect } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import conf from '../conf/conf.js';
import { Input } from '@/components/ui/input.jsx';
import { SelectBudgetOptions, SelectTravelesList } from '@/constants/options.jsx';
import { Button } from '@/components/ui/button.jsx';
function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});

  const handleInputChange = (name, value) => {
    if (name == "noOfDays" && value > 5) {
      console.log("Max days exceeded (5)");
      return;
    }
    setFormData({ ...formData, [name]: value });
  }

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const OnGenerateTrip = () => {
    if (formData?.noOfDays > 5 && (!formData?.noOfDays || !formData?.location || !formData?.budget || !formData?.traveler)) {
      return;
    }
    console.log(formData);
  }
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>
        Tell us your travel preferences🌴🏕️
      </h2>
      <p className='mt-3 text-gray-500 text-xl'>
        Just provide some basic information, and our trip planner will generate a customized iternary based on your preferences.
      </p>
      
      {/* form */}
      <div className='mt-20 flex flex-col gap-9'>
        <div>
          <h2 className='text-xl my-3 font-medium'>
            What is your destination of choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={conf.googlePlaceApiKey}
            selectProps ={{
             place,
             onChange: (v) => {
              setPlace(v); handleInputChange("location", v);
              },
            }}
          />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>
            How many days will your trip be? 
          </h2>
          <Input placeholder= "Example: 3" type="number" 
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>
            What is your budget?
          </h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item, index) => (
              <div key={index} 
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${formData?.budget === item.title ? 'shadow-lg border-black' : ''}`}>
                <h2 className='text-3xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>
            Who are you traveling with?
          </h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTravelesList.map((item, index) => (
              <div key={index} 
              onClick={() => handleInputChange("traveler", item.people)}
              className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${formData?.traveler === item.people ? 'shadow-lg border-black' : ''}`}>
                <h2 className='text-3xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='my-10 justify-end flex'>
        <Button className="bg-black text-white hover:bg-gray-800"
          onClick={OnGenerateTrip}
        >Generate Trip</Button>
      </div>
    </div>
  )
}

export default CreateTrip