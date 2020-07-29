<template>
  <v-dialog
    v-model="dialog"
    @close="close"
    width="820"
    persistent
    no-click-animation
  >
    <v-card class="mx-auto">
      <v-layout justify-center>
        <v-card-title class="headline" primary-title>
          駐輪機No.{{ selectedArea.label }} {{ selectedParking.label }}
          {{ clickedFacilityNo }}
        </v-card-title>
      </v-layout>
      <v-card-text>
        <v-row>
          <v-col>
            <!-- 左側 -->
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="text-body-1 font-weight-bold"
                  >現在の利用者</v-list-item-title
                >
                <v-divider></v-divider>
                <v-list-item-content>
                  <v-row justify="start">
                    <v-col>利用者ID</v-col>
                    <v-col>210005</v-col>
                    <v-col>開始時刻</v-col>
                    <v-col>{{ selectedKeys[0].date }}</v-col>
                  </v-row>
                  <v-row>
                    <v-col>利用時間</v-col>
                    <v-col>5時間20分</v-col>
                    <v-col>利用料金</v-col>
                    <v-col>100円</v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <!-- 右側 -->
          <v-col>
            <v-list-item two-line>
              <v-list-item-content>
                <v-list-item-title class="text-body-1 font-weight-bold"
                  >設備状態</v-list-item-title
                >
                <v-divider></v-divider>
                <v-list-item-content>
                  <v-row justify="start">
                    <v-col>ステータス</v-col>
                    <v-col>{{ selectedKeys[0].status }}</v-col>
                    <v-col>開錠キー</v-col>
                    <v-col>{{ selectedKeys[0].open_key }}</v-col>
                  </v-row>
                  <v-row>
                    <v-col>バッテリー</v-col>
                    <v-col>{{ selectedKeys[0].battery }}</v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="text-body-1 text-center font-weight-bold"
              >利用ログ</v-list-item-title
            >

            <v-divider></v-divider>
            <v-data-table
              :headers="headers"
              :items="logs"
              :items-per-page="5"
              class="elevation-1"
            ></v-data-table>
          </v-list-item-content>
        </v-list-item>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="close">閉じる</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: [
    'dialog',
    'selectedArea',
    'selectedParking',
    'clickedFacilityNo',
    'selectedKeys',
  ], // propsで’name’を列挙

  data() {
    return {
      headers: [
        {
          text: '時刻',
          align: 'start',
          value: 'outTime',
        },
        { text: '利用者ID', value: 'userId' },
        { text: 'content', value: 'content' },
      ],
      logs: [
        {
          outTime: '2020/07/21 9:12',
          userId: '2387513',
          content: '施錠',
        },
        {
          outTime: '2020/07/21 9:13',
          userId: '2387514',
          content: '施錠',
        },
        {
          outTime: '2020/07/21 9:13',
          userId: '2387514',
          content: '施錠',
        },
        {
          outTime: '2020/07/21 9:13',
          userId: '2387514',
          content: '施錠',
        },
      ],
    };
  },
  methods: {
    initialize() {},
    close() {
      // ダイアログから親コンポーネントにイベント（閉じるボタンクリック）を通知する。
      this.$emit('clickClose');
    },
  },
};
</script>
<style scoped></style>
