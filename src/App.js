module.exports = {
  data: function() {
    return {
        imgUrl: "https://s2.coinmarketcap.com/static/img/coins/32x32/",
        cryptoAssets: [],
        cryptoSelected: null,
        resultSearch: [],
        txtSearch: "",
        instantListFocus: false,
        dashboardList: []
    }
  },
  created: function() {
    this.$http.get('listings/').then((response) => {
      //console.log('all assets', response);
      this.cryptoAssets = response.body.data;
      if(localStorage.getItem('dashboardList')){
        this.dashboardList = JSON.parse(localStorage.getItem('dashboardList'));
        console.log('DASHBOARD LIST', this.dashboardList)
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
        this.cryptoSelected = crypto;
        this.$http.get('ticker/'+crypto.id+'/?convert=EUR').then((response) => {
                //console.log('Asset Overview',response);
                let data = response.body.data;
                this.cryptoSelected.price = data.quotes.EUR.price;
                document.querySelector('#asset-overview-image').src = this.imgUrl+crypto.id+".png";
                document.querySelector('#asset-overview-name').innerHTML = crypto.name + ' (' + crypto.symbol + ')';
                document.querySelector('#asset-overview-price').innerHTML = data.quotes.EUR.price;
        });
    },
    addCrypto : function() {
      this.dashboardList.push(this.cryptoSelected)
      this.saveDashboardList();
    },
    deleteCrypto: function(index) {
        //console.log('DELETE CRYPTO', index, this.dashboardList[index].name, this.dashboardList)
        this.dashboardList.splice(index, 1);
        this.saveDashboardList();
    },
    reinitDashboard: function() {
      this.dashboardList = [];
      localStorage.setItem('dashboardList', undefined);
    },
    updateRates: function() {

      for(let i=0; i<this.dashboardList.length; i++){
        //console.log('UPDATERATES')
        this.$http.get('ticker/'+ this.dashboardList[i].id +'/?convert=EUR').then((response) => {
            console.log('Asset UPDATE',response);
          let data = response.body.data;
          this.dashboardList[i].price = data.quotes.EUR.price;
          this.saveDashboardList();
        });
      }
    },
    saveDashboardList: function() {
      //console.log('Save DashboardList')
      var parsed = global.JSON.stringify(this.dashboardList);
      localStorage.setItem('dashboardList', parsed);
    }
  }
}
