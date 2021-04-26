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
        <h5 class="q-my-xs q-mt-xs q-mb-lg text-grey-5  text-weight-bold">Edit {{name}}</h5>
              <p class="q-mt-lg text-grey-7 text-weight-light">Item description <span class="text-caption">
          (write in the editor below and style as desired)
          </span></p>
                <q-editor
      v-model="content"
      :dense="$q.screen.lt.md"
      @paste.native="evt => pasteCapture(evt)"
      toolbar-push
      ref="editor_ref"
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
        name: this.$route.params.terms
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
  },
  methods: {
    pasteCapture (evt) {
      let text, onPasteStripFormattingIEPaste
      evt.preventDefault()
      if (evt.originalEvent && evt.originalEvent.clipboardData.getData) {
        text = evt.originalEvent.clipboardData.getData('text/plain')
        this.$refs.editor_ref.runCmd('insertText', text)
      } else if (evt.clipboardData && evt.clipboardData.getData) {
        text = evt.clipboardData.getData('text/plain')
        this.$refs.editor_ref.runCmd('insertText', text)
      } else if (window.clipboardData && window.clipboardData.getData) {
        if (!onPasteStripFormattingIEPaste) {
          onPasteStripFormattingIEPaste = true
          this.$refs.editor_ref.runCmd('ms-pasteTextOnly', text)
        }
        onPasteStripFormattingIEPaste = false
      }
    },
    text (val) {
      this.form.description = val
    },
    submitAdminForm () {
      this.loadingSub = true
      let url = '/terms'
      const sn = this
      this.loading = true
      http({
        url: url,
        method: 'post',
        params: {
          id: this.id,
          content: this.content
        }
      })
        .then((response) => {
          var res = response.data.data
          this.content = res.content
          this.loading = false
          sn.$q.notify({
            color: 'green',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Item Edited Successfully'
          })
        })
        .then(() => {
          sn.loading = false
        })
        .catch(function (error) {
          sn.$q.notify({
            color: 'red',
            textColor: 'white',
            icon: 'warning',
            message: error
          })
          sn.loading = false
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
