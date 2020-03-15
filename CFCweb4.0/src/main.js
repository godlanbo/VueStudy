import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  Button,
  Dialog,
  Input,
  Select,
  Menu,
  MenuItem,
  Submenu,
  MenuItemGroup,
  Table,
  TableColumn,
  DatePicker,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Icon,
  Upload,
  Card,
  MessageBox,
  Option,
  Message,
  Notification,
  Timeline,
  TimelineItem,
  Divider,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Scrollbar
} from 'element-ui'
import VeMap from 'v-charts/lib/map.common'
import 'element-ui/lib/theme-chalk/index.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import '@/styles/index.scss' // global css
import '@/icons' // icon
import './permission'

Vue.component(VeMap.name, VeMap)

// Vue.use(ElementUI)
Vue.use(Scrollbar)
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Dialog)
Vue.use(Input)
Vue.use(Select)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Option)
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(DatePicker);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Icon);
Vue.use(Upload);
Vue.use(Card);
Vue.use(Divider);
Vue.use(Timeline);
Vue.use(TimelineItem);
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  // mounted: function() {
  //   document.dispatchEvent(new Event('render-event'));
  // },
  render: h => h(App),
}).$mount('#app')
