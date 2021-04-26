<template>
  <q-page class>
    <div class="row q-pb-xl">
      <div class="col-md-8 col-xs-12 col-sm-12" style="">
  <div class="q-pa-md" style="">
        <h5 class="q-my-xs q-mt-xs q-mb-lg text-grey-5  text-weight-bold">Add Item to {{$route.params.subcategory}}</h5>
    <q-form
    ref="form"
      class="q-gutter-md q-mt-md"
    >      <div class="q-px-md">
    <h6 class="text-weight-medium text-grey-8 text-subtitle1 q-my-sm">Fill in the form below.</h6>
            <div class="row q-col-gutter-md">
    <div class="col-xs-6">
<q-input dense
        v-model="form.name"
        label="Product name"
        hint="eg. Apple Iphone 6 Red 128gb"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
    </div>
    <div class="col-xs-6">
<q-input dense
        v-model="form.price"
        label="Product price"
        hint="eg. 50000 Do not put comma."
        lazy-rules
        :rules="numberRules"
      />
    </div>
    <div class="col-xs-6">
<q-input dense
        v-model="form.discount"
        label="Product discount"
        hint="eg. 50, Do not put %."
      />
    </div>
    <div class="col-xs-6">
       <q-select :loading="loading" dense  v-model="form.category" :options="['Phone', 'Accessories']" label="Category" />
    </div>
    <div v-if="form.category === 'Phone'" class="col-xs-6">
       <q-select :loading="loading" dense  v-model="form.ram" :options="['1gb', '2gb', '4gb', '6gb', '8gb', '12gb', '32gb' ]" label="Phone Ram" />
    </div>
    <div v-if="form.category === 'Phone'" class="col-xs-6">
       <q-select :loading="loading" dense  v-model="form.rom" :options="['2gb', '4gb', '8gb', '16gb', '32gb', '64gb', '128gb', '256gb', '512gb', '1tb']" label="Phone Rom" />
    </div>
       <div class="col-xs-6">
    <q-input dense
    v-if="form.category === 'Phone'"
        v-model="form.battery"
        label="Battery capacity (optional)"
    hint="Phone battery capacity as it is e.g. 4500mah."
        lazy-rules
      />
           </div>
       <div class="col-xs-6">
    <q-input dense
        v-model="form.weight"
        label="Item Weight (optional)"
    hint="Item weight in grams, eg 120 NOT 120grams"
        lazy-rules
      />
           </div>
       <div class="col-xs-6">
    <q-input dense
        v-model="form.video"
        label="Video Link"
    hint="Item video from youtube"
        lazy-rules
        @blur="getCode"
      />
           </div>
            </div><editor @val="text" :editor="form.description" />
            </div>
    <div class="text-center">
        <q-btn rounded class="shadow-20 q-my-lg"  :loading="loading" @click.prevent="submitAdminForm()" label="submit" type="submit" color="primary"/>
    </div>
</q-form>
  </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import editor from './editor.vue'
import axios from 'axios'
import wrapper from 'axios-cache-plugin'

let http = wrapper(axios, {
  maxCacheSize: 15, // cached items amounts. if the number of cached items exceeds, the earliest cached item will be deleted. default number is 15.
  ttl: 60000, // time to live. if you set this option the cached item will be auto deleted after ttl(ms).
  excludeHeaders: true // should headers be ignored in cache key, helpful for ignoring tracking headers
})
export default {
  components: {
    editor
  },
  data () {
    return {
      btns: false,
      cart: false,
      info: false,
      accept: false,
      exp: false,
      loading: false,
      slide: 1,
      form: {
        name: '',
        ram: '',
        rom: '',
        discount: '',
        brand: '',
        video: '',
        battery: '',
        qty: '',
        category: '',
        description: 'Description',
        weight: '',
        price: ''
      },
      category: [],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      numberRules: [
        (v) => !!v || 'Phone number is required',
        (v) => Number(v) || 'Number must be valid'
      ]
    }
  },
  name: 'admin',
  methods: {
    text (val) {
      this.form.description = val
    },
    getCode () {
      this.form.video = this.form.video.split('=').pop()
    },
    submitAdminForm () {
      this.loadingSub = true
      this.$refs.form.validate().then(success => {
        if (success) {
          let url = '/item/save'
          this.loading = true
          const sn = this
          http({
            url: url,
            method: 'post',
            params: {
              name: this.form.name,
              brand: this.$route.params.subcategory,
              weight: this.form.weight,
              battery: this.form.battery,
              category: this.form.category.toLowerCase(),
              ram: this.form.ram,
              discount: this.form.discount,
              rom: this.form.rom,
              sku: new Date(),
              qty: this.form.qty,
              video: this.form.video,
              description: this.form.description,
              price: this.form.price
            }
          })
            .then((response) => {
              sn.loading = false
              sn.$q.notify({
                color: 'green',
                textColor: 'white',
                icon: 'cloud_done',
                message: 'Item Added Successfully'
              })
            })
            .catch(function (error) {
              sn.$q.notify({
                color: 'red',
                textColor: 'white',
                icon: 'warning',
                message: 'Error occured'
              })
              alert(error)
              sn.loading = false
            })
            .then(() => {
              this.loading = false
            })
        } else {
          this.loading = false
        }
      })
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
