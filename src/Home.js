import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faSkullCrossbones,
  faHeartbeat,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';

import Services from './services/service';
import {_} from 'lodash';
class Home extends Component {
  constructor(props) {
    super(props);
    this.service = new Services();
  }

  state = {
    data: '',
    threshold: 0,
    casesByCountry: {
      countries_stat: [],
    },
  };
  componentDidMount = async () => {
    const response = await Promise.all([
      this.service.getTotalWorldStatistics(),
      this.service.getCountryByStatistics(),
    ]).catch(err => {
      throw err;
    });

    console.log('response in home', response);

    this.setState({
      data: response[0],
      casesByCountry: response[1],
    });

    this.state.casesByCountry.countries_stat.forEach(country => {
      const deaths = Number(country.deaths.replace(',', ''));
      if (deaths > this.state.threshold) {
        this.setState({threshold: deaths});
      }
    });
  };

  getRateOfCountry(country) {
    const deaths = Number(country.deaths.replace(',', ''));
    const rate = (100 * deaths) / this.state.threshold;
    let color = '';
    if (rate <= 20) {
      color = '#00ac46';
    } else if (20 < rate && rate <= 40) {
      color = '#fdc500';
    } else if (40 < rate && rate <= 60) {
      color = '#fd8c00';
    } else if (60 < rate && rate <= 80) {
      color = '#d96b0b ';
    } else if (rate > 80) {
      color = '#ff2d19';
    }

    return {
      width: `${rate}%`,
      backgroundColor: color,
      borderRadius: 5,
    };
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.boxContainer}>
            <View style={[styles.boxDeath, styles.box]}>
              <FontAwesomeIcon
                size={30}
                style={styles.boxIcons}
                icon={faSkullCrossbones}
              />
              <View style={styles.boxInfo}>
                <Text style={styles.boxInfoAmount}>
                  {this.state.data.total_deaths}
                </Text>
                <Text style={styles.boxInfoDescription}>
                  total deaths in {this.state.data.total_cases} cases.
                </Text>
              </View>
            </View>
            <View style={[styles.boxRecovered, styles.box]}>
              <FontAwesomeIcon
                size={30}
                style={styles.boxIcons}
                icon={faHeartbeat}
              />
              <View style={styles.boxInfo}>
                <Text style={styles.boxInfoAmount}>
                  {this.state.data.total_recovered}
                </Text>
                <Text style={styles.boxInfoDescription}>
                  total rocevered in {this.state.data.total_cases} cases.
                </Text>
              </View>
            </View>
            <View style={[styles.boxLast, styles.box]}>
              <FontAwesomeIcon
                size={30}
                style={styles.boxIcons}
                icon={faInfoCircle}
              />
              <View style={styles.boxInfo}>
                <Text style={styles.boxInfoAmount}>
                  {this.state.data.new_cases}
                </Text>
                <Text style={styles.boxInfoDescription}>total new cases.</Text>
              </View>
            </View>
          </View>
          <View>
            {this.state.casesByCountry.countries_stat.map((country, key) => (
              <View style={styles.countryContainer} key={key}>
                <View style={this.getRateOfCountry(country)} />
                <Text style={styles.countryName}>{country.country_name}</Text>
                <Text style={styles.coutryInfoAmount}>
                  {country.deaths}
                  <Text style={styles.countryText}> deaths in </Text>
                  {country.cases}
                  <Text style={styles.countryText}> cases </Text>
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8eeee',
  },
  boxContainer: {
    fontSize: 30,
    padding: 10,
  },
  box: {
    borderWidth: 2,
    padding: 10,
    margin: 5,
    borderRadius: 5,
    position: 'relative',
    height: 80,
  },
  boxDeath: {
    borderColor: '#fc5426',
    backgroundColor: '#fc5426',
  },
  boxRecovered: {
    borderColor: '#18ad1a',
    backgroundColor: '#18ad1a',
  },
  boxLast: {
    borderColor: '#18acc9',
    backgroundColor: '#18acc9',
  },
  boxIcons: {
    position: 'absolute',
    right: 10,
    top: 10,
    color: '#ffffff',
  },
  boxInfo: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },

  boxInfoAmount: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  boxInfoDescription: {
    color: '#ffffff',
    fontStyle: 'italic',
  },

  countryContainer: {
    flexDirection: 'row',
    height: 40,
    borderWidth: 1,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: '#d6d6d6',
    position: 'relative',
    borderColor: '#d6d6d6',
  },

  countryName: {
    position: 'absolute',
    left: 10,
    top: 10,
    fontWeight: '700',
  },
  coutryInfoAmount: {
    color: '#363636',
    fontWeight: '700',
    right: 10,
    top: 10,
    position: 'absolute',
  },

  countryText: {
    fontStyle: 'italic',
    fontSize: 12,
    fontWeight: '200',
  },
});

export default Home;
