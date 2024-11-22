<script setup>
const props = defineProps(['forecast'])

console.log("here", props.forecast)
</script>

<template>
    <h2>В ближайшие дни:</h2>
    <table class="forecast-table">
        <thead>
            <tr>
                <th>Date</th>
                <th>Avg Temp (°C)</th>
                <th>Min Temp (°C)</th>
                <th>Max Temp (°C)</th>
                <th>Rain Chance (%)</th>
                <th>Condition</th>
                <th>Sunrise</th>
                <th>Sunset</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="daycast in props.forecast" :key="daycast.date">
                <td>{{ daycast.date }}</td>
                <td>{{ daycast.day.avgtemp_c }}</td>
                <td>{{ daycast.day.mintemp_c }}</td>
                <td>{{ daycast.day.maxtemp_c }}</td>
                <td>{{ daycast.day.daily_chance_of_rain }} %</td>
                <td>
                    <div class="condition">
                        <p>{{ daycast.day.condition.text }}</p>
                        <img :src="daycast.day.condition.icon" alt="Weather icon" />
                    </div>
                </td>
                <td>{{ daycast.astro.sunrise }}</td>
                <td>{{ daycast.astro.sunset }}</td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
.forecast-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.forecast-table th,
.forecast-table td {
    padding: 12px;
    text-align: left;
    font-size: 14px;
}

.forecast-table th {
    background-color: #f4f4f4;
    font-weight: bold;
    color: #333;
}

.forecast-table tbody tr {
    border-bottom: 1px solid #e0e0e0;
}

.forecast-table tbody tr:hover {
    background-color: #f9f9f9;
}

.forecast-table td img {
    width: 24px;
    height: 24px;
}

.condition {
    display: flex;
    align-items: center;
    gap: 8px;
}
</style>
