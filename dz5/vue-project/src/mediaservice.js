// mediaService.js

import axios from 'axios';

const API_URL = 'https://images-api.nasa.gov/search';

export default {
  async search(params) {
    try {
      const response = await axios.get(API_URL, {
        params: {
          q: params.q,
          description: params.description,
          title: params.title,
          media_type: params.media_type,
          page_size: params.page_size,
        }
      });
      return response.data;
    } catch (error) {
      throw new Error('Error fetching data');
    }
  }
};
