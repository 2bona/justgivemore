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
      <div class="q-pa-md" v-html="content" style="">
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
      id: Number,
      name: String,
      content: String
    }
  },
  name: 'admin',
  created () {
    let url = '/terms'
    http({
      url: url,
      method: 'get',
      params: {
        name: this.$route.params.name
      }
    })
      .then((response) => {
        var d = response.data.data
        this.name = d[0].name
        this.content = d[0].content
        this.id = d[0].id
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
  min-height: 340px
  min-width: 150px

.q-carousel__slide
    height: 100%
    padding: 16px
    background-size: contain
    background-position: 50%
    background-repeat: no-repeat

</style>
