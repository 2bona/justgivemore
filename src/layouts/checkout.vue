<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar dense class="bg-white">
        <q-toolbar-title class="">
            <q-btn color="black" flat round
      icon="mdi-arrow-left" @click="$router.go(-1)"
    />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      overlay
      elevated
      bordered
      content-class=""
      :width="240"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item  v-ripple clickable>
            <q-item-section avatar>
              <q-icon color="grey" name="home" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Home</q-item-label>
            </q-item-section>
          </q-item>
               <div class="q-py-md q-px-md text-grey-9">
            <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
              <a
                v-for="button in buttons2"
                :key="button.text"
                class="YL__drawer-footer-link"
                href="javascript:void(0)"
              >
                {{ button.text }}
              </a>
            </div>
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
  <transition
  appear
  enter-active-class="animated fadeIn"
  leave-active-class="animated fadeOut"
>
      <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MyLayout',

  data () {
    return {
      leftDrawerOpen: false,
      image: require('../assets/Logo.png'),
      tab: 'mails',
      buttons2: [
        { text: 'Terms' },
        { text: 'Privacy' },
        { text: 'Policy & Safety' },
        { text: 'Test new features' }
      ]
    }
  }
}
</script>
<style lang="sass">

  .YL__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem
    &:hover
    color: #000
</style>
