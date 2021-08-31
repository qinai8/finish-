<template>
	<div id="tops">
		<div class="Box">
			<el-container>
				<el-header class="Header">
					<div class="inpt">
						<el-input placeholder="请输入角色名称" v-model="input" clearable></el-input>
						<el-button class="el-icon-search" type="info" style="background-color: #0190FD; width: 120px; height: 40px;" @click="list">搜索</el-button>
					</div>
					<el-row>
						<el-button
							class="el-icon-edit"
							type="success"
							style="margin-top: 20px; margin-left: 10px; border: solid 1px #66B1FE; background-color: #0190FD;"
							@click="add(1)"
						>
							添加
						</el-button>
					</el-row>
				</el-header>

				<!-- 添加和修改的提示框 -->
				<el-dialog :title="numbut == 1 ? '添加' : '编辑'" :visible.sync="butt" :before-close="handleClose" style="margin-top: 150px;">
					<el-form :model="form" :rules="rules" ref="form">
						<el-form-item label="角色名称" prop="name" label-width="120px">
							<el-input v-model="form.name" autocomplete="off" placeholder="请输入角色名" style="width: 180px;"></el-input>
						</el-form-item>
						<el-form-item label="说明" prop="desc" label-width="120px">
							<el-input v-model="form.desc" type="desc" placeholder="请输入密码" style="width: 180px;"></el-input>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="cancel()">取消</el-button>
						<el-button type="primary" @click="determine(form.name, form.desc)">确定</el-button>
					</div>
				</el-dialog>

				<el-main class="Main">
					<template>
						<el-table class="formd" :data="tableData" border style="width: 100%;">
							<el-table-column label="角色管理" align="center" min-width="180" sortable>
								<template slot-scope="scope">
									{{ scope.row.name }}
								</template>
							</el-table-column>
							<el-table-column label="说明" align="center" min-width="180">
								<template slot-scope="scope">
									{{ scope.row.desc }}
								</template>
							</el-table-column>
							<el-table-column prop="address" align="center" label="操作" min-width="180">
								<template slot-scope="scope">
									<el-button type="primary" size="mini" @click="amend(scope.row)">编辑</el-button>
									<el-button type="danger" size="mini" @click="dis(scope.row)">删除</el-button>
									<el-button type="primary" size="mini" @click="dism(scope.row)">授权</el-button>
								</template>
							</el-table-column>
						</el-table>
					</template>
				</el-main>
			</el-container>

			<el-container>
				<el-header class="buttom">
					<div class="block">
						<el-pagination
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
							:current-page="page"
							:page-sizes="[10, 20, 30, 40, 50, 100]"
							:page-size="limit"
							layout="total, sizes, prev, pager, next, jumper"
							:total="count"
						></el-pagination>
					</div>
				</el-header>
			</el-container>
			<!-- 权限配置对话窗口 -->
			<el-dialog title="权限配置" :visible.sync="dialogVisible" style="margin-top: 190px; margin-left: 50px;">
				<el-tree ref="tree" :data="odata" show-checkbox node-key="id" :default-checked-keys="checkeddata">
					<div class="custom-tree-node" slot-scope="{ node, data }">
						<span style="margin:0.8px;">{{ node.label }}</span>
						<el-tag v-if="data.api" type="success" size="mini">{{ data.api }}</el-tag>
					</div>
				</el-tree>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="power()">确 定</el-button>
				</div>
			</el-dialog>
		</div>
	</div>
</template>

<script>
export default {
	name: 'goTop',
	data() {
		var validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('角色名称不能为空'));
			} else {
				callback();
			}
		};
		var validatePass2 = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('角色描述不能为空'));
			} else {
				callback();
			}
		};
		return {
			tableData: [], //渲染的数组
			count: null,
			butt: false, //取消
			radio: '1', //弹框状态
			numbut: '', //识别弹框作用  修改还是新增
			dialogVisible: false,
			odata: [],
			checkeddata: [],
			input: '',
			limit: 20,
			page: 1,
			value: '', //当前儿子的id
			id: '', //当前点击获取的ID储存
			form: {
				//弹框表格
				name: '',
				desc: '',
				id: ''
			},

			forms: {
				//授权
				id: ''
			},
			rules: {
				name: [
					{
						required: true,
						validator: validatePass,
						trigger: 'blur'
						// required: true, message: '帐号不能为空',
					}
				],
				desc: [
					{
						required: true,
						validator: validatePass2,
						trigger: 'blur'
						// required: true, message: '帐号不能为空',
					}
				]
			}
			// data:[]
		};
	},
	created() {
		this.list();
	},
	methods: {
		list() {
			let zhi = {
				name: this.input,
				page: this.page,
				limit: this.limit
			};
			this.axios
				.get('http://192.168.1.54:8080/admin/role/list', {
					headers: {
						'X-Litemall-Admin-Token': sessionStorage.getItem('token')
					}
				})
				.then(res => {
					this.tableData = res.data.data.list;
					this.count = res.data.data.total;
					console.log(res.data.data.list);
				});
		},
		handleSizeChange(val) {
			this.limit = val;
			console.log(this.limit);
			this.list();
		},
		handleCurrentChange(val) {
			//页面切换
			let vals = val;
			this.page = val;
			this.list();
		},
		add(num) {
			//添加
			this.butt = true;
			this.numbut = num;
			// this.list()
		},
		amend(e) {
			//编辑
			console.log(e);
			this.form = e;
			this.butt = true;
			// this.list()
		},
		cancel() {
			//弹框取消提示
			this.$confirm('是否取消？').then(_ => {
				this.list();
				this.butt = false;
				this.$refs['form'].resetFields();
			});
		},
		// 添加,和修改的请求
		determine(name, cent) {
			let numbut = this.numbut;
			let states = parseInt(this.radio);
			let value = this.value;
			let id = this.id;
			if (numbut == 1) {
				console.log(this.form.name, '465');
				console.log(this.form.desc, '789');
				this.$refs['form'].validate(valid => {
					if (valid) {
						let formsd = JSON.stringify(this.form);
						this.axios({
							url: 'http://192.168.1.54:8080/admin/role/create',
							method: 'post',
							data: {
								name: this.form.name,
								desc: this.form.desc
							},
							headers: {
								'X-Litemall-Admin-Token': sessionStorage.getItem('token')
							}
						}).then(resspose => {
							// console.log(resspose)
							if (resspose.data.errno == 200) {
								this.form.name = '';
								this.form.desc = '';
								this.$message({
									type: 'success',
									message: '添加成功!'
								});
								this.list();
								this.butt = false;
							} else {
								this.$message.error(resspose.data.errmsg);
							}
						});
					} else {
						return;
					}
				});
			} else {
				this.$confirm('是否修改该规格?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$refs['form'].validate(valid => {
						if (valid) {
							let formsds = JSON.stringify(this.form);
							this.axios({
								url: 'http://192.168.1.54:8080/admin/role/update',
								method: 'post',
								data: {
									id: this.form.id,
									name: this.form.name,
									desc: this.form.desc
								},
								headers: {
									'X-Litemall-Admin-Token': sessionStorage.getItem('token')
								}
							})
								.then(resspose => {
									if (resspose.data.errno == 200) {
										this.$message({
											type: 'success',
											message: '修改成功!'
										});
										this.list();
										this.butt = false;
									} else {
										this.$message.error(resspose.data.errmsg);
									}
								})
								.catch(resspose => {
									this.$message({
										type: 'warning',
										message: '修改失败!'
									});
									this.butt = false;
								});
						}
					});
				});
			}
		},
		// 删除
		dis(rew) {
			this.$confirm('确定删除?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				let eidd = rew.id;
				console.log(rew.name, '短合度1');
				this.axios({
					url: 'http://192.168.1.54:8080/admin/role/delete',
					method: 'post',
					data: {
						id: eidd,
						name: rew.name,
						desc: rew.desc
					},
					headers: {
						'X-Litemall-Admin-Token': sessionStorage.getItem('token')
					}
				})
					.then(res => {
						console.log(res);
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.list();
					})
					.catch(res => {
						this.$message({
							type: 'warning',
							message: '删除失败!'
						});
						this.list();
					});
			});
		},
		// 权限列表
		dism(row) {
			console.log(row)
			this.forms.id = row.id;
			this.dialogVisible = true;
			// Permissionlist(row.id);
			let that=this
			this.axios({
				url: 'http://192.168.1.54:8080/admin/role/permissions?',
				method: 'get',
				params: {
					roleId:row.id
				},
				headers: {
					'X-Litemall-Admin-Token': sessionStorage.getItem('token')
				}
			}).then(res => {
				console.log(res.data.data);
				// res.data.data.assignedPermissions.forEach(item => {
				// 	that.checkeddata.push(item);
				// });
				// console.log(this.checkeddata, "456456456")
				// resspose.statusText.toLowerCase() == ''
				if (res.status == 200) {
					that.odata = res.data.data.systemPermissions;
					// assignedPermissions
					// that.$refs.tree.setCheckedKeys(res.data.data.assignedPermissions)
					 this.$refs.tree.setCheckedKeys(res.data.data.assignedPermissions);
				}
				 console.log(this.$refs.tree.getCheckedKeys());
			});
		},
		// 确定配置权限
		power() {
			let res = this.$refs.tree.getCheckedKeys(true);
			let timestamps = {
				roleId: this.forms.id,
				permissions: res
			};
			this.axios({
				url: 'http://192.168.1.54:8080/admin/role/permissions',
				method: 'get',
				params: {
				},
				headers: {
					'X-Litemall-Admin-Token': sessionStorage.getItem('token')
				}
			}).then(resspose => {
				console.log(resspose);
				if (resspose.data.errno == 200) {
					this.$message({
						type: 'success',
						message: '配置成功'
					});
					this.dialogVisible = false;
				} else {
					if (resspose.data.errno == 10006) {
						this.$message.error(resspose.data.errmsg);
					}
				}
			});
		},
		handleClose(done) {
			//弹框插件提示
			this.$confirm('确认关闭?').then(_ => {
				this.list();
				this.butt = false;
				this.$refs['form'].resetFields();
			});
		},
		handleClose(done) {
			//弹框插件提示
			this.$confirm('确认关闭？').then(_ => {
				this.list();
				this.butt = false;
				this.$refs['form'].resetFields();
			});
		}
	}
};
</script>

<style lang="less" scoped="scoped">
// 头部
#tops {
	width: 100%;
	overflow: hidden;
	// background-color: pink;
	// background-color: pink;
}

.Box {
	width: 100%;
	overflow: hidden;
}

// 头部的input框
.inpt {
	margin-top: 20px;
	float: left;
	z-index: 22;
	position: relative;
}

.inpt .el-input {
	width: 200px;
	// height: 600px;
	margin-left: 5px;
}

.el-icon-edit:hover {
	background-color: #41a6fe !important;
}

.el-icon-search {
	width: 100px;
	height: 33px;
	margin-left: 11px;
	// background-color: #0190FD;
}

.el-icon-search:hover {
	background-color: #41a6fe !important;
}

// 表头
.Header {
	// background-color: #B3C0D1;
	color: #333;
	// text-align: center;
	width: 100%;
	height: 90px !important;
}

// 中间
.el-main {
	// background-color: #E9EEF3;
	color: #333;
	text-align: center;
	width: 100%;
	overflow: hidden;
	overflow-x: auto;
}

.formd {
	border: 1px solid #ebeef5;
}

// 底部
.buttom {
	// background-color: #B3C0D1;
	color: #333;
	// text-align: center;
	width: 100%;
	height: 130px !important;
}

// 分页
.block {
	margin-top: 10px;
}
</style>
