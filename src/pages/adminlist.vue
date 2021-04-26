<template>
  <div>
        <q-inner-loading :showing="visible">
          <q-spinner-puff
          color="primary"
          size="8em"
        />
          </q-inner-loading>
        <div style="" class="row q-mt-md q-px-xs">
          <h6 class="q-my-sm q-px-sm">{{$route.params.subcategory}}</h6>
                    <q-btn @click="$router.push('/adminemy12/add/'+$route.params.subcategory)" color="white" text-color="black" label="Add new" />
        <q-list style="width: 100%;" class="rounded-borders">
      <q-item v-for="n in items" :key="n.id" >
        <q-item-section style="min-width: 53%;" class="text-grey-8 text-weight-medium text-caption text-capitalize">
          {{n.name}}
        </q-item-section>
        <q-item-section class="text-capitalize">
          <q-btn size="sm" :to="'/adminemy12/delete/' + n.name"  class="text-grey-5 shadow-1 bg-white"  icon="mdi-trash-can"></q-btn>
        </q-item-section>
        <q-item-section class="text-capitalize">
          <q-btn size="sm" :to="'/adminemy12/edit/' + n.name" style=" margin-bottom: 7px;" class="text-grey-5 shadow-12 bg-white" icon="edit"></q-btn>
        </q-item-section>
        <q-item-section class="text-capitalize">
          <q-btn size="sm" :to="'/adminemy12/pics/' + n.name" class="text-grey-5 shadow-24 bg-white"  style=" margin-bottom: 13px;" icon="camera"></q-btn>
        </q-item-section>
      </q-item>
    </q-list>
        </div>
      </div>
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
  data () {
    return {
      name: null,
      age: null,
      visible: true,
      info: false,
      accept: false,
      items: []
    }
  },
  name: 'category',
  methods: {
    cat (item) {
      this.items = item
    },
    run () {
      let url = '/subcategory/find'
      http({
        url: url,
        method: 'get',
        params: {
          name: this.$route.params.subcategory
        }
      })
        .then((response) => {
          this.items = response.data.data[0].items
          this.visible = false
        }).catch(function (error) {
          alert(error)
          this.visible = false
        })
    }
  },
  mounted () {
    this.run()
  },
  beforeRouteUpdate (to, from, next) {
    this.run()
    next()
  }
  // ?category=' + this.$route.params.name
}
</script>

<style lang="sass" scoped>
.my-card
  width: 95%
  min-height: 340px
  min-width: 150px
</style>
