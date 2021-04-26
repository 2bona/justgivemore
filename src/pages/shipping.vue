<template>
  <q-page class>
    <div class="row q-pb-xl">
      <div class="col-md-8 col-xs-12 col-sm-12" style="">
  <div class="q-pa-md" style="">
        <h3 class="q-my-xs q-mt-xs q-mb-lg  text-weight-medium">Shipping</h3>
     <ordersummary />
    <q-form
      class="q-gutter-md q-mt-md"
    >      <div class="q-px-md">
      <div class="row q-col-gutter-md">   <q-inner-loading :showing="btnLoad">
  <q-spinner-rings color="grey" size="3em" />
              </q-inner-loading>
    <div class="col-xs-12">
        <q-card style="border-radius:10px" class=" shadow-5">
        <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6 text-weight-bolder text-grey-4 q-mb-sm">Delivery Info</div>
            <div class="text-subtitle2 text-grey-7"><q-icon name="mdi-account-arrow-right" />  {{form.identity}}</div>
            <div class="text-subtitle2 text-grey-7"><q-icon name="mdi-phone" />  {{form.reciever}}</div>
            <div class="text-subtitle2 text-grey-7"><q-icon name="mdi-map-marker" /> {{form.address + ', ' +form.city+ ', ' +form.state+ ', Nigeria.'}}</div>
            <div v-show="address" class="text-subtitle2 text-grey-7" v-html="'Prefered logistics office address : '+address"></div>
          </div>
          <div class="col-auto">
            <q-btn  to="/checkout" color="grey-7" round flat icon="edit">
            </q-btn>
          </div>
           <q-inner-loading :showing="loading || btnLoad">
  <q-spinner-rings color="grey" size="3em" />
              </q-inner-loading>
        </div>
        </q-card-section>
        </q-card>
    </div>
    <div class="col-xs-12">
      <h6 v-show="gigaddress.length > 0" class="q-my-xs text-grey-5 text-subtitle1">
          <q-avatar size="md" class="q-mr-xs shadow-5">
      <img src="https://m.gigm.com/img/GLOGO.png">
    </q-avatar>
       <span> GiGM logistics offices in {{form.state}}</span></h6>
      <q-option-group
      v-model="address"
      :options="gigaddress"
      color="primary"
    />

    <div v-for="n in company" :key="n.id">
      <h6 v-show="n.address.length > 0" class="q-my-xs text-grey-5 text-subtitle1">
          <q-avatar size="md" class="q-mr-xs shadow-5">
      <img :src="n.image">
    </q-avatar>
    <span>
      {{n.name}} logistics offices in {{form.state}}
      </span>
      </h6>
      <q-option-group
      v-model="address"
      :options="n.address"
      color="primary"
    />
    </div>
      <h6 v-if="!loading" class="q-my-xs text-weight-medium text-grey-5 text-subtitle1">Delivery Options</h6>
    <q-option-group
    v-if="!loading"
      v-model="price"
      :options="options"
      color="primary"
    />
    </div>
      <div>
      </div>
    </div>
    <div class="text-center">
        <q-btn :loading="btnLoad" :disabled="!price" @click="submitAndPay" :class="price ? 'shadow-20' : 'shadow-0'" class="q-my-lg text-blue-1 text-weight-bold"  label="proceed to payment" type="submit" rounded color="blue-10"/>
    </div>
</div>
</q-form>
  </div>
      </div>
      </div>
  </q-page>
</template>

<script>
import ordersummary from './ordersummary.vue'
import axios from 'axios'
import wrapper from 'axios-cache-plugin'

let http = wrapper(axios, {
  maxCacheSize: 15, // cached items amounts. if the number of cached items exceeds, the earliest cached item will be deleted. default number is 15.
  ttl: 60000, // time to live. if you set this option the cached item will be auto deleted after ttl(ms).
  excludeHeaders: true // should headers be ignored in cache key, helpful for ignoring tracking headers
})
http.__addFilter(/address/)

export default {
  components: {
    ordersummary
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (!vm.cartCost) {
        vm.$router.push('*')
        vm.$store.dispatch('shipInfoStatus', false)
      // alert(vm.cartItems.length)
      }
    })
  },
  data () {
    return {
      name: null,
      age: null,
      btns: false,
      cart: false,
      info: false,
      accept: false,
      exp: false,
      loading: true,
      btnLoad: false,
      gigaddress: [],
      company: [],
      phone: '',
      text: '',
      identity: '',
      slide: 1,
      address: '',
      price: '',
      options: [
        {
          label: 'Free shipping',
          value: 'Free shipping'
        }
      ]
    }
  },
  name: 'shipping',
  methods: {
    setShipPrice () {
      this.$store.dispatch('shipPrice', this.price)
    },
    add () {
      let url = '/address'
      http({
        url: url,
        method: 'get',
        params: {
          state: this.form.state
        }
      })
        .then((response) => {
          this.gigaddress = response.data
          this.loading = false
          this.getCompany()
        }).catch(function (error) {
          alert(error)
          this.loading = false
        })
    },
    getCompany () {
      let url = '/company/state'
      http({
        url: url,
        method: 'get',
        params: {
          state: this.form.state
        }
      })
        .then((response) => {
          this.company = response.data.data
          this.loading = false
        }).catch(function (error) {
          alert(error)
          this.loading = false
        })
    },
    submitAndPay () {
      this.btnLoad = true
      let url = '/order'
      http({
        url: url,
        method: 'post',
        params: {
          name: this.form.name,
          firstname: this.form.firstname,
          lastname: this.form.lastname,
          shipoffice: this.address,
          address: this.form.address,
          state: this.form.state,
          receiver: this.form.reciever,
          contact: this.form.identity,
          city: this.form.city,
          amount: this.total,
          paid: false
        }
      })
        .then((response) => {
          this.$store.dispatch('shipInfo', {
            shipInfo: response.data.order
          })
          this.btnLoad = false
        })
        .then(() => {
          this.$router.push('/checkout/payment')
        }).catch(function (error) {
          alert(error)
          this.btnLoad = false
        })
    }
  },
  watch: {
    price: function () {
      this.$store.dispatch('shipPrice', this.price)
    },
    ready: function () {
      if (this.price) {
        return true
      } else {
        return false
      }
    }
  },
  computed: {
    form () {
      return this.$store.getters.getForm
    },
    cartCost () {
      return this.$store.getters.getCartCost
    },
    shipPrice () {
      return this.$store.getters.getShipPrice
    },
    total () {
      if (typeof (this.shipPrice) === 'number') {
        return (this.shipPrice + this.cartCost)
      } else {
        return this.cartCost
      }
    }
  },
  mounted () {
    this.add()
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 95%
  min-height: 340px
  min-width: 150px

.q-carousel__slide
    height: 100%
    padding: 16px
    background-size: contain
    background-position: 50%
    background-repeat: no-repeat

</style>
