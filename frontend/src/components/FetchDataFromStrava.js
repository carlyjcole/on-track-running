import React, { useState, useEffect } from 'react';
import Stats from '../pages/Stats'
import axios from 'axios';

const FetchDataFromStrava = ({ userId }) => {
  const [activities, setActivities] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); 
  const clientID = 120096;
  const clientSecret = 'bc3ec467a7464ae5be9fc7a7f6cc69f126945851';
  const refreshToken = 'f545ac531dd1373ffca07f31d543f2e197810468';
  const auth_link = "https://www.strava.com/oauth/token";
  const activities_link = "https://www.strava.com/api/v3/athlete/activities";
  const perPage = 200; 
  let i = 1; 

  useEffect(() => {

    const delay = (ms) => new Promise(res => setTimeout(res, ms));

    const fetchData = async (page = 1) => {
      try {
        const stravaAuthResponse = await axios.post(`${auth_link}?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`);
        const accessToken = stravaAuthResponse.data.access_token;
        const stravaActivityResponse = await axios.get(`${activities_link}?access_token=${accessToken}&page=${page}&per_page=${perPage}`);
        const newActivities = stravaActivityResponse.data;

        setActivities(prevActivities => [...prevActivities, ...newActivities]);

        if (newActivities.length === perPage) {
          fetchData(page + 1);
        }

      } catch (error) {
        if (error.response && error.response.status === 429) {
          const waitTime = Math.pow(2, i) * 1000; 
          console.log(`Rate limited. Retrying in ${waitTime / 1000} seconds...`);
          await delay(waitTime);
          i++; 
          fetchData(page);
        } else {
          console.error('Error fetching data:', error);
        }
      }
    };
    fetchData();
  }, []); 

  return (
      <div>
        <Stats userId={ userId } activities={ activities } />
      </div>
    );
};

export default FetchDataFromStrava;

// const FetchDataFromStrava = () => {
//   console.log("fetching"); 
//   const [activities, setActivities] = useState([]);
//   const [selectedYear] = useState(new Date().getFullYear()); 
//   let [isOpen, setIsOpen] = useState(false); 

//   function closeModal() {
//     setIsOpen(false)
//   }

//   function openModal() {
//     setIsOpen(true)
//   }

//   const authorizeWithStrava = async () => {
//     // const response = await axios.post('http://localhost:4000/strava/auth');
//     closeModal(); 
//     console.log("authorization"); 
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:4000/strava/activities');
//         const newActivities = response.data.activities;

//         console.log("Strava API Response:", newActivities);

//         setActivities(prevActivities => [...prevActivities, ...newActivities]);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         openModal(); 
//       }
//     };

//     fetchData();
//   }, []); 
  
//   return (
//       <div>
//         <div className="fixed inset-0 flex items-center justify-center" style={{ pointerEvents: 'none' }}>

//         <Transition appear show={isOpen} as={Fragment}>
//           <Dialog as="div" className="relative z-10" onClose={closeModal}>
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0"
//               enterTo="opacity-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100"
//               leaveTo="opacity-0"
//             >
//               <div className="fixed inset-0 bg-black/25" />
//             </Transition.Child>

//               <div className="fixed inset-0 overflow-y-auto">
//                 <div className="flex min-h-full items-center justify-center p-4 text-center">
//                   <Transition.Child
//                     as={Fragment}
//                     enter="ease-out duration-300"
//                     enterFrom="opacity-0 scale-95"
//                     enterTo="opacity-100 scale-100"
//                     leave="ease-in duration-200"
//                     leaveFrom="opacity-100 scale-100"
//                     leaveTo="opacity-0 scale-95"
//                   >
//                     <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//                       <Dialog.Title
//                         as="h3"
//                         className="text-lg font-medium leading-6 text-gray-900"
//                       >
//                         uh oh!
//                       </Dialog.Title>
//                       <div className="mt-2">
//                         <p className="text-sm text-gray-500">
//                           you'll need to give us permission to use your data from strava.
//                         </p>
//                       </div>

//                       <div className="mt-4">
//                         <button
//                           type="button"
//                           className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
//                           onClick={authorizeWithStrava}>
//                           let's go
//                         </button>
//                       </div>
//                     </Dialog.Panel>
//                   </Transition.Child>
//                 </div>
//               </div>
//             </Dialog>
//             </Transition>
//             </div>
//           <Stats year={selectedYear} activities={activities} />
//         </div>
//     );
// };

// export default FetchDataFromStrava;
