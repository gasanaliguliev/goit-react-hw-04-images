import axios from 'axios';

const apiKey = '38971521-301f5cb08025e3967497dc80d';

const fetchImages = async (query, page) => {
  await axios.get(
    `https://pixabay.com/api/?key=${apiKey}&q=${query}&page=${page}&per_page=12`
  );
};

export default fetchImages ;
