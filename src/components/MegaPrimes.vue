<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <p>
            A megaprime is a prime number who's individual digits are also prime numbers.<br /><br />
            This web app will calculate all the megaprime numbers up to a given number (inclusive).<br /><br />
            Just enter a positive number that is less than or equal to 4294967295 and click 'Calculate'.
        </p>
        <input type="number" v-model="number" />
        <button v-on:click="calculate">Calculate</button>
        <p v-if="error">{{error}}</p>
        <div v-if="megaPrimes">
            <p>{{results}}</p>
            <p>{{timeTaken}}</p>
            <p>{{megaPrimes}}</p>
        </div>
    </div>
</template>

<script>
    var MegaPrimesCalc = require('../MegaPrimesCalc.js')
    export default {
        name: 'MegaPrimes',
        props: {
            msg: String,
        },
        data: function () {
            return {
                megaPrimes: null,
                timeTaken: null,
                results: null,
                error: null
            }
        },
        methods: {
            calculate: function () {
                this.megaPrimes = null
                this.timeTaken = null
                this.results = null
                this.error = null

                if (this.number < 0 || this.number > 4294967295) {
                    this.error = 'Please enter a positive number that is less than or equal to 4294967295'
                    return;
                }

                const start = performance.now()
                this.megaPrimes = MegaPrimesCalc.Fast(this.number)
                const end = performance.now()
                const seconds = (end - start) / 1000 

                this.results = `There are ${this.megaPrimes.length} megaprime numbers up to and including the number ${this.number}`
                this.timeTaken = `Time take is ${seconds} seconds`
            }
        }
    }</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
