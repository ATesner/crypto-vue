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
                v-on:click.native="clickResult(crypto)"></app-item>
            </li>
          </ul>
        </form>
        <h2 id="search-label" v-on:click="clickSearch">Search</h2>
      </div>
    </nav>
    <div class="dashboard-container">
      <div class="dashboard-header">
        <div v-if="cryptoSelected" class="asset-overview">
          <img :src="cryptoSelected.img"/>
          <div class="asset-overview-panel">
            <label><strong>{{cryptoSelected.name}}</strong></label>
            <div>{{cryptoSelected.price}} {{currency.symbol}}</div>
          </div>
          <template v-if="cryptoSelected">
            <button v-if="!cryptoAlreadyAdded(cryptoSelected)" class="mybtn add-btn" v-on:click="addCrypto">Add to dashboard</button>
            <label v-else>Asset already added</label>
          </template>
        </div>
        <div class="config-panel">
          <button v-if="dashboardList.length > 0" class="mybtn clear-btn" v-on:click="reinitDashboard">
            Reset dashboard
          </button>
          <br/> <br/>
          <label><strong>Select a currency : </strong></label>
          <select v-model="currency" @change="currencyChange">
              <option :key="index" v-for="(c, index) in currencies" :value="c" :selected="(currency.name == c.name ? 'selected': '')">{{c.name}}</option>
          </select>
        </div>
      </div>
      <ul id="dashboard-list">
        <li class="dashboard-item" :key="index" v-for="(crypto, index) in dashboardList">
          <img class="dashboard-item-image" :src="imgUrl+crypto.id+'.png'" />
          <div class="dashboard-item-info">
            <label><strong> {{crypto.name}} ({{crypto.symbol}})</strong></label>
            <div>{{crypto.price}} {{currency.symbol}}</div>
          </div>
          <div>
            <label><strong>Market Cap</strong></label>
            <div>{{crypto.market_cap}}  {{currency.symbol}}</div>
          </div>
          <button class="mybtn delete-btn" v-on:click="deleteCrypto(index)">Delete</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script src="./App.js"></script>
<style src="./App.css"></style>