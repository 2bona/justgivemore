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
        <h5 class="q-my-xs q-mt-xs q-mb-lg text-grey-5 text-capitalize text-weight-bold">Pictures for "{{form.name}}"</h5>
         <div class="col-md-9">
        <input v-show="false" ref="file" type="file" multiple @change="fieldChange" class="q-input">
    </div>
    <div class="col-md-3">
        <q-btn  rounded color="warning" class="q-mt-sm q-mb-lg q-mx-xs" @click="openImageInput">select Image(s)</q-btn>
        <q-btn v-show="attachments.length" rounded color="primary" class="q-mt-sm q-mb-lg q-mx-xs" @click="uploadFile">Upload {{attachments.length}} {{(attachments.length === 1) ? 'image' : 'images'}}</q-btn>
    </div>
  <div class="q-mt-md" v-for="n in images" :key="n.id">
    <q-img class="rounded-borders shadow-9" style="height: 90px; max-width: 100px" :src="n.caption">
    </q-img>
    <q-btn @click="deletePic(form.id, n.id)" size="sm"  class="q-mx-xs shadow-20 text-red-3 text-weight-bold" color="transparent"  rounded>delete</q-btn>
    <q-btn :disabled="n.default === '1'" @click="makeDefault(form.id, n.id)"  size="sm" :class="n.default === '1' ? 'text-white shadow-0' : 'shadow-20 text-grey-5'" class="q-mx-xs text-weight-bold" :color="n.default === '1' ? 'blue-3' : 'transparent'"  rounded v-text="n.default ? 'Default' : 'Make Default'"></q-btn>
      </div>
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
      attachments: [],
      visible: true,
      loading: false,
      slide: 1,
      images: [],
      uploadPercentage: 0,
      form: {
        name: '',
        id: Number
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
        this.form.id = d.id
        this.images = d.image
        this.visible = false
      }).catch(function (error) {
        alert(error)
        this.visible = false
      })
  },
  methods: {
    openImageInput () {
      this.attachments = []
      this.$refs.file.click()
    },
    text (val) {
      this.form.description = val
    },
    fieldChange (e) {
      this.attachments = []
      let selectedFiles = e.target.files
      if (!selectedFiles.length) {
        return false
      }
      for (let i = 0; i < selectedFiles.length; i++) {
        this.attachments.push(selectedFiles[i])
      }
    },
    uploadFile () {
      this.visible = true
      const fd = new FormData()
      fd.append('id', this.form.id)
      fd.append('name', this.form.name)
      for (var i = 0; i < this.$refs.file.files.length; i++) {
        let file = this.$refs.file.files[i]
        fd.append('files[' + i + ']', file)
      }
      const config = { headers: { 'Content-Type': 'multipart/form-data' } }
      axios.post('/item/upload', fd, config)
        .then(res => {
          this.images = res.data.item
          this.$q.notify({
            color: 'green',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Item Added Successfully'
          })
          this.visible = false
          this.attachments = []
        })
        .catch(err => {
          this.attachments = []
          this.$q.notify({
            color: 'red',
            textColor: 'white',
            icon: 'warning',
            message: err
          })
          this.visible = false
        })
    },
    makeDefault (item, id) {
      const img = new FormData()
      img.append('item', item)
      img.append('id', id)
      this.visible = true
      axios.post('/item/makedefault', img)
        .then(res => {
          this.images = res.data.item
          this.$q.notify({
            color: 'green',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Default Set Successfully'
          })
          this.visible = false
        })
        .catch(err => {
          this.$q.notify({
            color: 'red',
            textColor: 'white',
            icon: 'warning',
            message: err
          })
          this.visible = false
        })
    },
    deletePic (item, id) {
      const img = new FormData()
      img.append('id', id)
      img.append('item', item)
      this.visible = true
      axios.post('/item/deletepic', img)
        .then(res => {
          this.images = res.data.item
          this.$q.notify({
            color: 'green',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Image Deleted Succesfully'
          })
          this.visible = false
        })
        .catch(err => {
          this.$q.notify({
            color: 'red',
            textColor: 'white',
            icon: 'warning',
            message: err
          })
          this.visible = false
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
