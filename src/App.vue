<template>
  <v-app dark>
    <v-main style='background-color: green !important; background-image: url("https://picsum.photos/1920/1080/?random");'>
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
            class='ma-0 pa-0 mx-auto'
            v-for='( message, i ) in stack'
            :style='{
              "opacity": "0.75",
              "width": "100%",
              "height": "85px",
              "top": `calc(100% - ${ 120 * ( i + 1 ) }px)`,
              "position": "absolute",
            }'
          >
            <v-col cols='7' class='mx-auto'>
              <v-card
                :class='[ `mb-${ marginBottomRef[ 0 ] } text-white font-weight-${ fontWeightRef[ 2 ] } text-body-1 ma-0 pa-0` ]'
                color='pink accent-2'
                dark
                elevation='5'
                height='90'
                width='100%'
              >
                <v-card-title class='text-body-2 ma-0 pb-0'>
                  User {{ i }}
                </v-card-title>
                <v-card-text class='ma-auto align-start justify-start py-0'>
                  {{ message }}
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
        'Explicabo ipsam corrupti perspiciatis eius accusantium optio voluptas ad, quo reiciendis accusamus cumque voluptatum odit provident alias. Aut accusantium omnis iusto rerum!',
        'Consectetur debitis ipsum pariatur nisi voluptas quibusdam aliquid, quisquam praesentium laboriosam placeat, perferendis sed voluptates est ipsam vero, et saepe quaerat. Magni?',
        'Officiis quidem accusantium laborum excepturi iusto ratione a blanditiis inventore unde autem, possimus, similique molestias fuga soluta officia nemo voluptate expedita facilis!',
        'Temporibus fugiat consequatur, iusto modi velit ducimus libero recusandae eligendi in, unde numquam repellat suscipit alias dicta illum possimus similique! Nisi, incidunt?',
        'Est unde sequi quasi dolorem expedita. Illo dolores provident voluptatum sit saepe, libero molestiae quis laborum ex minus cumque dolore tempore veniam!',
        'Quaerat ad sequi, architecto maiores ratione sed error reiciendis vel ducimus ipsa, itaque iste aspernatur amet earum sunt eos facilis fugiat! Cum.'
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

      const stack = ref<string[]>( [] );

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
