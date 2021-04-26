<template>
  <div>
        <q-inner-loading :showing="visible">
          <q-spinner-puff
          color="primary"
          size="8em"
        />
          </q-inner-loading>
          <div v-show="!visible && items.length < 1" style="height:60vh;" class="container no-wrap justify-center text-h1 items-center flex text-grey-3 text-weight-bold">
            <div class="col-lg-12"><q-icon size="90px" class="text-grey-3" name="mdi-folder-open-outline"></q-icon></div>
             </div>
        <div class="row q-mt-md q-mb-xl q-px-xs">
          <div v-for="n in items" :key="n.id" class="col-md-3 col-xs-6 col-sm-4">
      <transition
            appear
  enter-active-class="animated fadeIn"
  leave-active-class="animated fadeOut"
>
            <router-link :to="'/product/'+n.name" style=" text-decoration: none;">
            <q-card style="border-radius:10px" class="shadow-1 my-card q-mx-auto q-my-sm">
              <div style="border-radius:10px" v-for="m in n.image" :key="m.id">
           <q-img
           v-if="m.default === '1'"
                style="height: 230px; border-radius:10px 10px 0 0; max-width: 300px"
                :src="m.caption"
              >
              <p v-if="n.discount" style="color: #fff;
    position: absolute;
    right: 0;margin: 6px;
    padding: 7px;
    border-radius: 10px;
    background-color: #FF9800;
    text-shadow: 0px 0px 1px #000000cc;">-{{n.discount}}%</p>
              </q-img>
              </div>
              <q-card-section class="q-px-sm q-pt-sm q-pb-xs">
                <div class="text-subtitle1 text-black text-capitalize text-weight-regular">{{n.name | name}}</div>
                <div style="padding-left: 3px;" class="relative-position text-subtitle1 text-black text-weight-medium">
                  <q-icon style="width: 4.8px; padding-bottom:3px; margin-right:4px" name="mdi-currency-ngn" />{{n.price | price}}
                </div>
              </q-card-section>
              <q-card-section class="q-px-sm q-pt-sm q-pb-xs">
              <q-btn @click.prevent="addCart(n.name, n.sku, n.price, n.id, n.image[0].caption, n.category, n.brand )"
                 rounded size="xs" class="q-mr-xs text-blue-10 absolute-right">add to cart</q-btn>
              </q-card-section>
            </q-card>
            </router-link>
            </transition>
          </div>
        </div>
      </div>
</template>

<script>
import { mapState } from 'vuex'
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
      subcategory: [],
      visible: true,
      info: false,
      tab: '',
      accept: false,
      items: []
    }
  },
  computed: {
    ...mapState(['category'])
  },
  name: 'category',
  methods: {
    cat (item) {
      this.items = item
    },
    navb () {
      this.$store.dispatch('setNav', true)
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
    getCat (x) {
      let url = '/item/all'
      const sn = this
      sn.visible = true
      http({
        url: url,
        method: 'get',
        params: {
          category: x
        }
      })
        .then((res) => {
          this.items = res.data.data
          sn.visible = false
        })
    },
    getResult (x) {
      let url = '/search'
      this.visible = true
      http({
        url: url,
        method: 'get',
        params: {
          search: x
        }
      })
        .then((response) => {
          this.items = response.data.results
          this.visible = false
        })
        .catch((err) => {
          alert(err)
          this.visible = false
          this.$router.go(-1)
        })
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.navb()
    })
  },
  // ?category=' + this.$route.params.name
  mounted () {
    if (this.$route.params.search) {
      this.getResult(this.$route.params.search)
    } else {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 95%
  min-height: 326px
  min-width: 150px
</style>
