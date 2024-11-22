<template>
    <div class="exchange-container">
        <h1 class="title">Currency Exchange</h1>

        <div class="input-container">
            <input v-model="amount" type="number" class="amount-input" placeholder="Amount" />

            <div class="select-container">
                <select v-model="currency1" class="currency-select">
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="JPY">JPY</option>
                    <option value="RUB">RUB</option>
                </select>

                <span class="arrow">→</span> <!-- Arrow to show the direction of conversion -->

                <select v-model="currency2" class="currency-select">
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="JPY">JPY</option>
                    <option value="RUB">RUB</option>
                </select>
            </div>
        </div>

        <p v-if="conversionResult !== null" class="conversion-result">
            Converted Amount: {{ conversionResult }} {{ currency2 }}
        </p>
    </div>
</template>

<script>
import { ref, watch } from 'vue'
import axios from 'axios'

export default {
    name: 'Exchange',
    setup() {
        const amount = ref(0)
        const currency1 = ref('USD')
        const currency2 = ref('EUR')
        const conversionResult = ref(null)

        const API_URL = 'https://api.exchangerate-api.com/v4/latest/'

        const getConversionRate = async () => {
            if (amount.value > 0) {
                try {
                    const response = await axios.get(`${API_URL}${currency1.value}`)
                    const rate = response.data.rates[currency2.value]
                    conversionResult.value = (amount.value * rate).toFixed(2)
                } catch (error) {
                    console.error('Error fetching exchange rate:', error)
                }
            }
        }

        watch([amount, currency1, currency2], getConversionRate)

        return { amount, currency1, currency2, conversionResult }
    }
}
</script>

<style scoped>
.exchange-container {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    background-color: #ffffff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.title {
    text-align: center;
    font-size: 1.8rem;
    margin-bottom: 20px;
    color: #333;
}

.input-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.amount-input {
    padding: 12px;
    font-size: 1rem;
    border-radius: 4px;
    border: 1px solid #ddd;
    outline: none;
    transition: border-color 0.2s ease;
}

.amount-input:focus {
    border-color: #3b82f6;
}

.select-container {
    display: flex;
    align-items: center;
    gap: 12px;
    justify-content: center;
}

.currency-select {
    padding: 12px;
    font-size: 1rem;
    border-radius: 4px;
    border: 1px solid #ddd;
    outline: none;
    transition: border-color 0.2s ease;
}

.currency-select:focus {
    border-color: #3b82f6;
}

.arrow {
    font-size: 1.5rem;
    color: #333;
}

.conversion-result {
    text-align: center;
    margin-top: 20px;
    font-size: 1.2rem;
    font-weight: bold;
    color: #3b82f6;
}
</style>
