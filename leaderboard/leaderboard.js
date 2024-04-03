document.addEventListener('DOMContentLoaded', () => {
    fetch('https://back-end-quizz.onrender.com/leaderboard')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Sort the leaderboard data by score in descending order
            const sortedData = data.sort((a, b) => b.score - a.score);

            const leaderboardContainer = document.getElementById('leaderboard');
            if (sortedData.length === 0) {
                leaderboardContainer.innerHTML = '<p>No leaderboard data available.</p>';
            } else {
                // Build the table rows from the sorted data
                let tableRows = sortedData.map((player, index) =>
                    `<tr>
              <td>${index + 1}</td>
              <td>${player.name}</td>
              <td>${player.score}</td>
            </tr>`
                ).join('');

                // Set the innerHTML of the leaderboardContainer with the full table, including headers
                leaderboardContainer.innerHTML = `
            <table>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
              ${tableRows}
            </table>
          `;
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            document.getElementById('leaderboard').innerHTML = '<p>Error loading leaderboard.</p>';
        });
});
