<template>
  <div>
    <v-container class="ma-3">
      <v-row align="center">
        <v-col class="d-flex" cols="12" sm="3">
          <v-select
            v-model="selectedArea"
            item-text="label"
            item-value="value"
            :items="fsAreas"
            label="地域"
            return-object
            dense
            outlined
            @change="changeArea"
          ></v-select>
        </v-col>
        <v-col class="d-flex" cols="12" sm="3">
          <v-select
            v-model="selectedParking"
            item-text="label"
            item-value="value"
            :items="fsParkings"
            label="駐輪場"
            return-object
            dense
            outlined
            @change="changeParking"
          ></v-select>
        </v-col>
      </v-row>
      <v-row align="baseline" class="mx-0">
        <v-icon large color="teal" class="ml-2">mdi-parking</v-icon>
        <div class="text-h3 font-weight-black ml-2">{{ keys.length }}</div>
        <div class="grey--text ml-2">台</div>
      </v-row>
      <v-divider></v-divider>
    </v-container>
    <Dialog
      :selectedArea="selectedArea"
      :selectedParking="selectedParking"
      :clickedFacilityNo="clickedFacilityNo"
      :selectedKeys="selectedKeys"
      :dialog="dialog"
      v-on:clickClose="onCloseClick"
    ></Dialog>
    <!-- 駐輪機リスト -->
    <v-container class="ma-3">
      <div class="text-left">
        <v-btn class="mr-2" small v-on:click="lockClick" :disabled="isDisabled">
          <v-icon small>mdi-lock</v-icon>施錠
        </v-btn>
        <v-btn class="ma-2" small v-on:click="openClick" :disabled="isDisabled">
          <v-icon small>mdi-lock-open</v-icon>開錠
        </v-btn>
        <v-btn
          class="ma-2"
          small
          @click.stop="dialog = true"
          :disabled="isDisabled"
          >詳細情報</v-btn
        >
      </div>
      <v-card max-width="auto" class="pa-2" color="grey lighten-3">
        <v-virtual-scroll
          :bench="benched"
          :items="items"
          height="300"
          item-height="64"
        >
          <template v-slot="{ item }">
            <v-list rounded>
              <v-list-item :key="item">
                <v-divider class="mx-2" vertical></v-divider>
                <v-list-item-content>
                  <v-list-item-title v-text="item"></v-list-item-title>
                  <v-list-item-subtitle
                    >{{
                      ('000' + (item + 9)).slice(-3)
                    }}〜</v-list-item-subtitle
                  >
                </v-list-item-content>
                <div v-for="(key, index) in keys" :key="index">
                  <!-- 表示する駐輪機の選択 -->
                  <div
                    v-if="
                      (item == 1 && parseInt(item + 9) > parseInt(index)) ||
                        (item >= 2 && parseInt(item + 9) <= parseInt(index + 1))
                    "
                  >
                    <!-- 駐輪機ボタン表示 -->
                    <template v-if="key.battery < '10'">
                      <!-- 異常ボタン -->
                      <v-btn
                        class="ma-2"
                        :color="
                          clickedFacilityNo === key.key_id
                            ? 'yellow lighten-3'
                            : 'white'
                        "
                        v-on:click="facilityClick(key.key_id)"
                      >
                        {{ key.key_id }}
                        <v-icon right class="icon-alert" color="red"
                          >mdi-lock</v-icon
                        >
                      </v-btn>
                    </template>
                    <template
                      v-else-if="key.status === '1' || key.status === '2'"
                    >
                      <!-- 通常ボタン -->
                      <!-- TODO:通常ボタンは開錠状態と施錠状態の２種類作成する -->
                      <div v-on:click="facilityClick(key.key_id)">
                        <v-btn
                          class="ma-2"
                          :color="
                            clickedFacilityNo === key.key_id
                              ? 'yellow lighten-3'
                              : 'white'
                          "
                        >
                          {{ key.key_id }}
                          <v-icon right dark>mdi-lock</v-icon>
                        </v-btn>
                      </div>
                    </template>
                    <template v-else>
                      <!-- 通常ボタン -->
                      <!-- TODO:通常ボタンは開錠状態と施錠状態の２種類作成する -->
                      <div v-on:click="facilityClick(key.key_id)">
                        <v-btn
                          class="ma-2"
                          :color="
                            clickedFacilityNo === key.key_id
                              ? 'yellow lighten-3'
                              : 'white'
                          "
                        >
                          {{ key.key_id }}
                          <v-icon right dark>mdi-lock-open</v-icon>
                        </v-btn>
                      </div>
                    </template>
                  </div>
                </div>
              </v-list-item>
            </v-list>
          </template>
        </v-virtual-scroll>
      </v-card>
    </v-container>
    <v-container class="ma-3">
      <v-row>
        <v-col cols="12" sm="6">
          <p class="v-text-large">施設情報</p>
          <v-divider></v-divider>
          <v-row justify="start">
            <v-col cols="auto">
              <p class="v-text-small">施設名</p>
              <p class="v-text-small">住所</p>
            </v-col>
            <v-col cols="auto">
              <p class="v-text-medium">サピアタワー駐輪場</p>
              <p class="v-text-medium">東京都千代田区丸の内1-7-12</p>
            </v-col>
            <v-col cols="auto">
              <p class="v-text-small">TEL</p>
              <p class="v-text-small">FAX</p>
            </v-col>
            <v-col cols="auto">
              <p class="v-text-medium">03-6256-0315</p>
              <p class="v-text-medium">03-6256-0315</p>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="6">
          <p class="v-text-large">利用ログ</p>
          <v-divider></v-divider>
          <!-- ソート、ページング付きテーブル -->
          <v-data-table
            :headers="headers"
            :items="logs"
            :items-per-page="5"
            class="elevation-1"
          ></v-data-table>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <p class="v-text-large">特記事項</p>
          <v-divider></v-divider>
          <v-row justify="start">
            <v-col cols="auto">
              <p class="v-text-medium">特になし</p>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <!-- 施設情報 -->
  </div>
</template>

<script>
// 駐輪機詳細画面のダイアログ
import Dialog from '../components/Dialog.vue';
// firestore
import { db } from '../plugins/firebase';
// import firebase from '../plugins/firebase';
import moment from 'moment';
export default {
  components: { Dialog },
  data: () => ({
    fsAreas: [],
    fsParkings: [],
    // areaMapList: [],
    benched: 0,
    selectedArea: { label: '丸の内', value: '001' },
    areas: [
      { label: '丸の内', value: '001' },
      { label: '大手町', value: '002' },
      { label: '神田', value: '003' },
      { label: '麹町', value: '004' },
    ],
    selectedParking: { label: '第一駐輪場', value: '001' },
    parkings: [
      { label: '第一駐輪場', value: '001' },
      { label: '第二駐輪場', value: '002' },
      { label: '第三駐輪場', value: '003' },
      { label: '第四駐輪場', value: '004' },
    ],
    // DBから取得した駐輪機のリスト
    keys: [],
    selectedKeys: [],
    isDisabled: true,
    // 駐輪機を選択した場合
    isFacilityClicked: false,
    // 選択された駐輪機No ※これを子画面にわたす
    clickedFacilityNo: '',
    // 駐輪機の１列表示個数
    numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    dialog: false,
    headers: [
      {
        text: '時刻',
        align: 'start',
        value: 'outTime',
      },
      { text: '駐輪機No', value: 'keyId' },
      { text: '利用者ID', value: 'userId' },
      { text: 'content', value: 'content' },
    ],

    logs: [
      {
        outTime: '2020/07/21 9:12',
        keyId: '001',
        userId: '2387513',
        content: '施錠',
      },
      {
        outTime: '2020/07/21 9:13',
        keyId: '002',
        userId: '2387514',
        content: '施錠',
      },
      {
        outTime: '2020/07/21 9:13',
        keyId: '002',
        userId: '2387514',
        content: '施錠',
      },
    ],
  }),
  beforeCreate() {
    // コンポーネントのインスタンス作成前に実行される。
  },
  async created() {
    // コンポーネントのインスタンス作成後に実行される。
    this.fsAreas = await db
      .collection('area')
      .get()
      .then((snapshot) => {
        var areaMapList = [];
        snapshot.forEach((doc) => {
          var areaMap = [];
          areaMap['label'] = doc.data().area_abbreviation_name;
          areaMap['value'] = doc.id;
          areaMapList.push(areaMap);
        });
        return areaMapList;
      });
    this.fsParkings = await db
      .collection('area')
      .doc(this.selectedArea.value)
      .collection('parking')
      .get()
      .then((snapshot) => {
        var parkingMapList = [];
        snapshot.forEach((doc) => {
          var parkingMap = [];
          parkingMap['label'] = doc.data().parking_abbreviation_name;
          parkingMap['value'] = doc.id;
          parkingMapList.push(parkingMap);
        });
        return parkingMapList;
      });
    this.keys = await db
      .collection('area')
      .doc(this.selectedArea.value)
      .collection('parking')
      .doc(this.selectedParking.value)
      .collection('keiys')
      .get()
      .then((snapshot) => {
        var keyMapList = [];
        snapshot.forEach((doc) => {
          var keyMap = [];
          keyMap['status'] = doc.data().status;
          keyMap['battery'] = doc.data().battery;
          keyMap['open_key'] = doc.data().open_key;
          keyMap['date'] = !doc.data().date
            ? ''
            : moment(doc.data().date.toDate()).format('YYYY/MM/DD HH:mm');
          keyMap['key_id'] = doc.id;
          keyMapList.push(keyMap);
        });
        return keyMapList;
      });
  },
  mounted() {
    // createdのあとに実行される。
  },
  computed: {
    // 仮のアイテム（リストの行数）作成
    // 10個で1行
    items() {
      // return Array.from({ length: this.length }, (k, v) => v + 1);
      return Array.from(
        { length: Math.floor(this.keys.length / 10) + 1 },
        (k, v) => v + 1
      );
    },
    length() {
      return 15;
    },
  },
  methods: {
    // 駐輪機の選択イベント
    facilityClick(keyId) {
      if (this.clickedFacilityNo === '' || this.clickedFacilityNo !== keyId) {
        // 初回クリック時 ボタン：黄色に、詳細ボタン：表示
        // または
        // 二回目以降クリック時、異なる駐輪機の場合 ボタン：黄色に、詳細ボタン：表示
        this.clickedFacilityNo = keyId;
        this.isDisabled = false;
        this.isFacilityClicked = true;
        this.selectedKeys = this.keys.filter((key) => key.key_id === keyId);
      } else {
        // 二回目以降クリック時、同じ駐輪機の場合 ボタン：白に、詳細ボタン：非表示
        this.clickedFacilityNo = '';
        this.isDisabled = true;
        this.isFacilityClicked = false;
      }
    },
    onCloseClick() {
      this.dialog = false;
    },
    // 施錠ボタン
    lockClick() {
      // 選択された駐輪機のステータスを更新？
    },
    // 開錠ボタン
    openClick() {
      // 選択された駐輪機のステータスを更新？
    },
    // 地域選択イベント
    async changeArea() {
      this.fsParkings = await db
        .collection('area')
        .doc(this.selectedArea.value)
        .collection('parking')
        .get()
        .then((snapshot) => {
          var parkingMapList = [];
          snapshot.forEach((doc) => {
            var parkingMap = [];
            parkingMap['label'] = doc.data().parking_abbreviation_name;
            parkingMap['value'] = doc.id;
            parkingMapList.push(parkingMap);
          });
          return parkingMapList;
        });
    },
    async changeParking() {
      this.keys = await db
        .collection('area')
        .doc(this.selectedArea.value)
        .collection('parking')
        .doc(this.selectedParking.value)
        .collection('keiys')
        .get()
        .then((snapshot) => {
          var keyMapList = [];
          snapshot.forEach((doc) => {
            var keyMap = [];
            keyMap['status'] = doc.data().status;
            keyMap['battery'] = doc.data().battery;
            keyMap['open_key'] = doc.data().open_key;
            keyMap['date'] = doc.data().date;
            keyMap['key_id'] = doc.id;
            keyMapList.push(keyMap);
          });
          return keyMapList;
        });
    },
  },
};
</script>
<style scoped>
.v-text-large {
  font-size: large;
  font-weight: bold;
}
.v-text-medium {
  font-size: medium;
  font-weight: normal;
}
.v-text-small {
  font-size: small;
  font-weight: normal;
}
.icon-alert {
  animation: flashing 1s ease-out;
  animation-iteration-count: infinite;
}
@keyframes flashing {
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
}
</style>
