export const getWeatherData = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`,
  ).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Error: ${response.status}`);
    }
  });
};

// const getWeatherData = {
//   fetch: async (latitude, longitude) => {
//     const APIkey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
//     const url = weatherApiUrl
//       .replace("${latitude}", latitude)
//       .replace("${longitude}", longitude)
//       .replace("${APIkey}", APIkey);

//     try {
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error("Error fetching weather data:", error);
//       throw error;
//     }
//   },

// };
