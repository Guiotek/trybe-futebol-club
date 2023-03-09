import Model from '../../database/models';

const query = `select team_name as name,
sum(case
when home_team_goals > away_team_goals then 3
when home_team_goals = away_team_goals then 1
else 0
end ) as totalPoints,
count(home_team_id) as totalGames,
sum(case
when home_team_goals > away_team_goals then 1
else 0
end) as totalVictories,
sum(case
when home_team_goals = away_team_goals then 1
else 0
end) as totalDraws,
sum(case
when home_team_goals < away_team_goals then 1
else 0
end) as totalLosses,
sum(home_team_goals) as goalsFavor,
sum(away_team_goals) as goalsOwn,
sum(home_team_goals - away_team_goals) as goalsBalance,
round(sum(case
when home_team_goals > away_team_goals then 3
when home_team_goals = away_team_goals then 1
else 0
end) / 
(count(home_team_id) * 3) * 100, 2) as efficiency
from teams as t
inner join matches as mt
on mt.home_team_id = t.id
and mt.in_progress = 0
group by t.id
order by totalVictories desc,
goalsBalance desc,
goalsFavor desc,
goalsOwn desc
`;

export default class LeaderboardService {
  public getAll = async () => {
    const [allMatches] = await Model.query(query);
    return allMatches;
  };
}
