$(document).ready(function() {
    $('#submitBtn').click(function(e) {
        e.preventDefault();
        var selectedCurrency1 = $('#currencySelect1').val();
        var selectedCurrency2 = $('#currencySelect2').val();

        $.ajax({
            type: 'POST',
            url: '/exchange_rate',
            data: {
                'currency1': selectedCurrency1,
                'currency2': selectedCurrency2
            },
            success: function(response) {
                var dataCurrency1 = response.data_currency1;
                var dataCurrency2 = response.data_currency2;

                var layout = {
                    title: selectedCurrency1 + ' vs ' + selectedCurrency2 + ' Exchange Rates',
                    margin: {
                        t: 50,  // Adjust top margin for the title
                        l: 50,  // Adjust left margin
                        r: 50,  // Adjust right margin
                        b: 50   // Adjust bottom margin
                    },
                    xaxis: {
                        title: 'Date',
                        titlefont: {
                            size: 18,
                            family: 'Arial, sans-serif',
                            color: '#000'
                        },
                        tickfont: {
                            size: 14,
                            family: 'Arial, sans-serif',
                            color: '#000'
                        },
                        showticklabels: true, // Ensure tick labels are shown
                        automargin: true, // Adjust margin automatically
                        tickmode: 'auto', // Adjust tick mode automatically
                        tickformat: '%Y-%m-%d' // Date format
                    },
                    yaxis: {
                        title: 'Exchange Rate',
                        titlefont: {
                            size: 18,
                            family: 'Arial, sans-serif',
                            color: '#000'
                        },
                        tickfont: {
                            size: 14,
                            family: 'Arial, sans-serif',
                            color: '#000'
                        }
                    }
                };

                var data = [dataCurrency1, dataCurrency2];

                Plotly.newPlot('currency-graph', data, layout);

                // Update exchange rate label
                var exchangeRate = calculateExchangeRate(dataCurrency1, dataCurrency2);
                $('#exchange-rate-label').html(`1 ${selectedCurrency1} = ${exchangeRate.toFixed(4)} ${selectedCurrency2}`);
            },
            error: function(error) {
                console.log(error);
            }
        });
    });

    function calculateExchangeRate(currency1Data, currency2Data) {
        var latestCurrency1 = currency1Data['y'][currency1Data['y'].length - 1];
        var latestCurrency2 = currency2Data['y'][currency2Data['y'].length - 1];
        var exchangeRate = latestCurrency2 / latestCurrency1;
        return exchangeRate;
    }
});
