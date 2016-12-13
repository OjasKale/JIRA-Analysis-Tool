var basicJSON = angular.module('basicJSON', []);
basicJSON.controller('JIRAJSON',function($scope,$http){
	
        $http({

            method : "get",
            
            url: "js/jira.json"

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
//Getting Teams names
            var allTeams = [];
            var setTeams = new Set();

            for (var i = 0; i < data.searchResults.issues.length; i++) {
                    
                if(data.searchResults.issues[i].fields.customfield_10302){
                    var team = data.searchResults.issues[i].fields.customfield_10302.value;
                    setTeams.add(team);
                    // allTeams.push(team);

                }
            
            }
                console.log(setTeams);
                for (var item of setTeams) {
                    allTeams.push(item);
                }
            // var unique = allTeams.filter(function(elem , pos){
            //     return allTeams.indexOf(elem) = pos;
            // });
            // console.log(unique);
            $scope.jiraTeams = allTeams;
             console.log($scope.jiraTeams);
//Getting Team names end
            $scope.searchTeam = function(){
                            var teamjsonIssueTypeNamePie = [];
                            var teamjsonPriorityPie = [];
                for (var i = 0; i < data.searchResults.issues.length; i++) {
                        if(data.searchResults.issues[i].fields.customfield_10302)
                    {
                        if(data.searchResults.issues[i].fields.customfield_10302.value == $scope.selectedTeam)
                        {
                        var IssueNamePie = data.searchResults.issues[i].fields.issuetype.name;
                        var priorityPie = data.searchResults.issues[i].fields.priority.name;
                            teamjsonIssueTypeNamePie.push(IssueNamePie);
                            teamjsonPriorityPie.push(priorityPie);
                            //                            console.log(data.searchResults.issues[i].fields.assignee.name);
                        }
                    }
                }
                $scope.finalissueTypeNameJson = getKeyValuePie(teamjsonIssueTypeNamePie);
                $scope.generateDynamicIssueName($scope.finalissueTypeNameJson);

//dynamic for priority
        
           var finalPriorityJson = getKeyValuePie(teamjsonPriorityPie);
                
                $scope.generateDynamicPriority(finalPriorityJson);

                
            }

            
//Getting assignee for comparer names end
            $scope.searchTeamCompare = function(){
                            var teamjsonIssueTypeNamePie = [];
                            var teamjsonPriorityPie = [];
                for (var i = 0; i < data.searchResults.issues.length; i++) {
                        if(data.searchResults.issues[i].fields.customfield_10302)
                    {
                        if(data.searchResults.issues[i].fields.customfield_10302.value == $scope.selectedTeamCompare)
                        {
                        var IssueNamePie = data.searchResults.issues[i].fields.issuetype.name;
                        var priorityPie = data.searchResults.issues[i].fields.priority.name;
                            teamjsonIssueTypeNamePie.push(IssueNamePie);
                            teamjsonPriorityPie.push(priorityPie);
                            //                            console.log(data.searchResults.issues[i].fields.assignee.name);
                        }
                    }
                }
                $scope.finalissueTypeNameJson = getKeyValuePie(teamjsonIssueTypeNamePie);
                $scope.generateDynamicIssueNameCompare($scope.finalissueTypeNameJson);

//dynamic for priority
        
           var finalPriorityJson = getKeyValuePie(teamjsonPriorityPie);
                
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

