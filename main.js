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
const BALLS_BOWLED=0;
const RUNS_GIVEN=1;
const fs = require('fs');

var matches = getmatches();
var deliveries = getdeliveries();
matchesPlayedPerYear();
matchesWonPerTeam();
extraRunsConcededPerTeamIn2016();
topEconomicalBowlersIn2015();
function getmatches() {
    var matchesLines = fs.readFileSync("matches.csv").toString().split("\n");
    matchesLines.shift();
    matchesLines.pop();
    var matches = [];
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
        matches.push(match);
    });
    return matches;
}
function getdeliveries() {
    var deliveriesLines = fs.readFileSync("deliveries.csv").toString().split("\n");
    deliveriesLines.shift();
    deliveriesLines.pop();
    var deliveries = [];
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
        deliveries.push(delivery);
    });
    return deliveries;
}
function matchesPlayedPerYear() {
    console.log("Number of matches played per year of all the years in IPL");
    var matchesPlayedPerYear = {};
    matches.forEach(match => {
        matchesPlayedPerYear["" + match.date.getFullYear()] = (matchesPlayedPerYear["" + match.date.getFullYear()] == undefined) ? 1 : matchesPlayedPerYear["" + match.date.getFullYear()] + 1;
    });
    for (year in matchesPlayedPerYear) {
        console.log(year + "  " + matchesPlayedPerYear[year]);
    }
}
function matchesWonPerTeam() {
    console.log("Number of matches won of all teams over all the years of IPL");
    var matchesWonPerTeam = {};
    matches.forEach(match => {
        matchesWonPerTeam[match.winner] = (matchesWonPerTeam[match.winner] == undefined) ? 1 : matchesWonPerTeam[match.winner] + 1;
    });
    for (teamName in matchesWonPerTeam) {
        if (teamName.length != 0) {
            console.log(teamName + "  " + matchesWonPerTeam[teamName]);
        }
    }
}
function extraRunsConcededPerTeamIn2016() {
    console.log("For the year 2016 get the extra runs conceded per team");
    var teamNameWithRunsConceded = {};
    deliveries.forEach(function (delivery) {
        if (matches[delivery.id - 1].date.getFullYear() == 2016) {
            if (teamNameWithRunsConceded[delivery.bowlingTeam] == undefined) {
                teamNameWithRunsConceded[delivery.bowlingTeam] = Number(delivery.extraRuns);
            }
            else {
                teamNameWithRunsConceded[delivery.bowlingTeam] += Number(delivery.extraRuns);
            }
        }
    });
    for (teamName in teamNameWithRunsConceded) {
        console.log(teamName + "  " + teamNameWithRunsConceded[teamName]);
    }
}
function topEconomicalBowlersIn2015() {
    console.log("For the year 2015 get the top economical bowlers");
    var topEconomicalBowlers = {};
    deliveries.forEach(function (delivery) {
        if (matches[delivery.id - 1].date.getFullYear() == 2015) {
            var runs = getInt(delivery.noBallRuns) + getInt(delivery.extraRuns) + getInt(delivery.batsmanRuns) + getInt(delivery.wideRuns);
            if (topEconomicalBowlers[delivery.bowler] == undefined) {
                topEconomicalBowlers[delivery.bowler] = [1, runs];
            }
            else {
                topEconomicalBowlers[delivery.bowler][BALLS_BOWLED]++;
                topEconomicalBowlers[delivery.bowler][RUNS_GIVEN] += runs;
            }
        }
    });
    var bowlersNames = [];
    var bowlersEconomies = [];
    for (bowlerName in topEconomicalBowlers) {
        var bowlerEconomyDetails = topEconomicalBowlers[bowlerName];
        var economy = bowlerEconomyDetails[RUNS_GIVEN] / (bowlerEconomyDetails[BALLS_BOWLED] / 6.0);
        economy = Number(economy.toFixed(3));
        bowlersNames.push(bowlerName);
        bowlersEconomies.push(economy);
    }
    for (var i = 0; i < bowlersEconomies.length; i++) {
        for (var j = i + 1; j < bowlersEconomies.length; j++) {
            if (bowlersEconomies[i] > bowlersEconomies[j]) {
                var temp = bowlersEconomies[i];
                bowlersEconomies[i] = bowlersEconomies[j];
                bowlersEconomies[j] = temp;
                temp = bowlersNames[i];
                bowlersNames[i] = bowlersNames[j];
                bowlersNames[j] = temp;
            }
        }
    }
    for (var i = 0; i < bowlersEconomies.length; i++) {
        console.log(bowlersEconomies[i] + "     " + bowlersNames[i]);
    }
}
function getInt(num) {
    if (Number(num) == NaN)
        return 0;
    return Number(num);
}