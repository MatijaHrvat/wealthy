$(document).ready(function () {

    $('.gtPortfolio').on('click', function () {
        $('.homeDataBtn').toggle('slow');
        $('.dashboardBtn').toggle('slow');


//        Calculate an estimated after tax income amount
        $.ajax({
            url: '/income/',
            type: 'GET',
            dataType: 'json',

            success: function (stock_response) {
                $('.portfolioResultsTax').html("<h3>Your after tax income is roughly : $" + stock_response.after_tax);
            },
            error: function (error_response) {
            }
        }).complete(function () {
//              Figure out the percentage spent on housing and the disposable income for each user
            $.ajax({
                url: '/rent_to_median/',
                type: 'GET',
                dataType: 'json',

                success: function (stock_response) {
                    $('.portfolioResultsMonth').html("<h3>Your monthly disposable income is: " + ("$" + stock_response.disposible )+ "</h3>" +
                        "<h3>You spend " + (stock_response.percentage_housing * 100).toFixed(2) + " % on housing</h3>");


                },
                error: function (error_response) {
                }
            }).complete(function () {
//                Get the monthly investment amount the user can afford
                $.ajax({
                    url: '/find_investment_monthly/',
                    type: 'GET',
                    dataType: 'json',
                    success: function (stock_response) {

                        $('.monthInvestment').html("<h3>Your monthly investment should be : $" + stock_response.invest + "</h3>");
                        var stocks = {'names': []};


                    },
                    error: function (error_response) {
                    }
                }).complete(function () {
                    var stocks = {'names': []};
                    var values = [];
                    var names = [];
                    var portfolio = [];
                    var expected = [];
//                    Get all the portfolio information after the user has a risk score
                    $.ajax({
                        url: '/find_portfolio/',
                        type: 'GET',
                        dataType: 'json',

                        success: function (stock_response) {
                            var stocked = stock_response.stocksp;
                            var stockedname = stock_response.stocksn;
                            $('.gtPortfolio').hide('slow');
                            //
                            values.push(stocked.stock1p, stocked.stock2p, stocked.stock3p, stocked.stock4p, stocked.stock5p);
                            names.push(stockedname.stock1n, stockedname.stock2n, stockedname.stock3n, stockedname.stock4n, stockedname.stock5n);
                            expected.push(stock_response.expected);
                            portfolio.push(stock_response.portfolio);
                            stocks['names'].push(stockedname.stock1n, stockedname.stock2n, stockedname.stock3n, stockedname.stock4n, stockedname.stock5n);
                            $('.getPortfolio').html('<h3>The expected return of this portfolio when your 65 is: $' + stock_response.return);
                            var stock_list = stock_response.stock_list;
                            for (i = 0; i < stock_list.length; i++) {
                                $('#accordion2').append('<h3>' + stock_list[i].name + '</h3><div>' + stock_list[i].info + '</div>');
                            }
                            $('#accordion2').show();
                            $('#accordion2').accordion({active: 1});

                        },
                        error: function (error_response) {
                        }


                    }).complete(function () {
                        $(function () {

                            // Radialize the colors
                            Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
                                return {
                                    radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
                                    stops: [
                                        [0, color],
                                        [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
                                    ]
                                };
                            });
                        });
                        // Build the chart
                        $('#pieChart2').highcharts({
                            chart: {
                                plotBackgroundColor: null,
                                plotBorderWidth: null,
                                plotShadow: false
                            },
                            title: {
                                text: portfolio
                            },
                            "subtitle": {
                                "text": "Expected return of " + (expected * 100).toFixed(2) + " % "},
                            tooltip: {
                                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                            },
                            plotOptions: {
                                pie: {
                                    allowPointSelect: true,
                                    cursor: 'pointer',
                                    dataLabels: {
                                        enabled: false,
                                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                        style: {
                                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                        },
                                        connectorColor: 'silver'

                                    },
                                    showInLegend: true

                                }
                            },
                            series: [
                                {
                                    type: 'pie',
                                    name: portfolio,
                                    data: [
                                        [names[0], values[0]],

                                        {
                                            name: names[1],
                                            y: values[1],
                                            sliced: true,
                                            selected: true
                                        },
                                        [names[2], values[2]],
                                        [names[3], values[3]],
                                        [names[4], values[4]]


                                    ]
                                }
                            ]

                        });
                    });
                });
            });
        });
    });
//    });

//    Toggle buttons for questions to not overwhelm users
    $('.questSetOneNext').on('click', function () {
        $('.questSetOne').hide('slow');
        $('.questSetTwo').show('slow');
    });
//    Second set questions
    $('.questSetTwoNext').on('click', function () {
        $('.questSetTwo').hide('slow');
        $('.questSetThree').show('slow');
    });
//    Last set of questions
    $('.questSetThreeNext').on('click', function () {
        $('.questSetThree').hide('slow');
        $('.questSetFour').show('slow');
    });


// Demo setup ajax
//    Opens Age input and Submit divs
    $('.demo').on('click', function () {
        $('.demoAgeInput').toggle();
        $('.ageInputBtn').toggle();

    });

//    Creates hardcoded demo portfolio
    $('.ageInputBtn').on('click', function () {

        $('.demoHide').toggle('slow');
        $('.demoAgeInput').toggle();
        $('.ageInputBtn').toggle();
        $(function () {

            // Radialize the colors
            Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
                return {
                    radialGradient: { cx: 0.5, cy: 0.3, r: 0.7 },
                    stops: [
                        [0, color],
                        [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
                    ]
                };
            });
        });
        $('#pieChart').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: 'Conservative'
            },
            "subtitle": {
                "text": "Expected return of 5.2 % "},
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        },
                        connectorColor: 'silver'

                    },
                    showInLegend: true

                }
            },
            series: [
                {
                    type: 'pie',
                    name: 'Conservative',
                    data: [
                        ["S&P500 Index ETF", 30],

                        {
                            name: "REIT ETF",
                            y: 10,
                            sliced: true,
                            selected: true
                        },
                        ['Utilities ETF', 10],
                        ["Government Bonds", 15],
                        ["LT CRP BNDs", 15],
                        ["INT CRP BNDs", 20]
                    ]
                }
            ]
        });

// Uses the user's age to personalize the demo portfolio
        var ageInput = $('.demo_age').val();
        var age = {};
        age['data'] = ageInput;
        var stockInfo = JSON.stringify(age);
        $.ajax({
            url: '/demo_age/',
            type: 'POST',
            dataType: 'json',
            data: stockInfo,
            success: function (stock_response) {
                $('.userAge').html('<h3 class="section-subheading text-muted "> ' + stock_response.age + ' years old and ' +
                    'a medium convservative investor</h3>');
                $('.demoResults').html("<h3>Here is your outlook for the next " + (70 - stock_response.age) + " years!" +
                    "</h3><br><h3>Expected portfolio value at 65 years old:<br> $" + stock_response.return + "</h3>" +
                    "<br><h3>You should invest $ " + "" + stock_response.investment + " a month </h3>" +
                    "<br><h3>Which is " + ((stock_response.investment / 4000) * 100) + " % of your monthly income</h3>");

            },
            error: function (error_response) {
            }
        }).complete(function () {
            $('#accordion').accordion({active: 1,
                header: "h3",
                collapsible: true,
                autoHeight: false,
                navigation: true
            });
        });
    });
});

//Register modal toggles to avoid overwhelming users
$(document).on('click', '#usernameNext', function () {
    $('.userName').hide();
    $('.emailPassword').fadeIn('slow');
});
$(document).on('click', '.emailPasswordNext', function () {
    $('.emailPasswordNext').hide();
    $('.demographics').fadeIn('slow');
    $('.doneButton').fadeIn('slow');
});

$('.homeDataBtn').on('click', function () {
    $('.housing').toggle();
});


$('.getRentPrice').on('click', function () {
    var zipcode = document.getElementById("myVar").value;
    var housing = document.getElementById("housingNumber").value;
    $('.housingQs').toggle('slow');

    $.ajax({
        url: 'https://www.quandl.com/api/v1/datasets/ZILLOW/RZIP_MEDIANRENTALPRICE_ALLHOMES_' + zipcode + '.json',
        type: 'GET',
        dataType: 'json',
        beforeSend: function () {
            $('#loading').toggle();

        },
        success: function (zip_response) {

            $(function () {
                $('#housingChart').highcharts({
                    title: {
                        text: 'Rental Prices Over the Last Year',
                        x: -20 //center
                    },
                    subtitle: {
                        text: 'Source: Zillow and Quandl',
                        x: -20
                    },
                    xAxis: {
                        name: 'Dates',
                        categories: [zip_response.data[11][0].slice(5), zip_response.data[10][0].slice(5),
                            zip_response.data[9][0].slice(5), zip_response.data[8][0].slice(5), zip_response.data[7][0].slice(5),
                            zip_response.data[6][0].slice(5), zip_response.data[5][0].slice(5), zip_response.data[4][0].slice(5),
                            zip_response.data[3][0].slice(5), zip_response.data[2][0].slice(5), zip_response.data[1][0].slice(5),
                            zip_response.data[0][0].slice(5) ]
                    },
                    yAxis: {
                        title: {
                            text: 'Median Price of Rentals'
                        },
                        plotLines: [
                            {
                                value: 0,
                                width: 2,
                                color: '#808080'
                            }
                        ]
                    },
                    tooltip: {
                        animation: true
                    },
                    legend: {
                        layout: 'horizontal',
//            align: 'right',
                        verticalAlign: 'bottom',
                        borderWidth: 0

                    },
                    series: [
                        {
                            name: "Zipcode: " + zipcode,
                            data: [zip_response.data[11][1], zip_response.data[10][1],
                                zip_response.data[9][1], zip_response.data[8][1], zip_response.data[7][1],
                                zip_response.data[6][1], zip_response.data[5][1], zip_response.data[4][1],
                                zip_response.data[3][1], zip_response.data[2][1], zip_response.data[1][1],
                                zip_response.data[0][1]]
                        }
                    ]
                });
            });

            $('.housingAnalysisTitle').toggle('slow');

            $(function () {
                var price = zip_response.data[0][1];
                var price2 = zip_response.data[1][1];
                var price3 = zip_response.data[2][1];
                var price4 = zip_response.data[3][1];
                var price5 = zip_response.data[4][1];
                var price6 = zip_response.data[5][1];
                var price7 = zip_response.data[5][1];
                var price8 = zip_response.data[7][1];
                var price9 = zip_response.data[8][1];
                var price10 = zip_response.data[9][1];
                var price11 = zip_response.data[10][1];
                var price12 = zip_response.data[11][1];


                var last6Average = (price + price2 + price3 + price4 + price5 + price6) / 6;
                var first6Average = (price7 + price8 + price9 + price10 + price11 + price12) / 6;
                var percent_change = (((last6Average - first6Average) / last6Average) * 100).toFixed(2);


                $('.housingAnalysis').html("<div>Your housing cost are $" + housing.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " a month.</div><div>The average " +
                    " rental price for the first six months of the year was $" + first6Average.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " and the last six" +
                    " month average was $" + last6Average.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ", which is a percentage change of " + percent_change +
                    " %.</div>");


            });
        },
        error: function (zip_response) {
            $('.housingAnalysis').html("<div> We are sorry but an error occured, please reload page and try again</div>")
        }
    });
});

//Gets home price from zillow and quandl for the zipcode of user, also gets their housing costs to estimate mortgage payment
$('.getHomePrice').on('click', function () {
    $('.housingQs').toggle('slow');
    var mortgageRates = {'fifteenYear': [], 'thirtyYear': []};
    var zipcode = document.getElementById("myVar").value;
    var housing = document.getElementById("housingNumber").value;
    $.ajax({
        url: 'https://www.zillow.com/webservice/GetRateSummary.htm?zws-id=X1-ZWz1b511wdba4r_43hp8&output=json',
        type: 'GET',
        dataType: 'jsonp',
        success: function (response) {
            var fifteenYear = response.response.today.fifteenYearFixed;
            var thirtyYear = response.response.today.thirtyYearFixed;
            mortgageRates['fifteenYear'].push(fifteenYear);
            mortgageRates['thirtyYear'].push(thirtyYear)
        },
        error: function (error) {
            console.log(error);

        }
    }).complete(function () {
        $.ajax({
            url: 'https://www.quandl.com/api/v1/datasets/ZILLOW/MZIP_MEDIANSOLDPRICE_ALLHOMES_' + zipcode + '.json',
            type: 'GET',
            dataType: 'json',
            beforeSend: function () {
                $('#loading').toggle();

            },
            success: function (zip_response) {
                $(function () {
                    $('#housingChart').highcharts({
                        title: {
                            text: 'Median Home Prices Over the Last Year',
                            x: -20 //center
                        },
                        subtitle: {
                            text: 'Source: Zillow and Quandl',
                            x: -20
                        },
                        xAxis: {
                            name: 'Dates',
                            categories: [zip_response.data[11][0].slice(5), zip_response.data[10][0].slice(5),
                                zip_response.data[9][0].slice(5), zip_response.data[8][0].slice(5), zip_response.data[7][0].slice(5),
                                zip_response.data[6][0].slice(5), zip_response.data[5][0].slice(5), zip_response.data[4][0].slice(5),
                                zip_response.data[3][0].slice(5), zip_response.data[2][0].slice(5), zip_response.data[1][0].slice(5),
                                zip_response.data[0][0].slice(5) ]
                        },
                        yAxis: {
                            title: {
                                text: 'Median Price of Homes in ' + zipcode
                            },
                            plotLines: [
                                {
                                    value: 0,
                                    width: 2,
                                    color: '#808080'
                                }
                            ]
                        },
                        tooltip: {
                            animation: true
                        },
                        legend: {
                            layout: 'horizontal',
//            align: 'right',
                            verticalAlign: 'bottom',
                            borderWidth: 0

                        },
                        series: [
                            {
                                name: "Zipcode: " + zipcode,
                                data: [zip_response.data[11][1], zip_response.data[10][1],
                                    zip_response.data[9][1], zip_response.data[8][1], zip_response.data[7][1],
                                    zip_response.data[6][1], zip_response.data[5][1], zip_response.data[4][1],
                                    zip_response.data[3][1], zip_response.data[2][1], zip_response.data[1][1],
                                    zip_response.data[0][1]]}
                        ]
                    });
                });

//
                $('.housingAnalysisTitle').toggle('slow');
                $(function () {
                    var price = zip_response.data[0][1];
                    var price2 = zip_response.data[1][1];
                    var price3 = zip_response.data[2][1];
                    var price4 = zip_response.data[3][1];
                    var price5 = zip_response.data[4][1];
                    var price6 = zip_response.data[5][1];
                    var price7 = zip_response.data[5][1];
                    var price8 = zip_response.data[7][1];
                    var price9 = zip_response.data[8][1];
                    var price10 = zip_response.data[9][1];
                    var price11 = zip_response.data[10][1];
                    var price12 = zip_response.data[11][1];
//                    for(i=0; i< zip_response.data[i][1].length <= zip_response.data[12][1].length; i++){
//                        console.log(zip_response.data[i][1])
//
//                    }
                    var last6Average = (price + price2 + price3 + price4 + price5 + price6) / 6;
                    var first6Average = (price7 + price8 + price9 + price10 + price11 + price12) / 6;
                    var percent_change = (((last6Average - first6Average) / last6Average) * 100).toFixed(2);
                    var principle = (last6Average * .80);
                    var thirtyMonthly = (mortgageRates.thirtyYear[0] / 100) / 12;
                    var thirty = mortgageRates.thirtyYear[0];
                    var fifteen = mortgageRates.fifteenYear[0];
                    var fifteenMonthly = (mortgageRates.fifteenYear[0] / 100) / 12;
                    var thirtyYearMortgagePayment = (principle * (thirtyMonthly * (Math.pow(1 + thirtyMonthly, 360)) / (Math.pow((1 + thirtyMonthly), 360) - 1))).toFixed(2);
                    var fifteenYearMortgagePayment = (principle * (fifteenMonthly * (Math.pow(1 + fifteenMonthly, 180)) / (Math.pow((1 + fifteenMonthly), 180) - 1))).toFixed(2);
                    var housingVersusThirty = ((thirtyYearMortgagePayment / housing) * 100).toFixed(2);
                    var housingVersusFifteen = ((fifteenYearMortgagePayment / housing) * 100).toFixed(2);


//                    Takes the first six months median home sale price and last six months, gives a percent change between the averages.
                    $('.housingAnalysis').html("<div>Your housing cost are $" + housing.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " a month.</div><div>The average" +
                        " median home sale price for the first six months $" + first6Average.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " and the most recent " +
                        "six month average is $" + last6Average.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ". Which is a percentage change of " +
                        percent_change + " %!</div><div>The most recent 30 Year Fixed Mortgage rate is " + thirty + "% and the 15 year Fixed Mortgage rate is " + fifteen + "%" +
                        "A new mortgage on home in your area would cost either $" + thirtyYearMortgagePayment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " a month for a 30 year fixed, or $" +
                        fifteenYearMortgagePayment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " a month for a 15 year fixed.</div><div>" +
                        " A new mortgage is  " + housingVersusThirty + "% more/less on a 30 year and " + housingVersusFifteen + "% more/less on 15 year than you pay now!</div>");


                });
            },
            error: function (error_response) {
                $('.housingAnalysis').html("<div> We are sorry but an error occured, please reload page and try again</div>")

            }
        });
    });
});







