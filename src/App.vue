<template>
  <v-app>
    <!-- ナビゲーションバー -->
    <v-navigation-drawer app v-model="drawer" clipped>
      <v-container>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title grey--text text--darken-2"
              >駐輪場設備設定</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list nav dense>
          <v-list-group
            v-for="nav_list in nav_lists"
            :key="nav_list.name"
            :prepend-icon="nav_list.icon"
            no-action
            :append-icon="nav_list.lists ? undefined : ''"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ nav_list.name }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="list in nav_list.lists"
              :key="list.name"
              :to="list.link"
            >
              <v-list-item-content>
                <v-list-item-title>{{ list.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-container>
    </v-navigation-drawer>
    <!-- メニューバー -->
    <v-app-bar color="primary" dark app clipped-left>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <v-btn text to="/">Bicle Park</v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn text to="/signout">ログアウト</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <!-- コンテント -->
    <v-content class="mx-4 mb-4">
      <router-view />
    </v-content>
    <v-footer color="primary" dark app>Vuetify</v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
      nav_lists: [
        {
          name: 'マスター設定',
          icon: 'mdi-speedometer',
          lists: [
            {
              name: '施設設定',
              link: '/',
            },
          ],
        },
      ],
    };
  },
};
</script>
