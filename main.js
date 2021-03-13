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
const fs=require('fs');
var matchesLines=fs.readFileSync("matches.csv").toString().split("\n");
var matchesList=[];
matchesLines.forEach(line => {
    var fields=line.split(",");
    var adjustingIndex=0;
    if(line.includes("\""))
    {
        adjustingIndex=1;
    }
    var match={
        id:fields[MATCH_ID],
        season:fields[MATCH_SEASON],
        city:fields[MATCH_CITY],
        date:fields[MATCH_DATE],
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
console.log(matchesList);