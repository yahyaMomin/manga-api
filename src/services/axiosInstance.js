import axios from 'axios';

const headers = {
  'User-Agent':
    'Mozilla/5.0 (X11; Linux x86_64; rv:122.0) Gecko/20100101 Firefox/122.0',
  'Accept-Encoding': 'gzip, deflate',
};

export const axiosInstance = async (url, customHeader) => {
  try {
    const response = await axios.get(url, {
      headers: {
        ...headers,
        ...customHeader,
      },
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
