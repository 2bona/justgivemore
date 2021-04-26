<template>
      <div class="row q-pb-xl">
          <q-inner-loading :showing="visible">
          <q-spinner-puff
          color="primary"
          size="8em"
        />
          </q-inner-loading>
        <div v-if="!visible" class="  q-mt-0 q-px-0" style="width:100%;min-height:61vh">
            <q-card flat style="width:100%" class="my-card relative-position q-mb-xl">
               <q-carousel
      swipeable arrows
      animated
      v-show="!visible"
      v-model="slide"
      navigation
      infinite control-color="grey-6"
    >
      <q-carousel-slide v-for="n in item.image" :key="n.id" :name="n.id"
      :img-src="n.caption" />
 <template v-slot:control>
        <q-carousel-control
          position="top-right"
        />
     </template>
    </q-carousel>
              <q-card-section  >
                <h5  class="q-my-xs text-capitalize text-wrap text-weight-bold">{{item.name}}</h5>
                <div  class="row item-center q-mt-sm">
  <div class="col-xs-5 col-sm-5 q-pt-sm flex item-center">
    <div style="padding-left: 9px;" class="item-center text-h5 text-weight-regular">
                  <q-icon size="23px" style="width: 4.8px; padding-bottom:4px; margin-right:8px" name="mdi-currency-ngn" />{{item.price | price}}
                </div>
  </div>
  <div class="col-xs-7 col-sm-7 justify-end">
  <div class="flex justify-end">
    <q-btn  @click="addCart(item.name, item.sku, item.price, item.id, item.image[0].caption, item.category, item.brand )"
    class="q-mx-xs q-my-xs text-weight-bolder text-blue-10 shadow-10"
    size="md" rounded color="blue-2">
    add to cart
</q-btn></div>
  </div></div>
              </q-card-section>
                <q-card class="">
                     <q-list bordered separator>
      <p class="q-pa-sm q-my-none text-weight-bold text-grey-5">Specification</p>
      <q-item v-if="item.ram">
        <p><span class="text-weight-bold">Ram</span> : {{item.ram}}</p>
      </q-item>
      <q-item v-if="item.rom">
        <p><span class="text-weight-bold">Rom</span> :  {{item.rom}}</p>
      </q-item>
      <q-item v-if="item.brand">
        <p><span class="text-weight-bold">Category</span> :  {{item.brand}}</p>
      </q-item>
      <q-item v-if="item.weight" >
        <p><span class="text-weight-bold">WEIGHT</span> : {{item.weight}}gram</p>
      </q-item>
      <q-separator />
      <p v-if="item.description" class="q-pa-sm q-my-none text-weight-bold text-grey-5">Description</p>
      <q-item v-if="item.description" >
        <q-item-section v-html="item.description"></q-item-section>
      </q-item>
      </q-list>
    </q-card>
            </q-card>
        </div>
      </div>
</template>

<script>
// import { mapState } from 'vuex'
import axios from 'axios'
import wrapper from 'axios-cache-plugin'

let http = wrapper(axios, {
  maxCacheSize: 15, // cached items amounts. if the number of cached items exceeds, the earliest cached item will be deleted. default number is 15.
  ttl: 60000, // time to live. if you set this option the cached item will be auto deleted after ttl(ms).
  excludeHeaders: true // should headers be ignored in cache key, helpful for ignoring tracking headers
})
http.__addFilter(/item/)
export default {
  data () {
    return {
      name: null,
      age: null,
      tab: 'one',
      btns: false,
      cart: false,
      info: false,
      visible: true,
      accept: false,
      slide: 1,
      item: []
    }
  },
  name: 'PageIndex',
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.navb()
    })
  },
  created () {
    let url = '/item/one'
    http({
      url: url,
      method: 'get',
      params: {
        name: this.$route.params.name
      }
    })
      .then((response) => {
        this.item = response.data.data
        this.slide = response.data.data.image[0].id
      })
      .then(() => {
        this.visible = false
      }).catch(function (error) {
        alert(error)
        this.visible = false
      })
  },
  methods: {
    navb () {
      this.$store.dispatch('setNav', true)
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
    addCart (n1, n2, n3, n5, n6, n7, n8) {
      this.$store.dispatch('addCart', {
        name: n1,
        sku: n2,
        price: n3,
        count: 1,
        id: n5,
        image: n6,
        category: n7,
        brand: n8
      }).then(() => {
        this.$store.dispatch('showCart', true)
      })
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
