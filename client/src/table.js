import React from 'react';
import io from 'socket.io-client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import config from './config';
import { requestGet, requestPost, requestPut, requestDelete } from './services';

const socket = io(config.defaultUrl);

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availableCurrency: [],
      base: config.defaultCurrency[0],
      desired: config.defaultCurrency[1],
      amount: config.amount,
      result: ''
    };
  }

  buttonClick() {
    socket.emit('convert', this.state.base, this.state.desired, this.state.amount);
  };

  renderOption(currency) {
    return (
      <option key={currency}>{currency}</option>
    );
  }

  componentDidMount() {
    requestGet(config.defaultUrl + '/v1/currencies').then(res => {
      if (res.status) {
        this.setState({ availableCurrency: res})
      } else {
        this.setState({ availableCurrency: config.defaultCurrency });
        console.error(res.error);
      }
    });

    socket.on('info', (msg) => console.info('Connected to server, Id =', msg));

    socket.on('convert_res', (res) => {
      this.setState({ result: res.data });
      if (!res.status) {
        console.error(res.error);
      }
    });

    requestGet(config.defaultUrl + '/v2/company',{}).then(res => {
      console.log('company', res);
    });

     requestGet(config.defaultUrl + '/v2/users', { companyId : 2 }).then(res => {
      console.log('company users', res);
    });

    requestGet(config.defaultUrl + '/v2/history', { count: true, userId : 1}).then(res => {
      console.log('history user get', res);
    });
    requestGet(config.defaultUrl + '/v2/history', { count: false, userId : 3}).then(res => {
      console.log('history user get', res);
    });
    requestGet(config.defaultUrl + '/v2/history', { count: true, companyId : 1}).then(res => {
      console.log('history company get', res);
    });
    requestGet(config.defaultUrl + '/v2/history', { count: false, companyId : 3}).then(res => {
      console.log('history company get', res);
    });
          /// userId, baseCurrencyId, desiredCurrencyId, amount, rate
    requestPost(config.defaultUrl + '/v2/history', { userId: 3, baseCurrencyId: 2, desiredCurrencyId: 5, amount: 51.3333, rate: 100 }).then(res => {
      console.log('history post', res);
    });

    requestPut(config.defaultUrl + '/v2/history', { id: 3, amount: 25 }).then(res => {
      console.log('history put', res);
    });

    requestDelete(config.defaultUrl + '/v2/history', {id:4,}).then(res => {
      console.log('history del', res);
    });
  }

  handleChange(event) {
    let { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { availableCurrency, result, desired, amount, base } = this.state;
    return (
      <section className='filter-container'>
        <h1 className='main-caption wrapper'>Currency Exchange</h1>
        <div className='horizontal-line'></div>
        <div className='wrapper wrap-filter'>
          <div className='filter'>
            <div className='form-filter'>
              <ul>
                <li>
                  <span>
                    Base <br></br> Currency
                  </span>
                  <select className='form-control baseCurrency'
                    name='base'
                    value={base}
                    onChange={(event) => this.handleChange(event)}
                  >
                    {
                      availableCurrency.map(option => this.renderOption(option))
                    }
                  </select>
                </li>
                <li>
                  <span>
                    Desired <br></br> Currency
                  </span>
                  <select name='desired'
                    value={desired}
                    onChange={(event) => this.handleChange(event)}
                    className='form-control desiredCurrency'>
                    {
                      availableCurrency.map(option => this.renderOption(option))
                    }
                  </select>
                </li>
                <li>
                  <span>Input <br></br> Amount </span>
                  <input
                    type='text'
                    className='col amount'
                    placeholder='Input count'
                    name='amount'
                    value={amount}
                    onChange={(event) => this.handleChange(event)}
                  />
                </li>
              </ul>
              <button type='submit' className='send' onClick={() => this.buttonClick()}>Covert</button>
            </div>
          </div>
          <section className='wrap-data-viewer'>
            <h3>Result</h3>
            <h3 className='result'>{result}</h3>
          </section>
        </div>
      </section>
    );
  };
}

export { Table };