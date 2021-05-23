<template lang="html">
  <div>
    <b-button variant="outline-success" size="sm" @click="onSubmit">
      <span>{{ texte }}</span>
      <b-icon
        icon="arrow-clockwise"
        animation="spin-pulse"
        v-if="running"
        class="ml-2"
      ></b-icon>
    </b-button>
  </div>
</template>

<script>
//
//import magentoSynchroListSites from "./ListSites.vue";
export default {
  name: "ButtonSave",
  props: {
    running: {
      type: Boolean,
      required: true
    },
    texte: {
      type: String,
      default: "Enregistrer"
    }
  },
  components: {
    //
  },
  data() {
    return {
      //
    };
  },
  mounted() {
    //
  },
  watch: {
    //
  },
  computed: {
    //
  },
  methods: {
    onSubmit() {
      this.$emit("ev-click");
    }
  }
};
</script>

<style lang="scss" scoped></style>

<!--
 //nom du fichier en pascal.
 //<template>
 - le nom des attributs en kebab-case;
 - la valeur des attributs et des variables en camelCase;
 - function en PascalCase
 //props, data
 - variable en camelCase
 //methods
 - variable en PascalCase
-->
