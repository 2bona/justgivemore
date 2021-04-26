<template>
  <q-page class>
    <div class="row q-pb-xl">
      <div class="col-md-8 col-xs-12 col-sm-12" style="">
  <div class="q-pa-sm" style="">
        <h3 class="q-my-xs q-mt-xs q-mb-lg  text-weight-medium">Checkout</h3>
      <ordersummary />
    <q-form
    ref="form"
      class="q-gutter-md q-mt-md"
    >      <div class="q-px-md">
    <h6 class="text-weight-medium text-grey-5 text-subtitle2 q-my-sm">Contact Information</h6>
            <div class="row q-col-gutter-md">
    <div class="col-xs-6">
<q-input dense
        v-model="form.firstname"
        label="First name"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
    </div>
    <div class="col-xs-6">
        <q-input dense
        v-model="form.lastname"
        label="Last name"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
    </div>
    <div class="col-xs-6">
      <q-input dense
        v-model="form.identity"
        label="Email"
        type="email"
        lazy-rules
        :rules="emailRules"
      />
    </div>
       <div class="col-xs-6">
    <q-input dense
        v-model="form.reciever"
        label="Your Phone number"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
           </div>

            </div>
    <h6 class="text-weight-medium text-grey-5 text-subtitle2 q-my-sm">Shipping Information</h6>
      <div class="row q-col-gutter-md">
<div class="col-xs-12">
    <q-input dense
        v-model="form.address"
        label="Address"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
</div>

      <div class="col-xs-6">
<div class="col-xs-12">
      <q-input dense
        v-model="form.city"
        label="City"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
</div>      </div>
      <div class="col-xs-6">
    <q-select :loading="loading" dense  v-model="form.state" :options="states" label="State" />
      </div>
      <div>
      </div>
    </div>
    <div class="text-center">
        <q-btn rounded class="text-blue-1 text-weight-bold shadow-20 q-my-lg"  :loading="loadingSub" @click.prevent="submitForm()" label="proceed" type="submit" color="blue-10"/>
    </div>
</div></q-form>
  </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import ordersummary from './ordersummary.vue'
export default {
  components: {
    ordersummary
  },
  data () {
    return {
      btns: false,
      cart: false,
      info: false,
      accept: false,
      exp: false,
      loadingSub: false,
      slide: 1,
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ]
    }
  },
  computed: {
    cartCount () {
      return this.$store.getters.getCartCount
    },
    states () {
      return this.$store.getters.getStates
    },
    loading () {
      return this.$store.getters.getStatesLoad
    },
    cartCost () {
      return this.$store.getters.getCartCost
    },
    cartItems () {
      return this.$store.getters.getCart
    },
    form () {
      return this.$store.getters.getForm
    }
  },
  name: 'info',
  methods: {
    getStates () {
      if (this.states.length < 37) {
        this.$store.dispatch('getStates')
      } else {
        this.$store.dispatch('stateLoad', false)
      }
    },
    addCart (n1, n2, n3, n4, n5, n6, n7, n8) {
      this.$store.dispatch('addCart', {
        name: n1,
        sku: n2,
        price: n3,
        count: n4,
        id: n5,
        image: n6,
        category: n7,
        brand: n8
      })
    },
    removeCart (n1) {
      this.$store.dispatch('removeItem', {
        name: n1
      })
    },
    removeItem (n1) {
      this.$store.dispatch('removeItemAll', {
        name: n1
      })
    },
    submitForm () {
      this.loadingSub = true
      this.$refs.form.validate().then(success => {
        if (success) {
          this.$store.dispatch('submitForm', {
            form: this.form
          })
            .then(() => {
              this.$router.push('/checkout/shipping')
              this.loadingSub = false
            })
        } else {
          this.loadingSub = false
        }
      })
    },
    onSubmit () {
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first'
        })
      } else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        })
      }
    },
    infoFn () {
      this.info = !this.info
      this.btns = !this.btns
      this.cart = false
    },
    cartFn () {
      this.cart = !this.cart
      this.btns = !this.btns
      this.info = false
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getStates()
    })
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
