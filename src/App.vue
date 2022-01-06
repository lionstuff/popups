<template>
  <v-app dark>
    <v-main style='object-fit: cover; background-color: green !important; background-image: url("https://picsum.photos/1920/1080/?random");'>
      <v-container class='mx-auto' fluid>
        <v-btn @click='drop'>drop</v-btn>
        <v-scroll-y-reverse-transition
          :duration='3000'
          :eager='true'
          :hide-on-leave='false'
          group
          mode='easy'
        >
          <v-row
            :key='`message-${ i }`'
            :style='{
              "width": "100%",
              "height": "auto",
              "top": `calc(100% - ${ ( 100 + marginBottomRef * 5 ) * ( i + 1 ) }px)`,
              "position": "absolute",
            }'
            class='ma-0'
            v-for='( item, i ) in stack'
          >
            <v-col cols='6' class='mx-auto'>
              <v-card
                :class='[ `mb-${ marginBottomRef } font-weight-${ fontWeightRef } ${ fontSize[ fontSizeRef ] } ma-0 pa-0` ]'
                dark
                outlined
                @mouseover='item.active = true;'
                @mouseleave='item.active = false;'
                rounded
                elevation='2'
                height='100'
                width='100%'
                :style='{
                  "background-color": `${ backgroundColor }`,
                  "color": `${ fontColor }`,
                }'
              >
                <v-card-title :class='[ `my-${ item.active ? 0 : 2 } mx-4 pa-0 ${ fontSize[ fontSizeRef ] }` ]'>
                  <v-row class='ma-0' align='center' justify='space-between'>
                    <v-col cols='10' class='pa-0' order='first'>
                      {{ item.username }}
                    </v-col>
                    <v-col v-show='item.active' cols='2' class='pa-0' order='last' align='end' style='transform: scale( 0.55 ) translate( 50%, -15% );'>
                      <v-row class='ma-0' align='center' justify='end'>
                        <v-btn text plain @click.stop="{ settings = true; clearTimeout( timerId.value ); }" class='ma-0 pa-0' x-small color='transparent' icon='mdi-cog'></v-btn>
                        <v-btn text plain @click.stop='close( i )' class='ma-0 pa-0' x-small color='transparent' icon='mdi-close'></v-btn>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-card-title>
                <v-card-text class='align-start justify-start py-1 ma-0'>
                  {{ item.text }}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-scroll-y-reverse-transition>

        <v-dialog
          v-model="settings"
          max-width='100%'
          persistent
        >
          <v-card width='500'>
            <v-card-title class="headline">
              Настройки
            </v-card-title>
            <v-card-text>

            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text plain color='info' @click.stop="{ settings = false; step(); }">Применить</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
      const fontWeight = ref( [ 'bold', 'normal', 'light', 'thin' ] );
      const fontWeightRef = ref( 2 );
      const marginBottomRef = ref( 5 );
      const fontSize = ref( [ 'text-body-1', 'text-subtitle-1' ] );
      const fontSizeRef = ref( 1 );

      const messages = ref( [
        { active: false, timestamp: '15:27', username: 'User 1', text: 'Explicabo ipsam corrupti perspiciatis eius accusantium optio voluptas ad, quo reiciendis accusamus cumque voluptatum odit provident alias. Aut accusantium omnis iusto rerum!' },
        { active: false, timestamp: '15:27', username: 'User 2', text: 'Consectetur debitis ipsum pariatur nisi voluptas quibusdam aliquid, quisquam praesentium laboriosam placeat, perferendis sed voluptates est ipsam vero, et saepe quaerat. Magni?' },
        { active: false, timestamp: '15:27', username: 'User 3', text: 'Officiis quidem accusantium laborum excepturi iusto ratione a blanditiis inventore unde autem, possimus, similique molestias fuga soluta officia nemo voluptate expedita facilis!' },
        { active: false, timestamp: '15:27', username: 'User 4', text: 'Temporibus fugiat consequatur, iusto modi velit ducimus libero recusandae eligendi in, unde numquam repellat suscipit alias dicta illum possimus similique! Nisi, incidunt?' },
        { active: false, timestamp: '15:27', username: 'User 5', text: 'Est unde sequi quasi dolorem expedita. Illo dolores provident voluptatum sit saepe, libero molestiae quis laborum ex minus cumque dolore tempore veniam!' },
        { active: false, timestamp: '15:27', username: 'User 6', text: 'Quaerat ad sequi, architecto maiores ratione sed error reiciendis vel ducimus ipsa, itaque iste aspernatur amet earum sunt eos facilis fugiat! Cum.' },
      ] );

      const backgroundColor = ref( '#07070777' );
      const fontColor = ref( '#FFFFFF' );
      const settings = ref( false );
      const timerId = ref( 0 );
      const isHover = ref( false );

      const close = ( i: number ) => stack.value.splice( i , 1 );

      const step = () => {
        clearTimeout( timerId.value );
        timerId.value = setTimeout( () => {
          // if ( !stack.value.length ) { //? Постепенное удаление всех сообщений из очереди
          if ( Math.random() > 0.5 ) {
            drop();
          }
          setTimeout( () => {
            if ( !settings.value ) {
              close( 0 );
              step();
            }
          }, 5e3 );
        }, 1e3 );
      };


      const stack = ref<object[]>( [] );

      const drop = () => {
        if ( !settings.value ) {
          if ( stack.value.length > 6 ) {
            stack.value.shift();
          }
          stack.value[ stack.value.length ] = messages.value[ Math.floor( Math.random() * Object.values( messages.value ).length ) ];
        }
      };

      onMounted( () => step() );

      return {
        backgroundColor,
        close,
        drop,
        fontColor,
        fontSize,
        fontSizeRef,
        fontWeightRef,
        isHover,
        marginBottomRef,
        settings,
        stack,
        step,
      };
    },
  } );
</script>

<style>
  body {
    cursor: default;
  }
</style>
