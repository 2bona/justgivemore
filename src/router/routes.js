
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/search/:search', props: true, component: () => import('pages/search.vue') },
      { path: '/product/:name', props: true, component: () => import('pages/product.vue') },
      { path: '/main/:category', props: true, component: () => import('pages/category.vue') },
      { path: '/sub/:category/:subcategory', props: true, component: () => import('pages/category.vue') },
      { path: 'policy/:name/', props: true, component: () => import('pages/policy.vue') }
    ]
  },
  {
    path: '/adminemy12',
    component: () => import('layouts/adminemyhub.vue'),
    children: [
      { path: 'add/:subcategory', component: () => import('pages/indexad.vue') },
      { path: 'list/:subcategory', props: true, component: () => import('pages/adminlist.vue') },
      { path: 'edit/:name', props: true, component: () => import('pages/adminedit.vue') },
      { path: '', props: true, component: () => import('pages/admincategory.vue') },
      { path: 'category', props: true, component: () => import('pages/admincategory.vue') },
      { path: 'subcategory/:category', props: true, component: () => import('pages/adminsubcategory.vue') },
      { path: 'company', props: true, component: () => import('pages/admincompany.vue') },
      { path: 'address/:company', props: true, component: () => import('pages/adminaddress.vue') },
      { path: 'pics/:name', props: true, component: () => import('pages/adminpics.vue') },
      { path: 'delete/:name', props: true, component: () => import('pages/admindelete.vue') },
      { path: 'editterm/:terms', props: true, component: () => import('pages/adminterms.vue') },
      { path: 'notify', component: () => import('pages/notification.vue') }
    ]
  },
  {
    path: '/checkout',
    component: () => import('layouts/checkout.vue'),
    children: [
      { path: '', component: () => import('pages/info.vue') },
      { path: 'shipping', component: () => import('pages/shipping.vue') },
      { path: 'payment', component: () => import('pages/payment.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
