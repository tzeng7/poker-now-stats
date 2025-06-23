import './StatsTable.css';
export default function StatsTable({data}) {
    if (!data || typeof data !== "object") return null;
    return (
        <table>
            <tbody>
                <tr>
                    <th>Player</th>
                    <th>Hands Played</th>
                    <th>VPIP Count</th>
                    <th>VPIP%</th>
                    <th>3B Count</th>
                    <th>3B%</th>
                </tr>
                {Object.entries(data).map(([player, stats]) => {
                    const {hands_played, vpip_count, three_bet_count} = stats;
                    const vpipPercent = hands_played ? ((vpip_count / hands_played) * 100).toFixed(1) : "0.0";
                    const threeBetPercent = hands_played ? ((three_bet_count / hands_played) * 100).toFixed(1) : "0.0";
                    return (
                    <tr key={player}>
                        <td>{player}</td>
                        <td>{hands_played}</td>
                        <td>{vpip_count}</td>
                        <td>{vpipPercent}</td>
                        <td>{three_bet_count}</td>
                        <td>{threeBetPercent}</td>
                    </tr>
                    );
                })}
            </tbody>
        </table>
    )
}