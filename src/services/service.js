import axios, {AxiosResponse} from 'axios';

export default class Services {
  async getTotalWorldStatistics() {
    return new Promise(async (resolve, reject) => {
      const response = await axios({
        url:
          'https://coronovirus-monitoring.herokuapp.com/statistics/getWorldTotalStatus',
        method: 'get',
      });
      if (response.status == 200) {
        resolve(response.data);
      } else {
        reject(response);
      }
    });
  }
  async getCountryByStatistics() {
    return new Promise(async (resolve, reject) => {
      const response = await axios({
        url:
          'https://coronovirus-monitoring.herokuapp.com/statistics/cases',
        method: 'get',
      });
      if (response.status == 200) {
        resolve(response.data);
      } else {
        reject(response);
      }
    });
  }
}
