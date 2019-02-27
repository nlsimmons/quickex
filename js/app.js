if(typeof window.localStorage.rates === 'undefined')
{
    let def = {"timestamp":1551261727,"rates":{"AED":3.67305,"AFN":75.245936,"ALL":110.649418,"AMD":487.765017,"ANG":1.800699,"AOA":314.171991,"ARS":38.879736,"AUD":1.39535,"AWG":1.8,"AZN":1.705006,"BAM":1.717008,"BBD":1.9968,"BDT":84.133988,"BGN":1.71665,"BHD":0.37705,"BIF":1798.55,"BMD":1,"BND":1.35075,"BOB":6.91015,"BRL":3.748955,"BSD":0.99755,"BTC":0.000261,"BTN":71.314238,"BWP":10.489832,"BYN":2.13415,"BYR":19600,"BZD":2.010798,"CAD":1.314545,"CDF":1630.000331,"CHF":0.99697,"CLF":0.025048,"CLP":648.192708,"CNY":6.678702,"COP":3083,"CRC":606.689879,"CUC":1,"CUP":26.5,"CVE":96.805502,"CZK":22.48698,"DJF":177.720497,"DKK":6.547397,"DOP":50.494974,"DZD":118.525017,"EGP":17.506879,"ERN":15.000338,"ETB":28.399499,"EUR":0.877505,"FJD":2.11315,"FKP":0.75999,"GBP":0.75304,"GEL":2.67499,"GGP":0.752981,"GHS":5.479608,"GIP":0.760322,"GMD":49.560006,"GNF":9100.103591,"GTQ":7.697099,"GYD":208.174973,"HKD":7.84965,"HNL":24.378988,"HRK":6.518302,"HTG":82.293981,"HUF":277.631972,"IDR":14028,"ILS":3.618799,"IMP":0.752981,"INR":71.295025,"IQD":1190.4,"IRR":42105.000414,"ISK":119.45986,"JEP":0.752981,"JMD":130.791035,"JOD":0.708803,"JPY":110.425011,"KES":100.079647,"KGS":69.646798,"KHR":3981.391881,"KMF":432.49567,"KPW":900.046911,"KRW":1118.849759,"KWD":0.303299,"KYD":0.831395,"KZT":377.069744,"LAK":8562.649899,"LBP":1504.650234,"LKR":179.789744,"LRD":161.350003,"LSL":13.849765,"LTL":2.95274,"LVL":0.60489,"LYD":1.38355,"MAD":9.52975,"MDL":17.1235,"MGA":3513.999752,"MKD":54.000027,"MMK":1516.802388,"MNT":2633.318223,"MOP":8.066102,"MRO":357.000218,"MUR":34.171498,"MVR":15.460013,"MWK":728.60498,"MXN":19.15123,"MYR":4.068399,"MZN":62.644985,"NAD":13.880133,"NGN":360.410282,"NIO":32.784502,"NOK":8.537302,"NPR":113.17031,"NZD":1.453976,"OMR":0.384995,"PAB":1.00025,"PEN":3.307399,"PGK":3.360903,"PHP":51.789803,"PKR":139.820074,"PLN":3.7896,"PYG":6073.350144,"QAR":3.641014,"RON":4.166503,"RSD":103.689925,"RUB":65.749014,"RWF":897.355,"SAR":3.751103,"SBD":8.10565,"SCR":13.658981,"SDG":47.502995,"SEK":9.262499,"SGD":1.347704,"SHP":1.3209,"SLL":8599.999831,"SOS":581.000114,"SRD":7.458015,"STD":21050.59961,"SVC":8.729402,"SYP":514.999639,"SZL":13.833502,"THB":31.373501,"TJS":9.412403,"TMT":3.51,"TND":3.043098,"TOP":2.25155,"TRY":5.296398,"TTD":6.78545,"TWD":30.765991,"TZS":2350.397572,"UAH":26.968014,"UGX":3667.400874,"USD":1,"UYU":32.709729,"UZS":8383.399602,"VEF":9.987495,"VND":23200.2,"VUV":113.346668,"WST":2.599434,"XAF":575.909608,"XAG":0.063063,"XAU":0.000754,"XCD":2.70255,"XDR":0.715617,"XOF":575.809766,"XPF":104.700108,"YER":250.349909,"ZAR":13.84725,"ZMK":9001.193427,"ZMW":11.946001,"ZWL":322.355011}};

    let default_data = JSON.stringify(def);
    window.localStorage.setItem('rates', default_data);

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