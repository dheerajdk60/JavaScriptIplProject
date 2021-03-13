const MATCH_ID=0;
const MATCH_SEASON=1;
const MATCH_CITY=2;
const MATCH_DATE=3;
const MATCH_TEAM1=4;
const MATCH_TEAM2=5;
const MATCH_TOSS_WINNER=6;
const MATCH_TOSS_DECISION=7;
const MATCH_RESULT=8;
const MATCH_DL_APPLIED=9;
const MATCH_WINNER=10;
const MATCH_WIN_BY_RUNS=11;
const MATCH_WIN_BY_WICKETS=12;
const MATCH_PLAYER_OF_MATCH=13;
const MATCH_VENUE=14;
const MATCH_UMPIRE1=15;
const MATCH_UMPIRE2=16;
const DELIVERY_ID=0;
const DELIVERY_INNING=1;
const DELIVERY_BATTING_TEAM=2;
const DELIVERY_BOWLING_TEAM=3;
const DELIVERY_OVER=4;
const DELIVERY_BALL=5;
const DELIVERY_BATSMAN=6;
const DELIVERY_NON_STRIKER=7;
const DELIVERY_BOWLER=8;
const DELIVERY_IS_SUPER_OVER=9;
const DELIVERY_WIDE_RUNS=10;
const DELIVERY_BYE_RUNS=11;
const DELIVERY_LEG_BYE_RUNS=12;
const DELIVERY_NO_BALL_RUNS=13;
const DELIVERY_PENALTY_RUNS=14;
const DELIVERY_BATSMAN_RUNS=15;
const DELIVERY_EXTRA_RUNS=16;
const DELIVERY_TOTAL_RUNS=17;
const DELIVERY_PLAYER_DISMISSED=18;
const DELIVERY_DISMISSAL_KIND=19;
const DELIVERY_FIELDER=20;
const fs=require('fs');
var matchesLines=fs.readFileSync("matches.csv").toString().split("\n");
var deliveriesLines=fs.readFileSync("deliveries.csv").toString().split("\n");
var matchesList=[];
var deliveriesList=[];
matchesLines.shift();
matchesLines.pop();
matchesLines.forEach(line => {
    var fields=line.split(",");
    var adjustingIndex=0;
    var dateValues=fields[MATCH_DATE].split("-");
    if(line.includes("\""))
    {
        adjustingIndex=1;
    }
    var match={
        id:fields[MATCH_ID],
        season:fields[MATCH_SEASON],
        city:fields[MATCH_CITY],
        date:new Date(dateValues[0],dateValues[1],dateValues[2]),
        team1:fields[MATCH_TEAM1],
        team2:fields[MATCH_TEAM2],
        tossWinnner:fields[MATCH_TOSS_WINNER],
        tossDecision:fields[MATCH_TOSS_DECISION],
        result:fields[MATCH_RESULT],
        dlApplied:fields[MATCH_DL_APPLIED],
        winner:fields[MATCH_WINNER],
        winByRuns:fields[MATCH_WIN_BY_RUNS],
        winByWickets:fields[MATCH_WIN_BY_WICKETS],
        playerOfMatch:fields[MATCH_PLAYER_OF_MATCH],
        venue:fields[MATCH_VENUE]+(adjustingIndex===1? " ,"+fields[MATCH_VENUE+adjustingIndex]:""),
        umpire1:fields[MATCH_UMPIRE1+adjustingIndex],
        umpire2:fields[MATCH_UMPIRE2+adjustingIndex],
    };
    matchesList.push(match);
});