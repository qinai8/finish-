<template>
	<div>
		<div id="">
			<el-container>
				<el-aside>
					<el-menu
						default-active="1-4-1"
						class="el-menu-vertical-demo number"
						:collapse="isCollapse"
						background-color="#545c64"
						text-color="#fff"
						active-text-color="#ffd04b"
					>
						<el-menu-item index="1">
							<i class="el-icon-menu"></i>
							<span slot="title">首页</span>
						</el-menu-item>
						<el-submenu v-for="(item, index) in indexleft" :index="item.id" :key="index">
							<template slot="title">
								<i :class="item.icon"></i>
								<span slot="title">{{ item.name }}</span>
							</template>
							<el-menu-item-group v-for="(Item, Index) in item.greTyes" :index="Item.indexul" :key="Index">
								<router-link :to="Item.path" style="color: #66B1FF;text-decoration: none;">
									<el-menu-item :index="Item.indexul">{{ Item.textsName }}</el-menu-item>
								</router-link>
							</el-menu-item-group>
						</el-submenu>
					</el-menu>
				</el-aside>
				<el-container>
					<el-header style="display: inline-block;height: 105px;line-height: 90px;border-radius: 0px !important;">
						<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
							<el-menu-item index="1" class="el-menu-item">
								<el-radio-group v-model="isCollapse"><el-radio-button @click="open()">展开</el-radio-button></el-radio-group>
							</el-menu-item>
							<el-menu-item index="2" class="el-menu-item">
								<el-breadcrumb separator="/">
									<el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
									<el-breadcrumb-item v-if="TITLE[0]">
									{{ TITLE[0] }}
									</el-breadcrumb-item>
									<el-breadcrumb-item v-if="TITLE[1]">{{ TITLE[1] }}</el-breadcrumb-item>
								</el-breadcrumb>
							</el-menu-item>
							<el-submenu index="3" style="float: right;" class="el-menu-item">
								<template slot="title">
									我的工作台
								</template>
								<el-menu-item index="2-1">选项1</el-menu-item>
								<el-menu-item index="2-2">选项2</el-menu-item>
								<router-link :to="{ path: '/login' }"><el-menu-item index="2-3">退出登录</el-menu-item></router-link>
							</el-submenu>
							<el-menu-item index="4" style="float: right;" class="el-menu-item">
								<div class="box_disapp_01">
									<el-tooltip class="item" effect="dark" content="全屏" placement="bottom">
										<div class="box_right"><i class="el-icon-full-screen"></i></div>
									</el-tooltip>
									<el-tooltip class="item" effect="dark" content="布局大小" placement="bottom">
										<div class="box_right"><i class="el-icon-rank"></i></div>
									</el-tooltip>
									<el-tooltip class="item" effect="dark" content="通知中心" placement="bottom">
										<div class="box_right"><i class="el-icon-bell"></i></div>
									</el-tooltip>
								</div>
							</el-menu-item>
						</el-menu>
							<div id="Illustrations"><vTable :ontice="auther"></vTable></div>
					</el-header>
					<el-main>
						<router-view>1</router-view>
					</el-main>
				</el-container>
			</el-container>
		</div>
	</div>
</template>
<script>
import vTable from '../components/Resey/gortup.vue'
export default {
  data () {
    return {
		//定义一个空数组用来给父元素传值
      auther: [],
	  //组件
      name: 'v-Table',
	  //取反
      isCollapse: true,
	  //获取到路由数据并转递给上面
      TITLE: [],
	  //导航栏
      indexleft: [
        {
          id: '2',
          name: '用户管理',
          icon: 'el-icon-s-data',
          greTyes: [
            {
              indexul: '2-1',
              textsName: '会员管理',
              iconBell: '',
              path: '/user/footprint'
            },
            {
              indexul: '2-2',
              textsName: '收货地址',
              iconBell: '',
              path: '/user/addressa'
            },
            {
              indexul: '2-3',
              textsName: '会员收藏',
              iconBell: '',
              path: '/user/collect'
            },
            {
              indexul: '2-4',
              textsName: '会员足迹',
              iconBell: '',
              path: '/user/footprintes'
            },
            {
              indexul: '2-5',
              textsName: '搜索历史',
              iconBell: '',
              path: '/user/history'
            },
            {
              indexul: '2-6',
              textsName: '意见反馈',
              iconBell: '',
              path: '/user/feedback'
            }
          ]
        },
        {
          id: '3',
          name: '商场管理',
          icon: 'el-icon-s-data',
          greTyes: [
            {
              indexul: '3-1',
              textsName: '行政区域',
              iconBell: '',
              path: ''
            },
            {
              indexul: '3-2',
              textsName: '品牌制造商',
              iconBell: '',
              path: ''
            },
            {
              indexul: '3-3',
              textsName: '商品类目',
              iconBell: '',
              path: ''
            },
            {
              indexul: '3-4',
              textsName: '订单管理',
              iconBell: '',
              path: ''
            },
            {
              indexul: '3-5',
              textsName: '售后管理',
              iconBell: '',
              path: ''
            },
            {
              indexul: '3-6',
              textsName: '通用问题',
              iconBell: '',
              path: ''
            },
            {
              indexul: '3-7',
              textsName: '关键词',
              iconBell: '',
              path: ''
            }
          ]
        },
        {
          id: '4',
          name: '商品管理',
          icon: 'el-icon-s-data',
          greTyes: [
            {
              indexul: '4-1',
              textsName: '商品列表',
              iconBell: '',
              path: ''
            },
            {
              indexul: '4-2',
              textsName: '商品商家',
              iconBell: '',
              path: ''
            },
            {
              indexul: '4-3',
              textsName: '商品评论',
              iconBell: '',
              path: ''
            }
          ]
        },
        {
          id: '5',
          name: '推广管理',
          icon: 'el-icon-s-data',
          greTyes: [
            {
              indexul: '5-1',
              textsName: '广告管理',
              iconBell: '',
              path: ''
            },
            {
              indexul: '5-2',
              textsName: '优惠券管理',
              iconBell: '',
              path: ''
            },
            {
              indexul: '5-3',
              textsName: '专题管理',
              iconBell: '',
              path: ''
            },
            {
              indexul: '5-4',
              textsName: '团购规则',
              iconBell: '',
              path: ''
            },
            {
              indexul: '5-5',
              textsName: '团购活动',
              iconBell: '',
              path: ''
            }
          ]
        },
        {
          id: '6',
          name: '系统管理',
          icon: 'el-icon-s-data',
          greTyes: [
            {
              indexul: '6-1',
              textsName: '管理员',
              iconBell: '',
              path: ''
            },
            {
              indexul: '6-2',
              textsName: '通知管理',
              iconBell: '',
              path: ''
            },
            {
              indexul: '6-3',
              textsName: '操作日志',
              iconBell: '',
              path: ''
            },
            {
              indexul: '6-4',
              textsName: '角色管理',
              iconBell: '',
              path: ''
            },
            {
              indexul: '6-5',
              textsName: '对象存储',
              iconBell: '',
              path: ''
            }
          ]
        },
        {
          id: '7',
          name: '配置管理',
          icon: 'el-icon-s-data',
          greTyes: [
            {
              indexul: '7-1',
              textsName: '商场配置',
              iconBell: '',
              path: ''
            },
            {
              indexul: '7-2',
              textsName: '运费配置',
              iconBell: '',
              path: ''
            },
            {
              indexul: '7-3',
              textsName: '订单配置',
              iconBell: '',
              path: ''
            },
            {
              indexul: '7-4',
              textsName: '小程序配置',
              iconBell: '',
              path: ''
            }
          ]
        },
        {
          id: '8',
          name: '统计报表',
          icon: 'el-icon-s-data',
          greTyes: [
            {
              indexul: '8-1',
              textsName: '用户统计',
              iconBell: '',
              path: ''
            },
            {
              indexul: '8-2',
              textsName: '订单统计',
              iconBell: '',
              path: ''
            },
            {
              indexul: '8-3',
              textsName: '商品统计',
              iconBell: '',
              path: ''
            }
          ]
        },
        {
          id: '9',
          name: '外链',
          icon: 'el-icon-magic-stick',
          greTyes: [
            {
              indexul: '9-1',
              textsName: '腾讯云存储',
              iconBell: 'el-icon-magic-stick',
              path: ''
            },
            {
              indexul: '9-2',
              textsName: '腾讯云短信',
              iconBell: 'el-icon-magic-stick',
              path: ''
            },
            {
              indexul: '9-3',
              textsName: '微信支付',
              iconBell: 'el-icon-magic-stick',
              path: ''
            },
            {
              indexul: '9-4',
              textsName: '小程序客服',
              iconBell: 'el-icon-magic-stick',
              path: ''
            },
            {
              indexul: '9-5',
              textsName: '阿里云存储',
              iconBell: 'el-icon-magic-stick',
              path: ''
            },
            {
              indexul: '9-6',
              textsName: '七件云存储',
              iconBell: 'el-icon-magic-stick',
              path: ''
            },
            {
              indexul: '9-7',
              textsName: '快递鸟',
              iconBell: 'el-icon-magic-stick',
              path: ''
            }
          ]
        }
      ]
    }
  },
  methods: {
    open () {
      this.isCollapse = !this.isCollapse
    },
    show () {
      this.TITLE = this.$route.name
      // console.log(this.$route.name);
      this.auther.push({
        name: this.$route.name,
        path: this.$route.path
      })
      // console.log(this.auther);
    }
  },
  components: {
    vTable
  },
  watch: {
    $route: 'show'
  },
  mounted () {
    this.show()
  }
}
</script>
<style scoped>
	#Illustrations{
		width:100%;
		height:40px;
	}
.box_right {
	display: inline-block;
	margin: 0 8px;
	line-height: 60px;
	vertical-align: top;
}
.box_disapp_01 {
	float: right;
	height: 100%;
}
.el-breadcrumb {
	display: inline-block;
	font-size: 14px;
	text-align: left;
	margin-left: 10px;
	float: left;
}
.el-divider--horizontal {
	display: flex;
	height: 1px;
	width: 100%;
	margin: 24px 0;
}
.mybox >>> .el-submenu {
	height: 50px;
	line-height: 50px;
}
.el-menu-item {
	height: 50px;
	line-height: 50px;
}
</style>
<style>
.el-aside {
	width: 100px;
	display: contents;
}
.number {
	height: 1000px;
}
.el-breadcrumb[data-v-fae5bece] {
	text-align: left;
	margin-left: 0px;
	float: none;
}
</style>
