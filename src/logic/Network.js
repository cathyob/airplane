// needed to make a webcall
// axios was library of choice, could have used fetch or other
import axios from 'axios';

const URL = 'https://raw.githubusercontent.com/cathyob/airplane/'; // url base endpoint

class Network {
  constructor() {
    this.network = axios.create({
      baseURL: URL,
    });
  }

  
  getSeats() {
    return new Promise((resolve, reject) => {
      // axios takes the add'l string and appends to URL for us
      this.network.get('master/src/logic/data.json')
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

// we export network this way so it is always the same
// vs export default Network;
// we'd have to instantiate in every single component it is imported to
export default new Network();
