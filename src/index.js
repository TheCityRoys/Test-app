
import CurrencyConverter from "./components/convert";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import style from './components/Main.module.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false
    };
  }
  componentDidMount() {
    fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json
        });
      });
  }
  render() {
    var { isLoaded, items } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div id="app">
          <header className={style.header}>
            <div className={style.container}>
              <div className={style.wrapper}>
                <div className={style.left}>
                  <h2 className={style.logo}>Test bank</h2>
                </div>
                <div className={style.right}>
                  <ul>
                    <li>Курс USD: {items[26].rate}</li>
                  </ul>
                </div>
              </div>
            </div>
          </header>
          <div className={style.container}>
            <CurrencyConverter currencies={[
              { name: 'UAH', rate: 1 },
              { name: 'USD', rate: 0.035 },
              { name: 'EUR', rate: 0.031 },
            ]} />
          </div>

        </div>
      );
    }
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);