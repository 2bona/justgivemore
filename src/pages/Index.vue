<template>
      <div>
        <q-inner-loading :showing="visible">
          <q-spinner-puff
          color="primary"
          size="8em"
        />
          </q-inner-loading>
        <div class="row q-mt-xs q-px-0 q-mb-xl">
          <div class="q-px-sm" style="width:100%">
      <q-carousel
      animated
      v-model="slide"
      navigation class="shadow-5"
      infinite height="auto"
       autoplay style="border-radius:20px"
      transition-prev="slide-right" control-color="blue-10"
      transition-next="slide-left"
    >
      <q-carousel-slide class="q-pa-none" v-for="(n, i) in slides" :key="i" :name="i"  >
      <q-img :ratio="5/3" :src="n" />
      </q-carousel-slide>
  </q-carousel>
          </div>
          <h5 style="width: 100%;" class="text-center text-h6 text-grey-6 text-weight-bolder q-px-sm q-my-lg">Categories</h5>
         <!--  <h5 style="width: 100%;" class="text-center text-body2 text-weight-medium text-grey-5 q-px-sm q-my-none">Home of premium phones and accessories sold at the best prices in computer village</h5>
          <h5 style="width: 100%;" class="text-center text-caption text-grey-5 q-px-sm q-my-none">Visit us at No 7. Idowu Lane, Shop 37, Computer Village, Ikeja, Lagos, Nigeria.</h5> -->
          <div v-for="n in category" :key="n.id" style="margin-bottom: 80px" class="col-md-4 text-center col-xs-6 col-sm-6">
              <transition
              enter-active-class="animated fadeIn"
              leave-active-class="animated fadeOut"
              >
              <router-link :to="'/main/'+n.name" style=" text-decoration: none;">
            <q-card style="border-radius:20px" class="shadow-2  my-card">
           <q-img
                style="height: 100%;border-radius:10px; width:100%"
                :src="n.image"
              >
             </q-img>
             <q-card-section class="text-weight-bold text-grey-8 text-h6 ">
               {{n.name | name}}
             </q-card-section>
            </q-card>
            </router-link>
            </transition>
          </div>
        </div>
      </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      name: null,
      age: null,
      slide: 1,
      visible: true,
      info: false,
      accept: false,
      category: [],
      slides: [
        'https://res.cloudinary.com/dnqw7x4bp/image/upload/v1582457403/give5.jpg',
        'https://res.cloudinary.com/dnqw7x4bp/image/upload/v1582457404/give2.jpg',
        'https://res.cloudinary.com/dnqw7x4bp/image/upload/v1582457403/give6.jpg',
        'https://res.cloudinary.com/dnqw7x4bp/image/upload/v1582457397/give_1.jpg',
        'https://res.cloudinary.com/dnqw7x4bp/image/upload/v1582457396/give4.jpg',
        'https://res.cloudinary.com/dnqw7x4bp/image/upload/v1582457395/give3.jpg'
      ]
    }
  },
  methods: {
    setItem (n) {
      this.items = n
    },
    navb () {
      this.$store.dispatch('setNav', false)
    }
  },
  name: 'PageIndex',
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.navb()
    })
  },
  created () {
    let url = '/category/all'
    axios.get(url)
      .then((response) => {
        this.category = response.data.data
        this.visible = false
      }).catch(function (error) {
        alert(error)
        this.visible = false
      })
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 95%
  height: 200px
  margin: auto
</style>
