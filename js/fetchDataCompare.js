var basicJSON = angular.module('basicJSON', []);
basicJSON.controller('JIRAJSON',function($scope,$http){
	
        $http({

            method : "get",
            
            url: "jira.json"

        //    url : "http://35.164.38.196:3333/businessdashboard"

        }).success(function (data) {
            console.log(data);
            $scope.data = data;
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
                for(var i = 0; i < keys.length; i++) {
                    objs.push({name: keys[i], y: countIndividual[keys[i]]});
                }
                console.log(objs);
                return objs;
            }

//For Priority Pie Chart            
            var jsonPriorityPie = [];
            for (var i = 0; i < data.searchResults.issues.length; i++) {
                var priorityPie = data.searchResults.issues[i].fields.priority.name;
                jsonPriorityPie.push(priorityPie);
            }

           var finalPriorityJson = getKeyValuePie(jsonPriorityPie);
//For Priority Pie Chart end
            
//For issueTypeName Pie Chart            
            var jsonIssueTypeNamePie = [];
            for (var i = 0; i < data.searchResults.issues.length; i++) {
                var priorityPie = data.searchResults.issues[i].fields.issuetype.name;
                jsonIssueTypeNamePie.push(priorityPie);
            }

           //$scope.finalissueTypeNameJson = getKeyValuePie(jsonIssueTypeNamePie);
//For TypeName Pie Chart end
//Getting assignee names
            var allAssignee = [];
            for (var i = 0; i < data.searchResults.issues.length; i++) {
                if(data.searchResults.issues[i].fields.assignee){
                var assignee = data.searchResults.issues[i].fields.assignee.name;
                allAssignee.push(assignee);
                }
            }
                //console.log(allAssignee);
            $scope.jiraAssignee = allAssignee;
             console.log($scope.jiraAssignee);
//Getting assignee names end
            $scope.searchAssignee = function(){
                            var assigneejsonIssueTypeNamePie = [];
                            var assigneejsonPriorityPie = [];
                for (var i = 0; i < data.searchResults.issues.length; i++) {
                        if(data.searchResults.issues[i].fields.assignee)
                    {
                        if(data.searchResults.issues[i].fields.assignee.name == $scope.selectedAssignee)
                        {
                        var IssueNamePie = data.searchResults.issues[i].fields.issuetype.name;
                        var priorityPie = data.searchResults.issues[i].fields.priority.name;
                            assigneejsonIssueTypeNamePie.push(IssueNamePie);
                            assigneejsonPriorityPie.push(priorityPie);
                            //                            console.log(data.searchResults.issues[i].fields.assignee.name);
                        }
                    }
                }
                $scope.finalissueTypeNameJson = getKeyValuePie(assigneejsonIssueTypeNamePie);
                $scope.generateDynamicIssueName($scope.finalissueTypeNameJson);

//dynamic for priority
        
           var finalPriorityJson = getKeyValuePie(assigneejsonPriorityPie);
                
                $scope.generateDynamicPriority(finalPriorityJson);

                
            }

            
//Getting assignee for comparer names end
            $scope.searchAssigneeCompare = function(){
                            var assigneejsonIssueTypeNamePie = [];
                            var assigneejsonPriorityPie = [];
                for (var i = 0; i < data.searchResults.issues.length; i++) {
                        if(data.searchResults.issues[i].fields.assignee)
                    {
                        if(data.searchResults.issues[i].fields.assignee.name == $scope.selectedAssigneeCompare)
                        {
                        var IssueNamePie = data.searchResults.issues[i].fields.issuetype.name;
                        var priorityPie = data.searchResults.issues[i].fields.priority.name;
                            assigneejsonIssueTypeNamePie.push(IssueNamePie);
                            assigneejsonPriorityPie.push(priorityPie);
                            //                            console.log(data.searchResults.issues[i].fields.assignee.name);
                        }
                    }
                }
                $scope.finalissueTypeNameJson = getKeyValuePie(assigneejsonIssueTypeNamePie);
                $scope.generateDynamicIssueNameCompare($scope.finalissueTypeNameJson);

//dynamic for priority
        
           var finalPriorityJson = getKeyValuePie(assigneejsonPriorityPie);
                
                $scope.generateDynamicPriorityCompare(finalPriorityJson);

                
            }

//***Priority Pie Charts
//***Priority Pie Charts
 $scope.generateDynamicPriority = function(x){
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
            data: x
        }]
    });
        }

//***IssueTypeName Pie Charts
 $scope.generateDynamicIssueName = function(x){
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
            data: x
        }]
    });
        }
 $scope.generateDynamicPriorityCompare = function(x){
    Highcharts.chart('priorityContainerCompare', {
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
            data: x
        }]
    });
        }

//***IssueTypeName Pie Charts
 $scope.generateDynamicIssueNameCompare = function(x){
Highcharts.chart('containerIssueTypeNameCompare', {
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
            data: x
        }]
    });
        }
        })

    
    
})

