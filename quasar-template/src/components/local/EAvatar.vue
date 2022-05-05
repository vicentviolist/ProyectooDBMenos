<template>
  <div style="display:inline;">
    <img
      v-if="square"
      :class="editable ? 'cursor-pointer' : ''"
      @click="editable ? $refs.fileAvatar.pickFiles() : $emit('click')"
      :src="
        data && contentType
          ? `data:${contentType};base64,${data}`
          : 'img/default-avatar.png'
      "
      style="height: 10vh;"
      alt="avatar"
    />
    <q-avatar v-else :size="size" :class="'shadow-3'">
      <img
        :class="editable ? 'cursor-pointer' : ''"
        @click="editable ? $refs.fileAvatar.pickFiles() : $emit('click')"
        :src="
          data && contentType
            ? `data:${contentType};base64,${data}`
            : 'img/default-avatar.png'
        "
      />

      <div hidden>
        <q-file
          v-if="editable"
          ref="fileAvatar"
          :filter="checkFile"
          v-model="imageTest"
          @input="saveImg"
          max-files="1"
        ></q-file>
      </div>
    </q-avatar>
  </div>
</template>
<script>
export default {
  name: 'e-avatar',
  props: {
    data: {
      validator: prop => typeof prop === 'string' || prop === null,
      required: false,
      description: 'Imagen códificada en Base64',
    },
    contentType: {
      validator: prop => typeof prop === 'string' || prop === null,
      required: false,
      description: 'Tipo de formato de la imagen',
    },
    size: {
      type: String,
      required: false,
      description: 'Tamaño expresado en pixeles:',
      default: '105px',
    },
    editable: {
      type: Boolean,
      required: false,
      description: 'Indica si es posible cargar una nueva imagen',
      default: false,
    },
    square: {
      type: Boolean,
      required: false,
      description: 'Indica si el estilo del avatar será cuadrado',
      default: false,
    },
  },
  data() {
    return {
      imageTest: null,
      image64: null,
    };
  },
  methods: {
    checkFile(files) {
      let isValid = files[0].size < 1024000 && files[0].type.includes('image/');
      if (!isValid) {
        this.$emit('onInvalid');
      }
      return isValid ? files : [];
    },
    saveImg(value) {
      let reader = new FileReader();
      reader.readAsDataURL(value);
      reader.onload = () => (this.image64 = reader.result);
    },
  },
  watch: {
    async image64(image) {
      let splitString = image.split(';base64,');
      let contentType = splitString[0].slice(5);
      let data = splitString[1];
      this.$emit('onValid', { contentType, data });
    },
  },
};
</script>
