import React from 'react';
import '../Custom.css';
import { Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { useCurrencyList } from './currencyconverter'
import axios from 'axios';
import { useEffect, useState } from "react";
import { Button } from 'react-bootstrap';
import Navbar from './navbar';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    NavLink,
    Link
} from 'react-router-dom';

import heroGif from '../currency.gif';
import Footer from './footer';

async function getCurrencyExchange(from, to) {
    const url = "https://currency-exchange.p.rapidapi.com/exchange";
    let res = await axios({
        "method": 'GET',
        "url": 'https://currency-exchange.p.rapidapi.com/exchange',
        "params": {
            "from": from,
            "to": to,
            "q": '1'
        },
        "headers": {
            'X-RapidAPI-Key': '44888c0deemshf334b57b9c818a1p103756jsne949dccfc9d1',
            'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
        }
    });
    let datas = await res.data;
    //console.log(datas)
    const convertedAMount = parseFloat(datas);
    //console.log(convertedAMount)
    return convertedAMount;

    // return datas.map((data)=>({
    //     symbol: data.currencies,
    //     name: data.currencyNames,
    // }));
}



function Converter() {

    const [fromCurrency, setFromCurrency] = useState("");
    const [toCurrency, setToCurrency] = useState("");
    const [amount, setAmount] = useState("");
    const [result, setResult] = useState(null);


    function handleInputChange(event) {
        const inputValue = event.target.value;

        // Check for invalid characters on key press
        if (/[^0-9]/.test(inputValue)) {
            event.preventDefault();
            alert('Input can only contain numbers.');
            return;
        }

        // Limit input length to 10 characters
        if (inputValue.length > 10) {
            event.preventDefault();
            alert('Input cannot exceed 10 number.');
            return;
        }
        setAmount(inputValue);
    }

    const linkOtherPage = () => {
        <Link to={`/graph?from=${fromCurrency}&to=${toCurrency}`} />
    }

    const handleSubmit = (event) => {
        if (fromCurrency === toCurrency) {
            event.preventDefault();
            alert('From Currency and To Currency can not be same!');
            return;
        }
        event.preventDefault();
        const myFunction = async () => {
            try {
                //console.log(getCurrencyExchange(fromCurrency, toCurrency))
                setResult(await getCurrencyExchange(fromCurrency, toCurrency) * amount);
            } catch (error) {
                console.error(error);
            }
        }
        myFunction();
    }

    const isFormValid = fromCurrency && toCurrency && amount;

    const { CurrencyList } = useCurrencyList();
    return (
        <div>
            <Navbar />
            <div style={{ marginTop: '100px', marginLeft: '100px', marginRight: '100px' }}>
                <div style={{ marginLeft: '100px', marginRight: '100px' }}>
                    <h2>
                        Currency Converter
                    </h2>
                </div>
                <Row className="justify-content-center" style={{ marginTop: '30px' }}>
                    <Col xs={6} md={4}>
                        <img src={heroGif} alt="My Image" className="img-fluid" style={{ height: '50vh' }} />
                    </Col>
                </Row>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={4}>
                            <Form.Group controlId="formName">
                                <Form.Label>Currency Form</Form.Label>
                                <Form.Control as="select" onChange={(event) => {
                                    setFromCurrency(event.target.value);
                                }}>
                                    <option value="">Select a Currency</option>
                                    {
                                        CurrencyList.map((list, i) => (
                                            <option key={i} name="fromCurrency" value={list}>{list}</option>
                                        ))
                                    }

                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="formCurrency">
                                <Form.Label>Currency To</Form.Label>
                                <Form.Control as="select" onChange={(event) => {
                                    setToCurrency(event.target.value);
                                }}>
                                    <option value="">Select a Currency</option>
                                    {
                                        CurrencyList.map((list, i) => (
                                            <option key={i} name="toCurrency" value={list}>{list}</option>
                                        ))
                                    }

                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="toCurrency">
                                <Form.Label>Amount</Form.Label>
                                <Form.Control input
                                    type="text"
                                    name="amount"
                                    value={amount}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="d-grid gap-2" style={{ marginTop: '10px' }}>
                        <Button variant="primary" type="submit" disabled={!isFormValid} className={isFormValid ? '' : 'disabled-btn'}>
                            Convert
                        </Button>
                    </div>
                </Form>
                {result != null ?
                    <div>
                        <div style={{ backgroundColor: "Grey", padding: "20px", marginTop: "20px", borderRadius: '10px' }}>The expected Amount is {result.toFixed(2)} </div>
                        <Link className="d-grid gap-2" style={{ marginTop: '10px' }} to={`/Graphs?from=${fromCurrency}&to=${toCurrency}`}>
                            <Button variant="primary" type="button">
                                Show Graph
                            </Button>
                        </Link>
                    </div>
                    : null}
            </div>
            <Footer />
        </div>


    );
}

export default Converter;