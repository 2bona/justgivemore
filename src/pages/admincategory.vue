<template>
  <div>
        <q-inner-loading style="z-index: 99999;" :showing="visible">
          <q-spinner-puff
          color="primary"
          size="8em"
        />
          </q-inner-loading>
        <div style="" class="row q-mt-md q-px-xs">
    <q-card class="q-mx-auto my-card bg-primary text-white">
      <q-card-section>
        <div class="text-h6">Categories</div>
        <div class="text-subtitle2">
            <q-btn @click="dialog = !dialog" color="white" text-color="black" :label="!dialog ? 'Add new' : 'Hide form'" />
            <q-btn class="q-ml-sm" v-show="editDialog" @click="editDialog = !editDialog" color="white" text-color="black" :label="'Close edit form'" />
        </div>
              <q-card v-show="dialog" class="q-pa-sm q-mt-sm">
        <q-card-section>
          <div class="text-h6  text-black">Add new category</div>
        </q-card-section>

      <q-form
      @submit="onSubmit"
    >
      <q-input
        filled
        v-model="name"
        label="Name of category"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        filled
        v-model="image"
        label="Image link"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
      </div>
    </q-form>
      </q-card>
              <q-card v-show="editDialog" class="q-pa-sm q-mt-sm">
        <q-card-section>
          <div class="text-h6 text-black">Edit Category</div>
        </q-card-section>

      <q-form
      @submit="onEdit"
    >
      <q-input
        filled
        v-model="editname"
        label="Name of category"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />

      <q-input
        filled
        v-model="editimage"
        label="Image link"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
      </div>
    </q-form>
      </q-card>
      </q-card-section>
      <q-separator dark />
        <q-list dense bordered padding class="rounded-borders">
      <q-item v-for="n in items" :key="n.id">
        <q-item-section @click="$router.push('/adminemy12/subcategory/'+n.name)">
          {{n.name}}
        </q-item-section>
        <q-item-section side>
             <div class="text-grey-8 q-gutter-xs">
        <q-btn @click="del(n.id)"  size="12px" flat dense color="white" round icon="delete" />
            <q-btn  @click="edit(n)"  size="12px" flat dense color="white" round icon="edit" />
             </div>
            </q-item-section>
      </q-item>
        </q-list>
    </q-card>
        </div>
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Delete Category.</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn @click="delCat()" flat label="Sure" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
      age: null,
      visible: true,
      dialog: false,
      confirm: false,
      editDialog: false,
      info: false,
      accept: false,
      items: [],
      name: '',
      image: '',
      editname: '',
      editimage: '',
      editid: '',
      deleteid: ''
    }
  },
  name: 'category',
  methods: {
    del (x) {
      this.confirm = true
      this.deleteid = x
    },
    delCat () {
      this.visible = true
      this.confirm = false
      let url = '/category/delete'
      http({
        url: url,
        method: 'get',
        params: {
          id: this.deleteid
        }
      })
        .then((response) => {
          this.run()
          this.visible = false
        }).catch(function (error) {
          alert(error)
          this.visible = false
        })
    },
    onSubmit () {
      this.visible = true
      let url = '/category/save'
      http({
        url: url,
        method: 'post',
        params: {
          name: this.name,
          image: this.image
        }
      })
        .then((response) => {
          this.run()
          this.visible = false
        }).catch(function (error) {
          alert(error)
          this.visible = false
        })
    },
    edit (n) {
      this.editDialog = true
      this.editname = n.name
      this.editimage = n.image
      this.editid = n.id
    },
    onEdit () {
      this.visible = true
      let url = '/category/update'
      http({
        url: url,
        method: 'post',
        params: {
          id: this.editid,
          name: this.editname,
          image: this.editimage
        }
      })
        .then((response) => {
          this.run()
          this.visible = false
        }).catch(function (error) {
          alert(error)
          this.visible = false
        })
    },
    cat (item) {
      this.items = item
    },
    run () {
      let url = '/category/all'
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
    }
  },
  created () {
    this.run()
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.run()
    })
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
