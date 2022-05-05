const routes = [
  {
    path: '/',
    component: () =>
      import(/* webpackChunkName: "login" */ 'layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () =>
          import(/* webpackChunkName: "login" */ 'pages/MainPage.vue'),
      },
      {
        path: 'forgotPassword',
        name: 'forgotPassword',
        component: () =>
          import(/* webpackChunkName: "forgot" */ 'pages/ForgotPassword.vue'),
      },
    ],
  },
  {
    path: '/dashboard',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ 'layouts/DashboardLayout.vue'),
    children: [
      {
        path: '',
        component: () =>
          import(
            /* webpackChunkName: "dashboard" */ 'pages/Dashboard/MainBoard.vue'
          ),
        children: [
          {
            path: 'list',
            name: 'dashboard',
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ 'pages/Dashboard/List/ListData.vue'
              ),
          },
          {
            path: 'bulk-load',
            name: 'bulkLoad',
            component: () =>
              import(
                /* webpackChunkName: "bulk" */ 'pages/Dashboard/Bulk/BulkLoad.vue'
              ),
          },
        ],
        meta: {
          requiresAuth: false,
        },
      },
    ],
  },
];

// Always leave this as last one
routes.push({
  path: '*',
  component: () => import('pages/Error404.vue'),
});

export default routes;
