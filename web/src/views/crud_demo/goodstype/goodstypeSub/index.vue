<template>
	<div style="height: 500px; position: relative">
	<fs-page class="PageFeatureSearchMulti">
		<fs-crud ref="crudRef" v-bind="crudBinding">
			<template #cell_url="scope">
				<el-tag size="small">{{ scope.row.url }}</el-tag>
			</template>
		</fs-crud>
		
	</fs-page>
	</div>
</template>


<script lang="ts">
import { defineComponent, onMounted, watch } from "vue";

import createCrudOptions from "./crud";

import { useFs, useUi } from "@fast-crud/fast-crud";

export default defineComponent({
  name: "EditableFreeSub",
  props: {
    modelValue: {
      type: Array,
      default() {
        return undefined;
      }
    }
  },
  emits: ["update:modelValue"],
  setup(props, ctx) {
    const { crudBinding, crudRef, crudExpose } = useFs({ createCrudOptions });
    const { ui } = useUi();
    let formItemContext = ui.formItem.injectFormItemContext();

    function emit(data) {
      console.log("emit:", data);
      ctx.emit("update:modelValue", data);
      formItemContext.onBlur();
      formItemContext.onChange();
    }

    // 页面打开后获取列表数据
    onMounted(() => {
      // crudExpose.doRefresh();
      watch(
        () => {
          return props.modelValue;
        },
        (value: any) => {
          if (value != null) {
            crudBinding.value.data = value;
          } else {
            crudBinding.value.data = [];
            emit(crudBinding.value.data);
          }
        },
        {
          immediate: true
        }
      );

      crudExpose.editable.enable({ mode: "free", activeDefault: true });
    });

    async function validate() {
      //校验，在上级表单的beforeSubmit中调用
      return await crudExpose.getTableRef().editable.validate();
    }
    return {
      crudBinding,
      crudRef,
      validate
    };
  }
});
</script>



<style lang="less">
  .PageFeatureSearchMulti {
    .fs-search-multi-line-buttons {
      position: absolute;
      bottom: -38px;
      right: 226px;
    }
  }
</style>