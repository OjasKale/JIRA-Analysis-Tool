    var basicJSON = angular.module('basicJSON', []);
basicJSON.controller('JIRAJSON',function($scope,$http){
	
       // $scope.hello = "yudi";
    
        fetchData = function () {

        $http({

            method : "get",
            

            url : "jira.json"

        }).success(function (data) {
            console.log(data);
            $scope.totalIssues = data.searchResults.issues.length;
//****function to count array duplicate
            var countWholeArray = function(arr){
            var obj = [];
                for (var i = 0, j = arr.length; i < j; i++) {
                    if (obj[arr[i]]) {
                      obj[arr[i]]++;
                    }
                    else {
                      obj[arr[i]] = 1;
                    } 
                }
            return obj;
            }
            
            var getKeyValuePie = function(jsonParameterPie){
                var countIndividual = countWholeArray(jsonParameterPie);
                var objs = [];
                var keys = Object.keys(countIndividual);
                
                console.log(keys);

                for(var i = 0; i < keys.length; i++) {
                    objs.push({name: keys[i], y: countIndividual[keys[i]]});
                }
                return objs;
            }
            
//Done, to do percentage  code****//
            
            var countDone = 0;
            var countToDo = 0;
            var countInProgress = 0;
            for (var i = 0; i < data.searchResults.issues.length; i++) {
                if(data.searchResults.issues[i].fields.status.name == 'Done'){
                       countDone++;
                }
                else if(data.searchResults.issues[i].fields.status.name == 'To Do'){
                       countToDo++;
                }
                else if(data.searchResults.issues[i].fields.status.name == 'In Progress'){
                       countInProgress++;
                }
            }
            console.log("CountDone:" + countDone);
            console.log(countToDo);
            console.log(countInProgress);
            

            Highcharts.chart('Prog', {

        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false
        },

        title: {
            text: 'Progress Gauge'
        },

        pane: {
            startAngle: -150,
            endAngle: 150,
            background: [{
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#FFF'],
                        [1, '#333']
                    ]
                },
                borderWidth: 0,
                outerRadius: '109%'
            }, {
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#333'],
                        [1, '#FFF']
                    ]
                },
                borderWidth: 1,
                outerRadius: '107%'
            }, {
                // default background
            }, {
                backgroundColor: '#DDD',
                borderWidth: 0,
                outerRadius: '105%',
                innerRadius: '103%'
            }]
        },

        // the value axis
        yAxis: {
            min: 0,
            max: 100,

            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',

            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            labels: {
                step: 2,
                rotation: 'auto'
            },
            title: {
                text: 'Task Status'
            },
            plotBands: [{
                from: 0,
                to: 50,
                color: '#55BF3B' // green
            }, {
                from: 50,
                to: 80,
                color: '#DDDF0D' // yellow
            }, {
                from: 80,
                to: 100,
                color: '#DF5353' // red
            }]
        },

        series: [{
            name: 'Speed',
            data: [countDone],
            tooltip: {
                valueSuffix: 'Task Status'
            }
        }]

    });


  Highcharts.chart('Todo', {

        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false
        },

        title: {
            text: 'Progress Gauge'
        },

        pane: {
            startAngle: -150,
            endAngle: 150,
            background: [{
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#FFF'],
                        [1, '#333']
                    ]
                },
                borderWidth: 0,
                outerRadius: '109%'
            }, {
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#333'],
                        [1, '#FFF']
                    ]
                },
                borderWidth: 1,
                outerRadius: '107%'
            }, {
                // default background
            }, {
                backgroundColor: '#DDD',
                borderWidth: 0,
                outerRadius: '105%',
                innerRadius: '103%'
            }]
        },

        // the value axis
        yAxis: {
            min: 0,
            max: 100,

            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',

            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            labels: {
                step: 2,
                rotation: 'auto'
            },
            title: {
                text: 'Task Status'
            },
            plotBands: [{
                from: 0,
                to: 50,
                color: '#55BF3B' // green
            }, {
                from: 50,
                to: 80,
                color: '#DDDF0D' // yellow
            }, {
                from: 80,
                to: 100,
                color: '#DF5353' // red
            }]
        },

        series: [{
            name: 'Speed',
            data: [countToDo],
            tooltip: {
                valueSuffix: 'Task Status'
            }
        }]

    });

    Highcharts.chart('done', {

        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false
        },

        title: {
            text: 'Progress Gauge'
        },

        pane: {
            startAngle: -150,
            endAngle: 150,
            background: [{
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#FFF'],
                        [1, '#333']
                    ]
                },
                borderWidth: 0,
                outerRadius: '109%'
            }, {
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#333'],
                        [1, '#FFF']
                    ]
                },
                borderWidth: 1,
                outerRadius: '107%'
            }, {
                // default background
            }, {
                backgroundColor: '#DDD',
                borderWidth: 0,
                outerRadius: '105%',
                innerRadius: '103%'
            }]
        },

        // the value axis
        yAxis: {
            min: 0,
            max: 100,

            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',

            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            labels: {
                step: 2,
                rotation: 'auto'
            },
            title: {
                text: 'Task Status'
            },
            plotBands: [{
                from: 0,
                to: 50,
                color: '#55BF3B' // green
            }, {
                from: 50,
                to: 80,
                color: '#DDDF0D' // yellow
            }, {
                from: 80,
                to: 100,
                color: '#DF5353' // red
            }]
        },

        series: [{
            name: 'Speed',
            data: [countDone],
            tooltip: {
                valueSuffix: 'Task Status'
            }
        }]

    });
            
            
//For Priority Pie Chart            
            var jsonPriorityPie = [];
            for (var i = 0; i < data.searchResults.issues.length; i++) {
                var priorityPie = data.searchResults.issues[i].fields.priority.name;
                jsonPriorityPie.push(priorityPie);
                console.log(priorityPie);
            }

           var finalPriorityJson = getKeyValuePie(jsonPriorityPie);
            console.log(getKeyValuePie(finalPriorityJson));
//For Priority Pie Chart end
            
//For issueTypeName Pie Chart            
            var jsonIssueTypeNamePie = [];
            for (var i = 0; i < data.searchResults.issues.length; i++) {
                var priorityPie = data.searchResults.issues[i].fields.issuetype.name;
                jsonIssueTypeNamePie.push(priorityPie);
                console.log(priorityPie);
            }

           var finalissueTypeNameJson = getKeyValuePie(jsonIssueTypeNamePie);
            console.log(getKeyValuePie(finalissueTypeNameJson));
//For TypeName Pie Chart end
            
//***Priority Pie Charts
    Highcharts.chart('priorityContainer', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Browser market shares January, 2015 to May, 2015'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: finalPriorityJson
        }]
    });

//***IssueTypeName Pie Charts
Highcharts.chart('containerIssueTypeName', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Browser market shares January, 2015 to May, 2015'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: finalissueTypeNameJson
        }]
    });

        }).error(function(error) {

            //handle error

        });

    }



    fetchData();

    
})
