const MATCH_ID = 0;
const MATCH_SEASON = 1;
const MATCH_CITY = 2;
const MATCH_DATE = 3;
const MATCH_TEAM1 = 4;
const MATCH_TEAM2 = 5;
const MATCH_TOSS_WINNER = 6;
const MATCH_TOSS_DECISION = 7;
const MATCH_RESULT = 8;
const MATCH_DL_APPLIED = 9;
const MATCH_WINNER = 10;
const MATCH_WIN_BY_RUNS = 11;
const MATCH_WIN_BY_WICKETS = 12;
const MATCH_PLAYER_OF_MATCH = 13;
const MATCH_VENUE = 14;
const MATCH_UMPIRE1 = 15;
const MATCH_UMPIRE2 = 16;
const DELIVERY_ID = 0;
const DELIVERY_INNING = 1;
const DELIVERY_BATTING_TEAM = 2;
const DELIVERY_BOWLING_TEAM = 3;
const DELIVERY_OVER = 4;
const DELIVERY_BALL = 5;
const DELIVERY_BATSMAN = 6;
const DELIVERY_NON_STRIKER = 7;
const DELIVERY_BOWLER = 8;
const DELIVERY_IS_SUPER_OVER = 9;
const DELIVERY_WIDE_RUNS = 10;
const DELIVERY_BYE_RUNS = 11;
const DELIVERY_LEG_BYE_RUNS = 12;
const DELIVERY_NO_BALL_RUNS = 13;
const DELIVERY_PENALTY_RUNS = 14;
const DELIVERY_BATSMAN_RUNS = 15;
const DELIVERY_EXTRA_RUNS = 16;
const DELIVERY_TOTAL_RUNS = 17;
const DELIVERY_PLAYER_DISMISSED = 18;
const DELIVERY_DISMISSAL_KIND = 19;
const DELIVERY_FIELDER = 20;
const fs = require('fs');

var matchesList = getMatchesList();
var deliveriesList = getDeliveriesList();

//matchesPlayedPerYear();
matchesWonPerTeam();

function matchesWonPerTeam()
{
    var matchesWonPerTeam = {};
    matchesList.forEach(match => {
        matchesWonPerTeam[match.winner] = (matchesWonPerTeam[ match.winner] == undefined) ? 1 : matchesWonPerTeam[ match.winner] + 1;
    });
    for (key in matchesWonPerTeam) {
        if(key.length!=0)
        {
            console.log(key + "  " + matchesWonPerTeam[key]);
        }
    }
}

function matchesPlayedPerYear() {
    var matchesPlayedPerYear = {};
    matchesList.forEach(match => {
        matchesPlayedPerYear["" + match.date.getFullYear()] = (matchesPlayedPerYear["" + match.date.getFullYear()] == undefined) ? 1 : matchesPlayedPerYear["" + match.date.getFullYear()] + 1;
    });
    for (key in matchesPlayedPerYear) {
        console.log(key + "  " + matchesPlayedPerYear[key]);
    }
}
function getMatchesList() {
    var matchesLines = fs.readFileSync("matches.csv").toString().split("\n");
    matchesLines.shift();
    matchesLines.pop();
    var matchesList = [];
    matchesLines.forEach(line => {
        let fields = line.split(",");
        var adjustingIndex = 0;
        var dateValues = fields[MATCH_DATE].split("-");
        if (line.includes("\"")) {
            adjustingIndex = 1;
        }
        var match = {
            id: fields[MATCH_ID],
            season: fields[MATCH_SEASON],
            city: fields[MATCH_CITY],
            date: new Date(dateValues[0], dateValues[1], dateValues[2]),
            team1: fields[MATCH_TEAM1],
            team2: fields[MATCH_TEAM2],
            tossWinnner: fields[MATCH_TOSS_WINNER],
            tossDecision: fields[MATCH_TOSS_DECISION],
            result: fields[MATCH_RESULT],
            dlApplied: fields[MATCH_DL_APPLIED],
            winner: fields[MATCH_WINNER],
            winByRuns: fields[MATCH_WIN_BY_RUNS],
            winByWickets: fields[MATCH_WIN_BY_WICKETS],
            playerOfMatch: fields[MATCH_PLAYER_OF_MATCH],
            venue: fields[MATCH_VENUE] + (adjustingIndex === 1 ? " ," + fields[MATCH_VENUE + adjustingIndex] : ""),
            umpire1: fields[MATCH_UMPIRE1 + adjustingIndex],
            umpire2: fields[MATCH_UMPIRE2 + adjustingIndex],
        };
        matchesList.push(match);
    });
    return matchesList;
}
function getDeliveriesList() {
    var deliveriesLines = fs.readFileSync("deliveries.csv").toString().split("\n");
    deliveriesLines.shift();
    deliveriesLines.pop();
    var deliveriesList = [];
    deliveriesLines.forEach(line => {
        let fields = line.split(",");
        var delivery = {
            id: fields[DELIVERY_ID],
            inning: fields[DELIVERY_INNING],
            battingTeam: fields[DELIVERY_BATTING_TEAM],
            bowlingTeam: fields[DELIVERY_BOWLING_TEAM],
            over: fields[DELIVERY_OVER],
            ball: fields[DELIVERY_BALL],
            batsman: fields[DELIVERY_BATSMAN],
            nonStriker: fields[DELIVERY_NON_STRIKER],
            bowler: fields[DELIVERY_BOWLER],
            isSuperOver: fields[DELIVERY_IS_SUPER_OVER],
            wideRuns: fields[DELIVERY_WIDE_RUNS],
            byeRuns: fields[DELIVERY_BYE_RUNS],
            legByeRuns: fields[DELIVERY_LEG_BYE_RUNS],
            noBallRuns: fields[DELIVERY_NO_BALL_RUNS],
            penaltyRuns: fields[DELIVERY_PENALTY_RUNS],
            batsmanRuns: fields[DELIVERY_BATSMAN_RUNS],
            extraRuns: fields[DELIVERY_EXTRA_RUNS],
            totalRuns: fields[DELIVERY_TOTAL_RUNS],
            playerDismissed: fields[DELIVERY_PLAYER_DISMISSED],
            dismissalKind: fields[DELIVERY_DISMISSAL_KIND],
            fielder: fields[DELIVERY_FIELDER] == "\r" ? "" : fields[DELIVERY_FIELDER],
        };
        deliveriesList.push(delivery);
    });
}