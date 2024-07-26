<template>
  <div class="analy-card">
    <v-row no-gutters>
      <v-col cols="4" v-for="item in 3" :key="item + 'a'">
        <v-sheet class="ma-2 pa-2 my-sheet">
          <v-skeleton-loader type="paragraph"></v-skeleton-loader>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="4" v-for="item in 3" :key="item + 'a'">
        <v-sheet class="ma-2 pa-2 my-sheet">
          <v-skeleton-loader type="paragraph"></v-skeleton-loader>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<style lang="scss" scoped>
.v-skeleton-loader {
  background-color: transparent;
}
</style>
