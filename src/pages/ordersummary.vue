  <template>
              <q-expansion-item
        expand-separator
        icon="mdi-cart-outline"
        :label="exp? 'Hide order summary': 'Show order summary'"
        v-model="exp"
        class="q-mx-md"
      >
        <div class="q-pa-sm q-mx-auto" style="max-width: 400px">
    <q-card v-for="n in cartItems" :key="n.id" style="border-radius:37px" class="shadow-10 q-mb-md">
      <q-item>
        <q-item-section avatar>
          <q-avatar rounded >
            <img :src="n.image">
           <q-badge floating color="teal">{{n.count}}</q-badge>
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{n.name}}</q-item-label>
          <q-item-label caption><q-icon style="width: 4.8px; padding-bottom:1px; margin-right:3px" name="mdi-currency-ngn" />{{n.price * n.count | price}}</q-item-label>
        </q-item-section>
        <q-item-section>
    <div class="flex" style="justify-content: flex-end;">
        <q-btn @click.prevent="removeCart(n.name)" class="q-mx-sm" size="sm" round color="secondary" icon="mdi-minus" />
    <q-btn @click.prevent="addCart(n.name, n.sku, n.price, 1, n.id, imaged, n.category, n.brand )" class="q-mx-sm" size="sm" round color="secondary" icon="mdi-plus" />
    </div>
     </q-item-section>
      </q-item>
    </q-card>
              <div class="text-warning q-mt-xs q-mb-md q-gutter-md" style="font-size: 2em">
    </div>
          </div>
        <div class="row q-gutter-col-md q-px-md">
            <div class="col-xs-6 text-grey text-weight-light text-caption">Subtotal</div>
            <div class="col-xs-6 text-grey text-weight-light text-caption text-right"><q-icon style="width: 4.8px; padding-bottom:1px; margin-right:3px" name="mdi-currency-ngn" />{{cartCost | price}}</div>
            <div class="col-xs-6 text-grey text-weight-light text-caption">Shipping</div>
            <div class="col-xs-6 text-grey text-weight-light text-caption text-right"><q-icon v-show="iconship" style="width: 4.8px; padding-bottom:1px; margin-right:3px" name="mdi-currency-ngn" />{{shipPrice | price}}</div>
            <q-separator/>
            <div class="col-xs-6 text-h6">Total</div>
            <div class="col-xs-6 q-pt-sm text-right"><q-icon style="width: 4.8px; padding-bottom:1px; margin-right:3px" name="mdi-currency-ngn" />{{total | price}}</div>
        </div>
      </q-expansion-item>
      </template>
<script>
export default {
  data () {
    return {
      name: null,
      age: null,
      btns: false,
      cart: false,
      info: false,
      accept: false,
      exp: false,
      slide: 1
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
    },
    iconship () {
      if (typeof (this.shipPrice) === 'number') {
        return true
      } else {
        return false
      }
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
      this.cart = false
    },
    cartFn () {
      this.cart = !this.cart
      this.btns = !this.btns
      this.info = false
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
