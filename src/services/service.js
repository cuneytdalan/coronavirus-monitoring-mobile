export default class Services {
  getTotalWorldStatistics() {
    return new Promise((resolve, reject) => {
      fetch(
        'https://coronovirus-monitoring.herokuapp.com/statistics/getWorldTotalStatus',
        {
          method: 'GET',
        },
      )
        .then(response => response.json())
        .then(responseJson => {
          resolve(responseJson);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  getCountryByStatistics() {
    return new Promise((resolve, reject) => {
      fetch(
        'https://coronovirus-monitoring.herokuapp.com/statistics/cases',
        {
          method: 'GET',
        },
      )
        .then(response => response.json())
        .then(responseJson => {
          resolve(responseJson);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}
