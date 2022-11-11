import NProgress from 'nprogress'
import { createRouter, createWebHistory } from 'vue-router'
import { Index, Shop, SingleProduct, CheckoutPage } from '@/views/pages';
import { SellerPage, SellerStore, SellerApply } from '@/views/pages/seller';
import { UserProfile, UserOrders, UserWishlist } from '@/views/users';
import { UserLogin, UserRegister } from '@/views/auth';
import { useAuth } from '@/stores'

const routes = [
  { path: '/', name: "index.page", component: Index, meta: { title: 'Home' } },
  { path: '/auth/login', name: "user.login", component: UserLogin, meta: { title: 'Login', guest: true } },
  { path: '/auth/register', name: "user.register", component: UserRegister, meta: { title: 'Register', guest: true } },
  { path: '/shop-page', name: "shop.page", component: Shop, meta: { title: 'Shop' } },
  { path: '/single-product', name: "product.details", component: SingleProduct, meta: { title: 'Single-product' } },
  { path: '/seller-list', name: "seller.page", component: SellerPage, meta: { title: 'Seller-list' } },
  { path: '/seller-store/:slug', name: "seller.store", component: SellerStore, meta: { title: 'Seller-store' } },
  { path: '/seller-apply', name: "seller.apply", component: SellerApply, meta: { title: 'Seller-form' } },

  // users route
  { path: '/profile', name: "user.profile", component: UserProfile, meta: { title: 'Profile', requiresAuth: true } },
  { path: '/my-orders', name: "user.orders", component: UserOrders, meta: { title: 'Orders', requiresAuth: true } },
  { path: '/my-wishlist', name: "user.wishlist", component: UserWishlist, meta: { title: 'Wishlist', requiresAuth: true } },
  { path: '/checkout-page', name: "checkout.page", component: CheckoutPage, meta: { title: 'Checkout', requiresAuth: true } },
  // seller route

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return {
      top: 0,
      behavior: 'smooth',
    }
  },
});

// NProgress Bar Loading bar hide
NProgress.configure({ showSpinner: false });


const DEFAULT_TITLE = "404";
router.beforeEach((to, form, next) => {
  document.title = to.meta.title || DEFAULT_TITLE;
  NProgress.start();
  const loggedIn = useAuth();
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!loggedIn.user.meta) {
      next({ name: 'user.login' });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (loggedIn.user.meta) {
      next({ name: 'user.profile' });
    } else {
      next();
    }
  } else {
    next();
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
