
import '../Custom.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


import axios from 'axios';
import { useEffect, useState } from "react";
import { Button } from 'react-bootstrap';



import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Footer from './footer';
import Navbar from './navbar';


function CryptoList() {
    //getCurrencyExchange()
    const [filterText, setFilterText] = useState('');
    const [rowData, setRowData] = useState([]);

    const handleFilterChange = (event) => {
        setFilterText(event.target.value);
    };


    useEffect(() => {
        async function fetchData() {
            let res = await axios({
                "method": 'GET',
                "url": 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en',
            });
            let datas = await res.data;
            console.log(datas)
            const results = datas.map(data => ({
                id: data.id,
                symbol: data.symbol,
                name: data.name,
                Price: data.current_price,
            }));
            setRowData(results);
        }
        fetchData();
    }, []);

    const filteredData = rowData.filter((row) =>
        row.name.toLowerCase().includes(filterText.toLowerCase())
    );

    const columnDefs = [
        { field: 'id', flex: 1 },
        { field: 'symbol', sortable: true, flex: 1 },
        { field: 'name', flex: 2 },
        { field: 'Price', filter: 'agNumberColumnFilter', flex: 1 },
    ];

    const defaultColDef = {
        resizable: true,
    };

    return (
        <div>
            <Navbar />
            <div style={{ marginTop: '100px', marginLeft: '100px', marginRight: '100px' }}>
                <div style={{ marginLeft: '100px', marginRight: '100px' }}>
                    <h2>
                        Crypto Currency price respect to Australian Dollar!
                    </h2>
                </div>
                <div style={{margin:"150px"}}>
                    <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                value={filterText}
                                onChange={handleFilterChange}
                                placeholder="Filter by name"
                            />
                        </div>
                        <AgGridReact
                            columnDefs={columnDefs}
                            rowData={filteredData}
                            pagination={true}
                            paginationPageSize={10}
                            domLayout="autoHeight"
                        />
                    </div>
                </div>

            </div>
            <div style={{ marginTop: "60px" }}>
                <Footer />
            </div>

        </div>


    );
}



export default CryptoList;