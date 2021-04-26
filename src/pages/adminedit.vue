<template>
  <q-page class>
    <div class="row q-pb-xl">
        <q-inner-loading :showing="visible">
          <q-spinner-puff
          color="primary"
          size="8em"
        />
          </q-inner-loading>
      <div v-if="!visible" class="col-md-8 col-xs-12 col-sm-12" style="">
  <div class="q-pa-md" style="">
        <h5 class="q-my-xs q-mt-xs q-mb-lg text-grey-5  text-weight-bold">Edit {{form.name}}</h5>
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
      />
    </div>
    <div class="col-xs-6">
<q-input dense
        v-model="form.discount"
        label="Product discount"
        hint="eg. 50 Do not put %."
      />
    </div>
    <div class="col-xs-6">
       <q-select :loading="loading" dense  v-model="form.brand" :options="['Apple', 'Samsung', 'Others']" label="Brand" />
    </div>
    <div class="col-xs-6">
       <q-select :loading="loading" dense  v-model="form.category" :options="['Phone', 'Accessories', 'Others']" label="Category" />
    </div>
    <div v-if="form.category === 'Phone'" class="col-xs-6">
       <q-select :loading="loading" dense  v-model="form.ram" :options="['1gb', '2gb', '4gb', '6gb', '8gb', '12gb', '32gb' ]" label="Phone Ram" />
    </div>
    <div v-if="form.category === 'Phone'" class="col-xs-6">
       <q-select :loading="loading" dense  v-model="form.rom" :options="['2gb', '4gb', '8gb', '16gb', '32gb', '64gb', '128gb', '256gb', '512gb']" label="Phone Rom" />
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
    hint="Item weight in grams."
        lazy-rules
      />
           </div>
       <div class="col-xs-6">
    <q-input dense
        v-model="form.video"
        label="Video code."
        hunt="Item video from youtube."
        lazy-rules
        @blur="getCode"
      />
           </div>
            </div>
            <p class="q-mt-lg text-grey-7 text-weight-light">Item description <span class="text-caption">
          (write in the editor below and style as desired)
          </span></p>
                <q-editor
      v-model="form.description"
      :dense="$q.screen.lt.md"
      toolbar-push
      :toolbar="[
        [
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            list: 'only-icons',
            options: ['left', 'center', 'right', 'justify']
          },
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            options: ['left', 'center', 'right', 'justify']
          }
        ],
        ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
        ['token', 'hr', 'link', 'custom_btn'],
        [
          {
            label: $q.lang.editor.formatting,
            icon: $q.iconSet.editor.formatting,
            list: 'no-icons',
            options: [
              'p',
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6',
              'code'
            ]
          },
          {
            label: $q.lang.editor.fontSize,
            icon: $q.iconSet.editor.fontSize,
            fixedLabel: true,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'size-1',
              'size-2',
              'size-3',
              'size-4',
              'size-5',
              'size-6',
              'size-7'
            ]
          },
          {
            label: $q.lang.editor.defaultFont,
            icon: $q.iconSet.editor.font,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'default_font',
              'arial',
              'arial_black',
              'comic_sans',
              'courier_new',
              'impact',
              'lucida_grande',
              'times_new_roman',
              'verdana'
            ]
          },
          'removeFormat'
        ],
        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

        ['undo', 'redo'],
      ]"
      :fonts="{
        arial: 'Arial',
        arial_black: 'Arial Black',
        comic_sans: 'Comic Sans MS',
        courier_new: 'Courier New',
        impact: 'Impact',
        lucida_grande: 'Lucida Grande',
        times_new_roman: 'Times New Roman',
        verdana: 'Verdana'
      }"
    />
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
import axios from 'axios'
import wrapper from 'axios-cache-plugin'

let http = wrapper(axios, {
  maxCacheSize: 15, // cached items amounts. if the number of cached items exceeds, the earliest cached item will be deleted. default number is 15.
  ttl: 60000, // time to live. if you set this option the cached item will be auto deleted after ttl(ms).
  excludeHeaders: true // should headers be ignored in cache key, helpful for ignoring tracking headers
})
export default {
  components: {
  },
  data () {
    return {
      btns: false,
      cart: false,
      info: false,
      accept: false,
      exp: false,
      visible: true,
      loading: false,
      slide: 1,
      form: {
        name: '',
        ram: '',
        discount: '',
        rom: '',
        brand: '',
        battery: '',
        qty: '',
        video: '',
        category: '',
        description: '',
        weight: '',
        id: Number,
        price: ''
      },
      category: [],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ]
    }
  },
  name: 'admin',
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
        var d = response.data.data
        this.form.name = d.name
        this.form.ram = d.ram
        this.form.discount = d.discount
        this.form.rom = d.rom
        this.form.battery = d.battery
        this.form.qty = d.qty
        this.form.id = d.id
        this.form.video = d.video
        this.form.price = d.price
        this.form.description = d.description
        this.form.weight = d.weight
        this.form.brand = d.brand.charAt(0).toUpperCase() + d.brand.slice(1)
        this.form.category = d.category.charAt(0).toUpperCase() + d.category.slice(1)
        this.visible = false
      }).catch(function (error) {
        alert(error)
        this.visible = false
      })
  },
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
          let url = '/item/update'
          this.loading = true
          http({
            url: url,
            method: 'post',
            params: {
              name: this.form.name,
              brand: this.form.brand.toLowerCase(),
              weight: this.form.weight,
              category: this.form.category.toLowerCase(),
              battery: this.form.battery,
              ram: this.form.ram,
              discount: this.form.discount,
              rom: this.form.rom,
              id: this.form.id,
              video: this.form.video,
              sku: new Date(),
              qty: this.form.qty,
              description: this.form.description,
              price: this.form.price
            }
          })
            .then((response) => {
              var res = response.data.data
              this.form.rom = res.rom
              this.form.ram = res.ram
              this.form.sku = res.sku
              this.form.qty = res.qty
              this.form.description = res.description
              this.form.price = res.price
              this.form.video = res.video
              this.form.category = res.category.charAt(0).toUpperCase() + res.category.slice(1)
              this.form.weight = res.weight
              this.form.brand = res.brand.charAt(0).toUpperCase() + res.brand.slice(1)
              this.form.name = res.name
              this.loading = false

              this.$q.notify({
                color: 'green',
                textColor: 'white',
                icon: 'cloud_done',
                message: 'Item Edited Successfully'
              })
            })
            .catch(function (error) {
              this.$q.notify({
                color: 'red',
                textColor: 'white',
                icon: 'warning',
                message: 'Error occured'
              })
              alert(error)
              this.loading = false
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
