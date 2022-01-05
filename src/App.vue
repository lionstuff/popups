<template>
  <v-app dark>
    <v-main style='object-fit: cover; background-color: green !important; background-image: url("https://picsum.photos/1920/1080/?random");'>
      <v-container class='mx-auto' fluid>
        <v-btn @click='drop'>drop</v-btn>
        <v-scroll-y-reverse-transition
          :duration='3000'
          :eager='true'
          :hide-on-leave='true'
          group
          mode='in-out'
        >
          <v-row
            :key='`message-${ i }`'
            :style='{
              "opacity": "1",
              "width": "100%",
              "height": "auto",
              "top": `calc(100% - ${ 125 * ( i + 1 ) }px)`,
              "position": "absolute",
            }'
            class='ma-0 pa-0 mx-auto'
            v-for='( item, i ) in stack'
          >
            <v-col cols='6' class='mx-auto'>
              <v-card
                :class='[ `mb-${ marginBottomRef[ 0 ] } text-white font-weight-${ fontWeightRef[ 2 ] } text-body-1 ma-0 pa-0` ]'
                color='#07070766'
                dark
                outlined
                rounded
                elevation='2'
                height='100'
                width='100%'
              >
                <v-row class='ma-0 mx-4' align='center' justify='space-between'>
                  <v-col cols='11' class='pa-0' order='first'>
                    {{ item.username }}
                  </v-col>
                  <v-col cols='auto' class='pa-0' order='last' align='end'>
                    <v-btn class='ma-0 pa-0' x-small color='transparent' style='transform: scale(0.5) translate(85%, -25%);' icon='mdi-close'></v-btn>
                  </v-col>
                </v-row>
                <v-card-text class='align-start justify-start py-0 ma-0'>
                  {{ item.text }}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-scroll-y-reverse-transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" scoped>
  'use strict';

  import { onMounted, ref, computed, defineComponent } from 'vue';

  export default defineComponent( {
    name: 'App',

    data () {
      return {
        //
      };
    },

    setup: () => {
      const fontWeightRef = computed( () => [ 'bold', 'normal', 'light', 'thin' ] );
      const marginBottomRef = computed( () => [ 0, 5, 10, 15 ] );

      const messages = ref( [
        { username: 'User 1', text: 'Explicabo ipsam corrupti perspiciatis eius accusantium optio voluptas ad, quo reiciendis accusamus cumque voluptatum odit provident alias. Aut accusantium omnis iusto rerum!' },
        { username: 'User 2', text: 'Consectetur debitis ipsum pariatur nisi voluptas quibusdam aliquid, quisquam praesentium laboriosam placeat, perferendis sed voluptates est ipsam vero, et saepe quaerat. Magni?' },
        { username: 'User 3', text: 'Officiis quidem accusantium laborum excepturi iusto ratione a blanditiis inventore unde autem, possimus, similique molestias fuga soluta officia nemo voluptate expedita facilis!' },
        { username: 'User 4', text: 'Temporibus fugiat consequatur, iusto modi velit ducimus libero recusandae eligendi in, unde numquam repellat suscipit alias dicta illum possimus similique! Nisi, incidunt?' },
        { username: 'User 5', text: 'Est unde sequi quasi dolorem expedita. Illo dolores provident voluptatum sit saepe, libero molestiae quis laborum ex minus cumque dolore tempore veniam!' },
        { username: 'User 6', text: 'Quaerat ad sequi, architecto maiores ratione sed error reiciendis vel ducimus ipsa, itaque iste aspernatur amet earum sunt eos facilis fugiat! Cum.' },
      ] );

      const step = () => {
        setTimeout( () => {
          // if ( !stack.value.length ) {
          if ( Math.random() > 0.5 ) {
            drop();
          }
          setTimeout( () => {
            stack.value.splice( 0 , 1 );
            step();
          }, 5e3 );
        }, 1e3 );
      };

      const stack = ref<object[]>( [] );

      const drop = () => {
        if ( stack.value.length > 6 ) {
          stack.value.shift();
        }
        stack.value[ stack.value.length ] = messages.value[ Math.floor( Math.random() * Object.values( messages.value ).length ) ];
      };

      onMounted( () => step() );

      return {
        drop,
        fontWeightRef,
        marginBottomRef,
        stack,
      };
    },
  } );
</script>

<style>
  body {
    cursor: default;
  }
</style>
