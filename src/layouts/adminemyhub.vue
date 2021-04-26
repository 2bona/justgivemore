<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar dense class="bg-white">
        <q-toolbar-title class="text-black text-caption">
            <q-btn color="black" flat round
      icon="mdi-arrow-left" @click="$router.go(-1)"
    /> Admin dashboard
        </q-toolbar-title>
    <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          class="text-grey-10"
          aria-label="Menu"
        />
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
        <q-list padding v-for="n in buttons2" :key="n.link">
        <q-item :to="n.link"  v-ripple clickable>
            <q-item-section>
              <q-item-label>{{n.text}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
  <transition
  appear
  enter-active-class="animated fadeIn"
  leave-active-class="animated fadeOut"
>
<keep-alive>
      <router-view :key="$route.fullPath" />
</keep-alive>
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
        {
          text: 'Categories of Gadgets',
          link: '/adminemy12/category'
        },
        {
          text: 'Delivery Companies',
          link: '/adminemy12/company'
        },
        {
          text: 'Inquiry',
          link: '/adminemy12/notify'
        },
        {
          text: 'Terms of service',
          link: '/adminemy12/editterm/terms'
        },
        {
          text: 'Privacy policy',
          link: '/adminemy12/editterm/privacy'
        },
        {
          text: 'Refund policy',
          link: '/adminemy12/editterm/refund'
        },
        {
          text: 'Shipping policy',
          link: '/adminemy12/editterm/shipping'
        }
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
