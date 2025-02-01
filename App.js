import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import "./styles.css";

export default function App() {
    const [value, setValue] = useState < number > (0);
    const [total, setTotal] = useState < string > ("0");
    const FOUR_LAKHS = 400000;
    const TWELVE_LAKHS = 1200000;
    const TAX_SLABS = [0, 5, 10, 15, 20, 25];

    const percentage = (amount: number, slab: number) => amount * slab / 100;

    useEffect(() => {
        const calcTotal = (income: number): void => {
            let amount = income;
            let i = 0;
            let incomeTax = 0;
            if (income > TWELVE_LAKHS) {
                amount = amount - FOUR_LAKHS;
                while (amount > 0 && TAX_SLABS[++i]) {
                    incomeTax += amount - FOUR_LAKHS > 0 ? percentage(FOUR_LAKHS, TAX_SLABS[i]) : percentage(amount, TAX_SLABS[i]);
                    amount = amount > FOUR_LAKHS ? amount - FOUR_LAKHS : 0;
                }
                incomeTax += amount > 0 ? amount * 30 / 100 : 0;
            }
            let formatter = new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                minimumFractionDigits: 2
            });
            let result = formatter.format(incomeTax);
            setTotal(result);
        };
        calcTotal(value);
    }, [value, percentage]);

    return (
        <div className="App">
            <Helmet>
                <title>{"Tax calculator"}</title>
            </Helmet>

            <h1>{"Tax calculator"}</h1>
            <div className="inputGroup">
                <label>
                    Enter Your Net Income :
                    <input
                        value={value}
                        onChange={event => setValue(event.target.value)}
                    />
                </label>
            </div>
            <h2>{"your Total Tax is"} {total}</h2>
        </div>
    );
}
