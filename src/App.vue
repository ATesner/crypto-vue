  <template>
  <div id="app">
    <nav id="navbar">
      <h1>CRYPTO VUE</h1>
      <div class="search-form">
        <form>
          <input id="search-input" v-on:blur="blurSearch" v-on:focus="focusSearch" type="text" maxlength="10"
          placeholder="Search Crypto" v-on:keyup="searchCrypto" v-model="txtSearch" v-on:mouseover="focusSearch" />
          <button class="search-button" v-on:click="clickSearch"></button>
          <ul class="instant-result-list" v-on:mouseover="hoverInstantList" v-on:mouseleave="leaveInstantList">
            <li class="instant-result-item" :key="index" v-for="(crypto, index) in resultSearch" >
               <app-item :name="crypto.name" :symbol="crypto.symbol" 
                v-on:click.native="clickResult(crypto.id, crypto.symbol, crypto.name)"></app-item>
            </li>
          </ul>
        </form>
        <h2 id="search-label" v-on:click="clickSearch">Search</h2>
      </div>
    </nav>
    <div class="dashboard-container">
      <div class="asset-overview">
        <div class="asset-overview-panel">
          <h4 id="asset-overview-name"></h4>
          <label id="asset-overview-symbol"></label> <div id="asset-overview-price"></div>
        </div>
        <div class="asset-overview-actions">
          <button class="mybtn add-btn" v-on:click="addCrypto">Ajouter au dashboard</button> <br/> <br/>
          <button class="mybtn clear-btn" v-on:click="reinitDashboard">Réinitialiser dashboard</button>
        </div>
      </div>
      <ul id="dashboard-list">
          <li class="dashboard-item" :key="index" v-for="(crypto, index) in dashboardList">
            <h4>{{crypto.name}}</h4>
            <div>{{crypto.rate}} €</div>
          </li>
      </ul>
    </div>
  </div>
</template>

<script>
module.exports = {
  data: function() {
    return {
      cryptoAssets: [],
      resultSearch: [],
      txtSearch: "",
      instantListFocus: false,
      dashboardList: []
    }
  },
  created: function() {
    this.$http.get('listings/').then((response) => {
      console.log('all assets',response);
      this.cryptoAssets = response.body.data;
      if(localStorage.getItem('dashboardList')){
        this.dashboardList = JSON.parse(localStorage.getItem('dashboardList'));
        console.log('DASHBOARD LIST', this.dashboardList)
      }else{
        this.dashboardList = [];
      }
     // setInterval(this.updateRates, 10000);
      this.updateRates();
     // document.querySelector('#dashboard-list').append('<li>'+ localStorage.asset_name +'</li>');
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
        console.log('Asset Find', this.resultSearch)

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
      console.log('Instant List Focus OFF')
      this.instantListFocus = false;
      document.querySelector('.instant-result-list').style.display = "none";
       
    },
    hoverInstantList: function() { 
      console.log('Instant List Focus ON')
      this.instantListFocus = true;
    },
    focusSearch : function() {
      if(document.querySelector('#search-input').value.length > 2 &&
        document.querySelector('.search-form').classList.contains('active')){
        document.querySelector('.instant-result-list').style.display = "block";
      }
    },
    clickResult : function(id, symbol, name) {
      console.log('Click on ' + symbol)
      this.$http.get('ticker/'+id+'/?convert=EUR').then((response) => {
        console.log('Asset Overview',response);
        // this.resultSearch = response.body;
          let data = response.body.data;
          document.querySelector('#asset-overview-name').innerHTML = name + ' (' + symbol + ')';
          document.querySelector('#asset-overview-symbol').innerHTML = symbol;
          document.querySelector('#asset-overview-price').innerHTML = data.quotes.EUR.price;
          document.querySelector('.add-btn').style.display = "inline-block";
      });
    },
    addCrypto : function() {
      let cryptoToAdd = { 
        name: document.querySelector('#asset-overview-name').innerHTML,
        symbol: document.querySelector('#asset-overview-symbol').innerHTML,
        rate: parseFloat(document.querySelector('#asset-overview-price').innerHTML)
      }
      this.dashboardList.push(cryptoToAdd)
      this.saveDashboardList();
    },
    reinitDashboard: function() {
      this.dashboardList = [];
      localStorage.setItem('dashboardList', undefined);
    },
    updateRates: function() {

      for(let i=0; i<this.dashboardList.length; i++){
        console.log('UPDATERATES')
        this.$http.get('ticker/'+ this.dashboardList[i].id +'/?convert=EUR').then((response) => {
        console.log('Asset UPDATE',response);
        // this.resultSearch = response.body;
          let data = response.body.data;
          this.dashboardList[i].rate = data.quote.EUR.price;
          this.saveDashboardList();
        });
      }
    },
    saveDashboardList: function() {
      console.log('Save DashboardList')
      var parsed = global.JSON.stringify(this.dashboardList);
      localStorage.setItem('dashboardList', parsed);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.mybtn {
/* Text color */
      color: #0099CC; 
/* Remove background color */
      background: transparent; 
/* Border thickness, line style, and color */
      border: 2px solid #0099CC;
/* Adds curve to border corners */
      border-radius: 6px; 
/* Make letters uppercase */
      border: none;
      color: white;
      padding: 12px 24px;
      text-align: center;
      font-size: 12px;
      margin: 2px 2px;
      -webkit-transition-duration: 0.4s; /* Safari */
      transition-duration: 0.4s;
      cursor: pointer;
      text-decoration: none;
      text-transform: uppercase;
      background-color: white; 
      color: black; 
      border: 2px solid #008CBA;
}
/*button on hover*/
 .mybtn:hover {
      background-color: #008CBA;
      color: white;
 }

.add-btn {
  display: none;
}
.clear-btn {
  display: inline-block;
}

#navbar {
  position: absolute;
  display: flex;
  justify-content: space-around;
  background: #222222;
  border-bottom: 4px solid darkorange;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
}

#navbar h1 {
  display: inline-block;
  color: darkorange;
}
#navbar h2 {
  margin-top: 25px;
  margin-left: 70px;
  opacity: 0.8;
  color: darkcyan;
  z-index: 0;
  font-style: italic;
    cursor: pointer;  
}
.instant-result-list {
  position: absolute;
  list-style: none;
  border: 1px solid black;
  height: 20vh;
  width: 75%;
  right: 5px;
  top: 67px;
  background: white;
  overflow-y: scroll;
  margin-top: 0;
  display: none;
  z-index: 2;
  border-radius: 2%;
  box-shadow: 1px 1px 1px 1px darkcyan;
}

.instant-result-item {
  color: darkslategray;
}
.instant-result-item:hover {
  cursor: pointer;
  background-color: lightgrey;
}

.dashboard-container {
  margin-top:100px;
  width: auto;
}

.search-form {
 position: relative;
  width: 290px;
}

.search-form:before {
  content: ' ';
  position: absolute;
  left: 25px;
  top: 35px;
  width: 2px;
  height: 36px;
  transform: scale(0);
  z-index: 3;
  background: rgb(71, 136, 135);
  transition: all 0.5s cubic-bezier(.87, -.41, .19, 1.44);
}

input {
  border-radius: 36px;
  position: absolute;
  width: 50px;
  height: 50px;
  font-size: 20px;
  top: 10px;
  color: darkcyan;
  transition: all 0.5s cubic-bezier(.87, -.41, .19, 1.44);
  z-index: 2;
}

.active input {
  width: 100%;
  padding-left: 25px;
  border-radius: 36px;
}

.search-button {
  background: rgba(255, 255, 255, 1);
  position: absolute;
  height: 100%;
  border-radius: 50%;
  top: 9px;
  width: 60px;
  height: 59px;
  transition: all 0.5s cubic-bezier(.87, -.41, .19, 1.44);
  z-index: 3;
  cursor: pointer;
}

.search-button:after {
  content: ' ';
  position: absolute;
  width: 32px;
  height: 32px;
  left: 0;
  right: 0;
  top: 27px;
  transform: translateY(-50%);
  margin: 0 auto;
  background: darkcyan;
  border-radius: 50%;
}

.search-button:before {
  content: ' ';
  position: absolute;
  width: 24px;
  height: 24px;
  left: 0;
  right: 0;
  top: 15px;
  transform: scale(0);
  transform-origin: left top;
  margin: 0 auto;
  background: white;
  border-radius: 50%;
  z-index: 3;
  transition: all 0.8s ease;
}

.active .search-button {
  transform: translateX(260px);
}

.active .search-button:before {
  transform: scale(1);
}

::-webkit-scrollbar {
    width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #f1f1f1; 
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #888; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555; 
}

.asset-overview-actions, .asset-overview-panel {
  display: inline-block;
}
.asset-overview-symbol {
  display: none;
}

#dashboard-list {
  list-style: none;
  margin: none;
  width: 90%;
}

.dashboard-item {
    border: 1px solid darkslategray;
    width: 80%;
    margin-bottom: 10px;
    padding: 0 0 10px 10px;
    background-color: #2c3e50;
    color: white;
}
</style>
