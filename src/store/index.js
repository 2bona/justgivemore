import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import wrapper from 'axios-cache-plugin'

let http = wrapper(axios, {
  maxCacheSize: 15, // cached items amounts. if the number of cached items exceeds, the earliest cached item will be deleted. default number is 15.
  ttl: 60000, // time to live. if you set this option the cached item will be auto deleted after ttl(ms).
  excludeHeaders: true // should headers be ignored in cache key, helpful for ignoring tracking headers
})
http.__addFilter(/states/)
import emyhub from './emyhub'
import shop from './shoppingCart'
axios.defaults.baseURL = ' https://justgivemore.ng/jgm/api'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.post['Accept'] = 'application/json'

Vue.use(axios)
Vue.use(Vuex)
Vue.filter('price', function (value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
})
Vue.filter('name', function (value) {
  if (value.length > 15) {
    return value.substring(0, 15) + '...'
  } else {
    return value
  }
})
const state = {
  form: shop.emyshoppingCart.getForm() || {},
  shipInfo: shop.emyshoppingCart.getShipInfo() || {},
  items: [],
  states: [],
  cartStatus: false,
  shipPrice: 'Calculated in the next step',
  cart: shop.emyshoppingCart.listCart() || [],
  category: '',
  nav: false,
  statesLoad: true,
  shipInfoStatus: false,
  cartCount: shop.emyshoppingCart.countCart() || '',
  cartCost: shop.emyshoppingCart.totalCart() || ''
}
const getters = {
  getItems (state) {
    return state.items
  },
  getCategory (state) {
    return state.category
  },
  getNav (state) {
    return state.nav
  },
  getStates (state) {
    return state.states
  },
  getStatesLoad (state) {
    return state.statesLoad
  },
  getCartCount (state) {
    return state.cartCount
  },
  getCartCost (state) {
    return state.cartCost
  },
  getCart (state) {
    return state.cart
  },
  getCartStatus (state) {
    return state.cartStatus
  },
  getForm (state) {
    return state.form
  },
  getShipInfo (state) {
    return state.shipInfo
  },
  getShipInfoStatus (state) {
    return state.shipInfoStatus
  },
  getShipPrice (state) {
    return state.shipPrice
  }
}
const mutations = {
  setItems (state, status) {
    state.items = status
  },
  setForm (state, status) {
    state.form = status
  },
  setItemDesc (state, status) {
    state.adminform.description = status
  },
  setNav (state, status) {
    state.nav = status
  },
  setStates (state, status) {
    state.states = status
  },
  setStatesLoad (state, status) {
    state.statesLoad = status
  },
  setShipInfo (state, status) {
    state.shipInfo = status
  },
  setShipInfoStatus (state, status) {
    state.shipInfoStatus = status
  },
  setCategory (state, status) {
    state.category = status
  },
  setCart (state, status) {
    state.cart = status
  },
  setCartCount (state, status) {
    state.cartCount = status
  },
  setCartCost (state, status) {
    state.cartCost = status
  },
  setCartStatus (state, status) {
    state.cartStatus = status
  },
  setShipPrice (state, status) {
    state.shipPrice = status
  }
}
const actions = {
  addCart ({
    commit,
    state,
    dispatch
  }, data) {
    shop.emyshoppingCart.addItemToCart(data.name, data.sku, data.price, data.count, data.id, data.image, data.category, data.brand)
    dispatch('loadCartCount')
    dispatch('loadCartCost')
    dispatch('loadCart')
  },
  removeItem ({
    commit,
    state,
    dispatch
  }, data) {
    shop.emyshoppingCart.removeItemFromCart(data.name)
    dispatch('loadCartCount')
    dispatch('loadCartCost')
    dispatch('loadCart')
  },
  removeItemAll ({
    commit,
    state,
    dispatch
  }, data) {
    shop.emyshoppingCart.removeItemFromCartAll(data.name)
    dispatch('loadCartCount')
    dispatch('loadCart')
  },
  clearCart ({
    commit,
    state,
    dispatch
  }, data) {
    localStorage.removeItem('emyshoppingCart')
    commit('setCart', [])
    commit('setCartCount', 0)
    commit('setCartStatus', false)
  },
  loadCartCount ({
    commit,
    state,
    dispatch
  }, data) {
    commit('setCartCount', shop.emyshoppingCart.countCart())
    dispatch('loadCart')
  },
  submitForm ({
    commit,
    state,
    dispatch
  }, data) {
    shop.emyshoppingCart.submitForm(data.form)
    commit('setForm', data.form)
  },
  setNav ({
    commit,
    state,
    dispatch
  }, data) {
    commit('setNav', data)
  },
  stateLoad ({
    commit,
    state,
    dispatch
  }, data) {
    commit('setStatesLoad', data)
  },
  shipInfoStatus ({
    commit,
    state,
    dispatch
  }, data) {
    commit('setShipInfoStatus', data)
  },
  shipInfo ({
    commit,
    state,
    dispatch
  }, data) {
    shop.emyshoppingCart.submitShipInfo(data.shipInfo)
    commit('setShipInfo', data.shipInfo)
    commit('setShipInfoStatus', true)
  },
  getStates ({
    commit,
    state,
    dispatch
  }, data) {
    let url = '/states'
    commit('setStatesLoad', true)
    http({
      url: url,
      method: 'get'
    })
      .then((response) => {
        commit('setStates', response.data)
        commit('setStatesLoad', false)
      }).catch(function (error) {
        alert(error)
        commit('setStatesLoad', false)
      })
  },
  shipPrice ({
    commit,
    state,
    dispatch
  }, data) {
    commit('setShipPrice', data)
  },
  showCart ({
    commit,
    state,
    dispatch
  }, data) {
    commit('setCartStatus', data)
  },
  loadCartCost ({
    commit,
    state,
    dispatch
  }, data) {
    commit('setCartCost', shop.emyshoppingCart.totalCart())
  },
  loadCart ({
    commit,
    state,
    dispatch
  }, data) {
    commit('setCart', shop.emyshoppingCart.listCart())
  }
}
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */
export default function (/* { ssrContext } */) {
  const store = new Vuex.Store({ state,
    mutations,
    actions,
    getters,
    modules: {
      emyhub
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return store
}
