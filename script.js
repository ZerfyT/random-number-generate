let generatedHistory = [];
let currentGeneration = 0;

let myChart;


function generateRandomNumbers() {
    const usedNumbers = new Set();
    const teams = [];

    while (teams.length < 8) {
        const randomNumber = Math.floor(Math.random() * 8) + 1;
        if (!usedNumbers.has(randomNumber)) {
            usedNumbers.add(randomNumber);
            teams.push(randomNumber);
        }
    }

    generatedHistory.push(teams.slice());
    currentGeneration = generatedHistory.length - 1;

    const resultElement = document.getElementById("result");
    resultElement.textContent = `Team Numbers: ${teams.join(', ')}`;

    // updateCountChart();
}

function updateCountChart() {
    const teamCounts = {}; // Object to store team assignment counts
    for (const teams of generatedHistory) {
        for (const team of teams) {
            if (!teamCounts[team]) {
                teamCounts[team] = 0;
            }
            teamCounts[team]++;
        }
    }

    const chartData = {
        labels: Object.keys(teamCounts),
        datasets: [{
            label: 'Team Assignment Counts',
            data: Object.values(teamCounts),

            borderWidth: 1
        }]
    };

    if (myChart) {
        myChart.destroy(); // Destroy the old chart if it exists
    }

    const ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
            scales: {
                y: {
                        beginAtZero: true,
                        type: 'linear'
                }
            },
            plugins: {
                colors: {
                  enabled: true
                }
              }
        }
    });
}