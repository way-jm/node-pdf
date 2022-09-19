<script lang="ts" setup>
import {ref} from "vue";
const loading = ref<boolean>(false)
</script>

<template>
  <div>
    {{loading}}
  </div>
</template>

