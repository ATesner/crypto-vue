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
      <div class="asset-overview">
        <img id="asset-overview-image" src=""/>
        <div class="asset-overview-panel">
          <h4 id="asset-overview-name"></h4>
          <div id="asset-overview-price"></div>
        </div>
        <div class="asset-overview-actions">
          <button v-if="cryptoSelected" class="mybtn add-btn" v-on:click="addCrypto">Ajouter au dashboard</button> <br/> <br/>
          <button v-if="dashboardList.length > 0" class="mybtn clear-btn" v-on:click="reinitDashboard">Réinitialiser dashboard</button>
        </div>
        <div class="config-panel">
          <select v-model="currency" @change="currencyChange">
              <option :key="index" v-for="(c, index) in currencies" :value="c" :selected="(currency.name == c.name ? 'selected': '')">{{c.name}}</option>
          </select>
        </div>
      </div>
      <ul id="dashboard-list">
        <li class="dashboard-item" :key="index" v-for="(crypto, index) in dashboardList">
          <div class="dashboard-item-info">
          <h4><img :src="imgUrl+crypto.id+'.png'" /> {{crypto.name}}</h4>
          <div>{{crypto.price}} {{currency.symbol}}</div>
          </div>
          <button class="mybtn delete-btn" v-on:click="deleteCrypto(index)">Delete</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script src="./App.js"></script>
<style src="./App.css"></style>