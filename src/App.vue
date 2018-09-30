  <template>
  <div id="app">
    <nav id="navbar">
      <h1>CRYPTO VUE</h1>
      <div class="search-form">
        <form>
          <input id="search-input" v-on:blur="blurSearch" v-on:focus="focusSearch" type="text" maxlength="10"
          placeholder="Search Crypto" v-on:keyup="searchCrypto" v-model="txtSearch" />
          <button v-on:click="clickSearch"></button>
      <ul class="instant-result-list">
        <li class="instant-result-item" :key="index" v-for="(crypto, index) in resultSearch">
          <app-item :name="crypto.name" :symbol="crypto.asset_id"></app-item>
        </li>
      </ul>
        </form>
        <h2 id="search-label" v-on:click="clickSearch">Search</h2>
      </div>
    </nav>
  </div>
</template>

<script>
module.exports = {
  data: function() {
    return {
      cryptoAssets: [],
      resultSearch: [],
      txtSearch: ""
    }
  },
  created: function() {
    this.$http.get('v1/assets').then((response) => {
      console.log('all assets',response);
      this.cryptoAssets = response.body;
    });
  },
  methods: {
    searchCrypto: function(e) {
      if(this.cryptoAssets.length > 0 && this.txtSearch.length >= 2){
        document.querySelector('.instant-result-list').style.display = "block";

        this.resultSearch = this.cryptoAssets.filter(asset => (
          asset.name.toLowerCase().includes(this.txtSearch.toLowerCase()) ||  
          asset.asset_id.toLowerCase().includes(this.txtSearch.toLowerCase())
        )) 
        console.log('Asset Find', this.resultSearch)
        /*this.$http.get('v1/exchangerate/'+this.txtSearch+'/EUR').then((response) => {
          console.log('search result',response);
          this.resultSearch = response.body;
        });*/
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
      document.querySelector('.instant-result-list').style.display = "none";
      if(document.querySelector('#search-input').value.length == 0 ){
        document.querySelector('.search-form').classList.remove('active');
      }
    },
    focusSearch : function() {
      if(document.querySelector('#search-input').value.length > 2 &&
        document.querySelector('.search-form').classList.contains('active')){
        document.querySelector('.instant-result-list').style.display = "block";
      }
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

button {
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

button:after {
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

button:before {
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

.active button {
  transform: translateX(260px);
}

.active button:before {
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

</style>
