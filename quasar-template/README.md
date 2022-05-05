# Clean Template (clean-template)

Proyecto base

## Por donde comenzar

### Para instalar

```bash
npm install
```

### Iniciar la app en modo desarrollo (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Compilar app para producción

```bash
quasar build
```

## Buenas prácticas

### Router

#### Agrupación de componentes.

Agrupar cada componente en `chunks` usando el comentario mágico de Webpack `webpackChunkName`.

Por ejemplo, al invocar la app por primera vez únicamente requerimos el formulario de inicio de sesión, por lo que agrupamos el componente `MainLayout` y el componente `Index` dentro del `chunk` `login`. El componente `ForgotPassword` será llamado únicamente cuando sea necesario.

```js
// router.js
{
  path: '/',
  component: () =>
    import(/* webpackChunkName: "login" */ 'layouts/MainLayout.vue'),
  children: [
    {
      component: () => import(/* webpackChunkName: "login" */ 'pages/Index.vue'),
    },
    {
      component: () =>
        import(/* webpackChunkName: "forgot" */ 'pages/ForgotPassword.vue'),
    },
  ],
}
```

#### Routing entre pantallas.

Al movernos entre pantallas, usar la propiedad nombre (`name`) declarado en las rutas (`router.js`).

```js
// Login.vue
this.$router.push({ name: 'dashboard' });
```

### CSS

#### Propiedad !Important

Evitar el uso de `!important` en los estilos css. Solamente usarlo como último recurso.

#### Estadar de cólores de la aplicación

Para bótones y etiquetas, usar los colores predefinidos en el archivo `quasar.variables` (`primary`, `secondary`, `accent`, etc)

#### Propiedad style en HTML

Usar `style` únicamente para establecer máximo dos propiedades para una etiqueta html. De preferencia crear clases que se puedan reutilizar.

Por ejemplo, si tenemos lo siguiente:

```html
<q-card style="min-width:300px; max-width:700px; min-height:700px;"> </q-card>
```

se recomienda crear una clase y embeber las propiedades.

```html
<style>
  .box-user {
    min-width: 300px;
    max-width: 700px;
    min-height: 700px;
  }
</style>
<q-card class="box-user"> </q-card>
```

#### Layout

Cuando sea necesario "empujar" para generar un espaciado entre componentes, siempre hacerlo de izquierda a derecha y de arriba hacia abajo. Es decir, usar `q-pl-*` o `q-ml-*` si queremos crear un espaciado horizontal entre dos elementos y `q-pb-*` o `q-mb-*` para crear un espaciado vertical.
