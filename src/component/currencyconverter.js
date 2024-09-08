import React from 'react';
import { useState } from "react";
import { useEffect } from "react";

async function getCurrencyList() {
    try {
        const url = "https://currency-exchange.p.rapidapi.com/listquotes";
        let res = await fetch(url, {
            "method": 'GET',
            "headers": {
                'X-RapidAPI-Key': '44888c0deemshf334b57b9c818a1p103756jsne949dccfc9d1',
                'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
            }
        });
        let data = await res.json();
        console.log(data);
        return data;
    }
    catch (error) {
        console.log(error)
    }    

    // return datas.map((data)=>({
    //     symbol: data.currencies,
    //     name: data.currencyNames,
    // }));
}

export function useCurrencyList() {
    const [loading, setLoading] = useState(true);
    const [CurrencyList, setCurrencyList] = useState([]);
    useEffect(
        () => {
            (async () => {
                setCurrencyList(await getCurrencyList());
                setLoading(false);
            })();
        },
        [],
    );
    return {
        loading,
        CurrencyList,
    };
}