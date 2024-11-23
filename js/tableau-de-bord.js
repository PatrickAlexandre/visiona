        // Initialiser le graphique
        function renderChart() {
            const options = {
                chart: { type: 'line', height: 200 },
                series: [{
                    name: "Score",
                    data: leaderboard.map(player => player.score),
                }],
                xaxis: { categories: leaderboard.map(player => player.name) },
                colors: ['#6c63ff']
            };
            const chart = new ApexCharts(document.querySelector("#chart"), options);
            chart.render();
        }