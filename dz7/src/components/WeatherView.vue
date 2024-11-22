<template>
    <div>
        <h1>Weather Information</h1>
        <input v-model="location" placeholder="Enter location" @input="fetchWeather" />

        <p>Прогноз погоды на <input v-model="days" type="range" min="1" max="3" @input="fetchWeather"></input><span>{{ days }}</span> дней</p>

        <div v-if="Object.keys(current).length > 0">
            <h2>Сейчас:</h2>
            <p>Место: {{ current.city }}, {{ current.country }}</p>
            <p>Локальное время: {{ current.localtime }}</p>
            <p>Температура {{ current.temp_c }} °C</p>
            <div class="iconline">
                <p>
                    {{ current.text }}
                </p>
                <img :src="current.icon" alt="">
            </div>
            <Forecast :forecast="forecast" :key="forecast.length"></Forecast>
        </div>

        <p v-if="errorMessage" class="error">
            {{ errorMessage }}
        </p>

    </div>
</template>

<script>
import { ref, watch } from 'vue'
import axios from 'axios'
import Forecast from "./Forecast.vue"

export default {
    name: 'Weather',
    setup() {
        const location = ref('')
        const temperature = ref(null)
        const current = ref({})
        const errorMessage = ref('')
        const days = ref(0)
        const forecast = ref([])

        const API_URL = 'https://api.weatherapi.com/v1/forecast.json'
        const API_KEY = '772449e8a74d4b1ab5f135400241904'

        const fetchWeather = async () => {
            if (location.value.trim()) {
                const url = `${API_URL}?key=${API_KEY}&q=${location.value}&days=${days.value}&aqi=no`

                try {
                    const response = await axios.get(url)
                    current.value = {
                        city: response.data.location.name,
                        country: response.data.location.country,
                        localtime: response.data.location.localtime,
                        temp_c: response.data.current.temp_c,
                        text: response.data.current.condition.text,
                        icon: response.data.current.condition.icon
                    };
                    forecast.value = response.data.forecast.forecastday;
                    errorMessage.value = ''
                } catch (error) {
                    console.error('Error fetching weather:', error)
                    current.value = {}
                    errorMessage.value = 'Unable to fetch weather data. Please check the location.'
                }
            }
        }

        watch([location, days], fetchWeather)



        return { location, days, current, forecast, temperature, errorMessage }
    },
    components: {
        Forecast
    }
}
</script>

<style scoped>
.error {
    color: red;
}

.iconline {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
}
</style>