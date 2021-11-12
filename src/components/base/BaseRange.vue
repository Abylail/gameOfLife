<template>
  <div class="range">
    <p v-if="title" >{{ title }} -> {{ value }}</p>
    <div class="range__tool">
      <span>{{ min }}</span>
      <input :value="value" type="range" :min="min" :max="max" @input="input"/>
      <span>{{ max }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseRange",
  data: () => ({
    timeout: null,
  }),
  props: {
    value: {
      type: Number,
      required: true
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    title: {
      type: String,
      default: ""
    }
  },
  methods: {
    input(event) {
      clearTimeout(this.timeout);
      this.timeout =  setTimeout(() =>
          this.$emit('input', parseInt(event.target.value)), 10);
    }
  }
}
</script>

<style lang="scss" scoped>
.range {
  margin: 10px 0;

  input {
    margin: 0 10px;
    cursor: pointer;
    width: 100%;
  }

  &__tool {
    display: flex;
    align-items: center;
  }

  p {
    margin: 0;
    font-size: 17px;
  }

}
</style>