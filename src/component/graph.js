
import '../Custom.css';
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import { useEffect, useState } from "react";

import heroGif from '../graph.gif';
import Chart from "chart.js/auto";

import { useLocation } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';


async function fetchHistoricalData(fromCurrency, toCurrency) {
    const API_KEY = 'LGAQX4ICBYJBVFTK';
    const url = `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${fromCurrency}&to_symbol=${toCurrency}&apikey=${API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const last7DaysDate = [];
        const last7DaysData = [];
        const entries = Object.entries(data['Time Series FX (Daily)']);

        // Loop through the entries array and pick the values of the last 7 days
        for (let i = 0; i < 7; i++) {
            const [date, value] = entries[i];
            last7DaysDate.push(date);
            const high = parseFloat(value['2. high']);
            last7DaysData.push(high);
        }
        console.log(last7DaysDate)
        console.log(last7DaysData)
        const chartData = {
            labels: last7DaysDate,
            datasets: [
                {
                    label: fromCurrency + " to " + toCurrency,
                    data: last7DaysData,
                    fill: false,
                    borderColor: "rgba(75,192,192,1)",
                    tension: 0.1
                },
            ],
        };
        return chartData;
    } catch (error) {
        console.log(error);
    }
}


function Graph() {

    const [fromCurrency, setFromCurrency] = useState("");
    const [toCurrency, setToCurrency] = useState("");

    const [data, setData] = useState(null);


    const location = useLocation();



    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        setFromCurrency(searchParams.get('from'));
        setToCurrency(searchParams.get('to'));
    }, [location]);

    useEffect(() => {
        if (fromCurrency && toCurrency) {
            fetchHistoricalData(fromCurrency, toCurrency)
                .then((chartData) => {
                    setData(chartData);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [fromCurrency, toCurrency]);


    useEffect(() => {
        if (data) {
            const canvas = document.getElementById('myChart');
            const ctx = canvas.getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: data,
            });
        }
    }, [data]);

    return (
        <div>
            <Navbar/>
            <div style={{ marginTop: '100px', marginLeft: '100px', marginRight: '100px' }}>
                <div style={{ marginLeft: '100px', marginRight: '100px' }}>
                    <h2>
                        Check Historical Records of Exchange rates of Currency value of 1.
                    </h2>
                </div>
                <Row className="justify-content-center">
                    <Col xs={6} md={4}>
                        <img src={heroGif} alt="My Image" className="img-fluid" style={{ height: '50vh' }} />
                    </Col>
                </Row>
                {data != null ? <canvas id="myChart" style={{ marginTop: '30px' }}></canvas> : null}
            </div>
            <Footer/>
        </div>
    );
}

export default Graph;