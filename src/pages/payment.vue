<template>
  <q-page class>
    <div class="row">
      <div class="col-md-8 col-xs-12 col-sm-12" style="">
  <div class="q-pa-md" style="">
        <h3 class="q-my-xs q-mt-xs q-mb-lg  text-weight-medium">Payment</h3>
     <div class="q-px-md q-mt-xl">
      <div class="row q-col-gutter-md">
    <div class="col-xs-12">
        <q-card flat>
        <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
          </div>
        </div>
        </q-card-section>
      <q-card-section class="text-center">
    <paystack
        :amount="total"
        :email="shipInfo.contact"
        :paystackkey="paystackkeys"
        :reference="shipInfo.id.toString()"
        :callback="callback"
        :metadata="metadata"
        :close="close"
        :embed="false"
        style="border-radius: 50px;"
        class="q-btn q-btn--push q-pa-md bg-white rounded-borders q-my-md shadow-20 "
    >
       <img style="width:90%" src="https://3.bp.blogspot.com/-1tMgWz_Jzws/W8Wz82rcGDI/AAAAAAAAB20/H0VaEJBvOXkahf8FUyRRsaCX_tYpPxwowCLcBGAs/s1600/Paystack%2Blogo.png">
    </paystack>
    <q-inner-loading :showing="paidLoad">
  <q-spinner-puff color="white" size="6em" />
              </q-inner-loading>
      </q-card-section>
      <q-card-section class="flex flex-center">
          <img class="q-ma-md" style="width:10%" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png">
          <img class="q-ma-md" style="width:10%" src="https://payquicker.com/wp-content/uploads/2019/05/Visa-Logo.png">
          <img class="q-ma-md" style="width:10%" src="http://torumobile.com/bigstakers/images/verve.png">
          </q-card-section>
              <q-card-section>
<div class="text-center text-caption text-grey-6">Payment is fully handled by Gateway for 100% security.</div>
      </q-card-section>
        </q-card>
    </div>
   <div>
      </div>
    </div>
</div>
  </div>
      </div>
      </div>
  </q-page>
</template>

<script>
import paystack from 'vue-paystack'
import axios from 'axios'
import wrapper from 'axios-cache-plugin'

let http = wrapper(axios, {
  maxCacheSize: 15, // cached items amounts. if the number of cached items exceeds, the earliest cached item will be deleted. default number is 15.
  ttl: 60000, // time to live. if you set this option the cached item will be auto deleted after ttl(ms).
  excludeHeaders: false // should headers be ignored in cache key, helpful for ignoring tracking headers
})
http.__addFilter(/address/)

export default {
  components: {
    paystack
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (vm.cartItems.length && !vm.$store.getters.getShipInfoStatus) {
        vm.$router.push('*')
      // alert(vm.cartItems.length)
      }
    })
  },
  created () {
    this.shipInfo = this.$store.getters.getShipInfo
    var cartArray = []
    var cartObj = {}
    var ct = this.$store.getters.getCart
    ct.forEach(function (item) {
      cartObj.name = item.name
      cartObj.qty = item.count
      cartArray.push(cartObj)
    })
    this.payCart = JSON.stringify(cartArray)
  },
  watch: {
    shipInfo () {
      this.shipInfo = this.$store.getters.getShipInfo
    }
  },
  computed: {
    form () {
      return this.$store.getters.getForm
    },
    cartCost () {
      return this.$store.getters.getCartCost
    },
    cartItems () {
      return this.$store.getters.getCart
    },
    shipPrice () {
      return this.$store.getters.getShipPrice
    },
    total () {
      if (typeof (this.shipPrice) === 'number') {
        return (this.shipPrice + this.cartCost) * 100
      } else {
        return this.cartCost * 100
      }
    },
    metadata () {
      return {
        custom_fields: [
          {
            display_name: 'Mobile Number',
            variable_name: 'mobile_number',
            value: this.shipInfo.receiver
          },
          {
            display_name: 'Address',
            variable_name: 'address',
            value: this.shipInfo.address
          },
          {
            display_name: 'First Name',
            variable_name: 'first_name',
            value: this.shipInfo.firstname
          },
          {
            display_name: 'Last Name',
            variable_name: 'last_name',
            value: this.shipInfo.lastname
          },
          {
            display_name: 'Invoice ID',
            variable_name: 'invoice_id',
            value: this.shipInfo.id
          },
          {
            display_name: 'Cart Items',
            variable_name: 'cart_items',
            value: this.payCart
          }
        ]
      }
    }
  },
  data () {
    return {
      shipInfo: [],
      payCart: [],
      paidLoad: false,
      paystackkeys: 'pk_live_bbd7e25e4c1a08d8a57eeb44206902e38729d868'
    }
  },
  methods: {
    callback () {
      this.paidLoad = true
      let url = '/paid'
      http({
        url: url,
        method: 'post',
        params: {
          id: this.shipInfo.id,
          cart: this.cartItems
        }
      })
        .then((response) => {
          this.$q.notify({
            message: 'Transaction complete, thank you!',
            color: 'accent',
            position: 'top',
            icon: 'mdi-emoticon-happy-outline',
            actions: [
              { label: 'Dismiss', color: 'white', handler: () => { /* console.log('wooow') */ } }
            ]
          })
        })
        .then(() => {
          this.$router.push('/')
          this.$store.dispatch('clearCart')
          this.$store.dispatch('shipInfoStatus', false)
        })
        .catch(function (error) {
          alert(error)
          // this.paidLoad = false
        })
    },
    close () {
      this.$q.notify({
        message: 'Transaction Closed, pay nah!',
        color: 'primary',
        position: 'top',
        icon: 'mdi-emoticon-sad-outline',
        actions: [
          { label: 'Dismiss', color: 'white', handler: () => { /* console.log('wooow') */ } }
        ]
      })
    }
  },
  name: 'payment'
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

.payButton
    color: #61DAFB
    width: 100%
    max-width: 400px
    height: auto
    font-weight: 800

</style>
