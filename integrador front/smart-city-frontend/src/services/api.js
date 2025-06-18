import api from './api';

useEffect(() => {
  api.get('/dados')
    .then(response => {
      console.log(response.data);
    })
    .catch(err => {
      console.error(err);
    });
}, []);
