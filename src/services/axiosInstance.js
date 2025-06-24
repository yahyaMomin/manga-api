// import axios from 'axios';

// const headers = {
//   'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:122.0) Gecko/20100101 Firefox/122.0',
//   'Accept-Encoding': 'gzip, deflate',
// };

// export const axiosInstance = async (url, customHeader) => {
//   try {
//     const response = await axios.get(url, {
//       headers: {
//         ...headers,
//         ...customHeader,
//       },
//     });

//     return {
//       success: true,
//       data: response.data,
//     };
//   } catch (error) {
//     console.log(error.message);

//     return {
//       success: false,
//       message: error.message,
//     };
//   }
// };

const headers = {
  'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:122.0) Gecko/20100101 Firefox/122.0',
  'Accept-Encoding': 'gzip, deflate',
};

export const axiosInstance = async (url, customHeader = {}, data_by_json = false) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        ...headers,
        ...customHeader,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = data_by_json ? await response.json() : await response.text();

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.log(error.message);

    return {
      success: false,
      message: error.message,
    };
  }
};
