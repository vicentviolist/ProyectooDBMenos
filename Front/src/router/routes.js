const routes = [
  {
    path: '/',
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
            path: '/',
            name: 'home',
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ 'pages/Dashboard/Clientes/Home.vue'
              ),
          },
          {
            path: 'clientes',
            name: 'clientes',
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ 'pages/Dashboard/Clientes/Clientes.vue'
              ),
          },
          {
            path: 'agregarCliente',
            name: 'AddCliente',
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ 'pages/Dashboard/Clientes/AddCliente.vue'
              ),
          },
          {
            path: 'agregarPago',
            name: 'AddPago',
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ 'pages/Dashboard/Clientes/AddPago.vue'
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
