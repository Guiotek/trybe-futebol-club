import Model from '../../database/models';

const query = `select team_name as name,
count(mt.home_team_id) as totalGames,
sum(case
when home_team_goals > away_team_goals then 3
when home_team_goals = away_team_goals then 1
else 0
end ) as totalPoints,
sum(home_team_goals) as goalsFavor,
sum(away_team_goals) as goalsOwn,
sum(case
when home_team_goals > away_team_goals then 1
else 0
end) as totalVictories,
sum(case
when home_team_goals < away_team_goals then 1
else 0
end) as totalLosses,
sum(case
when home_team_goals = away_team_goals then 1
else 0
end) as totalDraws
from teams as t
inner join matches as mt
on mt.home_team_id = t.id
and mt.in_progress = 0
group by t.id`;

export default class LeaderboardService {
  public getAll = async () => {
    const [allMatches] = await Model.query(query);
    return allMatches;
  };
}
