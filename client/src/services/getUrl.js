import axios from 'axios';

const url = process.env.REACT_APP_L2S;
const getShortUrl = async (inp) => {
  try {
    let data = JSON.stringify({
      url: inp,
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: url,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };
    const result = await axios.request(config);
    // console.log(result.data);
    return result.data.url;
  } catch (error) {
    console.log(error);
  }
};

export default getShortUrl;
