<template>
  <div>
        <q-inner-loading :showing="visible">
          <q-spinner-puff
          color="primary"
          size="8em"
        />
          </q-inner-loading>
        <div style="max-width:600px" class=" q-mt-md q-pa-lg">
       <q-table v-show="!visible"
      title="Inquiries"
      :data="items"
      :columns="columns"
      row-key="name"
    />
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
      items: [],
      columns: [
        {
          name: 'id',
          required: true,
          label: 'ID',
          align: 'left',
          field: row => row.id,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'name',
          required: true,
          label: 'Name',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'number', align: 'left', label: 'Number', field: 'number', sortable: true },
        { name: 'inquiry', align: 'left', label: 'Inquiry', field: 'inquiry' },
        { name: 'created_at', align: 'left', label: 'Date', field: 'created_at' }
      ]
    }
  },
  name: 'category',
  created () {
    let url = '/inquiry'
    http({
      url: url,
      method: 'get'
    })
      .then((response) => {
        this.items = response.data.data
        this.visible = false
      }).catch(function (error) {
        alert(error)
        this.visible = false
      })
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
    })
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
