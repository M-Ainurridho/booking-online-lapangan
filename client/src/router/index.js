import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/guest/Home.vue";
import Venue from "../views/guest/Venue.vue";
import DetailVenue from "../views/guest/DetailVenue.vue";
import ReviewOrder from "../views/guest/checkouts/ReviewOrder.vue";
import Payment from "../views/guest/checkouts/Payment.vue";

import EmailVerification from "../views/auth/EmailVerification.vue";
import BasicProfile from "../views/auth/BasicProfile.vue";

import M_Dashboard from "../views/users/member/M_Dashboard.vue";
import AdminAccess from "../views/users/admin/index.vue";

import UserProfile from "../views/users/UserProfile.vue";

import NotFound from "../views/errors/NotFound.vue";

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
      {
         path: "/",
         name: "Home",
         component: Home,
      },
      {
         path: "/venues",
         name: "Venue",
         component: Venue,
      },
      {
         path: "/v/:_id",
         name: "Detail Venue",
         component: DetailVenue,
      },
      {
         path: "/checkout/review-order",
         name: "Review Order",
         component: ReviewOrder,
      },
      {
         path: "/checkout/payment",
         name: "Checkout Payment",
         component: Payment,
      },
      {
         path: "/auth/otp/email",
         name: "Email Verification",
         component: EmailVerification,
      },
      {
         path: "/update-basic-profile",
         name: "Update Basic Profile",
         component: BasicProfile,
      },
      {
         path: "/dashboard",
         name: "Member Dashboard",
         component: M_Dashboard,
      },
      {
         path: "/admin",
         name: "Admin Access",
         component: AdminAccess,
      },
      {
         path: "/user/profile",
         name: "User Profile",
         component: UserProfile,
      },

      {
         path: "/:pathMatch(.*)*",
         name: "Not Found",
         component: NotFound,
      },
   ],
});

export default router;
