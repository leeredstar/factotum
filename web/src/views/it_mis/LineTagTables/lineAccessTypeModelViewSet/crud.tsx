import { CrudOptions, AddReq, DelReq, EditReq, dict, CrudExpose, compute, UserPageQuery, CreateCrudOptionsRet} from '@fast-crud/fast-crud';
import _ from 'lodash-es';
import * as api from './api';
import { request } from '/@/utils/service';
import { dictionary } from '/@/utils/dictionary';


//此处为crudOptions配置
export default function ({ crudExpose}: { crudExpose: CrudExpose}): CreateCrudOptionsRet {
	const pageRequest = async (query: any) => {
		return await api.GetList(query);
	};
	const editRequest = async ({ form, row }: EditReq) => {
		if (row.id) {  
			form.id = row.id;
		}
		return await api.UpdateObj(form);
	};
	const delRequest = async ({ row }: DelReq) => {
		return await api.DelObj(row.id);
	};
	const addRequest = async ({ form }: AddReq) => {
		return await api.AddObj(form);
	};

    const exportRequest = async (query: UserPageQuery) => {
		return await api.exportData(query)
	};
	


	return {
		crudOptions: {
			request: {
				pageRequest,
				addRequest,
				editRequest,
				delRequest,
			},
			actionbar: {
				buttons: {
						export:{
                            click(){
                                return exportRequest(crudExpose.getSearchFormData())
                            }
					}
				}
			},
			form: {
				col: { span: 24 },
				// labelWidth: '100px',
				wrapper: {
					is: 'el-dialog',
					// width: '600px',
				},
				
			},
			columns: {

				title: {
					title: '接入类型',
					type: 'input',
					search: { show: true},
					column: {
						// minWidth: 120,
						sortable: 'custom',
					},
					form: {
						rules: [{ required: true, message: '线路接入类型必填' }],
						component: {
							placeholder: '请输入线路接入类型',
						},

						bottomRender({ value }) {
							return <el-tag type="success" size='large' style="font-size: 16px;">线路接入类型是指线路接入到什么类型的设备当中，当前类型必须唯一</el-tag>;
						},
					},
				},
				url: {
					title: '接入类型请求的URL',
					type: 'input',
					search: { show: true},
					column: {
						// minWidth: 120,
						sortable: 'custom',
					},
					form: {
						// rules: [{ required: true, message: '线路类型请求的URL必填' }],
						component: {
							placeholder: '请输入线路类型请求的URL',
						},
						bottomRender({ value }) {
							return <el-tag type="success" size='large' style="font-size: 16px;">重要：要查找对应的线路接入类型，并将后端API请求地址填写在此处</el-tag>;
						},
					},
				},
				label: {
					title: '相应URL请求回来之后对应在label',
					type: 'input',
					search: { show: true},
					column: {
						// minWidth: 120,
						sortable: 'custom',
					},
					form: {
						// rules: [{ required: true, message: '相应URL请求回来之后对应在label必填' }],
						component: {
							placeholder: '请输入相应URL请求回来之后对应在label',
						},
						bottomRender({ value }) {
							return <el-tag type="success" size='large' style="font-size: 16px;">重要：这个label最终会被前端线路接入类型与设备归属的联动选择所引用</el-tag>;
						},
					},
				},

				description: {
					title: '备注',
					type: 'textarea',
					search: {show: false},
					form: {
						component: {
						maxlength: 200,
						placeholder: '输入备注',
						},
					},
				},

			},

		},
	};
};
