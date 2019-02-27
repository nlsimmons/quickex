if(typeof window.localStorage.rates === 'undefined')
{
    fetchRates();
}

var vue = new Vue({
    el: '#root',
    data: {
        selling: 100,
        buying: 100,
        rate: 1,
        select_selling_currency: 'USD',
        select_buying_currency: 'USD',
        supported_currencies: ['AED','AFN','ALL','AMD','ANG','AOA','ARS','AUD','AWG','AZN','BAM','BBD','BDT','BGN','BHD','BIF','BMD','BND','BOB','BRL','BSD','BTC','BTN','BWP','BYN','BYR','BZD','CAD','CDF','CHF','CLF','CLP','CNY','COP','CRC','CUC','CUP','CVE','CZK','DJF','DKK','DOP','DZD','EGP','ERN','ETB','EUR','FJD','FKP','GBP','GEL','GGP','GHS','GIP','GMD','GNF','GTQ','GYD','HKD','HNL','HRK','HTG','HUF','IDR','ILS','IMP','INR','IQD','IRR','ISK','JEP','JMD','JOD','JPY','KES','KGS','KHR','KMF','KPW','KRW','KWD','KYD','KZT','LAK','LBP','LKR','LRD','LSL','LTL','LVL','LYD','MAD','MDL','MGA','MKD','MMK','MNT','MOP','MRO','MUR','MVR','MWK','MXN','MYR','MZN','NAD','NGN','NIO','NOK','NPR','NZD','OMR','PAB','PEN','PGK','PHP','PKR','PLN','PYG','QAR','RON','RSD','RUB','RWF','SAR','SBD','SCR','SDG','SEK','SGD','SHP','SLL','SOS','SRD','STD','SVC','SYP','SZL','THB','TJS','TMT','TND','TOP','TRY','TTD','TWD','TZS','UAH','UGX','USD','UYU','UZS','VEF','VND','VUV','WST','XAF','XAG','XAU','XCD','XDR','XOF','XPF','YER','ZAR','ZMK','ZMW','ZWL'],
        update_stack: [],
        is_updating: false,
        inversed: false,
    },
    computed: {
        rates: function() {
            return JSON.parse( window.localStorage.rates ).rates;
        },
        last_updated: function() {
            return JSON.parse( window.localStorage.rates ).timestamp;
        },
        market_rate: function() {
            let selling_rate = this.rates[this.select_selling_currency];
            let buying_rate = this.rates[this.select_buying_currency];
            let your_rate = this.rate;

            let rate = buying_rate / selling_rate;

            if( (your_rate > 1 && rate < 1) || (your_rate < 1 && rate > 1) )
            {
                this.inversed = true;
                return 1 / rate;
            }
            else
            {
                this.inversed = false;
                return rate;
            }
        },
        percentage: function() {
            let diff = (this.market_rate - this.rate) / this.market_rate * 100;
            let diff_abs = Math.abs(diff);

            return `You are getting ripped off by ${diff_abs.toFixed(3)}%`;
        },
        selling_display: {
            get: function() {
                return this.selling;
            },
            set: function(val) {
                this.updateStack('sell');

                this.selling = val;
                this.update();
            }
        },
        buying_display: {
            get: function() {
                return this.buying;
            },
            set: function(val) {
                this.updateStack('buy');

                this.buying = val;
                this.update();
            }
        },
        rate_display: {
            get: function() {
                return this.rate;
            },
            set: function(val) {
                this.updateStack('rate');

                this.rate = val;
                this.update();
            }
        },
    },
    watch: {
        select_selling_currency: function() {
            this.updateStack('sell');
        },
        select_buying_currency: function() {
            this.updateStack('buy');
        }
    },
    methods: {
        swap: function() {
            let old_sell_value = this.selling;
            let old_buy_value = this.buying;

            let old_sell_cur = this.select_selling_currency;
            let old_buy_cur = this.select_buying_currency;

            this.selling = old_buy_value;
            this.buying = old_sell_value;
            this.select_selling_currency = old_buy_cur;
            this.select_buying_currency = old_sell_cur;
            this.rate = 1 / this.rate;
        },
        fetch: function() {
            fetchRates();
        },
        updateStack: function(field) {
            if(field == this.update_stack[this.update_stack.length-1])
            {
                return;
            }

            let len = this.update_stack.push(field);
            if(len > 2)
            {
                this.update_stack.shift();
            }
        },
        updateWhich: function() {
            if(this.update_stack.length < 2)
            {
                return null;
            }
            else
            {
                for(let a of ['buy','sell','rate'])
                {
                    if(this.update_stack.indexOf(a) === -1)
                    {
                        return a;
                    }
                }
            }
        },
        update: function() {
            if(this.is_updating)
            {
                return;
            }

            this.is_updating = true;

            let rate = this.inversed ? 1 / this.rate : this.rate;

            switch( this.updateWhich() )
            {
                case 'buy':
                    this.buying = (rate * this.selling).toFixed(3);
                    break;
                case 'sell':
                    this.selling = (this.buying / rate).toFixed(3);
                    break;
                case 'rate':
                    this.rate = (this.buying / this.selling).toFixed(3);
                    break;
            }

            this.is_updating = false;
        },
        lastUpdated: function() {
            let date = new Date(this.last_updated * 1000);
            let now = new Date();

            let diff_in_minutes = Math.round((now - date) / 1000 / 60);

            return `${diff_in_minutes} minutes ago`;
        }
    }
});

function fetchRates()
{
    fetch('http://apilayer.net/api/live?access_key=4327ea63f6d109ed76bb4bdd23e25e3b')
        .then( res => res.json() )
        .then( res => {
            let timestamp = res.timestamp;
            let rates = {};

            for(let cur in res.quotes)
            {
                let _cur = cur.substring(3, 6);
                rates[_cur] = res.quotes[cur];
            }

            let data = JSON.stringify( { timestamp, rates } );
            window.localStorage.setItem('rates', data);
        });
}