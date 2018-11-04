var {currencies} = require('./assets/currencies')

module.exports = {
  data: function() {
    return {
        imgUrl: "https://s2.coinmarketcap.com/static/img/coins/64x64/",
        cryptoAssets: [],
        cryptoSelected: null,
        resultSearch: [],
        txtSearch: "",
        instantListFocus: false,
        dashboardList: [],
        currencies: currencies,
        currency: currencies[0],
        updating: false
    }
  },
  created: function() {
    //console.log("currencies",currencies);
    this.$http.get('listings/').then((response) => {
      //console.log('all assets', response);
      this.cryptoAssets = response.body.data;
      if(localStorage.getItem('dashboardList')){
        this.dashboardList = JSON.parse(localStorage.getItem('dashboardList'));
        if(localStorage.getItem('currency') != null){
          console.log('search currency', localStorage.getItem('currency'))
          this.currency = this.currencies.find(c => c.name == localStorage.getItem('currency'));
        }
        console.log('DASHBOARD LIST', this.dashboardList, "Currency", this.currency, "Currencies", currencies)
      }else{
        this.dashboardList = [];
      }
      setInterval(this.updateRates, 60000);
    });
  },
  methods: {
    searchCrypto: function(e) {
      if(this.cryptoAssets.length > 0 && this.txtSearch.length >= 2){
        document.querySelector('.instant-result-list').style.display = "block";

        this.resultSearch = this.cryptoAssets.filter(asset => (
          asset.name.toLowerCase().includes(this.txtSearch.toLowerCase()) ||  
          asset.symbol.toLowerCase().includes(this.txtSearch.toLowerCase())
        )) 
        //console.log('Asset Find', this.resultSearch)

      }else{
        this.resultSearch = [];
        document.querySelector('.instant-result-list').style.display = "none";
      }
    },
    clickSearch : function(e) {
        e.preventDefault();
        document.querySelector('.search-form').classList.toggle('active');
        document.querySelector('.instant-result-list').style.display = "none";
        document.querySelector('input').focus();
    },
    blurSearch: function() {
      if(!this.instantListFocus) document.querySelector('.instant-result-list').style.display = "none";
      if(document.querySelector('#search-input').value.length == 0 ){
        document.querySelector('.search-form').classList.remove('active');
      }
    },
    leaveInstantList: function() { 
      //console.log('Instant List Focus OFF')
      this.instantListFocus = false;
      document.querySelector('.instant-result-list').style.display = "none";
       
    },
    hoverInstantList: function() { 
      //console.log('Instant List Focus ON')
      this.instantListFocus = true;
    },
    focusSearch : function() {
      if(document.querySelector('#search-input').value.length > 2 &&
        document.querySelector('.search-form').classList.contains('active')){
        document.querySelector('.instant-result-list').style.display = "block";
      }
    },
    clickResult : function(crypto) {
      //console.log('Click on ' + crypto.name)
      this.$http.get('ticker/'+crypto.id+'/?convert=EUR').then((response) => {
        //console.log('Asset Overview', crypto, response);
        crypto.price = response.body.data.quotes[this.currency.name].price;
        crypto.market_cap = response.body.data.quotes[this.currency.name].market_cap;
        crypto.img = this.imgUrl + crypto.id + ".png";
        this.cryptoSelected = crypto;
      });
    },
    addCrypto : function() {
      //console.log('addCrypto', this.cryptoSelected);
      if(!this.cryptoAlreadyAdded(this.cryptoSelected)){
        this.dashboardList.push(this.cryptoSelected)
        this.saveDashboardList();
      }
    },
    cryptoAlreadyAdded: function(assetToAdd) {
      return (this.dashboardList.find(asset => asset.id == assetToAdd.id) ?
        true : false);
    },
    deleteCrypto: function(index) {
      //console.log('DELETE CRYPTO', index, this.dashboardList[index].name, this.dashboardList)
      if(window.confirm('Delete this asset ? ' + this.dashboardList[index].name)){
          this.dashboardList.splice(index, 1);
          this.saveDashboardList();
      }
    },
    reinitDashboard: function() {
      if(window.confirm('Delete all dashboard assets ?')){
        this.dashboardList = [];
        localStorage.setItem('dashboardList', undefined);
        this.saveDashboardList();
      }
    },
    updateRates: function() {
      if(!this.updating){
        this.updating = true;
        for(let i=0; i<this.dashboardList.length; i++){
          //console.log('UPDATERATES')
          this.$http.get('ticker/'+ this.dashboardList[i].id +'/?convert='+this.currency.name).then((response) => {
            // console.log('Asset UPDATE',response);
            let data = response.body.data;
            this.dashboardList[i].price = data.quotes[this.currency.name].price;
            this.dashboardList[i].market_cap = data.quotes[this.currency.name].market_cap;
          });
        }
        this.saveDashboardList();
        if(this.cryptoSelected != null){
          this.$http.get('ticker/'+ this.cryptoSelected.id +'/?convert='+this.currency.name).then((response) => {
            let tmp = this.cryptoSelected;
            tmp.price =  response.body.data.quotes[this.currency.name].price;
            tmp.market_cap = response.body.data.quotes[this.currency.name].market_cap;
            this.cryptoSelected = null;
            this.cryptoSelected = tmp;
            console.log('UPDATE cryptoSelected', this.cryptoSelected);
            this.updating = false;
          });
        }else{
          this.updating = false;
        }
      }
    },
    saveDashboardList: function() {
      //console.log('Save DashboardList')
      var parsed = global.JSON.stringify(this.dashboardList);
      localStorage.setItem('dashboardList', parsed);
      localStorage.setItem('currency', this.currency.name);
    },
    currencyChange: function() {
      //console.log('currencyChange', this.currency)
      this.updateRates();
    }
  }
}
