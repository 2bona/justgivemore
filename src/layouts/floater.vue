  <template>
  <div>
      <q-btn size="md" @click="infoFn()" class="shadow-24 q-ma-xs q-mr-sm fixed-bottom-right"
      style="z-index:999;bottom: 10px;right: 10px;" text-color="white" round color="green" :icon="(info && !cartStatus) ? 'mdi-close':'mdi-email' " />
      <transition
      appear
      enter-active-class="animated slideInUp"
      leave-active-class="animated slideOutDown"
      >
      <q-card v-if="info"
        class="q-px-md shadow-20 q-pb-xl q-pt-lg infocard"
        flat
        style="
          z-index:9;
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          height:100vh; min-width:90px;overflow-y:auto;"
      >
        <div class="float-right" >
            <q-btn @click="infoFn()" icon flat color="primary"><q-icon name="fab fa-xing"></q-icon></q-btn>
        </div>
          <h4 class="q-my-xs q-mt-xs text-grey-6 text-weight-medium">Hey,</h4>
          <h6 class="q-my-none text-subtitle1 text-grey-6  q-pr-xs text-weight-regular"
          >feel free to reach out, I would love to help.</h6>
          <h5 class="q-my-none text-weight-bolder text-warning"></h5>
          <div class="q-pa-md q-mx-auto" style="max-width: 400px">
            <q-form ref="form" @submit="submitInquiryForm" class="q-gutter-md">
              <q-input
                 dense
                v-model="name"
                label="Name"
                hint="eg. Bona Okoli"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Your name is required.']"
              />
              <q-input
                 dense
                v-model="phone"
                label="Whatsapp number"
                hint="eg. 08037687654, you will recieve deals and offers from us through sms."
                lazy-rules
                :rules="numberRules"
              />

             <q-input
      type="textarea"
      v-model="text"
      label="Your inquiry"
      :rules="[ val => val && val.length > 0 || 'Please write your inquiry.']"
    />
          <q-toggle v-model="accept" label="I accept the privacy policy " />

              <div class="text-center">
                <q-btn :loading="loading" class="shadow-20 q-mt-xl q-mb-lg" label="Submit" type="submit" rounded color="primary" />
              </div>
            </q-form>
                        <div class="text-warning text-center q-gutter-md" style="font-size: 2em; margin-bottom:130px; margin-top:5px">
      <a href="https://mobile.twitter.com/JGM53878272" target="_blank"><q-btn round class="shadow-2 text-blue-3" color="white" icon="mdi-twitter" /></a>
      <a href="https://web.facebook.com/jgmjustgivemore" target="_blank"><q-btn round class="shadow-2 text-blue-9" color="white" icon="mdi-facebook" /></a>
      <a href="https://www.instagram.com/jgmjustgivemore/" target="_blank"><q-btn round class="shadow-2 text-purple-5" color="white" icon="mdi-instagram" /></a>
    </div>
          </div>
        </q-card>
      </transition>
      <transition
  appear
  enter-active-class="animated slideInUp"
  leave-active-class="animated slideOutDown"
>
      <q-card v-if="cartStatus"
          class=" q-px-md q-pb-xl q-pt-lg infocard"
          square flat
          style="
           z-index:9;height:99vh;overflow-y:auto; min-width:90px"
        >
         <div class="float-right" >
            <q-btn @click="cartFn()" icon flat color="primary"><q-icon name="fab fa-xing"></q-icon></q-btn>
        </div>
          <h4 class="q-my-xs q-mt-xs text-grey-5  text-weight-medium">Cart</h4>
          <div class="q-pa-md q-mx-auto" style="max-width: 400px">
    <q-card v-for="n in cartItems" :key="n.id" style="border-radius:37px" class="shadow-2 q-mb-md">
      <q-item> <q-badge @click.prevent="removeItem(n.name)" class="shadow-4" floating color="white">
    <q-icon size="17px" name="mdi-trash-can" color="red-5" />
    </q-badge>
        <q-item-section avatar>
          <q-avatar rounded  >
            <img :src="n.image">
           <q-badge floating color="teal">{{n.count}}</q-badge>
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-capitalize">{{n.name}}</q-item-label>
          <q-item-label caption><q-icon style="width: 4.8px; padding-bottom:1px; margin-right:3px" name="mdi-currency-ngn" />{{n.price * n.count | price}}</q-item-label>
        </q-item-section>
        <q-item-section>
    <div class="flex align-end" style="justify-content: flex-end;">
        <q-btn @click.prevent="removeCart(n.name)" class="shadow-6 q-mx-sm" size="sm" round color="secondary" icon="mdi-minus" />
    <q-btn @click.prevent="addCart(n.name, n.sku, n.price, 1, n.id, n.image, n.category, n.brand )" class="shadow-6 q-mx-sm" size="sm" round color="secondary" icon="mdi-plus" />
    </div>
     </q-item-section>
      </q-item>
    </q-card>
              <div class="text-center">
                <q-btn rounded class=" text-blue-1 text-weight-bold shadow-24 q-my-xl"
                 :disabled="loading" :loading="loading" v-if="cartItems.length > 0" @click="checkout()"
                  label="checkout" color="blue-10" />
              </div>
              <div class="text-warning q-mt-xs q-mb-md q-gutter-md" style="font-size: 2em">
    </div>
          </div>
        </q-card>
            </transition>
      </div>
      </template>
<script>
import axios from 'axios'
import wrapper from 'axios-cache-plugin'

let http = wrapper(axios, {
  maxCacheSize: 15, // cached items amounts. if the number of cached items exceeds, the earliest cached item will be deleted. default number is 15.
  ttl: 60000, // time to live. if you set this option the cached item will be auto deleted after ttl(ms).
  excludeHeaders: true // should headers be ignored in cache key, helpful for ignoring tracking headers
})
export default {
  data () {
    return {
      age: null,
      btns: false,
      info: false,
      loading: false,
      accept: false,
      exp: false,
      phone: '',
      name: '',
      text: '',
      slide: 1,
      numberRules: [
        (v) => !!v || 'Phone number is required',
        (v) => Number(v) || 'Number must be valid'
      ]
    }
  },
  name: 'info',
  computed: {
    cartCount () {
      return this.$store.getters.getCartCount
    },
    cartItems () {
      return this.$store.getters.getCart
    },
    cartStatus () {
      return this.$store.getters.getCartStatus
    },
    shipInfo () {
      return this.$store.getters.getShipInfo
    }
  },
  methods: {
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
    removeCart (item) {
      this.$store.dispatch('removeItem', {
        name: item
      })
    },
    checkout () {
      this.loading = true
      if (this.shipInfo.amount > 0) {
        this.$router.push('/checkout/shipping')
        this.loading = false
      } else {
        this.$router.push('/checkout')
        this.loading = false
      }
    },
    removeItem (items) {
      this.$store.dispatch('removeItemAll', {
        name: items
      })
    },
    submitInquiryForm () {
      this.loadingSub = true
      const sn = this
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first'
        })
      } else {
        this.$refs.form.validate().then(success => {
          if (success) {
            let url = '/inquiry'
            this.loading = true
            http({
              url: url,
              method: 'post',
              params: {
                name: this.name,
                number: this.phone,
                inquiry: this.text
              }
            })
              .then((response) => {
                this.name = ' '
                this.phone = ' '
                this.text = ' '
                this.info = false
                this.$q.notify({
                  color: 'green',
                  textColor: 'white',
                  icon: 'cloud_done',
                  message: 'Inquiry submitted successfully'
                })
              })
              .then(() => {
                sn.loading = false
              })
              .catch(function (error) {
                sn.$q.notify({
                  color: 'red',
                  textColor: 'white',
                  icon: 'warning',
                  message: error
                })
                sn.loading = false
              })
          } else {
            sn.loading = false
          }
        })
      }
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
    onReset () {
      this.name = null
      this.age = null
      this.accept = false
    },
    infoFn () {
      this.info = !this.info
      this.btns = !this.btns
      this.$store.dispatch('showCart', false)
    },
    cartFn () {
      this.$store.dispatch('showCart', !this.cartStatus)
      this.info = false
      if (this.btns === true) {
        this.btns = !this.btns
      } else {
      }
    }
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
