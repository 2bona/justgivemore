<template>
  <q-layout view="lHh Lpr lFf">
    <q-header style="position:absolute">
      <q-toolbar dense class="shadow-4 bg-blue-10">
        <q-toolbar-title class>
          <router-link to="/">
          <!-- <p v-show="!showNav"  class="text-weight-bold text-white q-my-sm">Justgivemore</p> -->
          <q-img  src="https://res.cloudinary.com/dnqw7x4bp/image/upload/v1582453247/just_give_more_main.png" v-show="!showNav" spinner-color="white" style="height: 50px; max-width: 151px" />
          </router-link>
    <q-btn v-show="showNav"  flat round
      icon="mdi-arrow-left" @click="$router.go(-1)"
    />
    <!-- Get the order  returned from database use the details to configure paystack  -->
          </q-toolbar-title>
        <q-btn
          dense
          round
          flat
          @click="cartFn"
          icon="mdi-cart"
          class="q-mr-sm"
          aria-label="Menu"
        >
        <q-badge color="orange" v-if="cartCount" floating>{{cartCount}}</q-badge>
        </q-btn>
        <q-btn
          dense
          round
          flat
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          class=""
          aria-label="Menu"
        />
      </q-toolbar>
      <!-- <q-tabs
      v-show="!showNav"
        narrow-indicator
        v-model="tab"
        inline-label
        align="left"
        shrink
        dense
        indicator-color="transparent"
        active-color="primary"
        class="bg-white text-weight-bolder text-capitalize shadow-1 text-grey-5"
      >
        <q-route-tab v-for="n in items" class="text-capitalize text-weight-bolder" :key="n.id" :to="'/main/'+n.name" :name="n.name" :label="n.name" />
         </q-tabs> -->
    </q-header>
    <q-drawer style="z-index:999999" v-model="leftDrawerOpen" overlay elevated bordered content-class :width="240">
      <q-scroll-area class="fit">
           <q-list padding>
        <q-item to="/"  v-ripple clickable>
            <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            H
          </q-avatar>
        </q-item-section>
            <q-item-section>
              <q-item-label class="text-blue-3 text-weight-medium text-body1">Home</q-item-label>
            </q-item-section>
          </q-item>
           </q-list>
           <q-list padding v-for="n in items" :key="n.id">
        <q-item :to="'/main/'+n.name"  v-ripple clickable>
                      <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{n.name[0]}}
          </q-avatar>
        </q-item-section>
            <q-item-section>
              <q-item-label class="text-blue-3 text-weight-medium text-body1">{{n.name}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
           <q-list padding v-for="n in buttons2" :key="n.link">
        <q-item :to="n.link"  v-ripple clickable>
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{n.text[0]}}
          </q-avatar>
        </q-item-section>
            <q-item-section>
              <q-item-label class="text-blue-3 text-weight-medium text-body1">{{n.text}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        <q-list>
        <q-item   v-ripple clickable>
            <q-item-section>
              <p class="text-center text-blue-2">Follow us on social media</p>
                         <div class="text-warning text-center q-gutter-md" style="font-size: 2em; margin-bottom:130px; margin-top:5px">
      <a href="https://mobile.twitter.com/JGM53878272" target="_blank"><q-btn round class="shadow-2 text-blue-3" color="white" icon="mdi-twitter" /></a>
      <a href="https://web.facebook.com/jgmjustgivemore" target="_blank"><q-btn round class="shadow-2 text-blue-9" color="white" icon="mdi-facebook" /></a>
      <a href="https://www.instagram.com/jgmjustgivemore/" target="_blank"><q-btn round class="shadow-2 text-purple-5" color="white" icon="mdi-instagram" /></a>
    </div>
              <!-- <q-item-labels class="text-blue-3 text-weight-medium text-body1">{{n.text}}</q-item-label> -->
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
  <q-page class>
    <div class="row">
      <div class="col-md-8 q-mx-auto q-pb-xl col-xs-12 col-sm-12">
            <div style="width:100%;z-index:999;top: 5px; margin-top: 9px;position: -webkit-sticky;position: sticky;" class="q-mb-md q-px-sm row">
      <div class="col">
        <q-form @submit="searchTerm" ref="form">
    <q-input hide-bottom-space borderless lazy-rules v-model="search"
 style="border-radius:25px" :rules="rules" dense class="shadow-5 bg-white" rounded outlined
    label="Search for gadgets eg. Iphone, Samsung, HP laptop, speaker" />
        </q-form>
      </div>
      <div class="col-3 q-pl-xs text-center">
        <q-btn @click="searchTerm()" rounded size="" class="full-width shadow-10 q-my-xs text-blue-1" color="blue-10" label="search" />
      </div>
    </div>
<keep-alive>
   <router-view :key="$route.fullPath"></router-view>
       </keep-alive>
</div>
      <div class="shadow-20 q-px-0"
            style="
           z-index:999999;
           position: fixed;
           right: 0; min-width:90px;top: 50px;
    width:100%; max-width: 400px">
      <floater />
            </div>
    </div>
  </q-page>
    </q-page-container>
        <q-card square dark bordered class="bg-black q-pb-lg text-grey-5 q-mx-auto my-card">
      <q-card-section>
        <div class="text-h6 text-uppercase text-center">About us</div>
      </q-card-section>

      <q-separator dark inset />
      <q-card-section>
        Welcome to Justgivemore.ng! Justgivemore.ng is Nigeria's No.1 shopping
         website that offers you the best deals on phones, laptops, smart watches,
          headsets, earphones, bluetooth speakers and portable wi-fi's for now,
           online. We make sure to give you your expected standard of products by
            dealing only on the best of quality. We are working hard to expand our
             categories so as to help you bring to hand that gadget of your desire.
We are incorporating with the major distributors which enables us to offer you with
 the best and lowest price in the market. Because we are very optimistic about encouraging
  our users and Nigerians to be cyber-inclined, we strive to provide you with the latest and
   new gadgets in the global market.
Our services <strong>GUARANTEE 72HOURS NATIONWIDE DELIVERY</strong>, 5 working days return policy,
 refund policy, 5 days save order due to insufficient balance, dedicated customer service support
  and providing possibly best shopping experience for our customers.
Thanks for your trust and constantly believing in us to serve you better.

      </q-card-section>
      <q-separator inset />

      <q-card-section>
<strong>Need help? Contact us on 0803-0866-639, 0905-8111-676 or send us an email on jgm.justgivemore@yahoo.com</strong>
      </q-card-section>
    </q-card>
  </q-layout>
</template>

<script>
import floater from './floater.vue'
import axios from 'axios'
import wrapper from 'axios-cache-plugin'

let http = wrapper(axios, {
  maxCacheSize: 15, // cached items amounts. if the number of cached items exceeds, the earliest cached item will be deleted. default number is 15.
  ttl: 60000, // time to live. if you set this option the cached item will be auto deleted after ttl(ms).
  excludeHeaders: true // should headers be ignored in cache key, helpful for ignoring tracking headers
})

export default {
  name: 'MyLayout',
  components: {
    floater
  },
  data () {
    return {
      items: [],
      search: '',
      leftDrawerOpen: false,
      loading: false,
      image: require('../assets/Logo.png'),
      tab: null,
      rules: [
        (v) => (v != null && v.replace(/ +/g, '').length >= 3) || 'Min 3 characters',
        (v) => /^[0-9a-z\s]{0,30}$/i.test(v) || 'Search must be valid'
      ],
      buttons2: [
        {
          text: 'Terms of service',
          link: '/policy/terms'
        },
        {
          text: 'Privacy policy',
          link: '/policy/privacy'
        },
        {
          text: 'Refund policy',
          link: '/policy/refund'
        },
        {
          text: 'Shipping policy',
          link: '/policy/shipping'
        }
      ]
    }
  },
  computed: {
    showNav () {
      return this.$store.getters.getNav
    },
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
    cartFn () {
      this.$store.dispatch('showCart', !this.cartStatus)
    },
    run () {
      let url = '/category/all'
      http({
        url: url,
        method: 'get'
      })
        .then((response) => {
          this.items = response.data.data
          this.loading = false
        }).catch(function (error) {
          alert(error)
          this.loading = false
        })
    },
    searchTerm () {
      this.$refs.form.validate()
      if (!this.$refs.form.hasError) {
        this.$router.push('/search/' + this.search)
      }
    }
  },
  mounted () {
    this.run()
  }
}
</script>

<style lang="sass">

  .YL__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem
    &:hover
    color: #000
  .q-drawer
    background-color: #042d70
</style>
