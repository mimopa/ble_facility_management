<!-- 選択された駐輪機の詳細をモーダルで表示する -->
<template>
  <transition name="modal" appear>
    <div class="modal modal-overlay" @click.self="$emit('close')">
      <div class="modal-window">
        <div class="modal-content">
          <!-- propsで定義された親から渡されたデータを表示 -->
          {{ clickedFacilityNo }}

          <v-container class="ma-3">
            <div class="facility-info">
              <div class="layout-type2">
                <h3 class="title">現在の利用者</h3>
                <div class="content">
                  <dl>
                    <div class="dl-row">
                      <dt>利用者ID</dt>
                      <dd>200501</dd>
                    </div>
                    <div class="dl-row">
                      <dt>利用時間</dt>
                      <dd><span>4</span>時間<span>30</span>分</dd>
                    </div>
                    <div class="dl-row">
                      <dt>無料時間</dt>
                      <dd><span>3</span>時間</dd>
                    </div>
                  </dl>
                  <dl>
                    <div class="dl-row">
                      <dt>開始時刻</dt>
                      <dd>6/12 9:32</dd>
                    </div>
                    <div class="dl-row">
                      <dt>利用料金</dt>
                      <dd><span>100</span>円</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
            <!-- 特記事項 -->
            <div class="notices-info">
              <div class="layout-type2">
                <h3 class="title">特記事項<a href="#">変更・追加</a></h3>
                <div class="content">
                  特に無し
                </div>
              </div>
            </div>
          </v-container>
        </div>
        <v-simple-table fixed-header height="300px">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Calories</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in desserts" :key="item.name">
                <td>{{ item.name }}</td>
                <td>{{ item.calories }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <footer class="modal-footer">
          <slot selectedArea="footer">
            <button @click="$emit('close')">閉じる</button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['selectedArea', 'selectedParking', 'clickedFacilityNo'], // propsで’name’を列挙
  data() {
    return {
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
        },
        {
          name: 'Eclair',
          calories: 262,
        },
        {
          name: 'Cupcake',
          calories: 305,
        },
        {
          name: 'Gingerbread',
          calories: 356,
        },
        {
          name: 'Jelly bean',
          calories: 375,
        },
        {
          name: 'Lollipop',
          calories: 392,
        },
        {
          name: 'Honeycomb',
          calories: 408,
        },
        {
          name: 'Donut',
          calories: 452,
        },
        {
          name: 'KitKat',
          calories: 518,
        },
      ],
    };
  },
};
</script>

<style lang="stylus" scoped>
.facility-info, .notices-info {
  margin-top: 20px;
}
.layout-type2 .title {
  position: relative;
  font-size: 1.2rem;
  font-weight: 800;
  color: #333;
  line-height: 1.2;
  margin: 0;
  padding: 0.4em 0.8em;
  border-bottom: 2px solid #333;
}
.layout-type2 .title a {
  display: block;
  position: absolute;
  font-size: 1rem;
  right: 1em;
  bottom: 0.5em;
  text-decoration: underline;
}
.layout-type2 .content {
  display: flex;
  padding: 1em 1.5em 0;
  font-size: 1.1rem;
  color: #676767;
}
.layout-type2 dl {
  margin: 0;
}
.facility-info .layout-type2 dl .dl-row {
  display: flex;
  align-items: center;
  margin: 0 0 10px;
}
.facility-info .layout-type2 dt {
  min-width: 5em;
  font-size: 0.9rem;
  font-weight: 400;
  text-align: right;
  color: gray;
  padding-right: 1em;
}
.facility-info .layout-type2 dd {
  line-height: 1.2;
  min-width: 8em;
  max-width: 80%;
  padding-right: 0.5em;
  box-sizing: border-box;
}

.modal {
  &.modal-overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }

  &-window {
    background: #fff;
    border-radius: 4px;
    overflow: hidden;
  }

  &-content {
    padding: 100px 200px;
  }

  &-footer {
    background: #ccc;
    padding: 10px;
    text-align: center;
  }
}

// オーバーレイのトランジション
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.4s;

  // オーバーレイに包含されているモーダルウィンドウのトランジション
  .modal-window {
    transition: opacity 0.4s, transform 0.4s;
  }
}

// ディレイを付けるとモーダルウィンドウが消えた後にオーバーレイが消える
.modal-leave-active {
  transition: opacity 0.6s ease 0.4s;
}

.modal-enter, .modal-leave-to {
  opacity: 0;

  .modal-window {
    opacity: 0;
    transform: translateY(-20px);
  }
}
</style>
