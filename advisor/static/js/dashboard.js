/**
 * Created by Travis on 11/13/14.
 */
$(document).ready( function(){




$('.loadPort').on('click', function(){
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
                            values.push(stocked.stock1p, stocked.stock2p, stocked.stock3p, stocked.stock4p, stocked.stock5p);
                            names.push(stockedname.stock1n, stockedname.stock2n, stockedname.stock3n, stockedname.stock4n, stockedname.stock5n);
                            expected.push(stock_response.expected);
                            portfolio.push(stock_response.portfolio);
                            stocks['names'].push(stockedname.stock1n, stockedname.stock2n, stockedname.stock3n, stockedname.stock4n, stockedname.stock5n);
                        },
                        error: function (error_response) {
                        }


                    }).complete(function () {

///                     Create custom pie graph for each portfolio
                        var pie = new d3pie("pieChart2", {
                            "header": {
                                "title": {
                                    "text": portfolio,
                                    "color": "fec503",
                                    "fontSize": 28,
                                    "font": "open sans"
                                },
                                "subtitle": {
                                    "text": "Expected return of " + (expected * 100).toFixed(2) + " % ",

                                    //                    "color": "#fec503",
                                    "fontSize": 15,
                                    "font": "open sans"
                                },
                                "titleSubtitlePadding": 9
                            },
                            "footer": {
                                "color": "#999999",
                                "fontSize": 10,
                                "font": "open sans",
                                "location": "bottom-left"
                            },
                            "size": {
                                "canvasHeight": 400,
                                "canvasWidth": 600,
                                "pieInnerRadius": "9%",
                                "pieOuterRadius": "90%"
                            },
                            "data": {
                                "sortOrder": "value-asc",
                                "content": [
                                    {
                                        "label": names[0],
                                        "value": values[0],
                                        "color": "#1f7f0e"
                                    },
                                    {
                                        "label": names[1],
                                        "value": values[1],
                                        "color": "#2ea217"
                                    },
                                    {
                                        "label": names[2],
                                        "value": values[2],
                                        "color": "#043a00"
                                    },
                                    {
                                        "label": names[3],
                                        "value": values[3],
                                        "color": "#40cb27"
                                    },
                                    {
                                        "label": names[4],
                                        "value": values[4],
                                        "color": "#155d07"
                                    }
                                    //
                                ]
                            },
                            "labels": {
                                "outer": {
                                    "pieDistance": 32
                                },
                                "inner": {

                                    "hideWhenLessThanPercentage": 3
                                },
                                "mainLabel": {
                                    "fontSize": 11
                                },
                                "percentage": {
                                    "color": "#ffffff",
                                    "decimalPlaces": 0
                                },
                                "value": {
                                    "color": "#adadad",
                                    "fontSize": 11
                                },
                                "lines": {
                                    "enabled": true
                                }
                            },
                            "effects": {
                                "pullOutSegmentOnClick": {
                                    "effect": "linear",
                                    "speed": 400,
                                    "size": 8
                                }
                            },
                            "misc": {
                                "gradient": {
                                    "enabled": true,
                                    "percentage": 100
                                }
                            }

                        });
                    });


    $('.loadPort').toggle();

    $.ajax({
        url: '/price_lookup/',
        type: 'GET',
        dataType: 'json',
        success: function(response){
            for (var key in response) {
                var value = response[key];
                $('.quotesData').append("<div>"+key+": $" + value+"<button class='btn-md btn btn-default'>Buy</button></div>")
            }

        },
        error: function(error){
            console.log(error);
          $('.loadPort').toggle();

        }
    });

});









});