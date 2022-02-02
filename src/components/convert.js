import React from "react";
import style from './convert.module.css'

class CurrencyConverter extends React.Component {
    state = {
        currency: this.props.currencies[0].name,
        value: 0,
    }

    onChange = ({ target: { value, dataset: { currency } } }) => {
        this.setState({
            currency,
            value,
        });
    }

    render() {
        const { currency, value } = this.state;
        const { rate } = this.props.currencies.find(n => n.name === currency);
        return (
            <div style={style.inputWrapper}>
                {this.props.currencies.map(n => (
                    <div>
                        {n.name}:
                        <input style={style.input}
                            data-currency={n.name}
                            value={currency === n.name ? value : (value / rate * n.rate).toFixed(2)}
                            onChange={this.onChange}
                        />
                    </div>
                ))}
            </div>
        );
    }
}

export default CurrencyConverter


