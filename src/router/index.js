import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TodoDetail from "../views/TodoDetail.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/task/:taskId",
      name: "task",
      component: TodoDetail,
      props: true,
    },
  ],
});

export default router;
