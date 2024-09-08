import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-light text-center text-lg-start" style={{ bottom: 0, width: '100%' }}>
            <div className="container p-4">
                <div className="row">
                    <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                        <h5 className="text-uppercase">About</h5>

                        <p>
                            Simple Currency Converter Service with live Currency exchange rate among 19 different currencies.
                        </p>
                    </div>
                </div>
            </div>

            <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                © 2023 Currency Converter.
            </div>
        </footer>
    );
};

export default Footer;
