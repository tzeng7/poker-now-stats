import './StatsTable.css';

export default function StatsTable({ data }) {
    if (!data || typeof data !== "object") return null;

    const players = Object.entries(data).sort((a, b) => b[1].hands_played - a[1].hands_played);

    return (
        <div className="table-wrapper">
            <table className="stats-table">
                <thead>
                    <tr>
                        <th className="player-col">Player</th>
                        <th>Hands</th>
                        <th>VPIP</th>
                        <th>VPIP%</th>
                        <th>PFR%</th>
                        <th>3-Bet</th>
                        <th>3-Bet%</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map(([player, stats]) => {
                        const { hands_played, vpip_count, three_bet_count, pfr_count } = stats;
                        const vpipPercent = hands_played ? ((vpip_count / hands_played) * 100).toFixed(1) : "0.0";
                        const threeBetPercent = hands_played ? ((three_bet_count / hands_played) * 100).toFixed(1) : "0.0";
                        const pfrPercent = hands_played ? ((pfr_count / hands_played) * 100).toFixed(1) : "0.0";

                        return (
                            <tr key={player}>
                                <td className="player-col">
                                    <span className="player-name">{player}</span>
                                </td>
                                <td>{hands_played}</td>
                                <td>{vpip_count}</td>
                                <td className="percent-cell">{vpipPercent}%</td>
                                <td className="percent-cell">{pfrPercent}%</td>
                                <td>{three_bet_count}</td>
                                <td className="percent-cell">{threeBetPercent}%</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
