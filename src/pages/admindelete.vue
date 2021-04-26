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
        <h4 class="q-my-xs q-mt-xs q-mb-lg text-grey-5 text-capitalize text-weight-bold">Delete "{{form.name}}"</h4>
    <q-form
    ref="form"
      class="q-gutter-md q-mt-md"
    >
    <div class="text-center">
        <q-btn rounded class="shadow-20 q-my-lg"  :loading="loading" @click.prevent="submitAdminForm()" label="delete" type="submit" color="accent"/>
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
        rom: '',
        brand: '',
        battery: '',
        qty: '',
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
        this.form.rom = d.rom
        this.form.battery = d.battery
        this.form.qty = d.qty
        this.form.id = d.id
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
    submitAdminForm () {
      this.loadingSub = true
      this.$refs.form.validate().then(success => {
        if (success) {
          let url = '/item/delete'
          this.loading = true
          http({
            url: url,
            method: 'post',
            params: {
              name: this.form.name,
              id: this.form.id
            }
          })
            .then((response) => {
              this.loading = false
              this.$router.go(-1)
              this.$q.notify({
                color: 'green',
                textColor: 'white',
                icon: 'cloud_done',
                message: 'Item Deleted Successfully'
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
